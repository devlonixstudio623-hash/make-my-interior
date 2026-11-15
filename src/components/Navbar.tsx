import { useEffect, useRef, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, ChevronDown, Menu, X } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { SERVICES_CONTENT } from '../content/services';
import { PROJECT_CATEGORIES } from '../content/projects';
import { trackWhatsAppClick } from '../utils/analytics';
import { MagneticButton } from './MagneticButton';

type MegaMenuKey = 'services' | 'projects' | null;

export function Navbar() {
  const location = useLocation();
  const shouldReduceMotion = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [openMenu, setOpenMenu] = useState<MegaMenuKey>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const closeTimeout = useRef<number | null>(null);

  const isHome = location.pathname === '/';

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 36);
    };
    handleScroll();
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setOpenMenu(null);
    setMobileOpen(false);
  }, [location.pathname, location.search]);

  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  const scheduleClose = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
    closeTimeout.current = window.setTimeout(() => setOpenMenu(null), 160);
  };

  const cancelClose = () => {
    if (closeTimeout.current) window.clearTimeout(closeTimeout.current);
  };

  const navBgClass =
    scrolled || !isHome || openMenu
      ? 'bg-[#0E0E10]/95 backdrop-blur-md border-b border-[#C8A15B]/25'
      : 'bg-gradient-to-b from-[#0E0E10]/85 to-transparent border-b border-transparent';

  return (
    <>
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-colors duration-200 ${navBgClass}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 md:h-20 flex items-center justify-between gap-8">
          {/* Zone 1: Single clean text element Brand Wordmark */}
          <Link
            to="/"
            className="font-display text-xl sm:text-2xl font-semibold tracking-tight text-[#F5F1EA] hover:text-[#C8A15B] transition-colors whitespace-nowrap shrink-0"
          >
            {SITE_CONFIG.brandName}
          </Link>

          {/* Zone 2: 5 concise single-line navigation links */}
          <nav aria-label="Main navigation" className="hidden md:flex items-center gap-6 lg:gap-8">
            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpenMenu('services');
              }}
              onMouseLeave={scheduleClose}
            >
              <Link
                to="/services"
                onClick={() => setOpenMenu(null)}
                aria-expanded={openMenu === 'services'}
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-2 ${
                  location.pathname.startsWith('/services')
                    ? 'text-[#C8A15B]'
                    : 'text-[#F5F1EA]/85 hover:text-[#F5F1EA]'
                }`}
              >
                <span>Services</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
            </div>

            <div
              className="relative"
              onMouseEnter={() => {
                cancelClose();
                setOpenMenu('projects');
              }}
              onMouseLeave={scheduleClose}
            >
              <Link
                to="/projects"
                onClick={() => setOpenMenu(null)}
                aria-expanded={openMenu === 'projects'}
                className={`inline-flex items-center gap-1 text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-2 ${
                  location.pathname.startsWith('/projects')
                    ? 'text-[#C8A15B]'
                    : 'text-[#F5F1EA]/85 hover:text-[#F5F1EA]'
                }`}
              >
                <span>Projects</span>
                <ChevronDown className="w-3.5 h-3.5 opacity-70" />
              </Link>
            </div>

            <Link
              to="/process"
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-2 ${
                location.pathname === '/process'
                  ? 'text-[#C8A15B]'
                  : 'text-[#F5F1EA]/85 hover:text-[#F5F1EA]'
              }`}
            >
              Process
            </Link>

            <Link
              to="/cost-estimator"
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-2 ${
                location.pathname === '/cost-estimator'
                  ? 'text-[#C8A15B]'
                  : 'text-[#F5F1EA]/85 hover:text-[#F5F1EA]'
              }`}
            >
              Estimator
            </Link>

            <Link
              to="/contact"
              className={`text-sm font-medium transition-colors whitespace-nowrap shrink-0 py-2 ${
                location.pathname === '/contact'
                  ? 'text-[#C8A15B]'
                  : 'text-[#F5F1EA]/85 hover:text-[#F5F1EA]'
              }`}
            >
              Contact
            </Link>
          </nav>

          {/* Zone 3: 1 Primary Action + Mobile Menu Trigger */}
          <div className="flex items-center gap-3 shrink-0">
            <div className="hidden sm:block">
              <MagneticButton>
                <a
                  href={buildWhatsAppUrl()}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => trackWhatsAppClick('navbar_primary_cta')}
                  className="inline-flex items-center gap-2 px-4 py-2 text-xs sm:text-sm font-semibold bg-[#C8A15B] text-[#0E0E10] rounded-md hover:bg-[#d8b36d] transition-colors whitespace-nowrap shrink-0"
                >
                  <span>Free Consultation</span>
                  <ArrowUpRight className="w-4 h-4" />
                </a>
              </MagneticButton>
            </div>

            <button
              type="button"
              onClick={() => setMobileOpen((prev) => !prev)}
              aria-label={mobileOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={mobileOpen}
              className="md:hidden inline-flex items-center justify-center w-10 h-10 rounded-md border border-[#F5F1EA]/15 text-[#F5F1EA] hover:border-[#C8A15B] transition-colors"
            >
              {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Desktop Mega Menu Panel */}
        <AnimatePresence>
          {openMenu && (
            <motion.div
              initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -6 }}
              transition={{ duration: 0.18, ease: [0.16, 1, 0.3, 1] }}
              onMouseEnter={cancelClose}
              onMouseLeave={scheduleClose}
              className="hidden md:block bg-[#141418] border-t border-[#F5F1EA]/10 border-b border-[#C8A15B]/30 shadow-2xl"
            >
              <div className="max-w-7xl mx-auto px-8 py-8">
                {openMenu === 'services' ? (
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-4 pr-6 border-r border-[#F5F1EA]/10">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#C8A15B] mb-2">
                        One Roof Execution
                      </p>
                      <h3 className="font-display text-2xl text-[#F5F1EA] mb-3">
                        From RCC Structure to Warm LED Cove
                      </h3>
                      <p className="text-sm text-[#B7B0A4] leading-relaxed mb-5">
                        {SITE_CONFIG.parentBrand}. Transparent itemized BOQs and dedicated site engineers in Varanasi.
                      </p>
                      <div className="flex flex-col gap-2 text-sm">
                        <Link
                          to="/services"
                          className="text-[#C8A15B] hover:underline font-medium"
                        >
                          View All Services &amp; Vastu Planning
                        </Link>
                        <Link to="/about" className="text-[#F5F1EA]/80 hover:text-[#C8A15B]">
                          About Our Studio &amp; Founder
                        </Link>
                      </div>
                    </div>
                    <div className="col-span-8 grid grid-cols-2 gap-4">
                      {SERVICES_CONTENT.map((service) => (
                        <Link
                          key={service.slug}
                          to={`/services/${service.slug}`}
                          className="group p-3.5 rounded-md border border-[#F5F1EA]/8 hover:border-[#C8A15B]/50 bg-[#0E0E10]/60 transition-colors"
                        >
                          <div className="flex items-baseline justify-between gap-2 mb-1">
                            <span className="font-display text-base text-[#F5F1EA] group-hover:text-[#C8A15B] transition-colors">
                              {service.index}. {service.title}
                            </span>
                            <ArrowUpRight className="w-4 h-4 text-[#C8A15B] opacity-0 group-hover:opacity-100 transition-opacity shrink-0" />
                          </div>
                          <p className="text-xs text-[#B7B0A4] line-clamp-1">{service.tagline}</p>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-12 gap-8">
                    <div className="col-span-4 pr-6 border-r border-[#F5F1EA]/10">
                      <p className="text-xs uppercase tracking-[0.18em] text-[#C8A15B] mb-2">
                        Varanasi Case Studies
                      </p>
                      <h3 className="font-display text-2xl text-[#F5F1EA] mb-3">
                        Real Homes &amp; Commercial Spaces
                      </h3>
                      <p className="text-sm text-[#B7B0A4] leading-relaxed mb-5">
                        Inspect before-and-after transformations, site timelines, and authentic material specs.
                      </p>
                      <div className="flex flex-col gap-2 text-sm">
                        <Link to="/projects" className="text-[#C8A15B] hover:underline font-medium">
                          Browse All 8 Case Studies
                        </Link>
                        <Link to="/reels" className="text-[#F5F1EA]/80 hover:text-[#C8A15B]">
                          Site Walkthrough Reels
                        </Link>
                        <Link to="/testimonials" className="text-[#F5F1EA]/80 hover:text-[#C8A15B]">
                          Client Stories &amp; Reviews
                        </Link>
                      </div>
                    </div>
                    <div className="col-span-5">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#847D72] mb-3">
                        Filter by Space
                      </p>
                      <div className="grid grid-cols-2 gap-2.5">
                        {PROJECT_CATEGORIES.map((cat) => (
                          <Link
                            key={cat}
                            to={`/projects?category=${encodeURIComponent(cat)}`}
                            className="text-sm text-[#F5F1EA]/85 hover:text-[#C8A15B] py-1.5 border-b border-[#F5F1EA]/8 transition-colors"
                          >
                            {cat}
                          </Link>
                        ))}
                      </div>
                    </div>
                    <div className="col-span-3 pl-4 border-l border-[#F5F1EA]/10">
                      <p className="text-xs uppercase tracking-[0.16em] text-[#847D72] mb-3">
                        Planning Resources
                      </p>
                      <div className="flex flex-col gap-2.5 text-sm">
                        <Link to="/cost-estimator" className="text-[#F5F1EA]/85 hover:text-[#C8A15B]">
                          Instant Cost Estimator
                        </Link>
                        <Link to="/blog" className="text-[#F5F1EA]/85 hover:text-[#C8A15B]">
                          Varanasi Design Guides (Blog)
                        </Link>
                        <Link to="/faq" className="text-[#F5F1EA]/85 hover:text-[#C8A15B]">
                          Frequently Asked Questions
                        </Link>
                        <Link to="/about" className="text-[#F5F1EA]/85 hover:text-[#C8A15B]">
                          Studio &amp; Founder Story
                        </Link>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>

      {/* Full-Screen Animated Mobile Menu */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="fixed inset-0 z-40 bg-[#0E0E10] pt-20 pb-24 px-6 overflow-y-auto md:hidden"
          >
            <div className="led-line mb-6" />
            <nav aria-label="Mobile navigation" className="flex flex-col gap-1">
              {[
                { label: 'Home', to: '/' },
                { label: 'Services & Vastu', to: '/services' },
                { label: 'Projects & Case Studies', to: '/projects' },
                { label: 'Site Reels', to: '/reels' },
                { label: 'Our Process', to: '/process' },
                { label: 'Cost Estimator', to: '/cost-estimator' },
                { label: 'About Studio', to: '/about' },
                { label: 'Client Testimonials', to: '/testimonials' },
                { label: 'Blog & Guides', to: '/blog' },
                { label: 'FAQs', to: '/faq' },
                { label: 'Contact Varanasi Studio', to: '/contact' },
              ].map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className={`py-3.5 border-b border-[#F5F1EA]/10 font-display text-2xl flex items-center justify-between ${
                    location.pathname === item.to ? 'text-[#C8A15B]' : 'text-[#F5F1EA]'
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-5 h-5 text-[#C8A15B]/70" />
                </Link>
              ))}
            </nav>

            <div className="mt-8 space-y-3">
              <p className="text-xs text-[#B7B0A4]">{SITE_CONFIG.parentBrand}</p>
              <a
                href={buildWhatsAppUrl()}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick('mobile_menu_cta')}
                className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#C8A15B] text-[#0E0E10] font-semibold rounded-md"
              >
                <span>Book Free Consultation on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
