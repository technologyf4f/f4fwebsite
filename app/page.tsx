"use client"

import type React from "react"
import type { ReactNode } from "react"
import Image from "next/image"
import { useState } from "react"

import { EventsSection } from "@/components/events-section"
import { BlogsSection } from "@/components/blogs-section"

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
    lg: "h-14 px-8 text-lg",
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
  <div
    className={`rounded-2xl border border-gray-100 bg-white text-card-foreground shadow-lg hover:shadow-xl transition-all duration-300 ${className}`}
  >
    {children}
  </div>
)

const CardHeader = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`flex flex-col space-y-2 p-8 ${className}`}>{children}</div>
)

const CardTitle = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <h3 className={`text-2xl font-bold leading-tight tracking-tight text-gray-900 ${className}`}>{children}</h3>
)

const CardContent = ({ children, className = "" }: { children: ReactNode; className?: string }) => (
  <div className={`p-8 pt-0 ${className}`}>{children}</div>
)

const Input = ({ className = "", ...props }: { className?: string; [key: string]: any }) => (
  <input
    className={`flex h-12 w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:border-indigo-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
    {...props}
  />
)

const Textarea = ({ className = "", ...props }: { className?: string; [key: string]: any }) => (
  <textarea
    className={`flex min-h-[120px] w-full rounded-xl border-2 border-gray-200 bg-white px-4 py-3 text-sm ring-offset-background placeholder:text-gray-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500 focus-visible:ring-offset-2 focus-visible:border-indigo-300 disabled:cursor-not-allowed disabled:opacity-50 transition-all duration-200 ${className}`}
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
    className={`text-sm font-semibold leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 ${className}`}
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

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Hero Section */}
      <section id="home" className="relative min-h-screen overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="grid grid-cols-4 h-full">
            <div className="bg-gradient-to-br from-red-500 to-red-600"></div>
            <div className="bg-gradient-to-br from-green-400 to-emerald-500"></div>
            <div className="bg-gradient-to-br from-orange-400 to-amber-500"></div>
            <div className="bg-gradient-to-br from-blue-500 to-indigo-600"></div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-20 md:py-32 relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="bg-white/95 backdrop-blur-sm p-8 md:p-12 rounded-3xl shadow-2xl border border-white/20">
              <p className="text-gray-600 mb-8 leading-relaxed text-lg">
                We help develop next generation of youth leaders through intentional and impactful collaboration, civic
                engagement and service projects at the local, regional and national level, while creating pathways for
                leadership development.
              </p>

              <h1 className="text-4xl md:text-6xl font-bold text-gray-900 leading-tight mb-10 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                Helping youth lead community engagement in the Carolinas.
              </h1>

              <div className="flex flex-col sm:flex-row gap-6">
                <Button
                  onClick={() => scrollToSection("events")}
                  size="lg"
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 shadow-xl hover:shadow-2xl transform hover:scale-105"
                >
                  Become a member
                </Button>
              </div>
            </div>

            <div className="hidden md:grid grid-cols-2 gap-6">
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Youth+Leaders"
                  alt="Youth leaders"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Community+Service"
                  alt="Community service"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
                <Image
                  src="/placeholder.svg?height=300&width=300&text=Leadership+Workshop"
                  alt="Leadership workshop"
                  fill
                  className="object-cover"
                />
              </div>
              <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 rounded-3xl overflow-hidden relative shadow-xl hover:shadow-2xl transition-all duration-300 transform hover:scale-105">
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
      <section id="about" className="container mx-auto px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Founder's Message
            </h2>
            <p className="text-gray-600 text-lg">Learn more about our mission and impact</p>
            <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-8 rounded-full"></div>
          </div>

          {/* Mission Statement */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-16 border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Our Mission</h3>
            <p className="text-xl text-gray-700 leading-relaxed">
              We help develop next generation of youth leaders through intentional and impactful collaboration, civic
              engagement and service projects at the local, regional and national level, while creating pathways for
              leadership development.
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-3xl shadow-xl p-10 mb-16 border border-gray-100">
            <h3 className="text-3xl font-bold text-gray-900 mb-8">Watch Our Story</h3>
            <div className="aspect-video w-full rounded-2xl overflow-hidden shadow-lg">
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
          <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl p-10">
            <h3 className="text-3xl font-bold mb-10 text-center">Our Impact</h3>
            <div className="grid md:grid-cols-3 gap-10 text-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl font-bold mb-3">500+</div>
                <div className="text-indigo-100 text-lg">Youth Leaders Trained</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl font-bold mb-3">50+</div>
                <div className="text-indigo-100 text-lg">Community Projects</div>
              </div>
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8">
                <div className="text-5xl font-bold mb-3">25+</div>
                <div className="text-indigo-100 text-lg">Partner Organizations</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section id="events" className="container mx-auto px-6 py-20">
        <EventsSection limit={3} showMoreButton={true} />
      </section>

      {/* Blogs Section */}
      <section id="blogs" className="container mx-auto px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <BlogsSection limit={3} showMoreButton={true} />
      </section>

      {/* Contact Section */}
      <section id="contact-us" className="container mx-auto px-6 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Contact Us
          </h2>
          <p className="text-gray-600 text-lg">Get in touch with our team</p>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-8 rounded-full"></div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Contact Information */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-10">Get in Touch</h3>
              <div className="space-y-8 mb-10">
                <Card>
                  <CardContent className="p-8">
                    <div className="flex items-center gap-6">
                      <div className="w-16 h-16 bg-gradient-to-r from-green-400 to-emerald-500 rounded-2xl flex items-center justify-center shadow-lg">
                        <Mail className="h-8 w-8 text-white" />
                      </div>
                      <div>
                        <h4 className="font-bold text-gray-900 text-lg mb-2">Email</h4>
                        <a
                          href="mailto:framework4future@gmail.com"
                          className="text-indigo-600 hover:text-indigo-800 font-semibold transition-colors"
                        >
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
                  <CardTitle className="text-2xl">Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleContactSubmit} className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">First Name</Label>
                        <Input
                          id="firstName"
                          value={contactForm.firstName}
                          onChange={(e) => setContactForm({ ...contactForm, firstName: e.target.value })}
                          placeholder="Your first name"
                          required
                        />
                      </div>
                      <div className="space-y-2">
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
                    <div className="space-y-2">
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
                    <div className="space-y-2">
                      <Label htmlFor="subject">Subject</Label>
                      <Input
                        id="subject"
                        value={contactForm.subject}
                        onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                        placeholder="What is this regarding?"
                        required
                      />
                    </div>
                    <div className="space-y-2">
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
                    <Button type="submit" className="w-full" size="lg">
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
      <section id="donate" className="container mx-auto px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
            Support Our Mission
          </h2>
          <p className="text-gray-600 text-lg">Help us empower the next generation of leaders</p>
          <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-8 rounded-full"></div>
        </div>

        {/* Impact Stats */}
        <div className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white rounded-3xl shadow-xl p-10 mb-16">
          <div className="grid md:grid-cols-3 gap-10 text-center">
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Heart className="h-16 w-16 mb-6" />
              <div className="text-4xl font-bold mb-3">${totalDonations.toLocaleString()}</div>
              <div className="text-indigo-100 text-lg">Total Raised</div>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Users className="h-16 w-16 mb-6" />
              <div className="text-4xl font-bold mb-3">{donations.length}</div>
              <div className="text-indigo-100 text-lg">Generous Donors</div>
            </div>
            <div className="flex flex-col items-center bg-white/10 backdrop-blur-sm rounded-2xl p-8">
              <Target className="h-16 w-16 mb-6" />
              <div className="text-4xl font-bold mb-3">500+</div>
              <div className="text-indigo-100 text-lg">Youth Impacted</div>
            </div>
          </div>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-16">
            {/* Donation Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-3 text-2xl">
                    <Heart className="h-6 w-6 text-red-500" />
                    Make a Donation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleDonationSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="donorName">Your Name</Label>
                      <Input
                        id="donorName"
                        value={donationForm.name}
                        onChange={(e) => setDonationForm({ ...donationForm, name: e.target.value })}
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="space-y-2">
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
                      <div className="grid grid-cols-4 gap-3 mt-4">
                        {[25, 50, 100, 250].map((preset) => (
                          <Button
                            key={preset}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setDonationForm({ ...donationForm, amount: preset.toString() })}
                            className="rounded-xl"
                          >
                            ${preset}
                          </Button>
                        ))}
                      </div>
                    </div>
                    <div className="space-y-2">
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
                      className="w-full bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700"
                      size="lg"
                    >
                      Donate ${donationForm.amount || "0"}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>

            {/* Recent Donations */}
            <div>
              <h3 className="text-3xl font-bold text-gray-900 mb-8">Recent Donations</h3>
              <div className="space-y-6">
                {donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start mb-3">
                        <h4 className="font-bold text-gray-900 text-lg">{donation.name}</h4>
                        <span className="text-2xl font-bold text-green-600">${donation.amount}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-3 italic">"{donation.reason}"</p>
                      <p className="text-xs text-gray-500 font-medium">{donation.date}</p>
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
