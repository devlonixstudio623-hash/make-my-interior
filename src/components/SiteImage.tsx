import { useState } from 'react';
import { Compass } from 'lucide-react';

interface SiteImageProps {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  fallbackTitle?: string;
}

export function SiteImage({
  src,
  alt,
  className = '',
  priority = false,
  fallbackTitle,
}: SiteImageProps) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        role="img"
        aria-label={alt}
        className={`flex flex-col items-center justify-center bg-gradient-to-br from-[#1C1C22] via-[#141418] to-[#0E0E10] text-[#B7B0A4] p-6 text-center ${className}`}
      >
        <Compass className="w-7 h-7 text-[#C8A15B]/70 mb-2" strokeWidth={1.5} />
        <span className="font-display text-sm text-[#F5F1EA]/90">{fallbackTitle || alt}</span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      referrerPolicy="no-referrer"
      loading={priority ? 'eager' : 'lazy'}
      decoding="async"
      onError={() => setFailed(true)}
      className={className}
    />
  );
}
