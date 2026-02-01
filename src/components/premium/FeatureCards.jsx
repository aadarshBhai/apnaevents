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
    <section className="py-24 bg-gradient-to-br from-slate-50 to-white relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-20 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-20 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-emerald-50 border border-emerald-200 rounded-full mb-6">
            <Sparkles className="w-4 h-4 text-emerald-600" />
            <span className="text-emerald-700 text-sm font-black uppercase tracking-wider">Core Features</span>
          </div>
          <h2 className="font-display text-4xl md:text-5xl font-black text-slate-900 mb-6">
            Built for <span className="bg-gradient-to-r from-emerald-600 to-blue-600 bg-clip-text text-transparent">Excellence</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto leading-relaxed">
            Experience the most comprehensive platform for competitive excellence, 
            designed with precision and trusted by thousands.
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
              whileHover={{ y: -8, scale: 1.02 }}
              className="group relative"
            >
              {/* Card */}
              <div className="card-premium h-full">
                {/* Icon Container */}
                <div className={`w-20 h-20 bg-gradient-to-br ${feature.gradient} rounded-3xl flex items-center justify-center text-white shadow-2xl mb-8 group-hover:scale-110 transition-transform duration-300`}>
                  {feature.icon}
                </div>

                {/* Content */}
                <h3 className="font-display text-2xl font-black text-slate-900 mb-4">
                  {feature.title}
                </h3>
                <p className="text-slate-600 leading-relaxed mb-6">
                  {feature.description}
                </p>

                {/* Stats Badge */}
                <div className={`inline-flex items-center gap-2 px-4 py-2 ${feature.bgLight} rounded-2xl`}>
                  <div className={`w-2 h-2 bg-gradient-to-r ${feature.gradient} rounded-full`}></div>
                  <span className={`text-sm font-black bg-gradient-to-r ${feature.gradient} bg-clip-text text-transparent`}>
                    {feature.stats}
                  </span>
                </div>

                {/* Hover Effect */}
                <div className="absolute inset-0 bg-gradient-to-br from-white to-slate-50 rounded-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 -z-10"></div>
              </div>

              {/* Floating Decorator */}
              <motion.div
                animate={{
                  y: [0, -10, 0],
                }}
                transition={{
                  duration: 3,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: index * 0.2,
                }}
                className={`absolute -top-4 -right-4 w-16 h-16 bg-gradient-to-br ${feature.gradient} rounded-2xl opacity-10 group-hover:opacity-20 transition-opacity duration-300`}
              />
            </motion.div>
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-20"
        >
          <div className="inline-flex items-center gap-4 p-8 bg-gradient-to-r from-navy-900 to-navy-800 rounded-3xl shadow-2xl">
            <div className="text-left">
              <h3 className="font-display text-2xl font-black text-white mb-2">
                Ready to Excel?
              </h3>
              <p className="text-slate-300 leading-relaxed">
                Join thousands of students already building their merit pipeline
              </p>
            </div>
            <button className="btn-premium whitespace-nowrap">
              Get Started Free
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default FeatureCards;
