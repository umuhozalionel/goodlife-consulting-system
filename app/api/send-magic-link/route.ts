// app/api/send-magic-link/route.ts

import { NextResponse } from 'next/server'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

// Don’t run initializeApp at module‐load time; do it inside your handler
export async function POST(request: Request) {
  try {
    // 1) Lazy‐init Firebase Admin
    if (!getApps().length) {
      const rawKey = process.env.FIREBASE_PRIVATE_KEY!
      initializeApp({
        credential: cert({
          projectId: process.env.FIREBASE_PROJECT_ID!,
          clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
          privateKey: rawKey.replace(/\\n/g, '\n'),
        }),
      })
    }

    // 2) Validate payload
    const { email } = (await request.json()) as { email?: string }
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 })
    }

    // 3) Pick the correct origin
    const origin =
      process.env.VERCEL_ENV === 'production'
        ? 'https://goodlife-consulting-system.vercel.app'
        : 'http://localhost:3000'

    // 4) Generate the magic link
    const link = await getAuth().generateSignInWithEmailLink(email, {
      url: `${origin}/signup/trainee`,
      handleCodeInApp: true,
    })

    // 5) Choose MailerSend domain
    const isProd = process.env.VERCEL_ENV === 'production'
    const mailDomain = isProd
      ? process.env.MAILERSEND_DOMAIN!
      : process.env.MAILERSEND_SANDBOX_DOMAIN!

    console.log(
      `[send-magic-link] VERCEL_ENV=${process.env.VERCEL_ENV} origin=${origin} mailDomain=${mailDomain}`
    )

    // 6) Send via MailerSend
    const mailRes = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { email: `test@${mailDomain}`, name: 'Goodlife Dev' },
        to: [{ email }],
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
      const errText = await mailRes.text()
      console.error(
        `[send-magic-link] MailerSend failed (${mailRes.status}): ${errText}`
      )
      return NextResponse.json(
        { error: `MailerSend error (${mailRes.status})` },
        { status: 502 }
      )
    }

    // 7) All good
    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[send-magic-link] ERROR →', err)
    return NextResponse.json(
      { error: err instanceof Error ? err.message : String(err) },
      { status: 500 }
    )
  }
}