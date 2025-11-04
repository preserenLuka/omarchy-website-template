import React from "react";
import s from "./Tile.module.css";

type TileProps = {
  title?: string;
  actions?: React.ReactNode;
  children?: React.ReactNode;

  // layout overrides (optional)
  width?: string | number;
  height?: string | number;
  className?: string;

  // focus/active
  isActive?: boolean;
  onFocus?: () => void;

  // closing
  onClose?: () => void;

  // allow "click to expand" if you want later
  expandable?: boolean;
};

export default function Tile({
  title,
  actions,
  children,
  width,
  height,
  className,
  isActive = false,
  onFocus,
  onClose,
  expandable = false,
}: TileProps) {
  const [expanded, setExpanded] = React.useState(false);

  function handleRootClick(e: React.MouseEvent<HTMLDivElement>) {
    // tell parent we were focused
    onFocus?.();

    if (!expandable) return;

    // don't toggle when clicking controls
    const target = e.target as HTMLElement;
    if (target.closest("button, input, textarea, select, a, iframe")) return;

    setExpanded((v) => !v);
  }

  return (
    <div
      className={[
        s.tile,
        isActive ? s.active : "",
        expanded ? s.expanded : "",
        expandable ? s.expandable : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width, height }}
      onClick={handleRootClick}
      data-expanded={expanded ? "1" : "0"}
    >
      {(title || actions || onClose) && (
        <div className={s.header}>
          <div className={s.headerLeft}>
            {title && <h3 className={s.title}>{title}</h3>}
          </div>
          <div className={s.headerRight}>
            {actions}
            {onClose && (
              <button
                type="button"
                className={s.closeBtn}
                onClick={(e) => {
                  e.stopPropagation(); // don’t trigger focus/expand
                  onClose();
                }}
                aria-label="Close"
              >
                ×
              </button>
            )}
          </div>
        </div>
      )}

      <div className={s.content}>{children}</div>
    </div>
  );
}
