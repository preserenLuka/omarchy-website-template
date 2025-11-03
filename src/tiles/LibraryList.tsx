import s from "./KnowledgeLibraryTile.module.css";
import type { KBItem } from "./types";

type Props = {
  items: KBItem[];
  activeId: string | null;
  onSelect: (id: string) => void;
};

export default function LibraryList({ items, activeId, onSelect }: Props) {
  return (
    <ul className={s.list}>
      {items.map((it) => (
        <li key={it.id}>
          <button
            className={[s.row, activeId === it.id ? s.rowActive : ""].join(" ")}
            onClick={() => onSelect(it.id)}
            title={it.title}
          >
            <span className={s.dot} data-type={it.type} />
            <div className={s.meta}>
              <div className={s.title}>{it.title}</div>
              {!!it.tags?.length && (
                <div className={s.tags}>
                  {it.tags.slice(0, 3).map((t) => (
                    <span key={t} className={s.tag}>
                      #{t}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </button>
        </li>
      ))}
    </ul>
  );
}
