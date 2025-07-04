"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { EventCard } from "./event-card"
import { getEvents, type Event } from "@/lib/events-api"

interface EventsSectionProps {
  limit?: number
  showMoreButton?: boolean
  title?: string
  description?: string
}

export function EventsSection({
  limit,
  showMoreButton = false,
  title = "Our Events",
  description = "Empowering youth through leadership and community engagement events",
}: EventsSectionProps) {
  const [events, setEvents] = useState<Event[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    loadEvents()
  }, [])

  const loadEvents = async () => {
    setIsLoading(true)
    setError(null)
    try {
      const eventsData = await getEvents()
      let displayEvents = eventsData
      if (limit) {
        displayEvents = eventsData.slice(0, limit)
      }
      setEvents(displayEvents)
    } catch (error) {
      console.error("Failed to load events:", error)
      setError("Failed to load events. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  const handleViewMore = () => {
    router.push("/events")
  }

  if (error) {
    return (
      <div className="text-center py-16">
        <h3 className="text-2xl font-bold text-gray-900 mb-4">Unable to Load Events</h3>
        <p className="text-gray-600 mb-8">{error}</p>
        <Button
          onClick={loadEvents}
          className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700"
        >
          Try Again
        </Button>
      </div>
    )
  }

  return (
    <div>
      {/* Section Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
          {title}
        </h2>
        <p className="text-gray-600 text-lg">{description}</p>
        <div className="h-1 w-32 bg-gradient-to-r from-indigo-600 to-purple-600 mx-auto mt-8 rounded-full"></div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-indigo-600 border-t-transparent"></div>
        </div>
      ) : (
        <>
          {/* Events Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>

          {/* Empty State */}
          {events.length === 0 && (
            <div className="text-center py-16">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">No Events Found</h3>
              <p className="text-gray-600 mb-8">
                No events are scheduled at the moment. Check back later for upcoming events!
              </p>
            </div>
          )}

          {/* More Button */}
          {showMoreButton && events.length > 0 && (
            <div className="text-center">
              <Button
                onClick={handleViewMore}
                className="bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold shadow-lg hover:shadow-xl transition-all duration-200 px-8 py-3"
              >
                View All Events
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  )
}
