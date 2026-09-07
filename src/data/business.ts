export const business = {
  name: "Sparkclean Cleaning Services",
  legalName: "Sparkclean Cleaning Services Inc.",
  phoneDisplay: "(925) 834-1815",
  phoneHref: "+19258341815",
  market: "Walnut Creek, California",
  instagram: "https://www.instagram.com/sparkclean.inc/",
  instagramHandle: "@sparkclean.inc",
  primaryCta: "Get Your Free Estimate",
  status: "production-ready" as const,
};

export const verifiedServices = [
  {
    slug: "deep-cleaning",
    name: "Deep cleaning",
    eyebrow: "Reset the room",
    description: "A detail-first clean when your home needs more than the usual pass.",
  },
  {
    slug: "recurring-cleaning",
    name: "Recurring cleaning",
    eyebrow: "Keep the feeling",
    description: "Biweekly or monthly care designed around the way you live in your home.",
  },
];

export const roomChapters = [
  {
    id: "kitchen",
    name: "Kitchen",
    kicker: "Where the day begins",
    image: "/images/sparkclean-hero-concept.png",
    alt: "Bright California kitchen after a detailed clean",
    tasks: ["Counters and backsplash", "Sink and fixtures", "Cooktop exterior", "Cabinet fronts", "Floors and edges"],
  },
  {
    id: "bathroom",
    name: "Bathroom",
    kicker: "Chrome, glass, stone",
    image: "/images/bathroom-concept.png",
    alt: "Limestone bathroom with polished glass and chrome",
    tasks: ["Shower and tub surfaces", "Mirrors and glass", "Fixtures and vanity", "Toilet exterior", "Baseboards and floors"],
  },
  {
    id: "living",
    name: "Living spaces",
    kicker: "The room exhales",
    image: "/images/living-concept.png",
    alt: "Sunlit living room after cleaning",
    tasks: ["Reachable surfaces", "Furniture exteriors", "Frames and ledges", "Vacuumed upholstery", "Floors and corners"],
  },
  {
    id: "bedroom",
    name: "Bedrooms",
    kicker: "A softer landing",
    image: "/images/bedroom-concept.png",
    alt: "Calm bedroom with fresh white linen",
    tasks: ["Reachable furniture", "Mirrors and ledges", "Bed-area dusting", "Baseboards", "Vacuumed or mopped floors"],
  },
];

export type PlannerState = {
  goal: "reset" | "maintain" | "move" | "custom";
  rooms: "compact" | "medium" | "large";
  detail: "standard" | "detail";
};

export function getRecommendation(state: PlannerState) {
  if (state.goal === "maintain") {
    return {
      title: "Recurring clean",
      cadence: "Start with biweekly or monthly",
      note: "You’ll confirm the right cadence and checklist around your home and priorities.",
    };
  }
  if (state.goal === "move") {
    return {
      title: "Custom move clean request",
      cadence: "Availability and scope need confirmation",
      note: "Share your property condition, timing, and access details to confirm the right service.",
    };
  }
  if (state.goal === "custom") {
    return {
      title: "Custom cleaning request",
      cadence: "Built around your priority list",
      note: "Describe the rooms and details that matter most to you.",
    };
  }
  return {
    title: state.detail === "detail" ? "Deep clean" : "Deep-clean estimate",
    cadence: state.rooms === "large" ? "Plan for a larger-home walkthrough" : "A one-time detailed reset",
    note: "You’ll confirm your checklist, timing, and final price before scheduling.",
  };
}
