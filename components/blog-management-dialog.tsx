"use client"
import { useState, useEffect } from "react"
import type React from "react"

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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Plus, Save, DeleteIcon as Cancel, Loader2, Calendar, Upload, X } from "lucide-react"
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
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    date: "",
    author: "",
  })

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
      date: "",
      author: "",
    })
    setImageFile(null)
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
      date: blog.date || "",
      author: blog.author,
    })
    setImageFile(null)
    setIsCreating(false)
  }

  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  const removeImage = () => {
    setImageFile(null)
  }

  const handleSave = async () => {
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim() || !formData.date.trim()) {
      alert("Please fill in all required fields")
      return
    }

    setIsSaving(true)
    try {
      const blogData = {
        title: formData.title.trim(),
        content: formData.content.trim(),
        date: formData.date.trim(),
        author: formData.author.trim(),
      }

      if (isCreating) {
        const newBlog = await createBlog(blogData, imageFile || undefined)
        setBlogs([newBlog, ...blogs])
      } else if (editingBlog) {
        const updatedBlog = await updateBlog(editingBlog.id, blogData, imageFile || undefined)
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
                              <span>{formatDateForDisplay(blog.date)}</span>
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
                        <p className="text-gray-600 text-sm mb-3">{blog.content.substring(0, 150)}...</p>
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
                  <Label htmlFor="date">Publication Date *</Label>
                  <div className="relative">
                    <Input
                      id="date"
                      type="date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      required
                      disabled={isSaving}
                      className="pl-10"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  </div>
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
                  <Label>Blog Image</Label>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Label htmlFor="imageFile" className="cursor-pointer">
                        <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                          <Upload className="h-4 w-4" />
                          <span className="text-sm">Upload Image</span>
                        </div>
                      </Label>
                      <Input
                        id="imageFile"
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        className="hidden"
                        disabled={isSaving}
                      />
                      {imageFile && (
                        <Button type="button" variant="outline" size="sm" onClick={removeImage} disabled={isSaving}>
                          <X className="h-4 w-4" />
                        </Button>
                      )}
                    </div>

                    {imageFile && <p className="text-sm text-gray-600">Selected: {imageFile.name}</p>}
                  </div>
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
