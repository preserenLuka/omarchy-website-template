import { useNavigate } from "react-router-dom";
import Tile from "../components/Tile";
import KnowledgeEditorTile from "../tiles/KnowledgeEditorTile";
import s from "./KBNew.module.css";
import { useSearchParams } from "react-router-dom";

export default function KBNew() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const defaultTag = (params.get("tag") || "").toLowerCase();

  return (
    <div className={s.full}>
      <button className={s.back} onClick={() => navigate(-1)}>
        ← Back
      </button>
      <Tile title="Create Knowledge Item">
        <KnowledgeEditorTile defaultTag={defaultTag} /> {/* NEW */}
      </Tile>
    </div>
  );
}
