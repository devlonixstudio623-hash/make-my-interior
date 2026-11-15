export interface TestimonialItem {
  id: string;
  name: string;
  location: string;
  projectType: string;
  area: string;
  quote: string;
  outcome: string;
}

export interface VideoTestimonialSlot {
  id: string;
  clientName: string;
  location: string;
  projectTitle: string;
  posterImage: string;
  videoSrc?: string; // TODO: Add client video testimonial .mp4 under /public/media/reels/
  todoNote: string;
}

export const TESTIMONIALS_CONTENT: TestimonialItem[] = [
  {
    id: 't-srivastava',
    name: 'Rajesh & Neeta Srivastava',
    location: 'Sigra, Varanasi',
    projectType: '3 BHK Full Interior',
    area: '1,550 sq. ft.',
    quote:
      'What stood out was their billing honesty. Every plywood sheet, laminate code, and LED driver was shown to us on site before installation, and there were zero surprise extras at handover.',
    outcome: 'Delivered in 52 days · Matched 3D renders down to the wood grain',
  },
  {
    id: 't-gupta',
    name: 'Anurag Gupta',
    location: 'Mahmoorganj, Varanasi',
    projectType: 'G+2 Turnkey Construction + Interior',
    area: '2,850 sq. ft.',
    quote:
      'Usually in Varanasi, civil contractors blame carpenters and carpenters blame electricians. Having Make My Interior handle both construction and interior under one roof saved our peace of mind.',
    outcome: 'Zero contractor handoff delays · Completed on committed schedule',
  },
  {
    id: 't-tiwari',
    name: 'Anjali Tiwari',
    location: 'Shivpur, Varanasi',
    projectType: 'Modular Kitchen & Wardrobes',
    area: '1,200 sq. ft. Residence',
    quote:
      'I found them through an Instagram reel and called for a visit. Their designer actually listened to how our family cooks every morning instead of pushing a template catalog.',
    outcome: 'Waterproof BWP sink zone · Zero post-handover alignment issues',
  },
  {
    id: 't-singh',
    name: 'Vikramaditya Singh',
    location: 'Assi Road, Varanasi',
    projectType: 'Commercial Cafe Interior',
    area: '1,350 sq. ft.',
    quote:
      'Our timber-baffle ceiling with recessed LED strips became the signature look of our restaurant. They worked overnight shifts during the final week so we could launch on our auspicious date.',
    outcome: '48-day commercial turnaround · Acoustic + warm lighting design',
  },
];

// Video-testimonial slots (replace with recorded client clips before production launch)
export const VIDEO_TESTIMONIAL_SLOTS: VideoTestimonialSlot[] = [
  {
    id: 'vt-1',
    clientName: 'Srivastava Family (Slot 01)',
    location: 'Sigra, Varanasi',
    projectTitle: '3 BHK Cove Living & Modular Kitchen Walkthrough',
    posterImage: '/media/projects/living-room.jpg',
    todoNote: 'TODO: Drop compressed .mp4 client walkthrough clip in /public/media/reels/',
  },
  {
    id: 'vt-2',
    clientName: 'Gupta Residence (Slot 02)',
    location: 'Mahmoorganj, Varanasi',
    projectTitle: 'Plot to Finished Villa Client Story',
    posterImage: '/media/projects/construction-site.jpg',
    todoNote: 'TODO: Drop compressed .mp4 site-to-finish owner interview',
  },
  {
    id: 'vt-3',
    clientName: 'Kashi Courtyard Bistro (Slot 03)',
    location: 'Assi Ghat, Varanasi',
    projectTitle: 'Commercial Hospitality Delivery Review',
    posterImage: '/media/projects/commercial-cafe.jpg',
    todoNote: 'TODO: Drop compressed .mp4 commercial owner testimonial',
  },
];
