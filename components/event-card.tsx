"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { ExternalLink, Calendar, Users } from "lucide-react"
import type { Event } from "@/lib/events-api"

interface EventCardProps {
  event: Event
  showLearnMore?: boolean
}

export function EventCard({ event, showLearnMore = true }: EventCardProps) {
  const [showDetails, setShowDetails] = useState(false)

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

  return (
    <>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg rounded-3xl hover:scale-105">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={event.image || "/placeholder.svg?height=300&width=400"}
            alt={event.name}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <CardHeader className="p-8">
          <CardTitle className="text-2xl font-bold text-gray-900">{event.name}</CardTitle>
          <p className="text-sm text-gray-500 font-semibold bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 px-3 py-1 rounded-full inline-block w-fit">
            {formatDateForDisplay(event.date)}
          </p>
        </CardHeader>
        <CardContent className="px-8 pb-8">
          <p className="text-gray-600 mb-6 leading-relaxed text-lg line-clamp-3">{event.description}</p>
          <div className="flex gap-3">
            {event.signUpUrl && (
              <Button
                asChild
                className="flex-1 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-200"
              >
                <a href={event.signUpUrl} target="_blank" rel="noopener noreferrer">
                  Sign Up
                  <ExternalLink className="h-4 w-4 ml-2" />
                </a>
              </Button>
            )}
            {showLearnMore && (
              <Button
                variant="outline"
                onClick={() => setShowDetails(true)}
                className={`${
                  event.signUpUrl ? "flex-1" : "w-full"
                } rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 font-semibold h-12 bg-transparent`}
              >
                Learn More
              </Button>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Event Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-2xl rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-4">{event.name}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Event Image */}
            <div className="aspect-video relative overflow-hidden rounded-2xl">
              <Image
                src={event.image || "/placeholder.svg?height=400&width=600"}
                alt={event.name}
                fill
                className="object-cover"
              />
            </div>

            {/* Event Details */}
            <div className="space-y-4">
              <div className="flex items-center gap-3 text-gray-600">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span className="font-semibold">{formatDateForDisplay(event.date)}</span>
              </div>

              <div className="prose max-w-none">
                <h3 className="text-xl font-bold text-gray-900 mb-3">About This Event</h3>
                <p className="text-gray-700 leading-relaxed text-lg">{event.description}</p>
              </div>

              {event.signUpUrl && (
                <div className="bg-gradient-to-r from-indigo-50 to-purple-50 p-6 rounded-2xl border border-indigo-100">
                  <h4 className="font-bold text-gray-900 mb-3 flex items-center gap-2">
                    <Users className="h-5 w-5 text-indigo-600" />
                    Ready to Join?
                  </h4>
                  <p className="text-gray-600 mb-4">
                    Don't miss out on this amazing opportunity to connect with fellow youth leaders and make a
                    difference in your community.
                  </p>
                  <Button
                    asChild
                    className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 rounded-xl font-semibold h-12 shadow-lg hover:shadow-xl transition-all duration-200"
                  >
                    <a href={event.signUpUrl} target="_blank" rel="noopener noreferrer">
                      Sign Up Now
                      <ExternalLink className="h-4 w-4 ml-2" />
                    </a>
                  </Button>
                </div>
              )}

              {event.created_at && (
                <div className="text-sm text-gray-500 pt-4 border-t border-gray-200">
                  Event created on {new Date(event.created_at).toLocaleDateString()}
                </div>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
