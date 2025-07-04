"use client"

import { useState } from "react"
import { BlogsSection } from "@/components/blogs-section"

interface Blog {
  id: string
  title: string
  content: string
  excerpt: string
  image: string
  date: string
  author: string
  readingTime: string
  categories: string[]
  featured: boolean
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([
    {
      id: "1",
      title: "Youth Leadership in the Digital Age",
      excerpt: "Exploring how young leaders are leveraging technology to create positive change in their communities.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      image: "/placeholder.svg?height=300&width=400",
      date: "June 2, 2024",
      author: "Maria Rodriguez",
      readingTime: "5 min read",
      categories: ["Leadership", "Technology"],
      featured: true,
    },
    {
      id: "2",
      title: "Building Inclusive Communities Through Service",
      excerpt: "How community service projects are bringing diverse groups together to solve local challenges.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      image: "/placeholder.svg?height=300&width=400",
      date: "May 15, 2024",
      author: "James Washington",
      readingTime: "7 min read",
      categories: ["Community", "Inclusion"],
      featured: false,
    },
    {
      id: "3",
      title: "The Future of Civic Engagement",
      excerpt: "New approaches to engaging young people in democratic processes and community decision-making.",
      content:
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl. Sed euismod, nisl vel ultricies lacinia, nisl nisl aliquam nisl, eu aliquam nisl nisl eu nisl.",
      image: "/placeholder.svg?height=300&width=400",
      date: "April 28, 2024",
      author: "Sophia Chen",
      readingTime: "6 min read",
      categories: ["Civic Engagement", "Democracy"],
      featured: false,
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateBlog = (newBlog: Omit<Blog, "id">) => {
    const blog: Blog = {
      ...newBlog,
      id: Date.now().toString(),
    }
    setBlogs((prev) => [blog, ...prev])
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
      {/* Hero Section */}
      <section className="py-20 bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Our Blog</h1>
          <p className="text-xl max-w-3xl mx-auto opacity-90">
            Explore stories, insights, and updates from our community of young leaders who are making a positive impact
            in their communities and beyond.
          </p>
        </div>
      </section>

      {/* Blogs Section with Category Filter */}
      <section className="container mx-auto px-6 py-20">
        <BlogsSection
          showCategoryFilter={true}
          blogs={blogs}
          onCreateBlog={handleCreateBlog}
          isCreateDialogOpen={isCreateDialogOpen}
          setIsCreateDialogOpen={setIsCreateDialogOpen}
        />
      </section>
    </div>
  )
}
