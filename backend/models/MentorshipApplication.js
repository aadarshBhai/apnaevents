import mongoose from 'mongoose';

const mentorshipApplicationSchema = new mongoose.Schema({
    // SECTION 1 - BASIC DETAILS
    personalInfo: {
        fullName: { type: String, required: true },
        preferredName: { type: String },
        gender: { type: String, required: true },
        dob: { type: Date, required: true },
        mobile: { type: String, required: true },
        whatsapp: { type: String },
        email: { type: String, required: true },
        city: { type: String, required: true },
        state: { type: String, required: true },
        pincode: { type: String, required: true },
        schoolName: { type: String, required: true },
        schoolBoard: { type: String, required: true },
        currentClass: { type: String, required: true },
        stream: { type: String, required: true },
        preferredLanguage: { type: String, required: true }
    },

    // SECTION 2 - ACADEMIC PROFILE
    academics: {
        class10Board: { type: String, required: true },
        class10Year: { type: String, required: true },
        class10Score: { type: String, required: true },
        class11Percentage: { type: String },
        strongestSubject: { type: String },
        weakestSubject: { type: String },
        academicStatus: { type: String, required: true },
        coachingEnrolled: { type: String, required: true },
        coachingName: { type: String },
        coachingHours: { type: String }
    },

    // SECTION 3 - CAREER ASPIRATIONS
    careerGoals: {
        interestedCareers: [{ type: String }],
        dreamColleges: { type: String },
        targetExams: { type: String },
        studyAbroad: { type: String, required: true },
        careerReason: { type: String },
        confidenceLevel: { type: Number },
        biggestFear: { type: String },
        biggestConfusion: { type: String }
    },

    // SECTION 4 - STUDY HABITS & LEARNING STYLE
    studyHabits: {
        dailyStudyHours: { type: String },
        preferredTime: { type: String },
        biggestDistraction: { type: String },
        timetableUsage: { type: String },
        learningStyle: { type: String }
    },

    // SECTION 5 - SKILLS & EXTRACURRICULARS
    extracurriculars: {
        activities: [{ type: String }],
        participations: [{ type: String }],
        existingSkills: [{ type: String }],
        skillsToImprove: { type: String }
    },

    // SECTION 6 - FAMILY BACKGROUND
    familyContext: {
        fatherOccupation: { type: String },
        motherOccupation: { type: String },
        parentContact: { type: String },
        firstGenerationCollege: { type: String },
        familyExpectations: { type: String },
        familySupportLevel: { type: Number },
        annualIncome: { type: String },
        needsScholarship: { type: String }
    },

    // SECTION 7 - EMOTIONAL & MENTAL WELLBEING
    wellbeing: {
        stressLevel: { type: Number },
        biggestStressors: [{ type: String }],
        hasProperGuidance: { type: String },
        supportNeeded: { type: String }
    },

    // SECTION 8 - DIGITAL & CONTENT HABITS
    digitalHabits: {
        topPlatforms: [{ type: String }],
        contentTypes: [{ type: String }]
    },

    // SECTION 9 - GOALS & COMMITMENT
    commitment: {
        twelveMonthGoal: { type: String },
        whySelectYou: { type: String },
        seriousnessLevel: { type: Number },
        willingToAttendRegularly: { type: String, required: true }
    },

    // SECTION 10 - FINAL QUESTIONS
    finalReflections: {
        questionForMentor: { type: String },
        schoolSystemFeedback: { type: String },
        beyondMarksheet: { type: String }
    }
}, { timestamps: true });

const MentorshipApplication = mongoose.model('MentorshipApplication', mentorshipApplicationSchema);

export default MentorshipApplication;
