import { useEffect, useRef, useState } from "react";
import { d } from "./reveal";

const NODES = [
  { id: "ticket", label: "ticket", meta: "jira", y: 14 },
  { id: "api", label: "API", meta: "python · lambda", y: 90 },
  { id: "interface", label: "interface", meta: "next.js · react", y: 166 },
  { id: "tests", label: "tests", meta: "pytest · playwright", y: 242 },
  { id: "review", label: "review", meta: "ci green · senior", y: 318 },
];

export function SystemMap() {
  const wrap = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const fine = window.matchMedia("(min-width: 1024px) and (pointer: fine)");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (!fine.matches || reduced.matches) return;

    const onMove = (e: MouseEvent) => {
      const r = wrap.current?.getBoundingClientRect();
      if (!r) return;
      const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
      const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
      setOffset({ x: Math.max(-1, Math.min(1, nx)) * 10, y: Math.max(-1, Math.min(1, ny)) * 8 });
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  return (
    <div ref={wrap} className="relative select-none" aria-hidden>
      <div
        className="relative transition-transform duration-700 ease-out"
        style={{ transform: `translate3d(${offset.x}px, ${offset.y}px, 0)` }}
      >
        {/* coordinate frame */}
        <div className="pointer-events-none absolute -inset-x-4 -inset-y-6 sm:-inset-x-8">
          <span className="absolute left-0 top-0 h-full w-px bg-border" />
          <span className="absolute right-0 top-0 h-full w-px bg-border" />
          <span className="label absolute -top-1 left-0 -translate-y-full text-[10px]">
            step.01
          </span>
          <span className="label absolute -top-1 right-0 -translate-y-full text-[10px]">
            step.05
          </span>
        </div>

        <svg
          viewBox="0 0 320 380"
          className="relative w-full max-w-[380px]"
          role="img"
          aria-label="Diagram: ticket to API to interface to tests to review"
        >
          <defs>
            <linearGradient id="wire" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="var(--accent)" stopOpacity="0.05" />
              <stop offset="50%" stopColor="var(--accent)" stopOpacity="0.55" />
              <stop offset="100%" stopColor="var(--accent)" stopOpacity="0.05" />
            </linearGradient>
          </defs>

          {NODES.slice(0, -1).map((n, i) => (
            <g key={n.id}>
              <line
                x1="26"
                y1={n.y + 46}
                x2="26"
                y2={NODES[i + 1]!.y}
                stroke="url(#wire)"
                strokeWidth="1"
              />
              <line
                x1="26"
                y1={n.y + 46}
                x2="26"
                y2={NODES[i + 1]!.y}
                stroke="var(--accent)"
                strokeWidth="1"
                strokeDasharray="3 9"
                opacity="0.65"
                style={{ animation: `dash-flow ${6 + i}s linear infinite` }}
              />
              <circle r="2" fill="var(--accent)">
                <animate
                  attributeName="cy"
                  values={`${n.y + 46};${NODES[i + 1]!.y}`}
                  dur="3.4s"
                  begin={`${i * 0.9}s`}
                  repeatCount="indefinite"
                />
                <animate attributeName="cx" values="26;26" dur="3.4s" repeatCount="indefinite" />
                <animate
                  attributeName="opacity"
                  values="0;1;1;0"
                  dur="3.4s"
                  begin={`${i * 0.9}s`}
                  repeatCount="indefinite"
                />
              </circle>
            </g>
          ))}

          {NODES.map((n, i) => (
            <g key={n.id} className="reveal" style={d(500 + i * 110)}>
              <rect
                x="1"
                y={n.y}
                width="318"
                height="46"
                fill="var(--surface)"
                stroke="var(--border-strong)"
                strokeWidth="1"
                rx="3"
              />
              <circle cx="26" cy={n.y + 23} r="3" fill="var(--accent)" />
              <circle
                cx="26"
                cy={n.y + 23}
                r="8"
                fill="none"
                stroke="var(--accent)"
                strokeOpacity="0.28"
              />
              <text
                x="52"
                y={n.y + 27}
                fill="var(--foreground)"
                fontSize="13"
                fontFamily="var(--font-mono)"
                letterSpacing="0.02em"
              >
                {n.label}
              </text>
              <text
                x="304"
                y={n.y + 27}
                textAnchor="end"
                fill="var(--muted-foreground)"
                fontSize="10"
                fontFamily="var(--font-mono)"
              >
                {n.meta}
              </text>
            </g>
          ))}
        </svg>

        <div className="reveal mt-5 flex flex-wrap items-center gap-x-6 gap-y-2" style={d(980)}>
          <span className="label flex items-center gap-2 text-[10px]">
            <span className="dot-live" /> how a ticket ships
          </span>
          <span className="label text-[10px]">verified on a local docker stack</span>
        </div>
      </div>
    </div>
  );
}
