import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Search, Filter, Calendar, MapPin, Tag, ChevronDown, X } from 'lucide-react';
import EventCard from '../components/EventCard';
import Navbar from '../components/premium/Navbar';
import Footer from '../components/premium/Footer';
import { getEvents, getEventCategories } from '../api/events';
import { createSocket } from '../utils/socket';
import { updatePageSEO } from '../utils/seo';

const EventsPage = () => {
    const [events, setEvents] = useState([]);
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);
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
        totalItems: 0
    });
    const [socket, setSocket] = useState(null);

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
        fetchEvents();
        fetchCategories();
    }, [filters]);

    const fetchEvents = async () => {
        try {
            setLoading(true);
            const params = {
                page: pagination.currentPage,
                limit: 12,
                ...filters
            };
            const data = await getEvents(params);
            setEvents(data.events || []);
            setPagination(data.pagination || {});
        } catch (error) {
            console.error('Failed to fetch events:', error);
        } finally {
            setLoading(false);
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
        setPagination(prev => ({ ...prev, currentPage: 1 }));
    };

    const handlePageChange = (page) => {
        setPagination(prev => ({ ...prev, currentPage: page }));
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
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.1 }}
                                    >
                                        <EventCard {...event} />
                                    </motion.div>
                                ))}
                            </div>

                            {/* Pagination */}
                            {pagination.totalPages > 1 && (
                                <motion.div
                                    initial={{ opacity: 0, y: 20 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    className="flex justify-center items-center gap-4 mt-12"
                                >
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage - 1)}
                                        disabled={!pagination.hasPrev}
                                        className="px-4 py-2 bg-navy-900 border border-navy-700 text-slate-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-800 hover:text-white transition-colors"
                                    >
                                        Previous
                                    </button>
                                    
                                    <span className="text-sm font-medium text-slate-400">
                                        Page {pagination.currentPage} of {pagination.totalPages}
                                    </span>
                                    
                                    <button
                                        onClick={() => handlePageChange(pagination.currentPage + 1)}
                                        disabled={!pagination.hasNext}
                                        className="px-4 py-2 bg-navy-900 border border-navy-700 text-slate-300 rounded-xl disabled:opacity-50 disabled:cursor-not-allowed hover:bg-navy-800 hover:text-white transition-colors"
                                    >
                                        Next
                                    </button>
                                </motion.div>
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