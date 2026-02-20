import { motion } from 'framer-motion';
import { Shield, Users, Trophy, Zap, Globe, Award, Target, Sparkles } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: <Shield className="w-8 h-8" />,
      title: "100% Verified Events",
      description: "Every competition undergoes rigorous 12-hour manual vetting by our compliance team.",
      gradient: "from-emerald-500 to-emerald-600",
      bgLight: "bg-emerald-50",
      stats: "Zero Spam"
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "20K+ Active Students",
      description: "Join India's largest community of high-achieving students from 500+ schools.",
      gradient: "from-blue-500 to-blue-600",
      bgLight: "bg-blue-50",
      stats: "Growing Daily"
    },
    {
      icon: <Trophy className="w-8 h-8" />,
      title: "Career-Ready Passports",
      description: "Build verified professional trajectories with resume-integrated badges.",
      gradient: "from-amber-500 to-amber-600",
      bgLight: "bg-amber-50",
      stats: "Lifetime Valid"
    },
    {
      icon: <Zap className="w-8 h-8" />,
      title: "Instant Notifications",
      description: "Real-time updates for deadlines, results, and new opportunities.",
      gradient: "from-purple-500 to-purple-600",
      bgLight: "bg-purple-50",
      stats: "Real-time"
    },
    {
      icon: <Globe className="w-8 h-8" />,
      title: "National Reach",
      description: "Access competitions from every corner of India with local verification.",
      gradient: "from-rose-500 to-rose-600",
      bgLight: "bg-rose-50",
      stats: "Pan India"
    },
    {
      icon: <Award className="w-8 h-8" />,
      title: "Premium Recognition",
      description: "Earn certificates and badges recognized by top institutions and employers.",
      gradient: "from-indigo-500 to-indigo-600",
      bgLight: "bg-indigo-50",
      stats: "Industry Validated"
    }
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.25, 0.46, 0.45, 0.94],
      },
    },
  };

  return (
    <section className="py-32 bg-navy-950 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-0 left-1/4 w-[500px] h-[500px] bg-emerald-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-0 right-1/4 w-[500px] h-[500px] bg-blue-600/5 rounded-full blur-[120px]"></div>
      </div>

      <div className="container-custom px-4 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-full mb-8">
            <Sparkles className="w-4 h-4 text-emerald-400" />
            <span className="text-emerald-400 text-[10px] font-black uppercase tracking-widest">Platform DNA</span>
          </div>
          <h2 className="text-4xl md:text-6xl font-display font-black text-white mb-8 tracking-tighter">
            The Infrastructure of <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-blue-500">Student Merit</span>
          </h2>
          <p className="text-slate-400 text-lg max-w-2xl mx-auto leading-relaxed">
            We've built the most secure and trusted bridge between ambitious students and world-class opportunities.
          </p>
        </motion.div>

        {/* Feature Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ y: -12 }}
              className="group relative"
            >
              {/* Card */}
              <div className="glass-card h-full p-10 rounded-[2.5rem] border-white/5 hover:border-emerald-500/30 transition-all duration-500 relative z-10">
                {/* Icon Container */}
                <div className={`w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl flex items-center justify-center text-white mb-8 shadow-2xl shadow-emerald-500/10 group-hover:scale-110 transition-transform duration-500`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="text-2xl font-display font-black text-white mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-400 leading-relaxed mb-8 text-sm">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className="flex items-center gap-3">
                  <div className={`px-4 py-1.5 rounded-xl bg-white/5 border border-white/10`}>
                    <span className={`text-[10px] font-black uppercase tracking-widest text-emerald-400`}>
                      {feature.stats}
                    </span>
                  </div>
                </div>
              </div>

              {/* Hover Glow */}
              <div className="absolute inset-x-4 inset-y-4 bg-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0"></div>
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA Card */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 p-1 rounded-[3rem] bg-gradient-to-r from-white/10 via-white/[0.15] to-white/10"
        >
          <div className="p-8 md:p-12 bg-navy-950 rounded-[2.8rem] flex flex-col md:flex-row items-center justify-between gap-8 relative overflow-hidden group">
            {/* Background pattern */}
            <div className="absolute inset-0 opacity-5 pointer-events-none bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:20px_20px]"></div>

            <div className="relative z-10 text-center md:text-left">
              <h3 className="text-3xl md:text-4xl font-display font-black text-white mb-4">
                Join the <span className="text-emerald-400">Winning</span> Pipeline
              </h3>
              <p className="text-slate-400 max-w-xl">
                Ready to showcase your talent? Get verified, compete with the best, and build a profile that top universities can't ignore.
              </p>
            </div>
            <button className="btn-primary px-10 py-5 rounded-2xl group-hover:scale-105 transition-transform">
              Discover Opps Now
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
