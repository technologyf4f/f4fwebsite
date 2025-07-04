"use client"

import { useState, useEffect } from "react"
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

export function BlogsSection({ limit, showViewAll = false, showCategoryFilter = false }: BlogsSectionProps) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [selectedCategory, setSelectedCategory] = useState<string>("all")
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Latest Blog Posts</h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover insights, stories, and updates from our community of young leaders making a difference.
          </p>
        </div>

        {showCategoryFilter && (
          <div className="flex justify-center mb-12">
            <div className="flex items-center gap-3 bg-white rounded-2xl p-2 shadow-lg border border-gray-100">
              <Filter className="h-5 w-5 text-gray-500 ml-2" />
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-64 border-0 bg-transparent focus:ring-0">
                  <SelectValue placeholder="Filter by category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center py-12">
            <Loader2 className="h-8 w-8 animate-spin text-indigo-600" />
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
      </div>
    </section>
  )
}
