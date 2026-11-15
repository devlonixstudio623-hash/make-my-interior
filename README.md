# Make My Interior — Varanasi Design-Build & Construction Studio

> **Tagline:** "From Construction to Interior, We Build Your Dream Space."  
> **Hindi Subline:** "Construction se Interior tak, sab kuch ek hi chhat ke neeche."

---

## 1. Folder Structure

```
├── server.ts                  # Express + Vite server (/api/lead, /sitemap.xml, /robots.txt)
├── public/media/              # Local images & videos (never hotlink Instagram)
│   ├── hero/                  # hero.mp4 (<3MB) + hero-poster.jpg (1920x1080)
│   ├── projects/              # Project & service showcase photos (1600x1200 / 1600x900)
│   ├── reels/                 # Vertical 9:16 reel .mp4 clips & poster thumbnails
│   ├── before-after/          # Bare site vs finished room comparison pairs
│   └── team/                  # Founder & studio team portraits
├── scripts/
│   ├── optimize-images.mjs    # Sharp batch optimizer (JPG + WebP)
│   └── compress-videos.sh     # FFmpeg commands to keep videos under 3 MB
└── src/
    ├── config/
    │   ├── site.ts            # Brand, PARENT_BRAND_NAME, phone/WhatsApp (7905824051), address, trust strip
    │   └── pricing.ts         # Cost Estimator rates, BHK presets, add-ons & payment stages
    ├── content/
    │   ├── about.ts           # Founder story, values, team slots, milestones
    │   ├── blog.ts            # 4 Varanasi SEO blog guides
    │   ├── faq.ts             # Categorized FAQs + Schema.org FAQPage data
    │   ├── process.ts         # 6-stage execution timeline & quality checks
    │   ├── projects.ts        # 8 case studies (challenge, solution, timeline, quote)
    │   ├── reels.ts           # Vertical reels metadata
    │   ├── services.ts        # 6 service detail pages + Vastu & 3D Elevation
    │   └── testimonials.ts    # Client quotes + TODO video testimonial slots
    ├── utils/
    │   ├── analytics.ts       # GA4 & Meta Pixel hooks (leads + WhatsApp clicks)
    │   └── estimator.ts       # Pure Cost Estimator math & Indian phone validation
    ├── components/            # Navbar, Footer, BeforeAfterSlider, Preloader, SeoHead, etc.
    └── pages/                 # All 16+ multipage routes + custom 404
```

---

## 2. Exact Media Filenames & Recommended Sizes

Replace placeholder photos/videos in `/public/media/` using these exact filenames:

| Path | Dimensions / Aspect | Max Size | Purpose |
| --- | --- | --- | --- |
| `/public/media/hero/hero-poster.jpg` | `1920×1080` (16:9) | `< 350 KB` | Hero backdrop & video poster |
| `/public/media/hero/hero.mp4` | `1280×720` (16:9, muted) | `< 3 MB` | Looping hero reel (optional; poster displays seamlessly if absent) |
| `/public/media/projects/living-room.jpg` | `1600×1200` (4:3) | `< 300 KB` | Living room showcase & Interior service hero |
| `/public/media/projects/modular-kitchen.jpg` | `1600×1200` (4:3) | `< 300 KB` | Modular kitchen showcase |
| `/public/media/projects/bedroom-suite.jpg` | `1600×1200` (4:3) | `< 300 KB` | Master bedroom & wardrobe showcase |
| `/public/media/projects/construction-site.jpg` | `1600×1200` (4:3) | `< 300 KB` | Civil construction showcase |
| `/public/media/projects/commercial-cafe.jpg` | `1600×1200` (4:3) | `< 300 KB` | Restaurant / commercial showcase |
| `/public/media/projects/pooja-entrance.jpg` | `1600×1200` (4:3) | `< 300 KB` | Entrance foyer & Pooja mandir showcase |
| `/public/media/before-after/living-before.jpg` | `1600×1000` (16:10) | `< 300 KB` | Bare shell before photo |
| `/public/media/before-after/living-after.jpg` | `1600×1000` (16:10) | `< 300 KB` | Finished room after photo |
| `/public/media/team/founder.jpg` | `900×1200` (3:4) | `< 250 KB` | Founder portrait on `/about` |
| `/public/media/reels/reel-*.jpg` + `.mp4` | `720×1280` (9:16) | `< 3 MB` | Vertical reels & video testimonial clips |

### Image Optimization (Sharp)
```bash
npm install -D sharp
node scripts/optimize-images.mjs ./raw-photos ./public/media/projects
```

### Video Compression (FFmpeg under 3 MB)
```bash
chmod +x scripts/compress-videos.sh
./scripts/compress-videos.sh raw-hero.mp4 public/media/hero/hero.mp4 hero
./scripts/compress-videos.sh raw-reel.mp4 public/media/reels/reel-cove-living.mp4 reel
```

---

## 3. How to Edit Brand Info, Pricing & Content

- **Parent Brand, Phone/WhatsApp, Studio Address & Trust Strip:**  
  Edit `src/config/site.ts`. Update `PARENT_BRAND_NAME` once confirmed with the client, replace `TODO` items in `trustStrip` and `address`, and confirm `instagramHandle`.
- **Cost Estimator Rates & Payment Stages:**  
  Edit `src/config/pricing.ts`. All per-sq-ft rates (`standard`, `premium`, `luxury`) for `interior`, `construction`, and `both` live here.
- **Projects, Services, Reels, Testimonials, FAQs & Team:**  
  Edit the typed data arrays inside `src/content/*.ts`. Search for `TODO:` across `src/` to review every placeholder slot before launch.
- **Adding New Blog Posts:**  
  Append a new object to `BLOG_POSTS` in `src/content/blog.ts` with a unique `slug`, `sections`, and `relatedSlugs`, and add the route to `server.ts` `/sitemap.xml`.

---

## 4. Environment Variables & Lead Webhook

Copy `.env.example` to `.env`:
- `VITE_GA4_ID`: Google Analytics 4 measurement ID (`G-...`).
- `VITE_META_PIXEL_ID`: Meta Pixel ID for Instagram/Facebook ad conversion tracking.
- `GOOGLE_SHEETS_WEBHOOK_URL`: Google Apps Script Web App URL (or CRM webhook) where `/api/lead` forwards Cost Estimator & Contact Form leads.

---

## 5. Local Development, Testing & Deployment

```bash
# Run Cost Estimator & validation unit tests
npx --yes tsx --test src/utils/estimator.test.ts

# Type-check & build
npm run lint
npm run build

# Start production server (port 3000)
npm start
```

To deploy with a custom domain (`makemyinterior.in`), point your DNS `A` / `CNAME` record to your Node/Cloud Run or Vercel host and set `APP_URL="https://makemyinterior.in"` in your environment variables so canonical URLs and `/sitemap.xml` resolve to your live domain.
