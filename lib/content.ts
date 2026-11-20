export interface NavItem {
  id: string;
  label: string;
}

export interface StatItem {
  n: string;
  l: string;
}

export interface SkillCategory {
  title: string;
  items: string[];
}

export type ProjectCategory = "all" | "fullstack" | "frontend" | "mobile";

export interface ProjectItem {
  id: string;
  n: string;
  title: string;
  tag: string;
  category: ProjectCategory;
  year: string;
  desc: string;
  longDesc?: string;
  tech: string[];
  g: string;
  darkG: string;
  url?: string;
  github?: string;
}

export interface ExperienceItem {
  role: string;
  co: string;
  period: string;
  desc: string;
  highlights?: string[];
  skills?: string[];
}

export interface SocialItem {
  l: string;
  h: string;
  ariaLabel: string;
}

export interface WhatsAppConfig {
  phone: string;
  displayPhone: string;
  defaultMessage: string;
}

export interface PortfolioContent {
  first: string;
  last: string;
  role: string;
  location: string;
  timezone: string;
  email: string;
  whatsapp: WhatsAppConfig;
  tagline: string;
  bioSnippet: string;
  nav: NavItem[];
  about: {
    headline: string;
    body: string[];
    stats: StatItem[];
  };
  skills: SkillCategory[];
  works: ProjectItem[];
  experience: ExperienceItem[];
  socials: SocialItem[];
}

// Editable portfolio data structure
export const c: PortfolioContent = {
  first: "Parvathy",
  last: "Vidhu",
  role: "Full Stack Developer",
  location: "Kerala, India",
  timezone: "Asia/Kolkata",
  email: "hello@parvathyvidhu.dev",
  whatsapp: {
    phone: "919876543210", // Placeholder: update with your WhatsApp number (country code + number without + or spaces)
    displayPhone: "+91 98765 43210",
    defaultMessage: "Hi Parvathy, I saw your portfolio and would love to chat!",
  },
  tagline: "I build calm, fast, and thoughtful digital products for the modern web.",
  bioSnippet: "Specialized in TypeScript, React, Next.js, and high-performance server architectures.",
  // Exactly 5 streamlined menus for the bottom dock
  nav: [
    { id: "home", label: "Home" },
    { id: "about", label: "About" },
    { id: "skills", label: "Skills" },
    { id: "works", label: "Works" },
    { id: "contact", label: "Contact" },
  ],
  about: {
    headline: "Code crafted with a designer's aesthetic, engineered with architectural discipline.",
    body: [
      "I am a full stack software engineer dedicated to building high-fidelity web experiences that bridge the gap between expressive user interfaces and resilient backend systems.",
      "With a keen focus on performance, accessibility (WCAG), and responsive motion design, I take ideas from initial napkin sketches all the way to cloud-scale production.",
      "When I am not designing interfaces or writing clean APIs, I contribute to open-source developer tooling, experiment with generative UI, and explore typographic craft.",
    ],
    stats: [
      { n: "3+", l: "Years Active" },
      { n: "20+", l: "Shipped Projects" },
      { n: "99%", l: "Lighthouse Score" },
    ],
  },
  skills: [
    {
      title: "Frontend & UI",
      items: ["React 18/19", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "Radix UI", "Web Vitals"],
    },
    {
      title: "Backend & Systems",
      items: ["Node.js", "Express", "PostgreSQL", "Prisma ORM", "Redis", "REST & GraphQL", "Docker"],
    },
    {
      title: "Tooling & Workflow",
      items: ["Git", "GitHub Actions", "Vercel", "Figma", "Linux", "Jest / Vitest", "Postman"],
    },
  ],
  works: [
    {
      id: "aetheria-dashboard",
      n: "01",
      title: "Aetheria Analytics",
      tag: "Full Stack Platform",
      category: "fullstack",
      year: "2026",
      desc: "Real-time telemetry dashboard with predictive metrics, WebSocket feeds, and data visualization.",
      longDesc:
        "Engineered a high-throughput telemetry analytics suite supporting multi-tenant metrics ingestion, real-time alerting via WebSockets, and interactive SVG charts with fluid micro-interactions.",
      tech: ["Next.js", "TypeScript", "PostgreSQL", "Tailwind CSS", "Recharts"],
      g: "linear-gradient(135deg, #C9B8F5, #FFD1DF)",
      darkG: "linear-gradient(135deg, #372363, #6B1D4C)",
      url: "https://example.com/project-1",
      github: "https://github.com/parvathyvidhu",
    },
    {
      id: "lumina-commerce",
      n: "02",
      title: "Lumina Storefront",
      tag: "E-Commerce",
      category: "frontend",
      year: "2026",
      desc: "Headless commerce experience featuring optimistic cart states, instant search, and sub-second checkout.",
      longDesc:
        "Built a headless storefront optimized for sub-100ms client navigation, featuring animated cart drawers, localized currency selection, and accessible checkout patterns.",
      tech: ["React", "Next.js", "TypeScript", "Stripe API", "Zustand"],
      g: "linear-gradient(135deg, #FFD9E4, #CFD9FF)",
      darkG: "linear-gradient(135deg, #591F38, #1E2D66)",
      url: "https://example.com/project-2",
      github: "https://github.com/parvathyvidhu",
    },
    {
      id: "pulse-design-system",
      n: "03",
      title: "Pulse UI System",
      tag: "Design System",
      category: "frontend",
      year: "2025",
      desc: "Accessible component library and interactive token documentation for scalable enterprise products.",
      longDesc:
        "Crafted a unified component library adhering strictly to WCAG 2.1 AA contrast and keyboard accessibility requirements, complete with automated visual regression tests.",
      tech: ["TypeScript", "Tailwind CSS", "Storybook", "Radix UI", "npm"],
      g: "linear-gradient(135deg, #E6D6FF, #FFE3D3)",
      darkG: "linear-gradient(135deg, #412061, #61331B)",
      url: "https://example.com/project-3",
      github: "https://github.com/parvathyvidhu",
    },
    {
      id: "zenith-progressive-web",
      n: "04",
      title: "Zenith Studio",
      tag: "Mobile Web App",
      category: "mobile",
      year: "2025",
      desc: "Progressive web application with offline syncing, smooth gesture navigation, and native feel.",
      longDesc:
        "Designed an offline-first progressive web application utilizing service workers, indexedDB persistence, and smooth gesture-driven swipe cards.",
      tech: ["React", "Service Workers", "Framer Motion", "PWA", "IndexedDB"],
      g: "linear-gradient(135deg, #FFD1DF, #C9B8F5)",
      darkG: "linear-gradient(135deg, #661D3D, #2F215C)",
      url: "https://example.com/project-4",
      github: "https://github.com/parvathyvidhu",
    },
  ],
  experience: [
    {
      role: "Full Stack Developer",
      co: "Aethra Digital Solutions",
      period: "2025 — Present",
      desc: "Lead development of client-facing SaaS products, architecting resilient microservices and performant Next.js frontend applications.",
      highlights: [
        "Reduced Core Web Vitals LCP by 42% across flagship client applications.",
        "Engineered end-to-end REST & GraphQL endpoints with automated CI/CD pipelines.",
      ],
      skills: ["Next.js", "TypeScript", "Node.js", "PostgreSQL", "Docker"],
    },
    {
      role: "Frontend Engineer",
      co: "Creative Pulse Studio",
      period: "2024 — 2025",
      desc: "Developed responsive web interfaces, interactive marketing campaigns, and reusable component libraries.",
      highlights: [
        "Delivered 12+ production client web applications on schedule.",
        "Implemented standardized design system tokens and automated accessibility audits.",
      ],
      skills: ["React", "Tailwind CSS", "Framer Motion", "Figma"],
    },
    {
      role: "Freelance & Open Source",
      co: "Independent",
      period: "2023 — 2024",
      desc: "Collaborated with startups and local businesses to launch digital products, brand identities, and e-commerce setups.",
      highlights: [
        "Built customized portals and CMS integrations for local businesses.",
        "Contributed bug fixes and documentation to open-source UI libraries.",
      ],
      skills: ["JavaScript", "HTML/CSS", "Git", "REST APIs"],
    },
  ],
  socials: [
    { l: "GitHub", h: "https://github.com", ariaLabel: "Visit Parvathy's GitHub Profile" },
    { l: "LinkedIn", h: "https://linkedin.com", ariaLabel: "Visit Parvathy's LinkedIn Profile" },
    { l: "X / Twitter", h: "https://twitter.com", ariaLabel: "Visit Parvathy's X (Twitter) Profile" },
    { l: "Dribbble", h: "https://dribbble.com", ariaLabel: "Visit Parvathy's Dribbble Portfolio" },
  ],
};
