import { useEffect, useMemo, useState } from "react";
import s from "./KnowledgeLibraryTile.module.css";
import LibraryList from "./LibraryList";
import LibraryDetail from "./LibraryDetail";
import VideoGallery from "./VideoGallery";
import type { KBItem, KBVideo } from "./types";
import { LS_KEY } from "./types";

type Props = {
  items?: KBItem[];
  view?: "all" | "notes" | "videos";
  tagFilter?: string | string[]; // optional page-level tag filter
};

// --- helpers ---
function toLower(s: any) {
  return (s ?? "").toString().trim().toLowerCase();
}

function normalizeTags(raw: any): string[] {
  if (Array.isArray(raw)) return raw.map(toLower).filter(Boolean);
  if (typeof raw === "string") {
    // split on commas, spaces, and '#', keep only non-empty words
    return raw
      .split(/[,#\s]+/g)
      .map(toLower)
      .filter(Boolean);
  }
  return [];
}

function normalizeItem(it: any): KBItem | null {
  if (!it || !it.id || !it.title) return null;
  const type = toLower(it.type);
  const tags = normalizeTags(it.tags);

  if (type === "note") {
    return {
      id: String(it.id),
      type: "note",
      title: String(it.title),
      content: String(it.content ?? ""),
      tags,
      createdAt: String(it.createdAt ?? new Date().toISOString()),
    };
  }
  if (type === "video") {
    return {
      id: String(it.id),
      type: "video",
      title: String(it.title),
      url: String(it.url ?? ""),
      tags,
      createdAt: String(it.createdAt ?? new Date().toISOString()),
    };
  }
  return null;
}

export default function KnowledgeLibraryTile({
  items,
  view = "all",
  tagFilter,
}: Props) {
  const [lsItems, setLsItems] = useState<KBItem[]>([]);
  const [q, setQ] = useState("");
  const [activeId, setActiveId] = useState<string | null>(null);

  // Load + normalize from localStorage unless external items provided
  useEffect(() => {
    if (items && items.length) return;
    const raw = localStorage.getItem(LS_KEY);
    if (!raw) return;
    try {
      const arr = JSON.parse(raw) as any[];
      const normalized = arr.map(normalizeItem).filter(Boolean) as KBItem[];
      setLsItems(normalized);
    } catch {
      // ignore parse errors
    }
  }, [items]);

  const data = (items && items.length ? items : lsItems) as KBItem[];

  /* ---------------- Filtering logic ---------------- */
  const filtered = useMemo(() => {
    const term = q.trim().toLowerCase();

    // normalize wanted tags
    const tagsWanted = Array.isArray(tagFilter)
      ? tagFilter
          .map((t) => (t ?? "").toString().trim().toLowerCase())
          .filter(Boolean)
      : tagFilter
      ? [(tagFilter ?? "").toString().trim().toLowerCase()]
      : null;

    // 1) TAG filter
    let byTag = !tagsWanted
      ? data
      : data.filter((it) =>
          (it.tags || []).some((t) =>
            tagsWanted.includes((t ?? "").toString().toLowerCase())
          )
        );

    // 🔁 fallback: if tag filter yields nothing, show all (prevents “empty” screens)
    if (tagsWanted && byTag.length === 0) byTag = data;

    // 2) VIEW filter
    if (view === "notes") byTag = byTag.filter((it) => it.type === "note");
    if (view === "videos") byTag = byTag.filter((it) => it.type === "video");

    // 3) SEARCH filter
    if (!term) return byTag;
    return byTag.filter((it) => {
      const inTitle = it.title.toLowerCase().includes(term);
      const inTags = (it.tags || []).some((t) =>
        (t ?? "").toString().toLowerCase().includes(term)
      );
      return inTitle || inTags;
    });
  }, [data, q, view, tagFilter]);

  const active = filtered.find((it) => it.id === activeId) || filtered[0];

  /* ---------------- Videos view ---------------- */
  if (view === "videos") {
    return (
      <div className={s.galleryWrapper}>
        <div className={s.topBar}>
          <input
            value={q}
            onChange={(e) => setQ(e.target.value)}
            className={s.search}
            placeholder="Search videos…"
          />
        </div>
        <VideoGallery items={(filtered as KBVideo[]) ?? []} />
      </div>
    );
  }

  /* ---------------- List + Detail view ---------------- */
  return (
    <div className={s.wrapper}>
      <div className={s.topBar}>
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className={s.search}
          placeholder={
            view === "notes" ? "Search notes…" : "Search notes/videos…"
          }
        />
      </div>

      <div className={s.split}>
        <LibraryList
          items={filtered}
          activeId={active?.id ?? null}
          onSelect={setActiveId}
        />
        <LibraryDetail item={active} />
      </div>
    </div>
  );
}
