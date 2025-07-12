"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BlogCard } from "@/components/blog-card"
import { getBlogs, getBlogCategories, type Blog, type BlogCategory } from "@/lib/blogs-api"
import { Loader2, Filter } from "lucide-react"

interface BlogsSectionProps {
  limit?: number
  showViewAll?: boolean
  showCategoryFilter?: boolean
}

export function BlogsSection({ limit, showMoreButton = false, showViewAll = false, showCategoryFilter = false }: BlogsSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    loadBlogs()
    if (showCategoryFilter) {
      loadCategories()
    }
  }, [selectedCategory, showCategoryFilter])

  const loadBlogs = async () => {
    setIsLoading(true)
    try {
      const blogsData = await getBlogs(selectedCategory === "all" ? undefined : selectedCategory)
      setBlogs(blogsData)
    } catch (error) {
      console.error("Failed to load blogs:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const loadCategories = async () => {
    try {
      const categoriesData = await getBlogCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error("Failed to load categories:", error)
    }
  }

  const displayedBlogs = limit ? blogs.slice(0, limit) : blogs

  const handleViewMore = () => {
    router.push("/blogs")
  }

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          Our Blogs
        </h2>
        <p className="text-gray-600 text-lg">Discover insights, stories, and updates from our community of young leaders making a difference.</p>
        <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {displayedBlogs.map((blog) => (
                <BlogCard key={blog.id} blog={blog} />
              ))}
            </div>

            {displayedBlogs.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 text-lg">
                  {selectedCategory !== "all"
                    ? "No blog posts found in this category."
                    : "No blog posts available yet."}
                </p>
              </div>
            )}

            {showViewAll && blogs.length > (limit || 0) && (
              <div className="text-center">
                <Button
                  asChild
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 py-3 rounded-2xl font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
                >
                  <a href="/blogs">View All Blog Posts</a>
                </Button>
              </div>
            )}
          </>
      )}

      {/* More Button */}
      
            <div className="text-center">
              <Button
                onClick={handleViewMore}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3"
              >
                View All Blogs
              </Button>
            </div>      
    </div>
  )
}
