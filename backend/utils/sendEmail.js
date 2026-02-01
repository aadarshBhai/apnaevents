import nodemailer from 'nodemailer';

const sendEmail = async ({ to, subject, html }) => {
    const port = Number(process.env.SMTP_PORT || 587);

    const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port,
        secure: port === 465,
        auth: {
            user: process.env.SMTP_USER,
            pass: process.env.SMTP_PASS,
        },
    });

    const from = process.env.SMTP_FROM || process.env.SMTP_USER;

    await transporter.sendMail({
        from,
        to,
        subject,
        html,
    });
};

export default sendEmail;
