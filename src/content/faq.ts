export type FAQCategory = 'budget' | 'timeline' | 'materials' | 'payment' | 'vastu' | 'warranty';

export interface FAQItem {
  id: string;
  category: FAQCategory;
  categoryLabel: string;
  question: string;
  answer: string;
}

export const FAQ_CATEGORIES: { key: FAQCategory | 'all'; label: string }[] = [
  { key: 'all', label: 'All Questions' },
  { key: 'budget', label: 'Budget & Pricing' },
  { key: 'timeline', label: 'Timeline' },
  { key: 'materials', label: 'Materials & Quality' },
  { key: 'payment', label: 'Payment Transparency' },
  { key: 'vastu', label: 'Vastu & Planning' },
  { key: 'warranty', label: 'Warranty & Support' },
];

export const FAQ_ITEMS: FAQItem[] = [
  {
    id: 'faq-budget-1',
    category: 'budget',
    categoryLabel: 'Budget & Pricing',
    question: 'Do you charge for the first site visit and consultation in Varanasi?',
    answer:
      'No. Your initial consultation, site visit within Varanasi city limits, laser measurement, and preliminary budget guidance are completely free with zero obligation.',
  },
  {
    id: 'faq-budget-2',
    category: 'budget',
    categoryLabel: 'Budget & Pricing',
    question: 'How do you keep pricing honest without compromising material quality?',
    answer:
      'We provide a line-by-line Bill of Quantities (BOQ) listing exact plywood grades, laminate codes, hardware series, and lighting specs before work begins. You pay for verified specifications—never inflated middleman markups or surprise mid-site extras.',
  },
  {
    id: 'faq-budget-3',
    category: 'budget',
    categoryLabel: 'Budget & Pricing',
    question: 'What is the minimum project budget you take on?',
    answer:
      'We take up modular kitchens starting around ₹1.5 L, full 2BHK/3BHK interiors, commercial fit-outs, and complete civil construction projects across Varanasi and neighboring districts.',
  },
  {
    id: 'faq-timeline-1',
    category: 'timeline',
    categoryLabel: 'Timeline',
    question: 'How long does a full 3 BHK interior take from design sign-off to handover?',
    answer:
      'Design & 3D visualization typically takes 2–3 weeks, followed by 45–65 days of on-site execution depending on civil alterations, stone work, and veneer polishing.',
  },
  {
    id: 'faq-timeline-2',
    category: 'timeline',
    categoryLabel: 'Timeline',
    question: 'How is construction + interior faster under one roof?',
    answer:
      'Because our civil engineers and interior designers work from the same drawing set, electrical conduits, AC copper piping, sunken bathroom levels, and curtain pockets are built correctly during brickwork—eliminating weeks of chiseling and rework later.',
  },
  {
    id: 'faq-materials-1',
    category: 'materials',
    categoryLabel: 'Materials & Quality',
    question: 'Which plywood, hardware, and paint brands do you use?',
    answer:
      'We specify Century / Greenply BWP & MR grades, Action Tesa HDHMR, Hettich / Hafele / Blum soft-close hardware, Saint-Gobain Gyproc ceilings, Polycab/Havells FRLS wiring, and Asian Paints / Dulux finishes—all inspectable on site before installation.',
  },
  {
    id: 'faq-materials-2',
    category: 'materials',
    categoryLabel: 'Materials & Quality',
    question: 'Can we inspect raw materials when they arrive at our site?',
    answer:
      'Yes, 100%. Every plywood sheet, laminate roll, TMT steel bar, and cement batch arrives with original manufacturer stamps, and our supervisor invites you for physical inspection at each delivery milestone.',
  },
  {
    id: 'faq-payment-1',
    category: 'payment',
    categoryLabel: 'Payment Transparency',
    question: 'What is your payment schedule?',
    answer:
      'Payments are strictly milestone-linked: 10% at booking & concept design, 30% on material mobilization, 30% after carcass/MEP/ceiling completion, 20% at finishes & hardware installation, and the final 10% only after snag clearance and handover.',
  },
  {
    id: 'faq-vastu-1',
    category: 'vastu',
    categoryLabel: 'Vastu & Planning',
    question: 'Can you align our house plan and interiors according to Vastu Shastra?',
    answer:
      'Yes. We incorporate practical Vastu zoning for the main entrance, kitchen stove direction, master bedroom headboard, and North-East Pooja mandir during both new construction planning and apartment interior layouts.',
  },
  {
    id: 'faq-warranty-1',
    category: 'warranty',
    categoryLabel: 'Warranty & Support',
    question: 'What post-handover warranty and support do you offer?',
    answer:
      'We provide a 1-year studio workmanship support warranty covering hinge alignment, drawer channels, and finish snag resolution, alongside direct manufacturer warranties (up to 10 years on branded BWP ply and hardware).',
  },
];
