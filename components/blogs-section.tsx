"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { BlogCard } from "./blog-card"
import { getBlogs, getBlogCategories, type Blog, type BlogCategory } from "@/lib/blogs-api"

interface BlogsSectionProps {
  limit?: number
  showMoreButton?: boolean
  showCategoryFilter?: boolean
  title?: string
  description?: string
}

export function BlogsSection({
  limit,
  showMoreButton = false,
  showCategoryFilter = false,
  title = "Our Blog",
  description = "Insights and stories from our youth leadership community",
}: BlogsSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("")
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadData()
  }, [selectedCategory])

  const loadData = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const [blogsData, categoriesData] = await Promise.all([
        getBlogs(selectedCategory || undefined),
        showCategoryFilter ? getBlogCategories() : Promise.resolve([]),
      ])

      let displayBlogs = blogsData
      if (limit) {
        displayBlogs = blogsData.slice(0, limit)
      }

      setBlogs(displayBlogs)
      setCategories(categoriesData)
    } catch (error) {
      console.error("Failed to load blogs:", error)
      setError("Failed to load blog posts. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleCategoryChange = (value: string) => {
    setSelectedCategory(value === "all" ? "" : value)
  }

  const handleViewMore = () => {
    router.push("/blogs")
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Blogs</h3>
        <p className="text-gray-600 mb-8">{error}</p>
        <Button
          onClick={loadData}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 text-lg">{description}</p>
        <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Category Filter */}
      {showCategoryFilter && categories.length > 0 && (
        <div className="mb-12 flex justify-center">
          <div className="w-full max-w-xs">
            <Select value={selectedCategory || "all"} onValueChange={handleCategoryChange}>
              <SelectTrigger className="rounded-xl border-2 border-gray-200 h-12 font-semibold">
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent className="rounded-xl">
                <SelectItem value="all" className="font-semibold">
                  All Categories
                </SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category.id} value={category.id} className="font-semibold">
                    {category.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      )}

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Blogs Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {blogs.map((blog) => (
              <BlogCard key={blog.id} blog={blog} />
            ))}
          </div>

          {/* Empty State */}
          {blogs.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Blog Posts Found</h3>
              <p className="text-gray-600 mb-8">
                {selectedCategory
                  ? "No posts found in the selected category. Try selecting a different category."
                  : "No blog posts are available at the moment. Check back later for new content!"}
              </p>
              {selectedCategory && (
                <Button
                  onClick={() => setSelectedCategory("")}
                  variant="outline"
                  className="rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 font-semibold"
                >
                  View All Posts
                </Button>
              )}
            </div>
          )}

          {/* More Button */}
          {showMoreButton && blogs.length > 0 && (
            <div className="text-center">
              <Button
                onClick={handleViewMore}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3"
              >
                View All Blog Posts
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
