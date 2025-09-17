import { type NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"
import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
})

export async function POST(request: NextRequest) {
  try {
    const { email } = await request.json()

    if (!email) {
      return NextResponse.json({ error: "Email is required" }, { status: 400 })
    }

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email format" }, { status: 400 })
    }

    // Generate custom token for magic link
    const customToken = await adminAuth.createCustomToken(email, {
      email,
      signInMethod: "magic-link",
    })

    // Create magic link URL
    const magicLinkUrl = `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${customToken}&email=${encodeURIComponent(email)}`

    // Send email via MailerSend
    const sentFrom = new Sender("noreply@yourdomain.com", "Trainee App")
    const recipients = [new Recipient(email, "Trainee")]

    const emailParams = new EmailParams()
      .setFrom(sentFrom)
      .setTo(recipients)
      .setSubject("Your Magic Link - Trainee App")
      .setHtml(`
        <!DOCTYPE html>
        <html>
        <head>
          <meta charset="utf-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Magic Link - Trainee App</title>
        </head>
        <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333; max-width: 600px; margin: 0 auto; padding: 20px;">
          <div style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); padding: 30px; text-align: center; border-radius: 10px 10px 0 0;">
            <h1 style="color: white; margin: 0; font-size: 28px;">Welcome to Trainee App</h1>
          </div>
          
          <div style="background: #f8f9fa; padding: 30px; border-radius: 0 0 10px 10px;">
            <h2 style="color: #333; margin-top: 0;">Your Magic Link is Ready!</h2>
            <p style="font-size: 16px; margin-bottom: 25px;">
              Click the button below to securely sign in to your trainee dashboard. This link will expire in 1 hour for your security.
            </p>
            
            <div style="text-align: center; margin: 30px 0;">
              <a href="${magicLinkUrl}" 
                 style="background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); 
                        color: white; 
                        padding: 15px 30px; 
                        text-decoration: none; 
                        border-radius: 25px; 
                        font-weight: bold; 
                        font-size: 16px; 
                        display: inline-block;
                        box-shadow: 0 4px 15px rgba(102, 126, 234, 0.4);">
                Sign In to Dashboard
              </a>
            </div>
            
            <p style="font-size: 14px; color: #666; margin-top: 25px;">
              If the button doesn't work, copy and paste this link into your browser:<br>
              <a href="${magicLinkUrl}" style="color: #667eea; word-break: break-all;">${magicLinkUrl}</a>
            </p>
            
            <hr style="border: none; border-top: 1px solid #eee; margin: 25px 0;">
            
            <p style="font-size: 12px; color: #999; text-align: center;">
              This email was sent to ${email}. If you didn't request this magic link, you can safely ignore this email.
            </p>
          </div>
        </body>
        </html>
      `)
      .setText(`
        Welcome to Trainee App!
        
        Your magic link is ready. Click the link below to sign in to your dashboard:
        ${magicLinkUrl}
        
        This link will expire in 1 hour for your security.
        
        If you didn't request this magic link, you can safely ignore this email.
      `)

    await mailerSend.email.send(emailParams)

    return NextResponse.json({
      success: true,
      message: "Magic link sent successfully",
    })
  } catch (error) {
    console.error("Error sending magic link:", error)
    return NextResponse.json({ error: "Failed to send magic link" }, { status: 500 })
  }
}
