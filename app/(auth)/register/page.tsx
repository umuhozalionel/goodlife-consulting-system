"use client"

import { Header, RegistrationForm } from "@/components"

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <div className="pt-24">
        <RegistrationForm />
      </div>
    </div>
  )
}