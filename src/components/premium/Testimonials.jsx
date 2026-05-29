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
      name: "Priti Kumar",
      role: "Student",
      school: "Azim Premji University",
      avatar: "https://i.pravatar.cc/150?u=priti",
      content: "WeBridge helped me discover the right competitions and guided me through the application process. Their support was crucial for my admission to Azim Premji University.",
      rating: 5,
      achievement: "Azim Premji University Admit"
    },
    {
      id: 2,
      name: "Vivek Kumar",
      role: "Student",
      school: "Ashoka University",
      avatar: "https://i.pravatar.cc/150?u=vivek",
      content: "Thanks to WeBridge, I found exclusive opportunities and received mentorship that made my Ashoka University journey possible. Highly recommended for any student!",
      rating: 5,
      achievement: "Ashoka University Admit"
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
    <section className="py-24 bg-[#f8f9fa] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-gray-100 rounded-xl mb-6 shadow-sm">
            <Quote className="w-4 h-4 text-[#721c24]" />
            <span className="text-[#721c24] text-[10px] font-bold uppercase tracking-[0.2em] font-sans">Success Stories</span>
          </div>
          <h2 className="font-serif text-4xl md:text-5xl font-bold text-[#212529] mb-6 tracking-tight">
            From small-town dreams to scholarship and admission success.
          </h2>
          <p className="text-lg text-[#495057] max-w-3xl mx-auto leading-relaxed font-sans">
            Real transformations from students who gained confidence, earned college admits, and discovered fellowship opportunities.
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
              className="bg-white rounded-2xl p-8 md:p-12 border border-gray-100 shadow-sm"
            >
              <div className="grid md:grid-cols-3 gap-12 items-center">
                {/* Testimonial Content */}
                <div className="md:col-span-2">
                  <div className="flex items-center gap-1 mb-6">
                    {[...Array(testimonials[currentIndex].rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 text-[#721c24] fill-current" />
                    ))}
                  </div>

                  <blockquote className="text-xl md:text-2xl text-[#212529] leading-relaxed mb-8 font-serif">
                    "{testimonials[currentIndex].content}"
                  </blockquote>

                  <div className="flex flex-col sm:flex-row sm:items-center gap-6">
                    <div className="flex items-center gap-4">
                      <img
                        src={testimonials[currentIndex].avatar}
                        alt={testimonials[currentIndex].name}
                        className="w-14 h-14 rounded-full border-2 border-white shadow-sm"
                      />
                      <div>
                        <h4 className="font-serif text-xl font-bold text-[#212529]">
                          {testimonials[currentIndex].name}
                        </h4>
                        <p className="text-[#495057] text-sm font-medium font-sans">
                          {testimonials[currentIndex].role} • {testimonials[currentIndex].school}
                        </p>
                      </div>
                    </div>
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-[#f8f9fa] border border-gray-100 rounded-xl shadow-sm">
                      <Trophy className="w-4 h-4 text-[#721c24]" />
                      <span className="text-[#212529] text-[10px] font-bold uppercase tracking-widest leading-none font-sans">
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
                    className="aspect-square bg-[#721c24] rounded-2xl flex flex-col items-center justify-center text-center p-8 shadow-md"
                  >
                    <div className="w-12 h-12 bg-white/10 rounded-full flex items-center justify-center mb-4">
                      <Award className="text-[#ced4da]" size={28} />
                    </div>
                    <div className="text-3xl font-serif font-bold text-white mb-2">
                      {testimonials[currentIndex].rating}.0
                    </div>
                    <p className="text-white/60 text-[10px] font-bold uppercase tracking-widest font-sans">
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
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#721c24] hover:bg-[#721c24] hover:text-white transition-all shadow-sm border border-gray-100"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
          </div>
          <div className="absolute top-1/2 -translate-y-1/2 -right-6 lg:-right-12">
            <button
              onClick={goToNext}
              className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-[#721c24] hover:bg-[#721c24] hover:text-white transition-all shadow-sm border border-gray-100"
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
                  ? 'w-12 bg-[#721c24]'
                  : 'w-6 bg-gray-200 hover:bg-gray-300'
                }`}
            />
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 border-t border-gray-100 pt-20"
        >
          <h3 className="font-serif text-3xl md:text-4xl font-bold text-[#212529] mb-6">
            Begin Your <span className="text-[#721c24]">Journey</span> Toward Excellence
          </h3>
          <p className="text-[#495057] mb-10 max-w-xl mx-auto font-sans">
            Join a community of high-achievers and gain access to the most prestigious national academic opportunities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/careers" className="px-8 py-3.5 bg-[#ced4da] text-white font-bold rounded-xl hover:bg-[#adb5bd] transition-all flex items-center gap-2 group shadow-sm font-sans">
              Explore Careers
              <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Link>
            <Link
              to="/careers"
              className="px-8 py-3.5 bg-white border border-gray-100 rounded-xl text-[#212529] font-bold hover:bg-[#f8f9fa] transition-all shadow-sm font-sans"
            >
              Explore Careers
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Testimonials;
