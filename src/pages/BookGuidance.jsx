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

  return (
    <div className="min-h-screen bg-white text-slate-800">
      <SEO
        title="Book Free Career Guidance Session | CareerPilot"
        description="Book a free 30-minute career guidance session with our expert counselors. Get personalized advice for your career path after 12th."
        keywords="book career guidance, free career counseling, career advice for students, career guidance session"
      />
      
      <CareerGuidanceNavbar />

      <main className="pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
            >
              <span className="inline-block px-4 py-1.5 bg-[#f8f9fa] text-[#495057] text-xs uppercase tracking-widest font-bold rounded-full mb-6">
                Free Career Guidance
              </span>
              <h1 className="text-5xl md:text-6xl font-bold mb-6 font-serif text-[#212529]">
                Book Your Free
                <span className="text-[#721c24] block mt-2">
                  Guidance Session
                </span>
              </h1>
              <p className="text-xl text-[#495057] max-w-2xl mx-auto mb-8 font-sans">
                Get personalized advice from our expert career counselors. Choose a 30-minute slot that fits your schedule.
              </p>
            </motion.div>
          </div>

          {!isSubmitted ? (
            <div className="grid md:grid-cols-2 gap-12 max-w-5xl mx-auto">
              {/* Form Section */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <div className="bg-[#f8f9fa] rounded-2xl p-8 border border-gray-200">
                  <h2 className="text-2xl font-bold mb-6 font-serif text-[#212529]">
                    Student Details
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <label className="block text-sm font-bold text-[#495057] mb-2 uppercase tracking-wide">
                        Full Name
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#721c24] focus:border-transparent transition-all"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#495057] mb-2 uppercase tracking-wide">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#721c24] focus:border-transparent transition-all"
                        placeholder="student@example.com"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#495057] mb-2 uppercase tracking-wide">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#721c24] focus:border-transparent transition-all"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#495057] mb-2 uppercase tracking-wide">
                        Current Grade
                      </label>
                      <select
                        name="grade"
                        required
                        value={formData.grade}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#721c24] focus:border-transparent transition-all"
                      >
                        <option value="">Select your grade</option>
                        <option value="10">Class 10</option>
                        <option value="11">Class 11</option>
                        <option value="12">Class 12</option>
                        <option value="graduation">Graduation</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#495057] mb-2 uppercase tracking-wide">
                        Stream (if applicable)
                      </label>
                      <select
                        name="stream"
                        value={formData.stream}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#721c24] focus:border-transparent transition-all"
                      >
                        <option value="">Select stream</option>
                        <option value="science">Science</option>
                        <option value="commerce">Commerce</option>
                        <option value="arts">Arts/Humanities</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-[#495057] mb-2 uppercase tracking-wide">
                        Your Questions
                      </label>
                      <textarea
                        name="message"
                        required
                        rows={4}
                        value={formData.message}
                        onChange={handleChange}
                        className="w-full px-4 py-3 bg-white border border-gray-300 rounded-lg text-[#212529] focus:outline-none focus:ring-2 focus:ring-[#721c24] focus:border-transparent transition-all resize-none"
                        placeholder="What do you want to discuss in your session?"
                      />
                    </div>

                    <button
                      type="submit"
                      className="w-full py-4 bg-[#721c24] text-white font-bold rounded-lg hover:bg-[#5a161d] transition-all duration-200 uppercase tracking-widest"
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
                className="space-y-8"
              >
                <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm">
                  <h3 className="text-2xl font-bold mb-6 font-serif text-[#212529]">
                    What to Expect
                  </h3>
                  <div className="space-y-4">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#721c24]/10 rounded-full flex items-center justify-center">
                        <Clock className="w-5 h-5 text-[#721c24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#212529]">30-Minute Session</h4>
                        <p className="text-[#495057] text-sm">Personalized one-on-one guidance</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#721c24]/10 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-[#721c24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#212529]">Expert Counselors</h4>
                        <p className="text-[#495057] text-sm">Experienced career guidance professionals</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#721c24]/10 rounded-full flex items-center justify-center">
                        <Calendar className="w-5 h-5 text-[#721c24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#212529]">Flexible Scheduling</h4>
                        <p className="text-[#495057] text-sm">Choose a time that works for you</p>
                      </div>
                    </div>

                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0 w-10 h-10 bg-[#721c24]/10 rounded-full flex items-center justify-center">
                        <Mail className="w-5 h-5 text-[#721c24]" />
                      </div>
                      <div>
                        <h4 className="font-bold text-[#212529]">Follow-Up Support</h4>
                        <p className="text-[#495057] text-sm">Email support after your session</p>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-[#721c24] rounded-2xl p-8 text-white">
                  <h3 className="text-2xl font-bold mb-4 font-serif">
                    Why Choose Us?
                  </h3>
                  <ul className="space-y-3">
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>10+ years of experience</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>10,000+ students guided</span>
                    </li>
                    <li className="flex items-center space-x-3">
                      <CheckCircle className="w-5 h-5" />
                      <span>95% satisfaction rate</span>
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
              <div className="bg-[#f8f9fa] rounded-2xl p-12 border border-gray-200">
                <div className="w-20 h-20 bg-[#721c24] rounded-full flex items-center justify-center mx-auto mb-8">
                  <CheckCircle className="w-10 h-10 text-white" />
                </div>
                <h2 className="text-4xl font-bold mb-4 font-serif text-[#212529]">
                  Session Booked!
                </h2>
                <p className="text-xl text-[#495057] mb-8 font-sans">
                  Thank you, {formData.name}! We've received your booking request. Our team will contact you within 24 hours to confirm your session.
                </p>
                <div className="space-y-4">
                  <p className="text-sm text-[#495057]">
                    <strong className="text-[#212529]">Confirmation email sent to:</strong> {formData.email}
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
