"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import { Menu, X } from "lucide-react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isRegisterPage = pathname === "/register"

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/95 backdrop-blur-sm shadow-lg" : "bg-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg">G</span>
            </div>
            <div className="hidden sm:block">
              <h1 className="font-bold text-lg text-gray-900">Goodlife Consulting</h1>
              <p className="text-xs text-gray-600">Partners</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              {["home", "about", "calendar", "testimonials", "contact"].map((section) => (
                <NavigationMenuItem key={section}>
                  <NavigationMenuLink
                    href={`/#${section}`}
                    className="px-4 py-2 text-gray-700 hover:text-terracotta-600 transition-colors"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-gray-700 hover:text-terracotta-600">
                  Training Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 p-4 space-y-2">
                    {["All Training Programs", "Corporate Trainings", "Leadership", "Digital", "Languages", "Communication"].map(
                      (label, index) => (
                        <NavigationMenuLink
                          key={index}
                          href="/#programs"
                          className="block px-3 py-2 text-sm text-gray-700 font-medium hover:bg-terracotta-50 rounded-md"
                        >
                          {label}
                        </NavigationMenuLink>
                      )
                    )}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Register Now Button (Hides on /register) */}
          {!isRegisterPage && (
            <Link href="/register">
              <Button className="hidden md:flex bg-green-700 hover:bg-green-800 text-white rounded-full px-6 py-3 text-sm font-semibold shadow-md hover:shadow-lg transition-all duration-300">
                📝 Register Now
              </Button>
            </Link>
          )}

          {/* Mobile Menu Toggle */}
          <Button
            variant="ghost"
            size="icon"
            className="lg:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </Button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white border-t border-gray-200 py-4">
            <nav className="space-y-2">
              {["home", "about", "programs", "calendar", "testimonials", "contact"].map((section) => (
                <Link
                  key={section}
                  href={`/#${section}`}
                  className="block px-4 py-2 text-gray-700 hover:bg-terracotta-50 rounded-md"
                >
                  {section.charAt(0).toUpperCase() + section.slice(1)}
                </Link>
              ))}

              {!isRegisterPage && (
                <Link href="/register">
                  <Button className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white rounded-full px-4 py-3 font-semibold">
                    📝 Register Now
                  </Button>
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  )
}