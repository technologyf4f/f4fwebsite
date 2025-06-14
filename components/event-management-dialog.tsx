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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Edit, Trash2, Plus, Save, DeleteIcon as Cancel } from "lucide-react"

interface Event {
  id: string
  name: string
  description: string
  image: string
  date: string
}

interface EventManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  events: Event[]
  onUpdateEvents: (events: Event[]) => void
}

export function EventManagementDialog({ open, onOpenChange, events, onUpdateEvents }: EventManagementDialogProps) {
  const [editingEvent, setEditingEvent] = useState<Event | null>(null)
  const [isCreating, setIsCreating] = useState(false)
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    image: "",
    date: "",
  })

  const resetForm = () => {
    setFormData({
      name: "",
      description: "",
      image: "",
      date: "",
    })
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
      image: event.image,
      date: event.date,
    })
    setIsCreating(false)
  }

  const handleSave = () => {
    if (!formData.name.trim() || !formData.description.trim() || !formData.date.trim()) {
      alert("Please fill in all required fields")
      return
    }

    const finalImage =
      formData.image || `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(formData.name)}`

    if (isCreating) {
      const newEvent: Event = {
        id: Date.now().toString(),
        name: formData.name.trim(),
        description: formData.description.trim(),
        image: finalImage,
        date: formData.date.trim(),
      }
      onUpdateEvents([newEvent, ...events])
    } else if (editingEvent) {
      const updatedEvents = events.map((event) =>
        event.id === editingEvent.id
          ? {
              ...event,
              name: formData.name.trim(),
              description: formData.description.trim(),
              image: finalImage,
              date: formData.date.trim(),
            }
          : event,
      )
      onUpdateEvents(updatedEvents)
    }

    handleCancel()
  }

  const handleDelete = (eventId: string) => {
    if (confirm("Are you sure you want to delete this event?")) {
      const updatedEvents = events.filter((event) => event.id !== eventId)
      onUpdateEvents(updatedEvents)
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
                <h3 className="text-lg font-semibold">All Events ({events.length})</h3>
                <Button onClick={handleCreate} className="bg-indigo-700 hover:bg-indigo-800">
                  <Plus className="h-4 w-4 mr-2" />
                  Create New Event
                </Button>
              </div>

              <div className="space-y-4 max-h-96 overflow-y-auto">
                {events.map((event) => (
                  <Card key={event.id}>
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-lg">{event.name}</CardTitle>
                          <div className="text-sm text-gray-500 mt-2">
                            <span>{event.date}</span>
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

                {events.length === 0 && (
                  <div className="text-center py-8">
                    <p className="text-gray-500">No events yet. Create your first event!</p>
                  </div>
                )}
              </div>
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
                  />
                </div>

                <div>
                  <Label htmlFor="date">Date *</Label>
                  <Input
                    id="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    placeholder="e.g., March 15, 2024 or Every Saturday"
                    required
                  />
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
