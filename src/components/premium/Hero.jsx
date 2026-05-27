import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Shield, Users, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();

  const yRange = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useSpring(yRange, { stiffness: 400, damping: 40 });

  const slides = [
    {
      title: 'Future-ready support for ambitious learners',
      highlight: 'Your college admissions journey starts with the right support.',
      description: 'We help school students prepare strong resumes, essays, applications and interviews for top liberal colleges like Ashoka, Azim Premji and beyond.',
      image: 'https://images.unsplash.com/photo-1520697222861-972e7d38de45?auto=format&fit=crop&q=80&w=1200',
      metrics: [
        { value: '1K+', label: 'Profiles reviewed' },
        { value: '95%', label: 'Counselling satisfaction' },
        { value: '500+', label: 'Guidance sessions delivered' }
      ]
    },
    {
      title: 'A trusted pathway from hometown to higher opportunities',
      highlight: 'Mentorship for students aiming at liberal arts, science, and scholarship success.',
      description: 'Find personalized career counselling, resume building, interview coaching and college application strategy for ambitious learners.',
      image: 'https://images.unsplash.com/photo-1531091656535-3d5dc26e6b84?auto=format&fit=crop&q=80&w=1200',
      metrics: [
        { value: '200+', label: 'Admissions coaching hours' },
        { value: '98%', label: 'Parent trust score' },
        { value: '150+', label: 'Scholarship matches' }
      ]
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);
    return () => clearInterval(timer);
  }, [slides.length]);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-[#F8FAFC]">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-[120px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-red-500/5 rounded-full blur-[120px]" />
      </div>

      <motion.div
        style={{ opacity, y: scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left Content */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg mb-8">
              <div className="w-1.5 h-1.5 bg-[#0d3862] rounded-full"></div>
              <span className="text-[#0d3862] text-[10px] font-bold uppercase tracking-[0.2em]">Excellence in Liberal Arts & Sciences</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-6xl lg:text-7xl font-bold text-[#0d3862] mb-6 leading-tight tracking-tight"
            >
              {slides[currentSlide].highlight}
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-600 mb-10 leading-relaxed max-w-2xl"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-4 mb-12 justify-center lg:justify-start">
              <Link
                to="/contact"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#911116] px-10 py-4 text-white font-bold shadow-xl hover:bg-[#7a0f16] transition-all"
              >
                Book Free Career Session
                <ArrowRight className="w-4 h-4" />
              </Link>

              <Link
                to="/careers"
                className="inline-flex items-center justify-center gap-3 rounded-full border border-slate-300 bg-white px-10 py-4 text-[#0d3862] font-bold hover:bg-slate-50 transition-all"
              >
                Explore Careers
                <ArrowRight className="w-4 h-4" />
              </Link>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="grid gap-4 sm:grid-cols-3">
              {slides[currentSlide].metrics.map((metric) => (
                <div key={metric.label} className="rounded-3xl bg-white/90 border border-slate-200 p-5 text-center shadow-sm">
                  <div className="text-3xl font-serif font-bold text-[#0d3862]">{metric.value}</div>
                  <p className="mt-3 text-sm text-slate-500 uppercase tracking-[0.2em] font-semibold">{metric.label}</p>
                </div>
              ))}
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Image */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-2xl overflow-hidden shadow-xl border border-slate-100"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-[360px] sm:h-[420px] md:h-[520px] xl:h-[600px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent"></div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="hidden lg:flex absolute -top-6 -right-6 px-6 py-4 bg-white rounded-xl shadow-lg border border-slate-100 flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-blue-50 rounded-lg flex items-center justify-center text-[#0d3862]">
                  <Users size={20} />
                </div>
                <div>
                  <div className="text-lg font-bold text-[#0d3862]">{slides[currentSlide].metrics[0].value}</div>
                  <div className="text-[9px] font-bold text-slate-500 uppercase tracking-wider">{slides[currentSlide].metrics[0].label}</div>
                </div>
              </motion.div>

              <motion.div
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 2 }}
                className="hidden lg:flex absolute -bottom-6 -left-6 px-6 py-4 bg-[#911116] rounded-xl shadow-lg flex items-center gap-4"
              >
                <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center text-white">
                  <Shield size={20} />
                </div>
                <div>
                  <div className="text-lg font-bold text-white">{slides[currentSlide].metrics[1].value}</div>
                  <div className="text-[9px] font-bold text-white/70 uppercase tracking-wider">{slides[currentSlide].metrics[1].label}</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-4 mt-16">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-500 ${currentSlide === index
                ? 'w-12 bg-[#0d3862]'
                : 'w-6 bg-slate-200 hover:bg-slate-300'
                }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2"
      >
        <ChevronDown className="w-5 h-5 text-[#0d3862] opacity-50" />
      </motion.div>
    </section>
  );
};

export default Hero;
