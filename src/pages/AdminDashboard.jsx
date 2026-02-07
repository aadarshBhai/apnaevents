import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
    Users,
    ShieldCheck,
    AlertTriangle,
    Settings,
    FileText,
    Search,
    MoreVertical,
    CheckCircle,
    XCircle,
    BarChart3,
    Activity,
    Database,
    Lock,
    X,
    ChevronRight,
    Plus,
    Edit,
    Trash2,
    Calendar,
    MapPin,
    Tag,
    Image,
    Upload,
    Eye,
    Filter,
    RefreshCw
} from 'lucide-react';
import axios from 'axios';
import io from 'socket.io-client';
import Navbar from '../components/premium/Navbar';
import { useAuth } from '../context/AuthContext';
import api from '../api/config';
import { triggerEventCleanup, getCleanupStatus } from '../api/cleanup';

const AdminDashboard = () => {
    const { user } = useAuth();
    console.log('Current user:', user);
    console.log('User role:', user?.role);
    
    const [activeTab, setActiveTab] = useState('Overview');
    const [pendingOrganizers, setPendingOrganizers] = useState([]);
    const [stats, setStats] = useState({
        totalUsers: 0,
        totalEvents: 0,
        pendingEvents: 0,
        upcomingEvents: 0
    });
    const [events, setEvents] = useState([]);
    const [cleanupStatus, setCleanupStatus] = useState(null);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [showEventModal, setShowEventModal] = useState(false);
    const [showUserModal, setShowUserModal] = useState(false);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [editingEvent, setEditingEvent] = useState(null);
    const [socket, setSocket] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);
    const [searchTerm, setSearchTerm] = useState('');
    const [filterStatus, setFilterStatus] = useState('');
    const [filterCategory, setFilterCategory] = useState('');
    
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        date: '',
        deadline: '',
        location: '',
        category: '',
        eligibility: '',
        prizes: '',
        applicationLink: '',
        ageGroup: '',
        tags: '',
        status: 'upcoming',
        featured: false,
        verified: true
    });

    // Initialize Socket.IO
    useEffect(() => {
        const newSocket = io('http://localhost:5000', {
            transports: ['websocket', 'polling'], // Try websocket first, fallback to polling
            timeout: 20000,
                    reconnection: true,
                    reconnectionAttempts: 5,
                    reconnectionDelay: 1000
                });
                setSocket(newSocket);
                
                newSocket.on('connect', () => {
                    console.log('Socket connected successfully');
                    newSocket.emit('joinAdminRoom');
                });
                
                newSocket.on('disconnect', () => {
                    console.log('Socket disconnected');
                });
                
                newSocket.on('connect_error', (error) => {
                    console.error('Socket connection error:', error);
                });
                
                newSocket.on('eventCreated', (event) => {
                    setEvents(prev => [event, ...prev]);
                    fetchStats();
                });
                
                newSocket.on('eventUpdated', (event) => {
                    setEvents(prev => prev.map(e => e._id === event._id ? event : e));
                });
                
                newSocket.on('eventDeleted', ({ id }) => {
                    setEvents(prev => prev.filter(e => e._id !== id));
                    fetchStats();
                });
                
                newSocket.on('organizerApproved', (organizer) => {
                    console.log('Organizer approved:', organizer);
                    fetchPendingOrganizers();
                    fetchUsers();
                });
                
                return () => {
                    newSocket.close();
                };
            }, []);
    
    // Fetch dashboard data
    useEffect(() => {
        fetchStats();
        fetchEvents();
        fetchUsers();
        fetchPendingOrganizers();
    }, []);
    
    const fetchPendingOrganizers = async () => {
        try {
            const response = await api.get('/admin/organizers/pending');
            setPendingOrganizers(response.data || []);
        } catch (error) {
            console.error('Error fetching pending organizers:', error);
            setPendingOrganizers([]);
        }
    };
    
    // Cleanup functions
    const triggerManualCleanup = async () => {
        try {
            setLoading(true);
            const result = await triggerEventCleanup();
            console.log('Cleanup triggered:', result);
            
            // Refresh status after cleanup
            setTimeout(() => {
                getCleanupStatusData();
            }, 2000);
            
        } catch (error) {
            console.error('Cleanup error:', error);
        } finally {
            setLoading(false);
        }
    };

    const getCleanupStatusData = async () => {
        try {
            const status = await getCleanupStatus();
            setCleanupStatus(status.data);
            console.log('Cleanup status:', status.data);
        } catch (error) {
            console.error('Error getting cleanup status:', error);
            setCleanupStatus({ active: false, error: error.message });
        }
    };

    const fetchStats = async () => {
        try {
            console.log('Fetching admin stats...');
            const response = await api.get('/admin/stats');
            console.log('Admin stats response:', response.data);
            setStats(response.data);
        } catch (error) {
            console.error('Error fetching stats:', error.response?.data || error.message);
            // Set default values on error
            setStats({
                totalUsers: 0,
                totalEvents: 0,
                pendingEvents: 0,
                upcomingEvents: 0
            });
        }
    };
    
    const fetchEvents = async () => {
        try {
            setLoading(true);
            console.log('Fetching events...');
            const params = new URLSearchParams();
            if (searchTerm) params.append('search', searchTerm);
            if (filterStatus) params.append('status', filterStatus);
            if (filterCategory) params.append('category', filterCategory);
            
            const response = await api.get(`/admin/events?${params}`);
            console.log('Events response:', response.data);
            setEvents(response.data.events || []);
        } catch (error) {
            console.error('Error fetching events:', error.response?.data || error.message);
            setEvents([]);
        } finally {
            setLoading(false);
        }
    };
    
    const fetchUsers = async () => {
        try {
            const response = await api.get('/admin/users');
            setUsers(response.data.users || []);
        } catch (error) {
            console.error('Error fetching users:', error);
            setUsers([]);
        }
    };
    
    const handleEventSubmit = async (e) => {
        e.preventDefault();
        console.log('Submitting event...');
        const formDataObj = new FormData();
        
        Object.keys(formData).forEach(key => {
            if (key === 'tags') {
                formDataObj.append(key, formData[key].split(',').map(tag => tag.trim()));
            } else {
                formDataObj.append(key, formData[key]);
            }
        });
        
        if (document.getElementById('eventImage').files[0]) {
            formDataObj.append('image', document.getElementById('eventImage').files[0]);
        }
        
        try {
            console.log('Sending request to:', editingEvent ? `/admin/events/${editingEvent._id}` : '/admin/events');
            
            if (editingEvent) {
                await api.put(`/admin/events/${editingEvent._id}`, formDataObj, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            } else {
                await api.post('/admin/events', formDataObj, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
            }
            
            console.log('Event saved successfully');
            resetEventForm();
            fetchEvents();
            fetchStats();
        } catch (error) {
            console.error('Error saving event:', error.response?.data || error.message);
            alert(`Error saving event: ${error.response?.data?.message || error.message}`);
        }
    };
    
    const handleApproveOrganizer = async (organizerId) => {
        try {
            await api.put(`/admin/organizers/${organizerId}/approve`);
            fetchPendingOrganizers();
            fetchUsers();
        } catch (error) {
            console.error('Error approving organizer:', error);
            alert('Error approving organizer. Please try again.');
        }
    };
    
    const handleEditEvent = (event) => {
        setEditingEvent(event);
        setFormData({
            title: event.title,
            description: event.description,
            date: new Date(event.date).toISOString().split('T')[0],
            deadline: event.deadline ? new Date(event.deadline).toISOString().split('T')[0] : '',
            location: event.location,
            category: event.category,
            eligibility: event.eligibility || '',
            prizes: event.prizes || '',
            applicationLink: event.applicationLink || '',
            ageGroup: event.ageGroup || '',
            tags: event.tags ? event.tags.join(', ') : '',
            status: event.status,
            featured: event.featured,
            verified: event.verified
        });
        setShowEventModal(true);
    };
    
    const resetEventForm = () => {
        setFormData({
            title: '',
            description: '',
            date: '',
            deadline: '',
            location: '',
            category: '',
            eligibility: '',
            prizes: '',
            applicationLink: '',
            ageGroup: '',
            tags: '',
            status: 'upcoming',
            featured: false,
            verified: true
        });
        setEditingEvent(null);
        setImagePreview(null);
        setShowEventModal(false);
    };
    
    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleManage = (entity) => {
        setSelectedEntity(entity);
        setShowUserModal(true);
    };
    
    const handleDelete = (id) => {
        if (window.confirm("Are you sure you want to delete this entity? This action is irreversible.")) {
            alert(`Entity ${id} has been wiped from the database.`);
        }
    };

    const statsCards = [
        { label: 'Total Users', value: (stats.totalUsers || 0).toLocaleString(), icon: <Users size={28} />, color: 'from-blue-500 to-blue-600', bgLight: 'bg-blue-500/10' },
        { label: 'Total Events', value: (stats.totalEvents || 0).toLocaleString(), icon: <Database size={28} />, color: 'from-emerald-500 to-emerald-600', bgLight: 'bg-emerald-500/10' },
        { label: 'Pending Events', value: (stats.pendingEvents || 0).toLocaleString(), icon: <AlertTriangle size={28} />, color: 'from-amber-500 to-amber-600', bgLight: 'bg-amber-500/10' },
        { label: 'Upcoming Events', value: (stats.upcomingEvents || 0).toLocaleString(), icon: <Calendar size={28} />, color: 'from-violet-500 to-violet-600', bgLight: 'bg-violet-500/10' },
    ];

    return (
        <div className="min-h-screen bg-navy-950 text-slate-300 selection:bg-emerald-500/30">
            <Navbar />
            <div className="pt-24 md:pt-32 pb-20">
                <div className="container mx-auto px-4">

                    {/* Admin Header */}
                    <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="mb-12">
                        <div className="bg-gradient-to-r from-navy-900 via-navy-800 to-navy-900 rounded-[3rem] p-10 md:p-12 shadow-2xl border border-white/10 relative overflow-hidden">
                            <div className="absolute inset-0 bg-grid-white/[0.02] bg-[length:20px_20px]" />
                            <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-8 relative z-10">
                                <div>
                                    <div className="flex items-center gap-4 mb-4">
                                        <div className="bg-gradient-to-r from-red-500 to-red-600 text-white text-[10px] font-black px-4 py-2 rounded-full uppercase tracking-widest shadow-lg shadow-red-500/25 flex items-center gap-2">
                                            <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                                            System Root Access
                                        </div>
                                        <div className="flex items-center gap-2 text-emerald-400 text-[10px] font-black uppercase tracking-widest">
                                            <div className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></div>
                                            Live
                                        </div>
                                    </div>
                                    <h1 className="text-4xl md:text-6xl font-black tracking-tight text-white mb-3">Admin Protocol</h1>
                                    <p className="text-slate-300 font-bold text-lg">Systems operational. Logged in as: <span className="text-emerald-400">{user?.name}</span></p>
                                </div>
                                <div className="flex flex-col sm:flex-row gap-3">
                                    <button 
                                        onClick={() => {
                                            resetEventForm();
                                            setShowEventModal(true);
                                        }} 
                                        className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white py-4 px-6 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                                    >
                                        <Plus size={20} /> Create Event
                                    </button>
                                    <button onClick={() => alert("Downloading encrypted database dump...")} className="bg-white/10 backdrop-blur-sm text-white py-4 px-6 rounded-2xl flex items-center gap-2 font-bold border border-white/20 hover:bg-white/20 transition-all duration-300">
                                        <Database size={20} /> Export DB
                                    </button>
                                    <button onClick={() => alert("System Lockdown Initiated. All non-admin sessions terminated.")} className="bg-gradient-to-r from-red-500 to-red-600 text-white py-4 px-6 rounded-2xl flex items-center gap-2 font-bold shadow-lg shadow-red-500/25 hover:shadow-red-500/40 transition-all duration-300">
                                        <Lock size={20} /> System Lock
                                    </button>
                                </div>
                            </div>
                        </div>
                    </motion.div>

                    {/* Manage Entity Modal */}
                    <AnimatePresence>
                        {showUserModal && selectedEntity && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setShowUserModal(false)}
                                    className="fixed inset-0 bg-navy-950/90 backdrop-blur-sm"
                                />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-navy-900 w-full max-w-lg rounded-[2.5rem] relative z-10 p-10 shadow-2xl border border-white/10"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 text-white">
                                            <Settings className="text-emerald-500" /> Manage Entity
                                        </h3>
                                        <button onClick={() => setShowUserModal(false)} className="p-2 bg-navy-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Entity Name</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedEntity.name}
                                                className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Global Status</label>
                                            <select className="w-full appearance-none py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10">
                                                <option>Active / Verified</option>
                                                <option>Suspended</option>
                                                <option>Pending Review</option>
                                                <option>Flagged for Security</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => {
                                                    alert("Entity updated successfully.");
                                                    setShowUserModal(false);
                                                }}
                                                className="btn-primary flex-grow py-5 rounded-2xl"
                                            >
                                                Apply Changes
                                            </button>
                                            <button
                                                onClick={() => handleDelete(selectedEntity.id)}
                                                className="p-5 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500/20 transition-colors border border-red-500/20"
                                            >
                                                <AlertTriangle size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Quick Stats */}
                    <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                        {statsCards.map((stat, idx) => (
                            <motion.div
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: idx * 0.1 }}
                                key={idx}
                                whileHover={{ y: -4, scale: 1.02 }}
                                className="bg-navy-900/50 rounded-[2rem] p-8 shadow-xl border border-white/5 hover:border-emerald-500/30 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-300 backdrop-blur-sm"
                            >
                                <div className={`w-16 h-16 bg-gradient-to-r ${stat.color} rounded-2xl flex items-center justify-center mb-6 shadow-lg`}>
                                    <div className="text-white">{stat.icon}</div>
                                </div>
                                <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-2">{stat.label}</div>
                                <div className="text-3xl md:text-4xl font-black text-white">{stat.value}</div>
                            </motion.div>
                        ))}
                    </div>

                    {/* Navigation Tabs */}
                    <div className="flex gap-4 mb-8 border-b border-white/10">
                        {['Overview', 'Events', 'Users', 'Organizers', 'Settings'].map((tab) => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`pb-4 px-6 font-bold text-sm transition-all duration-300 border-b-2 ${
                                    activeTab === tab
                                        ? 'text-emerald-400 border-emerald-400'
                                        : 'text-slate-500 border-transparent hover:text-slate-300'
                                }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Tab Content */}
                    {activeTab === 'Events' && (
                        <div className="bg-navy-900/50 rounded-[2rem] p-10 shadow-xl border border-white/5 backdrop-blur-sm">
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black flex items-center gap-3 text-white">
                                    <Calendar className="text-emerald-500" /> Event Management
                                </h3>
                                <div className="flex gap-4">
                                    <div className="relative">
                                        <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={18} />
                                        <input
                                            type="text"
                                            placeholder="Search events..."
                                            value={searchTerm}
                                            onChange={(e) => setSearchTerm(e.target.value)}
                                            onKeyPress={(e) => e.key === 'Enter' && fetchEvents()}
                                            className="pl-12 pr-5 py-4 bg-navy-950 border border-white/10 rounded-2xl text-sm w-64 font-medium outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 text-slate-200 placeholder:text-slate-600"
                                        />
                                    </div>
                                    <select
                                        value={filterStatus}
                                        onChange={(e) => setFilterStatus(e.target.value)}
                                        className="px-5 py-4 bg-navy-950 border border-white/10 rounded-2xl text-sm font-medium outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 text-slate-200"
                                    >
                                        <option value="">All Status</option>
                                        <option value="upcoming">Upcoming</option>
                                        <option value="ongoing">Ongoing</option>
                                        <option value="closed">Closed</option>
                                        <option value="draft">Draft</option>
                                    </select>
                                    <button
                                        onClick={fetchEvents}
                                        className="p-4 bg-emerald-500/10 text-emerald-400 rounded-2xl hover:bg-emerald-500/20 transition-all duration-300 border border-emerald-500/20"
                                    >
                                        <RefreshCw size={18} />
                                    </button>
                                </div>
                            </div>
                            
                            {loading ? (
                                <div className="text-center py-12">
                                    <RefreshCw className="animate-spin mx-auto mb-4 text-emerald-400" size={32} />
                                    <p className="text-slate-400">Loading events...</p>
                                </div>
                            ) : (
                                <div className="overflow-x-auto">
                                    <table className="w-full text-left">
                                        <thead>
                                            <tr className="border-b border-white/5">
                                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Event</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Date</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Category</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Status</th>
                                                <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                            </tr>
                                        </thead>
                                        <tbody className="divide-y divide-white/5">
                                            {events.map((event) => (
                                                <tr key={event._id} className="group hover:bg-white/[0.02] transition-colors">
                                                    <td className="py-5">
                                                        <div className="flex items-center gap-4">
                                                            {event.image && (
                                                                <img 
                                                                    src={`http://localhost:5000${event.image}`} 
                                                                    alt={event.title}
                                                                    className="w-12 h-12 rounded-xl object-cover"
                                                                />
                                                            )}
                                                            <div>
                                                                <div className="font-bold text-slate-200 group-hover:text-white transition-colors">{event.title}</div>
                                                                <div className="text-sm text-slate-500 flex items-center gap-2">
                                                                    <MapPin size={14} />
                                                                    {event.location}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </td>
                                                    <td className="py-5 text-sm font-bold text-slate-500">
                                                        {new Date(event.date).toLocaleDateString()}
                                                    </td>
                                                    <td className="py-5">
                                                        <span className="px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider bg-blue-500/10 text-blue-400 border border-blue-500/20">
                                                            {event.category}
                                                        </span>
                                                    </td>
                                                    <td className="py-5">
                                                        <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                                            event.status === 'upcoming' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                            event.status === 'ongoing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                            event.status === 'closed' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                            'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                                        }`}>
                                                            {event.status}
                                                        </span>
                                                    </td>
                                                    <td className="py-5 text-right">
                                                        <div className="flex justify-end gap-2">
                                                            <button
                                                                onClick={() => handleEditEvent(event)}
                                                                className="p-3 bg-navy-800 text-slate-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                                            >
                                                                <Edit size={18} />
                                                            </button>
                                                            <button
                                                                onClick={() => handleDeleteEvent(event._id)}
                                                                className="p-3 bg-red-500/10 text-red-400 rounded-xl hover:bg-red-500/20 transition-all duration-300 border border-red-500/10"
                                                            >
                                                                <Trash2 size={18} />
                                                            </button>
                                                        </div>
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                    {events.length === 0 && (
                                        <div className="text-center py-12">
                                            <Calendar className="mx-auto mb-4 text-slate-600" size={48} />
                                            <p className="text-slate-400">No events found</p>
                                        </div>
                                    )}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {activeTab === 'Overview' && (
                        <div className="grid lg:grid-cols-3 gap-8">
                            {/* Control Panel */}
                            <div className="lg:col-span-2 space-y-8">
                                <div className="bg-navy-900/50 rounded-[2rem] p-10 shadow-xl border border-white/5 backdrop-blur-sm">
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-2xl font-black flex items-center gap-3 text-white">
                                            <Activity className="text-emerald-500" /> Recent Activity
                                        </h3>
                                    </div>
                                    <div className="space-y-4">
                                        {stats.recentEvents?.map((event) => (
                                            <div key={event._id} className="p-4 bg-white/[0.02] rounded-2xl border border-white/5 hover:bg-white/[0.05] transition-colors">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <div className="font-bold text-slate-200">{event.title}</div>
                                                        <div className="text-sm text-slate-500">{event.category} • {new Date(event.createdAt).toLocaleDateString()}</div>
                                                    </div>
                                                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                                        event.status === 'upcoming' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20' :
                                                        event.status === 'ongoing' ? 'bg-amber-500/10 text-amber-400 border border-amber-500/20' :
                                                        'bg-red-500/10 text-red-400 border border-red-500/20'
                                                    }`}>
                                                        {event.status}
                                                    </span>
                                                </div>
                                            </div>
                                        ))}
                                        {(!stats.recentEvents || stats.recentEvents.length === 0) && (
                                            <div className="text-center py-8">
                                                <Activity className="mx-auto mb-4 text-slate-600" size={32} />
                                                <p className="text-slate-400">No recent activity</p>
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>

                            {/* Side Controls */}
                            <div className="space-y-8">
                                <div className="bg-gradient-to-br from-orange-500 to-orange-600 text-white rounded-[2.5rem] p-10 shadow-2xl">
                                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                        <Activity className="text-white" /> Global Alert
                                    </h3>
                                    <div className="space-y-5">
                                        <textarea
                                            placeholder="Send emergency update to all entities..."
                                            className="w-full h-28 bg-white/10 backdrop-blur-sm border-2 border-white/20 rounded-2xl p-5 text-sm font-bold placeholder:text-orange-200 outline-none transition-all duration-300 focus:bg-white/20 focus:border-white/40 focus:ring-4 focus:ring-white/10 resize-none"
                                        />
                                        <button
                                            onClick={() => alert("Global alert dispatched to 100k+ active sessions.")}
                                            className="w-full py-5 bg-white text-orange-600 font-black rounded-2xl shadow-xl shadow-orange-600/30 hover:shadow-orange-600/40 active:scale-95 transition-all duration-300"
                                        >
                                            Push Announcement
                                        </button>
                                    </div>
                                </div>

                                <div className="bg-gradient-to-br from-navy-900 to-navy-800 text-white rounded-[2.5rem] p-10 shadow-2xl border border-white/10">
                                    <h3 className="text-2xl font-black mb-6 flex items-center gap-3">
                                        <ShieldCheck className="text-emerald-400" /> Security Center
                                    </h3>
                                    <div className="space-y-5">
                                        <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                                <span className="text-sm font-bold">2FA Enforcement</span>
                                            </div>
                                            <ChevronRight size={18} className="text-slate-400" />
                                        </div>
                                        <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                                <span className="text-sm font-bold">Audit Logging</span>
                                            </div>
                                            <ChevronRight size={18} className="text-slate-400" />
                                        </div>
                                        <div className="p-5 bg-white/5 backdrop-blur-sm rounded-2xl border border-white/10 flex items-center justify-between hover:bg-white/10 transition-colors cursor-pointer">
                                            <div className="flex items-center gap-3">
                                                <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse"></div>
                                                <span className="text-sm font-bold">IP Whitelist</span>
                                            </div>
                                            <ChevronRight size={18} className="text-slate-400" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'Users' && (
                        <div className="bg-navy-900/50 rounded-[2rem] p-10 shadow-xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-black flex items-center gap-3 text-white mb-8">
                                <Users className="text-emerald-500" /> User Management
                            </h3>
                            <div className="overflow-x-auto">
                                <table className="w-full text-left">
                                    <thead>
                                        <tr className="border-b border-white/5">
                                            <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">User</th>
                                            <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Email</th>
                                            <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest">Role</th>
                                            <th className="pb-4 text-[10px] font-black text-slate-500 uppercase tracking-widest text-right">Actions</th>
                                        </tr>
                                    </thead>
                                    <tbody className="divide-y divide-white/5">
                                        {users.map((user) => (
                                            <tr key={user._id} className="group hover:bg-white/[0.02] transition-colors">
                                                <td className="py-5">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 bg-gradient-to-r from-emerald-500 to-emerald-600 rounded-full flex items-center justify-center text-white font-black">
                                                            {user.name.charAt(0).toUpperCase()}
                                                        </div>
                                                        <div className="font-bold text-slate-200 group-hover:text-white transition-colors">{user.name}</div>
                                                    </div>
                                                </td>
                                                <td className="py-5 text-sm text-slate-500">{user.email}</td>
                                                <td className="py-5">
                                                    <span className={`px-3 py-1 rounded-xl text-[10px] font-black uppercase tracking-wider ${
                                                        user.role === 'admin' ? 'bg-red-500/10 text-red-400 border border-red-500/20' :
                                                        user.role === 'organizer' ? 'bg-blue-500/10 text-blue-400 border border-blue-500/20' :
                                                        'bg-slate-500/10 text-slate-400 border border-slate-500/20'
                                                    }`}>
                                                        {user.role}
                                                    </span>
                                                </td>
                                                <td className="py-5 text-right">
                                                    <div className="flex justify-end gap-2">
                                                        <button
                                                            onClick={() => handleManage(user)}
                                                            className="p-3 bg-navy-800 text-slate-400 rounded-xl hover:bg-emerald-500 hover:text-white transition-all duration-300"
                                                        >
                                                            <Settings size={18} />
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    )}
                    
                    {activeTab === 'Organizers' && (
                        <div className="bg-navy-900/50 rounded-[2rem] p-10 shadow-xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-black flex items-center gap-3 text-white mb-8">
                                <Users className="text-emerald-500" /> Organizer Approvals
                            </h3>
                            {pendingOrganizers.length === 0 ? (
                                <div className="text-center py-12">
                                    <CheckCircle className="mx-auto mb-4 text-emerald-500" size={48} />
                                    <p className="text-slate-400">No pending organizer approvals</p>
                                </div>
                            ) : (
                                <div className="space-y-3">
                                    {pendingOrganizers.map((organizer) => (
                                        <div key={organizer._id} className="p-4 bg-navy-800/30 rounded-2xl border border-white/10 hover:bg-navy-800/50 transition-all duration-300">
                                            <div className="flex justify-between items-center">
                                                <div className="flex items-center gap-4">
                                                    <div className="w-12 h-12 bg-navy-700/50 text-emerald-400 rounded-full flex items-center justify-center font-black border border-emerald-500/20">
                                                        {organizer.name.charAt(0).toUpperCase()}
                                                    </div>
                                                    <div>
                                                        <div className="font-bold text-white">{organizer.name}</div>
                                                        <div className="text-sm text-slate-400">{organizer.email}</div>
                                                        <span className="inline-block mt-1 px-2 py-1 bg-amber-500/20 text-amber-400 border border-amber-500/30 rounded-lg text-[10px] font-black uppercase tracking-wider">
                                                            Pending Approval
                                                        </span>
                                                    </div>
                                                </div>
                                                <button
                                                    onClick={() => handleApproveOrganizer(organizer._id)}
                                                    className="px-4 py-2 bg-emerald-500 hover:bg-emerald-600 text-white rounded-xl font-bold transition-all duration-300 shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 flex items-center gap-2 text-sm"
                                                >
                                                    <CheckCircle size={16} />
                                                    Approve
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    )}
                    
                    {activeTab === 'Settings' && (
                        <div className="bg-navy-900/50 rounded-[2rem] p-10 shadow-xl border border-white/5 backdrop-blur-sm">
                            <h3 className="text-2xl font-black flex items-center gap-3 text-white mb-8">
                                <Settings className="text-emerald-500" /> Event Cleanup & Settings
                            </h3>
                            
                            <div className="grid md:grid-cols-2 gap-8">
                                {/* Cleanup Controls */}
                                <div className="space-y-6">
                                    <h4 className="text-lg font-bold text-white mb-4">Event Management</h4>
                                    
                                    <div className="space-y-4">
                                        <button
                                            onClick={triggerManualCleanup}
                                            className="w-full btn-primary flex items-center justify-center gap-2"
                                        >
                                            <Trash2 size={18} />
                                            Cleanup Expired Events
                                        </button>
                                        
                                        <button
                                            onClick={getCleanupStatus}
                                            className="w-full glass-card p-4 rounded-xl text-slate-300 hover:bg-navy-800 transition-all duration-300"
                                        >
                                            <RefreshCw size={18} />
                                            Check Cleanup Status
                                        </button>
                                    </div>
                                </div>

                                {/* Cleanup Status */}
                                <div className="space-y-6">
                                    <h4 className="text-lg font-bold text-white mb-4">System Status</h4>
                                    
                                    {cleanupStatus && (
                                        <div className="glass-card p-6 rounded-xl space-y-4">
                                            <div className="flex items-center justify-between">
                                                <span className="text-emerald-400 font-medium">Auto-Cleanup Status:</span>
                                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                                                    cleanupStatus.active 
                                                        ? 'bg-emerald-500/20 text-emerald-300' 
                                                        : 'bg-slate-500/20 text-slate-300'
                                                }`}>
                                                    {cleanupStatus.active ? 'Active' : 'Inactive'}
                                                </span>
                                            </div>
                                            
                                            {cleanupStatus.lastRun && (
                                                <div className="text-sm text-slate-400">
                                                    <span className="font-medium">Last Run:</span> {new Date(cleanupStatus.lastRun).toLocaleString()}
                                                </div>
                                            )}
                                            
                                            {cleanupStatus.nextRun && (
                                                <div className="text-sm text-slate-400">
                                                    <span className="font-medium">Next Run:</span> {new Date(cleanupStatus.nextRun).toLocaleString()}
                                                </div>
                                            )}
                                            
                                            {cleanupStatus.config && (
                                                <div className="mt-4 pt-4 border-t border-white/10">
                                                    <h5 className="text-sm font-medium text-white mb-2">Recent Activity</h5>
                                                    {cleanupStatus.config.deletedCount > 0 && (
                                                        <div className="text-emerald-400 text-sm">
                                                            ✅ Deleted {cleanupStatus.config.deletedCount} expired events
                                                            {cleanupStatus.config.failedCount > 0 && (
                                                                <span className="text-red-400"> ({cleanupStatus.config.failedCount} failed)</span>
                                                            )}
                                                        </div>
                                                    )}
                                                    
                                                    {cleanupStatus.config.deletedEvents && (
                                                        <div className="mt-3 space-y-2">
                                                            <h6 className="text-xs font-medium text-slate-400 uppercase tracking-wider">Recently Deleted Events:</h6>
                                                            {cleanupStatus.config.deletedEvents.slice(0, 5).map((event, index) => (
                                                                <div key={event.eventId} className="text-xs text-slate-500 bg-navy-800/50 rounded p-2">
                                                                    {event.title}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    ) || (
                                        <div className="glass-card p-6 rounded-xl text-center">
                                            <Database className="mx-auto mb-4 text-slate-600" size={48} />
                                            <p className="text-slate-400">Loading cleanup status...</p>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Event Create/Edit Modal */}
                    <AnimatePresence>
                        {showEventModal && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => resetEventForm()}
                                    className="fixed inset-0 bg-navy-950/90 backdrop-blur-sm"
                                />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-navy-900 w-full max-w-4xl max-h-[90vh] overflow-y-auto rounded-[2.5rem] relative z-10 p-10 shadow-2xl border border-white/10"
                                >
                                    <div className="flex justify-between items-center mb-8">
                                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 text-white">
                                            <Calendar className="text-emerald-500" /> {editingEvent ? 'Edit Event' : 'Create New Event'}
                                        </h3>
                                        <button onClick={resetEventForm} className="p-2 bg-navy-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    
                                    <form onSubmit={handleEventSubmit} className="space-y-6">
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Event Title *</label>
                                                <input
                                                    type="text"
                                                    value={formData.title}
                                                    onChange={(e) => setFormData({...formData, title: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    placeholder="Enter event title"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Category *</label>
                                                <select
                                                    value={formData.category}
                                                    onChange={(e) => setFormData({...formData, category: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    required
                                                >
                                                    <option value="">Select category</option>
                                                    <option value="Technology">Technology</option>
                                                    <option value="Sports">Sports</option>
                                                    <option value="Cultural">Cultural</option>
                                                    <option value="Academic">Academic</option>
                                                    <option value="Business">Business</option>
                                                    <option value="Arts">Arts</option>
                                                    <option value="Music">Music</option>
                                                    <option value="Workshop">Workshop</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Description *</label>
                                            <textarea
                                                value={formData.description}
                                                onChange={(e) => setFormData({...formData, description: e.target.value})}
                                                className="w-full h-32 py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10 resize-none"
                                                placeholder="Describe your event"
                                                required
                                            />
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Event Date *</label>
                                                <input
                                                    type="date"
                                                    value={formData.date}
                                                    onChange={(e) => setFormData({...formData, date: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Registration Deadline</label>
                                                <input
                                                    type="date"
                                                    value={formData.deadline}
                                                    onChange={(e) => setFormData({...formData, deadline: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Location *</label>
                                                <input
                                                    type="text"
                                                    value={formData.location}
                                                    onChange={(e) => setFormData({...formData, location: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    placeholder="Event location"
                                                    required
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Status</label>
                                                <select
                                                    value={formData.status}
                                                    onChange={(e) => setFormData({...formData, status: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                >
                                                    <option value="upcoming">Upcoming</option>
                                                    <option value="ongoing">Ongoing</option>
                                                    <option value="closed">Closed</option>
                                                    <option value="draft">Draft</option>
                                                </select>
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Event Image</label>
                                            <div className="flex items-center gap-6">
                                                <input
                                                    id="eventImage"
                                                    type="file"
                                                    accept="image/*"
                                                    onChange={handleImageChange}
                                                    className="hidden"
                                                />
                                                <button
                                                    type="button"
                                                    onClick={() => document.getElementById('eventImage').click()}
                                                    className="px-6 py-4 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 hover:bg-white/10 transition-all duration-300 flex items-center gap-3"
                                                >
                                                    <Upload size={18} />
                                                    Choose Image
                                                </button>
                                                {(imagePreview || (editingEvent && editingEvent.image)) && (
                                                    <div className="flex items-center gap-4">
                                                        <img 
                                                            src={imagePreview || `http://localhost:5000${editingEvent.image}`}
                                                            alt="Preview"
                                                            className="w-16 h-16 rounded-xl object-cover"
                                                        />
                                                        <span className="text-sm text-slate-400">Image selected</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Eligibility</label>
                                                <input
                                                    type="text"
                                                    value={formData.eligibility}
                                                    onChange={(e) => setFormData({...formData, eligibility: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    placeholder="Who can attend"
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Prizes</label>
                                                <input
                                                    type="text"
                                                    value={formData.prizes}
                                                    onChange={(e) => setFormData({...formData, prizes: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    placeholder="Prizes and rewards"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="grid md:grid-cols-2 gap-6">
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Application Link</label>
                                                <input
                                                    type="url"
                                                    value={formData.applicationLink}
                                                    onChange={(e) => setFormData({...formData, applicationLink: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    placeholder="Registration URL"
                                                />
                                            </div>
                                            
                                            <div className="space-y-2">
                                                <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Age Group</label>
                                                <input
                                                    type="text"
                                                    value={formData.ageGroup}
                                                    onChange={(e) => setFormData({...formData, ageGroup: e.target.value})}
                                                    className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                    placeholder="Age restrictions"
                                                />
                                            </div>
                                        </div>
                                        
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Tags (comma-separated)</label>
                                            <input
                                                type="text"
                                                value={formData.tags}
                                                onChange={(e) => setFormData({...formData, tags: e.target.value})}
                                                className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                                placeholder="tech, innovation, workshop"
                                            />
                                        </div>
                                        
                                        <div className="flex items-center gap-6">
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.featured}
                                                    onChange={(e) => setFormData({...formData, featured: e.target.checked})}
                                                    className="w-5 h-5 bg-navy-950 border border-white/10 rounded text-emerald-500 focus:ring-emerald-500/20"
                                                />
                                                <span className="text-sm font-medium text-slate-200">Featured Event</span>
                                            </label>
                                            
                                            <label className="flex items-center gap-3 cursor-pointer">
                                                <input
                                                    type="checkbox"
                                                    checked={formData.verified}
                                                    onChange={(e) => setFormData({...formData, verified: e.target.checked})}
                                                    className="w-5 h-5 bg-navy-950 border border-white/10 rounded text-emerald-500 focus:ring-emerald-500/20"
                                                />
                                                <span className="text-sm font-medium text-slate-200">Verified</span>
                                            </label>
                                        </div>
                                        
                                        <div className="flex gap-4 pt-6">
                                            <button
                                                type="submit"
                                                className="flex-1 py-5 bg-gradient-to-r from-emerald-500 to-emerald-600 text-white font-black rounded-2xl shadow-lg shadow-emerald-500/25 hover:shadow-emerald-500/40 transition-all duration-300"
                                            >
                                                {editingEvent ? 'Update Event' : 'Create Event'}
                                            </button>
                                            <button
                                                type="button"
                                                onClick={resetEventForm}
                                                className="px-8 py-5 bg-white/10 text-white font-black rounded-2xl border border-white/20 hover:bg-white/20 transition-all duration-300"
                                            >
                                                Cancel
                                            </button>
                                        </div>
                                    </form>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>

                    {/* Manage Entity Modal */}
                    <AnimatePresence>
                        {showUserModal && selectedEntity && (
                            <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4">
                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    onClick={() => setShowUserModal(false)}
                                    className="fixed inset-0 bg-navy-950/90 backdrop-blur-sm"
                                />
                                <motion.div
                                    initial={{ scale: 0.9, opacity: 0 }}
                                    animate={{ scale: 1, opacity: 1 }}
                                    exit={{ scale: 0.9, opacity: 0 }}
                                    className="bg-navy-900 w-full max-w-lg rounded-[2.5rem] relative z-10 p-10 shadow-2xl border border-white/10"
                                >
                                    <div className="flex justify-between items-center mb-6">
                                        <h3 className="text-2xl font-black tracking-tight flex items-center gap-3 text-white">
                                            <Settings className="text-emerald-500" /> Manage Entity
                                        </h3>
                                        <button onClick={() => setShowUserModal(false)} className="p-2 bg-navy-800 rounded-xl text-slate-400 hover:text-white transition-colors">
                                            <X size={20} />
                                        </button>
                                    </div>
                                    <div className="space-y-6">
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Entity Name</label>
                                            <input
                                                type="text"
                                                defaultValue={selectedEntity.name}
                                                className="w-full py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 placeholder:text-slate-600 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10"
                                            />
                                        </div>
                                        <div className="space-y-2">
                                            <label className="text-[10px] font-black text-slate-400 uppercase tracking-widest pl-1">Global Status</label>
                                            <select className="w-full appearance-none py-4 px-6 bg-navy-950 border border-white/10 rounded-2xl font-medium text-slate-200 outline-none transition-all duration-300 focus:border-emerald-500/50 focus:ring-4 focus:ring-emerald-500/10">
                                                <option>Active / Verified</option>
                                                <option>Suspended</option>
                                                <option>Pending Review</option>
                                                <option>Flagged for Security</option>
                                            </select>
                                        </div>
                                        <div className="flex gap-4 pt-4">
                                            <button
                                                onClick={() => {
                                                    alert("Entity updated successfully.");
                                                    setShowUserModal(false);
                                                }}
                                                className="btn-primary flex-grow py-5 rounded-2xl"
                                            >
                                                Apply Changes
                                            </button>
                                            <button
                                                onClick={() => handleDelete(selectedEntity.id)}
                                                className="p-5 bg-red-500/10 text-red-400 rounded-2xl hover:bg-red-500/20 transition-colors border border-red-500/20"
                                            >
                                                <AlertTriangle size={24} />
                                            </button>
                                        </div>
                                    </div>
                                </motion.div>
                            </div>
                        )}
                    </AnimatePresence>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboard;
