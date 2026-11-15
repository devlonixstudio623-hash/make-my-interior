declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void;
    fbq?: (...args: unknown[]) => void;
    dataLayer?: unknown[];
  }
}

export function initAnalytics(): void {
  const ga4Id = import.meta.env.VITE_GA4_ID as string | undefined;
  const pixelId = import.meta.env.VITE_META_PIXEL_ID as string | undefined;

  if (ga4Id && !document.getElementById('ga4-script')) {
    const script = document.createElement('script');
    script.id = 'ga4-script';
    script.async = true;
    script.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(ga4Id)}`;
    document.head.appendChild(script);

    window.dataLayer = window.dataLayer || [];
    window.gtag = function gtag(...args: unknown[]) {
      window.dataLayer?.push(args);
    };
    window.gtag('js', new Date());
    window.gtag('config', ga4Id);
  }

  if (pixelId && !document.getElementById('meta-pixel-script')) {
    const script = document.createElement('script');
    script.id = 'meta-pixel-script';
    script.textContent = `
      !function(f,b,e,v,n,t,s){if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};if(!f._fbq)f._fbq=n;
      n.push=n;n.loaded=!0;n.version='2.0';n.queue=[];t=b.createElement(e);t.async=!0;
      t.src=v;s=b.getElementsByTagName(e)[0];s.parentNode.insertBefore(t,s)}(window,
      document,'script','https://connect.facebook.net/en_US/fbevents.js');
      fbq('init', '${pixelId.replace(/[^0-9A-Za-z_-]/g, '')}');
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }
}

export function trackPageView(path: string, title: string): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', 'page_view', {
    page_path: path,
    page_title: title,
  });
  window.fbq?.('track', 'PageView');
}

export function trackWhatsAppClick(source: string): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', 'whatsapp_click', {
    event_category: 'engagement',
    event_label: source,
  });
  window.fbq?.('track', 'Contact', { content_name: source });
}

export function trackLeadSubmit(source: string, value?: number): void {
  if (typeof window === 'undefined') return;
  window.gtag?.('event', 'generate_lead', {
    event_category: 'conversion',
    event_label: source,
    value,
    currency: 'INR',
  });
  window.fbq?.('track', 'Lead', { content_name: source, value, currency: 'INR' });
}
