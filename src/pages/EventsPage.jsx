import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, Tag, ChevronDown, X, Trophy, Users, Shield, Loader2, ArrowRight } from 'lucide-react';
import EventCard from '../components/EventCard';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import { SEOFAQ } from '../components/seo/SEOComponents';
import { getEvents, getEventCategories } from '../api/events';
import { createSocket } from '../utils/socket';
import { updatePageSEO } from '../utils/seo';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadingMore, setLoadingMore] = useState(false);
    const [filters, setFilters] = useState({
        search: '',
        category: '',
        status: 'upcoming',
        sortBy: 'date',
        sortOrder: 'asc'
    });
    const [pagination, setPagination] = useState({
        currentPage: 1,
        totalPages: 1,
        totalItems: 0,
        hasNext: false
    });
    const [socket, setSocket] = useState(null);
    const observer = useRef();

    const lastElementRef = useCallback(node => {
        if (loading || loadingMore) return;
        if (observer.current) observer.current.disconnect();

        observer.current = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting && pagination.hasNext) {
                setPagination(prev => ({ ...prev, currentPage: prev.currentPage + 1 }));
            }
        });

        if (node) observer.current.observe(node);
    }, [loading, loadingMore, pagination.hasNext]);

    useEffect(() => {
        const newSocket = createSocket();
        setSocket(newSocket);

        newSocket.on('eventCreated', (event) => {
            setEvents(prev => [event, ...prev]);
        });

        newSocket.on('eventUpdated', (event) => {
            setEvents(prev => prev.map(e => e._id === event._id ? event : e));
        });

        newSocket.on('eventDeleted', ({ id }) => {
            setEvents(prev => prev.filter(e => e._id !== id));
        });

        return () => {
            newSocket.close();
        };
    }, []);

    useEffect(() => {
        updatePageSEO('events');
    }, []);

    useEffect(() => {
        setEvents([]);
        setPagination(prev => ({ ...prev, currentPage: 1 }));
        fetchEvents(1, true);
        fetchCategories();
    }, [filters]);

    useEffect(() => {
        if (pagination.currentPage > 1) {
            fetchEvents(pagination.currentPage, false);
        }
    }, [pagination.currentPage]);

    const fetchEvents = async (page = 1, isInitial = false) => {
        try {
            if (isInitial) setLoading(true);
            else setLoadingMore(true);

            const params = {
                page,
                limit: 12,
                ...filters
            };
            const data = await getEvents(params);

            if (isInitial) setEvents(data.events || []);
            else setEvents(prev => [...prev, ...(data.events || [])]);

            setPagination(data.pagination || {});
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
            setLoadingMore(false);
        }
    };

    const fetchCategories = async () => {
        try {
            const data = await getEventCategories();
            setCategories(data.categories || []);
        } catch (error) {
            console.error('Failed to fetch categories:', error);
        }
    };

    const handleFilterChange = (key, value) => {
        setFilters(prev => ({ ...prev, [key]: value }));
    };

    return (
        <div className="min-h-screen bg-white text-slate-800">
            <Navbar />

            <div className="pt-32 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-16"
                    >
                        <h1 className="text-4xl md:text-6xl font-serif font-bold text-[#0d3862] mb-6 tracking-tight">
                            Academic <span className="text-[#911116] italic">Directory</span>
                        </h1>
                        <p className="text-lg text-slate-500 max-w-2xl mx-auto font-medium">
                            Discover verified national competitions, research fellowships, and elite programs curated for the ambitious student.
                        </p>
                    </motion.div>

                    {/* Controls Bar */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-[#F8FAFC] p-6 lg:p-8 mb-12 rounded-2xl border border-slate-100 shadow-sm"
                    >
                        <div className="grid md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                                <input
                                    type="text"
                                    placeholder="Search by keyword..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="w-full pl-11 pr-4 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-700 focus:outline-none focus:border-[#fcb900] transition-all placeholder:text-slate-400 font-semibold text-sm shadow-inner"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:border-[#fcb900] transition-all appearance-none font-bold uppercase tracking-widest text-[10px] shadow-inner"
                                >
                                    <option value="">All Disciplines</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="w-full px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:border-[#fcb900] transition-all appearance-none font-bold uppercase tracking-widest text-[10px] shadow-inner"
                                >
                                    <option value="date">Chronological Order</option>
                                    <option value="title">Lexicographical</option>
                                    <option value="category">Categorical</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
                            </div>

                            {/* Status */}
                            <div className="relative">
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-6 py-3.5 bg-white border border-slate-200 rounded-xl text-slate-600 focus:outline-none focus:border-[#fcb900] transition-all appearance-none font-bold uppercase tracking-widest text-[10px] shadow-inner"
                                >
                                    <option value="upcoming">Call for Entries</option>
                                    <option value="ongoing">In Progress</option>
                                    <option value="closed">Past Deadlines</option>
                                </select>
                                <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none text-slate-400" size={14} />
                            </div>
                        </div>
                    </motion.div>

                    {/* Results Section */}
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-slate-50 rounded-2xl border border-slate-100 p-8 animate-pulse">
                                    <div className="h-44 bg-slate-200 rounded-xl mb-6"></div>
                                    <div className="h-6 bg-slate-200 rounded mb-4 w-3/4"></div>
                                    <div className="h-4 bg-slate-100 rounded mb-4 w-1/2"></div>
                                    <div className="h-4 bg-slate-50 rounded w-1/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
                            {events.length > 0 ? (
                                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                                    {events.map((event, index) => (
                                        <motion.div
                                            key={event._id}
                                            ref={index === events.length - 1 ? lastElementRef : null}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ delay: (index % 12) * 0.05 }}
                                        >
                                            <EventCard {...event} />
                                        </motion.div>
                                    ))}
                                </div>
                            ) : (
                                <div className="text-center py-32 bg-slate-50 rounded-3xl border border-slate-100 italic">
                                    <Trophy size={48} className="mx-auto text-slate-300 mb-6" />
                                    <h3 className="text-2xl font-serif text-[#0d3862] mb-3">No Opportunities Found</h3>
                                    <p className="text-slate-500 font-medium max-w-sm mx-auto">Adjust your selection criteria to discover other items in the academic directory.</p>
                                </div>
                            )}

                            {/* Pagination Status */}
                            {loadingMore && (
                                <div className="flex justify-center items-center mt-12 py-10">
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-8 h-8 text-[#0d3862] animate-spin" />
                                        <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Retrieving Archival Data...</p>
                                    </div>
                                </div>
                            )}

                            {!loading && !loadingMore && !pagination.hasNext && events.length > 0 && (
                                <div className="text-center mt-24 py-10 border-t border-slate-50">
                                    <p className="text-slate-400 font-bold uppercase tracking-widest text-[9px]">Terminus reached • Directory updated daily</p>
                                </div>
                            )}
                        </>
                    )}
                </div>
            </div>
            <Footer stats={{ students: pagination.totalItems || '50K+', events: pagination.totalItems || '100+' }} />
        </div>
    );
};

export default EventsPage;