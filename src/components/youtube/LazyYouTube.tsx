import { useState } from "react";
import s from "./LazyYouTube.module.css";

type Props = {
  videoId: string; // e.g., "ljxrqutpUTo"
  title?: string;
  autoplay?: boolean; // default true
  start?: number;
};

export default function LazyYouTube({
  videoId,
  title,
  autoplay = true,
  start,
}: Props) {
  const [active, setActive] = useState(true); // start active so YouTubeCard can render it immediately
  const src =
    `https://www.youtube.com/embed/${videoId}` +
    `?rel=0&modestbranding=1&autohide=1&showinfo=0` +
    (autoplay ? `&autoplay=1` : ``) +
    (start ? `&start=${start}` : ``);

  return (
    <div className={s.wrapper} aria-label={title || "YouTube video"}>
      {active && (
        <iframe
          className={s.iframe}
          src={src}
          title={title || "YouTube video player"}
          frameBorder={0}
          referrerPolicy="strict-origin-when-cross-origin"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          loading="lazy"
        />
      )}
    </div>
  );
}
