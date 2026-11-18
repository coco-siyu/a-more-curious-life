export type Exhibit = {
  id: string;
  label: string;
  title: string;
  year: string;
  medium: string;
  category: "Data product" | "AI product" | "Creative concept" | "Technical concept";
  overview: string;
  stack: string[];
  links: { label: string; href: string }[];
  form: "monolith" | "torus" | "lattice" | "sphere" | "stair" | "ring";
};

export const EXHIBITS: Exhibit[] = [
  {
    id: "01",
    label: "Current 01",
    title: "CMS Quality Intelligence",
    year: "2026",
    medium: "Evidence-grounded healthcare intelligence",
    category: "Data product",
    overview:
      "A review-first web application for tracking changes to CMS quality-measure requirements. It pairs immutable source revisions and exact evidence locators with guarded human review, versioned comparisons, and explicit publication boundaries so unverified clinical details never appear as fact.",
    stack: ["React + TypeScript", "FastAPI + Pydantic", "PostgreSQL", "OpenAPI"],
    links: [
      {
        label: "Live application",
        href: "https://cms-quality-intelligence-web.onrender.com",
      },
      {
        label: "GitHub",
        href: "https://github.com/coco-siyu/cms-quality-intelligence",
      },
    ],
    form: "lattice",
  },
  {
    id: "02",
    label: "Current 02",
    title: "TripSync",
    year: "2026",
    medium: "AI-assisted group travel planner",
    category: "AI product",
    overview:
      "A collaborative planner for groups of two to six travelers. TripSync turns interests, pace, budget, food needs, and must-dos into ranked activities and a reviewable itinerary using hybrid retrieval, deterministic planning constraints, structured LLM output, and organizer approval.",
    stack: ["Python + Streamlit", "Hybrid retrieval", "OpenAI Responses API", "Supabase"],
    links: [
      { label: "Live demo", href: "https://tripsync.streamlit.app" },
      { label: "GitHub", href: "https://github.com/coco-siyu/TripSync" },
    ],
    form: "sphere",
  },
  {
    id: "03",
    label: "Concept 03",
    title: "Concrete Memory",
    year: "2026",
    medium: "Generative WebGL installation",
    category: "Creative concept",
    overview:
      "A real-time sculpture that erodes slowly as visitors linger, recording attention as weathering on a virtual slab.",
    stack: ["Three.js", "GLSL", "WebAudio"],
    links: [],
    form: "monolith",
  },
  {
    id: "04",
    label: "Concept 04",
    title: "Ledger",
    year: "2025",
    medium: "Distributed systems, Postgres",
    category: "Technical concept",
    overview:
      "An event-sourced accounting engine handling 40k writes per second with exact replay and audit trails.",
    stack: ["TypeScript", "Postgres", "Kafka", "Rust"],
    links: [],
    form: "lattice",
  },
  {
    id: "05",
    label: "Concept 05",
    title: "Tidal Type",
    year: "2025",
    medium: "Variable typeface",
    category: "Creative concept",
    overview:
      "A variable font whose weight axis is driven by live tide data from twelve coastal stations.",
    stack: ["Glyphs", "Python", "OpenType"],
    links: [],
    form: "torus",
  },
  {
    id: "06",
    label: "Concept 06",
    title: "Atlas Search",
    year: "2024",
    medium: "Vector search platform",
    category: "Technical concept",
    overview:
      "Semantic search over 80M documents with hybrid ranking, served at p95 under 60ms from edge workers.",
    stack: ["Go", "pgvector", "Cloudflare Workers"],
    links: [],
    form: "sphere",
  },
  {
    id: "07",
    label: "Concept 07",
    title: "Brutal Steps",
    year: "2024",
    medium: "Spatial audio walk",
    category: "Creative concept",
    overview:
      "A site-specific sound piece for a 1968 parking structure, mapped floor by floor to a slow harmonic descent.",
    stack: ["Max/MSP", "Ambisonics", "Unity"],
    links: [],
    form: "stair",
  },
  {
    id: "08",
    label: "Concept 08",
    title: "Orbit UI",
    year: "2023",
    medium: "Design system",
    category: "Technical concept",
    overview:
      "A token-driven component library adopted across nine product teams, with automated accessibility audits.",
    stack: ["React", "Radix", "Storybook", "Playwright"],
    links: [],
    form: "ring",
  },
];

export const SPACING = 9;
export const exhibitPos = (index: number): [number, number, number] => [
  index % 2 === 0 ? -3.6 : 3.6,
  0,
  -index * SPACING,
];
