import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight, Award, Trophy } from 'lucide-react';
import { Link } from 'react-router-dom';

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isAutoPlay, setIsAutoPlay] = useState(true);

  const testimonials = [
    {
      id: 1,
      name: "Priya Sharma",
      role: "Class 12 Student",
      school: "Delhi Public School",
      avatar: "https://i.pravatar.cc/150?u=priya",
      content: "ApnaEvents transformed my academic journey. I've participated in 8 national competitions and earned certificates that helped me secure admission at IIT Delhi. The platform's verification process gives parents complete peace of mind.",
      rating: 5,
      achievement: "IIT Delhi Admit"
    },
    {
      id: 2,
      name: "Rahul Verma",
      role: "Event Organizer",
      school: "National Science Olympiad",
      avatar: "https://i.pravatar.cc/150?u=rahul",
      content: "As an organizer, ApnaEvents has been revolutionary. We reached over 10,000 students across 200+ schools in just 3 months. The platform's broadcast system and verification process saved us countless hours of manual work.",
      rating: 5,
      achievement: "10K+ Students Reached"
    },
    {
      id: 3,
      name: "Ananya Patel",
      role: "Class 11 Student",
      school: "Mumbai International School",
      avatar: "https://i.pravatar.cc/150?u=ananya",
      content: "The digital passport feature is incredible! All my achievements are now in one place with verified certificates. Colleges love seeing the comprehensive profile. It's like having a professional portfolio from high school.",
      rating: 5,
      achievement: "50+ Achievements"
    },
    {
      id: 4,
      name: "Dr. Rajesh Kumar",
      role: "Principal",
      school: "Bangalore Public School",
      avatar: "https://i.pravatar.cc/150?u=rajesh",
      content: "ApnaEvents has become integral to our school's extracurricular program. The platform ensures our students only participate in verified, high-quality competitions. The impact on student development has been remarkable.",
      rating: 5,
      achievement: "500+ Student Engagements"
    }
  ];

  useEffect(() => {
    if (!isAutoPlay) return;

    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    }, 5000);

    return () => clearInterval(timer);
  }, [isAutoPlay, testimonials.length]);

  const goToPrevious = () => {
    setCurrentIndex((prev) => (prev - 1 + testimonials.length) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToNext = () => {
    setCurrentIndex((prev) => (prev + 1) % testimonials.length);
    setIsAutoPlay(false);
  };

  const goToSlide = (index) => {
    setCurrentIndex(index);
    setIsAutoPlay(false);
  };

  return (
    <section className="py-24 bg-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(#e2e8f0_1px,transparent_1px)] [background-size:32px_32px] opacity-40" />
        <div className="absolute top-20 left-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-red-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-50 border border-blue-100 rounded-lg mb-6">
            <Quote className="w-4 h-4 text-[#0d3862]" />
            <span className="text-[#0d3862] text-[10px] font-bold uppercase tracking-[0.2em]">Institutional Success</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#0d3862] mb-6 tracking-tight">
            Trusted by <span className="text-[#911116] italic">50,000+</span> Scholars
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Hear from students, educators, and organizers who are building their future within the ApnaEvents Academic Network.
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.5 }}
              className="bg-[#F8FAFC] rounded-2xl p-8 md:p-12 border border-slate-100 shadow-sm"
            >
              <div className="grid md:grid-cols-3 gap-12 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#fcb900] fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-[#0d3862] leading-relaxed mb-8 font-medium">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-14 h-14 rounded-full border-2 border-white shadow-md"
                      />
                      <div>
                        <h4 className="font-serif text-xl font-bold text-[#0d3862]">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-slate-500 text-sm font-medium">
                          {testimonials[currentIndex].role} • {testimonials[currentIndex].school}
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-slate-100 rounded-lg shadow-sm">
                      <Trophy className="w-4 h-4 text-[#911116]" />
                      <span className="text-[#0d3862] text-[10px] font-bold uppercase tracking-widest leading-none">
                        {testimonials[currentIndex].achievement}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Achievement Badge */}
                <div className="hidden md:block">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="aspect-square bg-[#0d3862] rounded-2xl flex flex-col items-center justify-center text-center p-8 shadow-xl"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <Award className="text-[#fcb900]" size={28} />
                    </div>
                    <div className="text-3xl font-serif font-bold text-white mb-2">
                      {testimonials[currentIndex].rating}.0
                    </div>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest">
                      Academic Vetting
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <div className="absolute top-1/2 -translate-y-1/2 -left-6 lg:-left-12">
            <button
              onClick={goToPrevious}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0d3862] hover:bg-[#0d3862] hover:text-white transition-all shadow-lg border border-slate-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-12">
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#0d3862] hover:bg-[#0d3862] hover:text-white transition-all shadow-lg border border-slate-100"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-3 mt-12">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`h-1.5 rounded-full transition-all duration-300 ${currentIndex === index
                  ? 'w-12 bg-[#0d3862]'
                  : 'w-6 bg-slate-200 hover:bg-slate-300'
                }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 border-t border-slate-100 pt-20"
        >
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#0d3862] mb-6">
            Begin Your <span className="text-[#911116]">Journey</span> Toward Excellence
          </h3>
          <p className="text-slate-600 mb-10 max-w-xl mx-auto">
            Join a community of high-achievers and gain access to the most prestigious national academic opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/events" className="btn-primary flex items-center gap-2 group">
              Browse Directory
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/auth"
              className="px-8 py-3.5 bg-white border border-slate-200 rounded-lg text-slate-700 font-bold hover:bg-slate-50 transition-all shadow-sm"
            >
              Join the Network
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
