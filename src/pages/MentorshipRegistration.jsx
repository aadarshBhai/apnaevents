import { useState } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronRight, ChevronLeft, CheckCircle, Loader2, Info } from 'lucide-react';
import CareerGuidanceNavbar from '../components/premium/CareerGuidanceNavbar';
import Footer from '../components/premium/Footer';
import SEO from '../components/seo/SEO';

const steps = [
  'Basic Details',
  'Academic Profile',
  'Career Goals',
  'Family & Wellbeing',
  'Reflection'
];

const MentorshipRegistration = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState('');

  const [formData, setFormData] = useState({
    personalInfo: {
      fullName: '', preferredName: '', gender: '', dob: '', mobile: '', whatsapp: '',
      email: '', city: '', state: '', pincode: '', schoolName: '', schoolBoard: '',
      currentClass: '', stream: '', preferredLanguage: ''
    },
    academics: {
      class10Board: '', class10Year: '', class10Score: '', class11Percentage: '',
      strongestSubject: '', weakestSubject: '', academicStatus: '',
      coachingEnrolled: 'No', coachingName: '', coachingHours: ''
    },
    careerGoals: {
      interestedCareers: [], dreamColleges: '', targetExams: '', studyAbroad: 'Maybe',
      careerReason: '', confidenceLevel: 5, biggestFear: '', biggestConfusion: ''
    },
    studyHabits: {
      dailyStudyHours: '', preferredTime: '', biggestDistraction: '',
      timetableUsage: '', learningStyle: ''
    },
    extracurriculars: {
      activities: [], participations: [], existingSkills: [], skillsToImprove: ''
    },
    familyContext: {
      fatherOccupation: '', motherOccupation: '', parentContact: '',
      firstGenerationCollege: 'No', familyExpectations: '', familySupportLevel: 5,
      annualIncome: '', needsScholarship: 'Maybe'
    },
    wellbeing: {
      stressLevel: 5, biggestStressors: [], hasProperGuidance: 'Sometimes', supportNeeded: ''
    },
    digitalHabits: {
      topPlatforms: [], contentTypes: []
    },
    commitment: {
      twelveMonthGoal: '', whySelectYou: '', seriousnessLevel: 10, willingToAttendRegularly: 'Yes'
    },
    finalReflections: {
      questionForMentor: '', schoolSystemFeedback: '', beyondMarksheet: ''
    }
  });

  const updateSection = (section, field, value) => {
    setFormData(prev => ({
      ...prev,
      [section]: {
        ...prev[section],
        [field]: value
      }
    }));
  };

  const handleArrayToggle = (section, field, value) => {
    setFormData(prev => {
      const array = prev[section][field];
      const newArray = array.includes(value) 
        ? array.filter(i => i !== value)
        : [...array, value];
      return {
        ...prev,
        [section]: { ...prev[section], [field]: newArray }
      };
    });
  };

  const validateStep = () => {
    // Basic validation can be expanded later
    if (currentStep === 0) {
      const p = formData.personalInfo;
      if (!p.fullName || !p.email || !p.mobile) {
        setError('Please fill in the required fields (Name, Email, Mobile)');
        return false;
      }
    }
    setError('');
    return true;
  };

  const handleNext = () => {
    if (validateStep()) {
      window.scrollTo(0, 0);
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handlePrev = () => {
    setError('');
    window.scrollTo(0, 0);
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateStep()) return;
    
    setIsLoading(true);
    setError('');
    
    try {
      await axios.post('http://localhost:5000/api/mentorship-application', formData);
      setIsSubmitted(true);
      window.scrollTo(0, 0);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to submit application. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const renderStep = () => {
    switch(currentStep) {
      case 0:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4">Personal Details</h3>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Full Name *</label>
                <input type="text" value={formData.personalInfo.fullName} onChange={(e) => updateSection('personalInfo', 'fullName', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" required />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Name (Optional)</label>
                <input type="text" value={formData.personalInfo.preferredName} onChange={(e) => updateSection('personalInfo', 'preferredName', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Gender *</label>
                <select value={formData.personalInfo.gender} onChange={(e) => updateSection('personalInfo', 'gender', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Date of Birth *</label>
                <input type="date" value={formData.personalInfo.dob} onChange={(e) => updateSection('personalInfo', 'dob', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mobile Number *</label>
                <input type="tel" value={formData.personalInfo.mobile} onChange={(e) => updateSection('personalInfo', 'mobile', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">WhatsApp Number</label>
                <input type="tel" value={formData.personalInfo.whatsapp} onChange={(e) => updateSection('personalInfo', 'whatsapp', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                <input type="email" value={formData.personalInfo.email} onChange={(e) => updateSection('personalInfo', 'email', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4 mt-8">Location & School</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">City</label>
                <input type="text" value={formData.personalInfo.city} onChange={(e) => updateSection('personalInfo', 'city', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">State</label>
                <input type="text" value={formData.personalInfo.state} onChange={(e) => updateSection('personalInfo', 'state', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Pin Code</label>
                <input type="text" value={formData.personalInfo.pincode} onChange={(e) => updateSection('personalInfo', 'pincode', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">School Name</label>
                <input type="text" value={formData.personalInfo.schoolName} onChange={(e) => updateSection('personalInfo', 'schoolName', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">School Board</label>
                <select value={formData.personalInfo.schoolBoard} onChange={(e) => updateSection('personalInfo', 'schoolBoard', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none">
                  <option value="">Select Board</option>
                  <option value="CBSE">CBSE</option>
                  <option value="ICSE">ICSE</option>
                  <option value="State Board">State Board</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Current Class</label>
                <select value={formData.personalInfo.currentClass} onChange={(e) => updateSection('personalInfo', 'currentClass', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none">
                  <option value="">Select Class</option>
                  <option value="Class 11">Class 11</option>
                  <option value="Class 12">Class 12</option>
                  <option value="Drop Year">Drop Year</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Stream</label>
                <select value={formData.personalInfo.stream} onChange={(e) => updateSection('personalInfo', 'stream', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none">
                  <option value="">Select Stream</option>
                  <option value="PCM">PCM</option>
                  <option value="PCB">PCB</option>
                  <option value="Commerce">Commerce</option>
                  <option value="Humanities">Humanities</option>
                  <option value="Other">Other</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Language</label>
                <select value={formData.personalInfo.preferredLanguage} onChange={(e) => updateSection('personalInfo', 'preferredLanguage', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-[#002D62] outline-none">
                  <option value="">Select Language</option>
                  <option value="English">English</option>
                  <option value="Hindi">Hindi</option>
                  <option value="Hinglish">Hinglish</option>
                </select>
              </div>
            </div>
          </div>
        );
      
      case 1:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4">Academic Performance</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Class 10 Board</label>
                <input type="text" value={formData.academics.class10Board} onChange={(e) => updateSection('academics', 'class10Board', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Year of Passing (10th)</label>
                <input type="text" value={formData.academics.class10Year} onChange={(e) => updateSection('academics', 'class10Year', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Class 10 % or CGPA</label>
                <input type="text" value={formData.academics.class10Score} onChange={(e) => updateSection('academics', 'class10Score', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Class 11 % (if applicable)</label>
                <input type="text" value={formData.academics.class11Percentage} onChange={(e) => updateSection('academics', 'class11Percentage', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Strongest Subject</label>
                <input type="text" value={formData.academics.strongestSubject} onChange={(e) => updateSection('academics', 'strongestSubject', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Weakest Subject</label>
                <input type="text" value={formData.academics.weakestSubject} onChange={(e) => updateSection('academics', 'weakestSubject', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div className="md:col-span-3">
                <label className="block text-sm font-bold text-gray-700 mb-2">Current Academic Status</label>
                <select value={formData.academics.academicStatus} onChange={(e) => updateSection('academics', 'academicStatus', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option value="">Select Status</option>
                  <option value="Top performer">Top performer</option>
                  <option value="Above average">Above average</option>
                  <option value="Average student">Average student</option>
                  <option value="Struggling academically">Struggling academically</option>
                </select>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4 mt-8">Study Habits & Learning Style</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Average Study Hours / Day</label>
                <input type="text" value={formData.studyHabits.dailyStudyHours} onChange={(e) => updateSection('studyHabits', 'dailyStudyHours', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Study Time</label>
                <select value={formData.studyHabits.preferredTime} onChange={(e) => updateSection('studyHabits', 'preferredTime', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option value="">Select Time</option>
                  <option value="Morning">Morning</option>
                  <option value="Afternoon">Afternoon</option>
                  <option value="Night">Night</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Biggest Distraction While Studying</label>
                <input type="text" value={formData.studyHabits.biggestDistraction} onChange={(e) => updateSection('studyHabits', 'biggestDistraction', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Preferred Learning Style</label>
                <select value={formData.studyHabits.learningStyle} onChange={(e) => updateSection('studyHabits', 'learningStyle', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option value="">Select Style</option>
                  <option value="Videos">Videos</option>
                  <option value="Reading">Reading</option>
                  <option value="Live Classes">Live classes</option>
                  <option value="Practice Questions">Practice questions</option>
                  <option value="Group Learning">Group learning</option>
                </select>
              </div>
            </div>
          </div>
        );

      case 2:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4">Career Aspirations</h3>
            
            <div>
              <label className="block text-sm font-bold text-gray-700 mb-2">What careers are you currently interested in? (Select multiple)</label>
              <div className="flex flex-wrap gap-3">
                {['Engineering', 'Medicine', 'Law', 'CA', 'Government Jobs', 'Design', 'Journalism', 'Business', 'Startup', 'AI/Data Science', 'Psychology', 'Defence', 'Content Creation', 'Sports', 'Unsure'].map(career => (
                  <button type="button" key={career} onClick={() => handleArrayToggle('careerGoals', 'interestedCareers', career)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${formData.careerGoals.interestedCareers.includes(career) ? 'bg-[#002D62] text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                    {career}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mt-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Dream Colleges/Universities</label>
                <input type="text" value={formData.careerGoals.dreamColleges} onChange={(e) => updateSection('careerGoals', 'dreamColleges', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="e.g. IIT, AIIMS, DU" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Exams you are preparing for</label>
                <input type="text" value={formData.careerGoals.targetExams} onChange={(e) => updateSection('careerGoals', 'targetExams', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" placeholder="e.g. JEE, NEET, CUET" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Do you want to study abroad?</label>
                <select value={formData.careerGoals.studyAbroad} onChange={(e) => updateSection('careerGoals', 'studyAbroad', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                  <option value="Maybe">Maybe</option>
                </select>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4 mt-8">Motivation & Clarity</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Why are you interested in this career?</label>
                <textarea rows={3} value={formData.careerGoals.careerReason} onChange={(e) => updateSection('careerGoals', 'careerReason', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How confident are you about your future path? (1-10)</label>
                <input type="range" min="1" max="10" value={formData.careerGoals.confidenceLevel} onChange={(e) => updateSection('careerGoals', 'confidenceLevel', e.target.value)} className="w-full" />
                <div className="text-center font-bold text-brand-maroon mt-1">{formData.careerGoals.confidenceLevel}/10</div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What is your biggest fear regarding your future?</label>
                <textarea rows={2} value={formData.careerGoals.biggestFear} onChange={(e) => updateSection('careerGoals', 'biggestFear', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What confuses you the most right now?</label>
                <textarea rows={2} value={formData.careerGoals.biggestConfusion} onChange={(e) => updateSection('careerGoals', 'biggestConfusion', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
            </div>
          </div>
        );

      case 3:
        return (
          <div className="space-y-6">
            <div className="bg-blue-50 border-l-4 border-blue-500 p-4 rounded-r-lg mb-6 flex items-start space-x-3">
              <Info className="w-5 h-5 text-blue-500 mt-0.5 flex-shrink-0" />
              <p className="text-sm text-blue-800">
                <strong>We respect your privacy.</strong> This section helps us understand your context so we can match you with the right opportunities, mentors, and scholarships. All sensitive data is kept confidential.
              </p>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4">Family Background</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Father's Occupation</label>
                <input type="text" value={formData.familyContext.fatherOccupation} onChange={(e) => updateSection('familyContext', 'fatherOccupation', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Mother's Occupation</label>
                <input type="text" value={formData.familyContext.motherOccupation} onChange={(e) => updateSection('familyContext', 'motherOccupation', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">Are you the first person in your family planning to attend college?</label>
                <select value={formData.familyContext.firstGenerationCollege} onChange={(e) => updateSection('familyContext', 'firstGenerationCollege', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">What do your parents expect from your career?</label>
                <textarea rows={2} value={formData.familyContext.familyExpectations} onChange={(e) => updateSection('familyContext', 'familyExpectations', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-gray-700 mb-2">How supportive is your family regarding your career choices? (1-10)</label>
                <input type="range" min="1" max="10" value={formData.familyContext.familySupportLevel} onChange={(e) => updateSection('familyContext', 'familySupportLevel', e.target.value)} className="w-full" />
                <div className="text-center font-bold text-brand-maroon mt-1">{formData.familyContext.familySupportLevel}/10</div>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4 mt-8">Emotional Wellbeing</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How stressed do you currently feel about your future? (1-10)</label>
                <input type="range" min="1" max="10" value={formData.wellbeing.stressLevel} onChange={(e) => updateSection('wellbeing', 'stressLevel', e.target.value)} className="w-full" />
                <div className="text-center font-bold text-brand-maroon mt-1">{formData.wellbeing.stressLevel}/10</div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What affects you the most? (Select multiple)</label>
                <div className="flex flex-wrap gap-3">
                  {['Academic pressure', 'Family expectations', 'Comparison with others', 'Fear of failure', 'Lack of clarity', 'Financial concerns', 'Loneliness', 'Low confidence'].map(stressor => (
                    <button type="button" key={stressor} onClick={() => handleArrayToggle('wellbeing', 'biggestStressors', stressor)} className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${formData.wellbeing.biggestStressors.includes(stressor) ? 'bg-red-500 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'}`}>
                      {stressor}
                    </button>
                  ))}
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What kind of support are you looking for from a mentor?</label>
                <textarea rows={3} value={formData.wellbeing.supportNeeded} onChange={(e) => updateSection('wellbeing', 'supportNeeded', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
            </div>
          </div>
        );

      case 4:
        return (
          <div className="space-y-6">
            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4">Goals & Commitment</h3>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What do you want to achieve in the next 12 months?</label>
                <textarea rows={3} value={formData.commitment.twelveMonthGoal} onChange={(e) => updateSection('commitment', 'twelveMonthGoal', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Why should we select you for mentorship?</label>
                <textarea rows={3} value={formData.commitment.whySelectYou} onChange={(e) => updateSection('commitment', 'whySelectYou', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">How serious are you about improving your future? (1-10)</label>
                <input type="range" min="1" max="10" value={formData.commitment.seriousnessLevel} onChange={(e) => updateSection('commitment', 'seriousnessLevel', e.target.value)} className="w-full" />
                <div className="text-center font-bold text-brand-maroon mt-1">{formData.commitment.seriousnessLevel}/10</div>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">Are you willing to attend mentorship sessions regularly?</label>
                <select value={formData.commitment.willingToAttendRegularly} onChange={(e) => updateSection('commitment', 'willingToAttendRegularly', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl">
                  <option value="Yes">Yes</option>
                  <option value="No">No</option>
                </select>
              </div>
            </div>

            <h3 className="text-2xl font-serif font-bold text-[#002D62] border-b pb-4 mt-8">Final Reflections</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">If you could ask one question to a mentor, what would it be?</label>
                <textarea rows={2} value={formData.finalReflections.questionForMentor} onChange={(e) => updateSection('finalReflections', 'questionForMentor', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-2">What is one thing you wish Indian schools taught students better?</label>
                <textarea rows={2} value={formData.finalReflections.schoolSystemFeedback} onChange={(e) => updateSection('finalReflections', 'schoolSystemFeedback', e.target.value)} className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-xl resize-none"></textarea>
              </div>
              <div className="bg-brand-maroon/5 p-4 rounded-xl border border-brand-maroon/20">
                <label className="block text-sm font-bold text-[#721c24] mb-2">Tell us something about yourself that marksheets cannot show.</label>
                <textarea rows={4} value={formData.finalReflections.beyondMarksheet} onChange={(e) => updateSection('finalReflections', 'beyondMarksheet', e.target.value)} className="w-full px-4 py-3 bg-white border border-[#721c24]/30 rounded-xl resize-none focus:ring-2 focus:ring-[#721c24] outline-none" placeholder="Share your story, your hidden talents, or a unique experience..."></textarea>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-[#f8f9fa] text-slate-800">
      <SEO title="Mentorship Application | WeBridge" description="Apply for personalized mentorship to shape your future." />
      <CareerGuidanceNavbar />

      <main className="pt-32 pb-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto">
          {!isSubmitted ? (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="bg-white rounded-3xl shadow-xl overflow-hidden border border-gray-100">
              
              {/* Progress Bar Header */}
              <div className="bg-[#002D62] p-8 text-white">
                <h1 className="text-3xl font-serif font-bold mb-6">Mentorship Intake Application</h1>
                
                <div className="flex items-center justify-between mb-2">
                  {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center relative z-10">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${currentStep >= idx ? 'bg-white text-[#002D62] shadow-lg' : 'bg-white/20 text-white/50'}`}>
                        {currentStep > idx ? <CheckCircle className="w-5 h-5" /> : (idx + 1)}
                      </div>
                      <span className={`text-[10px] uppercase tracking-wider font-bold mt-2 absolute top-10 whitespace-nowrap transition-all duration-300 ${currentStep >= idx ? 'text-white' : 'text-white/50'}`}>
                        {step}
                      </span>
                    </div>
                  ))}
                  {/* Progress Line */}
                  <div className="absolute left-10 right-10 top-[110px] h-1 bg-white/20 -z-0">
                    <div className="h-full bg-white transition-all duration-500 ease-out" style={{ width: `${(currentStep / (steps.length - 1)) * 100}%` }} />
                  </div>
                </div>
              </div>

              {/* Form Content */}
              <div className="p-8 md:p-12">
                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 border border-red-200 rounded-xl text-sm font-bold">
                    {error}
                  </div>
                )}

                <form onSubmit={handleSubmit}>
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={currentStep}
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      exit={{ opacity: 0, x: -20 }}
                      transition={{ duration: 0.3 }}
                    >
                      {renderStep()}
                    </motion.div>
                  </AnimatePresence>

                  {/* Navigation Buttons */}
                  <div className="flex items-center justify-between mt-12 pt-6 border-t border-gray-100">
                    <button
                      type="button"
                      onClick={handlePrev}
                      disabled={currentStep === 0 || isLoading}
                      className={`flex items-center space-x-2 px-6 py-3 rounded-xl font-bold transition-all ${currentStep === 0 ? 'opacity-0 cursor-default' : 'text-gray-600 hover:bg-gray-100'}`}
                    >
                      <ChevronLeft className="w-5 h-5" />
                      <span>Back</span>
                    </button>
                    
                    {currentStep === steps.length - 1 ? (
                      <button
                        type="submit"
                        disabled={isLoading}
                        className="flex items-center space-x-2 px-8 py-3 bg-[#721c24] text-white rounded-xl font-bold uppercase tracking-wider hover:bg-[#5a161d] transition-all shadow-md disabled:opacity-70"
                      >
                        {isLoading && <Loader2 className="w-5 h-5 animate-spin" />}
                        <span>Submit Application</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={handleNext}
                        className="flex items-center space-x-2 px-8 py-3 bg-[#002D62] text-white rounded-xl font-bold uppercase tracking-wider hover:bg-[#001d40] transition-all shadow-md"
                      >
                        <span>Next Step</span>
                        <ChevronRight className="w-5 h-5" />
                      </button>
                    )}
                  </div>
                </form>
              </div>
            </motion.div>
          ) : (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="bg-white rounded-3xl p-12 text-center shadow-xl border border-gray-100">
              <div className="w-24 h-24 bg-green-100 text-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
                <CheckCircle className="w-12 h-12" />
              </div>
              <h2 className="text-4xl font-serif font-bold text-[#002D62] mb-4">Application Received</h2>
              <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
                Thank you for completing the comprehensive mentorship application. Our team will review your profile and reach out to you via email regarding the selection process.
              </p>
              <p className="text-sm text-gray-500 font-semibold bg-gray-50 inline-block px-6 py-3 rounded-full border border-gray-200">
                A copy of your application has been securely sent to our mentors.
              </p>
            </motion.div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default MentorshipRegistration;
