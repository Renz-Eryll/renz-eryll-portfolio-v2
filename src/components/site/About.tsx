import { HIGHLIGHTS } from "@/data/profile";
import { d } from "./reveal";

export function About() {
  return (
    <section id="profile" className="shell scroll-mt-24 py-24 sm:py-32">
      <div className="grid gap-12 lg:grid-cols-12 lg:gap-10">
        <div className="lg:col-span-6">
          <div className="lg:sticky lg:top-28">
            <span className="label">Profile</span>

            <h2 className="mt-6 max-w-[16ch] text-[clamp(1.9rem,4.2vw,3.1rem)] font-medium leading-[1.05]">
              {["Fast with AI tooling.", "Strict about", "what ships."].map((line, i) => (
                <span key={line} className="line-mask" style={d(i * 100)}>
                  <span className={i === 2 ? "text-muted-foreground" : ""}>{line}</span>
                </span>
              ))}
            </h2>

            <div className="grow-x mt-8 h-px w-32 bg-accent" style={d(400)} />
          </div>
        </div>

        <div className="lg:col-span-6 lg:pt-16">
          <div className="space-y-5 text-[15px] leading-relaxed text-muted-foreground">
            <p className="reveal">
              A year in, I've shipped a recruitment platform for a Riyadh agency, systems for local
              schools and co-ops, and features for a pharma platform with global clients.
            </p>
            <p className="reveal" style={d(140)}>
              I use AI to move faster — and tests, CI and review to keep the bar.
            </p>
          </div>

          <ul className="mt-12 grid gap-px border border-border bg-border sm:grid-cols-3">
            {HIGHLIGHTS.map((h, i) => (
              <li key={h.value} className="reveal bg-background p-5" style={d(i * 110)}>
                <span className="block text-[clamp(1.6rem,3vw,2.1rem)] font-medium tracking-tight text-accent">
                  {h.value}
                </span>
                <span className="mt-2 block text-[13px] leading-snug text-muted-foreground">
                  {h.label}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
