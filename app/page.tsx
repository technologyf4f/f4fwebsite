"use client"

import type React from "react"

import { useState, useEffect, type ReactNode } from "react"
import Image from "next/image"

// Advanced UI Components with enhanced styling and better spacing
const Button = ({
  children,
  onClick,
  variant = "default",
  size = "default",
  className = "",
  type = "button",
  disabled = false,
  ...props
}: {
  children: ReactNode
  onClick?: () => void
  variant?: "default" | "outline" | "ghost" | "gradient" | "glass"
  size?: "default" | "sm" | "lg" | "icon"
  className?: string
  type?: "button" | "submit"
  disabled?: boolean
  [key: string]: any
}) => {
  const baseClasses =
    "inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:opacity-50 disabled:pointer-events-none ring-offset-background transform hover:scale-105 active:scale-95"

  const variants = {
    default:
      "bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-700 hover:to-purple-700 shadow-lg hover:shadow-xl",
    outline: "border-2 border-indigo-500 text-indigo-600 hover:bg-indigo-50 hover:border-indigo-600",
    ghost: "text-gray-700 hover:bg-gray-100 hover:text-indigo-600",
    gradient:
      "bg-gradient-to-r from-pink-500 to-orange-500 text-white hover:from-pink-600 hover:to-orange-600 shadow-lg hover:shadow-xl",
    glass: "bg-white/20 backdrop-blur-md border border-white/30 text-white hover:bg-white/30 shadow-lg",
  }

  const sizes = {
    default: "h-12 py-3 px-8 text-base",
    sm: "h-10 px-6 rounded-lg text-sm",
    lg: "h-14 px-10 rounded-xl text-lg",
    icon: "h-12 w-12",
  }

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </button>
  )
}

const Card = ({
  children,
  className = "",
  variant = "default",
}: { children: ReactNode; className?: string; variant?: "default" | "glass" | "gradient" }) => {
  const variants = {
    default: "bg-white border border-gray-200 shadow-xl hover:shadow-2xl",
    glass: "bg-white/10 backdrop-blur-lg border border-white/20 shadow-xl",
    gradient: "bg-gradient-to-br from-white to-gray-50 border border-gray-200 shadow-xl hover:shadow-2xl",
  }

  return <div className={`rounded-2xl transition-all duration-300 ${variants[variant]} ${className}`}>{children}</div>
}

const CardHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-4 p-8 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h3
    className={`text-2xl font-bold leading-relaxed tracking-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent ${className}`}
  >
    {children}
  </h3>
)

const CardContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`p-8 pt-0 space-y-4 ${className}`}>{children}</div>
)

const CardFooter = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex items-center p-8 pt-0 ${className}`}>{children}</div>
)

const Input = ({ className = "", ...props }: { className?: string; [key: string]: any }) => (
  <input
    className={`flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    {...props}
  />
)

const Textarea = ({ className = "", ...props }: { className?: string; [key: string]: any }) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-base ring-offset-background placeholder:text-gray-400 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:border-indigo-500 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 resize-none ${className}`}
    {...props}
  />
)

const Label = ({
  children,
  htmlFor,
  className = "",
}: { children: ReactNode; htmlFor?: string; className?: string }) => (
  <label htmlFor={htmlFor} className={`text-sm font-semibold text-gray-700 mb-3 block ${className}`}>
    {children}
  </label>
)

const Badge = ({
  children,
  variant = "default",
  className = "",
}: { children: ReactNode; variant?: "default" | "outline" | "gradient"; className?: string }) => {
  const variants = {
    default: "bg-gradient-to-r from-indigo-500 to-purple-500 text-white",
    outline: "text-indigo-600 border-2 border-indigo-500 bg-indigo-50",
    gradient: "bg-gradient-to-r from-pink-500 to-orange-500 text-white",
  }

  return (
    <div
      className={`inline-flex items-center rounded-full px-4 py-2 text-xs font-bold transition-all duration-200 hover:scale-105 ${variants[variant]} ${className}`}
    >
      {children}
    </div>
  )
}

// Modal Component
const Modal = ({
  isOpen,
  onClose,
  children,
  title,
}: {
  isOpen: boolean
  onClose: () => void
  children: ReactNode
  title?: string
}) => {
  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose}></div>
      <div className="relative bg-white rounded-2xl shadow-2xl max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center p-6 border-b">
          <h2 className="text-2xl font-bold text-gray-900">{title}</h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-2xl font-bold w-8 h-8 flex items-center justify-center rounded-full hover:bg-gray-100"
          >
            ×
          </button>
        </div>
        <div className="p-6">{children}</div>
      </div>
    </div>
  )
}

// Enhanced Icons with animations
const UserCircle = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 01-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Menu = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:rotate-90 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
  </svg>
)

const Phone = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
    />
  </svg>
)

const Mail = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

const MapPin = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
    />
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
  </svg>
)

const MessageSquare = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
    />
  </svg>
)

const Star = ({ className = "", filled = false }: { className?: string; filled?: boolean }) => (
  <svg
    className={`transition-all duration-200 hover:scale-125 ${className}`}
    fill={filled ? "currentColor" : "none"}
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-.181h4.914a1 1 0 00.951-.69l1.519-4.674z"
    />
  </svg>
)

const Heart = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-all duration-200 hover:scale-125 hover:text-red-500 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const Users = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const Target = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Sparkles = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:rotate-12 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M5 3l1.5 1.5L5 6l-1.5-1.5L5 3zM19 3l1.5 1.5L19 6l-1.5-1.5L19 3zM12 8l2 2-2 2-2-2 2-2zM5 17l1.5 1.5L5 20l-1.5-1.5L5 17zM19 17l1.5 1.5L19 20l-1.5-1.5L19 17z"
    />
  </svg>
)

const Rocket = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 hover:-translate-y-1 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
  </svg>
)

const Play = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="currentColor"
    viewBox="0 0 24 24"
  >
    <path d="M8 5v14l11-7z" />
  </svg>
)

const Award = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="8" r="7" />
    <polyline points="8.21,13.89 7,23 12,20 17,23 15.79,13.88" />
  </svg>
)

const Globe = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <circle cx="12" cy="12" r="10" />
    <line x1="2" y1="12" x2="22" y2="12" />
    <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
  </svg>
)

const Plus = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
  </svg>
)

const Shield = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z"
    />
  </svg>
)

const Upload = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
    />
  </svg>
)

const Calendar = ({ className = "" }: { className?: string }) => (
  <svg
    className={`transition-transform duration-200 hover:scale-110 ${className}`}
    fill="none"
    stroke="currentColor"
    viewBox="0 0 24 24"
  >
    <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
    <line x1="16" y1="2" x2="16" y2="6" />
    <line x1="8" y1="2" x2="8" y2="6" />
    <line x1="3" y1="10" x2="21" y2="10" />
  </svg>
)

// Floating Animation Component
const FloatingElement = ({ children, delay = 0 }: { children: ReactNode; delay?: number }) => (
  <div
    className="animate-float"
    style={{
      animationDelay: `${delay}s`,
      animation: `float 6s ease-in-out infinite ${delay}s`,
    }}
  >
    {children}
  </div>
)

// Blog Interface
interface Blog {
  id: string
  title: string
  excerpt: string
  content: string
  image: string
  date: string
  author: string
  readingTime: string
  categories: string[]
  featured: boolean
  views: number
}

// Main Component
export default function Home() {
  // Time state for live clock
  const [currentTime, setCurrentTime] = useState("")
  const [scrollY, setScrollY] = useState(0)

  // Authentication state
  const [isStaffLoggedIn, setIsStaffLoggedIn] = useState(false)
  const [showLoginModal, setShowLoginModal] = useState(false)
  const [showCreateBlogModal, setShowCreateBlogModal] = useState(false)
  const [loginForm, setLoginForm] = useState({ username: "", password: "" })
  const [loginError, setLoginError] = useState("")

  // Blog creation state
  const [newBlog, setNewBlog] = useState({
    title: "",
    content: "",
    excerpt: "",
    date: "",
    image: "",
    categories: [] as string[],
    featured: false,
  })
  const [newCategory, setNewCategory] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)

  // Parallax scroll effect
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  // Update time every minute
  useEffect(() => {
    const updateTime = () => {
      const now = new Date()
      const timeString = now.toLocaleTimeString([], {
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
      })
      setCurrentTime(timeString)
    }

    updateTime()
    const interval = setInterval(updateTime, 60000)
    return () => clearInterval(interval)
  }, [])

  // Enhanced State Management
  const [programs] = useState([
    {
      id: "1",
      name: "Youth Leadership Summit",
      description:
        "Annual summit bringing together young leaders from across the Carolinas to share ideas and build networks.",
      image: "/placeholder.svg?height=400&width=600&text=Leadership+Summit",
      date: "March 15, 2024",
      participants: 150,
      category: "Leadership",
    },
    {
      id: "2",
      name: "Community Service Initiative",
      description: "Monthly community service projects focusing on local environmental and social issues.",
      image: "/placeholder.svg?height=400&width=600&text=Community+Service",
      date: "Every 2nd Saturday",
      participants: 75,
      category: "Service",
    },
    {
      id: "3",
      name: "Civic Engagement Workshop",
      description:
        "Interactive workshops teaching young people about local government and how to make their voices heard.",
      image: "/placeholder.svg?height=400&width=600&text=Civic+Workshop",
      date: "April 22, 2024",
      participants: 100,
      category: "Civic",
    },
  ])

  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Youth Leadership in the Digital Age",
      excerpt: "Exploring how young leaders are leveraging technology to create positive change in their communities.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image: "/placeholder.svg?height=400&width=600&text=Digital+Leadership",
      date: "June 2, 2024",
      author: "Maria Rodriguez",
      readingTime: "5 min read",
      categories: ["Leadership", "Technology"],
      featured: true,
      views: 1250,
    },
    {
      id: "2",
      title: "Building Inclusive Communities Through Service",
      excerpt: "How community service projects are bringing diverse groups together to solve local challenges.",
      content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit...",
      image: "/placeholder.svg?height=400&width=600&text=Inclusive+Communities",
      date: "May 15, 2024",
      author: "James Washington",
      readingTime: "7 min read",
      categories: ["Community", "Inclusion"],
      featured: false,
      views: 890,
    },
  ])

  const [feedbacks] = useState([
    {
      id: "1",
      name: "David Thompson",
      reason:
        "The leadership workshop was transformative for my daughter. She came back with so much confidence and new skills!",
      date: "June 4, 2024",
      rating: 5,
      program: "Youth Leadership Summit",
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      reason:
        "I appreciate the community service opportunities provided. It's helped my son understand the importance of giving back.",
      date: "May 28, 2024",
      rating: 4,
      program: "Community Service Initiative",
    },
  ])

  const [donations] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      amount: 100,
      reason: "Supporting youth leadership development in my community",
      date: "June 5, 2024",
      type: "Monthly",
    },
    {
      id: "2",
      name: "Michael Chen",
      amount: 250,
      reason: "Believe in empowering the next generation of leaders",
      date: "June 3, 2024",
      type: "One-time",
    },
  ])

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const [feedbackForm, setFeedbackForm] = useState({
    name: "",
    reason: "",
    rating: 5,
  })

  const [donationForm, setDonationForm] = useState({
    name: "",
    amount: "",
    reason: "",
  })

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

  const scrollToSection = (sectionId: string) => {
    document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
  }

  // Staff login handler
  const handleStaffLogin = (e: React.FormEvent) => {
    e.preventDefault()
    if (loginForm.username === "admin" && loginForm.password === "admin123oh") {
      setIsStaffLoggedIn(true)
      setShowLoginModal(false)
      setLoginForm({ username: "", password: "" })
      setLoginError("")
      alert("Welcome, Admin! You now have access to create blog posts.")
    } else {
      setLoginError("Invalid username or password")
    }
  }

  // Blog creation handlers
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      const imageUrl = URL.createObjectURL(file)
      setNewBlog({ ...newBlog, image: imageUrl })
    }
  }

  const addCategory = () => {
    if (newCategory.trim() && !newBlog.categories.includes(newCategory.trim())) {
      setNewBlog({ ...newBlog, categories: [...newBlog.categories, newCategory.trim()] })
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    setNewBlog({ ...newBlog, categories: newBlog.categories.filter((c) => c !== category) })
  }

  const handleCreateBlog = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newBlog.title.trim() || !newBlog.content.trim() || !newBlog.date) {
      alert("Please fill in all required fields")
      return
    }

    // Calculate reading time
    const wordCount = newBlog.content.trim().split(/\s+/).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read"

    const blog: Blog = {
      id: Date.now().toString(),
      title: newBlog.title.trim(),
      content: newBlog.content.trim(),
      excerpt: newBlog.excerpt.trim() || newBlog.content.trim().substring(0, 150) + "...",
      image: newBlog.image || `/placeholder.svg?height=400&width=600&text=${encodeURIComponent(newBlog.title)}`,
      date: new Date(newBlog.date).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      author: "Admin",
      readingTime,
      categories: newBlog.categories,
      featured: newBlog.featured,
      views: 0,
    }

    setBlogs((prev) => [blog, ...prev])
    setShowCreateBlogModal(false)
    setNewBlog({
      title: "",
      content: "",
      excerpt: "",
      date: "",
      image: "",
      categories: [],
      featured: false,
    })
    setImageFile(null)
    alert("Blog post created successfully!")
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We'll get back to you soon.")
    setContactForm({ firstName: "", lastName: "", email: "", subject: "", message: "" })
  }

  const handleFeedbackSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your feedback!")
    setFeedbackForm({ name: "", reason: "", rating: 5 })
  }

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your donation! In a real application, this would redirect to a secure payment processor.")
    setDonationForm({ name: "", amount: "", reason: "" })
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-indigo-50 pb-20">
      {/* Enhanced Mobile Status Bar */}
      <div className="bg-gradient-to-r from-slate-900 to-slate-800 text-white p-3 flex justify-between items-center text-sm shadow-lg">
        <span className="font-semibold">{currentTime}</span>
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-1">
            <div className="w-1 h-3 bg-white rounded-full"></div>
            <div className="w-1 h-4 bg-white rounded-full"></div>
            <div className="w-1 h-5 bg-white rounded-full"></div>
            <div className="w-1 h-4 bg-white rounded-full"></div>
          </div>
          <span className="text-xs bg-white/20 px-2 py-1 rounded-full">WiFi</span>
        </div>
      </div>

      {/* Enhanced Browser Address Bar */}
      <div className="bg-gradient-to-r from-gray-100 to-gray-50 p-3 flex justify-between items-center mx-3 my-2 rounded-xl shadow-inner border border-gray-200">
        <div className="flex items-center gap-3">
          <Menu className="h-5 w-5 text-gray-600" />
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
        </div>
        <span className="text-gray-700 text-sm font-medium bg-white px-3 py-1 rounded-lg shadow-sm">
          framework4future.org
        </span>
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center">
            <span className="text-white text-xs">↻</span>
          </div>
        </div>
      </div>

      {/* Enhanced Header with Real Logo */}
      <header className="sticky top-0 bg-white/90 backdrop-blur-lg border-b border-gray-200/50 z-[100] shadow-lg">
        <div className="container mx-auto px-6 py-5">
          <div className="flex justify-between items-center">
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Image
                  src="/framework4future-logo.jpeg"
                  alt="Framework 4 Future Logo"
                  width={60}
                  height={40}
                  className="rounded-lg shadow-lg"
                />
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-gradient-to-r from-green-400 to-blue-500 rounded-full animate-pulse"></div>
              </div>
            </div>

            <nav className="hidden lg:flex items-center space-x-2">
              {["About", "Programs", "Blogs", "Contact", "Feedback"].map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 px-6 py-3 text-sm rounded-lg hover:bg-indigo-50 relative group"
                >
                  {item}
                  <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
                </button>
              ))}
              <button
                onClick={() => setShowLoginModal(true)}
                className="text-gray-700 hover:text-indigo-600 font-medium transition-all duration-300 px-6 py-3 text-sm rounded-lg hover:bg-indigo-50 relative group flex items-center"
              >
                <Shield className="h-4 w-4 mr-2" />
                Staff
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-indigo-500 to-purple-500 group-hover:w-full transition-all duration-300"></div>
              </button>
            </nav>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => scrollToSection("programs")}
                variant="gradient"
                size="sm"
                className="hidden lg:inline-flex"
              >
                <Rocket className="h-4 w-4 mr-2" />
                Programs
              </Button>
              {isStaffLoggedIn && (
                <Button
                  onClick={() => setShowCreateBlogModal(true)}
                  variant="outline"
                  size="sm"
                  className="hidden lg:inline-flex border-green-500 text-green-600 hover:bg-green-50"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Blog
                </Button>
              )}
              <Button
                onClick={() => scrollToSection("donate")}
                variant="default"
                size="sm"
                className="hidden lg:inline-flex"
              >
                <Heart className="h-4 w-4 mr-2" />
                Donate
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
              </Button>
              <Button variant="ghost" size="icon" className="lg:hidden">
                <Menu className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Staff Login Modal */}
      <Modal isOpen={showLoginModal} onClose={() => setShowLoginModal(false)} title="Staff Login">
        <form onSubmit={handleStaffLogin} className="space-y-6">
          <div>
            <Label htmlFor="username">Username</Label>
            <Input
              id="username"
              value={loginForm.username}
              onChange={(e) => setLoginForm({ ...loginForm, username: e.target.value })}
              placeholder="Enter username"
              required
            />
          </div>
          <div>
            <Label htmlFor="password">Password</Label>
            <Input
              id="password"
              type="password"
              value={loginForm.password}
              onChange={(e) => setLoginForm({ ...loginForm, password: e.target.value })}
              placeholder="Enter password"
              required
            />
          </div>
          {loginError && <p className="text-red-500 text-sm">{loginError}</p>}
          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => setShowLoginModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              <Shield className="h-4 w-4 mr-2" />
              Login
            </Button>
          </div>
        </form>
      </Modal>

      {/* Create Blog Modal */}
      <Modal isOpen={showCreateBlogModal} onClose={() => setShowCreateBlogModal(false)} title="Create New Blog Post">
        <form onSubmit={handleCreateBlog} className="space-y-6">
          <div>
            <Label htmlFor="blogTitle">Title *</Label>
            <Input
              id="blogTitle"
              value={newBlog.title}
              onChange={(e) => setNewBlog({ ...newBlog, title: e.target.value })}
              placeholder="Enter blog title"
              required
            />
          </div>

          <div>
            <Label htmlFor="blogDate">Publication Date *</Label>
            <Input
              id="blogDate"
              type="date"
              value={newBlog.date}
              onChange={(e) => setNewBlog({ ...newBlog, date: e.target.value })}
              required
            />
          </div>

          <div>
            <Label htmlFor="blogExcerpt">Excerpt</Label>
            <Textarea
              id="blogExcerpt"
              value={newBlog.excerpt}
              onChange={(e) => setNewBlog({ ...newBlog, excerpt: e.target.value })}
              placeholder="Brief summary (optional - will be auto-generated if empty)"
              rows={3}
            />
          </div>

          <div>
            <Label htmlFor="blogContent">Content *</Label>
            <Textarea
              id="blogContent"
              value={newBlog.content}
              onChange={(e) => setNewBlog({ ...newBlog, content: e.target.value })}
              placeholder="Write your blog post content here..."
              rows={8}
              required
            />
          </div>

          <div>
            <Label>Categories</Label>
            <div className="flex flex-wrap gap-2 mb-3">
              {newBlog.categories.map((category) => (
                <Badge key={category} variant="outline" className="flex items-center gap-2">
                  {category}
                  <button
                    type="button"
                    onClick={() => removeCategory(category)}
                    className="text-red-500 hover:text-red-700"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
            <div className="flex gap-2">
              <Input
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="Add a category"
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault()
                    addCategory()
                  }
                }}
              />
              <Button type="button" variant="outline" onClick={addCategory}>
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div>
            <Label>Blog Image</Label>
            <div className="space-y-3">
              <div className="flex items-center gap-4">
                <Label htmlFor="imageFile" className="cursor-pointer">
                  <div className="flex items-center gap-2 px-4 py-2 border-2 border-dashed border-gray-300 rounded-lg hover:border-indigo-400 transition-colors">
                    <Upload className="h-5 w-5 text-gray-500" />
                    <span className="text-sm text-gray-600">Upload Image</span>
                  </div>
                </Label>
                <Input id="imageFile" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
              </div>
              {imageFile && <div className="text-sm text-gray-600">Selected: {imageFile.name}</div>}
              {newBlog.image && (
                <div className="w-full h-32 bg-gray-100 rounded-lg overflow-hidden">
                  <Image
                    src={newBlog.image || "/placeholder.svg"}
                    alt="Preview"
                    width={400}
                    height={200}
                    className="w-full h-full object-cover"
                  />
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            <input
              type="checkbox"
              id="featured"
              checked={newBlog.featured}
              onChange={(e) => setNewBlog({ ...newBlog, featured: e.target.checked })}
              className="rounded"
            />
            <Label htmlFor="featured" className="cursor-pointer mb-0">
              Feature this post
            </Label>
          </div>

          <div className="flex gap-4">
            <Button type="button" variant="outline" onClick={() => setShowCreateBlogModal(false)} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" variant="gradient" className="flex-1">
              <Plus className="h-4 w-4 mr-2" />
              Create Blog Post
            </Button>
          </div>
        </form>
      </Modal>

      {/* Revolutionary Hero Section */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        {/* Animated Background */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-900"></div>
          <div className="absolute inset-0 bg-gradient-to-tr from-blue-600/30 via-transparent to-orange-600/30"></div>

          {/* Floating Elements */}
          <FloatingElement delay={0}>
            <div className="absolute top-20 left-10 w-20 h-20 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={2}>
            <div className="absolute top-40 right-20 w-32 h-32 bg-gradient-to-r from-pink-400 to-purple-500 rounded-full opacity-20 blur-xl"></div>
          </FloatingElement>
          <FloatingElement delay={4}>
            <div className="absolute bottom-40 left-1/4 w-24 h-24 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-xl"></div>
          </FloatingElement>

          {/* Geometric Patterns */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-1/4 left-1/4 w-64 h-64 border border-white rounded-full animate-spin-slow"></div>
            <div className="absolute bottom-1/4 right-1/4 w-48 h-48 border border-white rounded-full animate-spin-reverse"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-24 relative z-10 min-h-screen flex items-center">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-10">
              <div className="space-y-8">
                <div className="flex items-center gap-3 mb-8">
                  <Badge variant="gradient">
                    <Sparkles className="h-3 w-3 mr-2" />
                    Transforming Communities
                  </Badge>
                </div>

                <h1 className="text-5xl lg:text-7xl font-bold leading-tight space-y-2">
                  <div className="bg-gradient-to-r from-white via-blue-100 to-purple-100 bg-clip-text text-transparent">
                    Empowering
                  </div>
                  <div className="bg-gradient-to-r from-yellow-300 via-orange-300 to-pink-300 bg-clip-text text-transparent">
                    Tomorrow's
                  </div>
                  <div className="bg-gradient-to-r from-green-300 via-blue-300 to-purple-300 bg-clip-text text-transparent">
                    Leaders
                  </div>
                </h1>

                <p className="text-xl text-gray-200 leading-relaxed max-w-2xl">
                  We help develop the next generation of youth leaders through intentional collaboration, civic
                  engagement, and transformative service projects across the Carolinas.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button onClick={() => scrollToSection("programs")} variant="glass" size="lg" className="group">
                  <Rocket className="h-5 w-5 mr-3 group-hover:animate-bounce" />
                  Explore Programs
                </Button>
                <Button
                  onClick={() => scrollToSection("contact")}
                  variant="outline"
                  size="lg"
                  className="border-white/30 text-white hover:bg-white/10"
                >
                  Get Involved
                </Button>
              </div>

              {/* Stats Preview */}
              <div className="grid grid-cols-3 gap-8 pt-12">
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">500+</div>
                  <div className="text-sm text-gray-300">Leaders Trained</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">50+</div>
                  <div className="text-sm text-gray-300">Projects</div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-white mb-2">25+</div>
                  <div className="text-sm text-gray-300">Partners</div>
                </div>
              </div>
            </div>

            {/* Enhanced Image Grid */}
            <div className="relative">
              <div className="grid grid-cols-2 gap-8">
                {[
                  { src: "/placeholder.svg?height=300&width=300&text=Youth+Leaders", alt: "Youth leaders", delay: 0 },
                  {
                    src: "/placeholder.svg?height=300&width=300&text=Community+Service",
                    alt: "Community service",
                    delay: 0.5,
                  },
                  {
                    src: "/placeholder.svg?height=300&width=300&text=Leadership+Workshop",
                    alt: "Leadership workshop",
                    delay: 1,
                  },
                  {
                    src: "/placeholder.svg?height=300&width=300&text=Civic+Engagement",
                    alt: "Civic engagement",
                    delay: 1.5,
                  },
                ].map((item, index) => (
                  <FloatingElement key={index} delay={item.delay}>
                    <div className="aspect-square bg-white/10 backdrop-blur-lg rounded-3xl overflow-hidden border border-white/20 shadow-2xl hover:scale-105 transition-all duration-500">
                      <Image src={item.src || "/placeholder.svg"} alt={item.alt} fill className="object-cover" />
                    </div>
                  </FloatingElement>
                ))}
              </div>

              {/* Decorative Elements */}
              <div className="absolute -top-6 -right-6 w-24 h-24 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
              <div className="absolute -bottom-6 -left-6 w-32 h-32 bg-gradient-to-r from-green-400 to-blue-500 rounded-full opacity-20 blur-xl animate-pulse"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced About Section */}
      <section id="about" className="py-32 bg-gradient-to-br from-white to-indigo-50 relative overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        <div className="container mx-auto px-6 relative z-10">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="gradient" className="mb-8">
                <Sparkles className="h-4 w-4 mr-2" />
                About Our Mission
              </Badge>
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                Transforming Communities Through Youth Leadership
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                Discover how we're building the next generation of leaders through innovative programs and meaningful
                community engagement.
              </p>
            </div>

            {/* Mission Statement */}
            <Card variant="gradient" className="mb-20 overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/10 to-purple-500/10"></div>
              <CardHeader className="relative z-10">
                <CardTitle className="text-3xl mb-6 flex items-center">
                  <Target className="h-8 w-8 mr-4 text-indigo-600" />
                  Our Mission
                </CardTitle>
                <p className="text-lg text-gray-700 leading-relaxed">
                  We help develop the next generation of youth leaders through intentional and impactful collaboration,
                  civic engagement and service projects at the local, regional and national level, while creating
                  pathways for leadership development that transform communities across the Carolinas.
                </p>
              </CardHeader>
            </Card>

            {/* Enhanced Video Section with Decorative Elements */}
            <div className="relative mb-20">
              {/* Background Decorative Elements */}
              <div className="absolute inset-0 -z-10">
                <div className="absolute top-0 left-0 w-32 h-32 bg-gradient-to-r from-red-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
                <div className="absolute top-10 right-10 w-24 h-24 bg-gradient-to-r from-blue-500/20 to-indigo-500/20 rounded-full blur-2xl"></div>
                <div className="absolute bottom-0 left-1/3 w-40 h-40 bg-gradient-to-r from-purple-500/20 to-pink-500/20 rounded-full blur-3xl"></div>
              </div>

              <Card variant="glass" className="overflow-hidden relative">
                {/* Floating Achievement Badges */}
                <div className="absolute -top-4 -left-4 z-20">
                  <FloatingElement delay={0}>
                    <div className="w-16 h-16 bg-gradient-to-r from-yellow-400 to-orange-500 rounded-full flex items-center justify-center shadow-xl">
                      <Award className="h-8 w-8 text-white" />
                    </div>
                  </FloatingElement>
                </div>

                <div className="absolute -top-4 -right-4 z-20">
                  <FloatingElement delay={1}>
                    <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-blue-500 rounded-full flex items-center justify-center shadow-xl">
                      <Globe className="h-8 w-8 text-white" />
                    </div>
                  </FloatingElement>
                </div>

                <div className="absolute -bottom-4 left-1/2 transform -translate-x-1/2 z-20">
                  <FloatingElement delay={2}>
                    <div className="w-16 h-16 bg-gradient-to-r from-purple-400 to-pink-500 rounded-full flex items-center justify-center shadow-xl">
                      <Users className="h-8 w-8 text-white" />
                    </div>
                  </FloatingElement>
                </div>

                <CardHeader>
                  <CardTitle className="text-3xl mb-6 flex items-center justify-center">
                    <div className="w-12 h-12 bg-gradient-to-r from-red-500 to-pink-500 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                      <Play className="h-6 w-6 text-white ml-1" />
                    </div>
                    Watch Our Story
                  </CardTitle>
                  <p className="text-center text-gray-600 max-w-2xl mx-auto">
                    Discover the inspiring journey of Framework 4 Future and see how we're transforming communities
                    through youth leadership development.
                  </p>
                </CardHeader>

                <CardContent>
                  <div className="relative">
                    {/* Video Container with Enhanced Styling */}
                    <div className="aspect-video w-full rounded-3xl overflow-hidden shadow-2xl border-4 border-white/20 relative group">
                      <iframe
                        src="https://www.youtube.com/embed/j_o_OkOQBeo"
                        title="Framework 4 Future Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                        allowFullScreen
                        className="w-full h-full"
                      ></iframe>

                      {/* Video Overlay Effects */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-black/10 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"></div>
                    </div>

                    {/* Video Stats */}
                    <div className="grid grid-cols-3 gap-6 mt-8">
                      <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                        <div className="text-2xl font-bold text-indigo-600 mb-1">2M+</div>
                        <div className="text-sm text-gray-600">Views</div>
                      </div>
                      <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                        <div className="text-2xl font-bold text-green-600 mb-1">15K+</div>
                        <div className="text-sm text-gray-600">Likes</div>
                      </div>
                      <div className="text-center p-4 bg-white/50 backdrop-blur-sm rounded-xl">
                        <div className="text-2xl font-bold text-purple-600 mb-1">500+</div>
                        <div className="text-sm text-gray-600">Shares</div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Decorative Quote Bubbles */}
              <div className="absolute top-20 -left-10 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs">
                  <p className="text-sm text-gray-700 italic">
                    "This video changed my perspective on youth leadership!"
                  </p>
                  <div className="text-xs text-gray-500 mt-2">- Community Member</div>
                </div>
              </div>

              <div className="absolute bottom-20 -right-10 z-10">
                <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-4 shadow-xl max-w-xs">
                  <p className="text-sm text-gray-700 italic">"Inspiring work that's making real change!"</p>
                  <div className="text-xs text-gray-500 mt-2">- Local Leader</div>
                </div>
              </div>
            </div>

            {/* Enhanced Impact Stats */}
            <Card className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white overflow-hidden">
              <div className="absolute inset-0 bg-black/10"></div>
              <CardContent className="relative z-10 p-16">
                <h3 className="text-3xl font-bold mb-12 text-center">Our Impact Across the Carolinas</h3>
                <div className="grid md:grid-cols-3 gap-12">
                  {[
                    { number: "500+", label: "Youth Leaders Trained", icon: Users },
                    { number: "50+", label: "Community Projects", icon: Target },
                    { number: "25+", label: "Partner Organizations", icon: Heart },
                  ].map((stat, index) => (
                    <div key={index} className="text-center group">
                      <div className="w-20 h-20 bg-white/20 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                        <stat.icon className="h-10 w-10" />
                      </div>
                      <div className="text-4xl font-bold mb-3">{stat.number}</div>
                      <div className="text-indigo-100 text-lg">{stat.label}</div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Enhanced How We Started Section */}
      <section className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-20">
              <Badge variant="outline" className="mb-8">
                <Rocket className="h-4 w-4 mr-2" />
                Our Journey
              </Badge>
              <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
                How We Started
              </h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                The inspiring journey that led to Framework 4 Future and our mission to transform youth leadership.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-20 items-center">
              {/* Story Content */}
              <div className="space-y-10">
                <Card variant="gradient">
                  <CardHeader>
                    <CardTitle className="text-2xl mb-6">Our Beginning</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-6 text-gray-700 leading-relaxed">
                      <p>
                        Framework 4 Future was born from a simple yet powerful observation: young people in the
                        Carolinas had incredible potential but lacked structured opportunities to develop their
                        leadership skills and engage meaningfully with their communities.
                      </p>
                      <p>
                        In 2018, a group of passionate educators, community leaders, and youth advocates came together
                        with a shared vision. They recognized that traditional approaches to youth development weren't
                        fully addressing the unique challenges and opportunities facing today's generation.
                      </p>
                      <p>
                        What started as informal mentoring sessions in local community centers has grown into a
                        comprehensive network of programs that have impacted hundreds of young leaders across North and
                        South Carolina.
                      </p>
                    </div>
                  </CardContent>
                </Card>

                {/* Enhanced Timeline */}
                <Card className="bg-gradient-to-br from-indigo-50 to-purple-50">
                  <CardHeader>
                    <CardTitle className="text-xl mb-6">Key Milestones</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-8">
                      {[
                        {
                          year: "2018",
                          event: "Founded with first mentoring program",
                          color: "from-blue-500 to-indigo-500",
                        },
                        {
                          year: "2019",
                          event: "Launched Youth Leadership Summit",
                          color: "from-indigo-500 to-purple-500",
                        },
                        {
                          year: "2020",
                          event: "Adapted programs for virtual engagement",
                          color: "from-purple-500 to-pink-500",
                        },
                        { year: "2021", event: "Expanded to serve both Carolinas", color: "from-pink-500 to-red-500" },
                        {
                          year: "2024",
                          event: "Reached 500+ youth leaders trained",
                          color: "from-red-500 to-orange-500",
                        },
                      ].map((milestone, index) => (
                        <div key={index} className="flex items-start gap-6 group">
                          <div
                            className={`w-8 h-8 bg-gradient-to-r ${milestone.color} rounded-full mt-1 flex-shrink-0 group-hover:scale-125 transition-transform duration-300`}
                          ></div>
                          <div>
                            <div className="font-bold text-gray-900 text-lg mb-2">{milestone.year}</div>
                            <div className="text-gray-600">{milestone.event}</div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Visual Content */}
              <div className="space-y-10">
                <Card className="overflow-hidden">
                  <div className="aspect-video bg-gradient-to-br from-indigo-100 to-purple-100 relative">
                    <Image
                      src="/placeholder.svg?height=400&width=600&text=Founding+Story"
                      alt="Framework 4 Future founding story"
                      fill
                      className="object-cover"
                    />
                  </div>
                </Card>

                <div className="grid grid-cols-2 gap-6">
                  {[
                    { src: "/placeholder.svg?height=300&width=300&text=Early+Days", alt: "Early days" },
                    { src: "/placeholder.svg?height=300&width=300&text=First+Summit", alt: "First Summit" },
                  ].map((item, index) => (
                    <Card key={index} className="overflow-hidden group">
                      <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative">
                        <Image
                          src={item.src || "/placeholder.svg"}
                          alt={item.alt}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-500"
                        />
                      </div>
                    </Card>
                  ))}
                </div>

                {/* Enhanced Founder Quote */}
                <Card className="bg-gradient-to-r from-indigo-50 to-purple-50 border-l-4 border-indigo-500">
                  <CardContent className="p-10">
                    <blockquote className="text-gray-700 italic text-lg mb-8 leading-relaxed">
                      "We believed that every young person deserves the opportunity to discover their potential and make
                      a meaningful impact in their community. Framework 4 Future was our way of making that belief a
                      reality."
                    </blockquote>
                    <div className="flex items-center gap-4">
                      <div className="w-14 h-14 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">SM</span>
                      </div>
                      <div>
                        <div className="font-bold text-gray-900 text-lg">Sarah Mitchell</div>
                        <div className="text-sm text-gray-600">Co-Founder & Executive Director</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Programs Section */}
      <section id="programs" className="py-32 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="gradient" className="mb-8">
              <Rocket className="h-4 w-4 mr-2" />
              Our Programs
            </Badge>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Empowering Through Action
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover our comprehensive programs designed to develop leadership skills and create lasting community
              impact.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-10">
            {programs.map((program, index) => (
              <Card
                key={program.id}
                variant="gradient"
                className="overflow-hidden group hover:scale-105 transition-all duration-500"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={program.image || "/placeholder.svg"}
                    alt={program.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute top-6 right-6">
                    <Badge variant="glass" className="text-white">
                      {program.category}
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors duration-300">
                    {program.name}
                  </CardTitle>
                  <div className="flex items-center justify-between text-sm text-gray-500 mt-2">
                    <span>{program.date}</span>
                    <span className="flex items-center">
                      <Users className="h-4 w-4 mr-2" />
                      {program.participants}
                    </span>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-8 leading-relaxed">{program.description}</p>
                  <Button variant="outline" className="w-full group-hover:bg-indigo-50 group-hover:border-indigo-300">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Great Memories Section */}
      <section className="py-32 bg-gradient-to-br from-white to-gray-50">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto text-center mb-20">
            <Badge variant="outline" className="mb-8">
              <Sparkles className="h-4 w-4 mr-2" />
              Great Memories
            </Badge>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Moments That Matter
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              Capturing the transformative moments of growth, leadership, and community impact that define our journey.
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {[...Array(8)].map((_, i) => (
              <Card key={i} className="overflow-hidden group aspect-square">
                <div className="relative h-full">
                  <Image
                    src={`/placeholder.svg?height=300&width=300&text=Memory+${i + 1}`}
                    alt={`Memory ${i + 1}`}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute bottom-6 left-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <div className="text-sm font-semibold">Memory {i + 1}</div>
                  </div>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Enhanced Blogs Section */}
      <section id="blogs" className="py-32 bg-gradient-to-br from-gray-50 to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="gradient" className="mb-8">
              <MessageSquare className="h-4 w-4 mr-2" />
              Our Blog
            </Badge>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Insights & Stories
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Discover inspiring stories, leadership insights, and community impact from our youth leadership network.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-10">
            {blogs.map((blog) => (
              <Card
                key={blog.id}
                variant="gradient"
                className="overflow-hidden group hover:scale-105 transition-all duration-500"
              >
                <div className="aspect-video relative overflow-hidden">
                  <Image
                    src={blog.image || "/placeholder.svg"}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  {blog.featured && (
                    <div className="absolute top-6 left-6">
                      <Badge variant="gradient">
                        <Star className="h-3 w-3 mr-2" />
                        Featured
                      </Badge>
                    </div>
                  )}
                  <div className="absolute top-6 right-6">
                    <Badge variant="glass" className="text-white">
                      {blog.views} views
                    </Badge>
                  </div>
                </div>
                <CardHeader>
                  <div className="flex gap-3 mb-4">
                    {blog.categories.map((category) => (
                      <Badge key={category} variant="outline" className="text-xs">
                        {category}
                      </Badge>
                    ))}
                  </div>
                  <CardTitle className="text-xl group-hover:text-indigo-600 transition-colors duration-300">
                    {blog.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-8 leading-relaxed">{blog.excerpt}</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {blog.author
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </span>
                    </div>
                    <div>
                      <div className="text-sm font-medium">{blog.author}</div>
                      <div className="text-xs text-gray-500">{blog.readingTime}</div>
                    </div>
                  </div>
                  <Button
                    variant="outline"
                    size="sm"
                    className="group-hover:bg-indigo-50 group-hover:border-indigo-300"
                  >
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {/* Blog Calendar Section */}
          {isStaffLoggedIn && blogs.length > 0 && (
            <div className="mt-20">
              <div className="text-center mb-12">
                <Badge variant="outline" className="mb-6">
                  <Calendar className="h-4 w-4 mr-2" />
                  Blog Calendar
                </Badge>
                <h3 className="text-3xl font-bold text-gray-900">Published Posts Timeline</h3>
              </div>
              <Card className="p-8">
                <div className="space-y-4">
                  {blogs
                    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                    .map((blog) => (
                      <div key={blog.id} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg">
                        <div className="w-3 h-3 bg-indigo-500 rounded-full"></div>
                        <div className="flex-1">
                          <div className="font-semibold text-gray-900">{blog.title}</div>
                          <div className="text-sm text-gray-500">
                            {blog.date} • {blog.author}
                          </div>
                        </div>
                        <div className="flex gap-2">
                          {blog.categories.map((category) => (
                            <Badge key={category} variant="outline" className="text-xs">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    ))}
                </div>
              </Card>
            </div>
          )}
        </div>
      </section>

      {/* Enhanced Contact Section */}
      <section id="contact" className="py-32 bg-gradient-to-br from-white to-indigo-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="outline" className="mb-8">
              <MessageSquare className="h-4 w-4 mr-2" />
              Get In Touch
            </Badge>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Ready to join our community of young leaders? We'd love to hear from you and help you get started.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Contact Information */}
              <div className="space-y-10">
                <div>
                  <h3 className="text-3xl font-bold text-gray-900 mb-10">Get in Touch</h3>
                  <div className="space-y-8">
                    {[
                      {
                        icon: Phone,
                        title: "Phone",
                        content: "+704-454-8936",
                        href: "tel:+7044548936",
                        color: "from-blue-500 to-indigo-500",
                      },
                      {
                        icon: Mail,
                        title: "Email",
                        content: "framework4future@gmail.com",
                        href: "mailto:framework4future@gmail.com",
                        color: "from-green-500 to-emerald-500",
                      },
                      {
                        icon: MapPin,
                        title: "Location",
                        content: "255 Old Post Road\nWaxhaw, NC 28173",
                        href: "#",
                        color: "from-red-500 to-pink-500",
                      },
                    ].map((item, index) => (
                      <Card
                        key={index}
                        variant="gradient"
                        className="group hover:scale-105 transition-all duration-300"
                      >
                        <CardContent className="p-8">
                          <div className="flex items-center gap-6">
                            <div
                              className={`w-16 h-16 bg-gradient-to-r ${item.color} rounded-2xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}
                            >
                              <item.icon className="h-8 w-8 text-white" />
                            </div>
                            <div>
                              <h4 className="font-bold text-gray-900 text-lg mb-2">{item.title}</h4>
                              <a
                                href={item.href}
                                className="text-gray-600 hover:text-indigo-600 transition-colors duration-200 whitespace-pre-line"
                              >
                                {item.content}
                              </a>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </div>
              </div>

              {/* Enhanced Contact Form */}
              <div>
                <Card variant="gradient" className="overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-indigo-50/50 to-purple-50/50"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl mb-4">Send us a Message</CardTitle>
                    <p className="text-gray-600">We'll get back to you within 24 hours.</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <form onSubmit={handleContactSubmit} className="space-y-8">
                      <div className="grid md:grid-cols-2 gap-6">
                        <div>
                          <Label htmlFor="firstName">First Name</Label>
                          <Input
                            id="firstName"
                            value={contactForm.firstName}
                            onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                            placeholder="Your first name"
                            required
                          />
                        </div>
                        <div>
                          <Label htmlFor="lastName">Last Name</Label>
                          <Input
                            id="lastName"
                            value={contactForm.lastName}
                            onChange={(e) => setContactForm({ ...contactForm, lastName: e.target.value })}
                            placeholder="Your last name"
                            required
                          />
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={contactForm.email}
                          onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                          placeholder="your.email@example.com"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="subject">Subject</Label>
                        <Input
                          id="subject"
                          value={contactForm.subject}
                          onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                          placeholder="What is this regarding?"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                          id="message"
                          value={contactForm.message}
                          onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                          placeholder="Tell us more about how we can help you..."
                          rows={6}
                          required
                        />
                      </div>
                      <Button type="submit" variant="gradient" size="lg" className="w-full">
                        <MessageSquare className="h-5 w-5 mr-3" />
                        Send Message
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Feedback Section */}
      <section id="feedback" className="py-32 bg-gradient-to-br from-gray-50 to-white">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="gradient" className="mb-8">
              <Star className="h-4 w-4 mr-2" />
              Community Feedback
            </Badge>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              What Our Community Says
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Hear from the youth, families, and community members whose lives have been transformed through our
              programs.
            </p>
          </div>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Recent Feedback */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-10">Community Stories</h3>
                <div className="space-y-8">
                  {feedbacks.map((feedback) => (
                    <Card
                      key={feedback.id}
                      variant="gradient"
                      className="group hover:scale-105 transition-all duration-300"
                    >
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{feedback.name}</h4>
                            <p className="text-sm text-indigo-600 font-medium">{feedback.program}</p>
                          </div>
                          {feedback.rating && (
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-5 w-5 ${i < feedback.rating! ? "text-yellow-400" : "text-gray-300"}`}
                                  filled={i < feedback.rating!}
                                />
                              ))}
                            </div>
                          )}
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed italic">"{feedback.reason}"</p>
                        <p className="text-xs text-gray-500">{feedback.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>

              {/* Enhanced Feedback Form */}
              <div>
                <Card variant="gradient" className="overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-purple-50/50 to-pink-50/50"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl flex items-center mb-4">
                      <MessageSquare className="h-6 w-6 mr-4 text-indigo-600" />
                      Share Your Experience
                    </CardTitle>
                    <p className="text-gray-600">
                      Help us improve by sharing your thoughts and experiences with our programs.
                    </p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <form onSubmit={handleFeedbackSubmit} className="space-y-8">
                      <div>
                        <Label htmlFor="feedbackName">Your Name</Label>
                        <Input
                          id="feedbackName"
                          value={feedbackForm.name}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, name: e.target.value })}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      <div>
                        <Label htmlFor="feedbackReason">Your Feedback</Label>
                        <Textarea
                          id="feedbackReason"
                          value={feedbackForm.reason}
                          onChange={(e) => setFeedbackForm({ ...feedbackForm, reason: e.target.value })}
                          placeholder="Share your experience with our programs..."
                          rows={6}
                          required
                        />
                      </div>
                      <div>
                        <Label>Rating</Label>
                        <div className="flex items-center gap-3 mt-4">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <button
                              key={star}
                              type="button"
                              onClick={() => setFeedbackForm({ ...feedbackForm, rating: star })}
                              className="focus:outline-none transition-transform duration-200 hover:scale-125"
                            >
                              <Star
                                className={`h-8 w-8 ${star <= feedbackForm.rating ? "text-yellow-400" : "text-gray-300"}`}
                                filled={star <= feedbackForm.rating}
                              />
                            </button>
                          ))}
                        </div>
                      </div>
                      <Button type="submit" variant="gradient" size="lg" className="w-full">
                        <Star className="h-5 w-5 mr-3" />
                        Submit Feedback
                      </Button>
                    </form>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Donate Section */}
      <section id="donate" className="py-32 bg-gradient-to-br from-indigo-50 to-purple-50">
        <div className="container mx-auto px-6">
          <div className="text-center mb-20">
            <Badge variant="gradient" className="mb-8">
              <Heart className="h-4 w-4 mr-2" />
              Support Our Mission
            </Badge>
            <h2 className="text-5xl font-bold mb-8 bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent">
              Invest in Tomorrow's Leaders
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
              Your support helps us empower the next generation of leaders and create lasting positive change in
              communities across the Carolinas.
            </p>
          </div>

          {/* Enhanced Impact Stats */}
          <Card className="bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-600 text-white overflow-hidden mb-20">
            <div className="absolute inset-0 bg-black/10"></div>
            <CardContent className="relative z-10 p-16">
              <h3 className="text-3xl font-bold mb-12 text-center">Your Impact in Numbers</h3>
              <div className="grid md:grid-cols-3 gap-12">
                {[
                  {
                    icon: Heart,
                    number: `$${totalDonations.toLocaleString()}`,
                    label: "Total Raised",
                    description: "Funding transformative programs",
                  },
                  {
                    icon: Users,
                    number: donations.length,
                    label: "Generous Donors",
                    description: "Community supporters like you",
                  },
                  {
                    icon: Target,
                    number: "500+",
                    label: "Youth Impacted",
                    description: "Lives changed through leadership",
                  },
                ].map((stat, index) => (
                  <div key={index} className="text-center group">
                    <div className="w-24 h-24 bg-white/20 backdrop-blur-lg rounded-3xl flex items-center justify-center mx-auto mb-8 group-hover:scale-110 transition-transform duration-300">
                      <stat.icon className="h-12 w-12" />
                    </div>
                    <div className="text-4xl font-bold mb-3">{stat.number}</div>
                    <div className="text-lg font-semibold mb-3">{stat.label}</div>
                    <div className="text-sm text-indigo-100">{stat.description}</div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <div className="max-w-6xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-20">
              {/* Enhanced Donation Form */}
              <div>
                <Card variant="gradient" className="overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-green-50/50 to-emerald-50/50"></div>
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-2xl flex items-center mb-4">
                      <Heart className="h-6 w-6 mr-4 text-red-500" />
                      Make a Donation
                    </CardTitle>
                    <p className="text-gray-600">Every contribution makes a difference in a young person's life.</p>
                  </CardHeader>
                  <CardContent className="relative z-10">
                    <form onSubmit={handleDonationSubmit} className="space-y-8">
                      <div>
                        <Label htmlFor="donorName">Your Name (Optional)</Label>
                        <Input
                          id="donorName"
                          value={donationForm.name}
                          onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="amount">Donation Amount ($)</Label>
                        <Input
                          id="amount"
                          type="number"
                          min="1"
                          step="0.01"
                          value={donationForm.amount}
                          onChange={(e) => setDonationForm({ ...donationForm, amount: e.target.value })}
                          placeholder="Enter amount"
                          required
                        />
                        <div className="grid grid-cols-4 gap-4 mt-6">
                          {[25, 50, 100, 250].map((preset) => (
                            <Button
                              key={preset}
                              type="button"
                              variant="outline"
                              size="sm"
                              onClick={() => setDonationForm({ ...donationForm, amount: preset.toString() })}
                              className="hover:bg-green-50 hover:border-green-300"
                            >
                              ${preset}
                            </Button>
                          ))}
                        </div>
                      </div>
                      <div>
                        <Label htmlFor="donationReason">Why are you donating?</Label>
                        <Textarea
                          id="donationReason"
                          value={donationForm.reason}
                          onChange={(e) => setDonationForm({ ...donationForm, reason: e.target.value })}
                          placeholder="Tell us what motivates your support..."
                          rows={4}
                          required
                        />
                      </div>
                      <Button
                        type="submit"
                        variant="gradient"
                        size="lg"
                        className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      >
                        <Heart className="h-5 w-5 mr-3" />
                        Donate ${donationForm.amount || "0"}
                      </Button>
                    </form>
                  </CardContent>
                </Card>

                {/* Impact Information */}
                <Card className="mt-10 bg-gradient-to-br from-green-50 to-emerald-50">
                  <CardContent className="p-10">
                    <h4 className="font-bold text-gray-900 text-lg mb-6">Your Impact</h4>
                    <div className="space-y-4 text-sm text-gray-600">
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>$25 provides leadership materials for one youth</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>$50 sponsors a youth for a community service project</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>$100 funds a leadership workshop for 10 participants</span>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <span>$250 supports a full leadership development program</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Enhanced Recent Donations */}
              <div>
                <h3 className="text-3xl font-bold text-gray-900 mb-10">Recent Supporters</h3>
                <div className="space-y-8">
                  {donations.map((donation) => (
                    <Card
                      key={donation.id}
                      variant="gradient"
                      className="group hover:scale-105 transition-all duration-300"
                    >
                      <CardContent className="p-8">
                        <div className="flex justify-between items-start mb-6">
                          <div>
                            <h4 className="font-bold text-gray-900 text-lg">{donation.name}</h4>
                            <p className="text-sm text-green-600 font-medium">{donation.type} Donor</p>
                          </div>
                          <div className="text-right">
                            <span className="text-2xl font-bold text-green-600">${donation.amount}</span>
                          </div>
                        </div>
                        <p className="text-gray-600 mb-6 leading-relaxed italic">"{donation.reason}"</p>
                        <p className="text-xs text-gray-500">{donation.date}</p>
                      </CardContent>
                    </Card>
                  ))}
                </div>

                {donations.length === 0 && (
                  <Card className="text-center py-16">
                    <CardContent>
                      <Heart className="h-20 w-20 text-gray-300 mx-auto mb-8" />
                      <h4 className="text-xl font-semibold text-gray-900 mb-3">Be the First Supporter!</h4>
                      <p className="text-gray-500">Your donation will help us launch our next program.</p>
                    </CardContent>
                  </Card>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Enhanced Footer */}
      <footer className="bg-gradient-to-r from-gray-900 to-slate-900 text-white py-20">
        <div className="container mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-12 mb-16">
            <div className="space-y-6">
              <div className="flex items-center space-x-4">
                <Image
                  src="/framework4future-logo.jpeg"
                  alt="Framework 4 Future Logo"
                  width={60}
                  height={40}
                  className="rounded-lg"
                />
              </div>
              <p className="text-gray-300 text-sm leading-relaxed">
                Empowering the next generation of leaders through transformative programs and community engagement.
              </p>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Quick Links</h4>
              <div className="space-y-3">
                {["About", "Programs", "Blogs", "Contact"].map((link) => (
                  <button
                    key={link}
                    onClick={() => scrollToSection(link.toLowerCase())}
                    className="block text-gray-300 hover:text-white transition-colors duration-200 text-sm"
                  >
                    {link}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Programs</h4>
              <div className="space-y-3">
                {programs.map((program) => (
                  <div key={program.id} className="text-gray-300 text-sm">
                    {program.name}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h4 className="font-bold text-lg mb-6">Connect</h4>
              <div className="space-y-4">
                <div className="flex items-center gap-4">
                  <Phone className="h-4 w-4 text-indigo-400" />
                  <span className="text-gray-300 text-sm">+704-454-8936</span>
                </div>
                <div className="flex items-center gap-4">
                  <Mail className="h-4 w-4 text-indigo-400" />
                  <span className="text-gray-300 text-sm">framework4future@gmail.com</span>
                </div>
                <div className="flex items-center gap-4">
                  <MapPin className="h-4 w-4 text-indigo-400" />
                  <span className="text-gray-300 text-sm">Waxhaw, NC</span>
                </div>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-700 pt-10 text-center">
            <p className="text-gray-400 text-sm">
              © 2024 Framework 4 Future. All rights reserved. Built with ❤️ for the next generation of leaders.
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Styles */}
      <style jsx>{`
        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }
        @keyframes spin-slow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        @keyframes spin-reverse {
          from { transform: rotate(360deg); }
          to { transform: rotate(0deg); }
        }
        .animate-float {
          animation: float 6s ease-in-out infinite;
        }
        .animate-spin-slow {
          animation: spin-slow 20s linear infinite;
        }
        .animate-spin-reverse {
          animation: spin-reverse 15s linear infinite;
        }
        .bg-grid-pattern {
          background-image: radial-gradient(circle, #e5e7eb 1px, transparent 1px);
          background-size: 20px 20px;
        }
      `}</style>
    </div>
  )
}
