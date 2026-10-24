import { useEffect, useRef, useState } from "react";
import { PROFILE } from "@/data/profile";

const SECTIONS = [
  { id: "profile", label: "About" },
  { id: "experience", label: "Experience" },
  { id: "work", label: "Projects" },
  { id: "toolkit", label: "Stack" },
  { id: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState<string>("profile");
  const [open, setOpen] = useState(false);
  const listRef = useRef<HTMLDivElement>(null);
  const [indicator, setIndicator] = useState({ left: 0, width: 0, on: false });
  const [theme, setTheme] = useState<"light" | "dark">(() =>
    document.documentElement.dataset["theme"] === "dark" ? "dark" : "light",
  );

  const toggleTheme = () => {
    const next = theme === "light" ? "dark" : "light";
    document.documentElement.dataset["theme"] = next;
    localStorage.setItem("theme", next);
    setTheme(next);
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
        if (visible) setActive(visible.target.id);
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: [0, 0.2, 0.6] },
    );
    SECTIONS.forEach((s) => {
      const el = document.getElementById(s.id);
      if (el) io.observe(el);
    });
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const el = listRef.current?.querySelector<HTMLElement>(`[data-nav="${active}"]`);
    if (!el || !listRef.current) return;
    const parent = listRef.current.getBoundingClientRect();
    const r = el.getBoundingClientRect();
    setIndicator({ left: r.left - parent.left, width: r.width, on: true });
  }, [active]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-500 ${
        scrolled
          ? "border-b border-border bg-background/72 backdrop-blur-xl"
          : "border-b border-transparent bg-transparent"
      }`}
      style={{ transitionTimingFunction: "var(--ease)" }}
    >
      <div className="shell flex h-16 items-center justify-between gap-6">
        <a
          href="#top"
          className="group flex shrink-0 items-center gap-2.5"
          aria-label="Renz Eryll Ramelo — back to top"
        >
          <img src="/renz-logo.png" alt="Renz" className="logo-adaptive h-8 w-auto" />
        </a>

        <nav aria-label="Sections" className="hidden md:block">
          <div ref={listRef} className="relative flex items-center gap-7">
            {SECTIONS.map((s) => (
              <a
                key={s.id}
                data-nav={s.id}
                href={`#${s.id}`}
                aria-current={active === s.id ? "true" : undefined}
                className={`py-2 text-[13px] transition-colors duration-300 ${
                  active === s.id
                    ? "text-foreground"
                    : "text-muted-foreground hover:text-foreground"
                }`}
              >
                {s.label}
              </a>
            ))}
            <span
              aria-hidden
              className="pointer-events-none absolute -bottom-0.5 h-px bg-accent transition-all duration-500"
              style={{
                left: indicator.left,
                width: indicator.width,
                opacity: indicator.on ? 1 : 0,
                transitionTimingFunction: "var(--ease)",
              }}
            />
          </div>
        </nav>

        <div className="hidden items-center gap-5 lg:flex">
          <a
            className="link-line label text-[10px] hover:text-foreground"
            href={PROFILE.github}
            target="_blank"
            rel="noreferrer noopener"
          >
            GitHub <span className="arrow">↗</span>
          </a>
          <a
            className="link-line label text-[10px] hover:text-foreground"
            href={PROFILE.linkedin}
            target="_blank"
            rel="noreferrer noopener"
          >
            LinkedIn <span className="arrow">↗</span>
          </a>
          <a
            className="link-line label text-[10px] text-accent hover:text-accent"
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer noopener"
          >
            Resume <span className="arrow">↗</span>
          </a>
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-sm transition-colors hover:border-accent"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
            title={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span aria-hidden>{theme === "light" ? "☾" : "☀"}</span>
          </button>
        </div>

        <div className="flex items-center gap-2 md:hidden">
          <button
            type="button"
            onClick={toggleTheme}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-border bg-surface text-sm"
            aria-label={`Switch to ${theme === "light" ? "dark" : "light"} mode`}
          >
            <span aria-hidden>{theme === "light" ? "☾" : "☀"}</span>
          </button>
          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-expanded={open}
            aria-label="Toggle navigation"
            className="label -mr-1 px-1 py-2 text-[10px] text-foreground"
          >
            {open ? "Close" : "Menu"}
          </button>
        </div>
      </div>

      <div
        className={`overflow-hidden border-t border-border bg-background/95 backdrop-blur-xl transition-[max-height,opacity] duration-500 md:hidden ${
          open ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
        }`}
        style={{ transitionTimingFunction: "var(--ease)" }}
      >
        <nav className="shell flex flex-col py-3" aria-label="Mobile">
          {SECTIONS.map((s, i) => (
            <a
              key={s.id}
              href={`#${s.id}`}
              onClick={() => setOpen(false)}
              className="flex items-baseline justify-between border-b border-border py-3 text-[15px]"
            >
              {s.label}
              <span className="label text-[10px]">0{i + 1}</span>
            </a>
          ))}
          <a
            href={PROFILE.resume}
            target="_blank"
            rel="noreferrer noopener"
            className="flex items-baseline justify-between py-3 text-[15px] text-accent"
          >
            Resume (PDF)
            <span className="label text-[10px] text-accent">↗</span>
          </a>
        </nav>
      </div>
    </header>
  );
}
