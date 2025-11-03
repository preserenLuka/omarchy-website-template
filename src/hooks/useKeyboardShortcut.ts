// app/src/hooks/useKeyboardShortcut.ts

import { useEffect } from "react";

type KeyCombo = {
  ctrl?: boolean;
  shift?: boolean;
  alt?: boolean;
  key: string;
};

export function useKeyboardShortcut(combo: KeyCombo, callback: () => void) {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      const ctrlMatch = combo.ctrl
        ? e.ctrlKey || e.metaKey
        : !e.ctrlKey && !e.metaKey;
      const shiftMatch = combo.shift ? e.shiftKey : !e.shiftKey;
      const altMatch = combo.alt ? e.altKey : !e.altKey;
      const keyMatch = e.key.toLowerCase() === combo.key.toLowerCase();

      if (ctrlMatch && shiftMatch && altMatch && keyMatch) {
        e.preventDefault();
        callback();
      }
    };

    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [combo, callback]);
}
