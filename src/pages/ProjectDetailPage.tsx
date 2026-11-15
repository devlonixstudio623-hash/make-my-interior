import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronLeft, ChevronRight, X } from 'lucide-react';
import { PROJECTS_CONTENT } from '../content/projects';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';
import { BeforeAfterSlider } from '../components/BeforeAfterSlider';

export function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>();
  const currentIndex = PROJECTS_CONTENT.findIndex((p) => p.slug === slug);
  const project = currentIndex >= 0 ? PROJECTS_CONTENT[currentIndex] : undefined;
  const [lightboxIdx, setLightboxIdx] = useState<number | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (lightboxIdx === null || !project) return;
      if (e.key === 'Escape') setLightboxIdx(null);
      if (e.key === 'ArrowRight') {
        setLightboxIdx((prev) => (prev === null ? null : (prev + 1) % project.gallery.length));
      }
      if (e.key === 'ArrowLeft') {
        setLightboxIdx((prev) =>
          prev === null ? null : (prev - 1 + project.gallery.length) % project.gallery.length
        );
      }
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [lightboxIdx, project]);

  if (!project) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center space-y-5">
        <h1 className="font-display text-4xl text-[#F5F1EA]">Project Not Found</h1>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] font-semibold rounded-md"
        >
          <span>Browse All Projects</span>
        </Link>
      </div>
    );
  }

  const prevProject =
    PROJECTS_CONTENT[(currentIndex - 1 + PROJECTS_CONTENT.length) % PROJECTS_CONTENT.length];
  const nextProject = PROJECTS_CONTENT[(currentIndex + 1) % PROJECTS_CONTENT.length];

  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title={`${project.title} — ${project.location} | Make My Interior`}
        description={project.summary}
        path={`/projects/${project.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
          { name: project.title, path: `/projects/${project.slug}` },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-14">
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#B7B0A4] hover:text-[#C8A15B]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Portfolio</span>
        </Link>

        {/* Title & Hero Image */}
        <header className="space-y-6">
          <div className="space-y-3 max-w-4xl">
            <p className="text-xs uppercase tracking-[0.18em] text-[#C8A15B]">
              {project.category} · {project.location}
            </p>
            <h1 className="font-display text-3xl sm:text-5xl text-[#F5F1EA]">
              {project.title}
            </h1>
            <p className="text-base text-[#B7B0A4] leading-relaxed">{project.summary}</p>
          </div>

          <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#F5F1EA]/12 bg-[#151519]">
            <SiteImage
              src={project.heroImage}
              alt={project.title}
              priority
              className="w-full h-full object-cover"
            />
          </div>

          {/* Project Facts Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-4 p-6 rounded-lg bg-[#151519] border border-[#F5F1EA]/10">
            <div>
              <p className="text-xs text-[#847D72]">Category</p>
              <p className="text-sm font-medium text-[#F5F1EA] mt-1">{project.category}</p>
            </div>
            <div>
              <p className="text-xs text-[#847D72]">Area</p>
              <p className="text-sm font-medium text-[#F5F1EA] mt-1 tabular-nums">{project.area}</p>
            </div>
            <div>
              <p className="text-xs text-[#847D72]">Location</p>
              <p className="text-sm font-medium text-[#F5F1EA] mt-1">{project.location}</p>
            </div>
            <div>
              <p className="text-xs text-[#847D72]">Duration</p>
              <p className="text-sm font-medium text-[#F5F1EA] mt-1 tabular-nums">{project.duration}</p>
            </div>
            <div className="col-span-2 sm:col-span-1">
              <p className="text-xs text-[#847D72]">Budget Guidance</p>
              <p className="text-sm font-medium text-[#C8A15B] mt-1 tabular-nums">{project.budgetRange}</p>
            </div>
          </div>
        </header>

        {/* Challenge & Solution */}
        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="p-7 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-3">
            <h2 className="font-display text-2xl text-[#F5F1EA]">The Site Challenge</h2>
            <p className="text-sm sm:text-base text-[#B7B0A4] leading-relaxed">{project.challenge}</p>
          </div>
          <div className="p-7 rounded-lg bg-[#151519] border border-[#C8A15B]/30 space-y-3">
            <h2 className="font-display text-2xl text-[#C8A15B]">Our Engineering &amp; Design Solution</h2>
            <p className="text-sm sm:text-base text-[#F5F1EA]/90 leading-relaxed">{project.solution}</p>
          </div>
        </section>

        {/* Before / After Comparison */}
        <section className="space-y-5">
          <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
            Before &amp; After Transformation
          </h2>
          <BeforeAfterSlider
            beforeSrc={project.beforeImage}
            afterSrc={project.afterImage}
            altTitle={project.title}
          />
        </section>

        {/* Image Gallery with Lightbox */}
        <section className="space-y-5">
          <div className="flex items-center justify-between">
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              Project Gallery
            </h2>
            <span className="text-xs text-[#847D72]">Click any image to open fullscreen lightbox</span>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
            {project.gallery.map((img, idx) => (
              <button
                key={idx}
                type="button"
                onClick={() => setLightboxIdx(idx)}
                className="group text-left rounded-lg overflow-hidden border border-[#F5F1EA]/10 hover:border-[#C8A15B]/50 bg-[#151519] transition-colors"
              >
                <div className="aspect-[4/3] overflow-hidden">
                  <SiteImage
                    src={img.src}
                    alt={img.caption}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <p className="p-3.5 text-xs text-[#B7B0A4]">{img.caption}</p>
              </button>
            ))}
          </div>
        </section>

        {/* Site Progress Timeline & Video Walkthrough Slot */}
        <section className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              Site-Progress Timeline
            </h2>
            <div className="space-y-4">
              {project.siteProgressTimeline.map((item) => (
                <div
                  key={item.phase}
                  className="p-5 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 space-y-1.5"
                >
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-[#C8A15B]">{item.phase}</span>
                    <span className="text-[#F5F1EA]">{item.status}</span>
                  </div>
                  <p className="text-sm text-[#B7B0A4]">{item.note}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="lg:col-span-6 space-y-5">
            <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
              Walkthrough Video
            </h2>
            <div className="aspect-[16/10] rounded-lg overflow-hidden border border-[#F5F1EA]/12 bg-[#151519] relative">
              {project.videoSrc ? (
                <video
                  controls
                  playsInline
                  poster={project.videoPoster}
                  className="w-full h-full object-cover"
                >
                  <source src={project.videoSrc} type="video/mp4" />
                </video>
              ) : (
                <div className="relative w-full h-full">
                  <SiteImage
                    src={project.videoPoster}
                    alt={`${project.title} video walkthrough preview`}
                    className="w-full h-full object-cover opacity-70"
                  />
                  <div className="absolute inset-0 bg-[#0E0E10]/55 flex flex-col items-center justify-center p-6 text-center">
                    <p className="font-display text-lg text-[#F5F1EA] mb-1">
                      Project Walkthrough Video Ready
                    </p>
                    <p className="text-xs text-[#B7B0A4] max-w-sm">
                      Add local compressed .mp4 in /public/media/projects/ or watch highlights on our Reels Wall.
                    </p>
                    <Link
                      to="/reels"
                      className="mt-4 px-4 py-2 text-xs font-semibold bg-[#C8A15B] text-[#0E0E10] rounded-md"
                    >
                      Open Reels Wall
                    </Link>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Client Quote & Similar Design CTA */}
        <section className="p-8 sm:p-10 rounded-lg border border-[#C8A15B]/35 bg-[#151519] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8 space-y-3">
            <p className="font-display italic text-xl sm:text-2xl text-[#F5F1EA] leading-relaxed">
              &ldquo;{project.clientQuote.quote}&rdquo;
            </p>
            <p className="text-sm text-[#C8A15B]">
              — {project.clientQuote.author} · {project.clientQuote.context}
            </p>
          </div>
          <div className="lg:col-span-4 flex lg:justify-end">
            <a
              href={buildWhatsAppUrl(
                `Namaste Make My Interior, I loved "${project.title}" (${project.location}) and want a similar design for my space.`
              )}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`project_similar_${project.slug}`)}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md hover:bg-[#d8b36d] transition-colors whitespace-nowrap"
            >
              <span>Get a Similar Design</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
          </div>
        </section>

        {/* Prev / Next Project Navigation */}
        <nav aria-label="Project navigation" className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-6 border-t border-[#F5F1EA]/10">
          <Link
            to={`/projects/${prevProject.slug}`}
            className="p-5 rounded-lg border border-[#F5F1EA]/10 hover:border-[#C8A15B]/50 bg-[#151519] flex items-center gap-4"
          >
            <ArrowLeft className="w-5 h-5 text-[#C8A15B] shrink-0" />
            <div>
              <p className="text-xs text-[#847D72]">Previous Project</p>
              <p className="font-display text-lg text-[#F5F1EA]">{prevProject.title}</p>
            </div>
          </Link>
          <Link
            to={`/projects/${nextProject.slug}`}
            className="p-5 rounded-lg border border-[#F5F1EA]/10 hover:border-[#C8A15B]/50 bg-[#151519] flex items-center justify-end text-right gap-4"
          >
            <div>
              <p className="text-xs text-[#847D72]">Next Project</p>
              <p className="font-display text-lg text-[#F5F1EA]">{nextProject.title}</p>
            </div>
            <ArrowRight className="w-5 h-5 text-[#C8A15B] shrink-0" />
          </Link>
        </nav>
      </div>

      {/* Fullscreen Lightbox Modal */}
      {lightboxIdx !== null && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Project image lightbox"
          className="fixed inset-0 z-[80] bg-black/92 backdrop-blur-sm flex flex-col items-center justify-center p-4"
        >
          <button
            type="button"
            onClick={() => setLightboxIdx(null)}
            aria-label="Close image lightbox"
            className="absolute top-5 right-5 w-11 h-11 rounded-full bg-[#151519] border border-[#F5F1EA]/20 text-[#F5F1EA] flex items-center justify-center hover:border-[#C8A15B]"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="max-w-5xl w-full flex items-center gap-3 sm:gap-5">
            <button
              type="button"
              onClick={() =>
                setLightboxIdx((lightboxIdx - 1 + project.gallery.length) % project.gallery.length)
              }
              aria-label="Previous gallery image"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#151519] border border-[#F5F1EA]/20 text-[#F5F1EA] flex items-center justify-center shrink-0 hover:border-[#C8A15B]"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>

            <div className="flex-1 space-y-3 text-center">
              <div className="aspect-[16/10] rounded-lg overflow-hidden border border-[#F5F1EA]/15 bg-[#151519]">
                <SiteImage
                  src={project.gallery[lightboxIdx].src}
                  alt={project.gallery[lightboxIdx].caption}
                  className="w-full h-full object-contain"
                />
              </div>
              <p className="text-sm text-[#F5F1EA]">{project.gallery[lightboxIdx].caption}</p>
            </div>

            <button
              type="button"
              onClick={() => setLightboxIdx((lightboxIdx + 1) % project.gallery.length)}
              aria-label="Next gallery image"
              className="w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-[#151519] border border-[#F5F1EA]/20 text-[#F5F1EA] flex items-center justify-center shrink-0 hover:border-[#C8A15B]"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
