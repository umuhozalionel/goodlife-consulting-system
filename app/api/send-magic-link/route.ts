// app/api/send-magic-link/route.ts

import { NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import fetch from 'node-fetch';

if (!getApps().length) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, '\n'),
    }),
  });
}

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    const link = await getAuth().generateSignInWithEmailLink(email, {
      url: 'http://localhost:3000/signup/trainee',
      handleCodeInApp: true,
    });

    const sandbox = process.env.MAILERSEND_SANDBOX_DOMAIN!;
    console.log('Using sandbox domain:', sandbox);

    const res = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: { email: `test@${sandbox}`, name: 'Goodlife Dev' },
        to: [{ email }],
        subject: 'Your Goodlife Sign-In Link',
        html: `
          <div style="font-family:sans-serif;padding:20px;">
            <h2>Welcome to Goodlife Consulting</h2>
            <a href="${link}" style="display:inline-block;
               padding:10px 20px;background:#f97316;color:#fff;
               text-decoration:none;border-radius:4px;">
              Sign In
            </a>
            <p style="margin-top:12px;font-size:12px;color:#555;">
              Or copy & paste:<br/>
              <code style="word-break:break-all;">${link}</code>
            </p>
          </div>
        `,
      }),
    });

    if (!res.ok) {
      const err = await res.text();
      console.error('MailerSend Error:', res.status, err);
      return NextResponse.json(
        { error: `MailerSend failed (${res.status}): ${err}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (e: any) {
    console.error('send-magic-link ERROR →', e);
    return NextResponse.json({ error: e.message }, { status: 500 });
  }
}