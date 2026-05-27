import { useState, useEffect, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  ArrowUp,
  ArrowRight,
  Search,
  Briefcase,
  FileText,
  Award,
  ShieldCheck,
  Globe2,
  HeartPulse,
  Users,
  CalendarDays,
  MessageCircle,
  MonitorPlay,
  Rocket,
  ChevronRight
} from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Hero from '../components/premium/Hero';
import FeatureCards from '../components/premium/FeatureCards';
import Testimonials from '../components/premium/Testimonials';
import ContactForm from '../components/premium/ContactForm';
import Footer from '../components/premium/Footer';

const PremiumLandingPage = () => {
  const [showBackToTop, setShowBackToTop] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [opportunityFilter, setOpportunityFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const opportunityFilters = ['All', 'College Counseling', 'Resume Support', 'Scholarships', 'Mentorship', 'Interview Prep', 'Study Abroad'];

  const opportunities = [
    {
      id: 1,
      category: 'College Counseling',
      title: 'Shortlist Strategy for Ashoka & Azim Premji',
      description: 'Identify the best fit colleges, courses, and application paths based on your strengths and goals.',
      tag: 'College Counseling'
    },
    {
      id: 2,
      category: 'Resume Support',
      title: 'Resume & Activity Portfolio Clinic',
      description: 'Build a compelling profile with achievements, projects, and leadership stories for admissions essays.',
      tag: 'Resume Support'
    },
    {
      id: 3,
      category: 'Scholarships',
      title: 'Scholarship Matchmaking',
      description: 'Find scholarships suited for liberal arts, merit scholarships, and need-based awards.',
      tag: 'Scholarships'
    },
    {
      id: 4,
      category: 'Mentorship',
      title: 'Mentor-Led College Readiness',
      description: 'Get personalised coaching from mentors who have successfully guided students into top colleges.',
      tag: 'Mentorship'
    },
    {
      id: 5,
      category: 'Interview Prep',
      title: 'Mock Interviews for Admissions Panels',
      description: 'Practice with real college interview scenarios and get feedback on communication and confidence.',
      tag: 'Interview Prep'
    },
    {
      id: 6,
      category: 'Study Abroad',
      title: 'Liberal Arts & Global Pathways',
      description: 'Prepare for international applications with essay review, visa guidance, and scholarship support.',
      tag: 'Study Abroad'
    }
  ];

  const journeySteps = [
    {
      title: 'Discover Yourself',
      description: 'Map strengths, interests, and long-term goals with guided self-assessments.',
      icon: Briefcase
    },
    {
      title: 'Build Your Profile',
      description: 'Create a standout application portfolio with achievements, essays, and certificates.',
      icon: FileText
    },
    {
      title: 'Apply Smartly',
      description: 'Target the right scholarships, colleges, and fellowships for your background.',
      icon: Globe2
    },
    {
      title: 'Get Mentored',
      description: 'Work with verified counsellors and peer mentors for every milestone.',
      icon: Users
    },
    {
      title: 'Achieve Your Goals',
      description: 'Celebrate admissions, awards, and confidence gains from a clear success plan.',
      icon: Rocket
    }
  ];

  const communityFeatures = [
    {
      title: 'Peer Mentorship',
      description: 'Learn from students who have navigated the same challenges successfully.',
      icon: Users
    },
    {
      title: 'Live Sessions',
      description: 'Attend expert-led workshops on career choices, applications, and wellbeing.',
      icon: MonitorPlay
    },
    {
      title: 'Discussion Groups',
      description: 'Join topic-based communities for college, fellowships, and competition preparation.',
      icon: MessageCircle
    },
    {
      title: 'Webinar Calendar',
      description: 'Access weekly events that bring together experts, alumni, and counselors.',
      icon: CalendarDays
    },
    {
      title: 'Networking Support',
      description: 'Build a support network of mentors, peers, and academic ambassadors.',
      icon: HeartPulse
    }
  ];

  const blogPosts = [
    {
      title: 'How I Got Into My Dream Liberal Arts College From A Small Town',
      category: 'College Guidance'
    },
    {
      title: 'Resume Lessons That Helped Me Stand Out To Ashoka',
      category: 'Application Tips'
    },
    {
      title: 'Preparing for Azim Premji Interview & Essay Rounds',
      category: 'Interview Prep'
    },
    {
      title: 'Balancing Board Exams With College Applications',
      category: 'Wellbeing'
    }
  ];

  const pricingPlans = [
    {
      title: 'Free Community',
      price: '₹0',
      features: ['Monthly group webinars', 'Mentorship circle access', 'Opportunity alerts'],
      highlight: false
    },
    {
      title: 'Premium Mentorship',
      price: '₹4,999/mo',
      features: ['1:1 career counselling', 'Application review', 'Scholarship guidance', 'Wellness check-ins'],
      highlight: true
    },
    {
      title: 'Application Support',
      price: '₹12,999',
      features: ['College & fellowship packages', 'SOP + resume building', 'Interview prep', 'Submission tracking'],
      highlight: false
    }
  ];

  const parentTrustPoints = [
    'Safety-first mentorship vetted by educators',
    'Transparent pricing with no hidden costs',
    'Verified counsellors with real student outcomes',
    'Secure communication and privacy for families',
    'Affordable support designed for aspirational learners'
  ];

  const filteredOpportunities = useMemo(() => {
    return opportunities.filter((item) => {
      const matchesFilter = opportunityFilter === 'All' || item.category === opportunityFilter;
      const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase());
      return matchesFilter && matchesSearch;
    });
  }, [opportunityFilter, searchTerm, opportunities]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 900);

    const handleScroll = () => {
      setShowBackToTop(window.scrollY > 500);
    };

    window.addEventListener('scroll', handleScroll);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-navy-900 transition-colors duration-300">
      <CareerGuidanceNavbar />

      <main>
        <Hero />
        <FeatureCards />

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[#911116] uppercase tracking-[0.25em] text-xs font-bold mb-4">Career roadmap</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0d3862] tracking-tight">Student Journey</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
                A step-by-step pathway for ambitious students from small towns to navigate every milestone with clarity and confidence.
              </p>
            </div>

            <div className="grid gap-6 lg:grid-cols-5">
              {journeySteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={step.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="p-6 rounded-3xl border border-slate-200 bg-slate-50 shadow-sm"
                  >
                    <div className="w-12 h-12 rounded-2xl bg-[#0d3862] text-white flex items-center justify-center mb-6 shadow-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-sm uppercase tracking-[0.25em] text-slate-400">Step {index + 1}</span>
                    <h3 className="mt-4 text-xl font-serif font-bold text-[#0d3862]">{step.title}</h3>
                    <p className="mt-3 text-slate-600 text-sm leading-relaxed">{step.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <Testimonials />

        <section className="py-24 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex flex-col lg:flex-row items-start justify-between gap-8 mb-12">
              <div>
                <p className="text-[#911116] uppercase tracking-[0.25em] text-xs font-bold mb-4">Guidance finder</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0d3862]">Find the right support for your college journey</h2>
                <p className="mt-4 text-slate-600 max-w-2xl leading-relaxed">
                  Filter mentorship, resume support, counselling, scholarship guidance and interview prep for top liberal colleges and competitive application tracks.
                </p>
                <p className="mt-4 text-sm text-slate-500">
                  Showing <span className="font-semibold text-[#0d3862]">{filteredOpportunities.length}</span> {opportunityFilter === 'All' ? 'active' : opportunityFilter.toLowerCase()} support items.
                </p>
              </div>

              <div className="w-full lg:w-auto flex flex-col sm:flex-row gap-3">
                <div className="relative w-full sm:w-[320px]">
                  <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    type="search"
                    placeholder="Search opportunities"
                    className="w-full pl-12 pr-4 py-4 rounded-2xl border border-slate-200 bg-white focus:border-[#911116] outline-none"
                  />
                </div>
                <div className="flex flex-wrap gap-2 overflow-x-auto pb-1">
                  {opportunityFilters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => setOpportunityFilter(filter)}
                      className={`px-4 py-3 rounded-2xl text-sm font-semibold transition-all whitespace-nowrap ${opportunityFilter === filter ? 'bg-[#0d3862] text-white' : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'}`}
                    >
                      {filter}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {filteredOpportunities.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="group rounded-[2rem] border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all"
                >
                  <div className="flex items-center justify-between mb-6">
                    <div className="text-xs uppercase tracking-[0.3em] text-[#911116] font-bold">{item.category}</div>
                    <div className="rounded-2xl bg-[#fef3c7] px-3 py-1 text-[#92400e] text-[11px] uppercase font-semibold tracking-[0.2em]">{item.tag}</div>
                  </div>
                  <h3 className="text-2xl font-serif font-bold text-[#0d3862] mb-4">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed mb-6">{item.description}</p>
                  <button className="inline-flex items-center gap-2 text-[#0d3862] font-semibold hover:text-[#911116] transition-all">
                    Explore
                    <ArrowRight className="w-4 h-4" />
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[#911116] uppercase tracking-[0.25em] text-xs font-bold mb-4">Community</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0d3862]">A community built for every ambition</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Support from peers, students, and verified mentors that helps you stay motivated through every application season.
              </p>
            </div>

            <div className="grid gap-6 grid-cols-1 md:grid-cols-2 lg:grid-cols-5">
              {communityFeatures.map((item, index) => {
                const Icon = item.icon;
                return (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.08 }}
                    className="p-6 rounded-3xl border border-slate-200 bg-[#f8fafc] shadow-sm text-center"
                  >
                    <div className="mx-auto mb-5 inline-flex h-14 w-14 items-center justify-center rounded-3xl bg-[#0d3862] text-white shadow-lg">
                      <Icon className="w-6 h-6" />
                    </div>
                    <h3 className="text-xl font-serif font-bold text-[#0d3862] mb-3">{item.title}</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">{item.description}</p>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[#911116] uppercase tracking-[0.25em] text-xs font-bold mb-4">Blog & stories</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0d3862]">Career guidance content for students and parents</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Read real stories, practical advice, and mental wellness tips designed for India’s brightest students.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {blogPosts.map((article) => (
                <motion.article
                  key={article.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4 }}
                  className="rounded-3xl border border-slate-200 bg-white p-8 shadow-sm hover:shadow-xl transition-all"
                >
                  <div className="text-xs uppercase tracking-[0.3em] font-bold text-[#911116] mb-4">{article.category}</div>
                  <h3 className="text-xl font-serif font-bold text-[#0d3862] mb-4">{article.title}</h3>
                  <p className="text-slate-600 text-sm leading-relaxed mb-6">A concise, emotional take on how the right guidance can help students apply with confidence and clarity.</p>
                  <button className="inline-flex items-center gap-2 text-[#0d3862] font-semibold hover:text-[#911116] transition-all">
                    Read story
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </motion.article>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid gap-10 lg:grid-cols-2 items-start">
              <div>
                <p className="text-[#911116] uppercase tracking-[0.25em] text-xs font-bold mb-4">Parents trust</p>
                <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0d3862]">Trusted support for families</h2>
                <p className="mt-4 text-slate-600 max-w-xl leading-relaxed">
                  We provide the safety, transparency, and mentorship quality Indian parents expect, with affordable plans and verified student outcomes.
                </p>
              </div>

              <div className="grid gap-4">
                {parentTrustPoints.map((point) => (
                  <motion.div
                    key={point}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    className="rounded-3xl border border-slate-200 bg-[#f8fafc] p-8 shadow-sm"
                  >
                    <div className="mb-4 inline-flex h-12 w-12 items-center justify-center rounded-3xl bg-[#0d3862] text-white shadow-lg">
                      <ShieldCheck className="w-6 h-6" />
                    </div>
                    <p className="text-slate-700 font-semibold leading-relaxed">{point}</p>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="py-24 bg-[#f8fafc]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
              <p className="text-[#911116] uppercase tracking-[0.25em] text-xs font-bold mb-4">Pricing</p>
              <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0d3862]">Transparent plans built for every stage</h2>
              <p className="mt-4 text-slate-600 max-w-2xl mx-auto leading-relaxed">
                Choose a plan that fits your goals and budget, whether you’re just exploring or ready for full application support.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-3">
              {pricingPlans.map((plan) => (
                <motion.div
                  key={plan.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  className={`rounded-[2rem] border p-8 shadow-sm transition-all ${plan.highlight ? 'border-[#911116] bg-white shadow-xl' : 'border-slate-200 bg-[#ffffff]'}`}
                >
                  <div className="mb-6">
                    <div className="text-xs uppercase tracking-[0.3em] text-[#911116] font-bold mb-3">{plan.title}</div>
                    <div className="text-5xl font-serif font-bold text-[#0d3862]">{plan.price}</div>
                  </div>
                  <ul className="space-y-4 mb-8 text-slate-600">
                    {plan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-3">
                        <span className="mt-1 inline-flex h-3 w-3 rounded-full bg-[#911116]" />
                        <span>{feature}</span>
                      </li>
                    ))}
                  </ul>
                  <button className={`w-full rounded-3xl px-6 py-4 text-sm font-bold uppercase tracking-[0.2em] transition-all ${plan.highlight ? 'bg-[#911116] text-white hover:bg-[#7a0f16]' : 'bg-white border border-slate-200 text-[#0d3862] hover:bg-slate-50'}`}>
                    {plan.highlight ? 'Get Started' : 'Choose Plan'}
                  </button>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className="py-24 bg-white">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <div className="mb-10">
              <p className="text-[#911116] uppercase tracking-[0.25em] text-xs font-bold mb-4">Final call</p>
              <h2 className="font-serif text-5xl md:text-6xl font-bold text-[#0d3862] leading-tight">
                Your background should not decide your future.
              </h2>
              <p className="mt-6 text-slate-600 text-lg leading-relaxed max-w-3xl mx-auto">
                Join the network that helps students from every community turn ambition into admissions, awards, and real-world outcomes.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <button className="inline-flex items-center justify-center gap-2 rounded-full bg-[#911116] px-8 py-4 text-white font-bold shadow-xl hover:bg-[#7a0f16] transition-all">
                Book Free Career Session
                <ArrowRight className="w-4 h-4" />
              </button>
              <button className="inline-flex items-center justify-center gap-2 rounded-full border border-slate-200 bg-white px-8 py-4 text-[#0d3862] font-bold hover:bg-slate-50 transition-all">
                Explore Opportunities
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </section>

        <ContactForm />
      </main>

      <Footer />

      <AnimatePresence>
        {showBackToTop && (
          <motion.button
            initial={{ opacity: 0, scale: 0 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0 }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={scrollToTop}
            className="fixed bottom-8 right-8 w-14 h-14 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-2xl flex items-center justify-center text-white shadow-2xl hover:shadow-emerald-500/40 transition-all duration-300 z-40"
            aria-label="Back to top"
          >
            <ArrowUp className="w-6 h-6" />
          </motion.button>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PremiumLandingPage;
