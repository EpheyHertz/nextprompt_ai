import nodemailer from 'nodemailer';

export const POST = async (req) => {
    // Only allow POST method
    if (req.method !== 'POST') {
        return new Response(`Method ${req.method} not allowed`, {
            status: 405,
            headers: { 'Allow': 'POST' },
        });
    }

    try {
        const { email, message } = await req.json(); // Extract data from request body

       

        // Create a transporter object using SMTP transport
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST, // e.g., smtp.gmail.com for Gmail
            port: process.env.EMAIL_PORT ,
            secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER, // your email account
                pass: process.env.EMAIL_PASS, // your email password
            },
        });

        // Send the email
        await transporter.sendMail({
            from: `"${email}" <${email}>`, // sender address
            to: process.env.EMAIL_RECEIVER, // receiver address
            subject: 'New Contact Form Submission', // Subject line
            text: message, // plain text body
            html: `<p><strong>Email:</strong> ${email}</p><p><strong>Message:</strong> ${message}</p>`, // HTML body
        });

        // Respond with a success message
        return new Response(JSON.stringify({ message: 'Email sent successfully!' }), {
            status: 200,
            headers: { 'Content-Type': 'application/json' },
        });
    } catch (error) {
        console.error('Error sending email:', error);
        return new Response(JSON.stringify({ error: 'Error sending email. Please try again later.' }), {
            status: 500,
            headers: { 'Content-Type': 'application/json' },
        });
    }
};
