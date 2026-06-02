import express from 'express';
import MentorshipApplication from '../models/MentorshipApplication.js';
import { generateApplicationPdf } from '../utils/generatePdf.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

router.post('/', async (req, res) => {
    try {
        const applicationData = req.body;
        
        // 1. Save to database
        const application = new MentorshipApplication(applicationData);
        await application.save();

        // 2. Generate PDF Buffer
        const pdfBuffer = await generateApplicationPdf(application);
        const adminEmail = process.env.ADMIN_EMAIL || 'aadarshgolucky@gmail.com';
        const studentEmail = application.personalInfo?.email;
        const studentName = application.personalInfo?.fullName;

        // 3. Email to Admin with PDF
        const adminHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>New Mentorship Application Received</h2>
                <p>A new student (<strong>${studentName}</strong>) has submitted a mentorship application.</p>
                <p>The full application details are attached to this email as a PDF document.</p>
                <br />
                <p>Please review their application and update them regarding their selection status.</p>
            </div>
        `;

        await sendEmail({
            to: adminEmail,
            subject: `New Mentorship Application: ${studentName}`,
            html: adminHtml,
            attachments: [
                {
                    filename: `${studentName.replace(/[^a-z0-9]/gi, '_').toLowerCase()}_application.pdf`,
                    content: pdfBuffer,
                    contentType: 'application/pdf'
                }
            ]
        });

        // 4. Email to Student
        if (studentEmail) {
            const studentHtml = `
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                    <h2>Application Received!</h2>
                    <p>Hi ${studentName},</p>
                    <p>Thank you for submitting your Mentorship Application to WeBridge.</p>
                    <p>We have successfully received your detailed application. Our team will review your profile carefully.</p>
                    <p>We will update you via email if you are selected or if there are any further updates in the selection process.</p>
                    <br />
                    <p>Best regards,<br>The WeBridge Team</p>
                </div>
            `;

            await sendEmail({
                to: studentEmail,
                subject: 'Application Received - Mentorship Program',
                html: studentHtml
            });
        }

        res.status(201).json({
            message: 'Application submitted successfully!',
            applicationId: application._id
        });

    } catch (error) {
        console.error('Error in mentorship application route:', error);
        res.status(500).json({
            message: 'Failed to process mentorship application. Please try again later.',
            error: error.message
        });
    }
});

export default router;
