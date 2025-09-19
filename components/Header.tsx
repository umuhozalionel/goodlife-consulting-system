// components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Menu, X, Globe, Search } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'
import { languages } from '@/lib/i18n'

export default function Header() {
  const { toast } = useToast()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [langOpen, setLangOpen] = useState(false)
  const [language, setLanguage] = useState<'EN' | 'FR' | 'RW'>('EN')
  const [query, setQuery] = useState('')

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const headerClasses = [
    'fixed top-0 left-0 w-full z-50 bg-white transition-colors duration-300',
    isScrolled ? 'bg-opacity-80 backdrop-blur-sm shadow-sm' : '',
  ].join(' ')

  const navText = 'text-gray-900'
  const navHover = 'hover:text-blue-600'

  return (
    <header className={headerClasses}>
      <div className="mx-auto max-w-screen-xl px-6 sm:px-12 flex items-center justify-between h-16">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-3">
          <img
            src="/images/logo.png"
            alt="Goodlife Logo"
            className="w-10 h-10 object-contain"
          />
          <span className={`font-bold text-lg ${navText}`}>
            Goodlife Consulting Partners
          </span>
        </Link>

        {/* Desktop Nav & Controls (≥768px) */}
        <div className="hidden md:flex items-center space-x-6">
          <NavigationMenu>
            <NavigationMenuList className="flex items-center space-x-6">
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/#about"
                  className={`text-sm font-medium transition ${navText} ${navHover}`}
                >
                  Our Story
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/programs"
                  className={`text-sm font-medium transition ${navText} ${navHover}`}
                >
                  Our Programs
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/#testimonials"
                  className={`text-sm font-medium transition ${navText} ${navHover}`}
                >
                  Insights
                </NavigationMenuLink>
              </NavigationMenuItem>
              <NavigationMenuItem>
                <NavigationMenuLink
                  href="/#contact"
                  className={`text-sm font-medium transition ${navText} ${navHover}`}
                >
                  Contact
                </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {/* Search */}
          <div className="relative group">
            <Button variant="ghost" size="icon" className={`${navText} ${navHover}`}>
              <Search className="w-5 h-5" />
            </Button>
            <div className="absolute right-0 top-12 w-64 rounded border bg-white p-2 opacity-0 invisible group-hover:visible group-hover:opacity-100 transition-opacity duration-300 z-50">
              <Input
                value={query}
                onChange={e => setQuery(e.target.value)}
                placeholder="Search topics…"
                className="w-full"
              />
            </div>
          </div>

          {/* Language Selector */}
          <div className="relative">
            <Button
              variant="ghost"
              size="sm"
              className={`flex items-center gap-1 transition ${navText} ${navHover}`}
              onClick={() => setLangOpen(!langOpen)}
            >
              <Globe className="w-4 h-4" />
              {language}
            </Button>
            {langOpen && (
              <div className="absolute top-10 right-0 w-32 bg-white border shadow-md rounded-md z-50">
                {Object.entries(languages).map(([code, label]) => (
                  <button
                    key={code}
                    onClick={() => {
                      setLanguage(code as 'EN' | 'FR' | 'RW')
                      setLangOpen(false)
                      toast({
                        title: 'Language Selected',
                        description: `Switched to ${label}`,
                      })
                    }}
                    className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-100 ${
                      language === code ? 'text-blue-600 font-semibold' : 'text-gray-700'
                    }`}
                  >
                    {label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Book a Call */}
          <a
            href="https://wa.me/250788845062"
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button
              size="sm"
              className="bg-blue-600 text-white border border-blue-600 hover:bg-white hover:text-blue-600 px-4 py-2 text-sm font-medium"
            >
              Book a Call
            </Button>
          </a>
        </div>

        {/* Mobile Toggle (<768px) */}
        <Button
          variant="ghost"
          size="icon"
          className={`md:hidden transition ${navText} ${navHover}`}
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </Button>
      </div>

      {/* Mobile Menu (<768px): slide down/up */}
      <div
        className={`
          md:hidden
          bg-white border-t border-gray-200 shadow-lg
          overflow-hidden
          transition-[max-height] duration-300 ease-in-out
          ${mobileOpen ? 'max-h-[400px] py-4' : 'max-h-0'}
        `}
      >
        <nav className="px-6 space-y-4">
          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500" />
            <Input
              value={query}
              onChange={e => setQuery(e.target.value)}
              placeholder="Search topics…"
              className="pl-10 pr-4 py-2 w-full rounded-md border border-gray-300 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          {/* Language Selector (mobile) */}
          <div>
            <select
              aria-label="Select language"
              className="w-full border border-gray-300 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={language}
              onChange={e => {
                setLanguage(e.target.value as 'EN' | 'FR' | 'RW')
                toast({
                  title: 'Language Selected',
                  description: `Switched to ${languages[e.target.value]}`,
                })
              }}
            >
              <option value="EN">English</option>
              <option value="FR">Français</option>
              <option value="RW">Kinyarwanda</option>
            </select>
          </div>

          {/* Links */}
          <Link
            href="/#about"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-900 hover:text-blue-600 transition"
          >
            Our Story
          </Link>
          <Link
            href="/programs"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-900 hover:text-blue-600 transition"
          >
            Our Programs
          </Link>
          <Link
            href="/#testimonials"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-900 hover:text-blue-600 transition"
          >
            Insights
          </Link>
          <Link
            href="/#contact"
            onClick={() => setMobileOpen(false)}
            className="block text-gray-900 hover:text-blue-600 transition"
          >
            Contact
          </Link>

          {/* Book a Call */}
          <a
            href="https://wa.me/250788845062"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => setMobileOpen(false)}
          >
            <Button className="w-full bg-blue-600 text-white border border-blue-600 hover:bg-white hover:text-blue-600 px-4 py-2 font-medium">
              Book a Call
            </Button>
          </a>
        </nav>
      </div>
    </header>
  )
}