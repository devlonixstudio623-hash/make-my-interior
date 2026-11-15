import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ArrowUpRight, Instagram, Play, Volume2, X } from 'lucide-react';
import { REELS_CONTENT, type ReelCategory, type ReelItem } from '../content/reels';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

const REEL_FILTERS: (ReelCategory | 'All')[] = [
  'All',
  'Site Work',
  'Finished Rooms',
  'Design Concepts',
];

export function ReelsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [category, setCategory] = useState<ReelCategory | 'All'>('All');
  const [activeReel, setActiveReel] = useState<ReelItem | null>(() => {
    const playId = searchParams.get('play');
    return playId ? REELS_CONTENT.find((r) => r.id === playId) || null : null;
  });

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setActiveReel(null);
        searchParams.delete('play');
        setSearchParams(searchParams);
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [searchParams, setSearchParams]);

  const filtered =
    category === 'All'
      ? REELS_CONTENT
      : REELS_CONTENT.filter((r) => r.category === category);

  const openModal = (reel: ReelItem) => {
    setActiveReel(reel);
    setSearchParams({ play: reel.id });
  };

  const closeModal = () => {
    setActiveReel(null);
    searchParams.delete('play');
    setSearchParams(searchParams);
  };

  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Site Reels & Walkthroughs | Make My Interior Varanasi"
        description="Watch Varanasi site progress reels, finished room reveals, modular kitchen hardware tests, and Vastu design concepts."
        path="/reels"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Reels', path: '/reels' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
              Vertical Site Wall
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
              From Raw Concrete to Warm Reveal
            </h1>
            <p className="text-sm sm:text-base text-[#B7B0A4]">
              Tap any reel to open the modal walkthrough player. Follow our Varanasi site progress daily on Instagram.
            </p>
          </div>

          <a
            href={SITE_CONFIG.instagramUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-3 border border-[#C8A15B]/50 text-[#C8A15B] text-sm font-semibold rounded-md hover:bg-[#C8A15B] hover:text-[#0E0E10] transition-colors whitespace-nowrap shrink-0"
          >
            <Instagram className="w-4 h-4" />
            <span>Follow {SITE_CONFIG.instagramHandle}</span>
          </a>
        </div>

        {/* Category Filters */}
        <div className="flex flex-wrap items-center gap-2 pb-4 border-b border-[#F5F1EA]/10">
          {REEL_FILTERS.map((item) => (
            <button
              key={item}
              type="button"
              onClick={() => setCategory(item)}
              className={`px-4 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                category === item
                  ? 'bg-[#C8A15B] text-[#0E0E10]'
                  : 'bg-[#151519] text-[#B7B0A4] border border-[#F5F1EA]/10 hover:text-[#F5F1EA]'
              }`}
            >
              {item}
            </button>
          ))}
        </div>

        {/* Vertical 9:16 Reels Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filtered.map((reel) => (
            <button
              key={reel.id}
              type="button"
              onClick={() => openModal(reel)}
              className="group text-left relative aspect-[9/16] rounded-lg overflow-hidden border border-[#F5F1EA]/12 hover:border-[#C8A15B]/60 bg-[#151519] transition-colors"
            >
              <SiteImage
                src={reel.posterImage}
                alt={reel.title}
                className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
              />
              {reel.videoSrc && (
                <video
                  autoPlay
                  muted
                  loop
                  playsInline
                  poster={reel.posterImage}
                  className="absolute inset-0 w-full h-full object-cover"
                >
                  <source src={reel.videoSrc} type="video/mp4" />
                </video>
              )}
              <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/30 to-transparent" />

              <div className="absolute top-4 right-4 w-10 h-10 rounded-full bg-[#0E0E10]/80 border border-[#C8A15B]/65 flex items-center justify-center text-[#C8A15B]">
                <Play className="w-4 h-4 fill-current ml-0.5" />
              </div>

              <div className="absolute bottom-4 inset-x-4 space-y-1.5">
                <p className="text-xs text-[#C8A15B] tabular-nums">
                  {reel.category} · {reel.location} · {reel.duration}
                </p>
                <h2 className="font-display text-xl text-[#F5F1EA] leading-snug">
                  {reel.title}
                </h2>
                <p className="font-hindi text-xs text-[#F5F1EA]/80">{reel.hindiCaption}</p>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Modal Vertical Player */}
      {activeReel && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={activeReel.title}
          className="fixed inset-0 z-[80] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
        >
          <div className="relative w-full max-w-2xl bg-[#151519] border border-[#C8A15B]/40 rounded-lg overflow-hidden grid grid-cols-1 md:grid-cols-12">
            <button
              type="button"
              onClick={closeModal}
              aria-label="Close reel player"
              className="absolute top-3 right-3 z-10 w-10 h-10 rounded-full bg-[#0E0E10]/85 border border-[#F5F1EA]/20 text-[#F5F1EA] flex items-center justify-center hover:border-[#C8A15B]"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="md:col-span-6 aspect-[9/16] max-h-[70vh] md:max-h-[82vh] bg-[#0E0E10] relative">
              {activeReel.videoSrc ? (
                <video
                  controls
                  autoPlay
                  playsInline
                  poster={activeReel.posterImage}
                  className="w-full h-full object-cover"
                >
                  <source src={activeReel.videoSrc} type="video/mp4" />
                </video>
              ) : (
                <>
                  <SiteImage
                    src={activeReel.posterImage}
                    alt={activeReel.title}
                    className="w-full h-full object-cover opacity-80"
                  />
                  <div className="absolute inset-0 bg-[#0E0E10]/45 flex flex-col items-center justify-center p-5 text-center">
                    <Volume2 className="w-8 h-8 text-[#C8A15B] mb-2" />
                    <p className="font-display text-lg text-[#F5F1EA]">
                      Reel Video Slot Ready
                    </p>
                    <p className="text-xs text-[#B7B0A4] mt-1">
                      Place compressed vertical .mp4 under /public/media/reels/ and link in content/reels.ts.
                    </p>
                  </div>
                </>
              )}
            </div>

            <div className="md:col-span-6 p-6 flex flex-col justify-between space-y-6">
              <div className="space-y-3 pr-8">
                <p className="text-xs uppercase tracking-[0.16em] text-[#C8A15B]">
                  {activeReel.category} · {activeReel.location}
                </p>
                <h2 className="font-display text-2xl text-[#F5F1EA]">{activeReel.title}</h2>
                <p className="font-hindi text-sm text-[#B7B0A4]">{activeReel.hindiCaption}</p>
                <div className="led-line-left my-3" />
                <ul className="space-y-2 text-sm text-[#F5F1EA]/85">
                  {activeReel.highlights.map((h) => (
                    <li key={h}>· {h}</li>
                  ))}
                </ul>
              </div>

              <a
                href={buildWhatsAppUrl(
                  `Namaste, I saw your reel "${activeReel.title}" (${activeReel.location}) and want to discuss a similar project.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`reel_modal_${activeReel.id}`)}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#C8A15B] text-[#0E0E10] text-sm font-semibold rounded-md hover:bg-[#d8b36d] transition-colors"
              >
                <span>Discuss Similar Space on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
