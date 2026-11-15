import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { ArrowUpRight, X } from 'lucide-react';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';

export function ConsultationPopup() {
  const shouldReduceMotion = useReducedMotion();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (typeof window === 'undefined') return;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return;
    if (sessionStorage.getItem('mmi_popup_dismissed') === '1') return;

    let readyForExitIntent = false;
    const readyTimer = window.setTimeout(() => {
      readyForExitIntent = true;
    }, 12000);

    const timedPopup = window.setTimeout(() => {
      if (sessionStorage.getItem('mmi_popup_dismissed') !== '1') {
        setOpen(true);
        sessionStorage.setItem('mmi_popup_dismissed', '1');
      }
    }, 28000);

    const handleMouseLeave = (e: MouseEvent) => {
      if (!readyForExitIntent) return;
      if (e.clientY <= 4 && sessionStorage.getItem('mmi_popup_dismissed') !== '1') {
        setOpen(true);
        sessionStorage.setItem('mmi_popup_dismissed', '1');
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      window.clearTimeout(readyTimer);
      window.clearTimeout(timedPopup);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, []);

  const close = () => {
    sessionStorage.setItem('mmi_popup_dismissed', '1');
    setOpen(false);
  };

  return (
    <AnimatePresence>
      {open && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="consultation-popup-title"
          className="fixed inset-0 z-[70] flex items-center justify-center p-4 bg-black/75 backdrop-blur-sm"
        >
          <motion.div
            initial={shouldReduceMotion ? { opacity: 1 } : { opacity: 0, scale: 0.96, y: 10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={shouldReduceMotion ? { opacity: 0 } : { opacity: 0, scale: 0.96, y: 8 }}
            transition={{ duration: 0.22, ease: [0.16, 1, 0.3, 1] }}
            className="relative w-full max-w-md bg-[#151519] border border-[#C8A15B]/45 rounded-lg p-7 shadow-2xl"
          >
            <button
              type="button"
              onClick={close}
              aria-label="Close consultation offer"
              className="absolute top-4 right-4 w-9 h-9 inline-flex items-center justify-center rounded-md text-[#B7B0A4] hover:text-[#F5F1EA] hover:bg-[#F5F1EA]/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>

            <p className="text-xs uppercase tracking-[0.18em] text-[#C8A15B] mb-2">
              Varanasi Site Visit Offer
            </p>
            <h2 id="consultation-popup-title" className="font-display text-2xl sm:text-3xl text-[#F5F1EA] mb-3">
              Book a Free Design Consultation
            </h2>
            <p className="text-sm text-[#B7B0A4] leading-relaxed mb-6">
              Planning construction, a modular kitchen, or a full home makeover? Get a complimentary site visit, laser measurement, and honest BOQ range from our lead engineer.
            </p>

            <div className="led-line-left mb-6" />

            <div className="flex flex-col gap-3">
              <a
                href={buildWhatsAppUrl(
                  'Namaste Make My Interior, I would like to claim my Free Design Consultation & site visit in Varanasi.'
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => {
                  trackWhatsAppClick('exit_popup_cta');
                  close();
                }}
                className="w-full inline-flex items-center justify-center gap-2 py-3 px-5 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] transition-colors"
              >
                <span>Schedule Free Visit on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <button
                type="button"
                onClick={close}
                className="w-full py-2.5 text-xs text-[#847D72] hover:text-[#F5F1EA] transition-colors"
              >
                No thanks, continue browsing
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
