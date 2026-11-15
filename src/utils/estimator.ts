import {
  PRICING_CONFIG,
  type AddonKey,
  type FinishTier,
  type ServiceCategory,
} from '../config/pricing';

export interface EstimatorInput {
  serviceType: ServiceCategory;
  areaSqFt: number;
  tier: FinishTier;
  addons: AddonKey[];
}

export interface BreakdownSegment {
  id: string;
  label: string;
  minAmount: number;
  maxAmount: number;
  sharePercent: number;
}

export interface EstimatorResult {
  areaSqFt: number;
  baseMin: number;
  baseMax: number;
  addonsMin: number;
  addonsMax: number;
  totalMin: number;
  totalMax: number;
  rateLabel: string;
  rateSummary: string;
  breakdown: BreakdownSegment[];
}

export function clampAreaSqFt(area: number): number {
  if (!Number.isFinite(area) || Number.isNaN(area)) return 400;
  return Math.max(300, Math.min(20000, Math.round(area)));
}

export function calculateEstimate(input: EstimatorInput): EstimatorResult {
  const safeArea = clampAreaSqFt(input.areaSqFt);
  const band = PRICING_CONFIG.baseRates[input.serviceType][input.tier];

  const baseMin = safeArea * band.minPerSqFt;
  const baseMax = safeArea * band.maxPerSqFt;

  const selectedAddons = PRICING_CONFIG.addons.filter((addon) =>
    input.addons.includes(addon.key)
  );

  const addonsMin = selectedAddons.reduce((sum, item) => sum + item.minCost, 0);
  const addonsMax = selectedAddons.reduce((sum, item) => sum + item.maxCost, 0);

  const totalMin = baseMin + addonsMin;
  const totalMax = baseMax + addonsMax;
  const midpointTotal = Math.max(1, (totalMin + totalMax) / 2);

  // Split base scope cleanly into Civil/Core vs Finishes/Lighting + Selected Add-ons
  const breakdown: BreakdownSegment[] = [];

  if (input.serviceType === 'construction') {
    const structureMin = Math.round(baseMin * 0.62);
    const structureMax = Math.round(baseMax * 0.62);
    const finishingMin = baseMin - structureMin;
    const finishingMax = baseMax - structureMax;

    breakdown.push({
      id: 'civil-structure',
      label: 'RCC Structure, Masonry & Plumbing',
      minAmount: structureMin,
      maxAmount: structureMax,
      sharePercent: Math.round((((structureMin + structureMax) / 2) / midpointTotal) * 100),
    });
    breakdown.push({
      id: 'civil-finishes',
      label: 'Flooring, Electrical & Exterior Finishes',
      minAmount: finishingMin,
      maxAmount: finishingMax,
      sharePercent: Math.round((((finishingMin + finishingMax) / 2) / midpointTotal) * 100),
    });
  } else if (input.serviceType === 'both') {
    const civilMin = Math.round(baseMin * 0.56);
    const civilMax = Math.round(baseMax * 0.56);
    const interiorMin = baseMin - civilMin;
    const interiorMax = baseMax - civilMax;

    breakdown.push({
      id: 'turnkey-civil',
      label: 'Civil Construction & Structural Shell',
      minAmount: civilMin,
      maxAmount: civilMax,
      sharePercent: Math.round((((civilMin + civilMax) / 2) / midpointTotal) * 100),
    });
    breakdown.push({
      id: 'turnkey-interior',
      label: 'Core Interior Joinery, Electrical & Paint',
      minAmount: interiorMin,
      maxAmount: interiorMax,
      sharePercent: Math.round((((interiorMin + interiorMax) / 2) / midpointTotal) * 100),
    });
  } else {
    const carpentryMin = Math.round(baseMin * 0.58);
    const carpentryMax = Math.round(baseMax * 0.58);
    const surfacesMin = baseMin - carpentryMin;
    const surfacesMax = baseMax - carpentryMax;

    breakdown.push({
      id: 'core-carpentry',
      label: 'Woodwork, Paneling & Surfaces',
      minAmount: carpentryMin,
      maxAmount: carpentryMax,
      sharePercent: Math.round((((carpentryMin + carpentryMax) / 2) / midpointTotal) * 100),
    });
    breakdown.push({
      id: 'lighting-paint',
      label: 'Electrical, Lighting & Wall Finishes',
      minAmount: surfacesMin,
      maxAmount: surfacesMax,
      sharePercent: Math.round((((surfacesMin + surfacesMax) / 2) / midpointTotal) * 100),
    });
  }

  for (const addon of selectedAddons) {
    breakdown.push({
      id: addon.key,
      label: addon.label,
      minAmount: addon.minCost,
      maxAmount: addon.maxCost,
      sharePercent: Math.max(
        1,
        Math.round((((addon.minCost + addon.maxCost) / 2) / midpointTotal) * 100)
      ),
    });
  }

  return {
    areaSqFt: safeArea,
    baseMin,
    baseMax,
    addonsMin,
    addonsMax,
    totalMin,
    totalMax,
    rateLabel: band.label,
    rateSummary: band.summary,
    breakdown,
  };
}

export function formatINR(amount: number): string {
  if (amount >= 10000000) {
    return `₹${(amount / 10000000).toFixed(2)} Cr`;
  }
  if (amount >= 100000) {
    return `₹${(amount / 100000).toFixed(2)} L`;
  }
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(amount);
}

export function validateIndianPhone(phone: string): { valid: boolean; normalized: string; error?: string } {
  const digits = phone.replace(/\D/g, '');
  const trimmed = digits.startsWith('91') && digits.length === 12 ? digits.slice(2) : digits;
  if (!trimmed) {
    return { valid: false, normalized: '', error: 'Please enter your 10-digit mobile number.' };
  }
  if (!/^[6-9]\d{9}$/.test(trimmed)) {
    return {
      valid: false,
      normalized: trimmed,
      error: 'Enter a valid 10-digit Indian mobile number starting with 6–9.',
    };
  }
  return { valid: true, normalized: trimmed };
}

export function buildEstimateWhatsAppSummary(params: {
  name: string;
  phone: string;
  input: EstimatorInput;
  result: EstimatorResult;
}): string {
  const serviceName =
    params.input.serviceType === 'both'
      ? 'Construction + Interior (Turnkey)'
      : params.input.serviceType === 'construction'
      ? 'Civil Construction'
      : 'Interior Design & Execution';

  const addonNames = PRICING_CONFIG.addons
    .filter((a) => params.input.addons.includes(a.key))
    .map((a) => a.label);

  return [
    `Namaste Make My Interior, I used your Cost Estimator:`,
    `• Name: ${params.name.trim()}`,
    `• Phone: ${params.phone}`,
    `• Scope: ${serviceName}`,
    `• Area: ${params.result.areaSqFt.toLocaleString('en-IN')} sq. ft.`,
    `• Finish Tier: ${params.result.rateLabel}`,
    `• Add-ons: ${addonNames.length ? addonNames.join(', ') : 'None selected'}`,
    `• Estimated Range: ${formatINR(params.result.totalMin)} – ${formatINR(params.result.totalMax)}`,
    `Please share a detailed BOQ and schedule a site visit in Varanasi.`,
  ].join('\n');
}
