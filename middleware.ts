import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("firebase_token")?.value
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin")

  if (isAdminPath && !token) {
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}