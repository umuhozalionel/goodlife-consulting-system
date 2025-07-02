import RegistrationForm from "./registration-form"

export default function RegisterPage() {
  return (
    <div className="min-h-screen py-12 px-6 bg-gradient-to-br from-green-100 via-white to-terracotta-100">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-6 text-center text-terracotta-700">
          Register for a Goodlife Training
        </h1>
        <RegistrationForm />
      </div>
    </div>
  )
}