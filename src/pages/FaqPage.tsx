import { useState } from 'react';
import { ChevronDown, ArrowUpRight } from 'lucide-react';
import { FAQ_CATEGORIES, FAQ_ITEMS, type FAQCategory } from '../content/faq';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';

export function FaqPage() {
  const [category, setCategory] = useState<FAQCategory | 'all'>('all');
  const [openId, setOpenId] = useState<string>(FAQ_ITEMS[0]?.id || '');

  const visibleFaqs =
    category === 'all' ? FAQ_ITEMS : FAQ_ITEMS.filter((item) => item.category === category);

  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Frequently Asked Questions — Budget, Timeline, Vastu & Warranty | Make My Interior"
        description="Answers to common questions about interior design budgets, BOQ billing, construction timelines, Vastu alignment, and material warranties in Varanasi."
        path="/faq"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'FAQ', path: '/faq' },
        ]}
        faqSchema={FAQ_ITEMS.map((item) => ({
          question: item.question,
          answer: item.answer,
        }))}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
            Clarity Before You Commit
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
            Frequently Asked Questions
          </h1>
          <p className="text-base text-[#B7B0A4]">
            Straightforward answers on BOQ pricing, plywood &amp; hardware brands, payment stages, Vastu planning, and post-handover support.
          </p>
        </div>

        {/* Category Filter Tabs */}
        <div className="flex flex-wrap gap-2 pb-4 border-b border-[#F5F1EA]/10">
          {FAQ_CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              type="button"
              onClick={() => setCategory(cat.key)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                category === cat.key
                  ? 'bg-[#C8A15B] text-[#0E0E10]'
                  : 'bg-[#151519] text-[#B7B0A4] border border-[#F5F1EA]/10 hover:text-[#F5F1EA]'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* Accordion List */}
        <div className="space-y-3">
          {visibleFaqs.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className="rounded-lg border border-[#F5F1EA]/10 bg-[#151519] overflow-hidden"
              >
                <button
                  type="button"
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  aria-expanded={isOpen}
                  className="w-full p-5 sm:p-6 text-left flex items-center justify-between gap-4 hover:bg-[#1C1C22]/50 transition-colors"
                >
                  <div>
                    <span className="text-xs text-[#C8A15B] block mb-1">
                      {item.categoryLabel}
                    </span>
                    <span className="font-display text-lg sm:text-xl text-[#F5F1EA]">
                      {item.question}
                    </span>
                  </div>
                  <ChevronDown
                    className={`w-5 h-5 text-[#C8A15B] shrink-0 transition-transform duration-200 ${
                      isOpen ? 'rotate-180' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <div className="px-5 sm:px-6 pb-6 pt-1 text-sm sm:text-base text-[#B7B0A4] leading-relaxed border-t border-[#F5F1EA]/8">
                    {item.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <div className="p-7 rounded-lg border border-[#C8A15B]/35 bg-[#151519] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-5">
          <div>
            <h2 className="font-display text-2xl text-[#F5F1EA]">Still have a specific question?</h2>
            <p className="text-sm text-[#B7B0A4] mt-1">
              Message our lead engineer directly on WhatsApp for plot or flat advice.
            </p>
          </div>
          <a
            href={buildWhatsAppUrl('Namaste, I have a question regarding my home construction/interior project in Varanasi.')}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackWhatsAppClick('faq_bottom_cta')}
            className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] text-sm font-semibold rounded-md whitespace-nowrap"
          >
            <span>Ask on WhatsApp</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </div>
  );
}
