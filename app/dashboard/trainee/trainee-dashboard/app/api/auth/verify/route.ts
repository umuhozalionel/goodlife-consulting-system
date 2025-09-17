import { type NextRequest, NextResponse } from "next/server"
import { adminAuth } from "@/lib/firebase-admin"

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")
    const email = searchParams.get("email")

    if (!token || !email) {
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/signup/trainee?error=invalid-link`)
    }

    // Verify the custom token
    try {
      await adminAuth.verifyIdToken(token)
    } catch (error) {
      console.error("Token verification failed:", error)
      return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/signup/trainee?error=expired-link`)
    }

    // Redirect to auth verification page with token
    return NextResponse.redirect(
      `${process.env.NEXT_PUBLIC_APP_URL}/auth/verify?token=${token}&email=${encodeURIComponent(email)}`,
    )
  } catch (error) {
    console.error("Error in auth verification:", error)
    return NextResponse.redirect(`${process.env.NEXT_PUBLIC_APP_URL}/signup/trainee?error=verification-failed`)
  }
}
