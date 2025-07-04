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
import { Upload } from "lucide-react"

interface CreateProgramDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCreateProgram: (
    program: {
      name: string
      description: string
      date: string
      signUpUrl?: string
    },
    imageFile?: File,
  ) => void
}

export function CreateProgramDialog({ open, onOpenChange, onCreateProgram }: CreateProgramDialogProps) {
  const [name, setName] = useState("")
  const [description, setDescription] = useState("")
  const [date, setDate] = useState("")
  const [signUpUrl, setSignUpUrl] = useState("")
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!name || !description || !date) return

    setIsSubmitting(true)
    try {
      await onCreateProgram(
        {
          name,
          description,
          date,
          signUpUrl: signUpUrl || undefined,
        },
        imageFile || undefined,
      )

      // Reset form
      setName("")
      setDescription("")
      setDate("")
      setSignUpUrl("")
      setImageFile(null)
    } catch (error) {
      console.error("Error creating program:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setImageFile(file)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Create New Event</DialogTitle>
          <DialogDescription>Add a new event to engage with your community.</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="grid gap-6 py-4">
            <div className="grid gap-2">
              <Label htmlFor="name" className="font-semibold">
                Event Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Enter event name"
                required
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="description" className="font-semibold">
                Description
              </Label>
              <Textarea
                id="description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                placeholder="Describe your event"
                required
                className="rounded-xl min-h-[100px]"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="date" className="font-semibold">
                Date
              </Label>
              <Input
                id="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
                placeholder="e.g., March 15, 2024 or Every 2nd Saturday"
                required
                className="rounded-xl"
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="signUpUrl" className="font-semibold">
                Sign Up URL (Optional)
              </Label>
              <Input
                id="signUpUrl"
                type="url"
                value={signUpUrl}
                onChange={(e) => setSignUpUrl(e.target.value)}
                placeholder="https://example.com/signup"
                className="rounded-xl"
              />
              <p className="text-sm text-gray-500">Add a link where people can sign up for this event</p>
            </div>
            <div className="grid gap-2">
              <Label htmlFor="image" className="font-semibold">
                Event Image (Optional)
              </Label>
              <div className="flex items-center gap-2">
                <Input id="image" type="file" accept="image/*" onChange={handleImageChange} className="rounded-xl" />
                <Upload className="h-4 w-4 text-gray-400" />
              </div>
              {imageFile && <p className="text-sm text-green-600">Selected: {imageFile.name}</p>}
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)} className="rounded-xl">
              Cancel
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl"
            >
              {isSubmitting ? "Creating..." : "Create Event"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}
