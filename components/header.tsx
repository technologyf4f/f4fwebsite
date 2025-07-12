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
import { VolunteeringManagementDialog } from "@/components/volunteering-management-dialog"
import { MemberDashboard } from "@/components/member-dashboard"
import { Dialog, DialogContent } from "@/components/ui/dialog"

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
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background shadow-sm hover:shadow-md"

  const variants = {
    default:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg",
    outline: "border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 text-gray-700 hover:text-indigo-700",
    ghost: "hover:bg-gray-100 text-gray-700 hover:text-indigo-700",
  }

  const sizes = {
    default: "h-11 py-3 px-6",
    sm: "h-9 px-4 text-sm",
    lg: "h-12 px-8 text-lg",
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
  const [showMemberDashboard, setShowMemberDashboard] = useState(false)
  const [showVolunteeringManagement, setShowVolunteeringManagement] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [memberId, setMemberId] = useState("")

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

  const handleLogin = (username: string, adminStatus = false, memberIdValue = "") => {
    setIsLoggedIn(true)
    setCurrentUser(username)
    setIsAdmin(adminStatus)
    setMemberId(memberIdValue)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setCurrentUser("")
    setIsAdmin(false)
    setMemberId("")
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
        <div className="bg-gradient-to-r from-amber-50 to-orange-50 border-l-4 border-amber-400 p-4 shadow-sm">
          <div className="flex">
            <div className="flex-shrink-0">
              <Info className="h-5 w-5 text-amber-500" />
            </div>
            <div className="ml-3 flex-1">
              <p className="text-sm text-amber-800 font-medium">
                <strong>Demo Mode:</strong> Supabase is not configured. Data will be stored locally and reset on page
                refresh.
                {isLoggedIn && " Admin features will work but changes won't persist."}
              </p>
              <div className="mt-3 flex gap-3">
                <button
                  onClick={() => setShowConfigNotice(false)}
                  className="text-amber-700 hover:text-amber-900 underline text-sm font-medium transition-colors"
                >
                  Dismiss
                </button>
                <button
                  onClick={() => setShowSetupGuide(true)}
                  className="text-amber-700 hover:text-amber-900 underline text-sm font-semibold transition-colors"
                >
                  Setup Supabase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Header */}
      <header className="border-b border-gray-100 sticky top-0 bg-white/95 backdrop-blur-md z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-3">
              <Link href="/" className="transition-transform hover:scale-105">
                <Image
                  src="/f4f-logo.png"
                  alt="Framework 4 Future Logo"
                  width={200}
                  height={60}
                  className="h-12 w-auto"
                />
              </Link>
            </div>

            <nav className="hidden lg:flex items-center space-x-8">
              <div className="relative group">
                <button className="text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-200 px-4 py-2 text-lg flex items-center gap-2 rounded-lg hover:bg-indigo-50">
                  About
                  <svg
                    className="h-4 w-4 transition-transform duration-200 group-hover:rotate-180"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                <div className="absolute top-full left-0 mt-2 w-56 bg-white border border-gray-100 rounded-xl shadow-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-50 overflow-hidden">
                  <div className="py-2">
                    <Link
                      href="/our-story"
                      className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                    >
                      Our Story
                    </Link>
                    <Link
                      href="/who-we-are"
                      className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                    >
                      Who We Are
                    </Link>
                    <button
                      onClick={() => scrollToSection("about")}
                      className="block w-full text-left px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                    >
                      Our Team
                    </button>
                  </div>
                </div>
              </div>
              <Link
                href="/events"
                className="text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-200 px-4 py-2 text-lg rounded-lg hover:bg-indigo-50"
              >
                Events
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-200 px-4 py-2 text-lg rounded-lg hover:bg-indigo-50"
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-indigo-600 font-semibold transition-all duration-200 px-4 py-2 text-lg rounded-lg hover:bg-indigo-50"
              >
                Contact Us
              </Link>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => scrollToSection("donate")}
                variant="default"
                size="sm"
                className="hidden lg:inline-flex bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
              >
                Donate
              </Button>
              {isLoggedIn ? (
                <div className="relative admin-menu-container">
                  <Button
                    variant="ghost"
                    className="flex items-center gap-3 rounded-full h-11 px-4 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                    onClick={() => setShowAdminMenu(!showAdminMenu)}
                  >
                    <UserCircle className="h-5 w-5" />
                    <span className="hidden sm:inline text-sm font-semibold">{currentUser}</span>
                    <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                    </svg>
                  </Button>
                  {showAdminMenu && (
                    <div className="absolute right-0 mt-3 w-64 bg-white border border-gray-100 rounded-xl shadow-xl z-50 overflow-hidden">
                      <div className="px-6 py-4 border-b border-gray-100 bg-gradient-to-r from-indigo-50 to-purple-50">
                        <div className="flex items-center gap-3">
                          <UserCircle className="h-5 w-5 text-indigo-600" />
                          <div className="flex flex-col">
                            <span className="text-sm font-semibold text-gray-900">Welcome back!</span>
                            <span className="text-xs text-gray-600">
                              {currentUser} {isAdmin && "(Admin)"}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="py-2">
                        {isAdmin ? (
                          <>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowAdminMenu(false)
                                handleManageBlogs()
                              }}
                              className="flex items-center gap-3 w-full px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                              className="flex items-center gap-3 w-full px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                                />
                              </svg>
                              <span>Manage Events</span>
                            </button>
                            <button
                              onClick={(e) => {
                                e.stopPropagation()
                                setShowAdminMenu(false)
                                setShowVolunteeringManagement(true)
                              }}
                              className="flex items-center gap-3 w-full px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                            >
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z"
                                />
                              </svg>
                              <span>Manage Volunteering</span>
                            </button>
                          </>
                        ) : (
                          <button
                            onClick={(e) => {
                              e.stopPropagation()
                              setShowAdminMenu(false)
                              setShowMemberDashboard(true)
                            }}
                            className="flex items-center gap-3 w-full px-6 py-3 text-sm text-gray-700 hover:bg-indigo-50 hover:text-indigo-700 transition-colors font-medium"
                          >
                            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                              />
                            </svg>
                            <span>My Dashboard</span>
                          </button>
                        )}
                      </div>
                      <div className="border-t border-gray-100">
                        <button
                          onClick={(e) => {
                            e.stopPropagation()
                            setShowAdminMenu(false)
                            handleLogout()
                          }}
                          className="flex items-center gap-3 w-full px-6 py-3 text-sm text-red-600 hover:bg-red-50 transition-colors font-medium"
                        >
                          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
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
                  className="rounded-full h-11 w-11 border border-gray-200 hover:border-indigo-300 hover:bg-indigo-50"
                  onClick={() => setShowLoginDialog(true)}
                >
                  <UserCircle className="h-5 w-5" />
                  <span className="sr-only">User account</span>
                </Button>
              )}
              <Button variant="ghost" size="icon" className="lg:hidden rounded-full h-11 w-11 border border-gray-200">
                <Menu className="h-5 w-5" />
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
      <VolunteeringManagementDialog
        open={showVolunteeringManagement}
        onOpenChange={setShowVolunteeringManagement}
        currentUser={currentUser}
      />

      <Dialog open={showMemberDashboard} onOpenChange={setShowMemberDashboard}>
        <DialogContent className="max-w-6xl max-h-[90vh] overflow-y-auto">
          <MemberDashboard memberId={memberId} memberName={currentUser} />
        </DialogContent>
      </Dialog>
    </>
  )
}
