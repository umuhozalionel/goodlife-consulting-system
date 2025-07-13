import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth as getAdminAuth } from "firebase-admin/auth"
import { NextResponse } from "next/server"
import { cookies } from "next/headers"

if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID!,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL!,
      privateKey: process.env.FIREBASE_PRIVATE_KEY!.replace(/\\n/g, "\n"),
    }),
  })
}

const adminAuth = getAdminAuth()

export async function POST(req: Request) {
  try {
    const { token } = await req.json()
    if (!token) {
      return NextResponse.json(
        { status: "error", message: "ID token is required" },
        { status: 400 }
      )
    }

    const decoded = await adminAuth.verifyIdToken(token)
    console.log("✅ Firebase token verified:", decoded.uid)

    cookies().set({
      name: "firebase_token",
      value: token,
      httpOnly: true,
      secure: false, // for local dev; set to true in production
      path: "/",
      maxAge: 60 * 60 * 24 * 5, // 5 days
      sameSite: "strict",
    })

    return NextResponse.json({ status: "success", uid: decoded.uid })
  } catch (err: any) {
    console.error("🔥 Token verification failed:", err.message)
    return NextResponse.json(
      { status: "error", message: err.message },
      { status: 403 }
    )
  }
}