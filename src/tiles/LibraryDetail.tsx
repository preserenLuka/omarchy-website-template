import s from "./KnowledgeLibraryTile.module.css";
import LazyYouTube from "../components/youtube/LazyYouTube";
import type { KBItem, KBNote, KBVideo } from "./types";
import { extractVideoId } from "./types";

type Props = { item?: KBItem | null };

export default function LibraryDetail({ item }: Props) {
  return (
    <div className={s.detail}>
      {!item ? (
        <div className={s.empty}>No items</div>
      ) : item.type === "note" ? (
        <NoteView item={item} />
      ) : (
        <VideoView item={item} />
      )}
    </div>
  );
}

function NoteView({ item }: { item: KBNote }) {
  return (
    <div className={s.noteBody}>
      <h4 className={s.detailTitle}>{item.title}</h4>
      <p className={s.noteText}>{item.content}</p>
    </div>
  );
}

function VideoView({ item }: { item: KBVideo }) {
  return (
    <div className={s.videoBody}>
      <h4 className={s.detailTitle}>{item.title}</h4>
      <LazyYouTube
        videoId={extractVideoId(item.url) ?? ""}
        title={item.title}
      />
    </div>
  );
}
