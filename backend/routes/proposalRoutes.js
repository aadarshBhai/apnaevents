import express from 'express';
import EventProposal from '../models/EventProposal.js';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Submit a new event proposal
router.post('/', async (req, res) => {
    try {
        const proposal = new EventProposal(req.body);
        const savedProposal = await proposal.save();

        // Send notification email to admin
        const adminEmail = process.env.ADMIN_EMAIL || 'aadarshgolucky@gmail.com';

        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; padding: 20px; background-color: #f8f9fa;">
                <div style="background-color: #10b981; padding: 30px; border-radius: 10px; color: white; text-align: center;">
                    <h1 style="margin: 0;">New Competition Listing Request</h1>
                </div>
                <div style="background: white; padding: 30px; border-radius: 10px; margin-top: 20px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #0f172a; border-bottom: 2px solid #10b981; padding-bottom: 10px;">Event Details</h2>
                    <p><strong>School/Organizer:</strong> ${savedProposal.schoolName}</p>
                    <p><strong>Event Name:</strong> ${savedProposal.eventName}</p>
                    <p><strong>Proposed Date:</strong> ${savedProposal.date}</p>
                    <p><strong>Category:</strong> ${savedProposal.category}</p>
                    <p><strong>Contact Info:</strong> ${savedProposal.contactNumber} | ${savedProposal.email}</p>
                    <div style="background: #f1f5f9; padding: 15px; border-radius: 8px; margin-top: 20px;">
                        <p style="margin: 0;"><strong>Description:</strong></p>
                        <p>${savedProposal.description}</p>
                    </div>
                    <div style="text-align: center; margin-top: 30px;">
                        <p style="color: #64748b; font-size: 14px;">Review this proposal in the admin dashboard.</p>
                    </div>
                </div>
            </div>
        `;

        try {
            await sendEmail({
                to: adminEmail,
                subject: `🚀 New Event Listing Request: ${savedProposal.eventName}`,
                html: emailHtml
            });
        } catch (emailError) {
            console.error('Failed to send proposal email:', emailError);
            // Don't fail the request if email fails, as long as DB save worked
        }

        res.status(201).json({
            success: true,
            message: 'Proposal submitted successfully',
            proposal: savedProposal
        });
    } catch (error) {
        console.error('Error submitting proposal:', error);
        res.status(400).json({ success: false, message: error.message });
    }
});

// Admin: Get all proposals (protected route normally, but leaving simple for now)
router.get('/', async (req, res) => {
    try {
        const proposals = await EventProposal.find().sort({ submittedAt: -1 });
        res.json({ success: true, proposals });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
});

export default router;
