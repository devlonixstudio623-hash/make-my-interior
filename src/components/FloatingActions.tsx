import { MessageCircle, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';

export function FloatingActions() {
  return (
    <>
      {/* Desktop Floating WhatsApp Button */}
      <a
        href={buildWhatsAppUrl()}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => trackWhatsAppClick('floating_whatsapp_desktop')}
        aria-label="Chat on WhatsApp with Make My Interior"
        className="hidden md:inline-flex fixed bottom-6 right-6 z-40 items-center gap-2.5 px-4 py-3 rounded-full bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm shadow-lg shadow-black/40 hover:bg-[#d8b36d] transition-transform duration-150 hover:-translate-y-0.5"
      >
        <MessageCircle className="w-4 h-4" />
        <span>WhatsApp Studio</span>
      </a>

      {/* Mobile Compact Bottom Bar (Call + WhatsApp, <= 52px height to stay well under 15% mobile sticky cap) */}
      <div className="md:hidden fixed bottom-0 inset-x-0 z-40 bg-[#0E0E10]/95 backdrop-blur-md border-t border-[#C8A15B]/30 px-3 py-2 grid grid-cols-2 gap-2.5">
        <a
          href={`tel:${SITE_CONFIG.phoneRaw}`}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-md border border-[#F5F1EA]/20 text-[#F5F1EA] text-xs font-semibold whitespace-nowrap"
        >
          <Phone className="w-3.5 h-3.5 text-[#C8A15B]" />
          <span>Call Now</span>
        </a>
        <a
          href={buildWhatsAppUrl()}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => trackWhatsAppClick('mobile_bottom_bar')}
          className="inline-flex items-center justify-center gap-2 py-2.5 px-3 rounded-md bg-[#C8A15B] text-[#0E0E10] text-xs font-semibold whitespace-nowrap"
        >
          <MessageCircle className="w-3.5 h-3.5" />
          <span>WhatsApp</span>
        </a>
      </div>
    </>
  );
}
