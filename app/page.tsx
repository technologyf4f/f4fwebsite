"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CreateBlogDialog } from "@/components/create-blog-dialog"
import { CreateProgramDialog } from "@/components/create-program-dialog"
import { BlogsSection } from "@/components/blogs-section"
import { EventsSection } from "@/components/events-section"
import { createBlog } from "@/lib/blogs-api"
import { createEvent } from "@/lib/events-api"
import { Users, Heart, Target, Award, ArrowRight, BookOpen, Plus } from "lucide-react"

export default function HomePage() {
  const [showCreateBlog, setShowCreateBlog] = useState(false)
  const [showCreateProgram, setShowCreateProgram] = useState(false)

  const handleCreateBlog = async (
    blog: {
      title: string
      content: string
      date: string
      author: string
      category_id?: string
    },
    imageFile?: File,
  ) => {
    try {
      await createBlog(blog, imageFile)
      setShowCreateBlog(false)
      alert("Blog post created successfully!")
      // Refresh the page to show the new blog
      window.location.reload()
    } catch (error) {
      console.error("Failed to create blog:", error)
      alert("Failed to create blog post. Please try again.")
    }
  }

  const handleCreateProgram = async (
    program: {
      name: string
      description: string
      date: string
      signUpUrl?: string
    },
    imageFile?: File,
  ) => {
    try {
      await createEvent(program, imageFile)
      setShowCreateProgram(false)
      alert("Program created successfully!")
      // Refresh the page to show the new program
      window.location.reload()
    } catch (error) {
      console.error("Failed to create program:", error)
      alert("Failed to create program. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="relative py-32 bg-gradient-to-r from-indigo-600 via-purple-600 to-pink-500 text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <Badge className="mb-6 bg-white/20 text-white border-white/30 px-6 py-2 text-lg font-semibold rounded-full">
              Empowering Tomorrow's Leaders
            </Badge>
            <h1 className="text-6xl font-bold mb-8 leading-tight">
              Building a Future
              <span className="block bg-gradient-to-r from-yellow-300 to-orange-300 bg-clip-text text-transparent">
                For Everyone
              </span>
            </h1>
            <p className="text-2xl mb-12 opacity-90 leading-relaxed">
              Join our community of young leaders dedicated to creating positive change through civic engagement,
              leadership development, and community service.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Get Involved
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-indigo-600 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 bg-transparent"
              >
                Learn More
              </Button>
            </div>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-gray-50 to-transparent"></div>
      </section>

      {/* Mission Section */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">Our Mission</h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We believe in the power of young people to create meaningful change in their communities and beyond.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: Users,
                title: "Community Building",
                description: "Connecting young leaders across diverse backgrounds and experiences.",
              },
              {
                icon: Heart,
                title: "Service Learning",
                description: "Combining community service with educational experiences.",
              },
              {
                icon: Target,
                title: "Civic Engagement",
                description: "Encouraging active participation in democratic processes.",
              },
              {
                icon: Award,
                title: "Leadership Development",
                description: "Building skills and confidence for tomorrow's leaders.",
              },
            ].map((item, index) => (
              <Card
                key={index}
                className="text-center hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg rounded-3xl hover:scale-105"
              >
                <CardHeader className="pb-4">
                  <div className="mx-auto w-16 h-16 bg-gradient-to-r from-indigo-500 to-purple-500 rounded-2xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300">
                    <item.icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">{item.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{item.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Our Impact</h2>
            <p className="text-xl opacity-90">Making a difference, one community at a time.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { number: "500+", label: "Young Leaders Engaged" },
              { number: "50+", label: "Community Projects" },
              { number: "10,000+", label: "Lives Impacted" },
            ].map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-5xl font-bold mb-2">{stat.number}</div>
                <div className="text-xl opacity-90">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Events Section */}
      <EventsSection limit={3} showViewAll={true} />

      {/* Blog Section */}
      <BlogsSection limit={3} showViewAll={true} />

      {/* Call to Action */}
      <section className="py-20 bg-gradient-to-r from-gray-900 to-indigo-900 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-12 opacity-90 max-w-2xl mx-auto">
            Join our community of young leaders and start creating positive change in your community today.
          </p>
          <div className="flex flex-col sm:flex-row gap-6 justify-center">
            <Button
              size="lg"
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 bg-transparent"
            >
              Learn More About Us
            </Button>
          </div>
        </div>
      </section>

      {/* Floating Action Buttons */}
      <div className="fixed bottom-6 right-6 flex flex-col gap-3 z-50">
        <Button
          onClick={() => setShowCreateBlog(true)}
          className="bg-indigo-600 hover:bg-indigo-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          title="Create Blog Post"
        >
          <BookOpen className="h-5 w-5" />
        </Button>
        <Button
          onClick={() => setShowCreateProgram(true)}
          className="bg-purple-600 hover:bg-purple-700 text-white rounded-full p-4 shadow-lg hover:shadow-xl transition-all duration-300"
          title="Create Program"
        >
          <Plus className="h-5 w-5" />
        </Button>
      </div>

      {/* Dialogs */}
      <CreateBlogDialog open={showCreateBlog} onOpenChange={setShowCreateBlog} onCreateBlog={handleCreateBlog} />
      <CreateProgramDialog
        open={showCreateProgram}
        onOpenChange={setShowCreateProgram}
        onCreateProgram={handleCreateProgram}
      />
    </div>
  )
}
