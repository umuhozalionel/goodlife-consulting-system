import { NextResponse } from "next/server"
import { db } from "@/lib/firebase"
import { doc, getDoc } from "firebase/firestore"

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url)
    const uid = searchParams.get("uid")

    if (!uid) throw new Error("UID is required")

    const snap = await getDoc(doc(db, "users", uid))
    if (!snap.exists()) throw new Error("User not found")

    const role = snap.data().role
    return NextResponse.json({ status: "success", role })
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}