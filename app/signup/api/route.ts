import { NextResponse } from "next/server"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export async function POST(req: Request) {
  try {
    const { name, email, password, role = "trainee" } = await req.json()

    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      name,
      email,
      role, // ✅ "trainer" or "trainee" based on frontend
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({
      status: "success",
      uid: user.uid,
      email: user.email,
    })
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}