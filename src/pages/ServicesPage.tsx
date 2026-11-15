import { Link } from 'react-router-dom';
import { ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES_CONTENT, SPECIALIZED_OFFERINGS } from '../content/services';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

export function ServicesPage() {
  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Services — Construction, Architecture, Modular Kitchen & Interiors | Make My Interior"
        description="Explore our 6 specialized services in Varanasi: turnkey construction, Vastu architecture, full interiors, modular kitchens, wardrobes, and false ceiling LED lighting."
        path="/services"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
            Complete Scope · Varanasi &amp; Purvanchal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
            Six Specialized Disciplines, Zero Contractor Fragmentation
          </h1>
          <p className="text-base text-[#B7B0A4] leading-relaxed">
            Whether you need structural civil construction from a bare plot, a waterproof modular kitchen, or warm LED false ceilings—every specification is itemized upfront.
          </p>
        </div>

        {/* 6 Services Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {SERVICES_CONTENT.map((service) => (
            <Link
              key={service.slug}
              to={`/services/${service.slug}`}
              className="led-card-hover group rounded-lg bg-[#151519] border border-[#F5F1EA]/10 hover:border-[#C8A15B]/50 overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/10] overflow-hidden bg-[#1C1C22]">
                <SiteImage
                  src={service.heroImage}
                  alt={service.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-7 flex-1 flex flex-col justify-between space-y-5">
                <div className="space-y-2.5">
                  <div className="flex items-center justify-between text-xs text-[#847D72]">
                    <span className="text-[#C8A15B] font-semibold tabular-nums">
                      Service {service.index}
                    </span>
                    <span>{service.timelineGuidance}</span>
                  </div>
                  <h2 className="font-display text-2xl text-[#F5F1EA] group-hover:text-[#C8A15B] transition-colors">
                    {service.title}
                  </h2>
                  <p className="font-hindi text-sm text-[#F5F1EA]/75">{service.hindiLine}</p>
                  <p className="text-sm text-[#B7B0A4] leading-relaxed">{service.summary}</p>
                </div>

                <div className="pt-4 border-t border-[#F5F1EA]/10 flex items-center justify-between text-sm">
                  <span className="text-xs text-[#B7B0A4]">{service.startingPrice}</span>
                  <span className="inline-flex items-center gap-1.5 text-[#C8A15B] font-medium shrink-0">
                    <span>View Specs</span>
                    <ArrowRight className="w-4 h-4" />
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        <div className="led-line" />

        {/* Dedicated Vastu Consultation & Elevation Plan Sections */}
        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="p-8 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#C8A15B]">
              Dedicated Offering
            </p>
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              {SPECIALIZED_OFFERINGS.vastu.title}
            </h2>
            <p className="font-hindi text-sm text-[#F5F1EA]/85">
              {SPECIALIZED_OFFERINGS.vastu.hindiLine}
            </p>
            <p className="text-sm text-[#B7B0A4] leading-relaxed">
              {SPECIALIZED_OFFERINGS.vastu.description}
            </p>
            <ul className="space-y-2.5 pt-2">
              {SPECIALIZED_OFFERINGS.vastu.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-[#F5F1EA]/90">
                  <Check className="w-4 h-4 text-[#C8A15B] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <a
              href={buildWhatsAppUrl('Namaste, I would like a Vastu-aligned floor plan or home review in Varanasi.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('services_vastu_cta')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8A15B] hover:underline pt-2"
            >
              <span>Book Vastu Floor Review</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>

          <div className="p-8 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-5">
            <p className="text-xs uppercase tracking-[0.18em] text-[#C8A15B]">
              Facade &amp; Exterior
            </p>
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              {SPECIALIZED_OFFERINGS.elevation.title}
            </h2>
            <p className="font-hindi text-sm text-[#F5F1EA]/85">
              {SPECIALIZED_OFFERINGS.elevation.hindiLine}
            </p>
            <p className="text-sm text-[#B7B0A4] leading-relaxed">
              {SPECIALIZED_OFFERINGS.elevation.description}
            </p>
            <ul className="space-y-2.5 pt-2">
              {SPECIALIZED_OFFERINGS.elevation.points.map((pt) => (
                <li key={pt} className="flex items-start gap-2.5 text-sm text-[#F5F1EA]/90">
                  <Check className="w-4 h-4 text-[#C8A15B] shrink-0 mt-0.5" />
                  <span>{pt}</span>
                </li>
              ))}
            </ul>
            <a
              href={buildWhatsAppUrl('Namaste, I want a 3D Front Elevation Plan for my house in Varanasi.')}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('services_elevation_cta')}
              className="inline-flex items-center gap-2 text-sm font-semibold text-[#C8A15B] hover:underline pt-2"
            >
              <span>Request 3D Elevation Plan</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>
      </div>
    </div>
  );
}
