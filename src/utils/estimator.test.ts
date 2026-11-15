import test from 'node:test';
import assert from 'node:assert/strict';
import {
  buildEstimateWhatsAppSummary,
  calculateEstimate,
  clampAreaSqFt,
  formatINR,
  validateIndianPhone,
} from './estimator';

test('clampAreaSqFt clamps invalid and extreme values cleanly', () => {
  assert.equal(clampAreaSqFt(100), 300);
  assert.equal(clampAreaSqFt(1450.4), 1450);
  assert.equal(clampAreaSqFt(50000), 20000);
  assert.equal(clampAreaSqFt(Number.NaN), 400);
});

test('calculateEstimate computes base, addons, and breakdown correctly', () => {
  const res = calculateEstimate({
    serviceType: 'interior',
    areaSqFt: 1000,
    tier: 'premium',
    addons: ['modularKitchen', 'vastu'],
  });

  // Base premium interior: 1450-1850 per sq ft => 14,50,000 - 18,50,000
  assert.equal(res.baseMin, 1450000);
  assert.equal(res.baseMax, 1850000);
  // Addons: modularKitchen (145k-280k) + vastu (45k-95k) => 190k - 375k
  assert.equal(res.addonsMin, 190000);
  assert.equal(res.addonsMax, 375000);
  assert.equal(res.totalMin, 1640000);
  assert.equal(res.totalMax, 2225000);
  assert.equal(res.breakdown.length, 4);
});

test('validateIndianPhone rejects invalid numbers and normalizes +91 prefix', () => {
  assert.equal(validateIndianPhone('').valid, false);
  assert.equal(validateIndianPhone('12345').valid, false);
  assert.equal(validateIndianPhone('5123456789').valid, false);
  assert.deepEqual(validateIndianPhone('+91 79058 24051'), {
    valid: true,
    normalized: '7905824051',
  });
});

test('formatINR formats lakhs and crores accurately', () => {
  assert.equal(formatINR(1640000), '₹16.40 L');
  assert.equal(formatINR(12500000), '₹1.25 Cr');
});

test('buildEstimateWhatsAppSummary includes client name, area, and range', () => {
  const input = {
    serviceType: 'both' as const,
    areaSqFt: 1500,
    tier: 'luxury' as const,
    addons: ['falseCeiling' as const],
  };
  const result = calculateEstimate(input);
  const text = buildEstimateWhatsAppSummary({
    name: 'Aarav Mishra',
    phone: '7905824051',
    input,
    result,
  });
  assert.ok(text.includes('Aarav Mishra'));
  assert.ok(text.includes('1,500 sq. ft.'));
  assert.ok(text.includes('Construction + Interior'));
});
