import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getAuth } from "firebase-admin/auth"
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

const adminAuth = getAuth()
const db = getFirestore()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const token = searchParams.get("token")

    console.log("🔐 Incoming token verification request")

    if (!token) {
      console.warn("⛔ Token missing from query")
      return NextResponse.json(
        { status: "error", message: "Missing token" },
        { status: 400 }
      )
    }

    const decoded = await adminAuth.verifyIdToken(token)
    const uid = decoded.uid

    if (uid === "THE_UID") {
      console.error("🚫 Static UID detected — request rejected")
      return NextResponse.json(
        { status: "error", message: "Static UID 'THE_UID' is invalid in production." },
        { status: 403 }
      )
    }

    console.log("✅ Token verified — UID:", uid)

    const docRef = db.doc(`users/${uid}`)
    const userDoc = await docRef.get()

    if (!userDoc.exists) {
      console.warn("🚫 No user found in Firestore for UID:", uid)
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      )
    }

    const role = userDoc.data()?.role

    if (!role) {
      console.warn("⚠️ Role undefined in Firestore doc:", userDoc.data())
      return NextResponse.json(
        { status: "error", message: "Role is undefined" },
        { status: 400 }
      )
    }

    console.log("✅ Role retrieved:", role)
    return NextResponse.json({ status: "success", role })
  } catch (error: any) {
    console.error("🔥 Error in /verify-admin:", error.message)
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 403 }
    )
  }
}