import { useEffect } from "react";

/**
 * One IntersectionObserver for the whole page.
 * Any element with a `reveal`, `line-mask` or `grow-x` class plays once.
 */
export function useRevealObserver() {
  useEffect(() => {
    const nodes = Array.from(
      document.querySelectorAll<HTMLElement>(".reveal, .line-mask, .grow-x"),
    );

    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      nodes.forEach((n) => n.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("is-in");
            io.unobserve(e.target);
          }
        });
      },
      { rootMargin: "0px 0px -12% 0px", threshold: 0.12 },
    );

    nodes.forEach((n) => io.observe(n));
    return () => io.disconnect();
  }, []);
}

export const d = (ms: number) => ({ ["--d" as string]: `${ms}ms` }) as React.CSSProperties;
