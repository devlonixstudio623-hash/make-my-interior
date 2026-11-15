import { useMemo, useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2 } from 'lucide-react';
import {
  PRICING_CONFIG,
  type AddonKey,
  type FinishTier,
  type ServiceCategory,
} from '../config/pricing';
import { buildWhatsAppUrl } from '../config/site';
import {
  buildEstimateWhatsAppSummary,
  calculateEstimate,
  clampAreaSqFt,
  formatINR,
  validateIndianPhone,
} from '../utils/estimator';
import { trackLeadSubmit, trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';

export function CostEstimatorPage() {
  const [serviceType, setServiceType] = useState<ServiceCategory>('interior');
  const [areaSqFt, setAreaSqFt] = useState<number>(1450);
  const [tier, setTier] = useState<FinishTier>('premium');
  const [addons, setAddons] = useState<AddonKey[]>(['modularKitchen', 'falseCeiling']);

  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [formError, setFormError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submittedState, setSubmittedState] = useState<{
    leadId: string;
    whatsappUrl: string;
  } | null>(null);

  const estimate = useMemo(
    () => calculateEstimate({ serviceType, areaSqFt, tier, addons }),
    [serviceType, areaSqFt, tier, addons]
  );

  const toggleAddon = (key: AddonKey) => {
    setAddons((prev) =>
      prev.includes(key) ? prev.filter((item) => item !== key) : [...prev, key]
    );
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError('');

    if (name.trim().length < 2) {
      setFormError('Please enter your full name.');
      return;
    }

    const phoneCheck = validateIndianPhone(phone);
    if (!phoneCheck.valid) {
      setFormError(phoneCheck.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    const summaryText = buildEstimateWhatsAppSummary({
      name: name.trim(),
      phone: phoneCheck.normalized,
      input: { serviceType, areaSqFt: estimate.areaSqFt, tier, addons },
      result: estimate,
    });

    setSubmitting(true);
    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phoneCheck.normalized,
          source: 'cost-estimator',
          projectType: serviceType,
          budget: `${formatINR(estimate.totalMin)} - ${formatINR(estimate.totalMax)}`,
          estimateSummary: summaryText,
        }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) {
        setFormError(data.error || 'Could not submit estimate. Please try again.');
        return;
      }

      const waUrl = buildWhatsAppUrl(summaryText);
      trackLeadSubmit('cost_estimator', Math.round((estimate.totalMin + estimate.totalMax) / 2));
      setSubmittedState({ leadId: data.leadId || 'MMI', whatsappUrl: waUrl });
    } catch {
      setFormError('Network error while saving your estimate. You can still message us on WhatsApp directly.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Interior & Construction Cost Estimator Varanasi | Make My Interior"
        description="Calculate honest interior design, modular kitchen, and civil construction cost estimates per sq. ft. in Varanasi."
        path="/cost-estimator"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Cost Estimator', path: '/cost-estimator' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
            Transparent Planning Tool
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
            Varanasi Construction &amp; Interior Cost Estimator
          </h1>
          <p className="text-sm sm:text-base text-[#B7B0A4]">
            Configure your project scope, built-up area, finish specification, and specialized add-ons to preview a realistic budget range before booking a free site visit.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Configuration Column */}
          <div className="lg:col-span-7 space-y-8 bg-[#151519] border border-[#F5F1EA]/10 rounded-lg p-6 sm:p-8">
            {/* Step 1: Service Type */}
            <div className="space-y-3">
              <label className="text-xs uppercase tracking-[0.16em] text-[#C8A15B] block">
                1. Project Scope
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {[
                  { key: 'interior' as const, label: 'Interior Only' },
                  { key: 'construction' as const, label: 'Construction Only' },
                  { key: 'both' as const, label: 'Construction + Interior' },
                ].map((opt) => (
                  <button
                    key={opt.key}
                    type="button"
                    onClick={() => setServiceType(opt.key)}
                    className={`py-3 px-4 rounded-md text-sm font-medium border transition-colors ${
                      serviceType === opt.key
                        ? 'bg-[#C8A15B] text-[#0E0E10] border-[#C8A15B] font-semibold'
                        : 'bg-[#0E0E10] text-[#F5F1EA]/85 border-[#F5F1EA]/15 hover:border-[#C8A15B]/50'
                    }`}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Step 2: Area or BHK */}
            <div className="space-y-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <label
                  htmlFor="area-sqft-input"
                  className="text-xs uppercase tracking-[0.16em] text-[#C8A15B]"
                >
                  2. Area in Sq. Ft. or BHK Preset
                </label>
                <span className="font-display text-xl text-[#F5F1EA] tabular-nums">
                  {estimate.areaSqFt.toLocaleString('en-IN')} sq. ft.
                </span>
              </div>

              <div className="flex flex-wrap gap-2">
                {PRICING_CONFIG.bhkPresets.map((preset) => (
                  <button
                    key={preset.id}
                    type="button"
                    onClick={() => setAreaSqFt(preset.sqFt)}
                    className={`px-3.5 py-2 text-xs rounded-md border transition-colors ${
                      areaSqFt === preset.sqFt
                        ? 'bg-[#C8A15B]/20 text-[#C8A15B] border-[#C8A15B]'
                        : 'bg-[#0E0E10] text-[#B7B0A4] border-[#F5F1EA]/15 hover:text-[#F5F1EA]'
                    }`}
                  >
                    {preset.label} ({preset.sqFt})
                  </button>
                ))}
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center">
                <input
                  type="range"
                  min={400}
                  max={6000}
                  step={50}
                  value={Math.min(6000, estimate.areaSqFt)}
                  onChange={(e) => setAreaSqFt(Number(e.target.value))}
                  aria-label="Adjust area in square feet"
                  className="sm:col-span-8 accent-[#C8A15B]"
                />
                <input
                  id="area-sqft-input"
                  type="number"
                  min={300}
                  max={20000}
                  value={areaSqFt}
                  onChange={(e) => setAreaSqFt(clampAreaSqFt(Number(e.target.value)))}
                  className="sm:col-span-4 px-3.5 py-2.5 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] tabular-nums focus:outline-none focus:border-[#C8A15B]"
                />
              </div>
            </div>

            {/* Step 3: Finish Tier */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.16em] text-[#C8A15B] block">
                3. Material &amp; Finish Tier
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(['standard', 'premium', 'luxury'] as const).map((t) => {
                  const band = PRICING_CONFIG.baseRates[serviceType][t];
                  const active = tier === t;
                  return (
                    <button
                      key={t}
                      type="button"
                      onClick={() => setTier(t)}
                      className={`p-4 rounded-md border text-left transition-colors flex flex-col justify-between gap-2 ${
                        active
                          ? 'bg-[#C8A15B]/15 border-[#C8A15B]'
                          : 'bg-[#0E0E10] border-[#F5F1EA]/15 hover:border-[#C8A15B]/50'
                      }`}
                    >
                      <span className="font-display text-lg text-[#F5F1EA]">{band.label}</span>
                      <span className="text-xs text-[#C8A15B] tabular-nums">
                        ₹{band.minPerSqFt.toLocaleString('en-IN')} – ₹{band.maxPerSqFt.toLocaleString('en-IN')} / sq.ft.
                      </span>
                      <span className="text-xs text-[#B7B0A4] leading-relaxed">
                        {band.summary}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Step 4: Optional Add-Ons */}
            <div className="space-y-3">
              <span className="text-xs uppercase tracking-[0.16em] text-[#C8A15B] block">
                4. Specialized Add-Ons
              </span>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {PRICING_CONFIG.addons.map((addon) => {
                  const checked = addons.includes(addon.key);
                  return (
                    <button
                      key={addon.key}
                      type="button"
                      onClick={() => toggleAddon(addon.key)}
                      aria-pressed={checked}
                      className={`p-4 rounded-md border text-left transition-colors space-y-1 ${
                        checked
                          ? 'bg-[#C8A15B]/15 border-[#C8A15B]'
                          : 'bg-[#0E0E10] border-[#F5F1EA]/15 hover:border-[#C8A15B]/40'
                      }`}
                    >
                      <div className="flex items-center justify-between gap-2">
                        <span className="text-sm font-semibold text-[#F5F1EA]">
                          {addon.label}
                        </span>
                        <span className="text-xs text-[#C8A15B] tabular-nums shrink-0">
                          +{formatINR(addon.minCost)}
                        </span>
                      </div>
                      <p className="text-xs text-[#B7B0A4]">{addon.description}</p>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Right Live Output + Breakdown + Lead Capture */}
          <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-24">
            <div className="p-6 sm:p-8 rounded-lg bg-[#151519] border border-[#C8A15B]/45 space-y-6">
              <div>
                <p className="text-xs uppercase tracking-[0.18em] text-[#C8A15B] mb-1">
                  Estimated Guidance Range
                </p>
                <p
                  data-testid="estimate-range"
                  className="font-display text-3xl sm:text-4xl text-[#F5F1EA] tabular-nums"
                >
                  {formatINR(estimate.totalMin)} – {formatINR(estimate.totalMax)}
                </p>
                <p className="text-xs text-[#847D72] mt-1">
                  {estimate.rateLabel} · {estimate.areaSqFt.toLocaleString('en-IN')} sq. ft. (Illustrative guidance; final quote follows laser site measurement &amp; BOQ)
                </p>
              </div>

              {/* Animated Breakdown Chart */}
              <div className="space-y-3 pt-4 border-t border-[#F5F1EA]/10">
                <p className="text-xs uppercase tracking-[0.14em] text-[#B7B0A4]">
                  Scope Breakdown
                </p>
                {estimate.breakdown.map((seg) => (
                  <div key={seg.id} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs gap-2">
                      <span className="text-[#F5F1EA]/90 truncate">{seg.label}</span>
                      <span className="text-[#C8A15B] tabular-nums shrink-0">
                        {formatINR(seg.minAmount)} – {formatINR(seg.maxAmount)}
                      </span>
                    </div>
                    <div className="h-1.5 w-full rounded-full bg-[#0E0E10] overflow-hidden">
                      <div
                        className="h-full bg-[#C8A15B] rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, Math.max(4, seg.sharePercent))}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>

              <div className="led-line" />

              {/* Lead Capture Form -> POST /api/lead + Prefilled WhatsApp */}
              {submittedState ? (
                <div className="p-5 rounded-md bg-[#0E0E10] border border-[#C8A15B]/50 space-y-4">
                  <div className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-[#C8A15B] shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold text-sm text-[#F5F1EA]">
                        Estimate Saved ({submittedState.leadId})
                      </p>
                      <p className="text-xs text-[#B7B0A4] mt-1">
                        Send this itemized summary directly to our Varanasi team on WhatsApp to book your free site visit.
                      </p>
                    </div>
                  </div>
                  <a
                    href={submittedState.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('estimator_post_submit')}
                    className="w-full inline-flex items-center justify-center gap-2 py-3 px-4 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d]"
                  >
                    <span>Send Estimate on WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => setSubmittedState(null)}
                    className="w-full text-xs text-[#847D72] hover:text-[#F5F1EA]"
                  >
                    Recalculate with different specifications
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-4">
                  <p className="text-sm font-medium text-[#F5F1EA]">
                    Lock This Estimate &amp; Get Detailed BOQ on WhatsApp
                  </p>
                  <div>
                    <label htmlFor="est-name" className="block text-xs text-[#B7B0A4] mb-1">
                      Full Name
                    </label>
                    <input
                      id="est-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="e.g. Rajesh Srivastava"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] placeholder:text-[#847D72] focus:outline-none focus:border-[#C8A15B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="est-phone" className="block text-xs text-[#B7B0A4] mb-1">
                      WhatsApp / Mobile Number
                    </label>
                    <input
                      id="est-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      required
                      className="w-full px-3.5 py-2.5 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] placeholder:text-[#847D72] focus:outline-none focus:border-[#C8A15B]"
                    />
                  </div>

                  {formError && (
                    <p role="alert" className="text-xs text-[#f87171]">
                      {formError}
                    </p>
                  )}

                  <button
                    type="submit"
                    disabled={submitting}
                    className="w-full inline-flex items-center justify-center gap-2 py-3.5 px-5 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] disabled:opacity-60 transition-colors"
                  >
                    <span>{submitting ? 'Saving Estimate...' : 'Get Estimate & Open WhatsApp'}</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
