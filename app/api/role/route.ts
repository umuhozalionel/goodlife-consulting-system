// app/api/role/route.ts
import { cert, getApps, initializeApp } from "firebase-admin/app"
import { getFirestore } from "firebase-admin/firestore"
import { NextResponse } from "next/server"

// ✅ Initialize Firebase Admin SDK only once
if (getApps().length === 0) {
  initializeApp({
    credential: cert({
      project_id: process.env.FIREBASE_PROJECT_ID || "",
      client_email: process.env.FIREBASE_CLIENT_EMAIL || "",
      private_key: process.env.FIREBASE_PRIVATE_KEY?.replace(/\\n/g, "\n") || "",
    }),
  })
}

const db = getFirestore()

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")

    console.log("🔍 Role check for UID:", uid)

    if (uid === "THE_UID") {
      console.error("🚫 Static UID detected—rejected")
      return NextResponse.json(
        { status: "error", message: "Static UID 'THE_UID' is invalid in production." },
        { status: 403 }
      )
    }

    if (!uid) {
      console.warn("⚠️ Missing UID in /api/role")
      return NextResponse.json(
        { status: "error", message: "UID is required" },
        { status: 400 }
      )
    }

    const snap = await db.doc(`users/${uid}`).get()
    if (!snap.exists) {
      console.warn("🚫 No user doc for UID:", uid)
      return NextResponse.json(
        { status: "error", message: "User not found" },
        { status: 404 }
      )
    }

    const role = snap.data()?.role
    if (!role) {
      console.warn("⚠️ Role undefined in doc for UID:", uid)
      return NextResponse.json(
        { status: "error", message: "Role is undefined" },
        { status: 400 }
      )
    }

    console.log("✅ Role retrieved:", role)
    return NextResponse.json({ status: "success", role })
  } catch (error: any) {
    console.error("🔥 /api/role error:", error.message)
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}