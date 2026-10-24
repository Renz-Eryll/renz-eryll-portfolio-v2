import { SKILLS } from "@/data/profile";
import { d } from "./reveal";

export function Toolkit() {
  return (
    <section id="toolkit" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-14">
        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-28">
            <span className="label">Stack</span>
            <h2 className="mt-5 line-mask text-[clamp(1.8rem,3.6vw,2.6rem)] font-medium leading-tight">
              <span>What I work with.</span>
            </h2>
            <p
              className="reveal mt-5 max-w-[34ch] text-[14px] leading-relaxed text-muted-foreground"
              style={d(160)}
            >
              Used in production, not just tutorials.
            </p>
          </div>
        </div>

        <div className="grid gap-px border border-border bg-border sm:grid-cols-2 lg:col-span-8">
          {SKILLS.map((s, i) => (
            <div key={s.group} className="reveal bg-background p-6 sm:p-7" style={d(i * 90)}>
              <div className="flex items-baseline justify-between">
                <h3 className="text-[17px] font-medium tracking-tight">{s.group}</h3>
                <span className="font-mono text-[11px] text-accent">
                  {String(i + 1).padStart(2, "0")}
                </span>
              </div>
              <ul className="mt-5 space-y-2.5">
                {s.items.map((item) => (
                  <li
                    key={item}
                    className="group flex items-center gap-3 text-[14px] text-muted-foreground transition-colors hover:text-foreground"
                  >
                    <span className="h-px w-3 bg-border-strong transition-all duration-500 group-hover:w-5 group-hover:bg-accent" />
                    {item}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
