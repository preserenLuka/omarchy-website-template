import { useState } from "react";
import LazyYouTube from "./LazyYouTube";
import s from "./YouTubeCard.module.css";

type Props = {
  videoId: string;
  title: string;
  channel?: string;
  publishedAt?: string;
};

export default function YouTubeCard({
  videoId,
  title,
  channel,
  publishedAt,
}: Props) {
  const [open, setOpen] = useState(false);

  if (open) {
    return (
      <div className={s.card}>
        <LazyYouTube videoId={videoId} title={title} autoplay />
      </div>
    );
  }

  const thumb = `https://i.ytimg.com/vi/${videoId}/mqdefault.jpg`;

  return (
    <button
      className={s.cardBtn}
      onClick={() => setOpen(true)}
      aria-label={`Play ${title}`}
    >
      <div className={s.thumb} style={{ backgroundImage: `url(${thumb})` }} />
      <div className={s.playOverlay}>▶</div>
      <div className={s.meta}>
        <div className={s.title} title={title}>
          {title}
        </div>
        {channel && <div className={s.sub}>{channel}</div>}
        {publishedAt && (
          <div className={s.sub}>
            {new Date(publishedAt).toLocaleDateString()}
          </div>
        )}
      </div>
    </button>
  );
}
