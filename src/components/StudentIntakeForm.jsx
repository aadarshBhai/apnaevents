import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle, AlertCircle, User, Phone, Mail, MapPin, Calendar, BookOpen, Award, Users, Brain, GraduationCap } from 'lucide-react';

const StudentIntakeForm = () => {
    const [currentStep, setCurrentStep] = useState(1);
    const [formData, setFormData] = useState({
        // Step 1: Basic Details
        fullName: '',
        preferredName: '',
        gender: '',
        dob: '',
        mobileNumber: '',
        whatsappNumber: '',
        email: '',
        city: '',
        state: '',
        pincode: '',
        schoolName: '',
        schoolBoard: '',
        currentClass: '',
        stream: '',
        preferredLanguage: '',

        // Step 2: Academic Profile
        class10Board: '',
        class10Year: '',
        class10Percentage: '',
        class11Percentage: '',
        strongestSubject: '',
        weakestSubject: '',
        academicStatus: '',
        coaching: '',
        coachingName: '',
        coachingHours: '',

        // Step 3: Career Aspirations
        careers: [],
        dreamCollege: '',
        examsPreparing: '',
        studyAbroad: '',
        careerMotivation: '',
        confidenceLevel: '',
        biggestFear: '',
        confusion: '',

        // Step 4: Study Habits & Learning
        studyHours: '',
        preferredStudyTime: '',
        biggestDistraction: '',
        followsTimetable: '',
        learningStyle: '',

        // Step 5: Skills & Extracurriculars
        activities: [],
        participatedIn: [],
        existingSkills: [],
        skillsToImprove: '',

        // Step 6: Family Background
        fatherOccupation: '',
        motherOccupation: '',
        parentContact: '',
        firstGenerationCollege: '',
        parentExpectations: '',
        familySupportLevel: '',
        familyIncome: '',
        scholarshipHelp: '',

        // Step 7: Emotional Wellbeing
        stressLevel: '',
        whatAffectsMost: '',
        hasGuidance: '',
        mentorSupportNeeded: '',

        // Step 8: Digital Habits
        platformsUsed: [],
        contentTypeWatched: '',

        // Step 9: Goals & Commitment
        next12MonthsGoal: '',
        whySelectYou: '',
        seriousnessLevel: '',
        regularMentorshipSessions: '',

        // Step 10: Final Questions
        questionForMentor: '',
        whatSchoolShouldTeach: '',
        somethingAboutYourself: ''
    });
    const [errors, setErrors] = useState({});
    const totalSteps = 10;

    const validateStep = () => {
        const newErrors = {};
        if (currentStep === 1) {
            if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
            if (!formData.mobileNumber.trim()) newErrors.mobileNumber = 'Mobile number is required';
            if (!formData.email.trim()) newErrors.email = 'Email is required';
            if (!formData.schoolName.trim()) newErrors.schoolName = 'School name is required';
            if (!formData.currentClass) newErrors.currentClass = 'Current class is required';
        }
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleNext = () => {
        if (validateStep() && currentStep < totalSteps) {
            setCurrentStep(currentStep + 1);
        }
    };

    const handlePrev = () => {
        if (currentStep > 1) {
            setCurrentStep(currentStep - 1);
        }
    };

    const handleInputChange = (field, value) => {
        setFormData(prev => ({ ...prev, [field]: value }));
        if (errors[field]) {
            setErrors(prev => {
                const newErrors = { ...prev };
                delete newErrors[field];
                return newErrors;
            });
        }
    };

    const handleCheckboxChange = (field, value) => {
        setFormData(prev => {
            const current = prev[field] || [];
            if (current.includes(value)) {
                return { ...prev, [field]: current.filter(item => item !== value) };
            } else {
                return { ...prev, [field]: [...current, value] };
            }
        });
    };

    const steps = [
        { id: 1, title: 'Basic Details' },
        { id: 2, title: 'Academic Profile' },
        { id: 3, title: 'Career Aspirations' },
        { id: 4, title: 'Study Habits' },
        { id: 5, title: 'Skills & Extracurriculars' },
        { id: 6, title: 'Family Background' },
        { id: 7, title: 'Emotional Wellbeing' },
        { id: 8, title: 'Digital Habits' },
        { id: 9, title: 'Goals & Commitment' },
        { id: 10, title: 'Final Questions' }
    ];

    const renderStepContent = () => {
        switch (currentStep) {
            case 1:
                return (
                    <div className="space-y-6">
                        <div className="text-center mb-8">
                            <h3 className="text-2xl font-serif font-bold text-[#212529] mb-2">Basic Details</h3>
                            <p className="text-[#495057] font-sans">Let's start with some basic information about you</p>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Full Name *</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                    <input
                                        type="text"
                                        value={formData.fullName}
                                        onChange={(e) => handleInputChange('fullName', e.target.value)}
                                        className={`w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans ${errors.fullName ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="e.g. Aadarsh Patel"
                                    />
                                </div>
                                {errors.fullName && <p className="text-red-500 text-xs mt-2 font-sans">{errors.fullName}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Preferred Name (Optional)</label>
                                <div className="relative">
                                    <User className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                    <input
                                        type="text"
                                        value={formData.preferredName}
                                        onChange={(e) => handleInputChange('preferredName', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                        placeholder="What should we call you?"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Gender</label>
                                <select
                                    value={formData.gender}
                                    onChange={(e) => handleInputChange('gender', e.target.value)}
                                    className="w-full px-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                >
                                    <option value="">Select</option>
                                    <option value="male">Male</option>
                                    <option value="female">Female</option>
                                    <option value="other">Other</option>
                                    <option value="prefer-not-to-say">Prefer not to say</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Date of Birth</label>
                                <div className="relative">
                                    <Calendar className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                    <input
                                        type="date"
                                        value={formData.dob}
                                        onChange={(e) => handleInputChange('dob', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                    />
                                </div>
                            </div>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Mobile Number *</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                    <input
                                        type="tel"
                                        value={formData.mobileNumber}
                                        onChange={(e) => handleInputChange('mobileNumber', e.target.value)}
                                        className={`w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans ${errors.mobileNumber ? 'border-red-300' : 'border-gray-200'}`}
                                        placeholder="1234567890"
                                    />
                                </div>
                                {errors.mobileNumber && <p className="text-red-500 text-xs mt-2 font-sans">{errors.mobileNumber}</p>}
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">WhatsApp Number</label>
                                <div className="relative">
                                    <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                    <input
                                        type="tel"
                                        value={formData.whatsappNumber}
                                        onChange={(e) => handleInputChange('whatsappNumber', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                        placeholder="Same as mobile if applicable"
                                    />
                                </div>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Email Address *</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                <input
                                    type="email"
                                    value={formData.email}
                                    onChange={(e) => handleInputChange('email', e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans ${errors.email ? 'border-red-300' : 'border-gray-200'}`}
                                    placeholder="you@example.com"
                                />
                            </div>
                            {errors.email && <p className="text-red-500 text-xs mt-2 font-sans">{errors.email}</p>}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">City</label>
                                <div className="relative">
                                    <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                    <input
                                        type="text"
                                        value={formData.city}
                                        onChange={(e) => handleInputChange('city', e.target.value)}
                                        className="w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                        placeholder="Your city"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">State</label>
                                <input
                                    type="text"
                                    value={formData.state}
                                    onChange={(e) => handleInputChange('state', e.target.value)}
                                    className="w-full px-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                    placeholder="Your state"
                                />
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Pin Code</label>
                                <input
                                    type="text"
                                    value={formData.pincode}
                                    onChange={(e) => handleInputChange('pincode', e.target.value)}
                                    className="w-full px-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                    placeholder="123456"
                                />
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">School Name *</label>
                            <div className="relative">
                                <GraduationCap className="absolute left-4 top-1/2 -translate-y-1/2 text-[#495057]" size={18} />
                                <input
                                    type="text"
                                    value={formData.schoolName}
                                    onChange={(e) => handleInputChange('schoolName', e.target.value)}
                                    className={`w-full pl-11 pr-4 py-3.5 bg-[#f8f9fa] border rounded-xl text-[#212529] font-semibold placeholder:text-[#495057]/50 focus:border-[#721c24] focus:outline-none transition-all font-sans ${errors.schoolName ? 'border-red-300' : 'border-gray-200'}`}
                                    placeholder="Your school"
                                />
                            </div>
                            {errors.schoolName && <p className="text-red-500 text-xs mt-2 font-sans">{errors.schoolName}</p>}
                        </div>
                        <div className="grid md:grid-cols-3 gap-4">
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">School Board</label>
                                <select
                                    value={formData.schoolBoard}
                                    onChange={(e) => handleInputChange('schoolBoard', e.target.value)}
                                    className="w-full px-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                >
                                    <option value="">Select</option>
                                    <option value="cbse">CBSE</option>
                                    <option value="icse">ICSE</option>
                                    <option value="state">State Board</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Current Class *</label>
                                <select
                                    value={formData.currentClass}
                                    onChange={(e) => handleInputChange('currentClass', e.target.value)}
                                    className="w-full px-4 py-3.5 bg-[#f8f9fa] border rounded-xl text-[#212529] font-semibold focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                >
                                    <option value="">Select</option>
                                    <option value="11">Class 11</option>
                                    <option value="12">Class 12</option>
                                    <option value="drop">Drop Year</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Stream</label>
                                <select
                                    value={formData.stream}
                                    onChange={(e) => handleInputChange('stream', e.target.value)}
                                    className="w-full px-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold focus:border-[#721c24] focus:outline-none transition-all font-sans"
                                >
                                    <option value="">Select</option>
                                    <option value="pcm">PCM</option>
                                    <option value="pcb">PCB</option>
                                    <option value="commerce">Commerce</option>
                                    <option value="humanities">Humanities</option>
                                    <option value="other">Other</option>
                                </select>
                            </div>
                        </div>
                        <div>
                            <label className="block text-[10px] font-bold text-[#495057] uppercase tracking-widest mb-2 ml-1 font-sans">Preferred Language</label>
                            <select
                                value={formData.preferredLanguage}
                                onChange={(e) => handleInputChange('preferredLanguage', e.target.value)}
                                className="w-full px-4 py-3.5 bg-[#f8f9fa] border border-gray-200 rounded-xl text-[#212529] font-semibold focus:border-[#721c24] focus:outline-none transition-all font-sans"
                            >
                                <option value="">Select</option>
                                <option value="english">English</option>
                                <option value="hindi">Hindi</option>
                                <option value="hinglish">Hinglish</option>
                            </select>
                        </div>
                    </div>
                );
            // Add more steps here, but let's just keep step 1 for now to keep it concise, we'll finish it later
            default:
                return <div className="text-center py-10">More steps coming soon...</div>;
        }
    };

    return (
        <div className="max-w-3xl mx-auto bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
            {/* Progress Bar */}
            <div className="mb-12">
                <div className="flex items-center justify-between mb-4">
                    {steps.map(step => (
                        <div key={step.id} className="flex flex-col items-center gap-2">
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold border-2 font-sans ${currentStep > step.id ? 'bg-[#721c24] text-white border-[#721c24]' : currentStep === step.id ? 'bg-[#721c24] text-white border-[#721c24]' : 'bg-white text-[#495057] border-gray-200'}`}>
                                {currentStep > step.id ? <CheckCircle className="w-5 h-5" /> : step.id}
                            </div>
                            <span className="hidden md:block text-[10px] font-bold uppercase tracking-widest text-[#495057] font-sans">{step.title}</span>
                        </div>
                    ))}
                </div>
                <div className="h-1.5 bg-gray-200 rounded-full overflow-hidden">
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${(currentStep / totalSteps) * 100}%` }}
                        transition={{ duration: 0.3 }}
                        className="h-full bg-[#721c24]"
                    />
                </div>
                <p className="text-center text-[#495057] text-sm mt-4 font-sans">Step {currentStep} of {totalSteps}: {steps[currentStep - 1].title}</p>
            </div>

            {/* Step Content */}
            <AnimatePresence mode="wait">
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.3 }}
                >
                    {renderStepContent()}
                </motion.div>
            </AnimatePresence>

            {/* Navigation Buttons */}
            <div className="flex justify-between items-center mt-12 pt-8 border-t border-gray-100">
                <button
                    onClick={handlePrev}
                    disabled={currentStep === 1}
                    className={`px-6 py-3 rounded-xl font-semibold flex items-center gap-2 transition-all font-sans ${currentStep === 1 ? 'opacity-50 cursor-not-allowed text-gray-400' : 'text-[#495057] hover:text-[#721c24]'}`}
                >
                    <ArrowLeft className="w-5 h-5" />
                    Previous
                </button>
                {currentStep < totalSteps ? (
                    <button
                        onClick={handleNext}
                        className="px-8 py-3 bg-[#ced4da] text-white font-semibold rounded-xl hover:bg-[#adb5bd] transition-all flex items-center gap-2 shadow-sm font-sans"
                    >
                        Next
                        <ArrowRight className="w-5 h-5" />
                    </button>
                ) : (
                    <button className="px-8 py-3 bg-[#721c24] text-white font-semibold rounded-xl hover:bg-[#5a161d] transition-all shadow-sm font-sans">
                        Submit
                    </button>
                )}
            </div>
        </div>
    );
};

export default StudentIntakeForm;
