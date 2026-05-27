import { useState } from 'react';
import { motion } from 'framer-motion';
import { ArrowRight, ArrowLeft, CheckCircle } from 'lucide-react';

const CareerQuiz = () => {
    const [currentStep, setCurrentStep] = useState(0);
    const [answers, setAnswers] = useState({});
    const [result, setResult] = useState(null);

    const questions = [
        {
            id: 'stream',
            question: 'Which stream are you in or planning to take?',
            type: 'single',
            options: ['Science', 'Commerce', 'Humanities', 'Unsure'],
        },
        {
            id: 'strength',
            question: 'What are your strongest subjects?',
            type: 'multiple',
            options: ['Mathematics', 'Science', 'Languages', 'Social Studies', 'Computers', 'Arts'],
        },
        {
            id: 'interests',
            question: 'What interests you most?',
            type: 'multiple',
            options: [
                'Problem Solving',
                'Helping Others',
                'Creating/Design',
                'Business',
                'Research',
                'Technology',
                'Leadership',
                'Creativity',
            ],
        },
        {
            id: 'lifestyle',
            question: 'What lifestyle appeals to you most?',
            type: 'single',
            options: [
                '9-5 Stable Job',
                'Entrepreneurship',
                'Flexible Work',
                'Government Service',
                'Not sure yet',
            ],
        },
        {
            id: 'salary_priority',
            question: 'How important is high salary to you?',
            type: 'single',
            options: ['Very Important', 'Somewhat Important', 'Not a Priority', 'Unsure'],
        },
    ];

    const careerRecommendations = {
        'Science-Mathematics-Problem Solving': [
            { name: 'Engineering', description: 'IIT JEE pathway', prep: '2 years, 6-8 hours/day' },
            { name: 'Data Science', description: 'Growing tech field', prep: '1-2 years after BTech' },
            { name: 'AI/ML Developer', description: 'High demand, well-paid', prep: '2-3 years' },
        ],
        'Science-Biology-Helping Others': [
            { name: 'Doctor', description: 'NEET pathway', prep: '2 years intensive' },
            { name: 'Nurse', description: 'Healthcare professional', prep: '3-4 years' },
            { name: 'Psychologist', description: 'Mental health expert', prep: '4-5 years' },
        ],
        'Commerce-Mathematics-Business': [
            { name: 'CA (Chartered Accountant)', description: 'Financial expert', prep: '4.5 years' },
            { name: 'Investment Banker', description: 'Finance career', prep: '5-6 years' },
            { name: 'Business Analyst', description: 'Corporate role', prep: '3-4 years' },
        ],
        'Humanities-Languages-Leadership': [
            { name: 'IAS Officer (UPSC)', description: 'Civil service', prep: '1-2 years after 12th' },
            { name: 'Lawyer', description: 'Law career', prep: '5 years' },
            { name: 'Journalist', description: 'Media career', prep: '3-4 years' },
        ],
    };

    const handleAnswer = (optionId) => {
        const question = questions[currentStep];
        if (question.type === 'single') {
            setAnswers({ ...answers, [question.id]: optionId });
        } else {
            const current = answers[question.id] || [];
            const updated = current.includes(optionId)
                ? current.filter(id => id !== optionId)
                : [...current, optionId];
            setAnswers({ ...answers, [question.id]: updated });
        }
    };

    const handleNext = () => {
        if (currentStep < questions.length - 1) {
            setCurrentStep(currentStep + 1);
        } else {
            // Generate results
            const key = `${answers.stream}-${answers.strength?.[0] || 'General'}-${answers.interests?.[0] || 'General'}`;
            const recommendations = careerRecommendations[key] || careerRecommendations['Science-Mathematics-Problem Solving'];
            setResult({ recommendations, answers });
        }
    };

    const handlePrev = () => {
        if (currentStep > 0) {
            setCurrentStep(currentStep - 1);
        }
    };

    const canProceed = () => {
        const question = questions[currentStep];
        if (question.type === 'single') {
            return answers[question.id];
        } else {
            return answers[question.id] && answers[question.id].length > 0;
        }
    };

    const question = questions[currentStep];

    if (result) {
        return (
            <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50">
                <div className="container-custom px-4 max-w-2xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-white rounded-lg p-8 shadow-lg"
                    >
                        <div className="text-center mb-8">
                            <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
                            <h2 className="text-3xl font-bold text-slate-900 mb-2">Your Career Matches!</h2>
                            <p className="text-slate-600">Based on your responses, here are careers that match your profile:</p>
                        </div>

                        <div className="space-y-4 mb-8">
                            {result.recommendations.map((career, idx) => (
                                <motion.div
                                    key={idx}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: idx * 0.1 }}
                                    className="border-l-4 border-blue-600 bg-blue-50 p-4 rounded cursor-pointer hover:shadow-md transition-shadow"
                                >
                                    <h3 className="text-lg font-bold text-blue-700">{career.name}</h3>
                                    <p className="text-slate-600 text-sm mb-2">{career.description}</p>
                                    <p className="text-slate-500 text-xs">Preparation time: {career.prep}</p>
                                </motion.div>
                            ))}
                        </div>

                        <div className="space-y-3">
                            <button className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2">
                                <span>Get Detailed Roadmap</span>
                                <ArrowRight className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setResult(null)}
                                className="w-full border-2 border-slate-300 text-slate-700 py-3 rounded-lg font-semibold hover:border-blue-600 transition-all"
                            >
                                Retake Quiz
                            </button>
                        </div>
                    </motion.div>
                </div>
            </section>
        );
    }

    return (
        <section className="py-16 bg-gradient-to-br from-blue-50 to-indigo-50 min-h-screen">
            <div className="container-custom px-4 max-w-2xl mx-auto">
                {/* Progress bar */}
                <div className="mb-12">
                    <div className="flex justify-between items-center mb-4">
                        <span className="text-sm font-semibold text-slate-600">
                            Question {currentStep + 1} of {questions.length}
                        </span>
                        <span className="text-sm font-semibold text-blue-600">
                            {Math.round(((currentStep + 1) / questions.length) * 100)}%
                        </span>
                    </div>
                    <div className="w-full bg-slate-200 rounded-full h-2">
                        <motion.div
                            className="bg-gradient-to-r from-blue-600 to-indigo-600 h-2 rounded-full"
                            initial={{ width: '0%' }}
                            animate={{ width: `${((currentStep + 1) / questions.length) * 100}%` }}
                            transition={{ duration: 0.3 }}
                        />
                    </div>
                </div>

                {/* Question card */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className="bg-white rounded-lg p-8 shadow-lg mb-8"
                >
                    <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-8">{question.question}</h2>

                    <div className="space-y-3 mb-8">
                        {question.options.map((option, idx) => {
                            const isSelected = question.type === 'single'
                                ? answers[question.id] === option
                                : answers[question.id]?.includes(option);

                            return (
                                <motion.button
                                    key={idx}
                                    onClick={() => handleAnswer(option)}
                                    whileHover={{ scale: 1.02 }}
                                    whileTap={{ scale: 0.98 }}
                                    className={`w-full p-4 text-left rounded-lg border-2 font-semibold transition-all ${
                                        isSelected
                                            ? 'border-blue-600 bg-blue-50 text-blue-700'
                                            : 'border-slate-200 bg-white text-slate-700 hover:border-blue-300'
                                    }`}
                                >
                                    <div className="flex items-center justify-between">
                                        <span>{option}</span>
                                        <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                                            isSelected ? 'border-blue-600 bg-blue-600' : 'border-slate-300'
                                        }`}>
                                            {isSelected && <span className="text-white text-sm">✓</span>}
                                        </div>
                                    </div>
                                </motion.button>
                            );
                        })}
                    </div>

                    {/* Navigation buttons */}
                    <div className="flex gap-4">
                        <button
                            onClick={handlePrev}
                            disabled={currentStep === 0}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 border-2 border-slate-300 rounded-lg font-semibold text-slate-700 hover:border-blue-300 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <ArrowLeft className="w-4 h-4" />
                            <span>Previous</span>
                        </button>
                        <button
                            onClick={handleNext}
                            disabled={!canProceed()}
                            className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg font-semibold hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed transition-all"
                        >
                            <span>{currentStep === questions.length - 1 ? 'See Results' : 'Next'}</span>
                            <ArrowRight className="w-4 h-4" />
                        </button>
                    </div>
                </motion.div>
            </div>
        </section>
    );
};

export default CareerQuiz;
