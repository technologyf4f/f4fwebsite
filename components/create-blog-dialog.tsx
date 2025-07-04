"use client"

import type React from "react"

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X, Calendar } from "lucide-react"
import { getBlogCategories, type BlogCategory } from "@/lib/blogs-api"

interface CreateBlogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateBlog: (
    blog: {
      title: string
      content: string
      date: string
      author: string
      category_id?: string
    },
    imageFile?: File,
  ) => void
}

export function CreateBlogDialog({ open, onOpenChange, onCreateBlog }: CreateBlogDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [date, setDate] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [author, setAuthor] = useState("")
  const [categoryId, setCategoryId] = useState("none")
  const [categories, setCategories] = useState<BlogCategory[]>([])
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  // Load categories when dialog opens
  useEffect(() => {
    if (open) {
      loadCategories()
    }
  }, [open])

  const loadCategories = async () => {
    try {
      const categoriesData = await getBlogCategories()
      setCategories(categoriesData)
    } catch (error) {
      console.error("Failed to load categories:", error)
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check password
    if (password !== "bruh123") {
      setPasswordError(true)
      return
    }

    if (!title.trim() || !content.trim() || !author.trim() || !date.trim()) {
      return
    }

    onCreateBlog(
      {
        title: title.trim(),
        content: content.trim(),
        date: date.trim(),
        author: author.trim(),
        category_id: categoryId === "none" ? undefined : categoryId,
      },
      imageFile || undefined,
    )

    // Reset form
    setTitle("")
    setContent("")
    setDate("")
    setImageFile(null)
    setAuthor("")
    setCategoryId("none")
    setPassword("")
    setPasswordError(false)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Create New Blog Post</DialogTitle>
          <DialogDescription>Share insights and stories with your community.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="title">Blog Title</Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Enter blog title"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="author">Author Name</Label>
              <Input
                id="author"
                value={author}
                onChange={(e) => setAuthor(e.target.value)}
                placeholder="Your name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="category">Category</Label>
              <Select value={categoryId} onValueChange={setCategoryId}>
                <SelectTrigger>
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="none">No Category</SelectItem>
                  {categories.map((category) => (
                    <SelectItem key={category.id} value={category.id}>
                      {category.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Publication Date</Label>
              <div className="relative">
                <Input
                  id="date"
                  type="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                  className="pl-10"
                />
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="content">Content</Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write your blog post content here..."
                rows={8}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                type="password"
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value)
                  setPasswordError(false)
                }}
                placeholder="Enter password to create blog post"
                required
                className={passwordError ? "border-red-500" : ""}
              />
              {passwordError && <p className="text-sm text-red-500">Incorrect password. Please try again.</p>}
            </div>

            <div className="grid gap-2">
              <Label>Blog Image</Label>
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <Label htmlFor="imageFile" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">Upload Image</span>
                    </div>
                  </Label>
                  <Input id="imageFile" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {imageFile && (
                    <Button type="button" variant="outline" size="sm" onClick={removeImage}>
                      <X className="h-4 w-4" />
                    </Button>
                  )}
                </div>

                {imageFile && <p className="text-sm text-gray-600">Selected: {imageFile.name}</p>}
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" className="bg-indigo-700 hover:bg-indigo-800">
              Publish Blog Post
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
