import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const url = req.nextUrl
  const token = req.cookies.get("firebase_token")?.value
  const isAdminPath = url.pathname.startsWith("/admin")

  // ⛔ Redirect if accessing /admin and no token found
  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL("/auth", url))
  }

  return NextResponse.next()
}