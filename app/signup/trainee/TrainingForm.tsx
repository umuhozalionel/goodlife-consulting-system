"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { doc, setDoc } from "firebase/firestore"
import { auth, db } from "@/lib/firebase"

export default function TrainingForm() {
  const router = useRouter()
  const [form, setForm] = useState({
    fullName: "",
    email: "",
    password: "",
    phone: "",
    trainingType: "",
    trainingLocation: ""
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, form.email, form.password)
      const user = userCredential.user

      await setDoc(doc(db, "trainees", user.uid), {
        uid: user.uid,
        fullName: form.fullName,
        email: form.email,
        phone: form.phone,
        trainingType: form.trainingType,
        trainingLocation: form.trainingLocation,
        registeredAt: new Date().toISOString()
      })

      router.push("/signup/training-selection")
    } catch (error) {
      console.error("Error creating trainee:", error)
    }
  }

  const handleGoogleSignIn = async () => {
    try {
      const provider = new GoogleAuthProvider()
      const result = await signInWithPopup(auth, provider)
      const user = result.user

      await setDoc(doc(db, "trainees", user.uid), {
        uid: user.uid,
        fullName: user.displayName || "",
        email: user.email || "",
        phone: "",
        trainingType: "",
        trainingLocation: "",
        registeredAt: new Date().toISOString()
      })

      router.push("/signup/training-selection")
    } catch (error) {
      console.error("Google sign-in error:", error)
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4 max-w-md mx-auto mt-10">
      <input
        type="text"
        name="fullName"
        placeholder="Full Name"
        value={form.fullName}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handleChange}
        required
        className="input"
      />
      <input
        type="tel"
        name="phone"
        placeholder="Phone Number"
        value={form.phone}
        onChange={handleChange}
        required
        className="input"
      />
      <select
        name="trainingType"
        value={form.trainingType}
        onChange={handleChange}
        required
        className="input"
      >
        <option value="">Select Training Type</option>
        <option value="Web Development">Web Development</option>
        <option value="Digital Marketing">Digital Marketing</option>
        <option value="Design">Design</option>
      </select>
      <select
        name="trainingLocation"
        value={form.trainingLocation}
        onChange={handleChange}
        required
        className="input"
      >
        <option value="">Select Location</option>
        <option value="Kigali">Kigali</option>
        <option value="Huye">Huye</option>
        <option value="Musanze">Musanze</option>
      </select>

      <button type="submit" className="btn">Register</button>
      <button type="button" onClick={handleGoogleSignIn} className="btn-secondary">
        Sign Up with Google
      </button>
    </form>
  )
}