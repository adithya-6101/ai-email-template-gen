// api/ai-email-generate/send-test-email/route.jsx

import nodemailer from "nodemailer";

export async function POST(req) {
  const { to, htmlContent } = await req.json();

  try {
    const transporter = nodemailer.createTransport({
      service: "gmail", // Or use Mailgun, SendGrid, etc.
      auth: {
        user: process.env.EMAIL_USER, // Set in .env.local
        pass: process.env.EMAIL_PASS, // Set in .env.local
      },
    });

    const mailOptions = {
      from: `"AI Email Builder" <${process.env.EMAIL_USER}>`,
      to,
      subject: "Test Email from AI Email Builder",
      html: htmlContent,
    };

    const info = await transporter.sendMail(mailOptions);
    return new Response(
      JSON.stringify({ message: "Email sent successfully!", info }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error sending email:", error);
    return new Response(
      JSON.stringify({
        error: "Failed to send email. Please try again later.",
      }),
      { status: 500 }
    );
  }
}
