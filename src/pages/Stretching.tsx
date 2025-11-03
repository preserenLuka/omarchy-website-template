import { useState } from "react";
import { Link } from "react-router-dom";
import Tile from "../components/Tile";
import KnowledgeLibraryTile from "../tiles/KnowledgeLibraryTile";
import s from "./Stretching.module.css";

type View = "all" | "notes" | "videos";

export default function Stretching() {
  const [view, setView] = useState<View>("all");

  const Actions = (
    <div className={s.actionsBar}>
      <div className={s.segmented}>
        <button
          className={[s.segBtn, view === "all" ? s.segActive : ""].join(" ")}
          onClick={() => setView("all")}
        >
          All
        </button>
        <button
          className={[s.segBtn, view === "notes" ? s.segActive : ""].join(" ")}
          onClick={() => setView("notes")}
        >
          Notes
        </button>
        <button
          className={[s.segBtn, view === "videos" ? s.segActive : ""].join(" ")}
          onClick={() => setView("videos")}
        >
          Videos
        </button>
      </div>

      <Link to="/kb/new?tag=stretching" className={s.createBtn}>
        + Create New
      </Link>
    </div>
  );

  return (
    <div className={s.layout}>
      <Tile title="Knowledge Library" actions={Actions} className={s.lib}>
        <KnowledgeLibraryTile view={view} /*tagFilter="stretching"*/ />
      </Tile>
    </div>
  );
}
