"use client"

import { CardFooter } from "@/components/ui/card"

import type React from "react"
import type { ReactNode } from "react"
import Image from "next/image"
import { useState, useEffect } from "react"

import { getEvents, type Event } from "@/lib/events-api"
import { getBlogs, type Blog } from "@/lib/blogs-api"

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

const Card = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`}>{children}</div>
)

const CardHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-semibold leading-none tracking-tight ${className}`}>{children}</h3>
)

const CardContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex items-center p-6 pt-0 ${className}`}>{children}</div>
)

const Input = ({ className = "", ...props }: { className?: string; [key: string]: any }) => (
  <input
    className={`flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Textarea = ({ className = "", ...props }: { className?: string; [key: string]: any }) => (
  <textarea
    className={`flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 ${className}`}
    {...props}
  />
)

const Label = ({
  children,
  htmlFor,
  className = "",
}: { children: ReactNode; htmlFor?: string; className?: string }) => (
  <label
    htmlFor={htmlFor}
    className={`text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 ${className}`}
  >
    {children}
  </label>
)

// Inline Icons
const Heart = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M4.318 6.318a4 4 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
    />
  </svg>
)

const Users = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a4 4 0 11-8 0 4 4 0 018 0z"
    />
  </svg>
)

const Target = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
    />
  </svg>
)

const Mail = ({ className = "" }: { className?: string }) => (
  <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path
      strokeLinecap="round"
      strokeLinejoin="round"
      strokeWidth={2}
      d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
    />
  </svg>
)

// Main Component
export default function Home() {
  // State Management
  const [programs, setPrograms] = useState<Event[]>([])
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [isLoadingPrograms, setIsLoadingPrograms] = useState(true)
  const [isLoadingBlogs, setIsLoadingBlogs] = useState(true)

  const [donations] = useState([
    {
      id: "1",
      name: "Sarah Johnson",
      amount: 100,
      reason: "Supporting youth leadership development in my community",
      date: "June 5, 2024",
    },
    {
      id: "2",
      name: "Michael Chen",
      amount: 250,
      reason: "Believe in empowering the next generation of leaders",
      date: "June 3, 2024",
    },
  ])

  const [contactForm, setContactForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  })

  const [donationForm, setDonationForm] = useState({
    name: "",
    amount: "",
    reason: "",
  })

  // Load data from Supabase on component mount
  useEffect(() => {
    loadPrograms()
    loadBlogs()
  }, [])

  // Replace the loadPrograms function:
  const loadPrograms = async () => {
    setIsLoadingPrograms(true)
    try {
      const eventsData = await getEvents()
      setPrograms(eventsData)
    } catch (error) {
      console.error("Failed to load events:", error)
    } finally {
      setIsLoadingPrograms(false)
    }
  }

  // Replace the loadBlogs function:
  const loadBlogs = async () => {
    setIsLoadingBlogs(true)
    try {
      const blogsData = await getBlogs()
      setBlogs(blogsData)
    } catch (error) {
      console.error("Failed to load blogs:", error)
    } finally {
      setIsLoadingBlogs(false)
    }
  }

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

  const scrollToSection = (sectionId: string) => {
    if (typeof window !== "undefined") {
      document.getElementById(sectionId)?.scrollIntoView({ behavior: "smooth" })
    }
  }

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your message! We'll get back to you soon.")
    setContactForm({ firstName: "", lastName: "", email: "", subject: "", message: "" })
  }

  const handleDonationSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Thank you for your donation! In a real application, this would redirect to a secure payment processor.")
    setDonationForm({ name: "", amount: "", reason: "" })
  }

  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-4 h-full">
            <div className="bg-red-600"></div>
            <div className="bg-green-400"></div>
            <div className="bg-orange-400"></div>
            <div className="bg-blue-500"></div>
          </div>
        </div>

        <div className="container mx-auto px-4 py-16 md:py-24 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="bg-white/95 p-6 md:p-8 rounded-lg shadow-lg">
              <p className="text-gray-700 mb-6 leading-relaxed">
                We help develop next generation of youth leaders through intentional and impactful collaboration, civic
                engagement and service projects at the local, regional and national level, while creating pathways for
                leadership development.
              </p>

              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight mb-8">
                Helping youth lead community engagement in the Carolinas.
              </h1>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  onClick={() => scrollToSection("events")}
                  className="bg-indigo-700 hover:bg-indigo-800 text-white px-8 py-6 text-lg rounded-md"
                >
                  Become a member
                </Button>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-4">
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Youth+Leaders"
                  alt="Youth leaders"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Community+Service"
                  alt="Community service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Leadership+Workshop"
                  alt="Leadership workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Civic+Engagement"
                  alt="Civic engagement"
                  fill
                  className="object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="about" className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Founder's Message</h2>
            <p className="text-gray-600">Learn more about our mission and impact</p>
            <div className="h-1 w-32 bg-indigo-700 mx-auto mt-6 rounded-full"></div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h3>
            <p className="text-lg text-gray-700 leading-relaxed">
              We help develop next generation of youth leaders through intentional and impactful collaboration, civic
              engagement and service projects at the local, regional and national level, while creating pathways for
              leadership development.
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Watch Our Story</h3>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/j_o_OkOQBeo"
                title="Framework 4 Future Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-indigo-700 text-white rounded-lg shadow-lg p-8">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-indigo-200">Youth Leaders Trained</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-indigo-200">Community Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-indigo-200">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Programs Section */}
      <section id="events" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Events</h2>
          <p className="text-gray-600">Empowering youth through leadership and community engagement events</p>
          <div className="h-1 w-32 bg-indigo-700 mx-auto mt-6 rounded-full"></div>
        </div>

        {isLoadingPrograms ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {programs.map((program) => (
              <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={program.image || "/placeholder.svg"} alt={program.name} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{program.name}</CardTitle>
                  <p className="text-sm text-gray-500">{formatDateForDisplay(program.date)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{program.description}</p>
                  <Button variant="outline" className="w-full">
                    Learn More
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Our Blog</h2>
          <p className="text-gray-600">Insights and stories from our youth leadership community</p>
          <div className="h-1 w-32 bg-indigo-700 mx-auto mt-6 rounded-full"></div>
        </div>

        {isLoadingBlogs ? (
          <div className="flex justify-center py-8">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-indigo-700"></div>
          </div>
        ) : (
          <div className="grid md:grid-cols-2 gap-6">
            {blogs.map((blog) => (
              <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="aspect-video relative">
                  <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
                </div>
                <CardHeader>
                  <CardTitle className="text-xl">{blog.title}</CardTitle>
                  <p className="text-sm text-gray-500">{formatDateForDisplay(blog.date)}</p>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 mb-4">{blog.content.substring(0, 150)}...</p>
                </CardContent>
                <CardFooter className="flex justify-between items-center">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">{blog.author}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Contact Us</h2>
          <p className="text-gray-600">Get in touch with our team</p>
          <div className="h-1 w-32 bg-indigo-700 mx-auto mt-6 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h3>
              <div className="space-y-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h4 className="font-semibold text-gray-900">Email</h4>
                        <a href="mailto:framework4future@gmail.com" className="text-green-600 hover:text-green-800">
                          framework4future@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
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
                    <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Donate Section */}
      <section id="donate" className="container mx-auto px-4 py-16 bg-gray-50">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold mb-4">Support Our Mission</h2>
          <p className="text-gray-600">Help us empower the next generation of leaders</p>
          <div className="h-1 w-32 bg-indigo-700 mx-auto mt-6 rounded-full"></div>
        </div>

        {/* Impact Stats */}
        <div className="bg-indigo-700 text-white rounded-lg shadow-lg p-8 mb-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Heart className="h-12 w-12 mb-4" />
              <div className="text-3xl font-bold mb-2">${totalDonations.toLocaleString()}</div>
              <div className="text-indigo-200">Total Raised</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 mb-4" />
              <div className="text-3xl font-bold mb-2">{donations.length}</div>
              <div className="text-indigo-200">Generous Donors</div>
            </div>
            <div className="flex flex-col items-center">
              <Target className="h-12 w-12 mb-4" />
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-indigo-200">Youth Impacted</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Make a Donation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="donorName">Your Name</Label>
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
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {[25, 50, 100, 250].map((preset) => (
                          <Button
                            key={preset}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setDonationForm({ ...donationForm, amount: preset.toString() })}
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
                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                      Donate ${donationForm.amount || "0"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Recent Donations */}
            <div>
              <h3 className="text-2xl font-bold text-gray-900 mb-6">Recent Donations</h3>
              <div className="space-y-4">
                {donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h4 className="font-semibold text-gray-900">{donation.name}</h4>
                        <span className="text-lg font-bold text-green-600">${donation.amount}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">"{donation.reason}"</p>
                      <p className="text-xs text-gray-500">{donation.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
