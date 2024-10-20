import { NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

// CORS middleware to set headers
const corsMiddleware = (req: Request, res: NextResponse) => {
  const allowedOrigin = 'https://www.henkmininglogistics.com';
  const origin = req.headers.get('origin');
  
  if (origin === allowedOrigin) {
    res.headers.set('Access-Control-Allow-Origin', allowedOrigin);
  }
  
  res.headers.set('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.headers.set('Access-Control-Allow-Headers', 'Content-Type');
  res.headers.set('Vary', 'Origin');
};

// Handle the POST request for sending emails
export async function POST(req: Request) {
  const response = NextResponse.json({}, { status: 200 });

  // Apply CORS headers
  corsMiddleware(req, response);

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

    return NextResponse.json({ message: 'Email sent successfully' }, { status: 200 });
  } catch (error) {
    console.error('Error sending email:', error);
    return NextResponse.json({ message: 'Failed to send email' }, { status: 500 });
  }
}

// Handle the preflight OPTIONS request for CORS
export function OPTIONS(req: Request) {
  const response = new NextResponse(null, { status: 204 });
  
  // Apply CORS headers
  corsMiddleware(req, response); 
  
  return response;
}
