export type ServiceCategory = 'interior' | 'construction' | 'both';
export type FinishTier = 'standard' | 'premium' | 'luxury';
export type AddonKey = 'modularKitchen' | 'wardrobes' | 'falseCeiling' | 'vastu';

export interface RateBand {
  label: string;
  minPerSqFt: number;
  maxPerSqFt: number;
  summary: string;
}

export interface AddonPricing {
  key: AddonKey;
  label: string;
  description: string;
  minCost: number;
  maxCost: number;
  isPercentage?: boolean;
}

export const PRICING_CONFIG = {
  currency: 'INR',
  // Base per sq. ft. rate ranges in Varanasi (INR) — TODO: Confirm exact rates with client
  baseRates: {
    interior: {
      standard: {
        label: 'Essential Standard',
        minPerSqFt: 1150,
        maxPerSqFt: 1400,
        summary: 'Commercial ply, HDHMR shutters, laminate finishes, standard electrical & painting.',
      },
      premium: {
        label: 'Signature Premium',
        minPerSqFt: 1450,
        maxPerSqFt: 1850,
        summary: 'BWP marine ply, acrylic/PU finishes, Hettich/Ebco soft-close hardware, cove LED lighting.',
      },
      luxury: {
        label: 'Bespoke Luxury',
        minPerSqFt: 1950,
        maxPerSqFt: 2600,
        summary: 'Natural veneer, fluted timber, Italian stone surfaces, Hafele/Blum hardware, automation-ready.',
      },
    },
    construction: {
      standard: {
        label: 'Essential Standard',
        minPerSqFt: 1650,
        maxPerSqFt: 1850,
        summary: 'RCC framed structure, Grade-A TMT steel, standard vitrified tiles, CPVC plumbing.',
      },
      premium: {
        label: 'Signature Premium',
        minPerSqFt: 1900,
        maxPerSqFt: 2250,
        summary: 'Earthquake-resistant structural design, premium AAC/brick masonry, UPVC windows, branded sanitaryware.',
      },
      luxury: {
        label: 'Bespoke Luxury',
        minPerSqFt: 2350,
        maxPerSqFt: 2900,
        summary: 'Architectural elevation cladding, waterproofing warranty, Italian-grade flooring, acoustic glazing.',
      },
    },
    both: {
      standard: {
        label: 'Essential Standard',
        minPerSqFt: 2700,
        maxPerSqFt: 3150,
        summary: 'Complete civil structure + functional turnkey interiors under one coordinated team.',
      },
      premium: {
        label: 'Signature Premium',
        minPerSqFt: 3250,
        maxPerSqFt: 3950,
        summary: 'Turnkey grey-to-glow villa execution with 3D visualization, modular carpentry, and LED lighting.',
      },
      luxury: {
        label: 'Bespoke Luxury',
        minPerSqFt: 4150,
        maxPerSqFt: 5300,
        summary: 'Bespoke residence build with architectural elevation, imported stone finishes, and custom joinery.',
      },
    },
  } satisfies Record<ServiceCategory, Record<FinishTier, RateBand>>,

  bhkPresets: [
    { id: '2bhk', label: '2 BHK', sqFt: 950 },
    { id: '3bhk', label: '3 BHK', sqFt: 1450 },
    { id: '4bhk', label: '4 BHK / Duplex', sqFt: 2200 },
    { id: 'villa', label: 'Independent Villa', sqFt: 3200 },
  ],

  addons: [
    {
      key: 'modularKitchen',
      label: 'Modular Kitchen (L / U / Island)',
      description: 'BWP carcass, soft-close tandem drawers, quartz counter & chimney routing.',
      minCost: 145000,
      maxCost: 280000,
    },
    {
      key: 'wardrobes',
      label: 'Full-Height Wardrobes (2–3 Units)',
      description: 'Floor-to-ceiling loft wardrobes with internal organizers & profile handles.',
      minCost: 160000,
      maxCost: 310000,
    },
    {
      key: 'falseCeiling',
      label: 'Designer False Ceiling & LED Cove Lighting',
      description: 'Saint-Gobain gypsum boards, warm strip profiles & magnetic track provisions.',
      minCost: 85000,
      maxCost: 175000,
    },
    {
      key: 'vastu',
      label: 'Vastu Layout Alignment & Pooja Unit',
      description: 'Direction-aligned room zoning, kitchen/bedroom placement & backlit mandir unit.',
      minCost: 45000,
      maxCost: 95000,
    },
  ] satisfies AddonPricing[],

  paymentStages: [
    { stage: '01. Booking & 2D/3D Concept Lock', percentage: 10 },
    { stage: '02. Material Mobilization & Structure Start', percentage: 30 },
    { stage: '03. MEP, False Ceiling & Carcass Execution', percentage: 30 },
    { stage: '04. Finishes, Laminate/Veneer & Hardware', percentage: 20 },
    { stage: '05. Snag Clearance & Key Handover', percentage: 10 },
  ],
} as const;
