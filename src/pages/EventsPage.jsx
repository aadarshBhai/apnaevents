import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, Tag, ChevronDown, X, Trophy, Users, Shield, Loader2 } from 'lucide-react';
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
    const [showFilters, setShowFilters] = useState(false);
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

    // SEO Data for Events Page
    // Initialize Socket.IO for real-time updates
    useEffect(() => {
        const newSocket = createSocket();
        setSocket(newSocket);

        newSocket.on('connect', () => {
            console.log('EventsPage: Socket connected');
        });

        newSocket.on('eventCreated', (event) => {
            console.log('EventsPage: New event created', event);
            setEvents(prev => [event, ...prev]);
        });

        newSocket.on('eventUpdated', (event) => {
            console.log('EventsPage: Event updated', event);
            setEvents(prev => prev.map(e => e._id === event._id ? event : e));
        });

        newSocket.on('eventDeleted', ({ id }) => {
            console.log('EventsPage: Event deleted', id);
            setEvents(prev => prev.filter(e => e._id !== id));
        });

        return () => {
            newSocket.close();
        };
    }, []);

    // Update SEO metadata
    useEffect(() => {
        updatePageSEO('events');
    }, []);

    useEffect(() => {
        // Reset when filters change
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
            if (isInitial) {
                setLoading(true);
            } else {
                setLoadingMore(true);
            }

            const params = {
                page,
                limit: 12,
                ...filters
            };
            const data = await getEvents(params);

            if (isInitial) {
                setEvents(data.events || []);
            } else {
                setEvents(prev => [...prev, ...(data.events || [])]);
            }

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

    const formatDate = (dateString) => {
        if (dateString instanceof Date) {
            return dateString.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        }
        return dateString;
    };

    return (
        <div className="min-h-screen bg-navy-950 text-slate-300 selection:bg-emerald-500/30">
            <Navbar />

            <div className="pt-24 pb-20">
                <div className="container mx-auto px-4">
                    {/* Header */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="text-center mb-12"
                    >
                        <h1 className="text-4xl md:text-5xl font-black text-white mb-4">
                            Discover <span className="text-emerald-400">Opportunities</span>
                        </h1>
                        <p className="text-lg text-slate-400 max-w-2xl mx-auto">
                            Explore verified competitions, fellowships, and programs from around the world
                        </p>
                    </motion.div>

                    {/* Filters */}
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="glass-card p-6 mb-8 rounded-2xl"
                    >
                        <div className="grid md:grid-cols-4 gap-4">
                            {/* Search */}
                            <div className="relative">
                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" size={20} />
                                <input
                                    type="text"
                                    placeholder="Search events..."
                                    value={filters.search}
                                    onChange={(e) => handleFilterChange('search', e.target.value)}
                                    className="w-full pl-10 pr-4 py-3 bg-navy-900 border border-navy-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all placeholder:text-slate-500"
                                />
                            </div>

                            {/* Category Filter */}
                            <div className="relative">
                                <select
                                    value={filters.category}
                                    onChange={(e) => handleFilterChange('category', e.target.value)}
                                    className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all appearance-none"
                                >
                                    <option value="">All Categories</option>
                                    {categories.map(cat => (
                                        <option key={cat} value={cat}>{cat}</option>
                                    ))}
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>

                            {/* Sort */}
                            <div className="relative">
                                <select
                                    value={filters.sortBy}
                                    onChange={(e) => handleFilterChange('sortBy', e.target.value)}
                                    className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all appearance-none"
                                >
                                    <option value="date">Sort by Date</option>
                                    <option value="title">Sort by Name</option>
                                    <option value="category">Sort by Category</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>

                            {/* Status */}
                            <div className="relative">
                                <select
                                    value={filters.status}
                                    onChange={(e) => handleFilterChange('status', e.target.value)}
                                    className="w-full px-4 py-3 bg-navy-900 border border-navy-700 rounded-xl text-white focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500/50 transition-all appearance-none"
                                >
                                    <option value="upcoming">Upcoming</option>
                                    <option value="ongoing">Ongoing</option>
                                    <option value="closed">Closed</option>
                                </select>
                                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-slate-500">
                                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7"></path></svg>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Events Grid */}
                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="bg-navy-900 rounded-2xl border border-white/5 p-6 animate-pulse">
                                    <div className="h-48 bg-navy-800 rounded-xl mb-4"></div>
                                    <div className="h-6 bg-navy-800 rounded mb-2 w-3/4"></div>
                                    <div className="h-4 bg-navy-800 rounded mb-2 w-1/2"></div>
                                    <div className="h-4 bg-navy-800 rounded w-1/4"></div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <>
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

                            {/* Infinite Scroll Loader */}
                            {loadingMore && (
                                <div className="flex justify-center items-center mt-12 py-8">
                                    <div className="flex flex-col items-center gap-4">
                                        <Loader2 className="w-8 h-8 text-emerald-500 animate-spin" />
                                        <p className="text-slate-400 font-medium animate-pulse">Gathering more opportunities...</p>
                                    </div>
                                </div>
                            )}

                            {!loading && !loadingMore && !pagination.hasNext && events.length > 0 && (
                                <div className="text-center mt-16 py-8 border-t border-white/5">
                                    <p className="text-slate-500 font-medium">You've reached the end! Check back later for more.</p>
                                </div>
                            )}

                            {/* Results Count */}
                            <div className="text-center mt-8 text-sm text-slate-500">
                                Showing {events.length} of {pagination.totalItems} events
                            </div>
                        </>
                    )}
                </div>
            </div>
        </div>
    );
};

export default EventsPage;