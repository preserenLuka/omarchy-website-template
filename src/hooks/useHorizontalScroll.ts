import { useEffect, useRef } from "react";

/**
 * Wheel-only horizontal scroll.
 * - Converts vertical wheel (deltaY) into horizontal scroll.
 * - NO drag/press handlers, so clicks are never blocked.
 */
export function useHorizontalScroll<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onWheel = (e: WheelEvent) => {
      // If user is scrolling vertically more than horizontally, translate to X.
      if (Math.abs(e.deltaY) > Math.abs(e.deltaX)) {
        e.preventDefault();
        el.scrollBy({ left: e.deltaY, behavior: "auto" });
      }
    };

    // IMPORTANT: passive: false so we can preventDefault
    el.addEventListener("wheel", onWheel, { passive: false });

    return () => {
      el.removeEventListener("wheel", onWheel as any);
    };
  }, []);

  return ref;
}
