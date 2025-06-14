"use client"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Edit, Trash2, Plus, X, Save, DeleteIcon as Cancel, Loader2 } from "lucide-react"
import { getBlogs, createBlog, updateBlog, deleteBlog, type Blog } from "@/lib/blogs-api"

interface BlogManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onBlogsChange: () => void // Callback to refresh blogs on main page
}

export function BlogManagementDialog({ open, onOpenChange, onBlogsChange }: BlogManagementDialogProps) {
  const [blogs, setBlogs] = useState<Blog[]>([])
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    image: "",
    author: "",
    categories: [] as string[],
    featured: false,
  })
  const [newCategory, setNewCategory] = useState("")

  // Load blogs when dialog opens
  useEffect(() => {
    if (open) {
      loadBlogs()
    }
  }, [open])

  const loadBlogs = async () => {
    setIsLoading(true)
    try {
      const blogsData = await getBlogs()
      setBlogs(blogsData)
    } catch (error) {
      console.error("Failed to load blogs:", error)
      alert("Failed to load blogs. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      image: "",
      author: "",
      categories: [],
      featured: false,
    })
    setNewCategory("")
  }

  const handleCreate = () => {
    setIsCreating(true)
    resetForm()
    setEditingBlog(null)
  }

  const handleEdit = (blog: Blog) => {
    setEditingBlog(blog)
    setFormData({
      title: blog.title,
      content: blog.content,
      excerpt: blog.excerpt || "",
      image: blog.image || "",
      author: blog.author,
      categories: [...blog.categories],
      featured: blog.featured,
    })
    setIsCreating(false)
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      alert("Please fill in all required fields")
      return
    }

    setIsSaving(true)
    try {
      const wordCount = formData.content.trim().split(/\s+/).length
      const readingTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read"
      const date = new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })

      const finalExcerpt = formData.excerpt.trim() || formData.content.trim().substring(0, 150) + "..."
      const finalImage =
        formData.image || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(formData.title)}`

      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: finalExcerpt,
        image: finalImage,
        date,
        author: formData.author.trim(),
        reading_time: readingTime,
        categories: formData.categories,
        featured: formData.featured,
      }

      if (isCreating) {
        const newBlog = await createBlog(blogData)
        setBlogs([newBlog, ...blogs])
      } else if (editingBlog) {
        const updatedBlog = await updateBlog(editingBlog.id, blogData)
        setBlogs(blogs.map((blog) => (blog.id === editingBlog.id ? updatedBlog : blog)))
      }

      onBlogsChange() // Refresh blogs on main page
      handleCancel()
      alert(isCreating ? "Blog post created successfully!" : "Blog post updated successfully!")
    } catch (error) {
      console.error("Failed to save blog:", error)
      alert("Failed to save blog post. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (blogId: string) => {
    if (!confirm("Are you sure you want to delete this blog post? This action cannot be undone.")) {
      return
    }

    try {
      await deleteBlog(blogId)
      setBlogs(blogs.filter((blog) => blog.id !== blogId))
      onBlogsChange() // Refresh blogs on main page
      alert("Blog post deleted successfully!")
    } catch (error) {
      console.error("Failed to delete blog:", error)
      alert("Failed to delete blog post. Please try again.")
    }
  }

  const handleCancel = () => {
    setEditingBlog(null)
    setIsCreating(false)
    resetForm()
  }

  const addCategory = () => {
    if (newCategory.trim() && !formData.categories.includes(newCategory.trim())) {
      setFormData({
        ...formData,
        categories: [...formData.categories, newCategory.trim()],
      })
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    setFormData({
      ...formData,
      categories: formData.categories.filter((c) => c !== category),
    })
  }

  const isEditing = editingBlog || isCreating

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Blog Management</DialogTitle>
          <DialogDescription>
            {isEditing ? (isCreating ? "Create a new blog post" : "Edit blog post") : "Manage your blog posts"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isEditing ? (
            <>
              {/* Blog List View */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  All Blog Posts ({blogs.length}){isLoading && <Loader2 className="inline h-4 w-4 ml-2 animate-spin" />}
                </h3>
                <Button onClick={handleCreate} className="bg-indigo-700 hover:bg-indigo-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {blogs.map((blog) => (
                    <Card key={blog.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{blog.title}</CardTitle>
                            <div className="flex items-center gap-4 text-sm text-gray-500 mt-2">
                              <span>By {blog.author}</span>
                              <span>{blog.date}</span>
                              <span>{blog.reading_time}</span>
                              {blog.featured && <Badge variant="default">Featured</Badge>}
                              {blog.created_at && (
                                <span>Created: {new Date(blog.created_at).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(blog)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(blog.id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 text-sm mb-3">{blog.excerpt}</p>
                        <div className="flex gap-2">
                          {blog.categories.map((category) => (
                            <Badge key={category} variant="outline">
                              {category}
                            </Badge>
                          ))}
                        </div>
                      </CardContent>
                    </Card>
                  ))}

                  {blogs.length === 0 && !isLoading && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No blog posts yet. Create your first post!</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Blog Form View */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title *</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    placeholder="Enter blog title"
                    required
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <Label htmlFor="author">Author *</Label>
                  <Input
                    id="author"
                    value={formData.author}
                    onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                    placeholder="Author name"
                    required
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <Label htmlFor="content">Content *</Label>
                  <Textarea
                    id="content"
                    value={formData.content}
                    onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                    placeholder="Write your blog post content..."
                    rows={8}
                    required
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <Label htmlFor="excerpt">Excerpt (Optional)</Label>
                  <Textarea
                    id="excerpt"
                    value={formData.excerpt}
                    onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                    placeholder="Brief summary (will be generated from content if empty)"
                    rows={2}
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL (Optional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <Label>Categories</Label>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {formData.categories.map((category) => (
                      <Badge key={category} variant="secondary" className="flex items-center gap-1">
                        {category}
                        <button
                          type="button"
                          onClick={() => removeCategory(category)}
                          className="ml-1 rounded-full hover:bg-gray-200 p-1"
                          disabled={isSaving}
                        >
                          <X className="h-3 w-3" />
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
                      disabled={isSaving}
                    />
                    <Button type="button" variant="outline" onClick={addCategory} disabled={isSaving}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
                    disabled={isSaving}
                  />
                  <Label htmlFor="featured" className="cursor-pointer">
                    Feature this post
                  </Label>
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter>
          {isEditing ? (
            <div className="flex gap-2">
              <Button variant="outline" onClick={handleCancel} disabled={isSaving}>
                <Cancel className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-indigo-700 hover:bg-indigo-800" disabled={isSaving}>
                {isSaving ? <Loader2 className="h-4 w-4 mr-2 animate-spin" /> : <Save className="h-4 w-4 mr-2" />}
                {isCreating ? "Create Post" : "Save Changes"}
              </Button>
            </div>
          ) : (
            <Button variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
