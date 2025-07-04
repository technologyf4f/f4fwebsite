"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Pencil, Trash2, Plus, ExternalLink, Loader2 } from "lucide-react"
import { getEvents, createEvent, updateEvent, deleteEvent, type Event } from "@/lib/events-api"

interface EventManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function EventManagementDialog({ open, onOpenChange }: EventManagementDialogProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
    signUpUrl: "",
  })
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (open) {
      loadEvents()
    }
  }, [open])

  const loadEvents = async () => {
    setIsLoading(true)
    try {
      const fetchedEvents = await getEvents()
      setEvents(fetchedEvents)
    } catch (error) {
      console.error("Error loading events:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleCreate = () => {
    setIsCreating(true)
    setEditingEvent(null)
    setFormData({ name: "", description: "", date: "", signUpUrl: "" })
    setImageFile(null)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setIsCreating(false)
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date,
      signUpUrl: event.signUpUrl || "",
    })
    setImageFile(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.name || !formData.description || !formData.date) return

    setIsSubmitting(true)
    try {
      const eventData = {
        name: formData.name,
        description: formData.description,
        date: formData.date,
        signUpUrl: formData.signUpUrl || undefined,
      }

      if (isCreating) {
        const newEvent = await createEvent(eventData, imageFile || undefined)
        setEvents((prev) => [newEvent, ...prev])
      } else if (editingEvent) {
        const updatedEvent = await updateEvent(editingEvent.id, eventData, imageFile || undefined)
        setEvents((prev) => prev.map((e) => (e.id === editingEvent.id ? updatedEvent : e)))
      }

      setIsCreating(false)
      setEditingEvent(null)
      setFormData({ name: "", description: "", date: "", signUpUrl: "" })
      setImageFile(null)
    } catch (error) {
      console.error("Error saving event:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this event?")) return

    try {
      await deleteEvent(id)
      setEvents((prev) => prev.filter((e) => e.id !== id))
    } catch (error) {
      console.error("Error deleting event:", error)
    }
  }

  const handleCancel = () => {
    setIsCreating(false)
    setEditingEvent(null)
    setFormData({ name: "", description: "", date: "", signUpUrl: "" })
    setImageFile(null)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[80vh] overflow-y-auto rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold">Manage Events</DialogTitle>
          <DialogDescription>Create, edit, and delete events for your organization.</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {/* Create/Edit Form */}
          {(isCreating || editingEvent) && (
            <Card className="border-2 border-indigo-200 rounded-2xl">
              <CardHeader>
                <CardTitle>{isCreating ? "Create New Event" : "Edit Event"}</CardTitle>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-2">
                    <Label htmlFor="edit-name" className="font-semibold">
                      Event Name
                    </Label>
                    <Input
                      id="edit-name"
                      value={formData.name}
                      onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                      placeholder="Enter event name"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-description" className="font-semibold">
                      Description
                    </Label>
                    <Textarea
                      id="edit-description"
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe your event"
                      required
                      className="rounded-xl min-h-[100px]"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-date" className="font-semibold">
                      Date
                    </Label>
                    <Input
                      id="edit-date"
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      placeholder="e.g., March 15, 2024"
                      required
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-signUpUrl" className="font-semibold">
                      Sign Up URL (Optional)
                    </Label>
                    <Input
                      id="edit-signUpUrl"
                      type="url"
                      value={formData.signUpUrl}
                      onChange={(e) => setFormData({ ...formData, signUpUrl: e.target.value })}
                      placeholder="https://example.com/signup"
                      className="rounded-xl"
                    />
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="edit-image" className="font-semibold">
                      Event Image (Optional)
                    </Label>
                    <Input
                      id="edit-image"
                      type="file"
                      accept="image/*"
                      onChange={(e) => setImageFile(e.target.files?.[0] || null)}
                      className="rounded-xl"
                    />
                    {imageFile && <p className="text-sm text-green-600">Selected: {imageFile.name}</p>}
                  </div>
                  <div className="flex gap-2">
                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl"
                    >
                      {isSubmitting ? "Saving..." : isCreating ? "Create Event" : "Update Event"}
                    </Button>
                    <Button
                      type="button"
                      variant="outline"
                      onClick={handleCancel}
                      className="rounded-xl bg-transparent"
                    >
                      Cancel
                    </Button>
                  </div>
                </form>
              </CardContent>
            </Card>
          )}

          {/* Events List */}
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold">Current Events</h3>
              {!isCreating && !editingEvent && (
                <Button
                  onClick={handleCreate}
                  className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Create Event
                </Button>
              )}
            </div>

            {isLoading ? (
              <div className="flex items-center justify-center py-8">
                <Loader2 className="h-6 w-6 animate-spin text-indigo-600" />
                <span className="ml-2 text-gray-600">Loading events...</span>
              </div>
            ) : events.length === 0 ? (
              <div className="text-center py-8 text-gray-500">
                <p>No events found. Create your first event to get started!</p>
              </div>
            ) : (
              <div className="grid gap-4">
                {events.map((event) => (
                  <Card key={event.id} className="rounded-2xl">
                    <CardContent className="p-6">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-semibold text-lg mb-2">{event.name}</h4>
                          <p className="text-gray-600 mb-2">{event.description}</p>
                          <p className="text-sm text-gray-500 mb-2">Date: {event.date}</p>
                          {event.signUpUrl && (
                            <a
                              href={event.signUpUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center gap-1"
                            >
                              Sign Up URL <ExternalLink className="h-3 w-3" />
                            </a>
                          )}
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm" onClick={() => handleEdit(event)} className="rounded-xl">
                            <Pencil className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleDelete(event.id)}
                            className="text-red-600 border-red-300 hover:bg-red-50 rounded-xl"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
