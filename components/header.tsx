"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { useRouter, usePathname } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu"
import {
  Menu,
  X,
  Search,
  Globe,
  User2,
  ChevronDown,
} from "lucide-react"
import { useToast } from "@/components/ui/use-toast"
import { languages } from "@/lib/i18n"

export default function Header() {
  const router = useRouter()
  const pathname = usePathname()
  const isRegisterPage = pathname === "/register"

  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLangOpen, setIsLangOpen] = useState(false)
  const [language, setLanguage] = useState("EN")
  const [query, setQuery] = useState("")
  const { toast } = useToast()

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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

          {/* Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/#home"
                  className="px-4 py-2 text-gray-700 hover:text-terracotta-600 transition-colors"
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger className="px-4 py-2 text-gray-700 hover:text-terracotta-600">
                  Training Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="w-64 p-4 space-y-2">
                    <Link
                      href="/register"
                      className="block px-3 py-2 text-sm text-white font-semibold bg-green-700 hover:bg-green-800 rounded-md text-center"
                    >
                      📝 Register
                    </Link>
                    {[
                      "All Training Programs",
                      "Corporate Trainings",
                      "Leadership",
                      "Digital",
                      "Languages",
                      "Communication",
                    ].map((label, index) => (
                      <NavigationMenuLink
                        key={index}
                        href="/#programs"
                        className="block px-3 py-2 text-sm text-gray-700 font-medium hover:bg-terracotta-50 rounded-md"
                      >
                        {label}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {["about", "calendar", "testimonials", "contact"].map((section) => (
                <NavigationMenuItem key={section}>
                  <NavigationMenuLink
                    href={`/#${section}`}
                    className="px-4 py-2 text-gray-700 hover:text-terracotta-600 transition-colors"
                  >
                    {section.charAt(0).toUpperCase() + section.slice(1)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Right Side */}
          <div className="hidden md:flex items-center gap-4 relative">
            {/* Search Button with local group */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className="text-gray-600 hover:text-green-700"
              >
                <Search className="w-5 h-5" />
              </Button>
              <div className="absolute right-0 top-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search training topics..."
                  className="w-64 border rounded-md px-4 py-2 text-sm shadow-lg"
                />
              </div>
            </div>

            {/* Language Selector */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className="flex items-center gap-1 text-gray-600 hover:text-green-700"
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <Globe className="w-4 h-4" />
                {language}
                <ChevronDown className="w-4 h-4" />
              </Button>

              {isLangOpen && (
                <div className="absolute top-10 right-0 bg-white border shadow-md rounded-md z-50 w-32">
                  {Object.entries(languages).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code)
                        setIsLangOpen(false)
                        toast({
                          title: "Language Selected",
                          description: `You switched to ${label}`,
                        })
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 ${
                        language === code ? "text-emerald-700 font-semibold" : "text-gray-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Icon-Only My Account */}
            {!isRegisterPage && (
              <Link href="/login">
                <Button className="bg-green-700 hover:bg-green-800 text-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300">
                  <User2 className="w-5 h-5" />
                </Button>
              </Link>
            )}
          </div>

          {/* Mobile Toggle */}
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
                <Link href="/login">
                  <Button className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white rounded-full px-4 py-3 font-semibold">
                    👤
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