// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuList,
  NavigationMenuLink,
} from "@/components/ui/navigation-menu";
import { Menu, X, Globe, Search, ChevronDown } from "lucide-react";
import { useToast } from "@/components/ui/use-toast";
import { languages } from "@/lib/i18n";

const trainingItems = [
  { name: "Leadership & Management", href: "/training/leadership" },
  { name: "Corporate Trainings", href: "/training/corporate" },
  { name: "Digital & Innovation", href: "/training/digital" },
  { name: "Communication & Personal Growth", href: "/training/communication" },
  { name: "Languages & Social Impact", href: "/training/languages" },
];

export default function Header() {
  const { toast } = useToast();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [query, setQuery] = useState("");

  // toggle scrolled state
  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // before scroll: dark-blue bg inside layout
  // after scroll: fixed white bg + shadow
  const containerClasses = isScrolled
    ? "fixed top-0 left-1/2 transform -translate-x-1/2 w-full max-w-screen-xl bg-white shadow-sm"
    : "relative mx-auto w-full max-w-screen-xl bg-[#0a1932]";

  const textColor = isScrolled ? "text-gray-900" : "text-white";
  const hoverColor = isScrolled ? "hover:text-terracotta-600" : "hover:text-gray-200";

  return (
    <header
      className={`
        ${containerClasses}
        z-50
        px-6 sm:px-12
        transition-all duration-300
      `}
    >
      <div className="flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img src="/images/logo.png" alt="Goodlife Logo" className="w-10 h-10 object-contain" />
          <span className={`${textColor} font-bold text-lg`}>Goodlife</span>
        </Link>

        {/* Desktop Navigation */}
        <NavigationMenu className="hidden lg:flex">
          <NavigationMenuList className="flex items-center space-x-6">
            <NavigationMenuItem>
              <NavigationMenuTrigger
                className={`
                  ${textColor} ${hoverColor}
                  bg-transparent hover:bg-transparent
                  flex items-center gap-1 text-sm font-medium transition
                `}
              >
                Training Programs
                <ChevronDown className="w-4 h-4" />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="w-64 p-4 bg-white border border-gray-200 rounded-md space-y-2">
                  {trainingItems.map((item) => (
                    <NavigationMenuLink
                      key={item.href}
                      href={item.href}
                      className="block px-3 py-2 text-sm text-gray-900 hover:text-terracotta-600 hover:bg-gray-100 rounded-md transition"
                    >
                      {item.name}
                    </NavigationMenuLink>
                  ))}
                </div>
              </NavigationMenuContent>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#testimonials"
                className={`${textColor} ${hoverColor} text-sm font-medium transition`}
              >
                Insights
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#about"
                className={`${textColor} ${hoverColor} text-sm font-medium transition`}
              >
                Our Story
              </NavigationMenuLink>
            </NavigationMenuItem>

            <NavigationMenuItem>
              <NavigationMenuLink
                href="/#contact"
                className={`${textColor} ${hoverColor} text-sm font-medium transition`}
              >
                Contact
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        {/* Right-side controls */}
        <div className="hidden md:flex items-center space-x-4">
          {/* Search */}
          <div className="relative group">
            <Button variant="ghost" size="icon" className={`${textColor} ${hoverColor}`}>
              <Search className="w-5 h-5" />
            </Button>
            <div className="absolute right-0 top-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition duration-300 z-50">
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search topics…"
                className="w-64 border rounded-md px-4 py-2"
              />
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 ${textColor} ${hoverColor}`}
              onClick={() => setLangOpen(!langOpen)}
            >
              <Globe className="w-4 h-4" />
              {language}
            </Button>
            {langOpen && (
              <div className="absolute top-10 right-0 bg-white border shadow-md rounded-md z-50 w-32">
                {Object.entries(languages).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code);
                      setLangOpen(false);
                      toast({ title: "Language Selected", description: `Switched to ${label}` });
                    }}
                    className={`w-full px-4 py-2 text-sm text-left hover:bg-emerald-50 ${
                      language === code ? "text-emerald-700 font-semibold" : "text-gray-700"
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book a Call */}
          <Link href="/#book-call">
            <Button
              size="sm"
              className="bg-white text-black hover:bg-gray-100 border border-gray-300 text-sm font-medium"
            >
              Book a Call
            </Button>
          </Link>
        </div>

        {/* Mobile Toggle */}
        <Button
          variant="ghost"
          size="icon"
          className={`${textColor} lg:hidden`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu (dropdown removed) */}
      {mobileOpen && (
        <div className="lg:hidden bg-white border-t border-gray-200 shadow-lg">
          <nav className="p-4 space-y-2">
            <Link
              href="/training"
              className="block px-4 py-2 text-gray-900 hover:text-terracotta-600 transition"
            >
              Training Programs
            </Link>

            <Link
              href="/#testimonials"
              className="block px-4 py-2 text-gray-900 hover:text-terracotta-600 transition"
            >
              Insights
            </Link>

            <Link
              href="/#about"
              className="block px-4 py-2 text-gray-900 hover:text-terracotta-600 transition"
            >
              Our Story
            </Link>

            <Link
              href="/#contact"
              className="block px-4 py-2 text-gray-900 hover:text-terracotta-600 transition"
            >
              Contact
            </Link>

            <Link href="/#book-call">
              <Button className="w-full bg-white text-black hover:bg-gray-100 border border-gray-300 px-4 py-2 font-medium">
                Book a Call
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}