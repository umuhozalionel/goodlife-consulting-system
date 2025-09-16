import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export async function POST(req: NextRequest) {
  try {
    // 1) Lazy-init Admin SDK
    if (!getApps().length) {
      const b64 = process.env.FIREBASE_PRIVATE_KEY_B64
      if (!b64) throw new Error('Missing FIREBASE_PRIVATE_KEY_B64')
      const privateKey = Buffer.from(b64, 'base64').toString('utf8')

      initializeApp({
        credential: cert({
          projectId:   process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          privateKey,
        }),
      })
    }

    // 2) Validate payload
    const { email } = await req.json()
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // 3) Generate magic link
    const origin =
      process.env.NODE_ENV === 'production'
        ? 'https://goodlife-consulting-system.vercel.app'
        : process.env.NEXT_PUBLIC_APP_URL!
    const link = await getAuth().generateSignInWithEmailLink(email, {
      url: `${origin}/signup/trainee`,
      handleCodeInApp: true,
    })

    // 4) Send email via MailerSend
    const mailRes = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY!}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from:    { email: process.env.MAILERSEND_FROM!, name: 'Goodlife Dev' },
        to:      [{ email }],
        subject: 'Your Goodlife Sign-In Link',
        html: `
          <div style="font-family:sans-serif;padding:20px;">
            <h2>Welcome to Goodlife Consulting</h2>
            <a href="${link}"
               style="display:inline-block;
                      padding:10px 20px;
                      background:#f97316;
                      color:#fff;
                      text-decoration:none;
                      border-radius:4px;">
              Sign In
            </a>
            <p style="margin-top:12px;font-size:12px;color:#555;">
              Or copy & paste:<br/>
              <code style="word-break:break-all;">${link}</code>
            </p>
          </div>
        `,
      }),
    })

    if (!mailRes.ok) {
      const text = await mailRes.text()
      console.error('MailerSend error →', mailRes.status, text)
      return NextResponse.json({ error: 'MailerSend failure' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('send-magic-link ERROR →', err)
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    )
  }
}