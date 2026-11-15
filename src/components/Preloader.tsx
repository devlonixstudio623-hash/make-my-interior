import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'motion/react';
import { SITE_CONFIG } from '../config/site';

export function Preloader() {
  const shouldReduceMotion = useReducedMotion();
  const [visible, setVisible] = useState(() => {
    if (typeof window === 'undefined') return false;
    const params = new URLSearchParams(window.location.search);
    if (params.get('autostart') === '1') return false;
    if (sessionStorage.getItem('mmi_preloader_seen') === '1') return false;
    return true;
  });

  useEffect(() => {
    if (!visible) return;
    if (shouldReduceMotion) {
      sessionStorage.setItem('mmi_preloader_seen', '1');
      setVisible(false);
      return;
    }
    const timer = window.setTimeout(() => {
      sessionStorage.setItem('mmi_preloader_seen', '1');
      setVisible(false);
    }, 950);
    return () => window.clearTimeout(timer);
  }, [visible, shouldReduceMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.45, ease: [0.16, 1, 0.3, 1] } }}
          className="fixed inset-0 z-[90] bg-[#0E0E10] flex flex-col items-center justify-center px-6"
          aria-hidden="true"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
            className="text-center max-w-md w-full"
          >
            <p className="text-xs tracking-[0.22em] uppercase text-[#C8A15B] mb-3">
              Varanasi · Architecture &amp; Interiors
            </p>
            <p className="font-display text-3xl sm:text-4xl text-[#F5F1EA] tracking-tight mb-5">
              {SITE_CONFIG.brandName}
            </p>
            <div className="h-[1px] w-full bg-[#F5F1EA]/10 overflow-hidden relative">
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
                style={{ transformOrigin: 'left' }}
                className="h-full w-full bg-gradient-to-r from-[#C8A15B]/30 via-[#C8A15B] to-[#C8A15B]/30"
              />
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
