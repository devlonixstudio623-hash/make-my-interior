import { useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

export function CustomCursor() {
  const shouldReduceMotion = useReducedMotion();
  const [pos, setPos] = useState({ x: -100, y: -100 });
  const [active, setActive] = useState(false);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    if (shouldReduceMotion || typeof window === 'undefined') return;
    const finePointer = window.matchMedia('(pointer: fine)').matches;
    if (!finePointer) return;

    setEnabled(true);

    const onMove = (e: MouseEvent) => {
      setPos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement | null;
      const isInteractive = Boolean(
        target?.closest('a, button, input, select, textarea, [role="button"]')
      );
      setActive(isInteractive);
    };

    const onLeave = () => setPos({ x: -100, y: -100 });

    window.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseleave', onLeave);
    return () => {
      window.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseleave', onLeave);
    };
  }, [shouldReduceMotion]);

  if (!enabled) return null;

  return (
    <div
      aria-hidden="true"
      className="pointer-events-none fixed top-0 left-0 z-[80] hidden lg:block transition-transform duration-150 ease-out"
      style={{
        transform: `translate3d(${pos.x - (active ? 18 : 10)}px, ${pos.y - (active ? 18 : 10)}px, 0)`,
      }}
    >
      <div
        className={`rounded-full border transition-all duration-150 ${
          active
            ? 'w-9 h-9 border-[#C8A15B] bg-[#C8A15B]/10'
            : 'w-5 h-5 border-[#C8A15B]/55 bg-transparent'
        }`}
      />
    </div>
  );
}
