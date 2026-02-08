import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Quote, Star, ChevronLeft, ChevronRight } from 'lucide-react';
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
    <section className="py-24 bg-gradient-to-br from-navy-900 via-navy-800 to-navy-900 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-6">
            <Quote className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-sm font-black uppercase tracking-wider">Success Stories</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-white mb-6">
            Trusted by <span className="bg-gradient-to-r from-emerald-400 to-blue-400 bg-clip-text text-transparent">50,000+</span> Students
          </h2>
          <p className="text-lg text-slate-300 max-w-3xl mx-auto leading-relaxed">
            Hear from students, educators, and organizers who are building their future with ApnaEvents
          </p>
        </motion.div>

        {/* Testimonials Carousel */}
        <div className="relative max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentIndex}
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
              className="glass-dark rounded-3xl p-12 border border-white/10"
            >
              <div className="grid md:grid-cols-3 gap-8 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-amber-400 fill-current" />
                    ))}
                  </div>
                  
                  <blockquote className="text-xl text-slate-200 leading-relaxed mb-8 font-medium">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-4 mb-2">
                        <img
                          src={testimonials[currentIndex].avatar}
                          alt={testimonials[currentIndex].name}
                          className="w-12 h-12 rounded-2xl border-2 border-emerald-500"
                        />
                        <div>
                          <h4 className="font-display text-xl font-black text-white">
                            {testimonials[currentIndex].name}
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {testimonials[currentIndex].role} • {testimonials[currentIndex].school}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                        <div className="w-2 h-2 bg-emerald-400 rounded-full"></div>
                        <span className="text-emerald-400 text-xs font-black uppercase tracking-wider">
                          {testimonials[currentIndex].achievement}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Achievement Card */}
                <div className="hidden md:block">
                  <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="bg-gradient-to-br from-emerald-500 to-emerald-600 rounded-3xl p-8 text-center shadow-2xl"
                  >
                    <div className="text-4xl font-black text-white mb-2">
                      {testimonials[currentIndex].rating}.0
                    </div>
                    <div className="flex justify-center gap-1 mb-4">
                      {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 text-white fill-current" />
                      ))}
                    </div>
                    <p className="text-emerald-100 text-sm font-medium">
                      Excellence Rating
                    </p>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* Navigation Buttons */}
          <button
            onClick={goToPrevious}
            className="absolute left-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={goToNext}
            className="absolute right-4 top-1/2 -translate-y-1/2 w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/20 transition-all duration-300 border border-white/20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        </div>

        {/* Slide Indicators */}
        <div className="flex justify-center gap-2 mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                currentIndex === index
                  ? 'w-8 bg-emerald-400'
                  : 'bg-white/20 hover:bg-white/30'
              }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <h3 className="font-display text-3xl font-black text-white mb-6">
            Ready to Build Your Success Story?
          </h3>
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link to="/discover" className="btn-premium">
              Explore Opportunities
            </Link>
            <Link 
              to="/auth" 
              className="px-8 py-4 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl text-white font-semibold hover:bg-white/20 transition-all duration-300"
            >
              Join Community
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
