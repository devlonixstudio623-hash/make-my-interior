import { ArrowUpRight, Play } from 'lucide-react';
import {
  TESTIMONIALS_CONTENT,
  VIDEO_TESTIMONIAL_SLOTS,
} from '../content/testimonials';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

export function TestimonialsPage() {
  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Client Testimonials & Video Reviews | Make My Interior Varanasi"
        description="Read homeowner and commercial client reviews across Sigra, Mahmoorganj, Shivpur, and Assi Road in Varanasi."
        path="/testimonials"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Testimonials', path: '/testimonials' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
            Client Stories
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
            Trusted by Homeowners &amp; Business Owners in Varanasi
          </h1>
          <p className="text-base text-[#B7B0A4]">
            Consistent material specifications, transparent billing, and reliable handover timelines.
          </p>
        </div>

        {/* Written Testimonials Grid */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {TESTIMONIALS_CONTENT.map((item) => (
            <blockquote
              key={item.id}
              className="p-7 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 flex flex-col justify-between gap-6"
            >
              <p className="font-display text-lg sm:text-xl text-[#F5F1EA] leading-relaxed">
                &ldquo;{item.quote}&rdquo;
              </p>
              <footer className="pt-4 border-t border-[#F5F1EA]/10 space-y-1.5">
                <div className="flex flex-wrap items-center justify-between gap-2">
                  <span className="font-semibold text-[#F5F1EA]">{item.name}</span>
                  <span className="text-xs text-[#C8A15B]">{item.area}</span>
                </div>
                <p className="text-xs text-[#B7B0A4]">
                  {item.projectType} · {item.location}
                </p>
                <p className="text-xs text-[#847D72]">{item.outcome}</p>
              </footer>
            </blockquote>
          ))}
        </section>

        <div className="led-line" />

        {/* Video Testimonial Slots (TODO placeholders ready for recorded clips) */}
        <section className="space-y-8">
          <div className="space-y-2">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
              Client Video Stories
            </p>
            <h2 className="font-display text-3xl text-[#F5F1EA]">
              Walkthrough Video Testimonials
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {VIDEO_TESTIMONIAL_SLOTS.map((slot) => (
              <div
                key={slot.id}
                className="rounded-lg overflow-hidden border border-[#F5F1EA]/10 bg-[#151519] flex flex-col"
              >
                <div className="aspect-[16/10] relative bg-[#0E0E10]">
                  {slot.videoSrc ? (
                    <video
                      controls
                      playsInline
                      poster={slot.posterImage}
                      className="w-full h-full object-cover"
                    >
                      <source src={slot.videoSrc} type="video/mp4" />
                    </video>
                  ) : (
                    <>
                      <SiteImage
                        src={slot.posterImage}
                        alt={slot.projectTitle}
                        className="w-full h-full object-cover opacity-70"
                      />
                      <div className="absolute inset-0 bg-[#0E0E10]/50 flex flex-col items-center justify-center p-4 text-center">
                        <div className="w-11 h-11 rounded-full border border-[#C8A15B] bg-[#0E0E10]/80 flex items-center justify-center text-[#C8A15B] mb-2">
                          <Play className="w-4 h-4 ml-0.5" />
                        </div>
                        <span className="text-[11px] text-[#B7B0A4]">{slot.todoNote}</span>
                      </div>
                    </>
                  )}
                </div>
                <div className="p-5 space-y-1">
                  <p className="text-xs text-[#C8A15B]">{slot.location}</p>
                  <h3 className="font-display text-lg text-[#F5F1EA]">{slot.projectTitle}</h3>
                  <p className="text-xs text-[#847D72]">{slot.clientName}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <div className="p-8 rounded-lg border border-[#C8A15B]/35 bg-[#151519] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl text-[#F5F1EA]">
              Want to Visit One of Our Active Sites in Varanasi?
            </h2>
            <p className="text-sm text-[#B7B0A4] mt-1">
              Inspect our carpentry, waterproofing, and false ceiling quality firsthand before committing.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl('Namaste, I would like to visit an active site in Varanasi to inspect workmanship.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('testimonials_site_visit')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md whitespace-nowrap"
          >
            <span>Request Site Walkthrough</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
