import { useState, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { ArrowRight, Play, Shield, TrendingUp, Users, Star, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = ({ stats }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const { scrollY } = useScroll();

  const displayStats = {
    students: stats?.students || '50K+',
    events: stats?.events || '1.2K+',
    schools: stats?.schools || '500+'
  };

  const yRange = useTransform(scrollY, [0, 300], [0, 50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  const scale = useSpring(yRange, { stiffness: 400, damping: 40 });

  const slides = [
    {
      title: "India's Premier",
      highlight: "Competition Platform",
      description: "The official gateway for students to discover verified competitions, build academic portfolios, and earn national recognition.",
      image: "https://images.unsplash.com/photo-1523580494863-6f3031224c94?auto=format&fit=crop&q=80&w=1200",
      stats: displayStats
    },
    {
      title: "100% Verified",
      highlight: "Academic Events",
      description: "We rigorously vet every competition to ensure safety, authenticity, and value for students and schools across India.",
      image: "https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&q=80&w=1200",
      stats: displayStats
    },
    {
      title: "Build Your",
      highlight: "Digital Profile",
      description: "Create a verified track record of your achievements, skills, and participation to stand out for college admissions.",
      image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1200",
      stats: displayStats
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
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-navy-950">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-b from-[#020617] to-[#0f172a] opacity-90" />
        <div className="absolute top-[-20%] right-[-10%] w-[600px] h-[600px] bg-amber-900/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-900/10 rounded-full blur-[100px]" />
      </div>

      {/* Grid Pattern */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' xmlns='http://www.w3.org/2000/svg'%3E%3Cdefs%3E%3Cpattern id='grid' width='60' height='60' patternUnits='userSpaceOnUse'%3E%3Cpath d='M 60 0 L 0 0 0 60' fill='none' stroke='white' stroke-width='0.5' opacity='0.1'/%3E%3C/pattern%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23grid)' /%3E%3C/svg%3E")`
        }}
      />

      <motion.div
        style={{ opacity, y: scale }}
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20"
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
            <motion.div variants={itemVariants} className="inline-flex items-center space-x-2 px-4 py-2 bg-amber-500/10 border border-amber-500/20 rounded-xl mb-8">
              <div className="w-2 h-2 bg-amber-500 rounded-full animate-pulse"></div>
              <span className="text-amber-500 text-[10px] font-black uppercase tracking-widest">National Academic Hub</span>
            </motion.div>

            {/* Main Heading */}
            <motion.h1
              variants={itemVariants}
              className="font-display text-4xl md:text-7xl font-black text-white mb-6 leading-tight shrink-0"
            >
              {slides[currentSlide].title}{' '}
              <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent italic block sm:inline">
                {slides[currentSlide].highlight}
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              variants={itemVariants}
              className="text-lg md:text-xl text-slate-300 mb-10 leading-relaxed max-w-2xl font-medium"
            >
              {slides[currentSlide].description}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div variants={itemVariants} className="flex flex-col sm:flex-row gap-6 mb-12">
              <Link
                to="/events"
                className="btn-premium group relative overflow-hidden px-10 py-5 text-lg"
              >
                <span className="relative z-10 flex items-center justify-center gap-3">
                  Discover Opportunities
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-300" />
                </span>
              </Link>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl text-white font-bold hover:bg-white/10 transition-all duration-300 flex items-center justify-center gap-3"
              >
                <Play className="w-5 h-5 text-amber-500" />
                University Guide
              </motion.button>
            </motion.div>

            {/* Stats */}
            <motion.div variants={itemVariants} className="flex items-center gap-8">
              <div className="flex -space-x-4">
                {[1, 2, 3, 4, 5].map((i) => (
                  <div
                    key={i}
                    className="w-12 h-12 rounded-2xl border-2 border-[#020617] overflow-hidden shadow-xl"
                  >
                    <img
                      src={`https://i.pravatar.cc/150?u=${i + 20}`}
                      alt={`User ${i}`}
                      className="w-full h-full object-cover"
                    />
                  </div>
                ))}
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-r from-amber-500 to-amber-600 border-2 border-[#020617] flex items-center justify-center text-navy-950 text-xs font-black shadow-xl">
                  +20k
                </div>
              </div>
              <div>
                <div className="flex items-center gap-1 mb-1">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className="w-4 h-4 text-amber-500 fill-current" />
                  ))}
                </div>
                <p className="text-slate-400 text-sm font-bold leading-relaxed uppercase tracking-widest">Trusted by 500+ Schools</p>
              </div>
            </motion.div>
          </motion.div>

          {/* Right Content - Image */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
            className="relative"
          >
            <div className="relative z-10">
              {/* Main Image */}
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8 }}
                className="relative rounded-[2.5rem] overflow-hidden shadow-2xl border border-white/10"
              >
                <img
                  src={slides[currentSlide].image}
                  alt={slides[currentSlide].title}
                  className="w-full h-[500px] object-cover"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900/50 to-transparent"></div>
              </motion.div>

              {/* Floating Cards */}
              <motion.div
                animate={{
                  y: [0, -20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
                className="absolute -top-8 -right-8 w-32 h-32 bg-gradient-to-br from-amber-500 to-orange-600 rounded-3xl shadow-2xl flex items-center justify-center"
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-black">{slides[currentSlide].stats.students}</div>
                  <div className="text-xs font-black uppercase tracking-widest">Students</div>
                </div>
              </motion.div>

              <motion.div
                animate={{
                  y: [0, 20, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: 1,
                }}
                className="absolute -bottom-8 -left-8 w-32 h-32 bg-gradient-to-br from-blue-600 to-blue-700 rounded-3xl shadow-2xl flex items-center justify-center border border-white/10"
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-black">{slides[currentSlide].stats.events}</div>
                  <div className="text-xs font-black uppercase tracking-widest">Events</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 mt-16">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`h-2 rounded-full transition-all duration-500 ${currentSlide === index
                ? 'w-12 bg-amber-500'
                : 'w-2 bg-white/20 hover:bg-white/40'
                }`}
            />
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/50"
      >
        <ChevronDown className="w-6 h-6 text-amber-500" />
      </motion.div>
    </section>
  );
};

export default Hero;
