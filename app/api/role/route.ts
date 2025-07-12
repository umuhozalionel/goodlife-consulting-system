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

    console.log("🔍 Role check triggered for UID:", uid)

    // ⛔ Reject static placeholder UID
    if (uid === "THE_UID") {
      console.error("🚫 Static test UID detected — rejected immediately")
      return NextResponse.json(
        { status: "error", message: "Static UID 'THE_UID' is invalid in production." },
        { status: 403 }
      )
    }

    if (!uid) {
      console.warn("⚠️ UID missing from query")
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
      console.warn("⚠️ Role is missing in Firestore data:", snap.data())
      return NextResponse.json(
        { status: "error", message: "Role is undefined" },
        { status: 400 }
      )
    }

    console.log("✅ Role retrieved successfully:", role)

    return NextResponse.json({ status: "success", role })
  } catch (error: any) {
    console.error("🔥 Internal error in /api/role:", error.message)
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}