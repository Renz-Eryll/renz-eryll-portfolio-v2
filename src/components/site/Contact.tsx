import { PROFILE } from "@/data/profile";
import { d } from "./reveal";

const LINKS = [
  { label: PROFILE.email, kind: "Email", href: `mailto:${PROFILE.email}` },
  { label: "linkedin.com/in/renz-eryll-ramelo", kind: "LinkedIn", href: PROFILE.linkedin },
  { label: "github.com/Renz-Eryll", kind: "GitHub", href: PROFILE.github },
  { label: "Download resume", kind: "PDF", href: PROFILE.resume },
];

const isExternal = (href: string) => href.startsWith("http") || href.endsWith(".pdf");

export function Contact() {
  return (
    <section id="contact" className="shell scroll-mt-24 py-28 sm:py-36">
      <span className="label">Contact</span>

      <h2 className="mt-7 max-w-[15ch] text-[clamp(2.1rem,6vw,4.4rem)] font-medium leading-[1.02] tracking-[-0.04em]">
        {["Hiring for a", "full-stack role?"].map((line, i) => (
          <span key={line} className="line-mask" style={d(i * 120)}>
            <span className={i === 1 ? "text-accent" : ""}>{line}</span>
          </span>
        ))}
      </h2>

      <div className="grow-x mt-10 h-px w-full bg-border-strong" style={d(300)} />

      <div className="mt-10 grid gap-10 lg:grid-cols-12">
        <div className="reveal lg:col-span-5" style={d(200)}>
          <p className="max-w-[44ch] text-[15px] leading-relaxed text-muted-foreground">
            Open to remote full-stack and frontend roles. Email is fastest.
          </p>
          <a
            href={`mailto:${PROFILE.email}`}
            className="group mt-8 inline-flex items-center gap-2 bg-accent px-5 py-2.5 text-[13px] font-medium text-accent-foreground transition-colors duration-300 hover:bg-accent/90"
          >
            Email me
            <span className="arrow group-hover:translate-x-1 group-hover:-translate-y-1">↗</span>
          </a>
        </div>

        <ul className="lg:col-span-7 lg:pl-10">
          {LINKS.map((l, i) => (
            <li
              key={l.kind}
              className="reveal border-b border-border first:border-t"
              style={d(300 + i * 110)}
            >
              <a
                href={l.href}
                target={isExternal(l.href) ? "_blank" : undefined}
                rel="noreferrer noopener"
                className="group grid grid-cols-[72px_1fr_auto] items-baseline gap-4 py-5 sm:grid-cols-[96px_1fr_auto]"
              >
                <span className="label text-[10px]">{l.kind}</span>
                <span className="link-line w-fit break-all text-[clamp(1rem,1.9vw,1.4rem)] tracking-tight">
                  {l.label}
                </span>
                <span className="arrow text-base text-muted-foreground group-hover:translate-x-1 group-hover:-translate-y-1 group-hover:text-accent">
                  ↗
                </span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function Footer() {
  return (
    <footer className="border-t border-border">
      <div className="shell grid gap-10 py-12 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <p className="text-[15px] font-medium">{PROFILE.name}</p>
          <p className="label mt-1.5 text-[10px]">{PROFILE.role}</p>
        </div>
        <div>
          <span className="label text-[10px]">Based in</span>
          <p className="mt-1.5 text-[15px]">Philippines · Remote</p>
        </div>
        <nav aria-label="Footer" className="flex flex-col gap-2">
          {[
            ["GitHub", PROFILE.github],
            ["LinkedIn", PROFILE.linkedin],
            ["Email", `mailto:${PROFILE.email}`],
            ["Resume", PROFILE.resume],
          ].map(([label, href]) => (
            <a
              key={label}
              href={href}
              target={isExternal(href!) ? "_blank" : undefined}
              rel="noreferrer noopener"
              className="label w-fit text-[10px] transition-colors hover:text-foreground"
            >
              {label}
            </a>
          ))}
        </nav>
        <div className="flex items-start justify-between gap-6 sm:justify-end sm:gap-10">
          <span className="label text-[10px]">© {new Date().getFullYear()}</span>
          <a href="#top" className="link-line label text-[10px] hover:text-foreground">
            Back to top <span className="arrow">↑</span>
          </a>
        </div>
      </div>
    </footer>
  );
}
