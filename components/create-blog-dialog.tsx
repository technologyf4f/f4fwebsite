"use client"

import type React from "react"

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
import { Checkbox } from "@/components/ui/checkbox"
import { Upload, X, Plus } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface CreateBlogDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateBlog: (blog: {
    title: string
    content: string
    excerpt: string
    image: string
    date: string
    author: string
    readingTime: string
    categories: string[]
    featured: boolean
  }) => void
}

export function CreateBlogDialog({ open, onOpenChange, onCreateBlog }: CreateBlogDialogProps) {
  const [title, setTitle] = useState("")
  const [content, setContent] = useState("")
  const [excerpt, setExcerpt] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [author, setAuthor] = useState("")
  const [featured, setFeatured] = useState(false)
  const [newCategory, setNewCategory] = useState("")
  const [categories, setCategories] = useState<string[]>([])
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check password
    if (password !== "bruh123") {
      setPasswordError(true)
      return
    }

    if (!title.trim() || !content.trim() || !author.trim()) {
      return
    }

    // Calculate reading time (rough estimate: 200 words per minute)
    const wordCount = content.trim().split(/\s+/).length
    const readingTime = Math.max(1, Math.ceil(wordCount / 200)) + " min read"

    // Use current date
    const date = new Date().toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    })

    const finalImageUrl = imageFile
      ? URL.createObjectURL(imageFile)
      : imageUrl || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(title)}`

    // Use excerpt or generate from content
    const finalExcerpt = excerpt.trim() || content.trim().substring(0, 150) + "..."

    onCreateBlog({
      title: title.trim(),
      content: content.trim(),
      excerpt: finalExcerpt,
      image: finalImageUrl,
      date,
      author: author.trim(),
      readingTime,
      categories,
      featured,
    })

    // Reset form
    setTitle("")
    setContent("")
    setExcerpt("")
    setImageUrl("")
    setImageFile(null)
    setAuthor("")
    setFeatured(false)
    setCategories([])
    setNewCategory("")
    setPassword("")
    setPasswordError(false)
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
      setImageUrl("") // Clear URL if file is selected
    }
  }

  const removeImage = () => {
    setImageFile(null)
    setImageUrl("")
  }

  const addCategory = () => {
    if (newCategory.trim() && !categories.includes(newCategory.trim())) {
      setCategories([...categories, newCategory.trim()])
      setNewCategory("")
    }
  }

  const removeCategory = (category: string) => {
    setCategories(categories.filter((c) => c !== category))
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
              <Label htmlFor="excerpt">Excerpt (Optional)</Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                placeholder="A brief summary of your post (will be generated from content if left empty)"
                rows={2}
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
              <Label>Categories</Label>
              <div className="flex flex-wrap gap-2 mb-2">
                {categories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <button
                      type="button"
                      onClick={() => removeCategory(category)}
                      className="ml-1 rounded-full hover:bg-gray-200 p-1"
                    >
                      <X className="h-3 w-3" />
                      <span className="sr-only">Remove {category}</span>
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
              <Checkbox id="featured" checked={featured} onCheckedChange={(checked) => setFeatured(!!checked)} />
              <Label htmlFor="featured" className="cursor-pointer">
                Feature this post
              </Label>
            </div>

            <div className="grid gap-2">
              <Label>Blog Image</Label>
              <div className="space-y-2">
                {!imageFile && (
                  <div>
                    <Label htmlFor="imageUrl" className="text-sm text-gray-600">
                      Image URL (optional)
                    </Label>
                    <Input
                      id="imageUrl"
                      value={imageUrl}
                      onChange={(e) => setImageUrl(e.target.value)}
                      placeholder="https://example.com/image.jpg"
                    />
                  </div>
                )}

                <div className="flex items-center gap-2">
                  <Label htmlFor="imageFile" className="cursor-pointer">
                    <div className="flex items-center gap-2 px-3 py-2 border border-gray-300 rounded-md hover:bg-gray-50">
                      <Upload className="h-4 w-4" />
                      <span className="text-sm">Upload Image</span>
                    </div>
                  </Label>
                  <Input id="imageFile" type="file" accept="image/*" onChange={handleImageUpload} className="hidden" />
                  {(imageFile || imageUrl) && (
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
