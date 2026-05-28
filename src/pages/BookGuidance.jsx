import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar, Clock, Users, Mail, Phone, CheckCircle } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

const BookGuidance = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    grade: '',
    stream: '',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  const guidanceImage = "https://images.unsplash.com/photo-1520697222861-972e7d38de45?auto=format&fit=crop&q=80&w=1200";

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SEO
        title="Book Free Career Guidance Session | CareerPilot"
        description="Book a free 30-minute career guidance session with our expert counselors. Get personalized advice for your career path after 12th."
        keywords="book career guidance, free career counseling, career advice for students, career guidance session"
      />
      
      <CareerGuidanceNavbar />

      <main className="pt-24 md:pt-32 pb-16 md:pb-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-12 md:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-3 md:px-4 py-1.5 bg-brand-bgLight text-brand-body text-[10px] md:text-xs uppercase tracking-widest font-bold rounded-full mb-4 md:mb-6">
                Free Career Guidance
              </span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 md:mb-6 font-serif text-brand-heading">
                Book Your Free
                <span className="text-brand-maroon block mt-2">
                  Guidance Session
                </span>
              </h1>
              <p className="text-base sm:text-lg md:text-xl text-brand-body max-w-2xl mx-auto mb-6 md:mb-8 font-sans">
                Get personalized advice from our expert career counselors. Choose a 30-minute slot that fits your schedule.
              </p>
            </motion.div>
          </div>

          {!isSubmitted ? (
            <div className="grid md:grid-cols-2 gap-8 md:gap-12 max-w-5xl mx-auto">
              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="order-2 md:order-1"
              >
                <div className="bg-brand-bgLight rounded-2xl p-6 md:p-8 border border-gray-200">
                  <h2 className="text-xl md:text-2xl font-bold mb-6 font-serif text-brand-heading">
                    Student Details
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-5 md:space-y-6">
                    <div>
                      <label className="block text-xs md:text-sm font-bold text-brand-body mb-2 uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-sm"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-bold text-brand-body mb-2 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-sm"
                        placeholder="student@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-bold text-brand-body mb-2 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-sm"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-bold text-brand-body mb-2 uppercase tracking-wide">
                        Current Grade
                      </label>
                      <select
                        name="grade"
                        required
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-sm"
                      >
                        <option value="">Select your grade</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="graduation">Graduation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-bold text-brand-body mb-2 uppercase tracking-wide">
                        Stream (if applicable)
                      </label>
                      <select
                        name="stream"
                        value={formData.stream}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all text-sm"
                      >
                        <option value="">Select stream</option>
                        <option value="science">Science</option>
                        <option value="commerce">Commerce</option>
                        <option value="arts">Arts/Humanities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs md:text-sm font-bold text-brand-body mb-2 uppercase tracking-wide">
                        Your Questions
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={3}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-3 md:px-4 py-2.5 md:py-3 bg-white border border-gray-300 rounded-lg text-brand-heading focus:outline-none focus:ring-2 focus:ring-brand-maroon focus:border-transparent transition-all resize-none text-sm"
                        placeholder="What do you want to discuss in your session?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-3 md:py-4 bg-brand-maroon text-white font-bold rounded-lg hover:bg-[#5a161d] transition-all duration-200 uppercase tracking-widest text-sm"
                    >
                      Book Session
                    </button>
                  </form>
                </div>
              </motion.div>

              {/* Info Section */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="space-y-6 md:space-y-8 order-1 md:order-2"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-6 md:p-8 shadow-sm">
                  <h3 className="text-xl md:text-2xl font-bold mb-6 font-serif text-brand-heading">
                    What to Expect
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center">
                        <Clock className="w-4 h-4 md:w-5 md:h-5 text-brand-maroon" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-heading text-sm md:text-base">30-Minute Session</h4>
                        <p className="text-brand-body text-xs md:text-sm">Personalized one-on-one guidance</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center">
                        <Users className="w-4 h-4 md:w-5 md:h-5 text-brand-maroon" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-heading text-sm md:text-base">Expert Counselors</h4>
                        <p className="text-brand-body text-xs md:text-sm">Experienced career guidance professionals</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-4 h-4 md:w-5 md:h-5 text-brand-maroon" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-heading text-sm md:text-base">Flexible Scheduling</h4>
                        <p className="text-brand-body text-xs md:text-sm">Choose a time that works for you</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-3 md:space-x-4">
                      <div className="flex-shrink-0 w-8 h-8 md:w-10 md:h-10 bg-brand-maroon/10 rounded-full flex items-center justify-center">
                        <Mail className="w-4 h-4 md:w-5 md:h-5 text-brand-maroon" />
                      </div>
                      <div>
                        <h4 className="font-bold text-brand-heading text-sm md:text-base">Follow-Up Support</h4>
                        <p className="text-brand-body text-xs md:text-sm">Email support after your session</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-brand-maroon rounded-2xl p-6 md:p-8 text-white">
                  <h3 className="text-xl md:text-2xl font-bold mb-4 font-serif">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-2 md:space-y-3">
                    <li className="flex items-center space-x-2 md:space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-sm md:text-base">10+ years of experience</span>
                    </li>
                    <li className="flex items-center space-x-2 md:space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-sm md:text-base">10,000+ students guided</span>
                    </li>
                    <li className="flex items-center space-x-2 md:space-x-3">
                      <CheckCircle className="w-4 h-4 md:w-5 md:h-5" />
                      <span className="text-sm md:text-base">95% satisfaction rate</span>
                    </li>
                  </ul>
                </div>
              </motion.div>
            </div>
          ) : (
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5 }}
              className="max-w-2xl mx-auto text-center"
            >
              <div className="bg-brand-bgLight rounded-2xl p-8 md:p-12 border border-gray-200">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-brand-maroon rounded-full flex items-center justify-center mx-auto mb-6 md:mb-8">
                  <CheckCircle className="w-8 h-8 md:w-10 md:h-10 text-white" />
                </div>
                <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-4 font-serif text-brand-heading">
                  Session Booked!
                </h2>
                <p className="text-base sm:text-lg md:text-xl text-brand-body mb-6 md:mb-8 font-sans">
                  Thank you, {formData.name}! We've received your booking request. Our team will contact you within 24 hours to confirm your session.
                </p>
                <div className="space-y-2 md:space-y-4">
                  <p className="text-xs md:text-sm text-brand-body">
                    <strong className="text-brand-heading">Confirmation email sent to:</strong> {formData.email}
                  </p>
                </div>
              </div>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookGuidance;
