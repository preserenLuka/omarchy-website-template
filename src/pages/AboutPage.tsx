import React from "react";
import s from "./AboutPage.module.css";

export default function AboutPage() {
  return (
    <div className={s.wrapper}>
      <h2>About</h2>
      <p>
        This is a lightweight React tile-based template built for modular
        dashboards, toolkits, or personal projects.
      </p>

      <p>
        You can open and close tiles with keyboard shortcuts or from the menu.
      </p>
      <p>
        You can also change the theme very simply and it affects the styling of
        the whole site.
      </p>

      <div className={s.infoBox}>
        <strong>Version:</strong> 1.0.0
        <br />
        <strong>Created by:</strong> Luka_P
      </div>
    </div>
  );
}
