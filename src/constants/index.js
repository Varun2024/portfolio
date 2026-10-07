export const myProjects = [
  {
    id: 11,
    role: "Live product",
    title: "Bounty Index",
    description:
      "2,000 weekly hunters use this to find bug bounty programs. One table, five platforms, sorted by max payout.",
    subDescription: [
      "2,000+ weekly hunters. 1,160+ programs across HackerOne, Bugcrowd, Intigriti, YesWeHack, Federacy.",
      "Scope lookup: paste a domain, see every in-scope program it appears in.",
      "Keyboard navigation (/, j/k, ↵) and URL-filter state so hunters can share pre-filtered views.",
      "Vercel cron pulls arkadiyt/bounty-targets-data every night; Drizzle writes diffs into Neon.",
    ],
    href: "https://bountyindex.in",
    sourceHref: "https://github.com/Varun2024/Bounty-index",
    logo: "",
    image: "/assets/bounty-index.webp",
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
    role: "Weekend build",
    title: "Earth-NASA",
    description:
      "Pick a date, see Earth from orbit that day. Pulls from NASA open data; no login, no setup.",
    subDescription: [
      "Hits the NASA EONET and EPIC endpoints on demand; renders a day's worth of planetary imagery.",
      "Cached fetch paths keep first paint under a second on throttled connections.",
      "Zero account; the URL carries the date so links deep-link to a specific view.",
    ],
    href: "https://earth-nasa.vercel.app",
    sourceHref: "https://github.com/Varun2024/Earth-NASA",
    logo: "",
    image: "/assets/earth-nasa.webp",
    tags: [
      { id: 1, name: "Next.js", path: "/assets/logos/next.svg" },
      { id: 2, name: "TypeScript", path: "/assets/logos/typescript.svg" },
      { id: 3, name: "NASA API", path: "/assets/logo-dark.svg" },
      { id: 4, name: "Tailwind", path: "/assets/logos/tailwindcss.svg" },
    ],
  },
  {
    id: 5,
    role: "Open source",
    title: "NavUI Component Library",
    description:
      "Drop-in React navbar primitives for Next.js. Copy the snippet, tweak the props, ship.",
    subDescription: [
      "Composable navbar parts so you don't rewrite the same header on project #4.",
      "Keyboard + screen-reader states handled by default; focus traps on mobile menus.",
      "Live previews next to each snippet so devs copy the working thing, not a stale screenshot.",
    ],
    href: "https://navui-hw7m.vercel.app/",
    sourceHref: "https://github.com/Varun2024/navui",
    logo: "",
    image: "/assets/navui.webp",
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
    role: "Prototype",
    title: "BB-Bot",
    description:
      "AI coaching assistant for basketball teams. Ask the playbook, get drills and scouting back.",
    subDescription: [
      "Chat interface over a team's own playbook, powered by MiniMax LLM.",
      "Neon Postgres keeps each team's plays isolated and queryable from the chat.",
      "Mobile layout tuned for one-handed use on the sideline.",
    ],
    href: "https://bb-bot.vercel.app/",
    sourceHref: "https://github.com/Varun2024/BB-bot",
    logo: "",
    image: "/assets/bb-bot-hero.webp",
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
    role: "Freelance",
    title: "Sasha Store",
    description:
      "A live Shopify-style storefront I built for sashastore.in. Takes real orders every week.",
    subDescription: [
      "Freelance client. Catalog, cart, Stripe checkout, order emails: the full loop.",
      "Firebase auth + realtime DB so the owner sees new orders without a refresh.",
      "Admin page where she can add products and update inventory without touching code.",
    ],
    href: "https://sashastore.in/",
    sourceHref: "https://github.com/Varun2024/Sasha-ecom",
    logo: "",
    image: "/assets/sasha.webp",
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
    role: "Side project",
    title: "RentIt",
    description:
      "A peer-to-peer rental marketplace. List what you own, rent what you need, pay via Razorpay.",
    subDescription: [
      "Category browse with per-city availability so renters don't see things they can't book.",
      "Vendor profiles with order history and ratings so first-time renters have a signal to trust.",
      "Razorpay checkout + MongoDB-backed booking state for the full list → pay → return loop.",
    ],
    href: "https://rentit-66e6c.web.app/categories",
    logo: "",
    image: "/assets/renitit.webp",
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
    title: "SDE · Full-stack & AI Engineer",
    job: "Flux Fortify",
    date: "Apr 2026 - Present",
    contents: [
      "Shipping features on an AI-native product: spec through deploy, backend to UI.",
      "Backend in TypeScript on Postgres. LLM calls earn their cost against a cheap fallback, or they get ripped out.",
      "Frontend on React + the team's design system. I write the loading, empty, and error states nobody designs on round one.",
      "Rolling features behind flags, watching the dashboard, then promoting. Easier than apologising for a rollback.",
      "A test suite I'd trust at 2am and docs the next engineer actually reads.",
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

export const fallbackTestimonials = [
  {
    id: "fallback-vishnu",
    name: "Vishnu S.",
    role: "Owner, Sasha",
    quote:
      "Ecom made easy work of what used to be a tedious process. The support is top-notch.",
    avatar: "/assets/sasha.webp",
    createdAt: 1,
  },
  {
    id: "fallback-thomson",
    name: "Thomson",
    role: "Event Organiser, TEDxBITD",
    quote:
      "Real-time updates during peak traffic saved us hours. The admin UX is minimal but powerful.",
    avatar: "/assets/tedx.webp",
    createdAt: 2,
  },
  {
    id: "fallback-anshul",
    name: "Anshul Satone",
    role: "Developer",
    quote:
      "Integration was painless. Clean code, sensible defaults, and thoughtful animations.",
    avatar: "/assets/logos/user.svg",
    createdAt: 3,
  },
  {
    id: "fallback-abhishek",
    name: "Abhishek Kashyap",
    role: "Robotics Engineer",
    quote:
      "Varun works with enthusiasm and perfection. He created what our project needed and matches exactly with our requirements.",
    avatar: "",
    createdAt: 4,
  },
  {
    id: "fallback-vansh",
    name: "Vansh",
    role: "Developer",
    quote:
      "The best team player. The best person to work with.",
    avatar: "",
    createdAt: 5,
  },
  {
    id: "fallback-vatsal",
    name: "Vatsal Awasthi",
    role: "Retailer",
    quote:
      "Very meticulous and enthusiastic with discipline. Created an e-commerce platform with high conversion rate.",
    avatar: "",
    createdAt: 6,
  },
];
