// components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuLink,
} from '@/components/ui/navigation-menu'
import { Menu, X, Globe, Search, Phone } from 'lucide-react'
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
    'fixed top-0 left-0 w-full z-50 bg-white/95 backdrop-blur-sm transition-colors duration-300 border-b border-gray-100',
    isScrolled ? 'shadow-sm' : '',
  ].join(' ')
  
  const navText = 'text-[#383f41]'
  const navHover = 'hover:text-[#1b6981]'

  return (
    <header className={headerClasses}>
      <div className="max-w-full mx-auto">
        <div className="flex items-center justify-between px-6 md:px-8 lg:px-12 py-4">
          {/* Logo - Left Edge */}
          <Link href="/" className="flex items-center">
            <Image 
              src="/images/logo.png" 
              alt="Goodlife Consulting Partners" 
              width={120} 
              height={40} 
              className="h-10 w-auto"
            />
          </Link>

          {/* Desktop Navigation - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <Link href="/#about" className={`font-medium transition ${navText} ${navHover}`}>
              Our Story
            </Link>
            <Link href="/programs" className={`font-medium transition ${navText} ${navHover}`}>
              Our Programs
            </Link>
            <Link href="/#testimonials" className={`font-medium transition ${navText} ${navHover}`}>
              Insights
            </Link>
            <Link href="/#contact" className={`font-medium transition ${navText} ${navHover}`}>
              Contact
            </Link>
          </div>

          {/* Desktop Actions - Right Edge */}
          <div className="hidden md:flex items-center space-x-4">
            {/* Search */}
            <button
              onClick={() => toast({
                title: "Search Coming Soon",
                description: "Search functionality will be available soon"
              })}
              className={`p-2 transition ${navText} ${navHover}`}
              aria-label="Search"
            >
              <Search className="w-5 h-5" />
            </button>

            {/* Language */}
            <div className="relative">
              <button 
                className={`flex items-center space-x-1 p-2 transition ${navText} ${navHover}`}
                onClick={() => setLangOpen(!langOpen)}
              >
                <Globe className="w-5 h-5" />
                <span className="font-medium">{language}</span>
              </button>
              
              <AnimatePresence>
                {langOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute top-12 right-0 w-32 bg-white border border-gray-200 shadow-lg rounded-md z-50"
                  >
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
                        className={`block w-full px-4 py-2 text-left text-sm hover:bg-gray-50 ${
                          language === code ? 'text-[#1b6981] font-semibold' : 'text-[#383f41]'
                        }`}
                      >
                        {label}
                      </button>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Book a Call */}
            <motion.a
              href="https://wa.me/250788845062"
              target="_blank"
              rel="noopener noreferrer"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center space-x-2 p-2 transition font-medium ${navText} ${navHover}`}
            >
              <Phone className="w-5 h-5" />
              <span>Book a Call</span>
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden p-2 transition text-[#383f41] hover:text-[#1b6981]"
            aria-label="Menu"
          >
            {mobileOpen ? (
              <X className="w-6 h-6" />
            ) : (
              <Menu className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-white border-t border-gray-200"
            >
              <div className="px-6 py-4 space-y-4">
                {/* Language Selector */}
                <select
                  value={language}
                  onChange={(e) => {
                    setLanguage(e.target.value as 'EN' | 'FR' | 'RW')
                    toast({
                      title: 'Language Selected',
                      description: `Switched to ${languages[e.target.value]}`,
                    })
                  }}
                  className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-[#1b6981] text-[#383f41]"
                >
                  <option value="EN">English</option>
                  <option value="FR">Français</option>
                  <option value="RW">Kinyarwanda</option>
                </select>

                {/* Navigation Links */}
                <Link
                  href="/#about"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-medium transition hover:text-[#1b6981] text-[#383f41]"
                >
                  Our Story
                </Link>
                <Link
                  href="/programs"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-medium transition hover:text-[#1b6981] text-[#383f41]"
                >
                  Our Programs
                </Link>
                <Link
                  href="/#testimonials"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-medium transition hover:text-[#1b6981] text-[#383f41]"
                >
                  Insights
                </Link>
                <Link
                  href="/#contact"
                  onClick={() => setMobileOpen(false)}
                  className="block py-2 font-medium transition hover:text-[#1b6981] text-[#383f41]"
                >
                  Contact
                </Link>

                {/* Book a Call */}
                <motion.a
                  href="https://wa.me/250788845062"
                  target="_blank"
                  rel="noopener noreferrer"
                  whileTap={{ scale: 0.95 }}
                  className="w-full flex items-center justify-center space-x-2 p-2 transition hover:text-[#1b6981] text-[#383f41] font-medium"
                  onClick={() => setMobileOpen(false)}
                >
                  <Phone className="w-4 h-4" />
                  <span>Book a Call</span>
                </motion.a>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </header>
  )
}