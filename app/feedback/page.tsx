"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserCircle, ArrowLeft, MessageSquare, Star } from "lucide-react"

interface Feedback {
  id: string
  name: string
  reason: string
  date: string
  rating?: number
}

export default function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState<Feedback[]>([
    {
      id: "1",
      name: "David Thompson",
      reason:
        "The leadership workshop was transformative for my daughter. She came back with so much confidence and new skills!",
      date: "June 4, 2024",
      rating: 5,
    },
    {
      id: "2",
      name: "Maria Rodriguez",
      reason:
        "I appreciate the community service opportunities provided. It's helped my son understand the importance of giving back.",
      date: "May 28, 2024",
      rating: 4,
    },
    {
      id: "3",
      name: "James Wilson",
      reason:
        "The civic engagement program opened my eyes to how I can make a difference in local politics. Thank you!",
      date: "May 15, 2024",
      rating: 5,
    },
  ])

  const [name, setName] = useState("")
  const [reason, setReason] = useState("")
  const [rating, setRating] = useState<number>(5)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!name.trim() || !reason.trim()) {
      return
    }

    const newFeedback: Feedback = {
      id: Date.now().toString(),
      name: name.trim(),
      reason: reason.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
      rating,
    }

    setFeedbacks((prev) => [newFeedback, ...prev])

    // Reset form
    setName("")
    setReason("")
    setRating(5)

    // Show success message
    alert("Thank you for your feedback!")
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded">
                  <div className="w-6 h-6 border-2 border-white"></div>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  <div>FRAMEWORK</div>
                  <div>4 FUTURE</div>
                </div>
              </div>
            </Link>

            <nav className="hidden lg:flex items-center ml-16">
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                About Us
              </Link>
              <Link href="/programs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                Programs
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                Blogs
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                Contact
              </Link>
              <Link href="/feedback" className="text-blue-600 font-medium px-6">
                Feedback
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button asChild variant="default" className="hidden lg:inline-flex bg-green-600 hover:bg-green-700">
                <Link href="/donate">Donate</Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Feedback Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Feedback</h1>
              <p className="text-gray-600 mt-2">Share your experience with our programs</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Feedback Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5 text-indigo-600" />
                    Share Your Feedback
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="name">Your Name</Label>
                      <Input
                        id="name"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        required
                      />
                    </div>

                    <div>
                      <Label htmlFor="reason">Your Feedback</Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Share your experience with our programs..."
                        rows={6}
                        required
                      />
                    </div>

                    <div>
                      <Label>Rating</Label>
                      <div className="flex items-center gap-1 mt-2">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <button
                            key={star}
                            type="button"
                            onClick={() => setRating(star)}
                            className="focus:outline-none"
                          >
                            <Star
                              className={`h-6 w-6 ${
                                star <= rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                              }`}
                            />
                          </button>
                        ))}
                      </div>
                    </div>

                    <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800">
                      Submit Feedback
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-6 bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Why Your Feedback Matters</h3>
                <p className="text-gray-600">
                  Your feedback helps us improve our programs and better serve the youth in our community. We appreciate
                  your time in sharing your thoughts and experiences.
                </p>
              </div>
            </div>

            {/* Recent Feedback */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Community Feedback</h2>
              <div className="space-y-4 max-h-[600px] overflow-y-auto">
                {feedbacks.map((feedback) => (
                  <Card key={feedback.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{feedback.name}</h3>
                        {feedback.rating && (
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < feedback.rating! ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        )}
                      </div>
                      <p className="text-gray-600 text-sm mb-2">"{feedback.reason}"</p>
                      <p className="text-xs text-gray-500">{feedback.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {feedbacks.length === 0 && (
                <div className="text-center py-8">
                  <MessageSquare className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Be the first to share your feedback!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
