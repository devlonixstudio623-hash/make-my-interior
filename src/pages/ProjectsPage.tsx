import { useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { Search, X } from 'lucide-react';
import {
  PROJECT_CATEGORIES,
  PROJECTS_CONTENT,
  type ProjectCategory,
} from '../content/projects';
import { SeoHead } from '../components/SeoHead';
import { SiteImage } from '../components/SiteImage';

export function ProjectsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const initialCat = searchParams.get('category') as ProjectCategory | null;
  const [selectedCategory, setSelectedCategory] = useState<ProjectCategory | 'All'>(
    initialCat && PROJECT_CATEGORIES.includes(initialCat) ? initialCat : 'All'
  );
  const [query, setQuery] = useState('');

  const handleCategoryChange = (cat: ProjectCategory | 'All') => {
    setSelectedCategory(cat);
    if (cat === 'All') {
      searchParams.delete('category');
      setSearchParams(searchParams);
    } else {
      setSearchParams({ category: cat });
    }
  };

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return PROJECTS_CONTENT.filter((proj) => {
      const catMatch = selectedCategory === 'All' || proj.category === selectedCategory;
      const queryMatch =
        !q ||
        proj.title.toLowerCase().includes(q) ||
        proj.location.toLowerCase().includes(q) ||
        proj.category.toLowerCase().includes(q) ||
        proj.summary.toLowerCase().includes(q);
      return catMatch && queryMatch;
    });
  }, [selectedCategory, query]);

  return (
    <div className="pt-28 pb-20">
      <SeoHead
        title="Projects & Case Studies in Varanasi | Make My Interior"
        description="Browse completed living rooms, modular kitchens, master bedrooms, pooja rooms, boutique cafes, and civil construction builds across Varanasi."
        path="/projects"
        breadcrumbs={[
          { name: 'Home', path: '/' },
          { name: 'Projects', path: '/projects' },
        ]}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6">
          <div className="max-w-2xl space-y-3">
            <p className="text-xs uppercase tracking-[0.2em] text-[#C8A15B]">
              Portfolio &amp; Case Studies
            </p>
            <h1 className="font-display text-4xl sm:text-5xl text-[#F5F1EA]">
              Spaces Crafted Across Varanasi
            </h1>
            <p className="text-sm sm:text-base text-[#B7B0A4]">
              Filter by room or construction type, inspect before-and-after transformations, and review transparent timeline and budget ranges.
            </p>
          </div>

          {/* Search Input */}
          <div className="relative w-full lg:w-80">
            <label htmlFor="project-search" className="sr-only">
              Search projects by location, room, or title
            </label>
            <Search className="w-4 h-4 text-[#847D72] absolute left-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
            <input
              id="project-search"
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search Sigra, Kitchen, Villa..."
              className="w-full pl-10 pr-9 py-2.5 bg-[#151519] border border-[#F5F1EA]/15 rounded-md text-sm text-[#F5F1EA] placeholder:text-[#847D72] focus:outline-none focus:border-[#C8A15B]"
            />
            {query && (
              <button
                type="button"
                onClick={() => setQuery('')}
                aria-label="Clear search query"
                className="absolute right-2.5 top-1/2 -translate-y-1/2 text-[#847D72] hover:text-[#F5F1EA]"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>
        </div>

        {/* Interactive Filter Tabs */}
        <div className="flex flex-wrap items-center gap-2 pb-2 border-b border-[#F5F1EA]/10">
          <button
            type="button"
            onClick={() => handleCategoryChange('All')}
            className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
              selectedCategory === 'All'
                ? 'bg-[#C8A15B] text-[#0E0E10]'
                : 'bg-[#151519] text-[#B7B0A4] border border-[#F5F1EA]/10 hover:text-[#F5F1EA]'
            }`}
          >
            All Projects ({PROJECTS_CONTENT.length})
          </button>
          {PROJECT_CATEGORIES.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => handleCategoryChange(cat)}
              className={`px-3.5 py-2 text-xs font-medium rounded-md transition-colors whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-[#C8A15B] text-[#0E0E10]'
                  : 'bg-[#151519] text-[#B7B0A4] border border-[#F5F1EA]/10 hover:text-[#F5F1EA]'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {filtered.length === 0 ? (
          <div className="p-12 text-center rounded-lg border border-[#F5F1EA]/10 bg-[#151519] space-y-4">
            <p className="font-display text-2xl text-[#F5F1EA]">No matching projects found</p>
            <p className="text-sm text-[#B7B0A4]">
              Try resetting your search filter or browse all 8 sample Varanasi case studies.
            </p>
            <button
              type="button"
              onClick={() => {
                setQuery('');
                handleCategoryChange('All');
              }}
              className="px-5 py-2.5 bg-[#C8A15B] text-[#0E0E10] text-sm font-semibold rounded-md"
            >
              Reset Filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((project, index) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className={`led-card-hover group rounded-lg bg-[#151519] border border-[#F5F1EA]/10 hover:border-[#C8A15B]/50 overflow-hidden flex flex-col ${
                  index === 0 && selectedCategory === 'All' && !query ? 'md:col-span-2 lg:col-span-2' : ''
                }`}
              >
                <div
                  className={`overflow-hidden bg-[#1C1C22] ${
                    index === 0 && selectedCategory === 'All' && !query
                      ? 'aspect-[16/9]'
                      : 'aspect-[4/3]'
                  }`}
                >
                  <SiteImage
                    src={project.heroImage}
                    alt={`${project.title} in ${project.location}`}
                    className="w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
                <div className="p-6 space-y-2.5 flex-1 flex flex-col justify-between">
                  <div className="space-y-2">
                    <div className="flex flex-wrap items-center gap-2 text-xs text-[#B7B0A4]">
                      <span className="text-[#C8A15B]">{project.category}</span>
                      <span aria-hidden="true">·</span>
                      <span>{project.location}</span>
                      <span aria-hidden="true">·</span>
                      <span className="tabular-nums">{project.area}</span>
                    </div>
                    <h2 className="font-display text-2xl text-[#F5F1EA] group-hover:text-[#C8A15B] transition-colors">
                      {project.title}
                    </h2>
                    <p className="text-sm text-[#B7B0A4] line-clamp-2">{project.summary}</p>
                  </div>
                  <div className="pt-3 border-t border-[#F5F1EA]/8 flex items-center justify-between text-xs text-[#847D72]">
                    <span>{project.budgetRange}</span>
                    <span className="text-[#C8A15B] font-medium">Read Case Study →</span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
