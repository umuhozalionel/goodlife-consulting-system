import { MailerSend, EmailParams, Sender, Recipient } from "mailersend"

const mailerSend = new MailerSend({
  apiKey: process.env.MAILERSEND_API_KEY || "",
})

export interface EmailTemplate {
  to: string
  subject: string
  html: string
  text?: string
}

export async function sendEmail({ to, subject, html, text }: EmailTemplate) {
  try {
    const sentFrom = new Sender("noreply@yourdomain.com", "Trainee App")
    const recipients = [new Recipient(to, "User")]

    const emailParams = new EmailParams().setFrom(sentFrom).setTo(recipients).setSubject(subject).setHtml(html)

    if (text) {
      emailParams.setText(text)
    }

    const response = await mailerSend.email.send(emailParams)
    return { success: true, response }
  } catch (error) {
    console.error("Error sending email:", error)
    return { success: false, error }
  }
}

export { mailerSend }
