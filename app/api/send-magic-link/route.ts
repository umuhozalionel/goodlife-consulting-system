// app/api/send-magic-link/route.ts

import { NextResponse } from 'next/server';
import { initializeApp, cert, getApps } from 'firebase-admin/app';
import { getAuth } from 'firebase-admin/auth';
import serviceAccount from '../../../serviceaccountkey.json';
import fetch from 'node-fetch';

if (!getApps().length) {
  initializeApp({ credential: cert(serviceAccount) });
}

export async function POST(request: Request) {
  try {
    const { email } = (await request.json()) as { email?: string };
    if (!email || typeof email !== 'string') {
      return NextResponse.json({ error: 'Invalid email' }, { status: 400 });
    }

    // 1) Generate Firebase magic link
    const link = await getAuth().generateSignInWithEmailLink(email, {
      url: 'http://localhost:3000/signup/trainee',
      handleCodeInApp: true,
    });

    // 2) Send via MailerSend sandbox
    const sandboxDomain = process.env.MAILERSEND_SANDBOX_DOMAIN;
    console.log('Using sandbox domain:', sandboxDomain);

    const msRes = await fetch('https://api.mailersend.com/v1/email', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.MAILERSEND_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        from: {
          email: `test@${sandboxDomain}`,
          name: 'Goodlife Dev',
        },
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

    if (!msRes.ok) {
      const errText = await msRes.text();
      console.error('MailerSend Error:', msRes.status, errText);
      return NextResponse.json(
        { error: `MailerSend failed (${msRes.status}): ${errText}` },
        { status: 502 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    console.error('send-magic-link ERROR →', err);
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}