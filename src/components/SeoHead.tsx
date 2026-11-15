import { useEffect } from 'react';
import { SITE_CONFIG } from '../config/site';

interface BreadcrumbItem {
  name: string;
  path: string;
}

interface SeoHeadProps {
  title: string;
  description: string;
  path: string;
  breadcrumbs?: BreadcrumbItem[];
  serviceSchema?: {
    name: string;
    description: string;
    priceRange?: string;
  };
  faqSchema?: { question: string; answer: string }[];
}

function upsertMeta(attr: 'name' | 'property', key: string, content: string) {
  let el = document.head.querySelector(`meta[${attr}="${key}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement('meta');
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.setAttribute('content', content);
}

export function SeoHead({
  title,
  description,
  path,
  breadcrumbs,
  serviceSchema,
  faqSchema,
}: SeoHeadProps) {
  useEffect(() => {
    document.title = title;
    upsertMeta('name', 'description', description);
    upsertMeta('property', 'og:title', title);
    upsertMeta('property', 'og:description', description);
    upsertMeta('name', 'twitter:title', title);
    upsertMeta('name', 'twitter:description', description);

    const origin = window.location.origin;
    const fullUrl = `${origin}${path}`;
    upsertMeta('property', 'og:url', fullUrl);

    let canonical = document.head.querySelector('link[rel="canonical"]') as HTMLLinkElement | null;
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = fullUrl;

    // Build Schema.org JSON-LD graph
    const graph: Record<string, unknown>[] = [
      {
        '@type': 'LocalBusiness',
        '@id': `${origin}/#organization`,
        name: SITE_CONFIG.brandName,
        description: SITE_CONFIG.tagline,
        url: origin,
        telephone: `+91${SITE_CONFIG.phoneRaw}`,
        address: {
          '@type': 'PostalAddress',
          streetAddress: SITE_CONFIG.address.line1,
          addressLocality: 'Varanasi',
          addressRegion: 'UP',
          postalCode: '221010',
          addressCountry: 'IN',
        },
        areaServed: ['Varanasi', 'Mughalsarai', 'Chandauli', 'Bhadohi', 'Jaunpur', 'Mirzapur', 'Prayagraj'],
        sameAs: [SITE_CONFIG.instagramUrl],
      },
    ];

    if (breadcrumbs && breadcrumbs.length > 0) {
      graph.push({
        '@type': 'BreadcrumbList',
        itemListElement: breadcrumbs.map((crumb, idx) => ({
          '@type': 'ListItem',
          position: idx + 1,
          name: crumb.name,
          item: `${origin}${crumb.path}`,
        })),
      });
    }

    if (serviceSchema) {
      graph.push({
        '@type': 'Service',
        name: serviceSchema.name,
        description: serviceSchema.description,
        provider: { '@id': `${origin}/#organization` },
        areaServed: { '@type': 'City', name: 'Varanasi' },
        ...(serviceSchema.priceRange ? { priceRange: serviceSchema.priceRange } : {}),
      });
    }

    if (faqSchema && faqSchema.length > 0) {
      graph.push({
        '@type': 'FAQPage',
        mainEntity: faqSchema.map((item) => ({
          '@type': 'Question',
          name: item.question,
          acceptedAnswer: {
            '@type': 'Answer',
            text: item.answer,
          },
        })),
      });
    }

    let ldScript = document.getElementById('mmi-json-ld') as HTMLScriptElement | null;
    if (!ldScript) {
      ldScript = document.createElement('script');
      ldScript.id = 'mmi-json-ld';
      ldScript.type = 'application/ld+json';
      document.head.appendChild(ldScript);
    }
    ldScript.textContent = JSON.stringify({
      '@context': 'https://schema.org',
      '@graph': graph,
    });
  }, [title, description, path, breadcrumbs, serviceSchema, faqSchema]);

  return null;
}
