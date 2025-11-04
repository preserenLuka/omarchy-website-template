import { useEffect, useRef } from "react";
import s from "./KeybindsMenu.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function KeybindsMenu({ open, onClose }: Props) {
  const modalRef = useRef<HTMLDivElement | null>(null);

  // focus when open
  useEffect(() => {
    if (!open) return;
    modalRef.current?.focus();
  }, [open]);

  // close on Esc
  useEffect(() => {
    if (!open) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  if (!open) return null;

  return (
    <div className={s.backdrop} onMouseDown={onClose}>
      <div
        ref={modalRef}
        className={s.modal}
        onMouseDown={(e) => e.stopPropagation()}
        tabIndex={-1}
        role="dialog"
        aria-modal="true"
        aria-labelledby="keybindsTitle"
      >
        <div className={s.header}>
          <h2 className={s.title} id="keybindsTitle">
            Keybinds
          </h2>
          <button
            className={s.close}
            onClick={onClose}
            type="button"
            aria-label="Close keybinds"
          >
            ×
          </button>
        </div>
        <div className={s.body}>
          <ul className={s.list}>
            <li className={s.item}>
              <span className={s.itemLabel}>Open tile chooser</span>
              <span>
                <kbd>Ctrl</kbd> + <kbd>J</kbd>
              </span>
            </li>
            <li className={s.item}>
              <span className={s.itemLabel}>Theme menu</span>
              <span>
                <kbd>Ctrl</kbd> + <kbd>K</kbd>
              </span>
            </li>
            <li className={s.item}>
              <span className={s.itemLabel}>Keybinds</span>
              <span>
                <kbd>Ctrl</kbd> + <kbd>L</kbd>
              </span>
            </li>
            <li className={s.item}>
              <span className={s.itemLabel}>Close active tile</span>
              <span>
                <kbd>Ctrl</kbd> + <kbd>X</kbd>
              </span>
            </li>
            <li className={s.item}>
              <span className={s.itemLabel}>Next tile</span>
              <span>
                <kbd>Ctrl</kbd> + <kbd>→</kbd>
              </span>
            </li>
            <li className={s.item}>
              <span className={s.itemLabel}>Previous tile</span>
              <span>
                <kbd>Ctrl</kbd> + <kbd>←</kbd>
              </span>
            </li>
          </ul>
          <p className={s.help}>
            <kbd>Esc</kbd> to close &nbsp;|&nbsp; click outside to dismiss
          </p>
        </div>
      </div>
    </div>
  );
}
