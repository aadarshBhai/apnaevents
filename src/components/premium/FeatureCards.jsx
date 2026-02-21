import { motion } from 'framer-motion';
import { Shield, Users, Trophy, Zap, Globe, Award, Target, Sparkles } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: <Shield className="w-10 h-10" />,
      title: "Verified Events",
      description: "Every competition is manually vetted for academic excellence and authenticity.",
      isOrange: true
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: "Prestigious Network",
      description: "Connect with high-achieving students from 500+ top-tier institutions.",
      isOrange: false
    },
    {
      icon: <Trophy className="w-10 h-10" />,
      title: "Merit Portfolios",
      description: "Build a digital record of achievements recognized by elite global universities.",
      isOrange: true
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: "National Standard",
      description: "Access state and national olympiads that define your competitive edge.",
      isOrange: false
    }
  ];

  return (
    <section className="bg-white">
      <div className="grid md:grid-cols-2 lg:grid-cols-4 w-full">
        {features.map((feature, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
            className={`p-12 md:p-14 flex flex-col items-center text-center group cursor-default transition-all duration-500 ${feature.isOrange
              ? 'bg-[#0d3862] text-white hover:bg-[#0a2c4d]'
              : 'bg-[#F8FAFC] text-[#0d3862] hover:bg-slate-100 border-x border-slate-50'
              }`}
          >
            <div className={`mb-8 transform group-hover:scale-110 transition-transform duration-300 ${feature.isOrange ? 'text-[#fcb900]' : 'text-[#911116]'}`}>
              {feature.icon}
            </div>
            <h3 className="text-xl font-serif font-bold mb-6 tracking-tight">
              {feature.title}
            </h3>
            <p className={`text-sm leading-relaxed max-w-[280px] font-medium ${feature.isOrange ? 'opacity-80' : 'text-slate-500'}`}>
              {feature.description}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default FeatureCards;
