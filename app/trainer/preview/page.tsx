"use client"

import { useState } from "react"

export default function TrainerPreviewPage() {
  const [view, setView] = useState<"demo" | "preview">("preview")

  return (
    <main className="min-h-screen p-8 bg-terracotta-50 text-gray-900">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-terracotta-700">
          {view === "preview" ? "🎯 Trainer Experience Demo" : "📣 Trainer Demo Panel"}
        </h1>
        <div className="space-x-2">
          <button
            onClick={() => setView("preview")}
            className={`px-4 py-2 rounded ${
              view === "preview"
                ? "bg-terracotta-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Preview
          </button>
          <button
            onClick={() => setView("demo")}
            className={`px-4 py-2 rounded ${
              view === "demo"
                ? "bg-terracotta-600 text-white"
                : "bg-white border text-gray-700"
            }`}
          >
            Demo Panel
          </button>
        </div>
      </div>

      {view === "preview" ? (
        <>
          <p className="mt-4 max-w-xl">
            This space showcases key functionality for trainers within the Goodlife platform. You can explore signup,
            dashboard layout, and navigation — all without authentication. Use this for pitching or feedback sessions.
          </p>

          <div className="mt-8 space-y-4">
            <a
              href="/signup/trainer"
              className="block px-6 py-3 bg-terracotta-600 text-white rounded hover:bg-terracotta-700"
            >
              Try Trainer Login Flow
            </a>
            <a
              href="/trainer/dashboard"
              className="block px-6 py-3 bg-gray-800 text-white rounded hover:bg-black"
            >
              View Trainer Dashboard
            </a>
          </div>
        </>
      ) : (
        <>
          <p className="mt-4 text-gray-700 max-w-xl">
            Welcome to a preview of the trainer dashboard. This view is unauthenticated and showcases the experience
            without needing a login. Ideal for demo environments or visual testing.
          </p>

          <div className="mt-6 space-y-3">
            <p className="text-gray-600">✅ Manage training programs</p>
            <p className="text-gray-600">✅ View trainee feedback</p>
            <p className="text-gray-600">✅ Track progress and goals</p>
          </div>

          <div className="mt-10">
            <a
              href="/signup/trainer"
              className="bg-terracotta-700 text-white px-5 py-3 rounded hover:bg-terracotta-800 transition"
            >
              Try as Trainer
            </a>
          </div>
        </>
      )}
    </main>
  )
}