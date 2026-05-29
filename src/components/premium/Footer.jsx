import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Twitter,
  Linkedin,
  Mail,
  Shield,
  ArrowUp,
  Github,
  Instagram,
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
    <footer className="bg-[#002D62] text-white pt-24 pb-12 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Newsletter / CTA Row removed as requested */}

        {/* Info Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-20">
          {/* Brand Column */}
          <div className="space-y-6">
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-[#721c24] rounded-lg flex items-center justify-center shadow-sm">
                <Shield size={20} className="text-white" fill="currentColor" />
              </div>
              <div>
                <h1 className="font-serif text-2xl font-bold text-white leading-none tracking-tight">
                  We<span className="text-[#ced4da]">Bridge</span>
                </h1>
                <p className="text-[9px] text-white/40 font-bold uppercase tracking-[0.2em] mt-1 font-sans">Ashoka Network Affiliate</p>
              </div>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed max-w-xs font-medium font-sans">
              Building the primary merit pipeline for India's brightest minds. Verified by academic institutions.
            </p>
            <div className="flex items-center gap-3">
              <span className="text-[10px] uppercase tracking-[0.3em] text-white/40 font-sans">Follow us</span>
              <div className="flex space-x-3">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                  <Twitter size={18} />
                </a>
                <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                  <Instagram size={18} />
                </a>
                <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                  <Linkedin size={18} />
                </a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                  <Github size={18} />
                </a>
                <a href="mailto:aadarshgolucky@gmail.com" className="w-10 h-10 rounded-xl bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all shadow-sm">
                  <Mail size={18} />
                </a>
              </div>
            </div>
          </div>

          {/* Company Column */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6 underline decoration-[#721c24] underline-offset-8">Company</h4>
            <ul className="space-y-4">
              <li>
                <Link to="/about" className="text-white/60 hover:text-[#ced4da] transition-colors text-sm font-semibold font-sans">
                  About
                </Link>
              </li>
              <li>
                <a href="/careers" className="text-white/60 hover:text-[#ced4da] transition-colors text-sm font-semibold font-sans">
                  Careers
                </a>
              </li>
              <li>
                <Link to="/contact" className="text-white/60 hover:text-[#ced4da] transition-colors text-sm font-semibold font-sans">
                  Contact
                </Link>
              </li>
              <li>
                <Link to="/search?q=scholarships" className="text-white/60 hover:text-[#ced4da] transition-colors text-sm font-semibold font-sans">
                  Scholarships
                </Link>
              </li>
              <li>
                <a href="/privacy" className="text-white/60 hover:text-[#ced4da] transition-colors text-sm font-semibold font-sans">
                  Privacy Policy
                </a>
              </li>
            </ul>
          </div>

          {/* Discover Column */}
          <div>
            <h4 className="font-serif text-lg font-bold text-white mb-6 underline decoration-[#721c24] underline-offset-8">Discover</h4>
            <ul className="space-y-4">
              {[
                { name: 'Engineering Careers', path: '/careers/engineering' },
                { name: 'Medical Careers', path: '/careers/medical' },
                { name: 'Law Careers', path: '/careers/law' },
                { name: 'Commerce Careers', path: '/careers/commerce' },
                { name: 'Design Careers', path: '/careers/design' },
              ].map((link) => (
                <li key={link.name}>
                  <Link to={link.path} className="text-white/60 hover:text-[#ced4da] transition-colors text-sm font-semibold font-sans">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Support Column */}
          <div className="bg-white/5 rounded-xl p-8 border border-white/10">
            <h4 className="text-[10px] font-bold text-white/40 uppercase tracking-[0.2em] mb-6 font-sans">Support</h4>
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-white/80">
                <MapPin size={16} className="text-[#ced4da]" />
                <span className="text-xs font-bold font-sans">Bangalore Academic Hub</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Globe size={16} className="text-[#ced4da]" />
                <span className="text-xs font-bold font-sans">www.apnaevents.in</span>
              </div>
              <div className="flex items-center gap-3 text-white/80">
                <Mail size={16} className="text-[#ced4da]" />
                <span className="text-xs font-bold italic font-sans">aadarshgolucky@gmail.com</span>
              </div>
              <a
                href="https://wa.me/917050819323?text=Hello%20ApnaEvents%20team,%20I%20want%20to%20know%20more%20about%20career%20guidance"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center justify-center gap-2 w-full px-5 py-3 mt-4 text-sm font-semibold text-white bg-[#721c24] rounded-xl hover:bg-[#5a161d] transition-colors font-sans"
              >
                <span>WhatsApp for Career Guidance</span>
              </a>
              <div className="pt-4 mt-4 border-t border-white/10 text-center">
                <button onClick={scrollToTop} className="text-[10px] font-bold text-white/40 hover:text-white flex items-center gap-2 mx-auto uppercase tracking-widest font-sans">
                  Back to Portal <ArrowUp size={12} />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-white/30 text-[10px] font-bold uppercase tracking-[0.2em] font-sans">
            © {new Date().getFullYear()} ApnaEvents Academic Network. Authorized for student merit evaluation.
          </p>
          <div className="flex space-x-8">
            <div className="flex items-center gap-2 text-white/40">
              <div className="w-1.5 h-1.5 bg-[#721c24] rounded-full animate-pulse"></div>
              <span className="text-[10px] font-bold uppercase tracking-widest font-sans">Bureau Systems Online</span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
