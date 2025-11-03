// src/tiles/SavedVideosTile.tsx
import YouTubeCard from "../components/youtube/YouTubeCard";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import type { SavedVideo } from "../types/video";
import s from "./SavedVideosTile.module.css";

type Props = { items: SavedVideo[] };

export default function SavedVideosTile({ items }: Props) {
  const rowRef = useHorizontalScroll<HTMLDivElement>();

  return (
    <div className={s.wrapper}>
      <div ref={rowRef} className={s.row} role="list" aria-label="Saved videos">
        {items.map((v) => (
          <div key={v.id} role="listitem" className={s.snap}>
            <YouTubeCard
              videoId={v.id}
              title={v.title}
              channel={v.channel}
              publishedAt={v.publishedAt}
            />
            {v.savedNote && <div className={s.note}>★ {v.savedNote}</div>}
          </div>
        ))}
      </div>

      <div className={s.hints}>
        Scroll z miško (tudi vertikalno) · potegni za premik · <kbd>Shift</kbd>+
        <kbd>Scroll</kbd> deluje tudi
      </div>
    </div>
  );
}
