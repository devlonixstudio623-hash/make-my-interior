import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Play } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { SERVICES_CONTENT } from '../content/services';
import { PROJECTS_CONTENT } from '../content/projects';
import { REELS_CONTENT } from '../content/reels';
import { PROCESS_STAGES } from '../content/process';
import { TESTIMONIALS_CONTENT } from '../content/testimonials';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';
import { RevealSection } from '../components/RevealSection';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';
import { MagneticButton } from '../components/MagneticButton';

export function HomePage() {
  const featuredProjects = PROJECTS_CONTENT.filter((p) => p.featured).slice(0, 6);

  return (
    <>
      <SeoHead
        title="Make My Interior — Interior Design & Construction Studio in Varanasi"
        description="From Construction to Interior, We Build Your Dream Space. Luxury residential & commercial interior design, modular kitchens, false ceilings, and turnkey construction in Varanasi, UP."
        path="/"
      />

      {/* 1. Full-Screen Hero Section */}
      <section className="relative min-h-[92vh] flex items-end pt-28 pb-16 sm:pb-24 overflow-hidden">
        {/* Background Hero Media (Video with seamless Poster Image) */}
        <div className="absolute inset-0 z-0">
          <SiteImage
            src="/media/hero/hero-poster.jpg"
            alt="Luxury walnut fluted living room with recessed warm gold LED cove ceiling in Varanasi by Make My Interior"
            priority
            className="w-full h-full object-cover"
          />
          <video
            autoPlay
            muted
            loop
            playsInline
            poster="/media/hero/hero-poster.jpg"
            aria-hidden="true"
            className="absolute inset-0 w-full h-full object-cover"
          >
            <source src="/media/hero/hero.mp4" type="video/mp4" />
          </video>
          {/* Measured scrim for WCAG AA text contrast across all frames */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/70 to-[#0E0E10]/35" />
        </div>

        <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
          <div className="max-w-3xl">
            <p className="text-xs sm:text-sm uppercase tracking-[0.2em] text-[#C8A15B] mb-4">
              {SITE_CONFIG.parentBrand} · Varanasi, Uttar Pradesh
            </p>
            <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold text-[#F5F1EA] leading-[1.1] tracking-tight mb-5">
              From Construction to Interior, We Build Your Dream Space.
            </h1>
            <p className="font-hindi text-lg sm:text-xl text-[#F5F1EA]/90 mb-8 leading-relaxed">
              {SITE_CONFIG.hindiSubline}
            </p>

            <div className="flex flex-wrap items-center gap-4">
              <MagneticButton>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('hero_primary_cta')}
                  className="inline-flex items-center gap-2.5 px-6 py-3.5 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] transition-colors whitespace-nowrap"
                >
                  <span>Book Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticButton>
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#F5F1EA]/30 text-[#F5F1EA] text-sm font-medium rounded-md hover:border-[#C8A15B] hover:text-[#C8A15B] transition-colors whitespace-nowrap"
              >
                <span>View Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* 2. Editable Trust Strip */}
      <section className="bg-[#131317] border-y border-[#F5F1EA]/10 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
            {SITE_CONFIG.trustStrip.map((item) => (
              <div key={item.label} className="space-y-1">
                <p className="font-display text-2xl sm:text-3xl text-[#C8A15B] tabular-nums">
                  {item.value}
                </p>
                <p className="text-sm font-semibold text-[#F5F1EA]">{item.label}</p>
                <p className="text-xs text-[#847D72]">{item.note}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 3. Services Preview (6 Cards) */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B] mb-2">
                Our Capabilities
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
                Every Discipline Under One Accountable Roof
              </h2>
            </div>
            <Link
              to="/services"
              className="inline-flex items-center gap-2 text-sm text-[#C8A15B] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Explore All Services &amp; Vastu</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SERVICES_CONTENT.map((service) => (
              <Link
                key={service.slug}
                to={`/services/${service.slug}`}
                className="led-card-hover group bg-[#151519] border border-[#F5F1EA]/10 hover:border-[#C8A15B]/45 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#1C1C22]">
                  <SiteImage
                    src={service.heroImage}
                    alt={service.title}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center justify-between text-xs text-[#847D72] mb-2">
                      <span className="tabular-nums text-[#C8A15B] font-semibold">
                        {service.index}
                      </span>
                      <span>{service.timelineGuidance}</span>
                    </div>
                    <h3 className="font-display text-xl text-[#F5F1EA] group-hover:text-[#C8A15B] transition-colors mb-2">
                      {service.title}
                    </h3>
                    <p className="text-sm text-[#B7B0A4] leading-relaxed mb-4">
                      {service.tagline}
                    </p>
                  </div>
                  <div className="pt-4 border-t border-[#F5F1EA]/8 flex items-center justify-between text-xs text-[#F5F1EA]/80">
                    <span className="truncate pr-2">{service.startingPrice}</span>
                    <ArrowUpRight className="w-4 h-4 text-[#C8A15B] shrink-0" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="led-line" />
      </div>

      {/* 4. 6 Featured Projects */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div className="max-w-2xl">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B] mb-2">
                Selected Work in Varanasi
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
                Featured Residences &amp; Commercial Spaces
              </h2>
            </div>
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 text-sm text-[#C8A15B] hover:underline whitespace-nowrap shrink-0"
            >
              <span>View All 8 Case Studies</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredProjects.map((project) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="led-card-hover group bg-[#151519] border border-[#F5F1EA]/10 hover:border-[#C8A15B]/45 rounded-lg overflow-hidden flex flex-col"
              >
                <div className="aspect-[4/3] overflow-hidden bg-[#1C1C22]">
                  <SiteImage
                    src={project.heroImage}
                    alt={`${project.title} — ${project.location}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500 ease-out"
                  />
                </div>
                <div className="p-6 space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#B7B0A4]">
                    <span className="text-[#C8A15B]">{project.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{project.location}</span>
                    <span aria-hidden="true">·</span>
                    <span className="tabular-nums">{project.duration}</span>
                  </div>
                  <h3 className="font-display text-xl text-[#F5F1EA] group-hover:text-[#C8A15B] transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-sm text-[#B7B0A4] line-clamp-2">{project.summary}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 5. "Site to Finish" Interactive Teaser */}
      <section className="py-20 bg-[#131317] border-y border-[#F5F1EA]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
            <div className="lg:col-span-5 space-y-5">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
                Site to Finish
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
                From Bare Brick Shell to Warm LED Sanctuary
              </h2>
              <p className="text-sm sm:text-base text-[#B7B0A4] leading-relaxed">
                Slide across a real Varanasi transformation. We handle electrical chasing, gypsum ceiling framing, natural walnut fluting, and final lighting calibration with zero handoff friction.
              </p>
              <div className="led-line-left" />
              <div className="pt-2 flex flex-wrap gap-4">
                <Link
                  to="/projects/sigra-residence-living"
                  className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] text-sm font-semibold rounded-md hover:bg-[#d8b36d] transition-colors"
                >
                  <span>Inspect Full Case Study</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
                <Link
                  to="/about"
                  className="inline-flex items-center gap-2 px-5 py-3 border border-[#F5F1EA]/25 text-[#F5F1EA] text-sm font-medium rounded-md hover:border-[#C8A15B] transition-colors"
                >
                  <span>Why One Roof Works</span>
                </Link>
              </div>
            </div>
            <div className="lg:col-span-7">
              <BeforeAfterSlider
                beforeSrc="/media/before-after/living-before.jpg"
                afterSrc="/media/before-after/living-after.jpg"
                beforeLabel="Raw Brick Shell"
                afterLabel="Handover Lounge"
                altTitle="Sigra Residence Living Room Transformation"
              />
            </div>
          </div>
        </div>
      </section>

      {/* 6. Reels Strip */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <RevealSection className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B] mb-2">
                On Site &amp; In Motion
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
                Watch Our Varanasi Site Reels
              </h2>
            </div>
            <Link
              to="/reels"
              className="inline-flex items-center gap-2 text-sm text-[#C8A15B] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Open Full Reels Wall</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </RevealSection>

          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
            {REELS_CONTENT.map((reel) => (
              <Link
                key={reel.id}
                to={`/reels?play=${reel.id}`}
                className="group relative aspect-[9/16] rounded-lg overflow-hidden border border-[#F5F1EA]/10 hover:border-[#C8A15B]/60 bg-[#151519]"
              >
                <SiteImage
                  src={reel.posterImage}
                  alt={reel.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#0E0E10] via-[#0E0E10]/25 to-transparent" />
                <div className="absolute top-3 right-3 w-8 h-8 rounded-full bg-[#0E0E10]/75 border border-[#C8A15B]/60 flex items-center justify-center text-[#C8A15B]">
                  <Play className="w-3.5 h-3.5 fill-current ml-0.5" />
                </div>
                <div className="absolute bottom-3 inset-x-3 space-y-1">
                  <p className="text-[11px] text-[#C8A15B] tabular-nums">
                    {reel.category} · {reel.duration}
                  </p>
                  <p className="font-display text-sm text-[#F5F1EA] leading-snug line-clamp-2">
                    {reel.title}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* 7. Process Preview */}
      <section className="py-20 bg-[#131317] border-y border-[#F5F1EA]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B] mb-2">
                Predictable Delivery
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
                Six Clear Milestones from Visit to Handover
              </h2>
            </div>
            <Link
              to="/process"
              className="inline-flex items-center gap-2 text-sm text-[#C8A15B] hover:underline whitespace-nowrap shrink-0"
            >
              <span>See Payment &amp; Quality Checks</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {PROCESS_STAGES.map((stage) => (
              <div
                key={stage.number}
                className="p-6 rounded-lg bg-[#0E0E10] border border-[#F5F1EA]/10 space-y-3"
              >
                <div className="flex items-center justify-between text-xs">
                  <span className="font-semibold text-[#C8A15B] tabular-nums">
                    Stage {stage.number}
                  </span>
                  <span className="text-[#847D72]">{stage.duration}</span>
                </div>
                <h3 className="font-display text-xl text-[#F5F1EA]">{stage.title}</h3>
                <p className="text-sm text-[#B7B0A4] leading-relaxed">{stage.summary}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 8. Cost Estimator CTA Band */}
      <section className="py-20 sm:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative rounded-lg border border-[#C8A15B]/40 bg-gradient-to-br from-[#19191F] via-[#131317] to-[#0E0E10] p-8 sm:p-12 lg:p-14 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-8">
            <div className="max-w-2xl space-y-3">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
                Instant Budget Planning
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
                Calculate Your Varanasi Construction or Interior Range in 60 Seconds
              </h2>
              <p className="text-sm sm:text-base text-[#B7B0A4]">
                Select your area, finish tier (Standard, Premium, Luxury), and add-ons like modular kitchen or false ceiling—get an instant itemized breakdown and share directly on WhatsApp.
              </p>
            </div>
            <Link
              to="/cost-estimator"
              className="inline-flex items-center gap-2.5 px-7 py-4 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] transition-colors whitespace-nowrap shrink-0"
            >
              <span>Launch Cost Estimator</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* 9. Testimonials Strip */}
      <section className="py-20 bg-[#131317] border-t border-[#F5F1EA]/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B] mb-2">
                Homeowner Feedback
              </p>
              <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
                Built for Families Across Varanasi
              </h2>
            </div>
            <Link
              to="/testimonials"
              className="inline-flex items-center gap-2 text-sm text-[#C8A15B] hover:underline whitespace-nowrap shrink-0"
            >
              <span>Read All Stories &amp; Video Slots</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {TESTIMONIALS_CONTENT.slice(0, 2).map((item) => (
              <blockquote
                key={item.id}
                className="p-7 rounded-lg bg-[#0E0E10] border border-[#F5F1EA]/10 flex flex-col justify-between gap-6"
              >
                <p className="font-display text-lg sm:text-xl text-[#F5F1EA] leading-relaxed">
                  &ldquo;{item.quote}&rdquo;
                </p>
                <footer className="pt-4 border-t border-[#F5F1EA]/10 flex flex-wrap items-center justify-between gap-2 text-xs">
                  <div>
                    <span className="font-semibold text-[#F5F1EA] text-sm block">{item.name}</span>
                    <span className="text-[#B7B0A4]">
                      {item.projectType} · {item.location}
                    </span>
                  </div>
                  <span className="text-[#C8A15B]">{item.outcome}</span>
                </footer>
              </blockquote>
            ))}
          </div>
        </div>
      </section>

      {/* 10. Final CTA Banner */}
      <section className="py-20 sm:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center space-y-6">
          <p className="text-xs uppercase tracking-[0.22em] text-[#C8A15B]">
            Ready to Begin?
          </p>
          <h2 className="font-display text-3xl sm:text-5xl text-[#F5F1EA]">
            Let&apos;s Walk Your Site in Varanasi Together
          </h2>
          <p className="text-base text-[#B7B0A4] max-w-2xl mx-auto">
            Book a free on-site consultation with our engineer and designer. No pressure, no inflated quotes—just practical guidance for your space.
          </p>
          <div className="pt-2 flex flex-wrap items-center justify-center gap-4">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('home_final_banner')}
              className="inline-flex items-center gap-2 px-7 py-3.5 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] transition-colors"
            >
              <span>Book Free Visit on WhatsApp</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-7 py-3.5 border border-[#F5F1EA]/25 text-[#F5F1EA] text-sm font-medium rounded-md hover:border-[#C8A15B] transition-colors"
            >
              <span>Send Enquiry Form</span>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
