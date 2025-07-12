import { initializeApp, cert, getApps } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
import { getDoc, doc } from "firebase/firestore"
import { db } from "@/lib/firebase"
import { NextResponse } from "next/server"

// ✅ Firebase Admin setup
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: "your-project-id",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

const adminAuth = getAuth()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")
    if (!token) throw new Error("Missing token")

    const decoded = await adminAuth.verifyIdToken(token)
    const userDoc = await getDoc(doc(db, "users", decoded.uid))

    if (!userDoc.exists()) throw new Error("User not found")
    const role = userDoc.data().role

    return NextResponse.json({ status: "success", role })
  } catch (error: any) {
    return NextResponse.json({ status: "error", message: error.message }, { status: 403 })
  }
}