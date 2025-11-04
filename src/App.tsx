import { useState } from "react";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";

import ThemeMenu from "./Menu/ThemeMenu";
import NavMenu from "./Menu/NavMenu";
import KeybindsMenu from "./Menu/KeybindsMenu";

import Tile from "./components/Tile";
import s from "./App.module.css";

import { TILES, AVAILABLE_TILES, type TileId } from "./data/tiles";
import { useTileShortcuts } from "./hooks/useTileShortcuts";

function App() {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const [keybindsOpen, setKeybindsOpen] = useState(false);

  const [openTiles, setOpenTiles] = useState<TileId[]>([]);
  const [activeTile, setActiveTile] = useState<TileId | null>(null);

  // app-level shortcuts (menus)
  useKeyboardShortcut({ ctrl: true, key: "k" }, () =>
    setThemeMenuOpen((v) => !v)
  );
  useKeyboardShortcut({ ctrl: true, key: "j" }, () =>
    setNavMenuOpen((v) => !v)
  );
  useKeyboardShortcut({ ctrl: true, key: "l" }, () =>
    setKeybindsOpen((v) => !v)
  );

  // tile-level shortcuts (move, cycle, close)
  useTileShortcuts<TileId>({
    activeTile,
    setActiveTile,
    openTiles,
    setOpenTiles,
    handleCloseTile,
  });

  function handleOpenTile(id: TileId) {
    setOpenTiles((prev) => {
      if (prev.includes(id)) return prev;
      return [...prev, id];
    });
    setActiveTile(id);
    setNavMenuOpen(false);
  }

  function handleCloseTile(id: TileId) {
    setOpenTiles((prev) => {
      const next = prev.filter((t) => t !== id);

      setActiveTile((current) => {
        if (current !== id) return current;
        return next[0] ?? null;
      });

      return next;
    });
  }

  return (
    <div className={s.root}>
      <nav className={s.nav}>
        <div className={s.navInner}>
          <div className={s.brand}>Omarchy</div>
          <div className={s.navActions}>
            <button className={s.navBtn} onClick={() => setNavMenuOpen(true)}>
              Tiles (Ctrl+J)
            </button>
            <button className={s.navBtn} onClick={() => setThemeMenuOpen(true)}>
              Theme (Ctrl+K)
            </button>
            <button className={s.navBtn} onClick={() => setKeybindsOpen(true)}>
              Keys (Ctrl+L)
            </button>
          </div>
        </div>
      </nav>

      <main className={s.main}>
        <div className={s.tilesGrid}>
          {openTiles.length === 0 ? (
            <div className={s.emptyState}>
              Open something from “Tiles” (Ctrl+J)
            </div>
          ) : (
            openTiles.map((tileId) => {
              const def = TILES[tileId];
              if (!def) return null;
              return (
                <Tile
                  key={tileId}
                  title={def.label}
                  isActive={tileId === activeTile}
                  onFocus={() => setActiveTile(tileId)}
                  onClose={() => handleCloseTile(tileId)}
                >
                  {def.render()}
                </Tile>
              );
            })
          )}
        </div>
      </main>

      <ThemeMenu open={themeMenuOpen} onClose={() => setThemeMenuOpen(false)} />

      <NavMenu
        open={navMenuOpen}
        onClose={() => setNavMenuOpen(false)}
        items={AVAILABLE_TILES}
        currentId={activeTile ?? undefined}
        openIds={openTiles}
        onSelect={(id) => handleOpenTile(id as TileId)}
      />

      <KeybindsMenu
        open={keybindsOpen}
        onClose={() => setKeybindsOpen(false)}
      />
    </div>
  );
}

export default App;
