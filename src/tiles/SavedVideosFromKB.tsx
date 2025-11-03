import { useEffect, useMemo, useState } from "react";
import YouTubeCard from "../components/youtube/YouTubeCard";
import { useHorizontalScroll } from "../hooks/useHorizontalScroll";
import s from "./SavedVideosTile.module.css";

// Keep same LS key as in KnowledgeLibrary/Editor
const LS_KEY = "kb_items";

type KBVideo = {
  id: string;
  type: "video";
  title: string;
  url: string;
  tags: string[];
  createdAt: string;
};

type Props = {
  tagFilter?: string; // e.g., "stretching" to only show those
};

function extractVideoId(input: string): string | null {
  if (!input) return null;
  const idLike = input.match(/^[A-Za-z0-9_-]{6,}$/)?.[0];
  if (idLike) return idLike;
  const m1 = input.match(/[?&]v=([^&]+)/);
  if (m1) return m1[1];
  const m2 = input.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (m2) return m2[1];
  return null;
}

export default function SavedVideosFromKB({ tagFilter }: Props) {
  const [items, setItems] = useState<KBVideo[]>([]);
  const rowRef = useHorizontalScroll<HTMLDivElement>();

  useEffect(() => {
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const arr = JSON.parse(raw) as any[];
      const videos = arr.filter((it) => it?.type === "video") as KBVideo[];
      setItems(videos);
    } catch {}
  }, []);

  const filtered = useMemo(() => {
    if (!tagFilter) return items;
    const t = tagFilter.toLowerCase();
    return items.filter((v) =>
      (v.tags || []).some((x) => x.toLowerCase() === t)
    );
  }, [items, tagFilter]);

  return (
    <div className={s.wrapper}>
      <div ref={rowRef} className={s.row} role="list" aria-label="Saved videos">
        {filtered.map((v) => {
          const vid = extractVideoId(v.url) ?? "";
          return (
            <div key={v.id} role="listitem" className={s.snap}>
              <YouTubeCard videoId={vid} title={v.title} />
            </div>
          );
        })}
      </div>
      <div className={s.hints}>
        Scroll z miško (tudi vertikalno) · <kbd>Shift</kbd>+<kbd>Scroll</kbd>{" "}
        deluje tudi
      </div>
    </div>
  );
}
