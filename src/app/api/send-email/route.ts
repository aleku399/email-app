import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: Request) {
  const { name, lastName, organisation, email, phoneNumber, message, country, subject } = await req.json();

  const transporter = nodemailer.createTransport({
    host: "premium51.web-hosting.com", // Your SMTP server
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: "sales@henkmininglogistics.com", // Your email address
      pass: "sales@2020", // Your email password
    },
  });

  const mailOptions = {
    from: "sales@henkmininglogistics.com",
    to: "sales@henkmininglogistics.com", // Change this to your email or the recipient's email
    subject: `New Contact Form Submission - ${subject}`,
    text: `You have a new contact form submission from ${name} ${lastName}.
    
Country: ${country}
Organisation: ${organisation}
Email: ${email}
Phone Number: ${phoneNumber}

Message:
${message}`,
  };

  try {
    await transporter.sendMail(mailOptions);
    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}
