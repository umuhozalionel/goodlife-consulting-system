import Header from "@/components/Header"
import RegistrationForm from "./registration-form"

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