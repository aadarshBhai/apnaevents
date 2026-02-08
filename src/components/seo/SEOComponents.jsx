// SEO-optimized components for page structure
import { motion } from 'framer-motion';

export const SEOFAQ = ({ faqs }) => (
    <section className="py-16 bg-navy-900/30">
        <div className="container-custom px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
            >
                <h2 className="text-3xl font-black text-white mb-12 text-center">
                    Frequently Asked <span className="text-emerald-400">Questions</span>
                </h2>
                <div className="space-y-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, x: -20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="glass-card p-6 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all"
                        >
                            <h3 className="text-lg font-bold text-white mb-3">{faq.question}</h3>
                            <p className="text-slate-300 leading-relaxed">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

export const SEOComparisonTable = ({ title, data }) => (
    <section className="py-16">
        <div className="container-custom px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
            >
                <h2 className="text-3xl font-black text-white mb-12 text-center">{title}</h2>
                <div className="overflow-x-auto">
                    <table className="w-full glass-card rounded-xl border border-white/5">
                        <thead>
                            <tr className="border-b border-white/10">
                                {data.headers.map((header, index) => (
                                    <th key={index} className="px-6 py-4 text-left text-sm font-bold text-emerald-400 uppercase tracking-wider">
                                        {header}
                                    </th>
                                ))}
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-white/5">
                            {data.rows.map((row, rowIndex) => (
                                <tr key={rowIndex} className="hover:bg-white/[0.02] transition-colors">
                                    {row.map((cell, cellIndex) => (
                                        <td key={cellIndex} className="px-6 py-4 text-slate-300">
                                            {cell}
                                        </td>
                                    ))}
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </motion.div>
        </div>
    </section>
);

export const SEOInternalLinks = ({ links }) => (
    <section className="py-16 bg-navy-900/30">
        <div className="container-custom px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-3xl font-black text-white mb-12">
                    Explore <span className="text-emerald-400">More</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {links.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.href}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ scale: 1.05 }}
                            className="glass-card p-6 rounded-xl border border-white/5 hover:border-emerald-500/20 transition-all group"
                        >
                            <div className="text-emerald-400 mb-3">{link.icon}</div>
                            <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-400 transition-colors">
                                {link.title}
                            </h3>
                            <p className="text-slate-400 text-sm">{link.description}</p>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

export default { SEOFAQ, SEOComparisonTable, SEOInternalLinks };
