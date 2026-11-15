import { Link } from 'react-router-dom';
import { ArrowUpRight, Instagram, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { SERVICES_CONTENT } from '../content/services';
import { trackWhatsAppClick } from '../utils/analytics';

export function Footer() {
  return (
    <footer className="bg-[#0A0A0C] border-t border-[#F5F1EA]/10 pt-16 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="led-line mb-12" />

        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[#F5F1EA]/10">
          <div className="md:col-span-4 space-y-4">
            <Link to="/" className="font-display text-2xl text-[#F5F1EA] block">
              {SITE_CONFIG.brandName}
            </Link>
            <p className="text-xs uppercase tracking-[0.16em] text-[#C8A15B]">
              {SITE_CONFIG.parentBrand}
            </p>
            <p className="text-sm text-[#B7B0A4] leading-relaxed max-w-sm">
              {SITE_CONFIG.tagline}
            </p>
            <p className="font-hindi text-sm text-[#F5F1EA]/80">
              {SITE_CONFIG.hindiSubline}
            </p>
            <div className="pt-2 flex flex-wrap items-center gap-4 text-sm">
              <a
                href={`tel:${SITE_CONFIG.phoneRaw}`}
                className="inline-flex items-center gap-2 text-[#F5F1EA] hover:text-[#C8A15B] transition-colors tabular-nums"
              >
                <Phone className="w-4 h-4 text-[#C8A15B]" />
                <span>{SITE_CONFIG.phoneDisplay}</span>
              </a>
              <a
                href={SITE_CONFIG.instagramUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-1.5 text-[#B7B0A4] hover:text-[#C8A15B] transition-colors"
              >
                <Instagram className="w-4 h-4 text-[#C8A15B]" />
                <span>{SITE_CONFIG.instagramHandle}</span>
              </a>
            </div>
          </div>

          <div className="md:col-span-3 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#847D72]">Services</h3>
            <ul className="space-y-2 text-sm">
              {SERVICES_CONTENT.map((service) => (
                <li key={service.slug}>
                  <Link
                    to={`/services/${service.slug}`}
                    className="text-[#B7B0A4] hover:text-[#C8A15B] transition-colors"
                  >
                    {service.title}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="md:col-span-2 space-y-3">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#847D72]">Explore</h3>
            <ul className="space-y-2 text-sm">
              <li><Link to="/projects" className="text-[#B7B0A4] hover:text-[#C8A15B]">Projects</Link></li>
              <li><Link to="/reels" className="text-[#B7B0A4] hover:text-[#C8A15B]">Site Reels</Link></li>
              <li><Link to="/process" className="text-[#B7B0A4] hover:text-[#C8A15B]">Our Process</Link></li>
              <li><Link to="/cost-estimator" className="text-[#B7B0A4] hover:text-[#C8A15B]">Cost Estimator</Link></li>
              <li><Link to="/about" className="text-[#B7B0A4] hover:text-[#C8A15B]">About Studio</Link></li>
              <li><Link to="/testimonials" className="text-[#B7B0A4] hover:text-[#C8A15B]">Testimonials</Link></li>
              <li><Link to="/blog" className="text-[#B7B0A4] hover:text-[#C8A15B]">Design Blog</Link></li>
              <li><Link to="/faq" className="text-[#B7B0A4] hover:text-[#C8A15B]">FAQs</Link></li>
            </ul>
          </div>

          <div className="md:col-span-3 space-y-4">
            <h3 className="text-xs uppercase tracking-[0.18em] text-[#847D72]">Varanasi Studio</h3>
            <div className="flex items-start gap-2.5 text-sm text-[#B7B0A4]">
              <MapPin className="w-4 h-4 text-[#C8A15B] shrink-0 mt-0.5" />
              <div>
                <p>{SITE_CONFIG.address.line1}</p>
                <p>{SITE_CONFIG.address.line2}</p>
                <p className="text-xs text-[#847D72] mt-1">{SITE_CONFIG.address.hours}</p>
              </div>
            </div>
            <p className="text-xs text-[#847D72] leading-relaxed">
              Serving {SITE_CONFIG.serviceArea}.
            </p>
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('footer_cta')}
              className="inline-flex items-center gap-2 px-4 py-2.5 text-xs font-semibold border border-[#C8A15B]/60 text-[#C8A15B] rounded-md hover:bg-[#C8A15B] hover:text-[#0E0E10] transition-colors"
            >
              <span>Message on WhatsApp</span>
              <ArrowUpRight className="w-3.5 h-3.5" />
            </a>
          </div>
        </div>

        <div className="pt-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-xs text-[#847D72]">
          <p>
            © {new Date().getFullYear()} {SITE_CONFIG.brandName}. {SITE_CONFIG.parentBrand}.
          </p>
          <div className="flex items-center gap-5">
            <Link to="/privacy-policy" className="hover:text-[#F5F1EA] transition-colors">
              Privacy Policy
            </Link>
            <Link to="/terms" className="hover:text-[#F5F1EA] transition-colors">
              Terms of Service
            </Link>
            <a href="/sitemap.xml" className="hover:text-[#F5F1EA] transition-colors">
              Sitemap
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
