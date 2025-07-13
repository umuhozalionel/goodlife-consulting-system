import { NextResponse } from "next/server"
import type { NextRequest } from "next/server"

export function middleware(req: NextRequest) {
  const token = req.cookies.get("firebase_token")?.value
  const isAdminPath = req.nextUrl.pathname.startsWith("/admin")

  if (isAdminPath && !token) {
    console.warn("🚧 No firebase_token cookie — redirecting to /auth")
    return NextResponse.redirect(new URL("/auth", req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ["/admin/:path*"],
}