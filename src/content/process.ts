export interface ProcessStage {
  number: string;
  title: string;
  hindiTag: string;
  duration: string;
  summary: string;
  deliverables: string[];
}

export const PROCESS_STAGES: ProcessStage[] = [
  {
    number: '01',
    title: 'Free Consultation & Requirement Brief',
    hindiTag: 'Aapki zaroorat aur budget ki khuli baat.',
    duration: 'Day 1',
    summary:
      'Connect via WhatsApp or visit our Varanasi studio. We understand your family lifestyle, Vastu preferences, plot/flat status, and realistic target budget.',
    deliverables: ['Scope alignment (Construction / Interior / Turnkey)', 'Preliminary rate guidance', 'Vastu orientation check'],
  },
  {
    number: '02',
    title: 'Site Visit & Laser Measurement',
    hindiTag: 'Har deewar aur beam ki exact naap.',
    duration: 'Day 2 – 4',
    summary:
      'Our engineer and designer inspect your site in Varanasi or nearby UP, capturing exact structural beam drops, plumbing shafts, sunlight angles, and dampness checks.',
    deliverables: ['As-built floor dimensions', 'Structural & seepage inspection', 'Site feasibility notes'],
  },
  {
    number: '03',
    title: '2D Planning & 3D Visualization',
    hindiTag: 'Kaam shuru hone se pehle apna ghar 3D mein dekhein.',
    duration: 'Week 1 – 3',
    summary:
      'We lock furniture circulation, Vastu alignment, and electrical routing on 2D drawings before crafting photorealistic 3D views with real-world lighting and finishes.',
    deliverables: ['Vastu-aligned 2D layout', 'Photorealistic 3D renders per room', 'Reflected ceiling & LED plan'],
  },
  {
    number: '04',
    title: 'Material & Budget Finalization (BOQ)',
    hindiTag: 'Har material aur brand pehle se tay, koi hidden cost nahi.',
    duration: 'Week 3 – 4',
    summary:
      'Touch and approve real laminate swatches, veneers, quartz samples, and hardware channels. We sign a transparent, itemized Bill of Quantities and milestone schedule.',
    deliverables: ['Signed itemized BOQ', 'Physical sample board approval', 'Locked handover calendar'],
  },
  {
    number: '05',
    title: 'Supervised Site Execution',
    hindiTag: 'Rozana site monitoring aur weekly photo updates.',
    duration: '45 – 90 Days (Interior) · 6 – 12 Mo (Civil)',
    summary:
      'From RCC/brickwork and concealed MEP chasing to false ceilings, modular cabinetry, and final painting—our site supervisor enforces plumb, level, and finish standards.',
    deliverables: ['Raw material arrival verification', '48-hr bathroom ponding test', 'Weekly WhatsApp site progress log'],
  },
  {
    number: '06',
    title: 'Quality Snag Check, Handover & Support',
    hindiTag: 'Chabi ke saath bharosa aur 1-year workmanship support.',
    duration: 'Final Week',
    summary:
      'Before collecting the final 10%, our lead walks every room with a 40-point snag checklist—testing every soft-close hinge, LED driver, and plumbing joint.',
    deliverables: ['Deep post-execution cleaning', 'As-built electrical/plumbing map', '1-Year studio workmanship warranty'],
  },
];

export const QUALITY_CHECKS = [
  {
    title: 'Raw Material Stamp Verification',
    detail: 'All plywood, cement, and TMT steel lots carry verifiable manufacturer grades before unloading.',
  },
  {
    title: '48-Hour Waterproofing Ponding Test',
    detail: 'Every sunken bathroom and terrace slab is water-filled and inspected from below before tiling.',
  },
  {
    title: 'Laser Plumb & 24V LED Driver Access',
    detail: 'Wardrobe shutters align within 1mm tolerances and every LED strip driver remains serviceable.',
  },
];
