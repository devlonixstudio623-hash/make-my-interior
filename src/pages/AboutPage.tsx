import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { ABOUT_CONTENT } from '../content/about';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

export function AboutPage() {
  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="About Make My Interior | Varanasi Design-Build & Construction Studio"
        description="Meet the founder and studio behind Make My Interior in Varanasi. Construction and interior design delivered under one roof."
        path="/about"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'About', path: '/about' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        {/* Intro & Founder Story */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-5">
            <div className="aspect-[3/4] rounded-lg overflow-hidden border border-[#C8A15B]/30 bg-[#151519]">
              <SiteImage
                src={ABOUT_CONTENT.founder.photo}
                alt="Founder of Make My Interior in Varanasi studio"
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
          <div className="lg:col-span-7 space-y-6">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
              {SITE_CONFIG.parentBrand}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl text-[#F5F1EA] leading-tight">
              Built to End the Gap Between Civil Construction and Interior Craft
            </h1>
            <p className="font-display italic text-xl text-[#C8A15B]">
              &ldquo;{ABOUT_CONTENT.founder.quote}&rdquo;
            </p>
            <div className="space-y-4 text-sm sm:text-base text-[#B7B0A4] leading-relaxed">
              {ABOUT_CONTENT.founder.story.map((para, idx) => (
                <p key={idx}>{para}</p>
              ))}
            </div>
            <div className="pt-2 border-t border-[#F5F1EA]/10">
              <p className="font-semibold text-[#F5F1EA]">{ABOUT_CONTENT.founder.name}</p>
              <p className="text-xs text-[#847D72]">{ABOUT_CONTENT.founder.role}</p>
            </div>
          </div>
        </section>

        <div className="led-line" />

        {/* Construction + Interior Under One Roof Explainer */}
        <section className="space-y-10">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
              Studio Advantage
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
              {ABOUT_CONTENT.oneRoofExplainer.title}
            </h2>
            <p className="font-hindi text-base text-[#F5F1EA]/85">
              {ABOUT_CONTENT.oneRoofExplainer.hindiLine}
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_CONTENT.oneRoofExplainer.points.map((pt) => (
              <div
                key={pt.title}
                className="p-6 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-3"
              >
                <h3 className="font-display text-xl text-[#C8A15B]">{pt.title}</h3>
                <p className="text-sm text-[#B7B0A4] leading-relaxed">{pt.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Values */}
        <section className="space-y-8">
          <h2 className="font-display text-3xl text-[#F5F1EA]">Studio Philosophy &amp; Values</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_CONTENT.values.map((val) => (
              <div key={val.title} className="p-6 rounded-lg border border-[#F5F1EA]/10 bg-[#131317] space-y-2">
                <h3 className="font-display text-xl text-[#F5F1EA]">{val.title}</h3>
                <p className="text-sm text-[#B7B0A4] leading-relaxed">{val.description}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Team Section */}
        <section className="space-y-8">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B] mb-2">
              Studio Team
            </p>
            <h2 className="font-display text-3xl text-[#F5F1EA]">
              Architects, Designers &amp; Site Supervisors
            </h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_CONTENT.team.map((member) => (
              <div key={member.role} className="rounded-lg overflow-hidden border border-[#F5F1EA]/10 bg-[#151519]">
                <div className="aspect-[4/3] overflow-hidden">
                  <SiteImage
                    src={member.photo}
                    alt={member.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5 space-y-1.5">
                  <h3 className="font-display text-lg text-[#F5F1EA]">{member.name}</h3>
                  <p className="text-xs text-[#C8A15B]">{member.role}</p>
                  <p className="text-sm text-[#B7B0A4] pt-1">{member.bio}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Milestones */}
        <section className="space-y-8">
          <h2 className="font-display text-3xl text-[#F5F1EA]">Studio Milestones</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ABOUT_CONTENT.milestones.map((m) => (
              <div key={m.title} className="p-5 rounded-lg border border-[#F5F1EA]/10 bg-[#131317] space-y-2">
                <span className="text-xs font-semibold text-[#C8A15B] tabular-nums">{m.year}</span>
                <h3 className="font-display text-lg text-[#F5F1EA]">{m.title}</h3>
                <p className="text-xs text-[#B7B0A4] leading-relaxed">{m.detail}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Site Culture Photos */}
        <section className="space-y-8">
          <h2 className="font-display text-3xl text-[#F5F1EA]">Work-Site Culture</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {ABOUT_CONTENT.siteCultureGallery.map((item) => (
              <figure key={item.caption} className="space-y-2.5">
                <div className="aspect-[4/3] rounded-lg overflow-hidden border border-[#F5F1EA]/10">
                  <SiteImage
                    src={item.src}
                    alt={item.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <figcaption className="text-xs text-[#B7B0A4]">{item.caption}</figcaption>
              </figure>
            ))}
          </div>
        </section>

        {/* CTA */}
        <section className="p-8 sm:p-10 rounded-lg border border-[#C8A15B]/35 bg-[#151519] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA] mb-1">
              Visit Our Varanasi Studio or Request a Site Visit
            </h2>
            <p className="text-sm text-[#B7B0A4]">{SITE_CONFIG.address.hours}</p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('about_page_cta')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] text-sm font-semibold rounded-md hover:bg-[#d8b36d] transition-colors"
            >
              <span>WhatsApp Team</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              to="/contact"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#F5F1EA]/25 text-[#F5F1EA] text-sm rounded-md hover:border-[#C8A15B]"
            >
              <span>Contact Details</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
