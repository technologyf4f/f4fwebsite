"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { UserCircle, Plus, ArrowLeft, Clock, Calendar } from "lucide-react"
import { CreateBlogDialog } from "@/components/create-blog-dialog"

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
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const handleCreateBlog = (newBlog: Omit<Blog, "id">) => {
    const blog: Blog = {
      ...newBlog,
      id: Date.now().toString(),
    }
    setBlogs((prev) => [blog, ...prev])
    setIsCreateDialogOpen(false)
  }

  const allCategories = Array.from(new Set(blogs.flatMap((blog) => blog.categories))).sort()

  const filteredBlogs = activeCategory ? blogs.filter((blog) => blog.categories.includes(activeCategory)) : blogs

  const featuredBlog = blogs.find((blog) => blog.featured)

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-6 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded">
                  <div className="w-6 h-6 border-2 border-white"></div>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  <div>FRAMEWORK</div>
                  <div>4 FUTURE</div>
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center space-x-8 ml-16">
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About Us
              </Link>
              <Link href="/programs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Programs
              </Link>
              <Link href="/blogs" className="text-blue-600 font-medium">
                Blogs
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact Us
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="default" className="hidden lg:inline-flex bg-green-600 hover:bg-green-700">
                Donate
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Blogs Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Blog</h1>
                <p className="text-gray-600 mt-2">Insights and stories from our youth leadership community</p>
              </div>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-indigo-700 hover:bg-indigo-800">
              <Plus className="h-4 w-4 mr-2" />
              Create Blog Post
            </Button>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-4 overflow-x-auto">
          <div className="flex gap-2">
            <Button
              variant={activeCategory === null ? "default" : "outline"}
              size="sm"
              onClick={() => setActiveCategory(null)}
              className={activeCategory === null ? "bg-indigo-700 hover:bg-indigo-800" : ""}
            >
              All
            </Button>
            {allCategories.map((category) => (
              <Button
                key={category}
                variant={activeCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setActiveCategory(category)}
                className={activeCategory === category ? "bg-indigo-700 hover:bg-indigo-800" : ""}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Blog */}
      {featuredBlog && (
        <section className="container mx-auto px-4 py-8">
          <h2 className="text-2xl font-bold mb-6">Featured Post</h2>
          <Card className="overflow-hidden hover:shadow-lg transition-shadow">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="aspect-video relative">
                <Image
                  src={featuredBlog.image || "/placeholder.svg"}
                  alt={featuredBlog.title}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-6">
                <div className="flex gap-2 mb-4">
                  {featuredBlog.categories.map((category) => (
                    <Badge key={category} variant="secondary">
                      {category}
                    </Badge>
                  ))}
                </div>
                <h3 className="text-2xl font-bold mb-2">{featuredBlog.title}</h3>
                <p className="text-gray-600 mb-4">{featuredBlog.excerpt}</p>
                <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{featuredBlog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{featuredBlog.readingTime}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 mb-6">
                  <div className="w-8 h-8 bg-gray-300 rounded-full"></div>
                  <span className="font-medium">{featuredBlog.author}</span>
                </div>
                <Button className="bg-indigo-700 hover:bg-indigo-800">Read More</Button>
              </div>
            </div>
          </Card>
        </section>
      )}

      {/* Blogs Grid */}
      <section className="container mx-auto px-4 py-8">
        <h2 className="text-2xl font-bold mb-6">Latest Posts</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBlogs.map((blog) => (
            <Card key={blog.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image src={blog.image || "/placeholder.svg"} alt={blog.title} fill className="object-cover" />
              </div>
              <CardHeader>
                <div className="flex gap-2 mb-2">
                  {blog.categories.map((category) => (
                    <Badge key={category} variant="outline">
                      {category}
                    </Badge>
                  ))}
                </div>
                <CardTitle className="text-xl">{blog.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{blog.excerpt}</p>
              </CardContent>
              <CardFooter className="flex flex-col items-start gap-4">
                <div className="flex items-center justify-between w-full text-sm text-gray-500">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-4 w-4" />
                    <span>{blog.date}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-4 w-4" />
                    <span>{blog.readingTime}</span>
                  </div>
                </div>
                <div className="flex items-center justify-between w-full">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 bg-gray-300 rounded-full"></div>
                    <span className="text-sm">{blog.author}</span>
                  </div>
                  <Button variant="outline" size="sm">
                    Read More
                  </Button>
                </div>
              </CardFooter>
            </Card>
          ))}
        </div>

        {filteredBlogs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No blog posts found</h3>
            <p className="text-gray-600 mb-6">
              {activeCategory
                ? `No posts in the "${activeCategory}" category. Try another category or create a new post.`
                : "Create your first blog post to get started!"}
            </p>
            <div className="flex justify-center gap-4">
              {activeCategory && (
                <Button variant="outline" onClick={() => setActiveCategory(null)}>
                  View All Posts
                </Button>
              )}
              <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-indigo-700 hover:bg-indigo-800">
                <Plus className="h-4 w-4 mr-2" />
                Create Blog Post
              </Button>
            </div>
          </div>
        )}
      </section>

      <CreateBlogDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateBlog={handleCreateBlog}
      />
    </div>
  )
}
