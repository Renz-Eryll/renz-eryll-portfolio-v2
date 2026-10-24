import { PROFILE } from "@/data/profile";
import { SystemMap } from "./SystemMap";
import { d } from "./reveal";

const SNAPSHOT = [
  { k: "Currently", v: "Anervea (GRG Health)" },
  { k: "Stack", v: "Python · TypeScript · Next.js" },
  { k: "Based in", v: "Philippines · Remote" },
  { k: "Education", v: "BS Information Technology, 2025" },
];

export function Hero() {
  return (
    <section id="top" className="relative overflow-hidden pt-28 sm:pt-36">
      {/* background motif */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="grid-bg absolute inset-0 opacity-[0.55] [mask-image:radial-gradient(120%_80%_at_70%_0%,black,transparent_75%)]" />
      </div>

      <div className="shell relative">
        <div className="grid gap-14 lg:grid-cols-12 lg:gap-10">
          <div className="lg:col-span-7">
            <div className="reveal" style={d(80)}>
              <p className="text-[clamp(1.05rem,1.6vw,1.25rem)] font-medium tracking-tight">
                {PROFILE.name}
              </p>
              <div className="mt-2 flex flex-wrap items-center gap-x-4 gap-y-2">
                <span className="label text-foreground">{PROFILE.role}</span>
                <span className="h-3 w-px bg-border-strong" />
                <span className="label">{PROFILE.location}</span>
              </div>
            </div>

            <h1 className="mt-8 display max-w-[16ch]">
              {["I ship features", "from API to UI", "to tests."].map((line, i) => (
                <span key={line} className="line-mask" style={d(220 + i * 110)}>
                  <span className={i === 2 ? "text-accent" : ""}>{line}</span>
                </span>
              ))}
            </h1>

            <p
              className="reveal mt-7 max-w-[46ch] text-[15px] leading-relaxed text-muted-foreground sm:text-base"
              style={d(620)}
            >
              Full-stack engineer on a pharma intelligence platform. Python APIs, Next.js UIs, tests
              that pass before review.
            </p>

            <div className="reveal mt-9 flex flex-wrap items-center gap-x-8 gap-y-4" style={d(760)}>
              <a
                href="#work"
                className="group inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent/90"
              >
                See my work
                <span className="arrow group-hover:translate-x-1 group-hover:translate-y-1">↘</span>
              </a>
              <a
                href={PROFILE.resume}
                target="_blank"
                rel="noreferrer noopener"
                className="link-line text-[13px] text-foreground"
              >
                Resume (PDF) <span className="arrow">↗</span>
              </a>
              <a
                href={PROFILE.github}
                target="_blank"
                rel="noreferrer noopener"
                className="link-line text-[13px] text-muted-foreground hover:text-foreground"
              >
                GitHub <span className="arrow">↗</span>
              </a>
              <a
                href={PROFILE.linkedin}
                target="_blank"
                rel="noreferrer noopener"
                className="link-line text-[13px] text-muted-foreground hover:text-foreground"
              >
                LinkedIn <span className="arrow">↗</span>
              </a>
            </div>
          </div>

          <div className="lg:col-span-5 lg:pt-6">
            <SystemMap />
          </div>
        </div>

        {/* developer snapshot strip */}
        <div className="reveal mb-16 mt-20 border-t border-border sm:mt-28" style={d(900)}>
          <dl className="grid grid-cols-2 md:grid-cols-4">
            {SNAPSHOT.map((s, i) => (
              <div
                key={s.k}
                className={`border-border py-5 md:py-6 ${
                  i % 2 === 1 ? "border-l pl-5" : "pr-5"
                } ${i > 1 ? "border-t md:border-t-0" : ""} ${i > 0 ? "md:border-l md:pl-6" : ""}`}
              >
                <dt className="label text-[10px]">{s.k}</dt>
                <dd className="mt-2 text-sm tracking-tight">{s.v}</dd>
              </div>
            ))}
          </dl>
        </div>
      </div>
    </section>
  );
}
