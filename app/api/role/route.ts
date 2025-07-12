import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { NextResponse } from "next/server"

// 🔐 Initialize Firebase Admin SDK once
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID,
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL,
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n"),
    }),
  })
}

const db = getFirestore()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")
    if (!uid) throw new Error("UID is required")

    const docRef = db.doc(`users/${uid}`)
    const snap = await docRef.get()

    if (!snap.exists) throw new Error("User not found")

    const role = snap.data()?.role
    if (!role) throw new Error("Role is undefined")

    return NextResponse.json({ status: "success", role })
  } catch (error: any) {
    console.error("🔥 API /role error:", error.message)
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}