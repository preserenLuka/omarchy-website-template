import { useKeyboardShortcut } from "./useKeyboardShortcut";
import moveTile from "./moveTile";
import type { Dispatch, SetStateAction } from "react";

type UseTileShortcutsArgs<TId extends string> = {
  activeTile: TId | null;
  setActiveTile: Dispatch<SetStateAction<TId | null>>;
  openTiles: TId[];
  setOpenTiles: Dispatch<SetStateAction<TId[]>>;
  handleCloseTile: (id: TId) => void;
};

export function useTileShortcuts<TId extends string>({
  activeTile,
  setActiveTile,
  openTiles,
  setOpenTiles,
  handleCloseTile,
}: UseTileShortcutsArgs<TId>) {
  // close active tile (you picked Ctrl+X)
  useKeyboardShortcut({ ctrl: true, key: "x" }, () => {
    if (!activeTile) return;
    handleCloseTile(activeTile);
  });

  // MOVE tiles (Ctrl + ArrowRight / Left)
  useKeyboardShortcut({ ctrl: true, key: "ArrowRight" }, () => {
    if (!activeTile) return;
    setOpenTiles((prev) => {
      const index = prev.indexOf(activeTile);
      if (index === -1) return prev;
      if (index === prev.length - 1) return prev;
      return moveTile(prev, index, index + 1);
    });
  });

  useKeyboardShortcut({ ctrl: true, key: "ArrowLeft" }, () => {
    if (!activeTile) return;
    setOpenTiles((prev) => {
      const index = prev.indexOf(activeTile);
      if (index === -1) return prev;
      if (index === 0) return prev;
      return moveTile(prev, index, index - 1);
    });
  });

  // CYCLE focus (Alt + ArrowRight / Left)
  useKeyboardShortcut({ alt: true, key: "ArrowRight" }, () => {
    if (!activeTile || openTiles.length === 0) return;
    const idx = openTiles.indexOf(activeTile);
    if (idx === -1) return;
    const next = openTiles[(idx + 1) % openTiles.length];
    setActiveTile(next);
  });

  useKeyboardShortcut({ alt: true, key: "ArrowLeft" }, () => {
    if (!activeTile || openTiles.length === 0) return;
    const idx = openTiles.indexOf(activeTile);
    if (idx === -1) return;
    const prev = openTiles[(idx - 1 + openTiles.length) % openTiles.length];
    setActiveTile(prev);
  });
}
