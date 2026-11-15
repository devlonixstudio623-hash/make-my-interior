export const PARENT_BRAND_NAME = 'A Unit of [Confirm Parent Brand] Construction'; // TODO: Confirm exact parent construction firm spelling with client

export const SITE_CONFIG = {
  brandName: 'Make My Interior',
  parentBrand: PARENT_BRAND_NAME,
  tagline: 'From Construction to Interior, We Build Your Dream Space.',
  hindiSubline: 'Construction se Interior tak, sab kuch ek hi chhat ke neeche.',
  city: 'Varanasi',
  state: 'Uttar Pradesh',
  serviceArea: 'Varanasi, Mughalsarai, Chandauli, Bhadohi, Jaunpur, Mirzapur & Prayagraj',
  phoneRaw: '7905824051',
  phoneDisplay: '+91 79058 24051',
  whatsappNumber: '917905824051',
  email: 'hello@makemyinterior.in', // TODO: Confirm official studio email
  instagramHandle: '@makemyinterior.vns', // TODO: Confirm exact Instagram handle
  instagramUrl: 'https://www.instagram.com/makemyinterior.vns/', // TODO: Confirm exact Instagram URL
  address: {
    line1: 'Studio Address — TODO: Add Plot / Building No., Sigra / Mahmoorganj',
    line2: 'Varanasi, Uttar Pradesh 221010',
    hours: 'Mon – Sat · 10:00 AM – 7:30 PM (Sunday by appointment)',
    googleMapsEmbedUrl:
      'https://www.google.com/maps?q=Varanasi,Uttar+Pradesh&output=embed', // TODO: Replace with exact studio Google Maps pin embed URL
  },
  // Editable Trust Strip items (replace TODO values with verified figures from client)
  trustStrip: [
    {
      label: 'Single-Point Accountability',
      value: '1 Roof',
      note: 'Civil construction to final interior handover', // TODO: Replace with verified years of legacy if desired
    },
    {
      label: 'Completed & Active Sites',
      value: 'TODO',
      note: 'Update with verified project count in Varanasi', // TODO: Confirm total completed sites with client
    },
    {
      label: 'Pricing Transparency',
      value: '100% BOQ',
      note: 'Itemized material brands & milestone billing',
    },
    {
      label: 'Service Coverage',
      value: 'Varanasi + UP',
      note: 'Dedicated site supervisors across Purvanchal',
    },
  ],
  defaultWhatsAppMessage:
    'Namaste Make My Interior team, I would like to book a Free Consultation for my space in Varanasi.',
} as const;

export function buildWhatsAppUrl(message?: string): string {
  const text = encodeURIComponent(message || SITE_CONFIG.defaultWhatsAppMessage);
  return `https://wa.me/${SITE_CONFIG.whatsappNumber}?text=${text}`;
}
