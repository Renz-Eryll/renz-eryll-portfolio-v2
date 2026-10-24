import { useEffect, useRef, useState } from "react";
import { FEATURED, MORE_WORK, type Project } from "@/data/profile";
import { d } from "./reveal";

function useParallax(range = 14) {
  const ref = useRef<HTMLDivElement>(null);
  const [y, setY] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(max-width: 767px), (prefers-reduced-motion: reduce)").matches) return;

    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const r = el.getBoundingClientRect();
        const p = (r.top + r.height / 2 - window.innerHeight / 2) / window.innerHeight;
        setY(Math.max(-1, Math.min(1, p)) * range);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
    };
  }, [range]);

  return { ref, y };
}

/** Screenshot inside a minimal browser frame, so every project reads as a shipped product. */
function Visual({ project }: { project: Project }) {
  const { ref, y } = useParallax();
  const img = project.image;
  const host = project.live
    ? new URL(project.live).host
    : (project.code?.replace("https://", "") ?? project.name);

  return (
    <div ref={ref} className="reveal group/vis">
      <div className="overflow-hidden border border-border bg-surface transition-colors duration-500 group-hover/vis:border-border-strong">
        <div className="flex items-center gap-3 border-b border-border px-3 py-2.5">
          <span className="flex gap-1.5" aria-hidden>
            <span className="h-2 w-2 rounded-full bg-border-strong" />
            <span className="h-2 w-2 rounded-full bg-border-strong" />
            <span className="h-2 w-2 rounded-full bg-border-strong" />
          </span>
          <span className="truncate font-mono text-[10.5px] text-muted-foreground">{host}</span>
        </div>
        <div
          className="overflow-hidden bg-surface-2"
          style={{ aspectRatio: `${img.w} / ${img.h}` }}
        >
          <img
            src={img.src}
            alt={img.alt}
            width={img.w}
            height={img.h}
            loading="lazy"
            className="h-[calc(100%+28px)] w-full object-cover transition-transform duration-[900ms] group-hover/vis:scale-[1.02]"
            style={{
              transform: `translate3d(0, ${y - 14}px, 0)`,
              transitionTimingFunction: "var(--ease)",
            }}
          />
        </div>
      </div>
    </div>
  );
}

function Links({ project }: { project: Project }) {
  if (!project.live && !project.code) return null;
  return (
    <div className="flex flex-wrap items-center gap-x-7 gap-y-3">
      {project.live && (
        <a
          href={project.live}
          target="_blank"
          rel="noreferrer noopener"
          className="link-line text-[13px] text-foreground"
        >
          Live site <span className="arrow">↗</span>
        </a>
      )}
      {project.code && (
        <a
          href={project.code}
          target="_blank"
          rel="noreferrer noopener"
          className="link-line text-[13px] text-muted-foreground hover:text-foreground"
        >
          Source code <span className="arrow">↗</span>
        </a>
      )}
    </div>
  );
}

function Featured({ project, index }: { project: Project; index: number }) {
  const flip = index % 2 === 1;
  return (
    <article
      id={project.slug}
      className="shell mt-24 grid gap-10 first:mt-20 sm:mt-32 lg:grid-cols-12 lg:items-center lg:gap-14"
    >
      <div className={`lg:col-span-7 ${flip ? "lg:order-2" : ""}`}>
        <Visual project={project} />
      </div>

      <div className={`lg:col-span-5 ${flip ? "lg:order-1" : ""}`}>
        <div className="reveal flex items-baseline gap-4" style={d(80)}>
          <span className="font-mono text-[13px] text-accent">
            {String(index + 1).padStart(2, "0")}
          </span>
          <span className="label text-[10px]">
            {project.kind} / {project.year}
          </span>
        </div>
        <h3 className="mt-4 line-mask text-[clamp(1.6rem,2.8vw,2.2rem)] font-medium leading-tight">
          <span>{project.name}</span>
        </h3>
        <p className="reveal mt-1.5 text-[15px] text-foreground/80" style={d(120)}>
          {project.tagline}
        </p>
        <p
          className="reveal mt-5 max-w-[48ch] text-[15px] leading-relaxed text-muted-foreground"
          style={d(160)}
        >
          {project.summary}
        </p>

        <ul className="reveal mt-7 border-t border-border" style={d(240)}>
          {project.notes.map((n) => (
            <li
              key={n}
              className="grid grid-cols-[18px_1fr] gap-2 border-b border-border py-3 text-[13.5px] leading-snug text-foreground/85"
            >
              <span aria-hidden className="mt-[0.6em] h-px w-2.5 bg-accent" />
              {n}
            </li>
          ))}
        </ul>

        <ul className="reveal mt-6 flex flex-wrap gap-x-5 gap-y-2" style={d(300)}>
          {project.stack.map((t) => (
            <li key={t} className="label text-[10px] text-foreground">
              {t}
            </li>
          ))}
        </ul>

        <div className="reveal mt-8" style={d(360)}>
          <Links project={project} />
        </div>
      </div>
    </article>
  );
}

export function Projects() {
  const offset = FEATURED.length;

  return (
    <section id="work" className="scroll-mt-24 py-24 sm:py-32">
      <div className="shell">
        <div className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <span className="label">Selected work</span>
            <h2 className="mt-5 text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium leading-tight line-mask">
              <span>Built, shipped, in use.</span>
            </h2>
          </div>
          <p className="label max-w-[32ch] text-[10px] leading-relaxed">
            Client work and personal builds.
          </p>
        </div>
      </div>

      <div>
        {FEATURED.map((p, i) => (
          <Featured key={p.slug} project={p} index={i} />
        ))}
      </div>

      {/* Project index */}
      <div className="shell mt-28 sm:mt-36">
        <div className="flex items-end justify-between">
          <span className="label">Index / More work</span>
          <span className="label text-[10px]">
            {String(offset + 1).padStart(2, "0")} —{" "}
            {String(offset + MORE_WORK.length).padStart(2, "0")}
          </span>
        </div>
        <ul className="mt-6 border-t border-border">
          {MORE_WORK.map((item, i) => {
            const rowClass =
              "reveal group relative grid w-full grid-cols-[36px_1fr_auto] items-center gap-4 border-b border-border px-2 py-5 text-left transition-colors duration-400 hover:bg-surface/70 sm:grid-cols-[48px_1fr_180px_120px_60px_28px] sm:px-4";
            const cells = (
              <>
                <span className="font-mono text-[11px] text-muted-foreground group-hover:text-accent">
                  {String(offset + i + 1).padStart(2, "0")}
                </span>
                <span className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                  <span className="text-[16px] transition-transform duration-500 group-hover:translate-x-1.5">
                    {item.name}
                  </span>
                  {item.live && (
                    // Sits above the row's stretched link, so the repo stays one click away.
                    <a
                      href={item.code}
                      target="_blank"
                      rel="noreferrer noopener"
                      className="link-line relative z-10 font-mono text-[10.5px] text-muted-foreground hover:text-foreground"
                    >
                      code ↗
                    </a>
                  )}
                </span>
                <span className="label hidden text-[10px] sm:block">{item.stack}</span>
                <span className="label hidden text-[10px] sm:block">{item.kind}</span>
                <span className="label hidden text-[10px] sm:block">{item.year}</span>
                <span className="arrow text-sm text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                  ↗
                </span>
              </>
            );
            return (
              <li key={item.name} className={rowClass} style={d(i * 90)}>
                {/* Stretched link: the whole row opens the live site (or the repo if not deployed). */}
                <a
                  href={item.live ?? item.code}
                  target="_blank"
                  rel="noreferrer noopener"
                  aria-label={`${item.name}${item.live ? " (live site)" : " (source code)"}`}
                  className="absolute inset-0"
                />
                {cells}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
