export type KBNote = {
  id: string;
  type: "note";
  title: string;
  content: string;
  tags: string[];
  createdAt: string;
};

export type KBVideo = {
  id: string;
  type: "video";
  title: string;
  url: string;
  tags: string[];
  createdAt: string;
};

export type KBItem = KBNote | KBVideo;

export const LS_KEY = "kb_items";

export function extractVideoId(input: string): string | null {
  if (!input) return null;
  const idLike = input.match(/^[A-Za-z0-9_-]{6,}$/)?.[0];
  if (idLike) return idLike;
  const m1 = input.match(/[?&]v=([^&]+)/);
  if (m1) return m1[1];
  const m2 = input.match(/youtu\.be\/([A-Za-z0-9_-]+)/);
  if (m2) return m2[1];
  return null;
}
