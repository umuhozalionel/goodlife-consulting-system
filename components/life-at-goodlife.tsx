"use client"

import Image from "next/image"
import { useState } from "react"

export default function LifeAtGoodlife() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null)

  return (
    <section
      id="life"
      className="bg-gradient-to-b from-white via-gray-50 to-white py-24 px-4"
    >
      <div className="max-w-6xl mx-auto fade-in-up text-center space-y-6">
        {/* Section Heading */}
        <h2 className="text-4xl font-bold text-gray-800">Life at Goodlife</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          A glimpse into our culture, energy, and community—where growth happens every day.
        </p>

        {/* Image Grid */}
        <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="rounded-xl overflow-hidden shadow-md cursor-pointer transform transition-transform hover:scale-105"
              onClick={() => setSelectedImage(`/images/life-${num}.jpg`)}
            >
              <Image
                src={`/images/life-${num}.jpg`}
                alt={`Life at Goodlife ${num}`}
                width={600}
                height={400}
                className="object-cover w-full h-60"
              />
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50"
          onClick={() => setSelectedImage(null)}
        >
          <Image
            src={selectedImage}
            alt="Zoomed view"
            width={1000}
            height={700}
            className="rounded-lg shadow-xl max-h-[90vh] object-contain"
          />
        </div>
      )}
    </section>
  )
}