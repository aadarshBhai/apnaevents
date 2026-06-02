import { useState, useEffect, useMemo } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search, X, ArrowRight, Code, Stethoscope, Briefcase,
  Scale, Palette, Users, Zap, BookOpen, Award, Building2, GraduationCap
} from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

// ─── All searchable data ──────────────────────────────────────────────────────
const ALL_DATA = [
  // CAREERS
  { type: 'career', title: 'Software Engineer', desc: 'Build software products and systems', tags: ['engineering', 'tech', 'coding'], path: '/careers/engineering', icon: Code },
  { type: 'career', title: 'Data Scientist', desc: 'Analyse data and build AI/ML models', tags: ['engineering', 'ai', 'data'], path: '/careers/engineering', icon: Code },
  { type: 'career', title: 'AI/ML Engineer', desc: 'Design artificial intelligence systems', tags: ['engineering', 'ai', 'tech'], path: '/careers/engineering', icon: Code },
  { type: 'career', title: 'Doctor (MBBS)', desc: 'Diagnose and treat patients', tags: ['medical', 'healthcare', 'neet'], path: '/careers/medical', icon: Stethoscope },
  { type: 'career', title: 'Dentist', desc: 'Specialise in oral and dental care', tags: ['medical', 'healthcare'], path: '/careers/medical', icon: Stethoscope },
  { type: 'career', title: 'Chartered Accountant (CA)', desc: 'Expert in finance, tax and auditing', tags: ['commerce', 'finance', 'ca'], path: '/careers/commerce', icon: Briefcase },
  { type: 'career', title: 'Investment Banker', desc: 'Advise companies on financial deals', tags: ['commerce', 'finance', 'banking'], path: '/careers/commerce', icon: Briefcase },
  { type: 'career', title: 'Lawyer', desc: 'Represent clients in legal matters', tags: ['law', 'justice', 'clat'], path: '/careers/law', icon: Scale },
  { type: 'career', title: 'IAS Officer', desc: 'Serve in the Indian Administrative Service', tags: ['government', 'upsc', 'humanities'], path: '/careers/humanities', icon: Users },
  { type: 'career', title: 'Journalist', desc: 'Report news and tell important stories', tags: ['humanities', 'media', 'writing'], path: '/careers/humanities', icon: Users },
  { type: 'career', title: 'Graphic Designer', desc: 'Create visual designs for brands and media', tags: ['design', 'creative', 'art'], path: '/careers/design', icon: Palette },
  { type: 'career', title: 'UX/UI Designer', desc: 'Design user-friendly digital experiences', tags: ['design', 'tech', 'ux'], path: '/careers/design', icon: Palette },
  { type: 'career', title: 'Content Creator', desc: 'Create content on YouTube, Instagram & more', tags: ['modern', 'social media', 'creative'], path: '/careers/modern', icon: Zap },
  { type: 'career', title: 'Digital Marketer', desc: 'Promote brands online using digital channels', tags: ['modern', 'marketing', 'social media'], path: '/careers/modern', icon: Zap },
  { type: 'career', title: 'Startup Founder', desc: 'Build and scale your own company', tags: ['modern', 'entrepreneurship', 'business'], path: '/careers/modern', icon: Zap },
  { type: 'career', title: 'Psychologist', desc: 'Help people understand and improve mental health', tags: ['humanities', 'mental health', 'science'], path: '/careers/humanities', icon: Users },
  { type: 'career', title: 'Architect', desc: 'Design buildings and urban spaces', tags: ['design', 'engineering', 'nata'], path: '/careers/design', icon: Palette },
  { type: 'career', title: 'Pharmacist', desc: 'Dispense medicines and advise on health', tags: ['medical', 'healthcare', 'science'], path: '/careers/medical', icon: Stethoscope },

  // EXAMS
  { type: 'exam', title: 'JEE Main', desc: 'National entrance for B.Tech in NITs, IIITs & more', tags: ['engineering', 'science', 'math'], path: '/exams/jee', icon: BookOpen },
  { type: 'exam', title: 'JEE Advanced', desc: 'Gateway to IITs — top engineering colleges', tags: ['engineering', 'iit', 'science'], path: '/exams/jee', icon: BookOpen },
  { type: 'exam', title: 'NEET UG', desc: 'Medical entrance for MBBS and BDS seats', tags: ['medical', 'biology', 'healthcare'], path: '/exams/neet', icon: BookOpen },
  { type: 'exam', title: 'CUET', desc: 'Central Universities Entrance Test for UG programs', tags: ['central university', 'undergraduate', 'du'], path: '/exams/cuet', icon: BookOpen },
  { type: 'exam', title: 'CLAT', desc: 'Common Law Admission Test for NLUs', tags: ['law', 'nlu', 'justice'], path: '/exams/clat', icon: BookOpen },
  { type: 'exam', title: 'UPSC Civil Services', desc: 'Exam for IAS, IPS, IFS & other services', tags: ['government', 'ias', 'upsc', 'humanities'], path: '/exams/nda', icon: BookOpen },
  { type: 'exam', title: 'NIFT', desc: 'Fashion design entrance for NIFT colleges', tags: ['design', 'fashion', 'creative'], path: '/exams/nift', icon: BookOpen },
  { type: 'exam', title: 'UCEED', desc: 'Undergraduate design entrance for IITs', tags: ['design', 'iit', 'ux'], path: '/exams/uceed', icon: BookOpen },
  { type: 'exam', title: 'NDA', desc: 'National Defence Academy exam for defence careers', tags: ['defence', 'army', 'government'], path: '/exams/nda', icon: BookOpen },
  { type: 'exam', title: 'IPMAT', desc: 'Integrated Program in Management — IIM entry after 12th', tags: ['commerce', 'management', 'iim'], path: '/exams/ipmat', icon: BookOpen },
  { type: 'exam', title: 'SAT', desc: 'Scholastic Aptitude Test for US university admissions', tags: ['study abroad', 'us', 'international'], path: '/exams/sat', icon: BookOpen },

  // COLLEGES
  { type: 'college', title: 'IITs (Indian Institutes of Technology)', desc: 'Premier engineering institutions across India', tags: ['engineering', 'jee', 'tech'], path: '/colleges/engineering', icon: Building2 },
  { type: 'college', title: 'NITs (National Institutes of Technology)', desc: 'Top government engineering colleges', tags: ['engineering', 'jee', 'tech'], path: '/colleges/engineering', icon: Building2 },
  { type: 'college', title: 'AIIMS Delhi', desc: 'Top medical college in India', tags: ['medical', 'neet', 'healthcare'], path: '/colleges/medical', icon: Building2 },
  { type: 'college', title: 'NLUs (National Law Universities)', desc: 'Top law colleges admitting through CLAT', tags: ['law', 'clat', 'justice'], path: '/colleges/law', icon: Building2 },
  { type: 'college', title: 'SRCC Delhi', desc: 'Top commerce college under Delhi University', tags: ['commerce', 'finance', 'du'], path: '/colleges/commerce', icon: Building2 },
  { type: 'college', title: 'NIFT Colleges', desc: 'National Institute of Fashion Technology campuses', tags: ['design', 'fashion', 'nift'], path: '/colleges/engineering', icon: Building2 },
  { type: 'college', title: 'JNU (Jawaharlal Nehru University)', desc: 'Top university for humanities and social sciences', tags: ['humanities', 'research', 'social science'], path: '/colleges/government', icon: Building2 },
  { type: 'college', title: 'IIM (Indian Institutes of Management)', desc: 'Premier management institutions in India', tags: ['management', 'mba', 'commerce'], path: '/colleges/commerce', icon: Building2 },

  // SCHOLARSHIPS
  { type: 'scholarship', title: 'National Scholarship Portal (NSP)', desc: 'Government scholarships for students across all categories', tags: ['government', 'merit', 'sc/st', 'obc'], path: '/scholarships/government', icon: Award },
  { type: 'scholarship', title: 'Inspire Scholarship (DST)', desc: 'For science students in top 1% of board exams', tags: ['science', 'merit', 'government'], path: '/scholarships/merit', icon: Award },
  { type: 'scholarship', title: 'Tata Scholarship', desc: 'Private scholarship for meritorious students in need', tags: ['private', 'merit', 'tata'], path: '/scholarships/private', icon: Award },
  { type: 'scholarship', title: 'Reliance Foundation Scholarship', desc: 'For UG students from underprivileged backgrounds', tags: ['private', 'merit', 'need'], path: '/scholarships/private', icon: Award },
  { type: 'scholarship', title: 'Commonwealth Scholarships', desc: 'For Indian students to study in Commonwealth countries', tags: ['international', 'study abroad', 'commonwealth'], path: '/scholarships/international', icon: Award },
  { type: 'scholarship', title: 'Minority Scholarships (Central)', desc: 'For students from minority communities in India', tags: ['minority', 'government', 'need'], path: '/scholarships/minority', icon: Award },
];

const TYPE_CONFIG = {
  career:      { label: 'Career',      color: 'bg-purple-100 text-purple-700',  border: 'border-purple-200' },
  exam:        { label: 'Exam',        color: 'bg-blue-100 text-blue-700',      border: 'border-blue-200'   },
  college:     { label: 'College',     color: 'bg-green-100 text-green-700',    border: 'border-green-200'  },
  scholarship: { label: 'Scholarship', color: 'bg-amber-100 text-amber-700',    border: 'border-amber-200'  },
};

const FILTERS = ['all', 'career', 'exam', 'college', 'scholarship'];

export default function SearchPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(location.search);
  const initialQ = params.get('q') || '';

  const [query, setQuery] = useState(initialQ);
  const [activeFilter, setActiveFilter] = useState('all');

  // Sync URL → input when navigating via navbar search
  useEffect(() => {
    const q = new URLSearchParams(location.search).get('q') || '';
    setQuery(q);
  }, [location.search]);

  // Push query to URL
  const handleSearch = (e) => {
    e.preventDefault();
    if (query.trim()) {
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const results = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return [];
    return ALL_DATA.filter((item) => {
      const matchesFilter = activeFilter === 'all' || item.type === activeFilter;
      const matchesQuery =
        item.title.toLowerCase().includes(q) ||
        item.desc.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));
      return matchesFilter && matchesQuery;
    });
  }, [query, activeFilter]);

  const grouped = useMemo(() => {
    if (activeFilter !== 'all') return null;
    return FILTERS.slice(1).reduce((acc, type) => {
      const items = results.filter((r) => r.type === type);
      if (items.length) acc[type] = items;
      return acc;
    }, {});
  }, [results, activeFilter]);

  return (
    <div className="min-h-screen bg-[#f8f9fa]">
      <SEO
        title={query ? `Search: "${query}" | WeBridge` : 'Search | WeBridge'}
        description="Search careers, exams, colleges, and scholarships on WeBridge."
      />
      <CareerGuidanceNavbar />

      {/* ── Search Header ── */}
      <section className="bg-[#002D62] pt-32 pb-16 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/10 border border-white/20 rounded-full mb-4">
              <Search className="w-3.5 h-3.5 text-white/70" />
              <span className="text-white/70 text-xs font-semibold uppercase tracking-widest font-sans">Search</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4 font-serif">
              Find Your <span className="text-[#ff8c69]">Path</span>
            </h1>
            <p className="text-white/60 mb-8 font-sans">Search across careers, exams, colleges & scholarships</p>

            {/* Search Bar */}
            <form onSubmit={handleSearch} className="relative flex items-center bg-white rounded-2xl shadow-xl overflow-hidden">
              <Search className="absolute left-5 w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                autoFocus
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for JEE, Software Engineer, IIT, Scholarship..."
                className="flex-1 pl-14 pr-4 py-5 text-base text-gray-800 placeholder-gray-400 focus:outline-none font-sans bg-transparent"
              />
              {query && (
                <button type="button" onClick={() => setQuery('')} className="p-2 mr-2 text-gray-400 hover:text-gray-600">
                  <X className="w-4 h-4" />
                </button>
              )}
              <button
                type="submit"
                className="m-2 px-6 py-3 bg-[#002D62] text-white font-bold rounded-xl hover:bg-[#721c24] transition-all font-sans text-sm"
              >
                Search
              </button>
            </form>

            {/* Filter Pills */}
            <div className="flex flex-wrap justify-center gap-2 mt-5">
              {FILTERS.map((f) => (
                <button
                  key={f}
                  onClick={() => setActiveFilter(f)}
                  className={`px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider font-sans transition-all ${
                    activeFilter === f
                      ? 'bg-white text-[#002D62]'
                      : 'bg-white/10 text-white/70 hover:bg-white/20 hover:text-white'
                  }`}
                >
                  {f}
                </button>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Results ── */}
      <main className="max-w-5xl mx-auto px-4 py-12">
        {!query ? (
          /* Empty state - popular searches */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <GraduationCap className="w-16 h-16 text-gray-300 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-[#212529] mb-2 font-serif">What are you looking for?</h2>
            <p className="text-[#495057] mb-8 font-sans">Try searching for a career, exam, college or scholarship</p>
            <div className="flex flex-wrap gap-2 justify-center">
              {['JEE', 'NEET', 'IAS', 'Software Engineer', 'NIFT', 'Scholarship', 'IIT', 'CA', 'Content Creator', 'CLAT'].map((s) => (
                <button
                  key={s}
                  onClick={() => { setQuery(s); navigate(`/search?q=${encodeURIComponent(s)}`); }}
                  className="px-4 py-2 bg-white border border-gray-200 rounded-full text-sm font-semibold text-[#495057] hover:border-[#002D62] hover:text-[#002D62] transition-all font-sans shadow-sm"
                >
                  {s}
                </button>
              ))}
            </div>
          </motion.div>
        ) : results.length === 0 ? (
          /* No results */
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-center py-16">
            <div className="w-20 h-20 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h2 className="text-2xl font-bold text-[#212529] mb-2 font-serif">No results for "{query}"</h2>
            <p className="text-[#495057] mb-6 font-sans">Try different keywords or browse by category below</p>
            <div className="flex flex-wrap gap-3 justify-center">
              {['/careers', '/exams/jee', '/exams/neet', '/scholarships/government'].map((path, i) => (
                <Link key={i} to={path} className="px-5 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-semibold text-[#002D62] hover:bg-[#002D62] hover:text-white transition-all font-sans">
                  {['Browse Careers', 'JEE Guide', 'NEET Guide', 'Scholarships'][i]}
                </Link>
              ))}
            </div>
          </motion.div>
        ) : activeFilter === 'all' ? (
          /* Grouped results */
          <div className="space-y-10">
            <p className="text-[#495057] font-sans text-sm">
              <span className="font-bold text-[#212529]">{results.length} results</span> for "{query}"
            </p>
            {Object.entries(grouped).map(([type, items]) => (
              <motion.div key={type} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
                <div className="flex items-center gap-3 mb-4">
                  <span className={`px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${TYPE_CONFIG[type].color}`}>
                    {TYPE_CONFIG[type].label}s
                  </span>
                  <div className="h-px flex-1 bg-gray-200" />
                </div>
                <div className="grid sm:grid-cols-2 gap-3">
                  {items.map((item, i) => (
                    <ResultCard key={i} item={item} query={query} />
                  ))}
                </div>
              </motion.div>
            ))}
          </div>
        ) : (
          /* Flat filtered results */
          <div>
            <p className="text-[#495057] font-sans text-sm mb-6">
              <span className="font-bold text-[#212529]">{results.length} results</span> for "{query}"
            </p>
            <AnimatePresence>
              <div className="grid sm:grid-cols-2 gap-3">
                {results.map((item, i) => (
                  <motion.div key={i} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.04 }}>
                    <ResultCard item={item} query={query} />
                  </motion.div>
                ))}
              </div>
            </AnimatePresence>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}

function ResultCard({ item, query }) {
  const cfg = TYPE_CONFIG[item.type];
  const Icon = item.icon;

  // Highlight matched text
  const highlight = (text) => {
    if (!query) return text;
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
    const parts = text.split(regex);
    return parts.map((part, i) =>
      regex.test(part)
        ? <mark key={i} className="bg-yellow-200 text-yellow-900 rounded px-0.5">{part}</mark>
        : part
    );
  };

  return (
    <Link to={item.path}>
      <motion.div
        whileHover={{ y: -2, boxShadow: '0 8px 24px rgba(0,0,0,0.08)' }}
        className={`bg-white rounded-2xl p-5 border-2 ${cfg.border} hover:border-[#002D62] transition-all duration-200 flex items-start gap-4 group`}
      >
        <div className={`w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0 ${cfg.color}`}>
          <Icon className="w-5 h-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${cfg.color}`}>
              {cfg.label}
            </span>
          </div>
          <h3 className="font-bold text-[#212529] font-serif text-base leading-tight mb-1">
            {highlight(item.title)}
          </h3>
          <p className="text-[#495057] text-sm font-sans leading-snug">{highlight(item.desc)}</p>
        </div>
        <ArrowRight className="w-4 h-4 text-gray-300 group-hover:text-[#002D62] group-hover:translate-x-1 transition-all flex-shrink-0 mt-1" />
      </motion.div>
    </Link>
  );
}
