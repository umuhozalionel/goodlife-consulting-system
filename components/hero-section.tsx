import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Calendar, ImageIcon } from "lucide-react"

export default function HeroSection() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background Image with Gradient Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: `linear-gradient(
            rgba(0, 0, 0, 0.4),
            rgba(0, 0, 0, 0.4)
          ), url('/Images/landing-header.jpg')`,
        }}
      />

      {/* Rwandan Pattern Overlay */}
      <div className="absolute inset-0 opacity-10">
        <div
          className="w-full h-full"
          style={{
            backgroundImage: `repeating-linear-gradient(
              45deg,
              transparent,
              transparent 10px,
              rgba(210, 105, 30, 0.1) 10px,
              rgba(210, 105, 30, 0.1) 20px
            )`,
          }}
        />
      </div>

      {/* Hero Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
          Empowering Rwanda's
          <span className="block text-terracotta-400">Future Leaders</span>
        </h1>
        <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto">
          Professional growth through purpose-driven training.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          {/* Calendar */}
          <Link href="/calendar">
            <Button
              size="lg"
              className="bg-terracotta-600 hover:bg-terracotta-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <Calendar className="mr-2 h-5 w-5" />
              View Training Calendar
            </Button>
          </Link>

          {/* Gallery */}
          <Link href="/gallery">
            <Button
              size="lg"
              className="bg-gradient-to-br from-green-600 to-terracotta-600 hover:from-green-700 hover:to-terracotta-700 text-white rounded-full px-8 py-4 text-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <ImageIcon className="mr-2 h-5 w-5" />
              View Gallery
            </Button>
          </Link>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
          <div className="w-1 h-3 bg-white rounded-full mt-2 animate-pulse" />
        </div>
      </div>
    </section>
  )
}