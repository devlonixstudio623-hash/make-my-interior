import { useState } from 'react';
import { MoveHorizontal } from 'lucide-react';
import { SiteImage } from './SiteImage';

interface BeforeAfterSliderProps {
  beforeSrc: string;
  afterSrc: string;
  beforeLabel?: string;
  afterLabel?: string;
  altTitle: string;
}

export function BeforeAfterSlider({
  beforeSrc,
  afterSrc,
  beforeLabel = 'Bare Site',
  afterLabel = 'Finished Space',
  altTitle,
}: BeforeAfterSliderProps) {
  const [position, setPosition] = useState(52);

  return (
    <div className="space-y-3">
      <div className="relative w-full aspect-[16/10] sm:aspect-[16/9] rounded-lg overflow-hidden border border-[#F5F1EA]/12 bg-[#141418] select-none">
        {/* After Image (Base full layer) */}
        <SiteImage
          src={afterSrc}
          alt={`${altTitle} — ${afterLabel}`}
          className="absolute inset-0 w-full h-full object-cover"
        />

        {/* Before Image (Clipped to left percentage) */}
        <div
          className="absolute inset-0 overflow-hidden"
          style={{ clipPath: `inset(0 ${100 - position}% 0 0)` }}
        >
          <SiteImage
            src={beforeSrc}
            alt={`${altTitle} — ${beforeLabel}`}
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

        {/* Glowing LED Divider Line */}
        <div
          aria-hidden="true"
          className="absolute top-0 bottom-0 w-[2px] bg-[#C8A15B] shadow-[0_0_16px_rgba(200,161,91,0.75)] pointer-events-none"
          style={{ left: `${position}%` }}
        >
          <div className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-10 h-10 rounded-full bg-[#0E0E10] border border-[#C8A15B] flex items-center justify-center text-[#C8A15B] shadow-lg">
            <MoveHorizontal className="w-4 h-4" />
          </div>
        </div>

        {/* Corner Captions */}
        <span className="absolute top-3 left-3 px-2.5 py-1 text-xs font-medium bg-[#0E0E10]/85 text-[#F5F1EA] rounded pointer-events-none">
          {beforeLabel}
        </span>
        <span className="absolute top-3 right-3 px-2.5 py-1 text-xs font-medium bg-[#0E0E10]/85 text-[#C8A15B] rounded pointer-events-none">
          {afterLabel}
        </span>

        {/* Invisible accessible full-overlay range input */}
        <input
          type="range"
          min={5}
          max={95}
          value={position}
          onChange={(e) => setPosition(Number(e.target.value))}
          aria-label={`Compare ${beforeLabel} and ${afterLabel} for ${altTitle}`}
          className="absolute inset-0 w-full h-full opacity-0 cursor-ew-resize z-10"
        />
      </div>

      <div className="flex items-center justify-between text-xs text-[#847D72]">
        <span>Drag or use arrow keys to compare bare site vs finished execution</span>
        <span className="tabular-nums text-[#C8A15B]">{position}% / {100 - position}%</span>
      </div>
    </div>
  );
}
