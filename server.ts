import express from 'express';
import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import dotenv from 'dotenv';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const PORT = Number(process.env.PORT || 3000);
const isProduction = process.env.NODE_ENV === 'production';

// In-memory store for recent session leads during preview (forward to GOOGLE_SHEETS_WEBHOOK_URL in production)
interface LeadPayload {
  name: string;
  phone: string;
  source: 'cost-estimator' | 'contact-form' | 'consultation-popup';
  projectType?: string;
  budget?: string;
  message?: string;
  estimateSummary?: string;
  createdAt: string;
}

const recentLeads: LeadPayload[] = [];

async function startServer() {
  const app = express();
  app.use(express.json({ limit: '1mb' }));

  // Health endpoint
  app.get('/api/health', (_req, res) => {
    res.json({ ok: true, studio: 'Make My Interior' });
  });

  // Lead capture API endpoint (POST /api/lead)
  app.post('/api/lead', async (req, res) => {
    try {
      const { name, phone, source, projectType, budget, message, estimateSummary } = req.body || {};

      if (!name || typeof name !== 'string' || name.trim().length < 2) {
        res.status(400).json({ ok: false, error: 'Please provide your full name.' });
        return;
      }

      const cleanDigits = String(phone || '').replace(/\D/g, '');
      const normalizedPhone =
        cleanDigits.startsWith('91') && cleanDigits.length === 12
          ? cleanDigits.slice(2)
          : cleanDigits;

      if (!/^[6-9]\d{9}$/.test(normalizedPhone)) {
        res.status(400).json({
          ok: false,
          error: 'Please enter a valid 10-digit Indian mobile number.',
        });
        return;
      }

      const lead: LeadPayload = {
        name: name.trim(),
        phone: normalizedPhone,
        source: source || 'contact-form',
        projectType: typeof projectType === 'string' ? projectType.trim() : undefined,
        budget: typeof budget === 'string' ? budget.trim() : undefined,
        message: typeof message === 'string' ? message.trim() : undefined,
        estimateSummary: typeof estimateSummary === 'string' ? estimateSummary.trim() : undefined,
        createdAt: new Date().toISOString(),
      };

      recentLeads.unshift(lead);
      if (recentLeads.length > 50) recentLeads.pop();

      const webhookUrl = process.env.GOOGLE_SHEETS_WEBHOOK_URL;
      let webhookForwarded = false;

      if (webhookUrl && webhookUrl.startsWith('https://')) {
        try {
          const webhookResp = await fetch(webhookUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(lead),
          });
          webhookForwarded = webhookResp.ok;
        } catch {
          webhookForwarded = false;
        }
      }

      res.status(201).json({
        ok: true,
        leadId: `MMI-${Date.now().toString().slice(-6)}`,
        webhookForwarded,
        message: 'Enquiry received. Opening WhatsApp with your details.',
      });
    } catch {
      res.status(500).json({ ok: false, error: 'Unable to save enquiry right now.' });
    }
  });

  // Dynamic robots.txt
  app.get('/robots.txt', (req, res) => {
    const baseUrl = process.env.APP_URL || `${req.protocol}://${req.get('host')}`;
    res.type('text/plain').send(
      `User-agent: *\nAllow: /\nSitemap: ${baseUrl.replace(/\/$/, '')}/sitemap.xml\n`
    );
  });

  // Dynamic sitemap.xml covering all routes, 6 services, 8 projects, and 4 blog posts
  app.get('/sitemap.xml', (req, res) => {
    const baseUrl = (process.env.APP_URL || `${req.protocol}://${req.get('host')}`).replace(/\/$/, '');
    const routes = [
      '/',
      '/about',
      '/services',
      '/services/construction',
      '/services/architecture-structural-planning',
      '/services/interior-design-execution',
      '/services/modular-kitchen',
      '/services/wardrobe-storage',
      '/services/false-ceiling-lighting',
      '/projects',
      '/projects/sigra-residence-living',
      '/projects/shivpur-quartz-kitchen',
      '/projects/bhelupur-master-bedroom',
      '/projects/mahmoorganj-duplex-construction',
      '/projects/assighat-boutique-cafe',
      '/projects/lanka-pooja-foyer',
      '/projects/cantt-wardrobe-tv-wall',
      '/projects/sarnath-spa-bathroom',
      '/reels',
      '/process',
      '/cost-estimator',
      '/blog',
      '/blog/interior-design-cost-in-varanasi',
      '/blog/modular-kitchen-ideas-indian-homes',
      '/blog/vastu-tips-for-bedroom-pooja',
      '/blog/false-ceiling-design-ideas-varanasi',
      '/testimonials',
      '/faq',
      '/contact',
      '/privacy-policy',
      '/terms',
    ];

    const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes
      .map((r) => `  <url><loc>${baseUrl}${r}</loc><changefreq>weekly</changefreq></url>`)
      .join('\n')}\n</urlset>`;
    res.type('application/xml').send(xml);
  });

  if (!isProduction) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distDir = path.resolve(__dirname, 'dist');
    app.use(express.static(distDir));
    app.get('*', (_req, res) => {
      const indexPath = path.join(distDir, 'index.html');
      if (fs.existsSync(indexPath)) {
        res.sendFile(indexPath);
      } else {
        res.status(404).send('Build output not found.');
      }
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Make My Interior server listening on http://localhost:${PORT}`);
  });
}

startServer();
