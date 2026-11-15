import { Link } from 'react-router-dom';
import { ArrowUpRight, Check, ShieldCheck } from 'lucide-react';
import { PROCESS_STAGES, QUALITY_CHECKS } from '../content/process';
import { PRICING_CONFIG } from '../config/pricing';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { RevealSection } from '../components/RevealSection';

export function ProcessPage() {
  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Our 6-Step Execution Process & Payment Transparency | Make My Interior"
        description="See how Make My Interior delivers construction and interior projects in Varanasi across 6 clear stages, milestone-based payments, and 40-point quality checks."
        path="/process"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Process', path: '/process' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-20">
        <div className="max-w-3xl space-y-4">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
            How We Work
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
            Predictable Milestones, Itemized Billing &amp; Zero Guesswork
          </h1>
          <p className="text-base text-[#B7B0A4] leading-relaxed">
            Every project in Varanasi follows a documented six-stage workflow—whether you are starting from a bare plot or renovating a 3 BHK apartment.
          </p>
        </div>

        {/* 6-Stage Timeline */}
        <section className="space-y-6">
          {PROCESS_STAGES.map((stage, idx) => (
            <RevealSection
              key={stage.number}
              delay={idx * 0.04}
              className="p-7 sm:p-8 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 grid grid-cols-1 lg:grid-cols-12 gap-6 items-start"
            >
              <div className="lg:col-span-4 space-y-2">
                <div className="flex items-center gap-3 text-xs">
                  <span className="font-display text-2xl text-[#C8A15B] tabular-nums">
                    {stage.number}
                  </span>
                  <span className="text-[#847D72]">·</span>
                  <span className="text-[#B7B0A4]">{stage.duration}</span>
                </div>
                <h2 className="font-display text-2xl text-[#F5F1EA]">{stage.title}</h2>
                <p className="font-hindi text-sm text-[#C8A15B]">{stage.hindiTag}</p>
              </div>

              <div className="lg:col-span-4">
                <p className="text-sm text-[#B7B0A4] leading-relaxed">{stage.summary}</p>
              </div>

              <div className="lg:col-span-4 space-y-2">
                <p className="text-xs uppercase tracking-[0.14em] text-[#847D72]">
                  Key Deliverables
                </p>
                <ul className="space-y-2">
                  {stage.deliverables.map((del) => (
                    <li key={del} className="flex items-start gap-2 text-sm text-[#F5F1EA]/90">
                      <Check className="w-4 h-4 text-[#C8A15B] shrink-0 mt-0.5" />
                      <span>{del}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </RevealSection>
          ))}
        </section>

        <div className="led-line" />

        {/* Payment-Stage Transparency */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
          <div className="lg:col-span-5 space-y-4">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
              Payment Transparency
            </p>
            <h2 className="font-display text-3xl sm:text-4xl text-[#F5F1EA]">
              Milestone-Linked Payment Schedule
            </h2>
            <p className="text-sm sm:text-base text-[#B7B0A4] leading-relaxed">
              You never pay for work that hasn&apos;t reached your site. Every tranche unlocks only after physical inspection and milestone completion—with the final 10% held until snag clearance.
            </p>
          </div>

          <div className="lg:col-span-7 space-y-3">
            {PRICING_CONFIG.paymentStages.map((p) => (
              <div
                key={p.stage}
                className="p-5 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-2.5"
              >
                <div className="flex items-center justify-between text-sm">
                  <span className="font-medium text-[#F5F1EA]">{p.stage}</span>
                  <span className="font-display text-lg text-[#C8A15B] tabular-nums">
                    {p.percentage}%
                  </span>
                </div>
                <div className="h-1.5 w-full rounded-full bg-[#0E0E10] overflow-hidden">
                  <div
                    className="h-full bg-[#C8A15B] rounded-full"
                    style={{ width: `${p.percentage * 2.5}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Quality Checks & Warranty */}
        <section className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {QUALITY_CHECKS.map((qc) => (
            <div
              key={qc.title}
              className="p-6 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-3"
            >
              <ShieldCheck className="w-6 h-6 text-[#C8A15B]" />
              <h3 className="font-display text-xl text-[#F5F1EA]">{qc.title}</h3>
              <p className="text-sm text-[#B7B0A4] leading-relaxed">{qc.detail}</p>
            </div>
          ))}
        </section>

        {/* CTA */}
        <section className="p-8 rounded-lg border border-[#C8A15B]/35 bg-[#151519] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div>
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              Ready to Start With Stage 01?
            </h2>
            <p className="text-sm text-[#B7B0A4] mt-1">
              Book a free site visit in Varanasi or estimate your budget online first.
            </p>
          </div>
          <div className="flex flex-wrap gap-3">
            <a
              href={buildWhatsAppUrl()}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick('process_page_cta')}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] text-sm font-semibold rounded-md"
            >
              <span>Book Free Site Visit</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              to="/cost-estimator"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#F5F1EA]/25 text-[#F5F1EA] text-sm rounded-md hover:border-[#C8A15B]"
            >
              <span>Cost Estimator</span>
            </Link>
          </div>
        </section>
      </div>
    </div>
  );
}
