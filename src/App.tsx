import { Routes, Route, Link } from "react-router-dom";
import { useState } from "react";
import { useTheme } from "./context/ThemeContext";
import { useKeyboardShortcut } from "./hooks/useKeyboardShortcut";
import Home from "./pages/Home";
import Exercises from "./pages/Exercises";
import Stretching from "./pages/Stretching";
import KBNew from "./pages/KBNew";
import InjuryPrevention from "./pages/InjuryPrevention";

import ThemeMenu from "./Menu/ThemeMenu";
import NavMenu from "./Menu/NavMenu";

import s from "./App.module.css";

function App() {
  const [themeMenuOpen, setThemeMenuOpen] = useState(false);
  const [navMenuOpen, setNavMenuOpen] = useState(false);
  const { currentTheme } = useTheme();

  // Ctrl/Cmd + K → Theme menu
  useKeyboardShortcut({ ctrl: true, key: "k" }, () =>
    setThemeMenuOpen((v) => !v)
  );

  // Ctrl/Cmd + J → Nav menu
  useKeyboardShortcut({ ctrl: true, key: "j" }, () =>
    setNavMenuOpen((v) => !v)
  );

  return (
    <div className={s.root}>
      <nav className={s.nav}>
        {/* primer levega linka + desni gumb za temo */}
        <div className={s.navInner}>
          <Link to="/" className={s.brand}>
            MyApp
          </Link>
          <div className={s.navActions}>
            <button className={s.navBtn} onClick={() => setNavMenuOpen(true)}>
              Open Nav (Ctrl+J)
            </button>
            <button className={s.navBtn} onClick={() => setThemeMenuOpen(true)}>
              Theme (Ctrl+K)
            </button>
          </div>
        </div>
      </nav>

      <main className={s.main}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/exercises" element={<Exercises />} />
          <Route path="/stretching" element={<Stretching />} />
          <Route path="/injury-prevention" element={<InjuryPrevention />} />
          <Route path="/kb/new" element={<KBNew />} />
        </Routes>
      </main>

      {/* Meniji na dnu, da prekrivajo vse */}
      <ThemeMenu open={themeMenuOpen} onClose={() => setThemeMenuOpen(false)} />
      <NavMenu open={navMenuOpen} onClose={() => setNavMenuOpen(false)} />
    </div>
  );
}

export default App;
