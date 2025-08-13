import { type NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, projectType, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Log the submission (in production, you'd save to database)
    console.log("New contact form submission:", {
      timestamp: new Date().toISOString(),
      firstName,
      lastName,
      email,
      phone,
      projectType,
      message,
    })

    // Here you would typically:
    // 1. Save to database
    // 2. Send email notification
    // 3. Add to CRM system

    // Simulate email sending (replace with actual email service)
    const emailSent = await sendEmail({
      to: "info@buildcraftpro.com",
      from: email,
      subject: `New Project Inquiry - ${projectType}`,
      html: `
        <h2>New Contact Form Submission</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Phone:</strong> ${phone}</p>
        <p><strong>Project Type:</strong> ${projectType}</p>
        <p><strong>Message:</strong></p>
        <p>${message}</p>
      `,
    })

    // Send auto-reply to customer
    const autoReplySent = await sendEmail({
      to: email,
      from: "info@buildcraftpro.com",
      subject: "Thank you for contacting BuildCraft Pro",
      html: `
        <h2>Thank you for your inquiry!</h2>
        <p>Dear ${firstName},</p>
        <p>We've received your message about your ${projectType} project and will get back to you within 24 hours.</p>
        <p>Our team is excited to help bring your vision to life!</p>
        <p>Best regards,<br>The BuildCraft Pro Team</p>
      `,
    })

    return NextResponse.json({
      success: true,
      message: "Message sent successfully!",
      emailSent,
      autoReplySent,
    })
  } catch (error) {
    console.error("Contact form error:", error)
    return NextResponse.json({ error: "Failed to send message. Please try again." }, { status: 500 })
  }
}

// Mock email function - replace with actual email service
async function sendEmail({
  to,
  from,
  subject,
  html,
}: {
  to: string
  from: string
  subject: string
  html: string
}) {
  // In production, use services like:
  // - Resend: https://resend.com/
  // - SendGrid: https://sendgrid.com/
  // - Nodemailer with SMTP

  console.log("Sending email:", { to, from, subject })

  // Simulate email sending delay
  await new Promise((resolve) => setTimeout(resolve, 1000))

  // Return success (in production, handle actual email service response)
  return {
    success: true,
    messageId: `msg_${Date.now()}`,
    timestamp: new Date().toISOString(),
  }
}
