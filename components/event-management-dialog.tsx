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
import { getEvents, createEvent, updateEvent, deleteEvent, type Event } from "@/lib/events-api"

interface EventManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onEventsChange: () => void // Callback to refresh events on main page
}

export function EventManagementDialog({ open, onOpenChange, onEventsChange }: EventManagementDialogProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [imageFile, setImageFile] = useState<File | null>(null)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    date: "",
  })

  // Load events when dialog opens
  useEffect(() => {
    if (open) {
      loadEvents()
    }
  }, [open])

  const loadEvents = async () => {
    setIsLoading(true)
    try {
      const eventsData = await getEvents()
      setEvents(eventsData)
    } catch (error) {
      console.error("Failed to load events:", error)
      alert("Failed to load events. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      date: "",
    })
    setImageFile(null)
  }

  const handleCreate = () => {
    setIsCreating(true)
    resetForm()
    setEditingEvent(null)
  }

  const handleEdit = (event: Event) => {
    setEditingEvent(event)
    setFormData({
      name: event.name,
      description: event.description,
      date: event.date,
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
    if (!formData.name.trim() || !formData.description.trim() || !formData.date.trim()) {
      alert("Please fill in all required fields")
      return
    }

    setIsSaving(true)
    try {
      const eventData = {
        name: formData.name.trim(),
        description: formData.description.trim(),
        date: formData.date.trim(),
      }

      if (isCreating) {
        const newEvent = await createEvent(eventData, imageFile || undefined)
        setEvents([newEvent, ...events])
      } else if (editingEvent) {
        const updatedEvent = await updateEvent(editingEvent.id, eventData, imageFile || undefined)
        setEvents(events.map((event) => (event.id === editingEvent.id ? updatedEvent : event)))
      }

      onEventsChange() // Refresh events on main page
      handleCancel()
      alert(isCreating ? "Event created successfully!" : "Event updated successfully!")
    } catch (error) {
      console.error("Failed to save event:", error)
      alert("Failed to save event. Please try again.")
    } finally {
      setIsSaving(false)
    }
  }

  const handleDelete = async (eventId: string) => {
    if (!confirm("Are you sure you want to delete this event? This action cannot be undone.")) {
      return
    }

    try {
      await deleteEvent(eventId)
      setEvents(events.filter((event) => event.id !== eventId))
      onEventsChange() // Refresh events on main page
      alert("Event deleted successfully!")
    } catch (error) {
      console.error("Failed to delete event:", error)
      alert("Failed to delete event. Please try again.")
    }
  }

  const handleCancel = () => {
    setEditingEvent(null)
    setIsCreating(false)
    resetForm()
  }

  const isEditing = editingEvent || isCreating

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Event Management</DialogTitle>
          <DialogDescription>
            {isEditing ? (isCreating ? "Create a new event" : "Edit event") : "Manage your events"}
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          {!isEditing ? (
            <>
              {/* Event List View */}
              <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold">
                  All Events ({events.length}){isLoading && <Loader2 className="inline h-4 w-4 ml-2 animate-spin" />}
                </h3>
                <Button onClick={handleCreate} className="bg-indigo-700 hover:bg-indigo-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
              </div>

              {isLoading ? (
                <div className="flex justify-center py-8">
                  <Loader2 className="h-8 w-8 animate-spin" />
                </div>
              ) : (
                <div className="space-y-4 max-h-96 overflow-y-auto">
                  {events.map((event) => (
                    <Card key={event.id}>
                      <CardHeader className="pb-3">
                        <div className="flex justify-between items-start">
                          <div className="flex-1">
                            <CardTitle className="text-lg">{event.name}</CardTitle>
                            <div className="text-sm text-gray-500 mt-2">
                              <span>{formatDateForDisplay(event.date)}</span>
                              {event.created_at && (
                                <span className="ml-4">Created: {new Date(event.created_at).toLocaleDateString()}</span>
                              )}
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm" onClick={() => handleEdit(event)}>
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handleDelete(event.id)}>
                              <Trash2 className="h-4 w-4 text-red-600" />
                            </Button>
                          </div>
                        </div>
                      </CardHeader>
                      <CardContent className="pt-0">
                        <p className="text-gray-600 text-sm">{event.description}</p>
                      </CardContent>
                    </Card>
                  ))}

                  {events.length === 0 && !isLoading && (
                    <div className="text-center py-8">
                      <p className="text-gray-500">No events yet. Create your first event!</p>
                    </div>
                  )}
                </div>
              )}
            </>
          ) : (
            <>
              {/* Event Form View */}
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Event Name *</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Enter event name"
                    required
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <Label htmlFor="date">Event Date *</Label>
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
                  <Label htmlFor="description">Description *</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    placeholder="Describe your event..."
                    rows={4}
                    required
                    disabled={isSaving}
                  />
                </div>

                <div>
                  <Label>Event Image</Label>
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
                {isCreating ? "Create Event" : "Save Changes"}
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
