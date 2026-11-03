import type { HdImageName } from "./hd-images";

export const company = {
  name: "HYGERX Heavy Equipment Rental L.L.C",
  short: "HYGERX",
  tagline: "Equipment today, a stronger tomorrow.",
  city: "Dubai, UAE",
  phones: [
    { label: "+971 545 242 474", href: "tel:+971545242474", wa: "971545242474" },
    { label: "+971 50 342 4773", href: "tel:+971503424773", wa: "971503424773" },
  ],
  email: "info@hygerx.com",
  website: "www.hygerx.com",
  url: "https://www.hygerx.com",
};

export type Category = "lifting" | "earthmoving" | "compact";

export const categories: { id: Category | "all"; label: string }[] = [
  { id: "all", label: "All equipment" },
  { id: "lifting", label: "Lifting" },
  { id: "earthmoving", label: "Earthmoving" },
  { id: "compact", label: "Compact" },
];

export type Equipment = {
  slug: string;
  no: string;
  name: string;
  singular: string;
  category: Category;
  capacity: string;
  tagline: string;
  image: HdImageName;
  summary: string;
  applications: string[];
  highlights: { label: string; value: string }[];
};

const fleet: Omit<Equipment, "no">[] = [
  {
    slug: "mobile-cranes",
    name: "Mobile Cranes",
    singular: "Mobile Crane",
    category: "lifting",
    capacity: "25 – 500 Ton",
    tagline: "Lifting tomorrow higher",
    image: "fleet-mobile-crane",
    summary:
      "Road-going truck-mounted cranes that arrive, set up and lift fast — ideal when your project needs heavy, precise lifts at more than one location.",
    applications: [
      "Steel erection and precast installation",
      "HVAC, plant and machinery placement",
      "Bridge and infrastructure works",
      "Short-duration lifts across multiple sites",
    ],
    highlights: [
      { label: "Capacity range", value: "25 – 500 T" },
      { label: "Mobility", value: "Road-going" },
      { label: "Rental terms", value: "Short & long term" },
    ],
  },
  {
    slug: "crawler-cranes",
    name: "Crawler Cranes",
    singular: "Crawler Crane",
    category: "lifting",
    capacity: "55 – 400 Ton",
    tagline: "Strength that reaches further",
    image: "fleet-crawler-crane",
    summary:
      "Tracked cranes built for stability on soft or uneven ground — the workhorse for long-duration lifting on large construction and industrial sites.",
    applications: [
      "High-rise and heavy civil construction",
      "Piling and foundation support",
      "Industrial, energy and port projects",
      "Long-term lifting on a single site",
    ],
    highlights: [
      { label: "Capacity range", value: "55 – 400 T" },
      { label: "Undercarriage", value: "Tracked" },
      { label: "Rental terms", value: "Short & long term" },
    ],
  },
  {
    slug: "excavators",
    name: "Excavators",
    singular: "Excavator",
    category: "earthmoving",
    capacity: "Mini – 60 Ton",
    tagline: "Digging a better tomorrow",
    image: "fleet-excavator",
    summary:
      "From mini machines for tight urban plots to 60-ton excavators for bulk earthworks — matched to your soil, depth and production targets.",
    applications: [
      "Site preparation and bulk excavation",
      "Trenching for utilities and drainage",
      "Demolition and material handling",
      "Road and infrastructure earthworks",
    ],
    highlights: [
      { label: "Size range", value: "Mini – 60 T" },
      { label: "Undercarriage", value: "Tracked" },
      { label: "Rental terms", value: "Short & long term" },
    ],
  },
  {
    slug: "wheel-loaders",
    name: "Wheel Loaders",
    singular: "Wheel Loader",
    category: "earthmoving",
    capacity: "Various capacities",
    tagline: "Load. Move. Achieve.",
    image: "fleet-wheel-loader",
    summary:
      "High-output loaders for moving aggregate, sand and spoil quickly — keeping trucks loaded and stockpiles under control.",
    applications: [
      "Truck loading and stockpiling",
      "Quarry and batching plant support",
      "Site clean-up and backfilling",
      "Bulk material handling",
    ],
    highlights: [
      { label: "Capacities", value: "Various models" },
      { label: "Drive", value: "Wheeled" },
      { label: "Rental terms", value: "Short & long term" },
    ],
  },
  {
    slug: "skid-steers",
    name: "Skid Steers",
    singular: "Skid Steer",
    category: "compact",
    capacity: "Various capacities",
    tagline: "Compact power, maximum versatility",
    image: "fleet-skid-steer",
    summary:
      "Nimble compact loaders that work where larger machines can't — and switch roles fast with the right attachment.",
    applications: [
      "Landscaping and site grading",
      "Debris clearing and clean-up",
      "Material moving in confined spaces",
      "Interior and podium-level works",
    ],
    highlights: [
      { label: "Capacities", value: "Various models" },
      { label: "Footprint", value: "Compact" },
      { label: "Rental terms", value: "Short & long term" },
    ],
  },
  {
    slug: "backhoe-loaders",
    name: "Backhoe Loaders",
    singular: "Backhoe Loader",
    category: "compact",
    capacity: "Various capacities",
    tagline: "Dig. Lift. Load. Do more.",
    image: "fleet-backhoe",
    summary:
      "Two machines in one: a loader at the front, a digger at the back. The go-to all-rounder for utilities and general site work.",
    applications: [
      "Utility trenching and pipe laying",
      "Small excavations and backfilling",
      "Loading and short-haul material moving",
      "Road maintenance works",
    ],
    highlights: [
      { label: "Capacities", value: "Various models" },
      { label: "Tools", value: "Loader + backhoe" },
      { label: "Rental terms", value: "Short & long term" },
    ],
  },
  {
    slug: "telehandlers",
    name: "Telehandlers",
    singular: "Telehandler",
    category: "lifting",
    capacity: "Various lifting capacities",
    tagline: "Reach higher, lift further",
    image: "fleet-telehandler",
    summary:
      "Telescopic handlers that place loads up and out — palletised materials to upper floors, roofs and over obstacles.",
    applications: [
      "Placing materials at height",
      "Pallet and block handling",
      "Façade and roofing support",
      "General site logistics",
    ],
    highlights: [
      { label: "Capacities", value: "Various models" },
      { label: "Boom", value: "Telescopic" },
      { label: "Rental terms", value: "Short & long term" },
    ],
  },
];

export const equipment: Equipment[] = fleet.map((e, i) => ({ ...e, no: String(i + 1).padStart(2, "0") }));

export const getEquipment = (slug: string) => equipment.find((e) => e.slug === slug);

export const emirates = [
  "Dubai",
  "Abu Dhabi",
  "Sharjah",
  "Ajman",
  "Umm Al Quwain",
  "Ras Al Khaimah",
  "Fujairah",
];

export const faqs = [
  {
    q: "Do you offer both short-term and long-term rentals?",
    a: "Yes. Every machine in our fleet is available on short-term and long-term rental, tailored to the scale and schedule of your project. Tell us your dates in the quote builder and we'll come back with the best option.",
  },
  {
    q: "Where in the UAE can you deliver?",
    a: "We're centrally located in Dubai and deliver across the UAE, with on-ground support wherever your site is.",
  },
  {
    q: "What condition is the equipment in?",
    a: "Our machinery is well-maintained and goes through strict maintenance and rigorous inspections, so it arrives inspection-ready.",
  },
  {
    q: "How do I choose between a mobile crane and a crawler crane?",
    a: "Mobile cranes (25–500 T) suit lifts across several locations and paved access. Crawler cranes (55–400 T) suit soft ground and long-duration lifting on one site. Try the Crane Finder for an indicative match — our team will confirm against your lift plan.",
  },
  {
    q: "How quickly can I get a quote?",
    a: "Add machines to your quote list and send it by WhatsApp or email in one tap. Our team responds with availability and pricing for your dates.",
  },
];
