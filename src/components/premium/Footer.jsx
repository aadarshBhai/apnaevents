import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Twitter,
  Linkedin,
  Mail,
  Shield,
  ArrowUp,
  Github,
  MapPin,
  Phone,
  Globe
} from 'lucide-react';
import { Link } from 'react-router-dom';

const Footer = ({ stats }) => {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email) {
      setIsSubscribed(true);
      setTimeout(() => {
        setIsSubscribed(false);
        setEmail('');
      }, 3000);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-[#051b2e] text-white pt-24 pb-12 relative overflow-hidden">
      {/* Subtle background glow */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-blue-500/5 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter / CTA Row */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-20 pb-16 border-b border-white/10">
          <div>
            <h2 className="font-serif text-3xl md:text-4xl font-bold mb-4">
              Join the <span className="text-[#fcb900]">Academic Network</span>
            </h2>
            <p className="text-white/60 text-lg leading-relaxed max-w-xl font-medium">
              Receive notifications about verified national competitions and exclusive institutional opportunities.
            </p>
          </div>
          <div>
            <form onSubmit={handleSubscribe} className="flex gap-3">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Institutional or student email"
                className="flex-1 px-6 py-4 bg-white/5 border border-white/10 rounded-lg text-white placeholder:text-white/30 focus:outline-none focus:border-[#fcb900] transition-all"
                required
              />
              <button
                type="submit"
                className="px-8 bg-[#fcb900] text-[#0d3862] font-bold rounded-lg hover:bg-[#fef84c] transition-colors"
              >
                {isSubscribed ? 'Opted-in' : 'Subscribe'}
              </button>
            </form>
            <p className="text-[10px] text-white/30 font-bold uppercase tracking-widest mt-4">
              Institutional privacy protocols apply.
            </p>
          </div>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-white/10 rounded-lg flex items-center justify-center border border-white/10 shadow-sm">
                <Shield size={20} className="text-[#fcb900]" fill="currentColor" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-white leading-none tracking-tight">
                  apna<span className="text-[#fcb900]">events</span>
                </h1>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1">Ashoka Network Affiliate</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium">
              Building the primary merit pipeline for India's brightest minds. Verified by academic institutions.
            </p>
            <div className="flex space-x-4">
              {[Twitter, Github, Linkedin, Mail].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm"
                >
                  <Icon size={18} />
                </a>
              ))}
            </div>
          </div>

          {/* Opportunities Column */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6 underline decoration-[#911116] underline-offset-8">Discovery</h4>
            <ul className="space-y-4">
              {['National Olympiads', 'STEM Competitions', 'Liberal Arts Fellowship', 'Research Symposia', 'Global Scholars'].map((link) => (
                <li key={link}>
                  <Link to="/events" className="text-white/60 hover:text-[#fcb900] transition-colors text-sm font-semibold">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Institutional Column */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6 underline decoration-[#911116] underline-offset-8">Network</h4>
            <ul className="space-y-4">
              {['About the Network', 'Vetting Process', 'Partner Institutions', 'Privacy Policy', 'Honor Code'].map((link) => (
                <li key={link}>
                  <Link to="/" className="text-white/60 hover:text-[#fcb900] transition-colors text-sm font-semibold">
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact Column */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6">Contact Bureau</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin size={16} className="text-[#fcb900]" />
                <span className="text-xs font-bold">Bangalore Academic Hub</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Globe size={16} className="text-[#fcb900]" />
                <span className="text-xs font-bold">www.apnaevents.in</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail size={16} className="text-[#fcb900]" />
                <span className="text-xs font-bold italic">admissions@apnaevents.in</span>
              </div>
              <div className="pt-4 mt-4 border-t border-white/10 text-center">
                <button onClick={scrollToTop} className="text-[10px] font-bold text-white/40 hover:text-white flex items-center gap-2 mx-auto uppercase tracking-widest">
                  Back to Portal <ArrowUp size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em]">
            © {new Date().getFullYear()} ApnaEvents Academic Network. Authorized for student merit evaluation.
          </p>
          <div className="flex space-x-8">
            <div className="flex items-center gap-2 text-white/40">
              <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest">Bureau Systems Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
