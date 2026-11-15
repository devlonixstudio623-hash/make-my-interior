import { Link } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';
import { BLOG_POSTS } from '../content/blog';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

export function BlogPage() {
  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Varanasi Interior & Construction Guides (Blog) | Make My Interior"
        description="Practical guides on interior design cost in Varanasi, modular kitchens for Indian homes, Vastu bedroom tips, and false ceiling LED designs."
        path="/blog"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Blog', path: '/blog' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        <div className="max-w-3xl space-y-3">
          <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
            Design &amp; Budget Journal
          </p>
          <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
            Varanasi Homebuilding &amp; Interior Guides
          </h1>
          <p className="text-base text-[#B7B0A4]">
            Honest pricing breakdowns, material comparisons, and Vastu planning notes written for homeowners in Uttar Pradesh.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {BLOG_POSTS.map((post) => (
            <Link
              key={post.slug}
              to={`/blog/${post.slug}`}
              className="led-card-hover group rounded-lg bg-[#151519] border border-[#F5F1EA]/10 hover:border-[#C8A15B]/50 overflow-hidden flex flex-col"
            >
              <div className="aspect-[16/9] overflow-hidden bg-[#1C1C22]">
                <SiteImage
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                />
              </div>
              <div className="p-6 sm:p-7 flex-1 flex flex-col justify-between space-y-4">
                <div className="space-y-2.5">
                  <div className="flex flex-wrap items-center gap-2 text-xs text-[#B7B0A4]">
                    <span className="text-[#C8A15B]">{post.category}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.publishedDate}</span>
                    <span aria-hidden="true">·</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="font-display text-2xl text-[#F5F1EA] group-hover:text-[#C8A15B] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-sm text-[#B7B0A4] leading-relaxed">{post.excerpt}</p>
                </div>
                <span className="inline-flex items-center gap-1.5 text-sm font-medium text-[#C8A15B]">
                  <span>Read Guide</span>
                  <ArrowRight className="w-4 h-4" />
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
