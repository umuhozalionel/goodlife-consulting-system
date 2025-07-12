import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"
import { getAuth } from "firebase/auth"
import { getApp } from "firebase/app"
import { getDoc, doc } from "firebase/firestore"
import { auth, db } from "./lib/firebase" // Adjust if your Firebase lib path differs

export async function middleware(req: NextRequest) {
  const url = req.nextUrl
  const isAdminPath = url.pathname.startsWith("/admin")

  if (!isAdminPath) return NextResponse.next()

  const token = req.cookies.get("firebase_token")?.value
  if (!token) {
    return NextResponse.redirect(new URL("/auth", url))
  }

  try {
    const user = await auth.verifyIdToken(token)
    const userDoc = await getDoc(doc(db, "users", user.uid))

    if (userDoc.exists()) {
      const data = userDoc.data()
      if (data.role === "trainer") {
        return NextResponse.next()
      }
    }

    return NextResponse.redirect(new URL("/auth", url))
  } catch (error) {
    return NextResponse.redirect(new URL("/auth", url))
  }
}