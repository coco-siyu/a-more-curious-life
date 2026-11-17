export type Exhibit = {
  id: string;
  label: string;
  title: string;
  year: string;
  medium: string;
  category: "Creative" | "Technical";
  overview: string;
  stack: string[];
  links: { label: string; href: string }[];
  form: "monolith" | "torus" | "lattice" | "sphere" | "stair" | "ring";
};

export const EXHIBITS: Exhibit[] = [
  {
    id: "01",
    label: "Catalog 01",
    title: "Concrete Memory",
    year: "2026",
    medium: "Generative WebGL installation",
    category: "Creative",
    overview:
      "A real-time sculpture that erodes slowly as visitors linger, recording attention as weathering on a virtual slab.",
    stack: ["Three.js", "GLSL", "WebAudio"],
    links: [
      { label: "Live piece", href: "#" },
      { label: "Process notes", href: "#" },
    ],
    form: "monolith",
  },
  {
    id: "02",
    label: "Display 02",
    title: "Ledger",
    year: "2025",
    medium: "Distributed systems, Postgres",
    category: "Technical",
    overview:
      "An event-sourced accounting engine handling 40k writes per second with exact replay and audit trails.",
    stack: ["TypeScript", "Postgres", "Kafka", "Rust"],
    links: [
      { label: "Source", href: "#" },
      { label: "Case study", href: "#" },
    ],
    form: "lattice",
  },
  {
    id: "03",
    label: "Catalog 03",
    title: "Tidal Type",
    year: "2025",
    medium: "Variable typeface",
    category: "Creative",
    overview:
      "A variable font whose weight axis is driven by live tide data from twelve coastal stations.",
    stack: ["Glyphs", "Python", "OpenType"],
    links: [{ label: "Specimen", href: "#" }],
    form: "torus",
  },
  {
    id: "04",
    label: "Display 04",
    title: "Atlas Search",
    year: "2024",
    medium: "Vector search platform",
    category: "Technical",
    overview:
      "Semantic search over 80M documents with hybrid ranking, served at p95 under 60ms from edge workers.",
    stack: ["Go", "pgvector", "Cloudflare Workers"],
    links: [
      { label: "Demo", href: "#" },
      { label: "Paper", href: "#" },
    ],
    form: "sphere",
  },
  {
    id: "05",
    label: "Catalog 05",
    title: "Brutal Steps",
    year: "2024",
    medium: "Spatial audio walk",
    category: "Creative",
    overview:
      "A site-specific sound piece for a 1968 parking structure, mapped floor by floor to a slow harmonic descent.",
    stack: ["Max/MSP", "Ambisonics", "Unity"],
    links: [{ label: "Listen", href: "#" }],
    form: "stair",
  },
  {
    id: "06",
    label: "Display 06",
    title: "Orbit UI",
    year: "2023",
    medium: "Design system",
    category: "Technical",
    overview:
      "A token-driven component library adopted across nine product teams, with automated accessibility audits.",
    stack: ["React", "Radix", "Storybook", "Playwright"],
    links: [
      { label: "Docs", href: "#" },
      { label: "GitHub", href: "#" },
    ],
    form: "ring",
  },
];

export const SPACING = 9;
export const exhibitPos = (index: number): [number, number, number] => [
  index % 2 === 0 ? -3.6 : 3.6,
  0,
  -index * SPACING,
];
