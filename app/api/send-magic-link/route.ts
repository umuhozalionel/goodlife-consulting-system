// app/api/send-magic-link/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export async function POST(req: NextRequest) {
  try {
    // initialize Admin SDK once
    if (!getApps().length) {
      const saB64 = process.env.FIREBASE_SERVICE_ACCOUNT_B64!
      const serviceAccount = JSON.parse(
        Buffer.from(saB64, 'base64').toString('utf8')
      )
      initializeApp({ credential: cert(serviceAccount) })
    }

    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    const origin =
      process.env.NODE_ENV === 'production'
        ? process.env.NEXT_PUBLIC_APP_URL!
        : process.env.NEXT_PUBLIC_APP_URL!
    const link = await getAuth().generateSignInWithEmailLink(email, {
      url: `${origin}/signup/trainee`,
      handleCodeInApp: true,
    })

    const mailRes = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    { email: process.env.MAILERSEND_FROM_SANDBOX!, name: 'Goodlife Dev' },
        to:      [{ email }],
        subject: 'Your Goodlife Sign-In Link',
        html:    `<p>Click <a href="${link}">here</a> to sign in.</p>`,
      }),
    })

    if (!mailRes.ok) {
      const errBody = await mailRes.text()
      console.error('[send-magic-link] MailerSend ▶', mailRes.status, errBody)
      return NextResponse.json({ error: errBody }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[send-magic-link] ERROR ▶', err)
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    )
  }
}