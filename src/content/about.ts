import { SITE_CONFIG } from '../config/site';

export const ABOUT_CONTENT = {
  founder: {
    name: 'TODO: Founder / Principal Name', // TODO: Confirm exact founder name & designation with client
    role: 'Founder & Principal Design-Builder',
    photo: '/media/team/founder.jpg',
    quote:
      'A home shouldn’t suffer from a war between your civil contractor and your interior designer. When one studio owns both the foundation and the final LED cove, quality stays honest and deadlines hold.',
    story: [
      `Born out of ${SITE_CONFIG.parentBrand.replace('A Unit of ', '')}, Make My Interior was created to solve the single biggest frustration homeowners face in Varanasi: fragmented execution.`,
      'Clients used to hire one engineer for structural plans, a separate local contractor for brickwork, a carpenter for wardrobes, and an electrician who guessed ceiling light points. Miscommunication meant broken walls, delayed moves, and ballooning budgets.',
      'We brought civil construction, Vastu-aligned architecture, 3D visualization, modular fabrication, and architectural lighting into one disciplined Varanasi studio—delivering premium craftsmanship at honest, itemized BOQ pricing.',
    ],
  },
  oneRoofExplainer: {
    title: 'Construction + Interior Under One Roof',
    hindiLine: 'Neev se roshni tak — ek hi team, ek hi zimmedari.',
    points: [
      {
        title: '01. Zero Rework & Wall Chiseling',
        detail: 'Concealed AC drains, 24V LED driver recesses, and kitchen plumbing points are engineered directly into the RCC & brickwork stage.',
      },
      {
        title: '02. Single Accountable Timeline',
        detail: 'No blaming the mason for uneven walls or the plumber for delayed tiling—one project lead tracks your schedule from Day 1.',
      },
      {
        title: '03. Unified Material & Budget Clarity',
        detail: 'One consolidated BOQ means civil structural savings flow smartly into the interior finishes you touch every day.',
      },
    ],
  },
  values: [
    {
      title: 'Honest, Itemized Pricing',
      description: 'Every plywood grade, steel brand, and lighting fixture is written in plain language—zero vague lump sums.',
    },
    {
      title: 'Site Discipline in Purvanchal',
      description: 'Daily photo updates for NRI and outstation Varanasi families, clean site housekeeping, and scheduled engineer visits.',
    },
    {
      title: 'Craft That Ages Gracefully',
      description: 'Waterproof BWP zones, pond-tested bathrooms, and 2mm edge-banding built for decades of Indian family living.',
    },
  ],
  // TODO: Replace team slots with real studio team photos and names
  team: [
    {
      name: 'TODO: Principal Architect / Lead',
      role: 'Architecture & Vastu Planning',
      photo: '/media/team/founder.jpg',
      bio: 'Spatial layout, structural coordination & 3D exterior elevations.',
    },
    {
      name: 'TODO: Senior Interior Designer',
      role: '3D Visualization & Material Curation',
      photo: '/media/projects/living-room.jpg',
      bio: 'Custom joinery detailing, veneer & lighting moodboards.',
    },
    {
      name: 'TODO: Site Execution Head',
      role: 'Civil & MEP Supervision',
      photo: '/media/projects/construction-site.jpg',
      bio: 'Quality audits, daily site tracking & timely handover.',
    },
  ],
  // TODO: Confirm exact milestone years and numbers with client
  milestones: [
    { year: 'TODO: Year 1', title: 'Parent Construction Foundation', detail: 'Established civil contracting & structural execution in Varanasi.' },
    { year: 'TODO: Year 2', title: 'Launch of Make My Interior', detail: 'Expanded into turnkey residential interiors, modular kitchens & 3D visualization.' },
    { year: 'TODO: Year 3', title: 'Dedicated Modular & Lighting Team', detail: 'In-house carpentry, false ceiling, and architectural LED profile specialists.' },
    { year: '2026', title: 'Purvanchal Turnkey Studio', detail: 'Serving residential villas, apartments & commercial spaces across Varanasi and nearby UP.' },
  ],
  siteCultureGallery: [
    { src: '/media/projects/construction-site.jpg', caption: 'Structural RCC & brickwork inspection on site in Varanasi' },
    { src: '/media/before-after/living-before.jpg', caption: 'Laser-aligned conduit chasing before plaster finishing' },
    { src: '/media/projects/modular-kitchen.jpg', caption: 'Precision hardware calibration & stone counter jointing' },
  ],
};
