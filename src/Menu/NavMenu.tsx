import { useEffect, useMemo, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import s from "./navMenu.module.css";
import type { ReactNode } from "react";
import {
  AiOutlineHome,
  AiOutlineVideoCamera,
  AiOutlineHeart,
} from "react-icons/ai";

type Props = { open: boolean; onClose: () => void };

export type NavItem = { label: string; to: string; icon?: ReactNode };

export const NAV_ITEMS: NavItem[] = [
  { label: "Home", to: "/", icon: <AiOutlineHome /> },
  { label: "Exercises", to: "/exercises", icon: <AiOutlineVideoCamera /> },
  { label: "Stretching", to: "/stretching", icon: <AiOutlineVideoCamera /> },
  {
    label: "Injury Prevention",
    to: "/injury-prevention",
    icon: <AiOutlineHeart />,
  },
];

export default function NavMenu({ open, onClose }: Props) {
  const navRef = useRef<HTMLDivElement | null>(null);
  const navigate = useNavigate();
  const location = useLocation();

  // Začetni index = trenutna ruta (če je najdena), sicer 0
  const initialIndex = useMemo(() => {
    const idx = NAV_ITEMS.findIndex((i) => i.to === location.pathname);
    return idx >= 0 ? idx : 0;
  }, [location.pathname]);

  const [activeIndex, setActiveIndex] = useState(initialIndex);

  // Ko se modal odpre, poravnaj activeIndex z ruto + fokus
  useEffect(() => {
    if (!open) return;
    setActiveIndex(initialIndex);

    // Postavi fokus na modal (lahko tudi prvi item)
    const el = navRef.current;
    if (el) el.focus();
  }, [open, initialIndex]);

  // Tipke: Esc, ↑/↓, Enter
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
        const next = mod(activeIndex + dir, NAV_ITEMS.length);
        setActiveIndex(next);
        return;
      }

      if (e.key === "Enter") {
        e.preventDefault();
        const item = NAV_ITEMS[activeIndex];
        if (item) {
          navigate(item.to);
          onClose();
        }
        return;
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, activeIndex, navigate, onClose]);

  if (!open) return null;

  const onBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleClick = (idx: number) => {
    const item = NAV_ITEMS[idx];
    if (item) {
      navigate(item.to);
      onClose();
    }
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
            Navigation
          </h2>
          <button className={s.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>

        <nav className={s.body} aria-label="Main">
          <ul className={s.list} role="menu">
            {NAV_ITEMS.map((it, idx) => {
              const isActive = idx === activeIndex;
              const isCurrentRoute = it.to === location.pathname;

              return (
                <li key={it.to} role="none">
                  <button
                    role="menuitem"
                    className={[
                      s.item,
                      isActive ? s.itemActive : "",
                      isCurrentRoute ? s.itemCurrent : "",
                    ].join(" ")}
                    onMouseEnter={() => setActiveIndex(idx)}
                    onClick={() => handleClick(idx)}
                  >
                    {"icon" in it && it.icon && (
                      <span className={s.itemIcon}>{it.icon}</span>
                    )}
                    <span className={s.itemLabel}>{it.label}</span>
                    {isCurrentRoute && (
                      <span className={s.currentBadge}>current</span>
                    )}
                  </button>
                </li>
              );
            })}
          </ul>

          <div className={s.help}>
            <kbd>↑</kbd>/<kbd>↓</kbd> izberi &nbsp;|&nbsp; <kbd>Enter</kbd>{" "}
            potrdi &nbsp;|&nbsp; <kbd>Esc</kbd> zapri
          </div>
        </nav>
      </div>
    </div>
  );
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}
