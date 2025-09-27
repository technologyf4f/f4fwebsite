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
import { useRouter } from "next/navigation"

export default function HomePage() {
  const [showCreateBlog, setShowCreateBlog] = useState(false)
  const [showCreateEvent, setShowCreateEvent] = useState(false)
  const router = useRouter()

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

  const handleCreateEvent = async (
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
            <h1 className="text-6xl font-bold mb-8 leading-tight">            
              Empowering Tomorrow's Leaders
            </h1>
            <p className="text-2xl mb-12 opacity-90 leading-relaxed">
              We help develop next generation of youth leaders through intentional and impactful collaboration,
              civic engagement and service projects at the local, regional and national level, while creating pathways
              for leadership development.
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button
                size="lg"
                onClick={() => { router.push("/register") }}
                className="bg-white text-indigo-600 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Join Our Community
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                onClick={() => { router.push("/our-story") }}
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

      {/* About Section */}
      <section id="about" className="container mx-auto px-6 py-20 bg-gradient-to-br from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="pb-2 text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
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
              onClick={() => { router.push("/register") }}
              className="bg-white text-gray-900 hover:bg-gray-100 px-8 py-4 text-lg font-semibold rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              Join Our Community
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button
              size="lg"
              variant="outline"
              onClick={() => { router.push("/our-story") }}
              className="border-white text-white hover:bg-white hover:text-gray-900 px-8 py-4 text-lg font-semibold rounded-2xl transition-all duration-300 bg-transparent"
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
      

      {/* Dialogs */}
      {/*
      <CreateBlogDialog open={showCreateBlog} onOpenChange={setShowCreateBlog} onCreateBlog={handleCreateBlog} />
      <CreateProgramDialog
        open={showCreateEvent}
        onOpenChange={setShowCreateEvent}
        onCreateProgram={handleCreateEvent}
      />
      */}
    </div>
  )
}
