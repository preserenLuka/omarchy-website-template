import { useEffect, useState } from "react";
import s from "./KnowledgeEditorTile.module.css";

type KBItem =
  | {
      id: string;
      type: "note";
      title: string;
      content: string;
      tags: string[];
      createdAt: string;
    }
  | {
      id: string;
      type: "video";
      title: string;
      url: string;
      tags: string[];
      createdAt: string;
    };

type Props = { defaultTag?: string };

const LS_KEY = "kb_items";

function normalizeTags(raw: string): string[] {
  return (raw || "")
    .split(/[,#\s]+/g)
    .map((t) => t.trim().toLowerCase())
    .filter(Boolean);
}

export default function KnowledgeEditorTile({ defaultTag }: Props) {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState(""); // note content OR video url
  const [type, setType] = useState<"note" | "video">("note");
  const [tags, setTags] = useState(defaultTag ? defaultTag : "");
  const [savedCount, setSavedCount] = useState(0);

  // load current count
  useEffect(() => {
    try {
      const arr: KBItem[] = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
      setSavedCount(arr.length);
    } catch {
      /* ignore */
    }
  }, []);

  // if defaultTag changes and there are no manual tags yet, seed it
  useEffect(() => {
    if (defaultTag && !tags) setTags(defaultTag);
  }, [defaultTag]); // eslint-disable-line react-hooks/exhaustive-deps

  const save = () => {
    const createdAt = new Date().toISOString();
    const tagArr = normalizeTags(tags);
    const id = crypto.randomUUID();

    const newItem: KBItem =
      type === "note"
        ? {
            id,
            type: "note",
            title: title || "Untitled",
            content,
            tags: tagArr,
            createdAt,
          }
        : {
            id,
            type: "video",
            title: title || "Video",
            url: content,
            tags: tagArr,
            createdAt,
          };

    let arr: KBItem[] = [];
    try {
      arr = JSON.parse(localStorage.getItem(LS_KEY) || "[]");
    } catch {
      arr = [];
    }
    arr.unshift(newItem);
    localStorage.setItem(LS_KEY, JSON.stringify(arr));
    setSavedCount(arr.length);

    // reset inputs but keep defaultTag prefill
    setTitle("");
    setContent("");
    setTags(defaultTag ?? "");
  };

  return (
    <div className={s.wrapper}>
      <div className={s.row}>
        <label className={s.label}>Type</label>
        <select
          className={s.input}
          value={type}
          onChange={(e) => setType(e.target.value as "note" | "video")}
        >
          <option value="note">Note</option>
          <option value="video">Video</option>
        </select>
        <div className={s.counter}>{savedCount} items</div>
      </div>

      <label className={s.label}>Title</label>
      <input
        className={s.input}
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />

      {type === "note" ? (
        <>
          <label className={s.label}>Content</label>
          <textarea
            className={s.textarea}
            rows={4}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="Write your note..."
          />
        </>
      ) : (
        <>
          <label className={s.label}>YouTube URL (or videoId)</label>
          <input
            className={s.input}
            value={content}
            onChange={(e) => setContent(e.target.value)}
            placeholder="https://www.youtube.com/watch?v=…"
          />
        </>
      )}

      <label className={s.label}>Tags (comma / space / # separated)</label>
      <input
        className={s.input}
        value={tags}
        onChange={(e) => setTags(e.target.value)}
        placeholder="stretching, hips, neck"
      />

      <div className={s.actions}>
        <button className={s.primary} onClick={save}>
          Save
        </button>
      </div>
    </div>
  );
}
