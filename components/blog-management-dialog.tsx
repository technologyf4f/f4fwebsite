"use client"
import { useState } from "react"
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
import { Edit, Trash2, Plus, X, Save, DeleteIcon as Cancel } from "lucide-react"

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

interface BlogManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  blogs: Blog[]
  onUpdateBlogs: (blogs: Blog[]) => void
}

export function BlogManagementDialog({ open, onOpenChange, blogs, onUpdateBlogs }: BlogManagementDialogProps) {
  const [editingBlog, setEditingBlog] = useState<Blog | null>(null)
  const [isCreating, setIsCreating] = useState(false)
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
      excerpt: blog.excerpt,
      image: blog.image,
      author: blog.author,
      categories: [...blog.categories],
      featured: blog.featured,
    })
    setIsCreating(false)
  }

  const handleSave = () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      alert("Please fill in all required fields")
      return
    }

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

    if (isCreating) {
      const newBlog: Blog = {
        id: Date.now().toString(),
        title: formData.title.trim(),
        content: formData.content.trim(),
        excerpt: finalExcerpt,
        image: finalImage,
        date,
        author: formData.author.trim(),
        readingTime,
        categories: formData.categories,
        featured: formData.featured,
      }
      onUpdateBlogs([newBlog, ...blogs])
    } else if (editingBlog) {
      const updatedBlogs = blogs.map((blog) =>
        blog.id === editingBlog.id
          ? {
              ...blog,
              title: formData.title.trim(),
              content: formData.content.trim(),
              excerpt: finalExcerpt,
              image: finalImage,
              author: formData.author.trim(),
              categories: formData.categories,
              featured: formData.featured,
            }
          : blog,
      )
      onUpdateBlogs(updatedBlogs)
    }

    handleCancel()
  }

  const handleDelete = (blogId: string) => {
    if (confirm("Are you sure you want to delete this blog post?")) {
      const updatedBlogs = blogs.filter((blog) => blog.id !== blogId)
      onUpdateBlogs(updatedBlogs)
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
                <h3 className="text-lg font-semibold">All Blog Posts ({blogs.length})</h3>
                <Button onClick={handleCreate} className="bg-indigo-700 hover:bg-indigo-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Post
                </Button>
              </div>

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
                            <span>{blog.readingTime}</span>
                            {blog.featured && <Badge variant="default">Featured</Badge>}
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

                {blogs.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No blog posts yet. Create your first post!</p>
                  </div>
                )}
              </div>
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
                  />
                </div>

                <div>
                  <Label htmlFor="image">Image URL (Optional)</Label>
                  <Input
                    id="image"
                    value={formData.image}
                    onChange={(e) => setFormData({ ...formData, image: e.target.value })}
                    placeholder="https://example.com/image.jpg"
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
                    />
                    <Button type="button" variant="outline" onClick={addCategory}>
                      <Plus className="h-4 w-4" />
                    </Button>
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Checkbox
                    id="featured"
                    checked={formData.featured}
                    onCheckedChange={(checked) => setFormData({ ...formData, featured: !!checked })}
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
              <Button variant="outline" onClick={handleCancel}>
                <Cancel className="h-4 w-4 mr-2" />
                Cancel
              </Button>
              <Button onClick={handleSave} className="bg-indigo-700 hover:bg-indigo-800">
                <Save className="h-4 w-4 mr-2" />
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
