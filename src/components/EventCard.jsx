import { Calendar, MapPin, ShieldCheck, ArrowRight, Laptop, Users, Trophy } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { formatDate } from '../utils/dateUtils';

const EventCard = ({ 
    _id, 
    title, 
    category, 
    date, 
    deadline, 
    location, 
    eligibility, 
    prizes, 
    applicationLink, 
    ageGroup, 
    verified = true, 
    image, 
    isList = false 
}) => {
    const navigate = useNavigate();

    const handleCardClick = () => {
        if (_id) {
            navigate(`/event/${_id}`);
        } else {
            // Fallback for mock data
            const eventId = title.toLowerCase().replace(/ /g, '-');
            navigate(`/event/${eventId}`);
        }
    };

    const cardClasses = "group cursor-pointer overflow-hidden transition-all duration-300";
    const bgClasses = "bg-navy-800/50 hover:bg-navy-800 border border-white/5 hover:border-emerald-500/30";

    if (isList) {
        return (
            <div
                onClick={handleCardClick}
                className={`${cardClasses} ${bgClasses} flex flex-col md:flex-row gap-6 md:p-4 rounded-2xl`}
            >
                <div className="relative w-full md:w-64 h-48 md:h-40 rounded-xl overflow-hidden shrink-0">
                    <div
                    className="w-full h-full bg-navy-900 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image && image.startsWith('http') ? image : 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'})` }}
                />
                <div className="absolute top-3 left-3">
                        <span className="bg-navy-900/90 backdrop-blur px-3 py-1.5 rounded-full text-[10px] font-bold text-emerald-400 border border-emerald-500/20 uppercase tracking-widest">
                            {category}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-between flex-grow py-2">
                    <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className="text-xl md:text-2xl font-display font-bold text-slate-100 group-hover:text-emerald-400 transition-colors line-clamp-1">
                                {title}
                            </h3>
                            {verified && (
                                <span className="flex items-center gap-1 bg-emerald-500/10 text-emerald-400 px-2 py-1 rounded-full text-xs font-bold border border-emerald-500/20 shrink-0">
                                    <ShieldCheck size={12} /> Verified
                                </span>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                <Calendar size={16} className="text-emerald-500" />
                                <span>{formatDate(date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                <MapPin size={16} className="text-emerald-500" />
                                <span>{location}</span>
                            </div>
                            {ageGroup && (
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <Users size={16} className="text-emerald-500" />
                                    <span>{ageGroup}</span>
                                </div>
                            )}
                            {deadline && (
                                <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
                                    <span className="text-amber-500">⏰</span>
                                    <span>Deadline: {formatDate(deadline)}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-emerald-400 tracking-tight">Free Access</span>
                            <div className="w-1 h-1 rounded-full bg-slate-600"></div>
                            <span className="text-xs font-bold text-slate-500">Limited Slots</span>
                        </div>
                        <button className="text-emerald-400 font-bold uppercase tracking-widest text-xs flex items-center gap-2 hover:gap-3 transition-all">
                            View Details <ArrowRight size={16} />
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    // Grid View (Default)
    return (
        <div
            onClick={handleCardClick}
            className={`${cardClasses} ${bgClasses} flex flex-col h-full rounded-2xl relative`}
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <div
                    className="w-full h-full bg-navy-900 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image && image.startsWith('http') ? image : 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'})` }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-navy-900 via-transparent to-transparent opacity-80"></div>
                <div className="absolute top-4 left-4">
                    <span className="bg-navy-900/80 backdrop-blur px-3 py-1 rounded-lg text-xs font-bold text-emerald-400 border border-emerald-500/20">
                        {category}
                    </span>
                </div>
                {verified && (
                    <div className="absolute top-4 right-4">
                        <div className="bg-emerald-500 text-white p-1 rounded-full shadow-lg shadow-emerald-500/20">
                            <ShieldCheck size={14} />
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-xl font-display font-bold text-white mb-4 line-clamp-2 group-hover:text-emerald-400 transition-colors">
                    {title}
                </h3>

                <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <Calendar size={16} className="text-emerald-500 shrink-0" />
                        <span>{formatDate(date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-400 text-sm">
                        <MapPin size={16} className="text-emerald-500 shrink-0" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                    {prizes && (
                         <div className="flex items-center gap-3 text-slate-400 text-sm">
                            <Trophy size={16} className="text-gold-500 shrink-0" />
                            <span className="line-clamp-1">{prizes}</span>
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-white/5 flex items-center justify-between mt-auto">
                    <span className="text-sm font-medium text-slate-500">
                        {eligibility || "Open to all"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center group-hover:bg-emerald-500 group-hover:text-white transition-colors duration-300">
                        <ArrowRight size={16} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
