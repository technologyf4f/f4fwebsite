"use client"
import type { ReactNode } from "react"
import Image from "next/image"
import Link from "next/link"
import { useState, useEffect } from "react"

import { LoginDialog } from "@/components/login-dialog"
import { BlogManagementDialog } from "@/components/blog-management-dialog"
import { EventManagementDialog } from "@/components/event-management-dialog"
import { getEvents } from "@/lib/events-api"
import { getBlogs } from "@/lib/blogs-api"
import { isSupabaseConfigured } from "@/lib/supabase"
import { SupabaseSetupGuide } from "@/components/supabase-setup-guide"

// Inline UI Components
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  ...props
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  type?: "button" | "submit"
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-md font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background"

  const variants = {
    default: "bg-primary text-primary-foreground hover:bg-primary/90",
    outline: "border border-input hover:bg-accent hover:text-accent-foreground",
    ghost: "hover:bg-accent hover:text-accent-foreground",
  }

  const sizes = {
    default: "h-10 py-2 px-4",
    sm: "h-9 px-3 rounded-md",
    lg: "h-11 px-8 rounded-md",
    icon: "h-10 w-10",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

// Inline Icons
const UserCircle = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 01-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Menu = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const Info = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

export function Header() {
  const [showConfigNotice, setShowConfigNotice] = useState(false)
  const [showSetupGuide, setShowSetupGuide] = useState(false)
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [currentUser, setCurrentUser] = useState("")
  const [showLoginDialog, setShowLoginDialog] = useState(false)
  const [showAdminMenu, setShowAdminMenu] = useState(false)
  const [showBlogManagement, setShowBlogManagement] = useState(false)
  const [showEventManagement, setShowEventManagement] = useState(false)

  useEffect(() => {
    // Check if Supabase is configured
    if (!isSupabaseConfigured()) {
      setShowConfigNotice(true)
    }
  }, [])

  // Fixed click outside handler
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Element
      // Only close if clicking outside the admin menu area
      if (showAdminMenu && !target.closest(".admin-menu-container")) {
        setShowAdminMenu(false)
      }
    }

    // Only add event listener on client side
    if (typeof window !== "undefined") {
      document.addEventListener("mousedown", handleClickOutside)
      return () => {
        document.removeEventListener("mousedown", handleClickOutside)
      }
    }
  }, [showAdminMenu])

  const scrollToSection = (sectionId: string) => {
    if (typeof window !== "undefined") {
      const element = document.getElementById(sectionId)
      if (element) {
        element.scrollIntoView({ behavior: "smooth" })
      } else {
        // If section doesn't exist on current page, navigate to home page with hash
        window.location.href = `/#${sectionId}`
      }
    }
  }

  const handleLogin = (username: string) => {
    setIsLoggedIn(true)
    setCurrentUser(username)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser("")
  }

  const handleManageBlogs = () => {
    setShowBlogManagement(true)
  }

  const handleManageEvents = () => {
    setShowEventManagement(true)
  }

  const loadPrograms = async () => {
    try {
      await getEvents()
    } catch (error) {
      console.error("Failed to load events:", error)
    }
  }

  const loadBlogs = async () => {
    try {
      await getBlogs()
    } catch (error) {
      console.error("Failed to load blogs:", error)
    }
  }

  return (
    <>
      {/* Configuration Notice */}
      {showConfigNotice && (
        <div className="bg-yellow-50 border-l-4 border-yellow-400 p-4">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-yellow-400" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-yellow-700">
                <strong>Demo Mode:</strong> Supabase is not configured. Data will be stored locally and reset on page
                refresh.
                {isLoggedIn && " Admin features will work but changes won't persist."}
              </p>
              <div className="mt-2 flex gap-2">
                <button onClick={() => setShowConfigNotice(false)} className="text-yellow-700 underline text-sm">
                  Dismiss
                </button>
                <button
                  onClick={() => setShowSetupGuide(true)}
                  className="text-yellow-700 underline text-sm font-medium"
                >
                  Setup Supabase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Setup Guide Modal */}
      {showSetupGuide && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
          <div className="bg-white rounded-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b p-4 flex justify-between items-center">
              <h2 className="text-xl font-bold">Supabase Setup Guide</h2>
              <Button variant="ghost" onClick={() => setShowSetupGuide(false)}>
                ✕
              </Button>
            </div>
            <SupabaseSetupGuide />
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b sticky top-0 bg-white z-50">
        <div className="container mx-auto px-2 py-3">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-2">
              <Link href="/">
                <Image
                  src="/f4f-logo.png"
                  alt="Framework 4 Future Logo"
                  width={200}
                  height={60}
                  className="h-10 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center ml-2">
              <div className="relative group">
                <button className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 text-lg flex items-center gap-1">
                  About
                  <svg
                    className="h-4 w-4 transition-transform group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-1 w-48 bg-white border border-gray-200 rounded-md shadow-lg opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50">
                  <div className="py-1">
                    <Link
                      href="/our-story"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Our Story
                    </Link>
                    <Link
                      href="/who-we-are"
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Who We Are
                    </Link>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                    >
                      Our Team
                    </button>
                  </div>
                </div>
              </div>
              <Link
                      href="/events"
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 text-lg flex items-center gap-1"
                    >
                      Events
              </Link>
              <Link
                      href="/blogs"
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 text-lg flex items-center gap-1"
                    >
                      Blogs
              </Link>
              <Link
                      href="/contact"
                      className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-3 text-lg flex items-center gap-1"
                    >
                      Contact Us
              </Link>
            </nav>

            <div className="flex items-center gap-1">            
              <Button
                onClick={() =>  scrollToSection("donate")}
                variant="default"
                className="hidden lg:inline-flex bg-green-600 hover:bg-green-700 text-xs px-2 py-1 h-7"
              >
                Donate
              </Button>
              {isLoggedIn ? (
                <div className="relative admin-menu-container">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-2 rounded-full h-8 px-3"
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                  >
                    <UserCircle className="h-4 w-4" />
                    <span className="hidden sm:inline text-sm font-medium">{currentUser}</span>
                    <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  {showAdminMenu && (
                    <div className="absolute right-0 mt-2 w-56 bg-white border border-gray-200 rounded-md shadow-lg z-50">
                      <div className="px-4 py-3 border-b border-gray-100">
                        <div className="flex items-center gap-2">
                          <UserCircle className="h-4 w-4" />
                          <div className="flex flex-col">
                            <span className="text-sm font-medium">Welcome back!</span>
                            <span className="text-xs text-gray-500">{currentUser}</span>
                          </div>
                        </div>
                      </div>
                      <div className="py-1">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowAdminMenu(false)
                            handleManageBlogs()
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                            />
                          </svg>
                          <span>Manage Blogs</span>
                        </button>
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowAdminMenu(false)
                            handleManageEvents()
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                          </svg>
                          <span>Manage Events</span>
                        </button>
                      </div>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowAdminMenu(false)
                            handleLogout()
                          }}
                          className="flex items-center gap-2 w-full px-4 py-2 text-sm text-red-600 hover:bg-gray-100"
                        >
                          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013 3v1"
                            />
                          </svg>
                          <span>Sign Out</span>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full h-8 w-8"
                  onClick={() => setShowLoginDialog(true)}
                >
                  <UserCircle className="h-4 w-4" />
                  <span className="sr-only">User account</span>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="lg:hidden h-8 w-8">
                <Menu className="h-4 w-4" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      <LoginDialog open={showLoginDialog} onOpenChange={setShowLoginDialog} onLogin={handleLogin} />
      <BlogManagementDialog open={showBlogManagement} onOpenChange={setShowBlogManagement} onBlogsChange={loadBlogs} />
      <EventManagementDialog
        open={showEventManagement}
        onOpenChange={setShowEventManagement}
        onEventsChange={loadPrograms}
      />
    </>
  )
}
