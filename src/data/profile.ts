/*
 * Single source of truth for the portfolio's content.
 * Edit here; the section components only handle layout.
 */

export const PROFILE = {
  name: "Renz Eryll Ramelo",
  shortName: "Renz Eryll",
  role: "Full-Stack Engineer",
  location: "Sariaya, Quezon, PH",
  email: "renzeryll09@gmail.com",
  github: "https://github.com/Renz-Eryll",
  linkedin: "https://www.linkedin.com/in/renz-eryll-ramelo",
  resume: "/files/Renz-Eryll-Ramelo-Resume.pdf",
};

export const HIGHLIGHTS = [
  { value: "100+", label: "REST endpoints shipped for a client" },
  { value: "90%+", label: "test coverage on production APIs" },
  { value: "10/10", label: "pylint, SonarCloud checks passing" },
];

export type Role = {
  period: string;
  org: string;
  via?: string;
  title: string;
  mode: string;
  summary: string;
  points: string[];
  stack: string[];
};

export const ROLES: Role[] = [
  {
    period: "Aug 2026 — Present",
    org: "Anervea (GRG Health)",
    via: "via KMC Solutions",
    title: "Junior Full-Stack Developer",
    mode: "Remote",
    summary: "Pharma competitive-intelligence platform with two global clients.",
    points: [
      "Built an admin console from scratch: RBAC, client scopes, alert recipients, conferences.",
      "Shipped Python Lambda endpoints at 90%+ coverage and pylint 10/10.",
      "Migrated client screens to the V2 API and fixed production issues.",
    ],
    stack: ["Python", "AWS Lambda", "Next.js", "React", "pytest", "Playwright"],
  },
  {
    period: "Jun 2025 — May 2026",
    org: "Freelance",
    title: "Full-Stack Developer",
    mode: "Remote",
    summary: "Client platforms built end to end, from schema to deploy.",
    points: [
      "Legaforce: recruitment platform with 3 portals and 100+ REST endpoints.",
      "Gemini-powered CV summaries and job matching, used on real applicants.",
      "AcadFlow and AppliLoan: school and cooperative systems in Laravel.",
    ],
    stack: ["React", "TypeScript", "Express", "PostgreSQL", "Laravel"],
  },
  {
    period: "Mar — Jun 2025",
    org: "Qtech Business Solution Inc.",
    title: "Frontend Developer & QA Intern",
    mode: "Hybrid",
    summary: "Support-ticketing system for customers, agents and admins.",
    points: [
      "Built the React frontend for tracking, assignment and audit logs.",
      "Integrated Sanctum-authenticated Laravel APIs; ran cross-browser QA.",
    ],
    stack: ["React", "Vite", "Laravel", "MySQL"],
  },
];

export type Project = {
  slug: string;
  name: string;
  tagline: string;
  kind: string;
  year: string;
  summary: string;
  notes: string[];
  stack: string[];
  image: { src: string; alt: string; w: number; h: number };
  live?: string;
  code?: string;
};

export const FEATURED: Project[] = [
  {
    slug: "legaforce",
    name: "Legaforce",
    tagline: "Recruitment platform for a Riyadh agency",
    kind: "Client work",
    year: "2026",
    summary: "Applicant, employer and admin portals on one API — application to deployment.",
    notes: [
      "100+ REST endpoints, JWT auth, RBAC",
      "Gemini CV summaries and job matching",
      "Live in production on Vercel + Render",
    ],
    stack: ["React", "TypeScript", "TanStack Query", "Express", "Prisma", "PostgreSQL"],
    image: {
      src: "/images/projects/legaforce.webp",
      alt: "Legaforce recruitment platform landing page",
      w: 1440,
      h: 900,
    },
    live: "https://legaforce.vercel.app",
    code: "https://github.com/Renz-Eryll/Legaforce",
  },
  {
    slug: "cinescope",
    name: "CineScope",
    tagline: "Movie, TV and anime discovery",
    kind: "Personal project",
    year: "2026",
    summary: "Browse, search and save titles from TMDB, with a live “most searched” ranking.",
    notes: [
      "Stale requests cancelled with AbortController",
      "De-duplicated infinite scroll",
      "Shareable, URL-driven filters",
    ],
    stack: ["React 19", "React Router", "Tailwind CSS", "Appwrite", "TMDB API"],
    image: {
      src: "/images/projects/cinescope.webp",
      alt: "CineScope home page with a trending title hero banner",
      w: 1440,
      h: 810,
    },
    live: "https://cinescope-webapp.vercel.app",
    code: "https://github.com/Renz-Eryll/CineScope",
  },
  {
    slug: "postagram",
    name: "Postagram",
    tagline: "Social app on the Next.js App Router",
    kind: "Personal project",
    year: "2025",
    summary: "Posts, likes, follows and notifications — every mutation auth-checked on the server.",
    notes: [
      "Optimistic UI with rollback",
      "Transactional writes with Prisma",
      "DB constraints block duplicates",
    ],
    stack: ["Next.js", "Server Actions", "Prisma", "PostgreSQL", "Clerk"],
    image: {
      src: "/images/postagram-thumbnail.svg",
      alt: "Postagram social feed interface",
      w: 800,
      h: 435,
    },
    live: "https://postagram-app.vercel.app",
    code: "https://github.com/Renz-Eryll/Postagram",
  },
  {
    slug: "beemo",
    name: "BeeMo",
    tagline: "IoT monitoring for stingless beehives",
    kind: "Capstone, rebuilt",
    year: "2026",
    summary: "ESP8266 sensors report hive temperature, humidity and weight to a live dashboard.",
    notes: [
      "Rebuilt our PHP capstone as a multi-tenant Next.js app",
      "Key-authenticated sensor API, alerts and harvest reports",
      "I built the web UI and programmed the sensors",
    ],
    stack: ["Next.js", "TypeScript", "Drizzle", "PostgreSQL", "ESP8266"],
    image: {
      src: "/images/beemo-thumbnail.svg",
      alt: "BeeMo smart hive monitoring interface",
      w: 800,
      h: 435,
    },
    live: "https://beemo-hive-monitor.vercel.app/demo",
    code: "https://github.com/Renz-Eryll/beemo_v2",
  },
];

export type IndexItem = {
  name: string;
  kind: string;
  stack: string;
  year: string;
  code: string;
  live?: string;
};

export const MORE_WORK: IndexItem[] = [
  {
    name: "SyncIt — File storage & sharing",
    kind: "Full stack",
    stack: "Next.js · Appwrite",
    year: "2025",
    live: "https://sync-it-project.vercel.app",
    code: "https://github.com/Renz-Eryll/SyncIt",
  },
  {
    name: "Resumind — AI resume analyzer",
    kind: "Frontend",
    stack: "React Router · Puter.js",
    year: "2025",
    live: "https://resumind-app.vercel.app",
    code: "https://github.com/Renz-Eryll/Resumind",
  },
  {
    name: "CourseBoard — Course admin dashboard",
    kind: "Frontend",
    stack: "Next.js · shadcn/ui",
    year: "2025",
    live: "https://courseboard.vercel.app",
    code: "https://github.com/Renz-Eryll/CourseBoard",
  },
  {
    name: "SubTrack — Subscription tracker",
    kind: "Full stack",
    stack: "React · Express · MongoDB",
    year: "2025",
    live: "https://subtrack-lilac-seven.vercel.app",
    code: "https://github.com/Renz-Eryll/SubTrack",
  },
];

export const SKILLS = [
  {
    group: "Frontend",
    items: [
      "React",
      "Next.js (App Router, Server Actions)",
      "TypeScript",
      "Tailwind CSS",
      "Redux Toolkit",
      "TanStack Query",
    ],
  },
  {
    group: "Backend",
    items: [
      "Python (FastAPI, AWS Lambda)",
      "Node.js / Express",
      "Laravel / PHP",
      "REST API design",
      "JWT auth & RBAC",
    ],
  },
  {
    group: "Data & Infra",
    items: [
      "PostgreSQL",
      "MySQL",
      "MongoDB",
      "Redis",
      "Docker",
      "AWS (Lambda, API Gateway, S3)",
      "Vercel",
    ],
  },
  {
    group: "Quality & AI",
    items: [
      "pytest",
      "Jest",
      "React Testing Library",
      "Playwright",
      "SonarCloud",
      "Claude Code",
      "Anthropic & Gemini APIs",
    ],
  },
];
