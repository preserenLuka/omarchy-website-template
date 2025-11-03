import { useState } from "react";
import { AiOutlineInfoCircle } from "react-icons/ai";
import LazyYouTube from "../components/youtube/LazyYouTube";
import s from "./KnowledgeLibraryTile.module.css";
import type { KBVideo } from "./types";
import { extractVideoId } from "./types";

type Props = { items: KBVideo[] };

export default function VideoGallery({ items }: Props) {
  const [playingId, setPlayingId] = useState<string | null>(null);

  return (
    <div className={s.videoGrid}>
      {items.length === 0 && <div className={s.empty}>No videos</div>}

      {items.map((it) => {
        const vid = extractVideoId(it.url);
        if (!vid) return null;

        const isPlaying = playingId === it.id;
        const description =
          (it as any).description || (it as any).content || "No description";

        return (
          <div key={it.id} className={s.videoCard}>
            <div
              className={s.thumbWrap}
              onClick={() => setPlayingId(isPlaying ? null : it.id)}
              role="button"
              aria-label={isPlaying ? "Stop" : `Play ${it.title}`}
            >
              {isPlaying ? (
                <div className={s.player}>
                  <LazyYouTube videoId={vid} title={it.title} autoplay />
                </div>
              ) : (
                <div
                  className={s.thumb}
                  style={{
                    backgroundImage: `url(https://i.ytimg.com/vi/${vid}/hqdefault.jpg)`,
                  }}
                >
                  <div className={s.playBadge}>▶</div>
                </div>
              )}
            </div>

            <div className={s.vTitleRow}>
              <div className={s.vTitle} title={it.title}>
                {it.title}
              </div>
              <div className={s.infoWrap}>
                <AiOutlineInfoCircle className={s.infoIcon} />
                <div className={s.tooltip}>{description}</div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}
