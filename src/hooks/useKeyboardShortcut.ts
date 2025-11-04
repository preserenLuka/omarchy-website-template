// app/src/hooks/useKeyboardShortcut.ts
import { useEffect } from "react";

type KeyCombo = {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  key: string;
  exact?: boolean; // if true, no extra modifiers allowed
};

export function useKeyboardShortcut(combo: KeyCombo, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const keyMatch = e.key.toLowerCase() === combo.key.toLowerCase();

      // required modifiers
      if (combo.ctrl && !(e.ctrlKey || e.metaKey)) return;
      if (combo.shift && !e.shiftKey) return;
      if (combo.alt && !e.altKey) return;

      // if exact: forbid extra modifiers
      if (combo.exact) {
        const extraCtrl = !combo.ctrl && (e.ctrlKey || e.metaKey);
        const extraShift = !combo.shift && e.shiftKey;
        const extraAlt = !combo.alt && e.altKey;
        if (extraCtrl || extraShift || extraAlt) return;
      }

      if (keyMatch) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [combo, callback]);
}
