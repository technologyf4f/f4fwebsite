"use client"

import type { React } from "react"

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
import { Upload, X } from "lucide-react"

interface CreateProgramDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateProgram: (program: {
    name: string
    description: string
    image: string
    date: string
  }) => void
}

export function CreateProgramDialog({ open, onOpenChange, onCreateProgram }: CreateProgramDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [imageUrl, setImageUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [password, setPassword] = useState("")
  const [passwordError, setPasswordError] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Check password
    if (password !== "bruh123") {
      setPasswordError(true)
      return
    }

    if (!name.trim() || !description.trim() || !date.trim()) {
      return
    }

    const finalImageUrl = imageFile
      ? URL.createObjectURL(imageFile)
      : imageUrl || `/placeholder.svg?height=300&width=400&query=${encodeURIComponent(name)}`

    onCreateProgram({
      name: name.trim(),
      description: description.trim(),
      date: date.trim(),
      image: finalImageUrl,
    })

    // Reset form
    setName("")
    setDescription("")
    setDate("")
    setImageUrl("")
    setImageFile(null)
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

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px]">
        <DialogHeader>
          <DialogTitle>Create New Program</DialogTitle>
          <DialogDescription>Add a new program to showcase your youth leadership initiatives.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name">Program Name</Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter program name"
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="description">Description</Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your program"
                rows={3}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="date">Date</Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g., March 15, 2024 or Every Saturday"
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
                placeholder="Enter password to create program"
                required
                className={passwordError ? "border-red-500" : ""}
              />
              {passwordError && <p className="text-sm text-red-500">Incorrect password. Please try again.</p>}
            </div>

            <div className="grid gap-2">
              <Label>Program Image</Label>
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
              Create Program
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
