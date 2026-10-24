type Props = {
  items: Array<string | { label: string; icon: string; monochrome?: boolean }>;
  separator?: string;
  speed?: string;
  size?: "sm" | "lg";
  accentEvery?: number;
  reverse?: boolean;
  label?: string;
  iconOnly?: boolean;
};

export function Marquee({
  items,
  separator = "/",
  speed = "44s",
  size = "lg",
  accentEvery = 4,
  reverse = false,
  label,
  iconOnly = false,
}: Props) {
  const seq = [...items, ...items];

  return (
    <div
      className="group relative overflow-hidden border-y border-border py-5 sm:py-7"
      aria-label={
        label ?? items.map((item) => (typeof item === "string" ? item : item.label)).join(", ")
      }
      role="marquee"
      style={{
        maskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
        WebkitMaskImage: "linear-gradient(to right, transparent, black 7%, black 93%, transparent)",
      }}
    >
      <div
        className="marquee-track group-hover:[animation-play-state:paused]"
        style={{
          ["--speed" as string]: speed,
          animationDirection: reverse ? "reverse" : "normal",
        }}
        aria-hidden
      >
        {seq.map((item, i) => {
          const text = typeof item === "string" ? item : item.label;
          const icon = typeof item === "string" ? undefined : item.icon;
          const monochrome = typeof item === "string" ? false : item.monochrome;
          return (
            <span key={`${text}-${i}`} className="flex shrink-0 items-center">
              <span
                className={
                  iconOnly
                    ? "mx-7 flex h-12 w-12 items-center justify-center sm:mx-10 sm:h-14 sm:w-14"
                    : size === "lg"
                      ? `flex items-center gap-3 whitespace-nowrap px-5 text-[clamp(1.1rem,2.6vw,1.9rem)] tracking-tight sm:px-7 ${
                          i % accentEvery === 0 ? "text-accent" : "font-light text-muted-foreground"
                        }`
                      : `label whitespace-nowrap px-4 text-[11px] sm:px-6 ${
                          i % accentEvery === 0 ? "text-foreground" : ""
                        }`
                }
              >
                {icon && (
                  <img
                    src={icon}
                    alt={iconOnly ? text : ""}
                    className={
                      iconOnly
                        ? `h-full w-full object-contain ${monochrome ? "tech-logo-mono" : ""}`
                        : "h-7 w-7 object-contain sm:h-8 sm:w-8"
                    }
                  />
                )}
                {!iconOnly && text}
              </span>
              {!iconOnly && (
                <span
                  className={
                    size === "lg"
                      ? "font-mono text-sm text-border-strong"
                      : "font-mono text-[10px] text-border-strong"
                  }
                >
                  {separator}
                </span>
              )}
            </span>
          );
        })}
      </div>
    </div>
  );
}
