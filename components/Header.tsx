// components/Header.tsx
"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import {
  Menu,
  X,
  Search,
  Globe,
  User2,
  ChevronDown,
} from "lucide-react";
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
  const router = useRouter();
  const pathname = usePathname();
  const isRegisterPage = pathname === "/signup/trainee";

  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLangOpen, setIsLangOpen] = useState(false);
  const [language, setLanguage] = useState("EN");
  const [query, setQuery] = useState("");
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const textColor = isScrolled ? "text-gray-900" : "text-white";
  const hoverColor = isScrolled
    ? "hover:text-terracotta-600"
    : "hover:text-terracotta-400";

  const dropdownBg = "bg-white";
  const dropdownBorder = "border-gray-200";
  const dropdownTextDefault = "text-gray-900";
  const dropdownTextHover = "hover:text-terracotta-600";
  const dropdownHoverBg = "hover:bg-gray-100";

  const handleAuthChoice = (path: string) => {
    setAuthModalOpen(false);
    router.push(path);
  };

  useEffect(() => {
    if (!authModalOpen) return;
    const onEsc = (e: KeyboardEvent) => {
      if (e.key === "Escape") handleAuthChoice("/");
    };
    window.addEventListener("keydown", onEsc);
    return () => window.removeEventListener("keydown", onEsc);
  }, [authModalOpen]);

  return (
    <header
      className={`fixed top-0 w-full z-50 transition-all duration-300 ${
        isScrolled ? "bg-white/80 backdrop-blur-sm shadow-lg" : "bg-black/50"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-4">
            <div className="w-10 h-10 bg-gradient-to-br from-terracotta-500 to-forest-500 rounded-xl flex items-center justify-center">
              <span className="text-white font-bold text-lg drop-shadow-sm">
                G
              </span>
            </div>
            <div className="hidden sm:block">
              <h1 className={`${textColor} font-bold text-lg drop-shadow-sm`}>
                Goodlife Consulting
              </h1>
              <p className={`${textColor} text-xs drop-shadow-sm`}>Partners</p>
            </div>
          </Link>

          {/* Desktop Navigation */}
          <NavigationMenu className="hidden lg:flex">
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/#home"
                  className={`${textColor} ${hoverColor} px-4 py-2 transition-colors`}
                >
                  Home
                </NavigationMenuLink>
              </NavigationMenuItem>

              <NavigationMenuItem>
                <NavigationMenuTrigger
                  className={`${textColor} ${hoverColor} px-4 py-2 bg-transparent hover:bg-transparent transition-colors`}
                >
                  Training Programs
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div
                    className={`w-64 p-4 space-y-2 ${dropdownBg} border ${dropdownBorder} rounded-md`}
                  >
                    {trainingItems.map((item) => (
                      <NavigationMenuLink
                        key={item.href}
                        href={item.href}
                        className={`block px-3 py-2 text-sm ${dropdownTextDefault} ${dropdownTextHover} ${dropdownHoverBg} rounded-md transition-colors`}
                      >
                        {item.name}
                      </NavigationMenuLink>
                    ))}
                  </div>
                </NavigationMenuContent>
              </NavigationMenuItem>

              {["about", "calendar", "testimonials", "contact"].map((sec) => (
                <NavigationMenuItem key={sec}>
                  <NavigationMenuLink
                    href={`/#${sec}`}
                    className={`${textColor} ${hoverColor} px-4 py-2 transition-colors`}
                  >
                    {sec.charAt(0).toUpperCase() + sec.slice(1)}
                  </NavigationMenuLink>
                </NavigationMenuItem>
              ))}
            </NavigationMenuList>
          </NavigationMenu>

          {/* Desktop Right Side */}
          <div className="hidden md:flex items-center gap-4 relative">
            {/* Search */}
            <div className="relative group">
              <Button
                variant="ghost"
                size="icon"
                className={`${textColor} ${hoverColor}`}
              >
                <Search className="w-5 h-5 drop-shadow-sm" />
              </Button>
              <div className="absolute right-0 top-12 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-all duration-300 z-50">
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search training topics…"
                  className="w-64 border rounded-md px-4 py-2 text-sm shadow-lg"
                />
              </div>
            </div>

            {/* Language */}
            <div className="relative">
              <Button
                variant="ghost"
                size="sm"
                className={`flex items-center gap-1 ${textColor} ${hoverColor}`}
                onClick={() => setIsLangOpen(!isLangOpen)}
              >
                <Globe className="w-4 h-4 drop-shadow-sm" />
                {language}
                <ChevronDown className="w-4 h-4 drop-shadow-sm" />
              </Button>
              {isLangOpen && (
                <div className="absolute top-10 right-0 bg-white border shadow-md rounded-md z-50 w-32">
                  {Object.entries(languages).map(([code, label]) => (
                    <button
                      key={code}
                      onClick={() => {
                        setLanguage(code);
                        setIsLangOpen(false);
                        toast({
                          title: "Language Selected",
                          description: `Switched to ${label}`,
                        });
                      }}
                      className={`w-full text-left px-4 py-2 text-sm hover:bg-emerald-50 ${
                        language === code
                          ? "text-emerald-700 font-semibold"
                          : "text-gray-700"
                      }`}
                    >
                      {label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Auth Choice */}
            {!isRegisterPage && (
              <Button
                className="bg-green-700 hover:bg-green-800 text-white rounded-full p-2 shadow-md hover:shadow-lg transition-all duration-300"
                onClick={() => setAuthModalOpen(true)}
              >
                <User2 className="w-5 h-5" />
              </Button>
            )}
          </div>

          {/* Mobile Toggle (hidden on lg+) */}
          <Button
            variant="ghost"
            size="icon"
            className={`${textColor} lg:hidden`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 drop-shadow-sm" />
            ) : (
              <Menu className="h-6 w-6 drop-shadow-sm" />
            )}
          </Button>
        </div>

        {/* Auth Modal */}
        {authModalOpen && (
          <div className="fixed inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center z-[100]">
            <div className="relative w-full max-w-xs rounded-lg overflow-hidden">
              <img
                src="/images/Auth.jpg"
                alt="Auth background"
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="relative bg-white/70 backdrop-blur-md p-6 space-y-4 text-center">
                <h2 className="text-xl font-semibold">Continue with</h2>
                <Button
                  onClick={() => handleAuthChoice("/auth?mode=signup")}
                  className="w-full"
                >
                  Sign Up
                </Button>
                <Button
                  onClick={() => handleAuthChoice("/auth?mode=signin")}
                  className="w-full"
                >
                  Sign In
                </Button>
                <Button
                  onClick={() => handleAuthChoice("/")}
                  className="w-full mt-2 bg-gray-200 hover:bg-gray-300 text-gray-800"
                >
                  Back Home
                </Button>
              </div>
            </div>
          </div>
        )}

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-black/50 border-t border-gray-700 py-4">
            <nav className="space-y-2">
              {[
                "home",
                "about",
                "programs",
                "calendar",
                "testimonials",
                "contact",
              ].map((sec) => (
                <Link
                  key={sec}
                  href={`/#${sec}`}
                  className={`${textColor} ${hoverColor} block px-4 py-2 rounded-md transition-colors`}
                >
                  {sec.charAt(0).toUpperCase() + sec.slice(1)}
                </Link>
              ))}
              {!isRegisterPage && (
                <Button
                  onClick={() => setAuthModalOpen(true)}
                  className="w-full mt-4 bg-green-700 hover:bg-green-800 text-white rounded-full px-4 py-3 font-semibold"
                >
                  👤 Account
                </Button>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}