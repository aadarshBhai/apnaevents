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
    registrationFee,
    mode,
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
    const bgClasses = "bg-white border border-slate-200 hover:border-[#0d3862]/30 shadow-sm hover:shadow-md";

    if (isList) {
        return (
            <div
                onClick={handleCardClick}
                className={`${cardClasses} ${bgClasses} flex flex-col md:flex-row gap-6 md:p-4 rounded-2xl`}
            >
                <div className="relative w-full md:w-64 h-48 md:h-40 rounded-xl overflow-hidden shrink-0">
                    <div
                        className="w-full h-full bg-slate-100 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                        style={{ backgroundImage: `url(${image && image.startsWith('http') ? image : 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'})` }}
                    />
                    <div className="absolute top-3 left-3">
                        <span className="bg-[#0d3862] px-3 py-1.5 rounded-lg text-[9px] font-bold text-white uppercase tracking-[0.15em]">
                            {category}
                        </span>
                    </div>
                </div>

                <div className="flex flex-col justify-between flex-grow py-2">
                    <div>
                        <div className="flex justify-between items-start gap-4 mb-2">
                            <h3 className="text-xl md:text-2xl font-serif font-bold text-[#0d3862] group-hover:text-[#911116] transition-colors line-clamp-2">
                                {title}
                            </h3>
                            {verified && (
                                <div className="flex items-center gap-1.5 bg-blue-50 text-[#0d3862] px-3 py-1.5 rounded-lg text-[9px] font-bold border border-blue-100 shrink-0 uppercase tracking-[0.15em]">
                                    <ShieldCheck size={12} className="text-[#0d3862]" />
                                    <span>Verified</span>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-wrap gap-x-6 gap-y-2 mb-4">
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                <Calendar size={16} className="text-[#0d3862]" />
                                <span>{formatDate(date)}</span>
                            </div>
                            <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                <MapPin size={16} className="text-[#0d3862]" />
                                <span>{location}</span>
                            </div>
                            {ageGroup && (
                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                    <Users size={16} className="text-[#0d3862]" />
                                    <span>{ageGroup}</span>
                                </div>
                            )}
                            {deadline && (
                                <div className="flex items-center gap-2 text-slate-600 text-sm font-bold">
                                    <span className="text-[#911116]">⏰</span>
                                    <span className="text-[#911116]">Deadline: {formatDate(deadline)}</span>
                                </div>
                            )}
                            {mode && (
                                <div className="flex items-center gap-2 text-slate-500 text-sm font-medium">
                                    <Laptop size={16} className="text-[#0d3862]" />
                                    <span>{mode}</span>
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex items-center justify-between mt-auto">
                        <div className="flex items-center gap-2">
                            <span className="text-lg font-bold text-[#0d3862] tracking-tight">
                                {registrationFee || 'Complimentary Participation'}
                            </span>
                            <div className="w-1 h-1 rounded-full bg-slate-200"></div>
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Merit Registry</span>
                        </div>
                        <button className="text-[#0d3862] font-bold uppercase tracking-[0.2em] text-[9px] flex items-center gap-2 hover:gap-3 transition-all">
                            View Prospectus <ArrowRight size={14} />
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
            className={`${cardClasses} ${bgClasses} flex flex-col h-full rounded-xl relative overflow-hidden`}
        >
            {/* Image Section */}
            <div className="relative h-48 overflow-hidden">
                <div
                    className="w-full h-full bg-slate-100 bg-cover bg-center transition-transform duration-700 group-hover:scale-110"
                    style={{ backgroundImage: `url(${image && image.startsWith('http') ? image : 'https://images.unsplash.com/photo-1501281668745-f7f57925c3b4?auto=format&fit=crop&q=80&w=800'})` }}
                />
                <div className="absolute top-4 left-4">
                    <span className="bg-[#0d3862] px-3 py-1 rounded-md text-[9px] font-bold text-white uppercase tracking-[0.15em]">
                        {category}
                    </span>
                </div>
                {verified && (
                    <div className="absolute top-4 right-4">
                        <div className="flex items-center gap-1.5 bg-white/95 backdrop-blur-sm text-[#0d3862] px-3 py-1.5 rounded-lg text-[9px] font-bold border border-slate-100 shadow-sm uppercase tracking-[0.15em]">
                            <ShieldCheck size={12} className="text-[#0d3862]" />
                            <span>Verified</span>
                        </div>
                    </div>
                )}
            </div>

            {/* Content Section */}
            <div className="p-6 flex flex-col flex-grow bg-white">
                <h3 className="text-xl font-serif font-bold text-[#0d3862] mb-4 line-clamp-2 group-hover:text-[#911116] transition-colors">
                    {title}
                </h3>

                <div className="space-y-3 mb-6 flex-grow">
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <Calendar size={16} className="text-[#0d3862] shrink-0 opacity-80" />
                        <span>{formatDate(date)}</span>
                    </div>
                    <div className="flex items-center gap-3 text-slate-500 text-sm">
                        <MapPin size={16} className="text-[#0d3862] shrink-0 opacity-80" />
                        <span className="line-clamp-1">{location}</span>
                    </div>
                    {prizes && (
                        <div className="flex items-center gap-3 text-slate-500 text-sm">
                            <Trophy size={16} className="text-[#fcb900] shrink-0" />
                            <span className="line-clamp-1">{prizes}</span>
                        </div>
                    )}
                    <div className="flex items-center gap-3 text-slate-400 text-[10px] font-bold uppercase tracking-widest pt-2">
                        <span className="text-[#0d3862]">{registrationFee || 'Full Scholarship'}</span>
                        {mode && (
                            <>
                                <div className="w-1 h-1 rounded-full bg-slate-300"></div>
                                <span>{mode}</span>
                            </>
                        )}
                    </div>
                </div>

                {/* Footer */}
                <div className="pt-4 border-t border-slate-100 flex items-center justify-between mt-auto">
                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
                        {eligibility || "Open Enrollment"}
                    </span>
                    <div className="w-8 h-8 rounded-full bg-slate-50 flex items-center justify-center text-[#0d3862] group-hover:bg-[#0d3862] group-hover:text-white transition-all duration-300">
                        <ArrowRight size={14} />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EventCard;
