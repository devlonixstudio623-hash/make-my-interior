export type ProjectCategory =
  | 'Living Room'
  | 'Bedroom'
  | 'Kitchen'
  | 'Wardrobe and TV Unit'
  | 'Bathroom'
  | 'Restaurant/Commercial'
  | 'Entrance/Pooja'
  | 'Construction';

export const PROJECT_CATEGORIES: ProjectCategory[] = [
  'Living Room',
  'Bedroom',
  'Kitchen',
  'Wardrobe and TV Unit',
  'Bathroom',
  'Restaurant/Commercial',
  'Entrance/Pooja',
  'Construction',
];

export interface ProjectCaseStudy {
  slug: string;
  title: string;
  category: ProjectCategory;
  location: string;
  area: string;
  duration: string;
  budgetRange: string;
  featured: boolean;
  heroImage: string;
  gallery: { src: string; caption: string }[];
  beforeImage: string;
  afterImage: string;
  videoPoster: string;
  videoSrc?: string; // TODO: Add local compressed .mp4 under /public/media/projects/ when client provides video
  summary: string;
  challenge: string;
  solution: string;
  siteProgressTimeline: { phase: string; status: string; note: string }[];
  clientQuote: {
    quote: string;
    author: string;
    context: string;
  };
  specs: string[];
}

export const PROJECTS_CONTENT: ProjectCaseStudy[] = [
  {
    slug: 'sigra-residence-living',
    title: 'The Fluted Walnut & Cove Living Lounge',
    category: 'Living Room',
    location: 'Sigra, Varanasi',
    area: '480 sq. ft. Living & Dining',
    duration: '52 Days',
    budgetRange: '₹7.8 L – ₹9.2 L (Interior Package)',
    featured: true,
    heroImage: '/media/projects/living-room.jpg',
    gallery: [
      { src: '/media/projects/living-room.jpg', caption: 'Warm fluted walnut media wall with recessed LED cove ceiling' },
      { src: '/media/projects/pooja-entrance.jpg', caption: 'Adjacent foyer and backlit onyx niche transition' },
      { src: '/media/before-after/living-before.jpg', caption: 'Bare brick shell prior to electrical chasing & paneling' },
    ],
    beforeImage: '/media/before-after/living-before.jpg',
    afterImage: '/media/before-after/living-after.jpg',
    videoPoster: '/media/projects/living-room.jpg',
    summary:
      'Transforming a raw brick-and-concrete apartment shell in Sigra into an inviting evening lounge anchored by warm walnut battens and multi-tiered LED cove lighting.',
    challenge:
      'Uneven builder-grade concrete ceiling beams reduced clear height, while heavy afternoon glare entered through the western balcony.',
    solution:
      'We engineered a stepped perimeter false ceiling that hid structural beams inside warm 3000K LED coves and paired sheer-plus-blackout ceiling-recessed drapery with custom low-profile seating.',
    siteProgressTimeline: [
      { phase: 'Week 1–2', status: 'Civil & Electrical Prep', note: 'Wall chasing, concealed 24V LED driver niche & GI ceiling framing.' },
      { phase: 'Week 3–5', status: 'Fluted Joinery & Stone', note: 'Walnut veneer media wall installation & travertine floor polish.' },
      { phase: 'Week 6–7', status: 'Paint, Lighting & Styling', note: 'Velvet emulsion coats, brass sconces & custom sofa placement.' },
    ],
    clientQuote: {
      quote: 'Every evening when the cove lights turn on, the living room feels like a five-star suite—and the final bill stayed faithful to our BOQ.',
      author: 'Srivastava Family',
      context: '3 BHK Residence · Sigra, Varanasi',
    },
    specs: ['BWP Ply & Natural Walnut Veneer', '3000K Recessed LED Strip Profile', 'Honed Travertine Flooring'],
  },
  {
    slug: 'shivpur-quartz-kitchen',
    title: 'Charcoal & Calacatta Island Kitchen',
    category: 'Kitchen',
    location: 'Shivpur, Varanasi',
    area: '210 sq. ft. Kitchen + Utility',
    duration: '34 Days',
    budgetRange: '₹3.6 L – ₹4.4 L',
    featured: true,
    heroImage: '/media/projects/modular-kitchen.jpg',
    gallery: [
      { src: '/media/projects/modular-kitchen.jpg', caption: 'Matte charcoal lower cabinetry with fluted oak overhead lofts' },
      { src: '/media/projects/living-room.jpg', caption: 'Open sightline connecting island counter to living lounge' },
    ],
    beforeImage: '/media/before-after/living-before.jpg',
    afterImage: '/media/projects/modular-kitchen.jpg',
    videoPoster: '/media/projects/modular-kitchen.jpg',
    summary:
      'An open-plan Indian modular kitchen combining heavy-duty BWP marine ply durability with a seamless Calacatta quartz waterfall island.',
    challenge:
      'The family needed heavy daily cooking ergonomics, two-person prep circulation, and zero visual clutter from overhead appliances.',
    solution:
      'Built an appliance garage and tall pantry tower along the flanking wall, paired with anti-fingerprint matte charcoal drawers and warm under-cabinet task LEDs.',
    siteProgressTimeline: [
      { phase: 'Week 1', status: 'Plumbing & Ducting', note: 'Core-cut chimney duct, RO point & dishwasher water inlet.' },
      { phase: 'Week 2–3', status: 'Factory Fabrication', note: 'BWP carcass cutting, 2mm edge banding & shutter finishing.' },
      { phase: 'Week 4–5', status: 'Site Assembly & Quartz', note: 'Waterfall island stone jointing & soft-close tandem calibration.' },
    ],
    clientQuote: {
      quote: 'Cleaning takes ten minutes after cooking, and the drawers glide effortlessly even when loaded with heavy steel cookware.',
      author: 'Mrs. Anjali Tiwari',
      context: 'Independent Residence · Shivpur',
    },
    specs: ['18mm BWP Marine Ply', 'Hettich InnoTech Soft-Close', 'Calacatta Quartz Countertop'],
  },
  {
    slug: 'bhelupur-master-bedroom',
    title: 'Calm Linen & Fluted Timber Master Suite',
    category: 'Bedroom',
    location: 'Bhelupur, Varanasi',
    area: '320 sq. ft. Master Suite',
    duration: '38 Days',
    budgetRange: '₹4.9 L – ₹5.8 L',
    featured: true,
    heroImage: '/media/projects/bedroom-suite.jpg',
    gallery: [
      { src: '/media/projects/bedroom-suite.jpg', caption: 'Full-height upholstered headboard flanked by walnut slats' },
      { src: '/media/projects/pooja-entrance.jpg', caption: 'Warm brass accent hardware continuity across suite' },
    ],
    beforeImage: '/media/before-after/living-before.jpg',
    afterImage: '/media/projects/bedroom-suite.jpg',
    videoPoster: '/media/projects/bedroom-suite.jpg',
    summary:
      'A serene acoustic bedroom retreat pairing floor-to-ceiling bouclé fabric panels with warm timber slats and brass bedside pendants.',
    challenge:
      'Street noise from Bhelupur main road disturbed sleep and an asymmetrical structural pillar jutted beside the bed wall.',
    solution:
      'Flushed out the wall depth with concealed acoustic backing behind fluted walnut panels and integrated hidden storage niches beside the bed.',
    siteProgressTimeline: [
      { phase: 'Week 1–2', status: 'Wall Flush & Ceiling', note: 'Acoustic framing, curtain pelmet pocket & two-way bed switches.' },
      { phase: 'Week 3–4', status: 'Wardrobe & Paneling', note: 'Floor-to-ceiling closet fitment & fluted headboard framing.' },
      { phase: 'Week 5–6', status: 'Upholstery & Pendants', note: 'Fabric panel mounting, cane accent chair & bedside lighting.' },
    ],
    clientQuote: {
      quote: 'They turned an awkward pillar into the best design feature in our entire house.',
      author: 'Dr. R. K. Verma',
      context: 'Home Renovation · Bhelupur',
    },
    specs: ['Acoustic Timber Slats', 'Custom Bouclé Headboard', 'Concealed Curtain Pelmet'],
  },
  {
    slug: 'mahmoorganj-duplex-construction',
    title: 'G+2 Urban Duplex Structural Build',
    category: 'Construction',
    location: 'Mahmoorganj, Varanasi',
    area: '2,850 sq. ft. Built-up Area',
    duration: '9.5 Months',
    budgetRange: '₹54 L – ₹62 L (Civil + Elevation)',
    featured: true,
    heroImage: '/media/projects/construction-site.jpg',
    gallery: [
      { src: '/media/projects/construction-site.jpg', caption: 'RCC frame & precision brick masonry phase at Mahmoorganj' },
      { src: '/media/projects/living-room.jpg', caption: 'Completed interior lounge delivered by the same studio team' },
    ],
    beforeImage: '/media/projects/construction-site.jpg',
    afterImage: '/media/projects/living-room.jpg',
    videoPoster: '/media/projects/construction-site.jpg',
    summary:
      'Complete turnkey construction from bare plot excavation to weather-tight RCC structure and elevation, seamlessly handed over to our in-house interior team.',
    challenge:
      'A tight urban plot access lane in Mahmoorganj demanded disciplined material scheduling and zero neighbor wall dampness.',
    solution:
      'Executed waterproofed tie-beam foundations, scheduled staggered RMC/aggregate deliveries, and coordinated electrical/AC sleeves directly inside the interior 3D plan.',
    siteProgressTimeline: [
      { phase: 'Month 1–2', status: 'Foundation & Plinth', note: 'Soil compaction, anti-termite chemical barrier & plinth beam casting.' },
      { phase: 'Month 3–6', status: 'RCC Superstructure', note: 'G+2 column and slab pours with 14-day curing supervision.' },
      { phase: 'Month 7–9', status: 'Masonry, MEP & Plaster', note: 'Brickwork, concealed CPVC/FRLS conduits & waterproofing checks.' },
    ],
    clientQuote: {
      quote: 'Having one team handle both the civil structure and interiors saved us at least three months of finger-pointing between contractors.',
      author: 'Gupta Family',
      context: 'Turnkey Villa · Mahmoorganj',
    },
    specs: ['Fe-550D TMT Steel', 'M25 Grade Concrete', 'Dual-Coat Terrace Waterproofing'],
  },
  {
    slug: 'assighat-boutique-cafe',
    title: 'Kashi Courtyard Bistro & Roastery',
    category: 'Restaurant/Commercial',
    location: 'Near Assi Ghat, Varanasi',
    area: '1,350 sq. ft. Dining & Bar',
    duration: '48 Days',
    budgetRange: '₹19.5 L – ₹24 L',
    featured: true,
    heroImage: '/media/projects/commercial-cafe.jpg',
    gallery: [
      { src: '/media/projects/commercial-cafe.jpg', caption: 'Timber-baffle ceiling with linear warm LED strips & brass pendants' },
      { src: '/media/projects/modular-kitchen.jpg', caption: 'Back-of-house stainless & quartz prep zone' },
    ],
    beforeImage: '/media/before-after/living-before.jpg',
    afterImage: '/media/projects/commercial-cafe.jpg',
    videoPoster: '/media/projects/commercial-cafe.jpg',
    summary:
      'An atmospheric 44-cover contemporary dining room blending charcoal lime-textured walls with rhythmic timber ceiling baffles and warm architectural strip lighting.',
    challenge:
      'Delivering commercial kitchen ventilation, acoustic comfort for 40+ guests, and a distinctive Instagram-ready aesthetic under a strict 7-week launch deadline.',
    solution:
      'Installed acoustic mineral wool above the slatted timber ceiling, custom brass dome pendants, and durable marble-topped tables anchored by a backlit stone bar.',
    siteProgressTimeline: [
      { phase: 'Week 1–2', status: 'HVAC, Exhaust & Plumbing', note: 'Commercial kitchen hood ducting & grease-trap floor plumbing.' },
      { phase: 'Week 3–5', status: 'Ceiling Baffles & Plaster', note: 'Timber slat grid with recessed linear LEDs & charcoal lime wash.' },
      { phase: 'Week 6–7', status: 'Bar Millwork & Launch', note: 'Stone bar counter, banquette seating & lighting scene calibration.' },
    ],
    clientQuote: {
      quote: 'Guests ask about the ceiling lighting every single night. Make My Interior delivered on the exact opening date we announced.',
      author: 'Vikramaditya Singh',
      context: 'Hospitality Founder · Assi Road',
    },
    specs: ['Acoustic Timber Baffle Ceiling', 'Charcoal Lime Texture Walls', 'Linear 2700K LED Profiles'],
  },
  {
    slug: 'lanka-pooja-foyer',
    title: 'Honey Onyx Mandir & Foyer Sanctuary',
    category: 'Entrance/Pooja',
    location: 'Lanka, Varanasi',
    area: '165 sq. ft. Foyer & Pooja',
    duration: '26 Days',
    budgetRange: '₹2.8 L – ₹3.5 L',
    featured: true,
    heroImage: '/media/projects/pooja-entrance.jpg',
    gallery: [
      { src: '/media/projects/pooja-entrance.jpg', caption: 'Backlit natural honey onyx with carved teakwood jaali doors' },
      { src: '/media/projects/living-room.jpg', caption: 'Seamless dark marble flooring transition into main hall' },
    ],
    beforeImage: '/media/before-after/living-before.jpg',
    afterImage: '/media/projects/pooja-entrance.jpg',
    videoPoster: '/media/projects/pooja-entrance.jpg',
    summary:
      'A serene North-East Vastu foyer featuring a backlit translucent honey onyx stone backdrop, handcrafted teak lattice doors, and suspended temple brass bells.',
    challenge:
      'Integrating a dedicated sacred Pooja space near the entrance without feeling cramped or visually disconnected from a dark modern palette.',
    solution:
      'Framed the entrance corridor in matte charcoal walls and dark Italian-look marble while making the warm glowing onyx mandir the spiritual focal heart of the home.',
    siteProgressTimeline: [
      { phase: 'Week 1', status: 'Stone & Light Box Framing', note: 'Diffused acrylic & warm LED array installed behind stone frame.' },
      { phase: 'Week 2–3', status: 'Teak Jaali & Mandir Unit', note: 'CNC + hand-finished teak doors and hidden drawer storage for pooja essentials.' },
      { phase: 'Week 4', status: 'Brass Bells & Final Polish', note: 'Hardware installation, stone sealing & foyer chandelier fitment.' },
    ],
    clientQuote: {
      quote: 'Our guests pause at the entrance every time—the glow of the onyx stone feels calm and timeless.',
      author: 'Pandey Family',
      context: 'Duplex Residence · Lanka',
    },
    specs: ['Backlit Natural Honey Onyx', 'Seasoned Teakwood Jaali', 'Concealed Diffused LED Array'],
  },
  {
    slug: 'cantt-wardrobe-tv-wall',
    title: 'Fluted Glass Wardrobe & Media Suite',
    category: 'Wardrobe and TV Unit',
    location: 'Cantt, Varanasi',
    area: '260 sq. ft. Dressing & Lounge',
    duration: '28 Days',
    budgetRange: '₹3.2 L – ₹3.9 L',
    featured: false,
    heroImage: '/media/projects/bedroom-suite.jpg',
    gallery: [
      { src: '/media/projects/bedroom-suite.jpg', caption: 'Warm walnut joinery paired with integrated study & dressing bay' },
      { src: '/media/projects/living-room.jpg', caption: 'Matching fluted console and hidden cable management' },
    ],
    beforeImage: '/media/before-after/living-before.jpg',
    afterImage: '/media/projects/bedroom-suite.jpg',
    videoPoster: '/media/projects/bedroom-suite.jpg',
    summary:
      'Floor-to-ceiling wardrobe wall with motion-activated internal lighting, hidden dressing mirror, and a continuous floating media console.',
    challenge:
      'Maximizing winter quilt and saree storage in a compact apartment bedroom without making the walls feel boxy.',
    solution:
      'Extended loft shutters flush to the false ceiling shadow gap and used warm walnut vertical grooves to draw the eye upward.',
    siteProgressTimeline: [
      { phase: 'Week 1', status: 'Laser Measurement', note: 'Mapped wall plumb variations and power sockets.' },
      { phase: 'Week 2–3', status: 'Modular Carcass', note: 'HDHMR frame assembly with internal LED channels.' },
      { phase: 'Week 4', status: 'Hardware & Handover', note: 'Soft-close hinges, trouser pull-outs & final cleaning.' },
    ],
    clientQuote: {
      quote: 'Zero wasted inches and the internal wardrobe lights turn on smoothly the second you open the door.',
      author: 'Mehta Household',
      context: 'Apartment Interior · Cantt',
    },
    specs: ['Action Tesa HDHMR', 'Motion-Sensor Wardrobe LEDs', 'Brushed Brass Profile Handles'],
  },
  {
    slug: 'sarnath-spa-bathroom',
    title: 'Monolithic Stone & Niche Powder Bath',
    category: 'Bathroom',
    location: 'Sarnath Road, Varanasi',
    area: '95 sq. ft. Master Bath',
    duration: '22 Days',
    budgetRange: '₹2.1 L – ₹2.7 L',
    featured: false,
    heroImage: '/media/projects/pooja-entrance.jpg',
    gallery: [
      { src: '/media/projects/pooja-entrance.jpg', caption: 'Warm backlit stone niche inspiration & dark marble slab continuity' },
      { src: '/media/projects/modular-kitchen.jpg', caption: 'BWP waterproof vanity joinery & brushed brass fixtures' },
    ],
    beforeImage: '/media/before-after/living-before.jpg',
    afterImage: '/media/projects/pooja-entrance.jpg',
    videoPoster: '/media/projects/pooja-entrance.jpg',
    summary:
      'Hotel-inspired wet/dry zoned bathroom with concealed cistern, recessed illuminated shower niche, and floating teak-veneer vanity.',
    challenge:
      'Chronic seepage from an old 15-year-old bathroom slab and cramped wet/dry separation.',
    solution:
      'Stripped down to bare RCC, applied 3-coat elastomeric waterproofing, sloped drain channels precisely, and added frameless toughened glass partitioning.',
    siteProgressTimeline: [
      { phase: 'Week 1', status: 'Stripping & Waterproofing', note: 'Brickbat coba removal, fresh Dr. Fixit coats & 48-hour ponding test.' },
      { phase: 'Week 2', status: 'Diverter & Slab Tiling', note: 'Concealed Jaquar/Kohler diverter bodies & large-format tile lay.' },
      { phase: 'Week 3', status: 'Vanity, Glass & Niche LED', note: 'IP65 waterproof LED strip in shower niche & toughened partition.' },
    ],
    clientQuote: {
      quote: 'They pond-tested the floor for two full days before laying a single tile—zero dampness since handover.',
      author: 'Chaturvedi Family',
      context: 'Villa Renovation · Sarnath',
    },
    specs: ['48-Hr Ponding Tested', 'IP65 Waterproof Niche LED', '10mm Toughened Glass Partition'],
  },
];
