// components/Header.tsx
'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Menu, X, Search, ChevronDown, GraduationCap, Building2, Users, Home as HomeIcon } from 'lucide-react'
import { useToast } from '@/components/ui/use-toast'

// Defined colors for secondary navigation elements (using approved, non-primary-conflicting Tailwind colors)
const CategoryColors = {
  Home: 'from-gray-500 to-gray-700', // Neutral
  Counselling: 'from-emerald-600 to-teal-500', // Different from Primary, but related
  Corporate: 'from-indigo-600 to-blue-500', 
  Professional: 'from-amber-600 to-orange-500',
}

export default function Header() {
  const { toast } = useToast()
  const [isScrolled, setIsScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const [query, setQuery] = useState('')
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null)

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 10)
    window.addEventListener('scroll', onScroll)
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  const categories = [
    {
      label: 'Home',
      icon: HomeIcon,
      href: '/',
      color: CategoryColors.Home,
    },
    {
      label: 'Counselling Services',
      icon: Users,
      href: '/counselling',
      color: CategoryColors.Counselling,
      subLinks: [
        { label: 'Individual Counselling', href: '/counselling/individual' },
        { label: 'Group Sessions', href: '/counselling/group' },
        { label: 'Career Guidance', href: '/counselling/career' },
      ]
    },
    {
      label: 'Corporate Solutions',
      icon: Building2,
      href: '/corporate-trainings',
      color: CategoryColors.Corporate,
      subLinks: [
        { label: 'Team Training', href: '/corporate/team-training' },
        { label: 'Leadership Development', href: '/corporate/leadership' },
        { label: 'Organizational Growth', href: '/corporate/growth' },
      ]
    },
    {
      label: 'Professional Programs',
      icon: GraduationCap,
      href: '/programs',
      color: CategoryColors.Professional,
      subLinks: [
        { label: 'All Programs', href: '/programs' },
        { label: 'Internships', href: '/programs/internships' },
        { label: 'Certifications', href: '/programs/certifications' },
      ]
    },
  ]

  return (
    <>
      {/* Gradient Accent Bar - Now uses 'primary' and 'primary-light' */}
      <div className="h-1 bg-gradient-to-r from-primary via-primary-light to-primary"></div>

      {/* Main Header */}
      <header className={`sticky top-0 w-full z-50 bg-surface transition-all duration-300 ${isScrolled ? 'shadow-lg' : 'shadow-sm'}`}>
        <div className="max-w-[1400px] mx-auto">
          {/* Top Section */}
          <div className="flex items-center justify-between px-6 md:px-8 lg:px-12 py-4 md:py-5">
            {/* Logo with Tagline */}
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <Image
                  src="/images/logo.png"
                  alt="Goodlife Consulting Partners"
                  width={150}
                  height={50}
                  className="h-11 w-auto transition-transform group-hover:scale-105"
                  priority
                />
              </div>
              <div className="hidden lg:block border-l border-gray-300 pl-3">
                <p className="text-xs font-medium text-gray-600">Transform Your Future</p>
              </div>
            </Link>

            {/* Center - Enhanced Search */}
            <div className="hidden md:flex items-center flex-1 max-w-2xl mx-8">
              <div className="relative w-full group">
                {/* Search Hover Effect - Uses 'primary' */}
                <div className="absolute inset-0 bg-primary/10 rounded-full opacity-0 group-hover:opacity-100 transition-opacity blur-xl"></div>
                <Input
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Explore programs, counselling, corporate training..."
                  // Input Border/Focus - Uses 'primary'
                  className="relative w-full h-12 pl-5 pr-14 rounded-full border-2 border-gray-200 focus:border-primary focus:ring-2 focus:ring-primary/20 transition-all text-sm"
                />
                <Button
                  size="icon"
                  // Search Button Gradient - Uses 'primary' and derived hover color
                  className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground shadow-md"
                  onClick={() =>
                    toast({
                      title: '🔍 Search Coming Soon',
                      description: 'Advanced search functionality launching soon!',
                    })
                  }
                >
                  <Search className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Right - CTA Buttons */}
            <div className="hidden md:flex items-center space-x-3">
              <Link href="/login">
                <Button variant="ghost" className="font-medium text-primary hover:text-primary-light hover:bg-primary/5">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button 
                  // CTA Button Gradient - Uses 'primary' and 'primary-light'
                  className="relative overflow-hidden group bg-gradient-to-r from-primary to-primary-light hover:from-primary-light hover:to-primary text-primary-foreground font-medium px-6 shadow-md hover:shadow-lg transition-all"
                >
                  <span className="relative z-10">Get Started Free</span>
                  <div className="absolute inset-0 bg-white/20 translate-y-full group-hover:translate-y-0 transition-transform"></div>
                </Button>
              </Link>
            </div>

            {/* Mobile Menu Button - Hover uses 'primary' */}
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-primary transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

          {/* Category Navigation - Desktop */}
          <div className="hidden md:block border-t border-gray-100">
            <nav className="px-6 md:px-8 lg:px-12">
              <div className="flex items-center space-x-1">
                {categories.map((category) => {
                  const Icon = category.icon
                  const hasSubLinks = category.subLinks && category.subLinks.length > 0
                  
                  return (
                    <div
                      key={category.label}
                      className="relative"
                      onMouseEnter={() => hasSubLinks && setActiveDropdown(category.label)}
                      onMouseLeave={() => setActiveDropdown(null)}
                    >
                      <Link
                        href={category.href}
                        // Link Hover/Text - Uses 'primary'
                        className="flex items-center space-x-2 px-4 py-4 text-sm font-medium text-gray-700 hover:text-primary transition-colors group relative"
                      >
                        {/* Background Hover Effect - Uses Category's specific color */}
                        <div className={`p-1.5 rounded-lg bg-gradient-to-br ${category.color} opacity-0 group-hover:opacity-10 transition-opacity absolute inset-0`}></div>
                        <Icon className="w-4 h-4 relative z-10" />
                        <span className="relative z-10">{category.label}</span>
                        {hasSubLinks && <ChevronDown className="w-3.5 h-3.5 relative z-10" />}
                      </Link>

                      {/* Dropdown Menu */}
                      {hasSubLinks && activeDropdown === category.label && (
                        <motion.div
                          initial={{ opacity: 0, y: -10 }}
                          animate={{ opacity: 1, y: 0 }}
                          className="absolute top-full left-0 mt-1 w-64 bg-surface rounded-lg shadow-xl border border-gray-100 py-2 z-50"
                        >
                          {category.subLinks?.map((link) => (
                            <Link
                              key={link.label}
                              href={link.href}
                              // Sublink Hover - Uses 'primary'
                              className="block px-4 py-2.5 text-sm text-gray-700 hover:bg-primary/5 hover:to-transparent hover:text-primary transition-all"
                            >
                              {link.label}
                            </Link>
                          ))}
                        </motion.div>
                      )}
                    </div>
                  )
                })}
              </div>
            </nav>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {mobileOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="md:hidden bg-gradient-to-b from-gray-50 to-white border-t border-gray-200"
            >
              <div className="px-6 py-5 space-y-4 max-h-[80vh] overflow-y-auto">
                {/* Mobile Search */}
                <div className="relative">
                  <Input
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search..."
                    // Input Border/Focus - Uses 'primary'
                    className="w-full h-12 pl-5 pr-14 rounded-full border-2 border-gray-200 focus:border-primary"
                  />
                  <Button
                    size="icon"
                    // Search Button Gradient - Uses 'primary'
                    className="absolute right-1.5 top-1/2 -translate-y-1/2 h-9 w-9 rounded-full bg-gradient-to-br from-primary to-primary-light text-primary-foreground"
                    onClick={() => {
                      toast({
                        title: '🔍 Search Coming Soon',
                        description: 'Search launching soon!',
                      })
                      setMobileOpen(false)
                    }}
                  >
                    <Search className="w-4 h-4" />
                  </Button>
                </div>

                {/* Mobile Categories */}
                <div className="space-y-2">
                  {categories.map((category) => {
                    const Icon = category.icon
                    return (
                      <div key={category.label} className="space-y-1">
                        <Link
                          href={category.href}
                          onClick={() => setMobileOpen(false)}
                          // Link Background - Uses Category's specific color
                          className={`flex items-center space-x-3 p-3 rounded-lg bg-gradient-to-br ${category.color} bg-opacity-5 hover:bg-opacity-10 transition-all`}
                        >
                          {/* Icon Background - Uses Category's specific color */}
                          <div className={`p-2 rounded-lg bg-gradient-to-br ${category.color} text-white`}>
                            <Icon className="w-4 h-4" />
                          </div>
                          <span className="font-medium text-gray-800">{category.label}</span>
                        </Link>
                        
                        {category.subLinks && (
                          <div className="pl-12 space-y-1">
                            {category.subLinks.map((link) => (
                              <Link
                                key={link.label}
                                href={link.href}
                                onClick={() => setMobileOpen(false)}
                                // Sublink Hover - Uses 'primary'
                                className="block py-2 text-sm text-gray-600 hover:text-primary"
                              >
                                {link.label}
                              </Link>
                            ))}
                          </div>
                        )}
                      </div>
                    )
                  })}
                </div>

                {/* Mobile Auth */}
                <div className="pt-4 border-t border-gray-200 space-y-3">
                  <Link href="/login" onClick={() => setMobileOpen(false)}>
                    <Button 
                      variant="outline" 
                      // Sign In Button - Uses 'primary'
                      className="w-full h-12 border-2 border-primary text-primary hover:bg-primary/5 font-medium"
                    >
                      Sign In
                    </Button>
                  </Link>
                  <Link href="/signup" onClick={() => setMobileOpen(false)}>
                    <Button 
                      // Get Started Button - Uses 'primary' and 'primary-light'
                      className="w-full h-12 bg-gradient-to-r from-primary to-primary-light text-primary-foreground font-medium shadow-md"
                    >
                      Get Started Free
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </header>
    </>
  )
}