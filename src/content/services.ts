export interface ServiceFAQ {
  question: string;
  answer: string;
}

export interface ServiceItem {
  slug:
    | 'construction'
    | 'architecture-structural-planning'
    | 'interior-design-execution'
    | 'modular-kitchen'
    | 'wardrobe-storage'
    | 'false-ceiling-lighting';
  index: string;
  title: string;
  shortTitle: string;
  hindiLine: string;
  tagline: string;
  heroImage: string;
  startingPrice: string;
  timelineGuidance: string;
  summary: string;
  whatsIncluded: string[];
  materialsAndFinishes: { category: string; spec: string }[];
  processSteps: { step: string; detail: string }[];
  relatedProjectSlugs: string[];
  faqs: ServiceFAQ[];
  seoTitle: string;
  seoDescription: string;
}

export const SERVICES_CONTENT: ServiceItem[] = [
  {
    slug: 'construction',
    index: '01',
    title: 'Turnkey Civil Construction',
    shortTitle: 'Construction',
    hindiLine: 'Mazboot neev se lekar finishing tak, poori zimmedari hamari.',
    tagline: 'End-to-end RCC structure, brickwork, waterproofing, and grey-shell delivery in Varanasi.',
    heroImage: '/media/projects/construction-site.jpg',
    startingPrice: 'From ₹1,650 / sq. ft. (Editable in config/pricing.ts)',
    timelineGuidance: '6 – 12 months depending on plot size and floors',
    summary:
      'Backed by our parent civil engineering legacy, we execute residential villas, duplexes, and commercial buildings with daily site supervision, cube-tested concrete, and zero hidden contractor escalations.',
    whatsIncluded: [
      'Excavation, anti-termite treatment, and RCC column-beam foundation',
      'Earthquake-zone compliant TMT reinforcement & M20/M25 grade concrete',
      'Red brick / AAC block masonry with laser-plumbed plastering',
      'Concealed CPVC plumbing, earthing, and electrical conduit layout',
      'Terrace, sunken slab, and damp-proof course (DPC) waterproofing',
      'Weekly progress photo reports and itemized BOQ stage billing',
    ],
    materialsAndFinishes: [
      { category: 'Steel Reinforcement', spec: 'Jindal Panther / Tata Tiscon Fe-550D TMT' },
      { category: 'Cement & Concrete', spec: 'UltraTech / ACC OPC 43 & PPC Grade' },
      { category: 'Plumbing & Drainage', spec: 'Astral / Ashirvad CPVC & SWR Systems' },
      { category: 'Waterproofing', spec: 'Dr. Fixit / Fosroc Elastomeric Membranes' },
    ],
    processSteps: [
      { step: 'Soil Check & Plot Survey', detail: 'Verify plot boundaries, setback rules, and bearing levels on site.' },
      { step: 'BOQ & Material Lock', detail: 'Sign off exact steel, cement, and brick brands before breaking ground.' },
      { step: 'Stage-Wise RCC Execution', detail: 'Footing, plinth, columns, and slab pours inspected prior to every casting.' },
      { step: 'Brickwork & MEP Rough-In', detail: 'Aligned masonry with concealed conduits ready for interior takeover.' },
    ],
    relatedProjectSlugs: ['mahmoorganj-duplex-construction', 'sigra-residence-living'],
    faqs: [
      {
        question: 'Do you handle VDA (Varanasi Development Authority) map approval drawings?',
        answer: 'We prepare complete architectural submission drawings and coordinate with licensed empanelled engineers for VDA submission workflows.',
      },
      {
        question: 'Can we hire you for bare-shell construction and decide interiors later?',
        answer: 'Yes. Many clients start with our civil construction package and seamlessly transition into interior design once the roof slab is cast.',
      },
    ],
    seoTitle: 'Turnkey House Construction in Varanasi | Make My Interior',
    seoDescription:
      'Transparent, engineering-led residential and commercial construction in Varanasi. From foundation to interior handover under one roof.',
  },
  {
    slug: 'architecture-structural-planning',
    index: '02',
    title: 'Architecture & Structural Planning',
    shortTitle: 'Architecture & Vastu',
    hindiLine: 'Har square foot ka sahi upyog, Vastu aur roshni ke saath.',
    tagline: '2D Vastu floor plans, structural engineering drawings, and 3D exterior elevations.',
    heroImage: '/media/projects/pooja-entrance.jpg',
    startingPrice: 'From ₹45 / sq. ft. (Adjusted in turnkey contracts)',
    timelineGuidance: '2 – 4 weeks for full working drawings',
    summary:
      'Thoughtful spatial planning tailored for narrow Varanasi urban plots and spacious outskirts villas alike—balancing natural cross-ventilation, Vastu orientation, and striking facade geometry.',
    whatsIncluded: [
      'Site measurement, sun-path & ventilation mapping',
      'Vastu-compliant 2D floor plans with furniture layout',
      'Structural working drawings (footing, column schedule, beam & slab steel)',
      'Photorealistic 3D front elevation & night lighting renders',
      'Electrical, plumbing, and drainage working layouts',
    ],
    materialsAndFinishes: [
      { category: 'Facade Cladding', spec: 'HPL timber louvers, natural stone, textured exterior paints' },
      { category: 'Glazing Spec', spec: 'Tinted double-glazed UPVC / slimline aluminium profiles' },
      { category: 'Vastu Integration', spec: 'North-East water/pooja zoning, South-East kitchen alignment' },
    ],
    processSteps: [
      { step: 'Requirement & Family Brief', detail: 'Room counts, parking needs, Vastu preferences, and future floor expansion.' },
      { step: '2D Plan Iterations', detail: 'Review circulation, daylight, and column placement before freezing walls.' },
      { step: '3D Elevation & Structural Set', detail: 'Deliver contractor-ready reinforcement schedules and facade renders.' },
    ],
    relatedProjectSlugs: ['mahmoorganj-duplex-construction', 'lanka-pooja-foyer'],
    faqs: [
      {
        question: 'Do you design 3D front elevations for already-constructed houses?',
        answer: 'Yes, we create custom facade redesigns with ACP, HPL louvers, and exterior LED profile lighting for existing buildings.',
      },
      {
        question: 'Is Vastu consultation included in floor planning?',
        answer: 'Yes. Every floor plan respects practical Vastu principles without sacrificing structural logic or daylight.',
      },
    ],
    seoTitle: 'Architects & Vastu Floor Planning in Varanasi | Make My Interior',
    seoDescription:
      'Custom 2D Vastu floor plans, structural engineering drawings, and 3D front elevation designs in Varanasi, UP.',
  },
  {
    slug: 'interior-design-execution',
    index: '03',
    title: 'Turnkey Interior Design & Execution',
    shortTitle: 'Turnkey Interiors',
    hindiLine: '3D design jo sirf screen par nahi, aapke ghar mein bhi waisa hi dikhe.',
    tagline: 'Complete home & commercial interiors from photorealistic 3D views to final styling.',
    heroImage: '/media/projects/living-room.jpg',
    startingPrice: 'From ₹1,150 / sq. ft. (Editable in config/pricing.ts)',
    timelineGuidance: '45 – 90 days depending on scope',
    summary:
      'We bridge the gap between Pinterest-grade aesthetics and real on-site execution—combining custom carpentry, stone work, wall paneling, soft furnishings, and layered warm LED lighting.',
    whatsIncluded: [
      'Photorealistic 3D renders for every room prior to work start',
      'Custom TV units, fluted wall paneling, and upholstered headboards',
      'Italian/vitrified flooring, dado tiling, and bathroom vanity remodels',
      'Royal/Velvet emulsion painting, texture walls, and veneer polish',
      'Complete electrical rewiring, switchplates, and architectural light fixtures',
    ],
    materialsAndFinishes: [
      { category: 'Plywood & Boards', spec: 'Century / Greenply BWP & HDHMR moisture-resistant boards' },
      { category: 'Surface Finishes', spec: 'Natural teak/walnut veneers, PU coatings, fluted charcoal panels' },
      { category: 'Wall Coatings', spec: 'Asian Paints Royale / Dulux Velvet Touch' },
    ],
    processSteps: [
      { step: '3D Moodboard & Walkthrough', detail: 'Approve colors, wood grains, and lighting temperatures before procurement.' },
      { step: 'Site Civil & Electrical Prep', detail: 'Chase walls cleanly, level surfaces, and install concealed LED drivers.' },
      { step: 'Carpentry & Stone Installation', detail: 'Precision on-site/modular fitment followed by polishing and deep cleaning.' },
    ],
    relatedProjectSlugs: ['sigra-residence-living', 'bhelupur-master-bedroom', 'assighat-boutique-cafe'],
    faqs: [
      {
        question: 'Will the final room actually match the 3D design?',
        answer: 'Yes. We design using exact laminate codes, stone slabs, and light fixtures locally sourced and verified before finalizing your 3D view.',
      },
      {
        question: 'Do you take up commercial spaces like cafes, clinics, and showrooms?',
        answer: 'Yes. We deliver commercial interiors across Varanasi with fast-track schedules so your business opens on time.',
      },
    ],
    seoTitle: 'Interior Designer in Varanasi — Turnkey Home & Commercial Interiors',
    seoDescription:
      'Luxury yet honest-priced turnkey interior design and execution in Varanasi. 3D visualization, carpentry, lighting, and painting.',
  },
  {
    slug: 'modular-kitchen',
    index: '04',
    title: 'Modular Kitchens',
    shortTitle: 'Modular Kitchen',
    hindiLine: 'Bharatiya rasoi ke hisaab se mazboot, oil-proof aur smart storage.',
    tagline: 'BWP marine-ply & HDHMR kitchens engineered for Indian cooking, heavy utensils, and easy cleaning.',
    heroImage: '/media/projects/modular-kitchen.jpg',
    startingPrice: 'From ₹1,45,000 onwards',
    timelineGuidance: '25 – 35 days fabrication & installation',
    summary:
      'Designed around real Indian cooking workflows—high-heat chimney ducting, wet/dry sink zoning, oil pull-outs, corner carousels, and warm under-cabinet LED task lighting.',
    whatsIncluded: [
      'L-shaped, U-shaped, Parallel, or Island kitchen ergonomic layout',
      'BWP IS:710 waterproof plywood carcass around sink & wet zones',
      'Soft-close tandem boxes, tall pantry units, and magic corners',
      'Quartz / Granite countertop & seamless backsplash installation',
      'Under-cabinet warm LED profile strips with concealed sensor switch',
    ],
    materialsAndFinishes: [
      { category: 'Carcass Core', spec: '18mm BWP Marine Ply (wet areas) & Action Tesa HDHMR' },
      { category: 'Shutter Finishes', spec: 'Anti-fingerprint Matte Acrylic, PU Lacquer, or Fluted Laminate' },
      { category: 'Hardware', spec: 'Hettich / Hafele / Blum soft-close channels & hinges' },
      { category: 'Countertops', spec: 'Calacatta Quartz / Black Galaxy Granite' },
    ],
    processSteps: [
      { step: 'Appliance & Plumbing Mapping', detail: 'Mark exact points for chimney, hob, RO, dishwasher, and built-in oven.' },
      { step: 'Factory Cut & Edge-Banding', detail: '2mm PVC/ABS seamless edge-banding to resist steam and moisture.' },
      { step: '3-Day Clean Site Fitment', detail: 'Level-calibrated carcass assembly, granite cutting, and hardware tuning.' },
    ],
    relatedProjectSlugs: ['shivpur-quartz-kitchen', 'sigra-residence-living'],
    faqs: [
      {
        question: 'Which material is best for Varanasi humidity and heavy Indian cooking?',
        answer: 'We recommend BWP (Boiling Water Proof) plywood for sink and lower cabinets paired with HDHMR and acrylic or high-pressure laminate shutters.',
      },
      {
        question: 'Do you provide hardware warranty?',
        answer: 'Yes, branded Hettich/Hafele hardware carries manufacturer warranties, backed by our 1-year studio workmanship support.',
      },
    ],
    seoTitle: 'Modular Kitchen in Varanasi | Custom Quartz & Acrylic Kitchens',
    seoDescription:
      'Custom modular kitchens in Varanasi built with BWP marine ply, soft-close hardware, and warm LED lighting.',
  },
  {
    slug: 'wardrobe-storage',
    index: '05',
    title: 'Wardrobes & Bespoke Storage',
    shortTitle: 'Wardrobes & TV Units',
    hindiLine: 'Floor-to-ceiling storage jo kamre ko bada aur vyavasthit dikhaye.',
    tagline: 'Sliding, hinged, and walk-in wardrobes plus sleek floating TV consoles.',
    heroImage: '/media/projects/bedroom-suite.jpg',
    startingPrice: 'From ₹1,350 / sq. ft. (Elevation area)',
    timelineGuidance: '20 – 30 days',
    summary:
      'Every inch from floor skirting to ceiling loft optimized—featuring concealed dresser mirrors, sensor-lit wardrobe rods, velvet-lined jewellery trays, and seamless TV media walls.',
    whatsIncluded: [
      'Floor-to-ceiling hinged, sliding, or fluted-glass profile wardrobes',
      'Custom internal zoning: saree racks, trouser pull-outs, locker drawers',
      'Motion-sensor warm LED strip lighting inside hanging bays',
      'Floating TV consoles with concealed HDMI/Wi-Fi cable raceways',
    ],
    materialsAndFinishes: [
      { category: 'Shutter Options', spec: 'Tinted glass in anodized gold/black frames, fluted veneer, suede laminate' },
      { category: 'Channels & Tracks', spec: 'Heavy-duty soft-close sliding tracks & concealed European hinges' },
      { category: 'Internal Finish', spec: '0.8mm fabric-textured / frost-white balancing laminate' },
    ],
    processSteps: [
      { step: 'Inventory Audit', detail: 'Plan hanging height, folded shelves, and luggage loft proportions.' },
      { step: 'Elevation & Internal 3D', detail: 'Review exterior shutter alignment and internal drawer split.' },
      { step: 'Precision Assembly', detail: 'Installed plumb to walls with zero ugly gaps or exposed screw heads.' },
    ],
    relatedProjectSlugs: ['bhelupur-master-bedroom', 'cantt-wardrobe-tv-wall'],
    faqs: [
      {
        question: 'Should I choose sliding or hinged wardrobes?',
        answer: 'Sliding wardrobes save clearance in compact rooms, while hinged doors allow full 100% view of the wardrobe at once and cost slightly less.',
      },
    ],
    seoTitle: 'Custom Wardrobes & TV Units in Varanasi | Make My Interior',
    seoDescription:
      'Floor-to-ceiling wardrobes, walk-in closets, and bespoke TV walls in Varanasi crafted with soft-close hardware.',
  },
  {
    slug: 'false-ceiling-lighting',
    index: '06',
    title: 'False Ceiling & Architectural Lighting',
    shortTitle: 'False Ceiling & LED',
    hindiLine: 'Roshni ka jaadu — warm gold LED lines jo har kamre ko royal feel de.',
    tagline: 'Gypsum & wooden baffle ceilings paired with signature recessed LED strip lighting.',
    heroImage: '/media/hero/hero-poster.jpg',
    startingPrice: 'From ₹95 / sq. ft. (Gypsum framing + board)',
    timelineGuidance: '10 – 18 days per home',
    summary:
      'Our signature aesthetic: crisp multi-level gypsum coves, recessed aluminium LED channels, magnetic track lights, and warm 3000K–4000K architectural layering that elevates every wall texture.',
    whatsIncluded: [
      '12.5mm Saint-Gobain Gyproc / Armstrong moisture-resistant boards',
      'GI ultra-frame channel grid with double perimeter anti-crack taping',
      'Recessed aluminium profile channels for seamless linear LED strips',
      'Timber/WPC ceiling rafters and acoustic baffle accents',
      'Three-layer lighting plan: ambient cove, task downlights, and accent spots',
    ],
    materialsAndFinishes: [
      { category: 'Ceiling Board & Grid', spec: 'Saint-Gobain Gyproc 12.5mm + 0.55mm GI channels' },
      { category: 'LED Profiles & Drivers', spec: '24V high-CRI warm white (3000K) strips with accessible concealed drivers' },
      { category: 'Fixtures', spec: 'Philips / Jaquar / Wipro glare-free deep-recessed COB spots' },
    ],
    processSteps: [
      { step: 'Reflected Ceiling Plan (RCP)', detail: 'Coordinate fan positions, AC grilles, curtains, and beam drops.' },
      { step: 'GI Framing & Concealed Wiring', detail: 'Laser-leveled perimeter framing and fire-retardant FRLS wiring.' },
      { step: 'Boarding, Putty & Light Testing', detail: 'Test every LED driver and dimmer before final coat painting.' },
    ],
    relatedProjectSlugs: ['sigra-residence-living', 'assighat-boutique-cafe'],
    faqs: [
      {
        question: 'How do you prevent cracks at false ceiling joints?',
        answer: 'We use fibre mesh joint tape, proper GI channel spacing (16-inch centers), and dedicated perimeter shadow gaps.',
      },
      {
        question: 'Where are the LED strip drivers hidden so they can be serviced later?',
        answer: 'Every driver is tucked cleanly behind an easily accessible spotlight cutout or inside a designated wardrobe/pelmet hatch.',
      },
    ],
    seoTitle: 'False Ceiling & LED Strip Lighting in Varanasi | Make My Interior',
    seoDescription:
      'Gypsum false ceilings, wooden rafters, and warm architectural LED profile lighting designed and installed in Varanasi.',
  },
];

export const SPECIALIZED_OFFERINGS = {
  vastu: {
    title: 'Vastu Shastra Consultation & Spatial Alignment',
    hindiLine: 'Parampara aur modern architecture ka santulan.',
    description:
      'For homes and commercial plots in Varanasi, Vastu is deeply personal. We integrate Vastu zoning directly into your structural and interior layout—without breaking modern aesthetics or forcing awkward corridors.',
    points: [
      'Ishanya (North-East) tranquil foyer, water feature, or Pooja Mandir placement',
      'Agneya (South-East) modular kitchen hob & exhaust orientation',
      'Nairutya (South-West) master suite grounding and wardrobe positioning',
      'Non-structural interior Vastu remedies for existing flats & renovations',
    ],
  },
  elevation: {
    title: '3D Front Elevation & Facade Engineering',
    hindiLine: 'Ghar ki pehli pehchan — timeless exterior elevation.',
    description:
      'Whether it is a 20-foot wide urban townhouse in Lanka or a corner villa in Shivpur, we craft bold architectural facades built to withstand Varanasi summers and monsoons.',
    points: [
      'Day & night 3D facade visualizations with warm exterior LED wall washers',
      'Weather-resistant HPL wooden louvers, GRC jali screens & natural stone cladding',
      'Detailed elevation measurement drawings for your site mason and fabricator',
    ],
  },
};
