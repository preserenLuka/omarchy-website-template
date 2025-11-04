// src/pages/TemplatePage.tsx
import React from "react";
import s from "./TemplatePage.module.css";

export default function TemplatePage() {
  return (
    <div className={s.wrapper}>
      <h2>How to add a new tile</h2>
      <p>
        This template shows how tiles work in this project. Follow the steps
        below to create your own pages and make them appear in the “Tiles”
        (Ctrl+J) menu.
      </p>

      <section className={s.section}>
        <h3>1. Create a page</h3>
        <p>
          Create a new component in <code>src/pages/</code>:
        </p>
        <pre className={s.code}>
          {`// src/pages/StatsPage.tsx
export default function StatsPage() {
  return <div>Stats go here</div>;
}`}
        </pre>
      </section>

      <section className={s.section}>
        <h3>2. Register it as a tile</h3>
        <p>
          Open <code>src/data/tiles.ts</code> and add it to the list so the app
          knows it exists:
        </p>
        <pre className={s.code}>
          {`import StatsPage from "../pages/StatsPage";

export type TileId = "template" | "settings" | "about" | "stats";

export const TILES = {
  // ...
  stats: {
    label: "Stats",
    render: () => <StatsPage />,
  },
};

export const AVAILABLE_TILES = [
  // ...
  { id: "stats", label: "Stats" },
];`}
        </pre>
        <p>Now you can open it from the tile menu.</p>
      </section>

      <section className={s.section}>
        <h3>3. (Optional) change keyboard shortcuts</h3>
        <p>
          Tile-moving, cycling and closing shortcuts are defined in{" "}
          <code>src/hooks/useTileShortcuts.ts</code>. Edit that file to change
          keys like <code>Ctrl+X</code> (close) or <code>Alt+→</code> (focus
          next).
        </p>
      </section>
    </div>
  );
}
