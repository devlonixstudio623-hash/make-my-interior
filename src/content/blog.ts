export interface BlogSection {
  heading: string;
  paragraphs: string[];
  bullets?: string[];
}

export interface BlogPost {
  slug: string;
  title: string;
  category: string;
  publishedDate: string;
  readingTime: string;
  coverImage: string;
  excerpt: string;
  keywords: string[];
  sections: BlogSection[];
  relatedSlugs: string[];
}

export const BLOG_POSTS: BlogPost[] = [
  {
    slug: 'interior-design-cost-in-varanasi',
    title: 'Interior Design Cost in Varanasi: Honest 2BHK, 3BHK & Villa Breakdown',
    category: 'Budgeting & BOQ',
    publishedDate: 'November 2026',
    readingTime: '5 min read',
    coverImage: '/media/projects/living-room.jpg',
    excerpt:
      'What does quality interior design actually cost in Varanasi? A transparent per-sq-ft guide covering carpentry, false ceilings, modular kitchens, and hidden contractor costs to watch out for.',
    keywords: ['interior design cost in Varanasi', 'interior designer in Varanasi', '3BHK interior budget UP'],
    sections: [
      {
        heading: '1. Why Per-Square-Foot Quotes Vary So Widely in Varanasi',
        paragraphs: [
          'When homeowners in Sigra, Lanka, or Mahmoorganj ask for interior quotes, one contractor quotes ₹900/sq.ft. while a design-build studio quotes ₹1,550/sq.ft. The gap almost always lies in core board grade, hardware brand, and concealed electrical work.',
          'At Make My Interior, we advise never choosing based on a lump-sum headline alone. Always ask for an itemized Bill of Quantities (BOQ) specifying plywood thickness (18mm BWP vs commercial MR), laminate thickness (1.0mm vs 0.8mm), and channel brand.',
        ],
      },
      {
        heading: '2. Realistic Turnkey Interior Ranges (Varanasi)',
        paragraphs: [
          'For a typical 1,400 sq. ft. 3 BHK apartment or floor in Varanasi, practical turnkey budgets fall into three transparent tiers:',
        ],
        bullets: [
          'Essential Standard (₹1,150 – ₹1,400 / sq. ft.): Clean modular kitchen, 2–3 wardrobes, basic gypsum ceiling, and Royal emulsion paint.',
          'Signature Premium (₹1,450 – ₹1,850 / sq. ft.): BWP marine ply in wet zones, acrylic/fluted shutters, Hettich soft-close hardware, recessed warm LED profiles, and TV wall paneling.',
          'Bespoke Luxury (₹1,950 – ₹2,600+ / sq. ft.): Natural walnut veneer, PU coatings, stone countertops, full-home lighting automation, and custom loose furniture.',
        ],
      },
      {
        heading: '3. Three Line Items Homeowners Often Forget to Budget',
        paragraphs: [
          'Always set aside 10–12% of your interior budget for light fixtures/fans, bathroom sanitaryware upgrades, and window curtains or blinds. Including them early in our Cost Estimator prevents mid-project surprises.',
        ],
      },
    ],
    relatedSlugs: ['modular-kitchen-ideas-indian-homes', 'false-ceiling-design-ideas-varanasi'],
  },
  {
    slug: 'modular-kitchen-ideas-indian-homes',
    title: 'Modular Kitchen Ideas Built for Indian Cooking & Varanasi Humidity',
    category: 'Modular Kitchens',
    publishedDate: 'November 2026',
    readingTime: '4 min read',
    coverImage: '/media/projects/modular-kitchen.jpg',
    excerpt:
      'From BWP marine ply sink protection to quartz countertops and high-suction chimney routing—how to design a kitchen that handles tadka, heavy utensils, and monsoon humidity effortlessly.',
    keywords: ['modular kitchen Varanasi', 'Indian modular kitchen materials', 'BWP plywood vs HDHMR'],
    sections: [
      {
        heading: '1. Choose BWP Marine Ply Where Water Lives',
        paragraphs: [
          'Monsoon humidity along the Ganga belt plus daily Indian wet mopping can swell ordinary particle board within 18 months. Use IS:710 BWP (Boiling Water Proof) plywood for the sink cabinet and lower base carcass, and high-density HDHMR for upper shutters.',
        ],
      },
      {
        heading: '2. Ergonomic Zoning: Prep, Cook, Wash & Tall Pantry',
        paragraphs: [
          'Keep at least 36 inches of unobstructed prep counter between your sink and hob. Place spice/oil pull-outs immediately beside the stove and use 45kg-rated tandem boxes for heavy pressure cookers and atta drums.',
        ],
        bullets: [
          'Matte anti-fingerprint acrylic or textured laminate hides smudges better than high-gloss mirror surfaces.',
          'Warm 3000K under-cabinet LED profile strips eliminate shadows cast by overhead lofts while chopping.',
          'Quartz countertops resist haldi and oil stains far better than porous soft marble.',
        ],
      },
    ],
    relatedSlugs: ['interior-design-cost-in-varanasi', 'vastu-tips-for-bedroom-pooja'],
  },
  {
    slug: 'vastu-tips-for-bedroom-pooja',
    title: 'Practical Vastu Tips for Bedroom, Kitchen & Pooja Mandir Alignment',
    category: 'Architecture & Vastu',
    publishedDate: 'October 2026',
    readingTime: '4 min read',
    coverImage: '/media/projects/pooja-entrance.jpg',
    excerpt:
      'How to honour Vastu Shastra principles in modern Varanasi homes without sacrificing cross-ventilation, wardrobe storage, or contemporary aesthetics.',
    keywords: ['Vastu tips for bedroom', 'Vastu architect Varanasi', 'pooja room direction'],
    sections: [
      {
        heading: '1. Master Bedroom Grounding (South-West)',
        paragraphs: [
          'Ideally, place the primary bedroom in the South-West (Nairutya) zone with your headboard oriented toward South or East. Avoid positioning mirrors directly facing the bed, and house wardrobes along the South or West wall to keep North and East openings light.',
        ],
      },
      {
        heading: '2. Pooja Mandir in North-East (Ishanya)',
        paragraphs: [
          'In modern apartments where a dedicated room is tight, an entrance-foyer backlit honey onyx or teak jaali mandir facing East/North-East creates a peaceful spiritual anchor without encroaching on circulation.',
        ],
        bullets: [
          'Never place a mandir sharing a wall with a WC/toilet seat.',
          'Keep kitchen hobs facing East in the South-East (Agneya) corner whenever structural shafts permit.',
        ],
      },
    ],
    relatedSlugs: ['interior-design-cost-in-varanasi', 'false-ceiling-design-ideas-varanasi'],
  },
  {
    slug: 'false-ceiling-design-ideas-varanasi',
    title: 'False Ceiling & Recessed LED Strip Ideas That Make Rooms Feel Taller',
    category: 'Lighting & Ceilings',
    publishedDate: 'October 2026',
    readingTime: '4 min read',
    coverImage: '/media/hero/hero-poster.jpg',
    excerpt:
      'Skip bulky multi-step POP drops. Discover clean perimeter coves, recessed aluminium LED lines, and concealed curtain pelmets that bring hotel-grade warmth to Indian homes.',
    keywords: ['false ceiling Varanasi', 'LED strip false ceiling design', 'gypsum ceiling cost'],
    sections: [
      {
        heading: '1. Less Drop, More Architectural Glow',
        paragraphs: [
          'Heavy central POP medallions eat away ceiling height and collect dust. Today’s sharpest look uses a 4-to-5 inch perimeter gypsum drop leaving the central slab at maximum height, washed evenly with 3000K warm LED strips.',
        ],
      },
      {
        heading: '2. Always Conceal Curtain Tracks & Drivers',
        paragraphs: [
          'Leaving a 6-inch recessed curtain pocket inside the false ceiling lets sheer and blackout drapes glide directly from the ceiling—instantly elongating window proportions.',
        ],
        bullets: [
          'Use Saint-Gobain 12.5mm boards and 0.55mm GI channels with fibre mesh tape to eliminate hairline joint cracks.',
          'Plan accessible hatches behind COB spotlights for every 24V LED driver.',
        ],
      },
    ],
    relatedSlugs: ['interior-design-cost-in-varanasi', 'modular-kitchen-ideas-indian-homes'],
  },
];
