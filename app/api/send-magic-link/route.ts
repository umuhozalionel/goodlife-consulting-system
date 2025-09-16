// app/api/send-magic-link/route.ts

import fs   from 'fs'
import path from 'path'
import { NextRequest, NextResponse } from 'next/server'
import { initializeApp, cert, getApps } from 'firebase-admin/app'
import { getAuth } from 'firebase-admin/auth'

export async function POST(req: NextRequest) {
  try {
    // 1) Lazy-init using exactly “serviceaccountkey.json”
    if (!getApps().length) {
      const keyFile = path.resolve(process.cwd(), 'serviceaccountkey.json')
      if (!fs.existsSync(keyFile)) {
        throw new Error('serviceaccountkey.json not found in project root')
      }
      const serviceAccount = JSON.parse(fs.readFileSync(keyFile, 'utf8'))
      initializeApp({ credential: cert(serviceAccount) })
      console.log('[send-magic-link] Firebase Admin initialized')
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

    // 4) Send via MailerSend
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
        html:    `<p>Click <a href="${link}">here</a> to sign in.</p>`,
      }),
    })
    if (!mailRes.ok) {
      const errText = await mailRes.text()
      console.error('[send-magic-link] MailerSend failed →', mailRes.status, errText)
      return NextResponse.json({ error: 'MailerSend failure' }, { status: 502 })
    }

    return NextResponse.json({ success: true })
  } catch (err: any) {
    console.error('[send-magic-link] ERROR →', err)
    return NextResponse.json(
      { error: err.message || 'Internal error' },
      { status: 500 }
    )
  }
}