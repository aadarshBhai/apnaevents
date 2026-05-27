import { motion } from 'framer-motion';
import { Briefcase, FileText, BookOpen, Award, Search, Mic, HeartPulse, Users } from 'lucide-react';

const FeatureCards = () => {
  const features = [
    {
      icon: <Briefcase className="w-10 h-10" />,
      title: 'Career Counselling',
      description: 'Expert guidance for career choices, application strategy and liberal arts college planning.',
      color: 'bg-[#0d3862] text-white'
    },
    {
      icon: <BookOpen className="w-10 h-10" />,
      title: 'College Application Support',
      description: 'End-to-end help with shortlists, essays, portfolios and admission readiness.',
      color: 'bg-[#f8fafc] text-[#0d3862]'
    },
    {
      icon: <FileText className="w-10 h-10" />,
      title: 'Resume & Portfolio Building',
      description: 'Craft resumes, activity lists and project portfolios that reflect your story and aspirations.',
      color: 'bg-[#0d3862] text-white'
    },
    {
      icon: <Award className="w-10 h-10" />,
      title: 'Interview Prep',
      description: 'Practice mock interviews and receive feedback for college, fellowship, and scholarship conversations.',
      color: 'bg-[#f8fafc] text-[#0d3862]'
    },
    {
      icon: <Search className="w-10 h-10" />,
      title: 'Scholarship Guidance',
      description: 'Discover applicable scholarships and apply with confidence using mentor-reviewed materials.',
      color: 'bg-[#0d3862] text-white'
    },
    {
      icon: <Mic className="w-10 h-10" />,
      title: 'Mentor-Led Skill Growth',
      description: 'Build leadership, communication and academic skills through guided projects and practice.',
      color: 'bg-[#f8fafc] text-[#0d3862]'
    },
    {
      icon: <HeartPulse className="w-10 h-10" />,
      title: 'Wellbeing Support',
      description: 'Stay balanced during application season with emotional support and exam resilience coaching.',
      color: 'bg-[#0d3862] text-white'
    },
    {
      icon: <Users className="w-10 h-10" />,
      title: 'Parent & Peer Community',
      description: 'Connect with parents and peers who understand the journey toward top liberal colleges.',
      color: 'bg-[#f8fafc] text-[#0d3862]'
    }
  ];

  return (
    <section className="py-24 bg-[#f8fafc]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-4">
          {features.map((feature, index) => {
            const descriptionTextClass = feature.color.includes('bg-[#0d3862]') ? 'text-white/90' : 'text-slate-600';
            return (
              <motion.div
                key={feature.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
                className={`group rounded-[2rem] p-8 shadow-sm border border-slate-200 ${feature.color} hover:shadow-xl hover:-translate-y-1 transition-all duration-300`}
              >
                <div className="mb-6 rounded-3xl p-4 bg-white/10 inline-flex items-center justify-center shadow-sm">
                  {feature.icon}
                </div>
                <h3 className="text-2xl font-serif font-bold mb-4">{feature.title}</h3>
                <p className={`text-sm leading-relaxed ${descriptionTextClass}`}>{feature.description}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default FeatureCards;
