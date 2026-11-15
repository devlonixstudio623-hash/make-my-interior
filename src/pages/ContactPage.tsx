import { useState, type FormEvent } from 'react';
import { ArrowUpRight, CheckCircle2, Clock, Instagram, MapPin, Phone } from 'lucide-react';
import { SITE_CONFIG, buildWhatsAppUrl } from '../config/site';
import { validateIndianPhone } from '../utils/estimator';
import { trackLeadSubmit, trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';

export function ContactPage() {
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [projectType, setProjectType] = useState('Turnkey Home Interior');
  const [budget, setBudget] = useState('₹8 L – ₹15 L');
  const [message, setMessage] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState<{ leadId: string; waUrl: string } | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError('');

    if (name.trim().length < 2) {
      setError('Please enter your full name.');
      return;
    }

    const phoneCheck = validateIndianPhone(phone);
    if (!phoneCheck.valid) {
      setError(phoneCheck.error || 'Please enter a valid 10-digit mobile number.');
      return;
    }

    setSubmitting(true);
    try {
      const resp = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: name.trim(),
          phone: phoneCheck.normalized,
          source: 'contact-form',
          projectType,
          budget,
          message: message.trim(),
        }),
      });
      const data = await resp.json();
      if (!resp.ok || !data.ok) {
        setError(data.error || 'Unable to send enquiry. Please try again.');
        return;
      }

      const waText = [
        `Namaste Make My Interior, new website enquiry:`,
        `• Name: ${name.trim()}`,
        `• Phone: ${phoneCheck.normalized}`,
        `• Project Type: ${projectType}`,
        `• Target Budget: ${budget}`,
        message.trim() ? `• Notes: ${message.trim()}` : '',
      ]
        .filter(Boolean)
        .join('\n');

      trackLeadSubmit('contact_form');
      setSubmitted({
        leadId: data.leadId || 'MMI',
        waUrl: buildWhatsAppUrl(waText),
      });
    } catch {
      setError('Network error while submitting form. You can message us directly on WhatsApp.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Contact Make My Interior — Varanasi Studio & Free Site Visit"
        description="Book a free design consultation and site visit in Varanasi. Call or WhatsApp 7905824051 for turnkey construction and interior design."
        path="/contact"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Contact', path: '/contact' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
            Varanasi Studio
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
            Schedule a Free Site Visit
          </h1>
          <p className="text-base text-[#B7B0A4]">
            Share your plot or apartment details below, or reach our studio directly on phone or WhatsApp. Serving {SITE_CONFIG.serviceArea}.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Contact Form */}
          <div className="lg:col-span-7 bg-[#151519] border border-[#F5F1EA]/10 rounded-lg p-6 sm:p-8">
            {submitted ? (
              <div className="py-10 text-center space-y-5">
                <CheckCircle2 className="w-10 h-10 text-[#C8A15B] mx-auto" />
                <div className="space-y-2">
                  <h2 className="font-display text-2xl text-[#F5F1EA]">
                    Enquiry Logged ({submitted.leadId})
                  </h2>
                  <p className="text-sm text-[#B7B0A4] max-w-md mx-auto">
                    Thank you! For immediate scheduling of your Varanasi site visit, forward your enquiry to our WhatsApp desk below.
                  </p>
                </div>
                <div className="flex flex-wrap justify-center gap-3">
                  <a
                    href={submitted.waUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('contact_post_submit')}
                    className="inline-flex items-center gap-2 px-6 py-3 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md"
                  >
                    <span>Continue to WhatsApp</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                  <button
                    type="button"
                    onClick={() => {
                      setSubmitted(null);
                      setMessage('');
                    }}
                    className="px-5 py-3 border border-[#F5F1EA]/20 text-sm text-[#F5F1EA] rounded-md"
                  >
                    Send Another Enquiry
                  </button>
                </div>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-name" className="block text-xs text-[#B7B0A4] mb-1.5">
                      Full Name
                    </label>
                    <input
                      id="contact-name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Your name"
                      required
                      className="w-full px-4 py-3 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] placeholder:text-[#847D72] focus:outline-none focus:border-[#C8A15B]"
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-phone" className="block text-xs text-[#B7B0A4] mb-1.5">
                      Phone / WhatsApp Number
                    </label>
                    <input
                      id="contact-phone"
                      type="tel"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      required
                      className="w-full px-4 py-3 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] placeholder:text-[#847D72] focus:outline-none focus:border-[#C8A15B]"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <div>
                    <label htmlFor="contact-type" className="block text-xs text-[#B7B0A4] mb-1.5">
                      Project Type
                    </label>
                    <select
                      id="contact-type"
                      value={projectType}
                      onChange={(e) => setProjectType(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] focus:outline-none focus:border-[#C8A15B]"
                    >
                      <option value="Turnkey Home Interior">Turnkey Home Interior</option>
                      <option value="Civil Construction + Interior">Civil Construction + Interior</option>
                      <option value="Civil Construction Only">Civil Construction Only</option>
                      <option value="Modular Kitchen & Wardrobes">Modular Kitchen &amp; Wardrobes</option>
                      <option value="Commercial / Cafe / Showroom">Commercial / Cafe / Showroom</option>
                      <option value="3D Elevation / Vastu Plan">3D Elevation / Vastu Plan</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="contact-budget" className="block text-xs text-[#B7B0A4] mb-1.5">
                      Estimated Budget Range
                    </label>
                    <select
                      id="contact-budget"
                      value={budget}
                      onChange={(e) => setBudget(e.target.value)}
                      className="w-full px-4 py-3 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] focus:outline-none focus:border-[#C8A15B]"
                    >
                      <option value="₹3 L – ₹8 L">₹3 L – ₹8 L</option>
                      <option value="₹8 L – ₹15 L">₹8 L – ₹15 L</option>
                      <option value="₹15 L – ₹30 L">₹15 L – ₹30 L</option>
                      <option value="₹30 L – ₹60 L+">₹30 L – ₹60 L+</option>
                      <option value="Need Guidance">Need Budget Guidance</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label htmlFor="contact-message" className="block text-xs text-[#B7B0A4] mb-1.5">
                    Site Location &amp; Requirements
                  </label>
                  <textarea
                    id="contact-message"
                    rows={4}
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="e.g. 3 BHK in Sigra / 1,500 sq. ft. plot in Shivpur, possession next month..."
                    className="w-full px-4 py-3 bg-[#0E0E10] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] placeholder:text-[#847D72] focus:outline-none focus:border-[#C8A15B]"
                  />
                </div>

                {error && (
                  <p role="alert" className="text-xs text-[#f87171]">
                    {error}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] disabled:opacity-60 transition-colors"
                >
                  <span>{submitting ? 'Submitting...' : 'Submit Enquiry & Open WhatsApp'}</span>
                  <ArrowUpRight className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Direct Contact Info & Google Maps Embed */}
          <div className="lg:col-span-5 space-y-6">
            <div className="p-6 sm:p-7 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-5">
              <h2 className="font-display text-2xl text-[#F5F1EA]">Direct Studio Desk</h2>

              <div className="space-y-4 text-sm">
                <div className="flex items-start gap-3">
                  <Phone className="w-4 h-4 text-[#C8A15B] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#847D72]">Phone &amp; WhatsApp</p>
                    <a
                      href={`tel:${SITE_CONFIG.phoneRaw}`}
                      className="text-base font-semibold text-[#F5F1EA] hover:text-[#C8A15B] tabular-nums"
                    >
                      {SITE_CONFIG.phoneDisplay}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <MapPin className="w-4 h-4 text-[#C8A15B] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#847D72]">Studio Address</p>
                    <p className="text-[#F5F1EA]">{SITE_CONFIG.address.line1}</p>
                    <p className="text-[#B7B0A4]">{SITE_CONFIG.address.line2}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Clock className="w-4 h-4 text-[#C8A15B] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#847D72]">Consultation Hours</p>
                    <p className="text-[#F5F1EA]">{SITE_CONFIG.address.hours}</p>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <Instagram className="w-4 h-4 text-[#C8A15B] shrink-0 mt-1" />
                  <div>
                    <p className="text-xs text-[#847D72]">Instagram Reels &amp; Updates</p>
                    <a
                      href={SITE_CONFIG.instagramUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-[#C8A15B] hover:underline"
                    >
                      {SITE_CONFIG.instagramHandle}
                    </a>
                  </div>
                </div>
              </div>
            </div>

            <div className="rounded-lg overflow-hidden border border-[#F5F1EA]/10 bg-[#151519] aspect-[16/10]">
              <iframe
                title="Make My Interior Varanasi Studio Map"
                src={SITE_CONFIG.address.googleMapsEmbedUrl}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="w-full h-full border-0 grayscale contrast-125 opacity-90"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
