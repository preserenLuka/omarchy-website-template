//hooks/moveTile.tsx

export default function moveTile<T>(arr: T[], from: number, to: number): T[] {
  if (from < 0 || from >= arr.length || to < 0 || to > arr.length) {
    throw new Error(
      `Invalid indices: from=${from}, to=${to}, length=${arr.length}`
    );
  }
  if (from === to) {
    return arr.slice();
  }
  const copy = arr.slice();
  const item = copy.splice(from, 1)[0];
  copy.splice(to, 0, item);
  return copy;
}
