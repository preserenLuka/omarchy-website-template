import { useState } from "react";
import type { ReactNode } from "react";
import s from "./Tile.module.css";

type Props = {
  title?: string;
  actions?: ReactNode;
  width?: string | number;
  height?: string | number;
  children?: ReactNode;
  className?: string;
  expandable?: boolean;
};

export default function Tile({
  title,
  actions,
  width,
  height,
  children,
  className,
  expandable,
}: Props) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div
      className={[
        s.tile,
        expanded ? s.expanded : "",
        expandable ? s.expandable : "",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{ width, height }}
      onClick={(e) => {
        if (!expandable) return;
        const tag = (e.target as HTMLElement).tagName.toLowerCase();
        if (
          ["button", "input", "textarea", "select", "a", "iframe"].includes(tag)
        )
          return;
        setExpanded((v) => !v);
      }}
      data-expanded={expanded ? "1" : "0"}
    >
      {(title || actions) && (
        <div className={s.header}>
          {title && <h3 className={s.title}>{title}</h3>}
          {actions && <div className={s.actions}>{actions}</div>}
        </div>
      )}
      <div className={s.content}>{children}</div>
    </div>
  );
}
