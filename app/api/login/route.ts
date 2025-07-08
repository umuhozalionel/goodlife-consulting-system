import { NextResponse } from "next/server"
import { signInWithEmailAndPassword } from "firebase/auth"
import { auth } from "@/lib/firebase"

export async function POST(req: Request) {
  try {
    const { email, password } = await req.json()

    const userCredential = await signInWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    return NextResponse.json({
      status: "success",
      uid: user.uid,
      email: user.email,
    })
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 401 }
    )
  }
}