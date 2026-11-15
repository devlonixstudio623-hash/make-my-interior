import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, Check } from 'lucide-react';
import { SERVICES_CONTENT } from '../content/services';
import { PROJECTS_CONTENT } from '../content/projects';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

export function ServiceDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const service = SERVICES_CONTENT.find((s) => s.slug === slug);

  if (!service) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center space-y-5">
        <h1 className="font-display text-4xl text-[#F5F1EA]">Service Not Found</h1>
        <p className="text-[#B7B0A4]">The requested service page does not exist.</p>
        <Link
          to="/services"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] font-semibold rounded-md"
        >
          <span>View All Services</span>
        </Link>
      </div>
    );
  }

  const relatedProjects = PROJECTS_CONTENT.filter((p) =>
    service.relatedProjectSlugs.includes(p.slug)
  );

  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title={service.seoTitle}
        description={service.seoDescription}
        path={`/services/${service.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Services', path: '/services' },
          { name: service.title, path: `/services/${service.slug}` },
        ]}
        serviceSchema={{
          name: service.title,
          description: service.summary,
          priceRange: service.startingPrice,
        }}
        faqSchema={service.faqs}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
        <Link
          to="/services"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#B7B0A4] hover:text-[#C8A15B]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to All Services</span>
        </Link>

        {/* Hero Split */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-stretch">
          <div className="lg:col-span-6 flex flex-col justify-between space-y-6">
            <div className="space-y-4">
              <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
                Service {service.index} · Varanasi &amp; UP
              </p>
              <h1 className="font-display text-3xl sm:text-5xl text-[#F5F1EA] leading-tight">
                {service.title}
              </h1>
              <p className="font-hindi text-base text-[#C8A15B]">{service.hindiLine}</p>
              <p className="text-base text-[#B7B0A4] leading-relaxed">{service.summary}</p>
            </div>

            <div className="p-5 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-2">
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-[#847D72]">Starting Guidance</span>
                <span className="font-semibold text-[#C8A15B]">{service.startingPrice}</span>
              </div>
              <div className="flex flex-wrap items-center justify-between gap-2 text-sm">
                <span className="text-[#847D72]">Typical Timeline</span>
                <span className="text-[#F5F1EA]">{service.timelineGuidance}</span>
              </div>
            </div>

            <div className="flex flex-wrap gap-4">
              <a
                href={buildWhatsAppUrl(
                  `Namaste Make My Interior, I want to discuss ${service.title} for my project in Varanasi.`
                )}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => trackWhatsAppClick(`service_${service.slug}`)}
                className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] transition-colors"
              >
                <span>Get Free Quote on WhatsApp</span>
                <ArrowUpRight className="w-4 h-4" />
              </a>
              <Link
                to="/cost-estimator"
                className="inline-flex items-center gap-2 px-6 py-3.5 border border-[#F5F1EA]/25 text-[#F5F1EA] text-sm rounded-md hover:border-[#C8A15B]"
              >
                <span>Estimate Budget</span>
              </Link>
            </div>
          </div>

          <div className="lg:col-span-6">
            <div className="h-full min-h-[300px] rounded-lg overflow-hidden border border-[#F5F1EA]/12 bg-[#151519]">
              <SiteImage
                src={service.heroImage}
                alt={service.title}
                priority
                className="w-full h-full object-cover"
              />
            </div>
          </div>
        </section>

        <div className="led-line" />

        {/* What's Included & Materials */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              What&apos;s Included
            </h2>
            <ul className="space-y-3">
              {service.whatsIncluded.map((item) => (
                <li
                  key={item}
                  className="flex items-start gap-3 p-4 rounded-lg bg-[#151519] border border-[#F5F1EA]/8 text-sm text-[#F5F1EA]/90"
                >
                  <Check className="w-4 h-4 text-[#C8A15B] shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              Materials &amp; Finishes Standard
            </h2>
            <div className="rounded-lg border border-[#F5F1EA]/10 bg-[#151519] divide-y divide-[#F5F1EA]/10">
              {service.materialsAndFinishes.map((mat) => (
                <div key={mat.category} className="p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                  <span className="text-xs uppercase tracking-[0.14em] text-[#C8A15B]">
                    {mat.category}
                  </span>
                  <span className="text-sm text-[#F5F1EA]">{mat.spec}</span>
                </div>
              ))}
            </div>

            <h3 className="font-display text-2xl text-[#F5F1EA] pt-4">Execution Process</h3>
            <div className="space-y-3">
              {service.processSteps.map((step, i) => (
                <div key={step.step} className="p-4 rounded-lg bg-[#131317] border border-[#F5F1EA]/10">
                  <p className="text-sm font-semibold text-[#F5F1EA]">
                    <span className="text-[#C8A15B] mr-2 tabular-nums">0{i + 1}.</span>
                    {step.step}
                  </p>
                  <p className="text-xs text-[#B7B0A4] mt-1">{step.detail}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Related Projects */}
        {relatedProjects.length > 0 && (
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
                Related Varanasi Projects
              </h2>
              <Link to="/projects" className="text-sm text-[#C8A15B] hover:underline inline-flex items-center gap-1">
                <span>All Projects</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {relatedProjects.map((proj) => (
                <Link
                  key={proj.slug}
                  to={`/projects/${proj.slug}`}
                  className="group rounded-lg overflow-hidden border border-[#F5F1EA]/10 bg-[#151519] hover:border-[#C8A15B]/50 transition-colors"
                >
                  <div className="aspect-[16/10] overflow-hidden">
                    <SiteImage
                      src={proj.heroImage}
                      alt={proj.title}
                      className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                    />
                  </div>
                  <div className="p-5 space-y-1.5">
                    <p className="text-xs text-[#C8A15B]">
                      {proj.category} · {proj.location}
                    </p>
                    <h3 className="font-display text-xl text-[#F5F1EA]">{proj.title}</h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}

        {/* Service FAQs */}
        <section className="space-y-6">
          <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
            Frequently Asked Questions — {service.shortTitle}
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {service.faqs.map((faq) => (
              <div
                key={faq.question}
                className="p-6 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-2"
              >
                <h3 className="font-display text-lg text-[#F5F1EA]">{faq.question}</h3>
                <p className="text-sm text-[#B7B0A4] leading-relaxed">{faq.answer}</p>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
