export const myProjects = [
  {
    id: 11,
    role: "Solo",
    title: "Bounty Index",
    description:
      "Every public bug bounty program across five platforms — unified, filterable, sorted by max payout.",
    subDescription: [
      "Indexed 1,160+ programs from HackerOne, Bugcrowd, Intigriti, YesWeHack, and Federacy into one live table.",
      "Built a scope-lookup search that resolves a domain to every in-scope program it appears in.",
      "Shipped keyboard-first navigation (`/`, `j`/`k`, `↵`) and URL-driven filters for asset type and min payout.",
      "Automated daily ingest via authenticated Vercel cron pulling from the arkadiyt bounty-targets-data source.",
    ],
    href: "https://bountyindex.in",
    sourceHref: "https://github.com/Varun2024/Bounty-index",
    logo: "",
    image: "/assets/bounty-index.png",
    tags: [
      { id: 1, name: "Next.js 16", path: "/assets/logos/next.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/typescript.svg" },
      { id: 3, name: "Drizzle + Neon", path: "/assets/logos/postgres.svg" },
      { id: 4, name: "Tailwind 4", path: "/assets/logos/tailwindcss.svg" },
      { id: 5, name: "Vercel Cron", path: "/assets/logo-dark.svg" },
    ],
  },
  {
    id: 10,
    role: "Solo",
    title: "Earth-NASA",
    description:
      "An interactive Earth visualizer that surfaces NASA imagery and live planetary data in a clean, story-driven UI.",
    subDescription: [
      "Pulls NASA open data on demand and renders it in a calm, exploratory UI built around imagery, dates, and context.",
      "Tuned fetch + cache paths so first paint stays fast on slow networks.",
      "Deployed live for one-tap access — no setup, no signup.",
    ],
    href: "https://earth-nasa.vercel.app",
    sourceHref: "https://github.com/Varun2024/Earth-NASA",
    logo: "",
    image: "/assets/earth-nasa.png",
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/next.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/typescript.svg" },
      { id: 3, name: "NASA API", path: "/assets/logo-dark.svg" },
      { id: 4, name: "Tailwind", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
  {
    id: 5,
    role: "Solo",
    title: "NavUI Component Library",
    description:
      "A reusable React UI component library focused on clean APIs and polished visuals.",
    subDescription: [
      "Composable navbar primitives with a clean API — drop-in for Next.js projects.",
      "Consistent motion and accessible interaction states across every variant.",
      "Documented with live previews and copy-paste snippets.",
    ],
    href: "https://navui-hw7m.vercel.app/",
    sourceHref: "https://github.com/Varun2024/navui",
    logo: "",
    image: "/assets/navui.png",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "TypeScript",
        path: "/assets/logos/typescript.svg",
      },
      {
        id: 3,
        name: "Motion",
        path: "/assets/logos/framer-motion.svg",
      },
      {
        id: 4,
        name: "Tailwind",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 7,
    role: "Solo",
    title: "BB-Bot",
    description:
      "An AI basketball assistant that turns playbook data into drills, scouting, and live team strategy.",
    subDescription: [
      "Chat-first coaching assistant — drills, scouting, and strategy prompts backed by MiniMax LLM.",
      "Neon + Postgres for team playbooks and sync across groups.",
      "Sideline-ready mobile UI: fast, low-tap, glanceable.",
    ],
    href: "https://bb-bot.vercel.app/",
    sourceHref: "https://github.com/Varun2024/BB-bot",
    logo: "",
    image: "/assets/bb-bot-hero.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/next.svg",
      },
      {
        id: 2,
        name: "Neon",
        path: "/assets/logos/neon.svg",
      },
      {
        id: 3,
        name: "PostgreSQL",
        path: "/assets/logos/postgres.svg",
      },
      {
        id: 4,
        name: "MiniMax LLM",
        path: "/assets/logos/minimax.svg",
      },
    ],
  },
  
  {
    id: 1,
    role: "Solo",
    title: "Sasha Store",
    description:
      "A secure ecommerce platform with real-time updates, auth, and responsive UX.",
    subDescription: [
      "Freelance client project — live at sashastore.in, handles real orders end-to-end.",
      "Firebase auth + realtime DB for live product/order sync, Stripe for payments.",
      "Admin dashboard for products, requests, and inventory in one surface.",
      "CI/CD tuned for peak-traffic drops.",
    ],
    href: "https://sashastore.in/",
    sourceHref: "https://github.com/Varun2024/Sasha-ecom",
    logo: "",
    image: "/assets/sasha.png",
    tags: [
      {
        id: 1,
        name: "Cloudinary",
        path: "/assets/logos/cloudinary-2.svg",
      },
      {
        id: 2,
        name: "Framer",
        path: "/assets/logos/framer-motion.svg",
      },
      {
        id: 3,
        name: "Firebase",
        path: "/assets/logos/firebase.png",
      },
      {
        id: 4,
        name: "Stripe",
        path: "/assets/logos/stripe.svg",
      },
      {
        id: 5,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 6,
    role: "Solo",
    title: "RentIt",
    description:
      "A rental marketplace with category discovery, real-time listings, and smooth checkout flows.",
    subDescription: [
      "Built category-based browsing for quick item discovery and filtering.",
      "Implemented secure auth and real-time updates for listing availability.",
      "Designed mobile-first UX for booking, vendor profiles, and order tracking.",
      "Integrated payments and backend APIs for production-ready rental workflows.",
    ],
    href: "https://rentit-66e6c.web.app/categories",
    logo: "",
    image: "/assets/renitit.png",
    tags: [
      {
        id: 1,
        name: "Next.js",
        path: "/assets/logos/next.svg",
      },
      {
        id: 2,
        name: "MongoDB",
        path: "/assets/logos/mongodb-icon-1.svg",
      },
      {
        id: 3,
        name: "Razorpay",
        path: "/assets/logos/razorpay.svg",
      },
      {
        id: 4,
        name: "Firebase",
        path: "/assets/logos/firebase.png",
      },
      {
        id: 5,
        name: "TailwindCSS",
        path: "/assets/logos/tailwindcss.svg",
      },
    ],
  },
  {
    id: 2,
    role: "Team",
    title: "TedXBITD",
    description:
      "A responsive event website with secure auth and live content updates.",
    subDescription: [
      "Implemented Firebase Authentication with role-based access.",
      "Integrated Firebase Realtime Database for speaker and event updates.",
      "Optimized responsiveness and performance across devices.",
      "Deployed via CI/CD for fast, stable event-time releases.",
    ],
    href: "https://tedxbitd.in/",
    logo: "",
    image: "/assets/tedx.png",
    tags: [
      {
        id: 1,
        name: "React",
        path: "/assets/logos/react.svg",
      },
      {
        id: 2,
        name: "Framer",
        path: "/assets/logos/framer-motion.svg",
      },
      {
        id: 3,
        name: "Firebase",
        path: "/assets/logos/firebase.png",
      },
      {
        id: 4,
        name: "Stripe",
        path: "/assets/logos/stripe.svg",
      },
    ],
  },
];

export const mySocials = [
  {
    name: "Github",
    href: "https://github.com/Varun2024",
    icon: "/assets/logos/icons8-github-50.png",
  },
  {
    name: "Instagram",
    href: "https://www.instagram.com/varun_shukla619?igsh=YWkyMmxja2hjbjQx",
    icon: "/assets/socials/instagram.svg",
  },
  {
    name: "Linkedin",
    href: "https://www.linkedin.com/in/varun-shukla-codes/",
    icon: "/assets/socials/linkedIn.svg",
  },
  {
    name: "X",
    href: "https://www.x.com/TheV_Stack/",
    icon: "/assets/logos/twitter.png",
  },
];

export const experiences = [
  {
    title: "SDE — Full-stack & AI Engineer",
    job: "Flux Fortify",
    date: "Apr 2026 - Present",
    contents: [
      "Building full-stack product surfaces with AI-driven features end-to-end.",
      "Designing backend APIs with validation, auth, and observability baked in.",
      "Integrating LLM workflows into core product flows for real user value.",
      "Shipping responsive frontends aligned with the product design system.",
      "Owning features from spec through deploy with tests and docs.",
    ],
  },
  {
    title: "Software Engineer",
    job: "Chainframe Product Team",
    date: "Jan 2026 - Apr 2026",
    contents: [
      "Shipped one production-ready feature module behind a feature flag.",
      "Built backend APIs with validation, auth checks, and basic audit logging.",
      "Integrated responsive frontend UI aligned with the product design system.",
      "Added unit and integration tests with developer documentation.",
      "Delivered a demo walkthrough and technical handoff write-up.",
    ],
  },
  {
    title: "Freelance Developer",
    job: "Self-Employed",
    date: "2025-Present",
    contents: [
      "Built a P2P ecommerce platform for rental services across a wide variety of goods.",
      "Built a portfolio site for an interior designer with a clean, modern layout.",
      "Added a clothing ecommerce section with GSAP and Framer Motion interactions.",
    ],
  },
  {
    title: "ML intern",
    job: "IIT Bhilai",
    date: "Feb-Aug,2025",
    contents: [
      "Worked on deep learning for brain tumor detection from MRI scans.",
      "Used Canny edge detection for boundary extraction and preprocessing.",
      "Trained a DenseNet CNN for multiclass tumor classification.",
      "Applied normalization and augmentation to improve generalization.",
    ],
  },
  {
    title: "Full stack developer ",
    job: "Grainscope",
    date: "May-Aug,2025",
    contents: [
      "Built a React app to manage grain quality reports with clear visual workflows.",
      "Implemented canvas tools, pagination, and Plotly.js grain plotting.",
      "Added WhatsApp sharing plus filtering, zooming, and labeling features.",
      "Improved UX and data readability through dynamic interfaces.",
    ],
  },
];
