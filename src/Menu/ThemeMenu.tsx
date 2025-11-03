import { useEffect, useMemo, useRef, useState } from "react";
import { themes } from "../data/themes";
import { useTheme } from "../context/ThemeContext";
import s from "./themeMenu.module.css";

type Props = {
  open: boolean;
  onClose: () => void;
};

export default function ThemeMenu({ open, onClose }: Props) {
  const {
    currentTheme,
    currentBackgroundIndex,
    setTheme,
    setBackgroundIndex,
    nextBackground,
    prevBackground,
  } = useTheme();

  // interni indeks za navigacijo po temah
  const themeIndex = useMemo(
    () => themes.findIndex((t) => t.id === currentTheme.id),
    [currentTheme.id]
  );

  const [activeThemeIndex, setActiveThemeIndex] = useState(themeIndex);

  // ko se odpre, sinhroniziraj aktivni indeks s trenutno temo
  useEffect(() => {
    if (open) setActiveThemeIndex(themeIndex);
  }, [open, themeIndex]);

  // Esc, ↑/↓, ←/→, Enter/Space
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
        const next = clamp(activeThemeIndex + dir, 0, themes.length - 1);
        setActiveThemeIndex(next);
        // ob premiku s tipkami hitro tudi nastavi temo (live preview)
        const nextTheme = themes[next];
        if (nextTheme && nextTheme.id !== currentTheme.id) {
          setTheme(nextTheme.id);
        }
        return;
      }

      if (e.key === "ArrowLeft") {
        e.preventDefault();
        prevBackground();
        return;
      }
      if (e.key === "ArrowRight") {
        e.preventDefault();
        nextBackground();
        return;
      }

      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        const t = themes[activeThemeIndex];
        if (t && t.id !== currentTheme.id) {
          setTheme(t.id); // reset na 0 je OK le ob menjavi teme
        }
        onClose();
        return;
      }
    };

    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [
    open,
    activeThemeIndex,
    setTheme,
    nextBackground,
    prevBackground,
    currentTheme.id,
  ]);

  if (!open) return null;

  const handleBackdrop = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) onClose();
  };

  const handleThemeClick = (idx: number) => {
    setActiveThemeIndex(idx);
    const t = themes[idx];
    if (t) setTheme(t.id);
  };

  const activeTheme = themes[activeThemeIndex] ?? currentTheme;

  return (
    <div className={s.backdrop} onMouseDown={handleBackdrop}>
      <div
        className={s.modal}
        role="dialog"
        aria-modal="true"
        aria-labelledby="themeMenuTitle"
      >
        <header className={s.header}>
          <h2 id="themeMenuTitle" className={s.title}>
            Theme Menu
          </h2>
          <button className={s.close} onClick={onClose} aria-label="Close">
            ×
          </button>
        </header>{" "}
        <div className={s.layout}>
          {/* SEZNAM TEM */}
          <aside className={s.sidebar}>
            <ul className={s.themeList}>
              {themes.map((t, i) => {
                const isActive = i === activeThemeIndex;
                const isCurrent = t.id === currentTheme.id;
                return (
                  <li key={t.id}>
                    <button
                      className={[
                        s.themeItem,
                        isActive ? s.themeItemActive : "",
                        isCurrent ? s.themeItemCurrent : "",
                      ].join(" ")}
                      onClick={() => handleThemeClick(i)}
                    >
                      <span className={s.themeDot} aria-hidden />
                      <div className={s.themeText}>
                        <span className={s.themeName}>{t.name}</span>
                        <span className={s.themeSub}>
                          {t.typography.fontFamily.replace(/['"]/g, "")}
                        </span>
                      </div>
                    </button>
                  </li>
                );
              })}
            </ul>
          </aside>

          {/* OZADJA IZBRANE TEME */}
          <section className={s.content}>
            <div className={s.contentHeader}>
              <div className={s.currentInfo}>
                <span className={s.badge}>Theme</span>
                <strong>{activeTheme.name}</strong>
              </div>
              <div className={s.bgControls}>
                <button
                  className={s.iconBtn}
                  onClick={prevBackground}
                  aria-label="Previous background"
                >
                  ←
                </button>
                <span className={s.bgIndex}>
                  {currentBackgroundIndex + 1}/{activeTheme.backgrounds.length}
                </span>
                <button
                  className={s.iconBtn}
                  onClick={nextBackground}
                  aria-label="Next background"
                >
                  →
                </button>
              </div>
            </div>

            <ul className={s.bgGrid} role="list">
              {activeTheme.backgrounds.map((src, idx) => {
                const isSel =
                  activeTheme.id === currentTheme.id &&
                  idx === currentBackgroundIndex;
                return (
                  <li key={src} className={s.bgCell}>
                    <button
                      className={[s.bgThumb, isSel ? s.bgThumbActive : ""].join(
                        " "
                      )}
                      onClick={() => setBackgroundIndex(idx)}
                      title={`Background ${idx + 1}`}
                    >
                      {/* samo thumbnail preko CSS background-image; nič <img> za preprostost */}
                      <span
                        className={s.bgPreview}
                        style={{ backgroundImage: `url(${src})` }}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>

            <div className={s.help}>
              <kbd>↑/↓</kbd> menjava teme &nbsp;|&nbsp; <kbd>←/→</kbd> menjaj
              ozadje &nbsp;|&nbsp; <kbd>Enter</kbd> potrdi &nbsp;|&nbsp;{" "}
              <kbd>Esc</kbd> zapri
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
