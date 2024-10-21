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

    // Set CORS headers
    const response = NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    response.headers.set('Access-Control-Allow-Origin', 'https://www.henkmininglogistics.com');
    response.headers.set('Access-Control-Allow-Methods', 'POST');
    response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return response;
  } catch (error) {
    console.error('Error sending email:', error);

    const errorResponse = NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
    errorResponse.headers.set('Access-Control-Allow-Origin', 'https://www.henkmininglogistics.com');
    errorResponse.headers.set('Access-Control-Allow-Methods', 'POST');
    errorResponse.headers.set('Access-Control-Allow-Headers', 'Content-Type');
    
    return errorResponse;
  }
}

// Handle OPTIONS request for preflight checks
export function OPTIONS() {
  const response = NextResponse.json({}, { status: 204 });
  response.headers.set('Access-Control-Allow-Origin', 'https://www.henkmininglogistics.com');
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  
  return response;
}
