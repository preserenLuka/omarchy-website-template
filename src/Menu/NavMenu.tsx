import { useEffect, useMemo, useRef, useState } from "react";
import s from "./navMenu.module.css";
import type { ReactNode } from "react";

type Props = {
  open: boolean;
  onClose: () => void;
  items: NavItem[];
  currentId?: string;
  openIds?: string[];
  onSelect: (id: string) => void;
};

export type NavItem = { id: string; label: string; icon?: ReactNode };

export default function NavMenu({
  open,
  onClose,
  items,
  currentId,
  onSelect,
  openIds,
}: Props) {
  const navRef = useRef<HTMLDivElement | null>(null);

  // start on current item if provided
  const initialIndex = useMemo(() => {
    if (!currentId) return 0;
    const idx = items.findIndex((i) => i.id === currentId);
    return idx >= 0 ? idx : 0;
  }, [items, currentId]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // sync when opening
  useEffect(() => {
    if (!open) return;
    setActiveIndex(initialIndex);
    navRef.current?.focus();
  }, [open, initialIndex]);

  // keyboard handling
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }

      if (e.key === "ArrowUp" || e.key === "ArrowDown") {
        e.preventDefault();
        const dir = e.key === "ArrowUp" ? -1 : 1;
        const next = mod(activeIndex + dir, items.length);
        setActiveIndex(next);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const item = items[activeIndex];
        if (item) {
          onSelect(item.id);
          onClose();
        }
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, activeIndex, items, onClose, onSelect]);

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleClick = (idx: number) => {
    const item = items[idx];
    if (!item) return;
    onSelect(item.id);
    onClose();
  };

  return (
    <div className={s.backdrop} onMouseDown={onBackdrop}>
      <div
        ref={navRef}
        className={s.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="navMenuTitle"
        tabIndex={-1}
      >
        <header className={s.header}>
          <h2 id="navMenuTitle" className={s.title}>
            Open tile
          </h2>
          <button className={s.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <nav className={s.body} aria-label="Main">
          <ul className={s.list} role="menu">
            {items.map((it, idx) => {
              const isActive = idx === activeIndex;
              const isOpen = openIds?.includes(it.id);

              return (
                <li key={it.id} role="none">
                  <button
                    role="menuitem"
                    className={[
                      s.item,
                      isActive ? s.itemActive : "",
                      isOpen ? s.itemCurrent : "",
                    ].join(" ")}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleClick(idx)}
                  >
                    {it.icon && <span className={s.itemIcon}>{it.icon}</span>}
                    <span className={s.itemLabel}>{it.label}</span>
                    {isOpen && <span className={s.currentBadge}>open</span>}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={s.help}>
            <kbd>↑</kbd>/<kbd>↓</kbd> select &nbsp;|&nbsp; <kbd>Enter</kbd> open
            &nbsp;|&nbsp; <kbd>Esc</kbd> close
          </div>
        </nav>
      </div>
    </div>
  );
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
