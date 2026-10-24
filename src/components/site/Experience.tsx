import { ROLES } from "@/data/profile";
import { d } from "./reveal";

export function Experience() {
  return (
    <section id="experience" className="shell scroll-mt-24 py-24 sm:py-32">
      <span className="label">Experience</span>
      <h2 className="mt-5 line-mask text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium leading-tight">
        <span>Where I've shipped.</span>
      </h2>

      <ol className="mt-12 border-t border-border">
        {ROLES.map((r, i) => (
          <li
            key={`${r.org}-${r.period}`}
            className="reveal group grid gap-6 border-b border-border py-10 lg:grid-cols-12 lg:gap-10"
            style={d(i * 110)}
          >
            <div className="lg:col-span-4">
              <span
                className={`font-mono text-[11px] uppercase tracking-[0.16em] ${
                  i === 0 ? "text-accent" : "text-muted-foreground"
                }`}
              >
                {r.period}
              </span>
              <h3 className="mt-3 text-[clamp(1.2rem,1.9vw,1.45rem)] font-medium tracking-tight">
                {r.title}
              </h3>
              <p className="mt-1.5 text-[14px] text-foreground/80">
                {r.org}
                {r.via && <span className="text-muted-foreground"> · {r.via}</span>}
              </p>
              <span className="label mt-3 block text-[10px]">{r.mode}</span>
            </div>

            <div className="lg:col-span-8">
              <p className="text-[15px] text-muted-foreground">{r.summary}</p>
              <ul className="mt-5 space-y-2.5">
                {r.points.map((p) => (
                  <li
                    key={p}
                    className="grid grid-cols-[18px_1fr] gap-2 text-[15px] leading-relaxed text-foreground/90"
                  >
                    <span aria-hidden className="mt-[0.75em] h-px w-2.5 bg-accent" />
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 flex flex-wrap gap-2">
                {r.stack.map((t) => (
                  <li
                    key={t}
                    className="border border-border bg-surface px-2.5 py-1 font-mono text-[11px] text-muted-foreground"
                  >
                    {t}
                  </li>
                ))}
              </ul>
            </div>
          </li>
        ))}
      </ol>
    </section>
  );
}
