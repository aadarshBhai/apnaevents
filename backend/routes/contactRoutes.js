import express from 'express';
import sendEmail from '../utils/sendEmail.js';

const router = express.Router();

// Send contact form email to admin
router.post('/', async (req, res) => {
    try {
        const { name, email, subject, message } = req.body;

        // Validate required fields
        if (!name || !email || !message) {
            return res.status(400).json({ 
                message: 'Name, email, and message are required' 
            });
        }

        // Get admin email from environment
        const adminEmail = process.env.ADMIN_EMAIL || 'aadarshgolucky@gmail.com';

        // Create email content
        const emailSubject = subject || `New Contact Form Message from ${name}`;
        
        const emailHtml = `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background-color: #f8f9fa;">
                <div style="background-color: #0f172a; padding: 30px; border-radius: 10px; color: white; text-align: center; margin-bottom: 30px;">
                    <h1 style="margin: 0; font-size: 28px;">EventDekho</h1>
                    <p style="margin: 10px 0 0 0; opacity: 0.9;">New Contact Form Submission</p>
                </div>
                
                <div style="background: white; padding: 30px; border-radius: 10px; box-shadow: 0 2px 10px rgba(0,0,0,0.1);">
                    <h2 style="color: #0f172a; margin-top: 0; border-bottom: 2px solid #10b981; padding-bottom: 10px;">
                        Contact Information
                    </h2>
                    
                    <div style="margin: 20px 0;">
                        <p style="margin: 10px 0; color: #64748b;">
                            <strong style="color: #0f172a;">Name:</strong> ${name}
                        </p>
                        <p style="margin: 10px 0; color: #64748b;">
                            <strong style="color: #0f172a;">Email:</strong> 
                            <a href="mailto:${email}" style="color: #10b981; text-decoration: none;">${email}</a>
                        </p>
                        ${subject ? `
                        <p style="margin: 10px 0; color: #64748b;">
                            <strong style="color: #0f172a;">Subject:</strong> ${subject}
                        </p>
                        ` : ''}
                    </div>
                    
                    <div style="margin: 30px 0;">
                        <h3 style="color: #0f172a; margin-bottom: 15px;">Message:</h3>
                        <div style="background-color: #f1f5f9; padding: 20px; border-radius: 8px; border-left: 4px solid #10b981;">
                            <p style="margin: 0; color: #475569; line-height: 1.6; white-space: pre-wrap;">${message}</p>
                        </div>
                    </div>
                    
                    <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #e2e8f0; text-align: center;">
                        <p style="margin: 0; color: #94a3b8; font-size: 14px;">
                            This message was sent from the EventDekho contact form
                        </p>
                        <p style="margin: 5px 0 0 0; color: #94a3b8; font-size: 12px;">
                            Received on: ${new Date().toLocaleString('en-US', { 
                                weekday: 'long', 
                                year: 'numeric', 
                                month: 'long', 
                                day: 'numeric',
                                hour: '2-digit',
                                minute: '2-digit'
                            })}
                        </p>
                    </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                    <p style="color: #64748b; font-size: 14px;">
                        © 2026 EventDekho - India's Largest Education Competition Hub
                    </p>
                </div>
            </div>
        `;

        // Send email to admin
        await sendEmail({
            to: adminEmail,
            subject: emailSubject,
            html: emailHtml
        });

        res.status(200).json({ 
            message: 'Message sent successfully! We will get back to you soon.' 
        });

    } catch (error) {
        console.error('Error sending contact email:', error);
        res.status(500).json({ 
            message: 'Failed to send message. Please try again later.' 
        });
    }
});

export default router;
