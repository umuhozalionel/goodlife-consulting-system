import { NextResponse } from "next/server"
import { createUserWithEmailAndPassword } from "firebase/auth"
import { doc, setDoc, serverTimestamp } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export async function POST(req: Request) {
  try {
    const { name, email, password, role = "user" } = await req.json()

    // 1. Create user in Firebase Auth
    const userCredential = await createUserWithEmailAndPassword(auth, email, password)
    const user = userCredential.user

    // 2. Create Firestore doc with profile data
    const userRef = doc(db, "users", user.uid)
    await setDoc(userRef, {
      uid: user.uid,
      name,
      email,
      role,
      createdAt: serverTimestamp(),
    })

    return NextResponse.json({ status: "success", uid: user.uid })
  } catch (error: any) {
    return NextResponse.json(
      { status: "error", message: error.message },
      { status: 500 }
    )
  }
}