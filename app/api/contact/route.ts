import { NextResponse } from "next/server"
import { resend } from "@/lib/resend"
import { EmailTemplate } from "@/components/email-template"

export async function POST(request: Request) {
  try {
    const body = await request.json()
    const { name, email, message } = body

    // Validate the request
    if (!name || !email || !message) {
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Send email using Resend
       const { data, error } = await resend.emails.send({
      from: "Portfolio Contact <onboarding@resend.dev>",
      to: ["arham.imdad14@gmail.com"],
      replyTo: email,
      subject: `New Contact Form Submission from ${name}`,
      react: await EmailTemplate({ name, email, message }), // <--- Fix here
      text: `
        New contact form submission:
        
        Name: ${name}
        Email: ${email}
        
        Message:
        ${message}
      `,
    })


    if (error) {
      console.error("Resend error:", error)
      return NextResponse.json({ error: "Failed to send email" }, { status: 500 })
    }

    console.log("Email sent successfully:", data)
    return NextResponse.json({
      success: true,
      message: "Email sent successfully",
      emailId: data?.id,
    })
  } catch (error) {
    console.error("Error in contact form submission:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
