"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"
import { CreateProgramDialog } from "@/components/create-program-dialog"
import { EventsSection } from "@/components/events-section"
import { createEvent } from "@/lib/events-api"

export default function EventsPage() {
  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)
  const [refreshKey, setRefreshKey] = useState(0)

  const handleCreateEvent = async (
    eventData: {
      name: string
      description: string
      date: string
      signUpUrl?: string
    },
    imageFile?: File,
  ) => {
    try {
      await createEvent(eventData, imageFile)
      setIsCreateDialogOpen(false)
      // Trigger refresh of events
      setRefreshKey((prev) => prev + 1)
    } catch (err) {
      console.error("Error creating event:", err)
      alert("Failed to create event. Please try again.")
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-indigo-50">
      {/* Events Header */}
      <section className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
        <div className="container mx-auto px-6 py-16">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-6">
              <div>
                <h1 className="text-4xl md:text-5xl font-bold mb-4">Events</h1>
                <p className="text-indigo-100 text-lg">Empowering youth through leadership and community engagement</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Events Section */}
      <section className="container mx-auto px-6 py-16">
        <EventsSection key={refreshKey} />
      </section>

      <CreateProgramDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateProgram={handleCreateEvent}
      />
    </div>
  )
}
