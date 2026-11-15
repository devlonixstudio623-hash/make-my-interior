export type ReelCategory = 'Site Work' | 'Finished Rooms' | 'Design Concepts';

export interface ReelItem {
  id: string;
  title: string;
  hindiCaption: string;
  category: ReelCategory;
  location: string;
  duration: string;
  posterImage: string;
  videoSrc?: string; // TODO: Add compressed vertical .mp4 (<3MB) in /public/media/reels/
  highlights: string[];
}

export const REELS_CONTENT: ReelItem[] = [
  {
    id: 'reel-cove-living',
    title: 'Bare Brick to Cove-Lit Lounge in 52 Days',
    hindiCaption: 'Sigra 3BHK ka poora makeover — sirf 52 din mein.',
    category: 'Finished Rooms',
    location: 'Sigra, Varanasi',
    duration: '0:38',
    posterImage: '/media/reels/reel-bedroom.jpg',
    highlights: ['Step-by-step ceiling cove', 'Natural walnut flutes', 'Final evening reveal'],
  },
  {
    id: 'reel-kitchen-hardware',
    title: 'Inside an Oil-Proof Varanasi Modular Kitchen',
    hindiCaption: 'BWP Marine Ply + Hettich soft-close hardware test.',
    category: 'Finished Rooms',
    location: 'Shivpur, Varanasi',
    duration: '0:42',
    posterImage: '/media/reels/reel-kitchen.jpg',
    highlights: ['Calacatta quartz island', 'Corner magic unit', 'Under-cabinet sensor LED'],
  },
  {
    id: 'reel-rcc-slab',
    title: 'Slab Casting Day & Steel Inspection Checklist',
    hindiCaption: 'Slab casting se pehle hamare engineer kya check karte hain?',
    category: 'Site Work',
    location: 'Mahmoorganj, Varanasi',
    duration: '0:45',
    posterImage: '/media/reels/reel-site.jpg',
    highlights: ['Fe-550D rebar spacing', 'Cover block checks', 'Electrical conduit sleeves'],
  },
  {
    id: 'reel-pooja-onyx',
    title: 'Backlit Honey Onyx Pooja Mandir Detail',
    hindiCaption: 'Ghar ke pravesh par shanti aur roshni ka sangam.',
    category: 'Design Concepts',
    location: 'Lanka, Varanasi',
    duration: '0:31',
    posterImage: '/media/reels/reel-pooja.jpg',
    highlights: ['Diffused LED lightbox', 'Teak jaali carving', 'North-East Vastu corner'],
  },
  {
    id: 'reel-cafe-ceiling',
    title: 'Timber Baffle & Strip LED Bistro Reveal',
    hindiCaption: 'Assi Road par ek naya boutique cafe — concept se opening tak.',
    category: 'Site Work',
    location: 'Assi Ghat, Varanasi',
    duration: '0:49',
    posterImage: '/media/reels/reel-commercial.jpg',
    highlights: ['Acoustic wool layer', '2700K linear profiles', 'Opening night walkthrough'],
  },
];
