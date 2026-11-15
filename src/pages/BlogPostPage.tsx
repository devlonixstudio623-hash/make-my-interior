import { Link, useParams } from 'react-router-dom';
import { ArrowLeft, ArrowUpRight } from 'lucide-react';
import { BLOG_POSTS } from '../content/blog';
import { buildWhatsAppUrl } from '../config/site';
import { trackWhatsAppClick } from '../utils/analytics';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

export function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const post = BLOG_POSTS.find((p) => p.slug === slug);

  if (!post) {
    return (
      <div className="pt-36 pb-24 max-w-3xl mx-auto px-4 text-center space-y-5">
        <h1 className="font-display text-4xl text-[#F5F1EA]">Article Not Found</h1>
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] font-semibold rounded-md"
        >
          <span>Back to All Guides</span>
        </Link>
      </div>
    );
  }

  const related = BLOG_POSTS.filter((p) => post.relatedSlugs.includes(p.slug));

  return (
    <article className="pt-28 pb-20">
      <SeoHead
        title={`${post.title} | Make My Interior`}
        description={post.excerpt}
        path={`/blog/${post.slug}`}
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
          { name: post.title, path: `/blog/${post.slug}` },
        ]}
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <Link
          to="/blog"
          className="inline-flex items-center gap-2 text-xs uppercase tracking-[0.16em] text-[#B7B0A4] hover:text-[#C8A15B]"
        >
          <ArrowLeft className="w-3.5 h-3.5" />
          <span>Back to Design Guides</span>
        </Link>

        <header className="space-y-4">
          <div className="flex flex-wrap items-center gap-2 text-xs text-[#B7B0A4]">
            <span className="text-[#C8A15B]">{post.category}</span>
            <span aria-hidden="true">·</span>
            <span>{post.publishedDate}</span>
            <span aria-hidden="true">·</span>
            <span>{post.readingTime}</span>
          </div>
          <h1 className="font-display text-3xl sm:text-5xl text-[#F5F1EA] leading-tight">
            {post.title}
          </h1>
          <p className="text-base sm:text-lg text-[#B7B0A4] leading-relaxed">{post.excerpt}</p>
        </header>

        <div className="aspect-[16/9] rounded-lg overflow-hidden border border-[#F5F1EA]/12 bg-[#151519]">
          <SiteImage
            src={post.coverImage}
            alt={post.title}
            priority
            className="w-full h-full object-cover"
          />
        </div>

        <div className="space-y-10">
          {post.sections.map((section) => (
            <section key={section.heading} className="space-y-4">
              <h2 className="font-display text-2xl sm:text-3xl text-[#F5F1EA]">
                {section.heading}
              </h2>
              {section.paragraphs.map((p, i) => (
                <p key={i} className="text-sm sm:text-base text-[#B7B0A4] leading-relaxed">
                  {p}
                </p>
              ))}
              {section.bullets && (
                <ul className="space-y-2.5 pl-4 border-l border-[#C8A15B]/40">
                  {section.bullets.map((b) => (
                    <li key={b} className="text-sm sm:text-base text-[#F5F1EA]/90 leading-relaxed">
                      {b}
                    </li>
                  ))}
                </ul>
              )}
            </section>
          ))}
        </div>

        {/* Article CTA Block */}
        <div className="p-7 sm:p-8 rounded-lg border border-[#C8A15B]/40 bg-[#151519] flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
          <div className="space-y-1">
            <h2 className="font-display text-2xl text-[#F5F1EA]">
              Planning a Project in Varanasi?
            </h2>
            <p className="text-sm text-[#B7B0A4]">
              Get an itemized BOQ estimate or schedule a free site visit with our studio.
            </p>
          </div>
          <div className="flex flex-wrap gap-3 shrink-0">
            <a
              href={buildWhatsAppUrl(`Namaste, I read "${post.title}" and want to discuss my home in Varanasi.`)}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackWhatsAppClick(`blog_${post.slug}`)}
              className="inline-flex items-center gap-2 px-5 py-3 bg-[#C8A15B] text-[#0E0E10] font-semibold text-sm rounded-md"
            >
              <span>WhatsApp Studio</span>
              <ArrowUpRight className="w-4 h-4" />
            </a>
            <Link
              to="/cost-estimator"
              className="inline-flex items-center gap-2 px-5 py-3 border border-[#F5F1EA]/25 text-[#F5F1EA] text-sm rounded-md hover:border-[#C8A15B]"
            >
              <span>Cost Estimator</span>
            </Link>
          </div>
        </div>

        {/* Related Posts */}
        {related.length > 0 && (
          <section className="pt-8 border-t border-[#F5F1EA]/10 space-y-5">
            <h2 className="font-display text-2xl text-[#F5F1EA]">Related Guides</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {related.map((rel) => (
                <Link
                  key={rel.slug}
                  to={`/blog/${rel.slug}`}
                  className="p-5 rounded-lg bg-[#151519] border border-[#F5F1EA]/10 hover:border-[#C8A15B]/45 space-y-2"
                >
                  <p className="text-xs text-[#C8A15B]">
                    {rel.category} · {rel.readingTime}
                  </p>
                  <h3 className="font-display text-lg text-[#F5F1EA]">{rel.title}</h3>
                </Link>
              ))}
            </div>
          </section>
        )}
      </div>
    </article>
  );
}
