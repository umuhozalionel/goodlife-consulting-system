"use client"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Search } from "lucide-react"

export default function SearchPage() {
  const [query, setQuery] = useState("")

  return (
    <main className="min-h-screen bg-gradient-to-br from-gray-50 to-white py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Search Our Trainings</h1>
        <div className="relative mb-8">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <Input
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Type to search trainings, topics, or categories..."
            className="pl-10 py-6 text-base"
          />
        </div>

        {query.trim() === "" ? (
          <div className="text-gray-500 text-center mt-20">
            Start typing above to search. Results will appear here.
          </div>
        ) : (
          <div className="text-gray-700 font-medium">
            No results found for "<span className="font-semibold">{query}</span>"
          </div>
        )}
      </div>
    </main>
  )
}