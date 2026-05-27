// SEO-optimized components for page structure - Rebranded for Ashoka Academic Network
import { motion } from 'framer-motion';

export const SEOFAQ = ({ faqs }) => (
    <section className="py-20 bg-slate-50">
        <div className="container-custom px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto"
            >
                <div className="text-center mb-16">
                    <h2 className="text-3xl md:text-4xl font-serif font-bold text-[#0d3862] mb-4">
                        Academic <span className="text-[#911116] italic">Inquiries</span>
                    </h2>
                    <div className="w-20 h-1 bg-[#fcb900] mx-auto rounded-full"></div>
                </div>
                <div className="grid gap-6">
                    {faqs.map((faq, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 10 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all"
                        >
                            <h3 className="text-lg font-bold text-[#0d3862] mb-4 flex items-center gap-3">
                                <span className="w-8 h-8 rounded-lg bg-blue-50 text-[#0d3862] flex items-center justify-center text-xs shrink-0">Q</span>
                                {faq.question}
                            </h3>
                            <p className="text-slate-600 leading-relaxed pl-11">{faq.answer}</p>
                        </motion.div>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

export const SEOComparisonTable = ({ title, data }) => (
    <section className="py-20 bg-white">
        <div className="container-custom px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-6xl mx-auto"
            >
                <h2 className="text-3xl font-serif font-bold text-[#0d3862] mb-12 text-center">{title}</h2>
                <div className="overflow-hidden rounded-xl border border-slate-200 shadow-sm">
                    <div className="overflow-x-auto">
                        <table className="w-full">
                            <thead>
                                <tr className="bg-[#0d3862] text-white">
                                    {data.headers.map((header, index) => (
                                        <th key={index} className="px-6 py-5 text-left text-xs font-bold uppercase tracking-widest border-r border-white/10 last:border-none">
                                            {header}
                                        </th>
                                    ))}
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {data.rows.map((row, rowIndex) => (
                                    <tr key={rowIndex} className="hover:bg-slate-50 transition-colors">
                                        {row.map((cell, cellIndex) => (
                                            <td key={cellIndex} className="px-6 py-4 text-slate-600 font-medium text-sm">
                                                {cell}
                                            </td>
                                        ))}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </motion.div>
        </div>
    </section>
);

export const SEOInternalLinks = ({ links }) => (
    <section className="py-20 bg-slate-50">
        <div className="container-custom px-4">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                className="max-w-4xl mx-auto text-center"
            >
                <h2 className="text-3xl font-serif font-bold text-[#0d3862] mb-12">
                    Institutional <span className="text-[#911116] italic">Resources</span>
                </h2>
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {links.map((link, index) => (
                        <motion.a
                            key={index}
                            href={link.href}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: index * 0.1 }}
                            whileHover={{ y: -5 }}
                            className="bg-white p-8 rounded-xl border border-slate-100 shadow-sm hover:shadow-md transition-all group"
                        >
                            <div className="text-[#911116] mb-5 flex justify-center">{link.icon}</div>
                            <h3 className="text-lg font-serif font-bold text-[#0d3862] mb-3 group-hover:text-[#911116] transition-colors">
                                {link.title}
                            </h3>
                            <p className="text-slate-500 text-sm leading-relaxed">{link.description}</p>
                        </motion.a>
                    ))}
                </div>
            </motion.div>
        </div>
    </section>
);

export default { SEOFAQ, SEOComparisonTable, SEOInternalLinks };
