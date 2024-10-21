import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// Handle the POST request for sending emails
export async function POST(req: Request) {
  try {
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
      to: "sales@henkmininglogistics.com",
      subject: `New Contact Form Submission - ${subject}`,
      text: `You have a new contact form submission from ${name} ${lastName}.
      
Country: ${country}
Organisation: ${organisation}
Email: ${email}
Phone Number: ${phoneNumber}

Message:
${message}`,
    };

    await transporter.sendMail(mailOptions);

    const response = NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
    // Set CORS headers for the actual POST request
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

// Handle the preflight OPTIONS request for CORS
export function OPTIONS() {
  const response = NextResponse.json({}, { status: 204 });
  // Set CORS headers for preflight requests
  response.headers.set('Access-Control-Allow-Origin', 'https://www.henkmininglogistics.com');
  response.headers.set('Access-Control-Allow-Methods', 'POST');
  response.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  return response;
}
