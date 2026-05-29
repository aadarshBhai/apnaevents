import PDFDocument from 'pdfkit';

/**
 * Generates a PDF buffer from a mentorship application object.
 * @param {Object} application The structured MentorshipApplication mongoose document
 * @returns {Promise<Buffer>} A promise that resolves to the PDF buffer
 */
export const generateApplicationPdf = (application) => {
    return new Promise((resolve, reject) => {
        try {
            const doc = new PDFDocument({ margin: 50 });
            const buffers = [];
            
            doc.on('data', buffers.push.bind(buffers));
            doc.on('end', () => {
                const pdfData = Buffer.concat(buffers);
                resolve(pdfData);
            });

            // Fonts & Styles
            doc.font('Helvetica-Bold').fontSize(20).text('ApnaEvents Mentorship Application', { align: 'center' });
            doc.moveDown();
            
            const printSectionHeader = (title) => {
                doc.moveDown(1);
                doc.font('Helvetica-Bold').fontSize(14).fillColor('#002D62').text(title.toUpperCase());
                doc.moveTo(50, doc.y).lineTo(550, doc.y).strokeColor('#e2e8f0').stroke();
                doc.moveDown(0.5);
            };

            const printField = (label, value) => {
                if (value === undefined || value === null || value === '') return;
                doc.font('Helvetica-Bold').fontSize(10).fillColor('#475569').text(`${label}: `, { continued: true });
                
                let displayValue = value;
                if (Array.isArray(value)) {
                    displayValue = value.join(', ');
                } else if (value instanceof Date) {
                    displayValue = value.toLocaleDateString();
                }

                doc.font('Helvetica').fontSize(10).fillColor('#0f172a').text(displayValue);
                doc.moveDown(0.2);
            };

            // Section 1
            printSectionHeader('Section 1 - Basic Details');
            const pi = application.personalInfo || {};
            printField('Full Name', pi.fullName);
            printField('Preferred Name', pi.preferredName);
            printField('Gender', pi.gender);
            printField('Date of Birth', pi.dob);
            printField('Mobile', pi.mobile);
            printField('WhatsApp', pi.whatsapp);
            printField('Email', pi.email);
            printField('City/State', `${pi.city}, ${pi.state} - ${pi.pincode}`);
            printField('School', pi.schoolName);
            printField('Board', pi.schoolBoard);
            printField('Class', pi.currentClass);
            printField('Stream', pi.stream);
            printField('Preferred Language', pi.preferredLanguage);

            // Section 2
            printSectionHeader('Section 2 - Academic Profile');
            const ac = application.academics || {};
            printField('Class 10 Board', ac.class10Board);
            printField('Class 10 Year', ac.class10Year);
            printField('Class 10 Score', ac.class10Score);
            printField('Class 11 %', ac.class11Percentage);
            printField('Strongest Subject', ac.strongestSubject);
            printField('Weakest Subject', ac.weakestSubject);
            printField('Academic Status', ac.academicStatus);
            printField('Coaching Enrolled', ac.coachingEnrolled);
            printField('Coaching Name', ac.coachingName);
            printField('Coaching Hours', ac.coachingHours);

            // Section 3
            printSectionHeader('Section 3 - Career Aspirations');
            const cg = application.careerGoals || {};
            printField('Interested Careers', cg.interestedCareers);
            printField('Dream Colleges', cg.dreamColleges);
            printField('Target Exams', cg.targetExams);
            printField('Study Abroad', cg.studyAbroad);
            printField('Reason for Career', cg.careerReason);
            printField('Confidence Level', cg.confidenceLevel);
            printField('Biggest Fear', cg.biggestFear);
            printField('Biggest Confusion', cg.biggestConfusion);

            // Section 4
            printSectionHeader('Section 4 - Study Habits');
            const sh = application.studyHabits || {};
            printField('Daily Study Hours', sh.dailyStudyHours);
            printField('Preferred Time', sh.preferredTime);
            printField('Biggest Distraction', sh.biggestDistraction);
            printField('Follows Timetable', sh.timetableUsage);
            printField('Learning Style', sh.learningStyle);

            // Section 5
            printSectionHeader('Section 5 - Skills & Extracurriculars');
            const ex = application.extracurriculars || {};
            printField('Activities', ex.activities);
            printField('Participations', ex.participations);
            printField('Existing Skills', ex.existingSkills);
            printField('Skills to Improve', ex.skillsToImprove);

            doc.addPage();

            // Section 6
            printSectionHeader('Section 6 - Family Background');
            const fc = application.familyContext || {};
            printField('Father Occupation', fc.fatherOccupation);
            printField('Mother Occupation', fc.motherOccupation);
            printField('Parent Contact', fc.parentContact);
            printField('First Gen College', fc.firstGenerationCollege);
            printField('Family Expectations', fc.familyExpectations);
            printField('Family Support Level', fc.familySupportLevel);
            printField('Annual Income', fc.annualIncome);
            printField('Needs Scholarship', fc.needsScholarship);

            // Section 7
            printSectionHeader('Section 7 - Wellbeing');
            const wb = application.wellbeing || {};
            printField('Stress Level', wb.stressLevel);
            printField('Biggest Stressors', wb.biggestStressors);
            printField('Has Proper Guidance', wb.hasProperGuidance);
            printField('Support Needed', wb.supportNeeded);

            // Section 8
            printSectionHeader('Section 8 - Digital Habits');
            const dh = application.digitalHabits || {};
            printField('Top Platforms', dh.topPlatforms);
            printField('Content Types', dh.contentTypes);

            // Section 9
            printSectionHeader('Section 9 - Goals & Commitment');
            const cm = application.commitment || {};
            printField('12 Month Goal', cm.twelveMonthGoal);
            printField('Why Select You', cm.whySelectYou);
            printField('Seriousness Level', cm.seriousnessLevel);
            printField('Willing to Attend', cm.willingToAttendRegularly);

            // Section 10
            printSectionHeader('Section 10 - Final Reflections');
            const fr = application.finalReflections || {};
            printField('Question for Mentor', fr.questionForMentor);
            printField('School System Feedback', fr.schoolSystemFeedback);
            printField('Beyond Marksheet', fr.beyondMarksheet);

            // Finalize PDF file
            doc.end();
            
        } catch (error) {
            reject(error);
        }
    });
};
