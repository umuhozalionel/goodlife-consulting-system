import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { NextResponse } from "next/server"

// 🔐 Initialize Firebase Admin SDK only once
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      projectId: process.env.FIREBASE_PROJECT_ID || "",
      clientEmail: process.env.FIREBASE_CLIENT_EMAIL || "",
      privateKey: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
    }),
  })
}

const db = getFirestore()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")

    console.log("🔍 Role check for UID:", uid)

    if (!uid) {
      return NextResponse.json(
        { status: "error", message: "UID is required" },
        { status: 400 }
      )
    }

    const docRef = db.doc(`users/${uid}`)
    const snap = await docRef.get()

    if (!snap.exists) {
      console.warn("🚫 No Firestore document found for UID:", uid)
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      )
    }

    const role = snap.data()?.role

    if (!role) {
      console.warn("⚠️ Role is missing in document:", snap.data())
      return NextResponse.json(
        { status: "error", message: "Role is undefined" },
        { status: 400 }
      )
    }

    console.log("✅ Role found:", role)

    return NextResponse.json({ status: "success", role })
  } catch (error: any) {
    console.error("🔥 /api/role error:", error.message)
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}