import express from 'express';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Handle booking submission
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, grade, stream, message } = req.body;

        // Validate required fields
        if (!name || !email || !phone || !grade || !message) {
            return res.status(400).json({
                message: 'All fields are required.'
            });
        }

        const mentorEmail = 'aadarshgolucky@gmail.com';
        const subject = `New Career Guidance Booking from ${name}`;

        // Email HTML for Mentor
        const mentorHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>New Guidance Session Booking</h2>
                <p>A new student has booked a career guidance session.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px;">
                    <p><strong>Name:</strong> ${name}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Phone:</strong> ${phone}</p>
                    <p><strong>Grade:</strong> ${grade}</p>
                    ${stream ? `<p><strong>Stream:</strong> ${stream}</p>` : ''}
                    <p><strong>Questions/Message:</strong></p>
                    <p style="white-space: pre-wrap;">${message}</p>
                </div>
                <p>Please reach out to the student within 24 hours to schedule their session.</p>
            </div>
        `;

        // Email HTML for Mentee (Student)
        const menteeHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
                <h2>Booking Confirmation: Career Guidance Session</h2>
                <p>Hi ${name},</p>
                <p>Thank you for booking a free career guidance session with CareerPilot.</p>
                <p>We have received your request successfully. Our expert mentor will review your details and contact you within 24 hours to schedule the exact timing of your session.</p>
                <div style="background-color: #f8f9fa; padding: 15px; border-radius: 8px; margin-top: 20px;">
                    <h3>Your Booking Summary:</h3>
                    <p><strong>Grade:</strong> ${grade}</p>
                    ${stream ? `<p><strong>Stream:</strong> ${stream}</p>` : ''}
                    <p><strong>Questions:</strong> ${message}</p>
                </div>
                <p>If you have any urgent questions, feel free to reply to this email.</p>
                <p>Best regards,<br>The CareerPilot Team</p>
            </div>
        `;

        // Send email to mentor
        await sendEmail({
            to: mentorEmail,
            subject: subject,
            html: mentorHtml
        });

        // Send confirmation email to mentee
        await sendEmail({
            to: email,
            subject: 'Confirmation: Your Career Guidance Session',
            html: menteeHtml
        });

        res.status(200).json({
            message: 'Booking request sent successfully!'
        });

    } catch (error) {
        console.error('Error handling booking request:', error);
        res.status(500).json({
            message: 'Failed to process your booking. Please try again later.'
        });
    }
});

export default router;
