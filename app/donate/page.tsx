"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserCircle, ArrowLeft, Heart, Users, Target } from "lucide-react"

interface Donation {
  id: string
  name: string
  amount: number
  reason: string
  date: string
}

export default function DonatePage() {
  const [donations, setDonations] = useState<Donation[]>([
    {
      id: "1",
      name: "Sarah Johnson",
      amount: 100,
      reason: "Supporting youth leadership development in my community",
      date: "June 5, 2024",
    },
    {
      id: "2",
      name: "Michael Chen",
      amount: 250,
      reason: "Believe in empowering the next generation of leaders",
      date: "June 3, 2024",
    },
    {
      id: "3",
      name: "Anonymous",
      amount: 50,
      reason: "Great work with civic engagement programs",
      date: "June 1, 2024",
    },
  ])

  const [name, setName] = useState("")
  const [amount, setAmount] = useState("")
  const [reason, setReason] = useState("")
  const [isAnonymous, setIsAnonymous] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!amount || !reason.trim()) {
      return
    }

    const newDonation: Donation = {
      id: Date.now().toString(),
      name: isAnonymous ? "Anonymous" : name.trim() || "Anonymous",
      amount: Number.parseFloat(amount),
      reason: reason.trim(),
      date: new Date().toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      }),
    }

    setDonations((prev) => [newDonation, ...prev])

    // Reset form
    setName("")
    setAmount("")
    setReason("")
    setIsAnonymous(false)

    // Show success message (in a real app, this would redirect to payment)
    alert("Thank you for your donation! In a real application, this would redirect to a secure payment processor.")
  }

  const totalDonations = donations.reduce((sum, donation) => sum + donation.amount, 0)

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

            <nav className="hidden lg:flex items-center space-x-8 ml-16">
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                About Us
              </Link>
              <Link href="/programs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Programs
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Blogs
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors">
                Contact Us
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Donate Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Support Our Mission</h1>
              <p className="text-gray-600 mt-2">Help us empower the next generation of leaders</p>
            </div>
          </div>
        </div>
      </section>

      {/* Impact Stats */}
      <section className="bg-indigo-700 text-white">
        <div className="container mx-auto px-4 py-12">
          <div className="grid md:grid-cols-3 gap-8 text-center">
            <div className="flex flex-col items-center">
              <Heart className="h-12 w-12 mb-4" />
              <div className="text-3xl font-bold mb-2">${totalDonations.toLocaleString()}</div>
              <div className="text-indigo-200">Total Raised</div>
            </div>
            <div className="flex flex-col items-center">
              <Users className="h-12 w-12 mb-4" />
              <div className="text-3xl font-bold mb-2">{donations.length}</div>
              <div className="text-indigo-200">Generous Donors</div>
            </div>
            <div className="flex flex-col items-center">
              <Target className="h-12 w-12 mb-4" />
              <div className="text-3xl font-bold mb-2">500+</div>
              <div className="text-indigo-200">Youth Impacted</div>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Donation Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Heart className="h-5 w-5 text-red-500" />
                    Make a Donation
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="donorName">Your Name</Label>
                      <Input
                        id="donorName"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        placeholder="Enter your full name"
                        disabled={isAnonymous}
                      />
                      <div className="flex items-center gap-2 mt-2">
                        <input
                          type="checkbox"
                          id="anonymous"
                          checked={isAnonymous}
                          onChange={(e) => setIsAnonymous(e.target.checked)}
                          className="rounded"
                        />
                        <Label htmlFor="anonymous" className="text-sm cursor-pointer">
                          Donate anonymously
                        </Label>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="amount">Donation Amount ($)</Label>
                      <Input
                        id="amount"
                        type="number"
                        min="1"
                        step="0.01"
                        value={amount}
                        onChange={(e) => setAmount(e.target.value)}
                        placeholder="Enter amount"
                        required
                      />
                      <div className="grid grid-cols-4 gap-2 mt-2">
                        {[25, 50, 100, 250].map((preset) => (
                          <Button
                            key={preset}
                            type="button"
                            variant="outline"
                            size="sm"
                            onClick={() => setAmount(preset.toString())}
                          >
                            ${preset}
                          </Button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="reason">Why are you donating?</Label>
                      <Textarea
                        id="reason"
                        value={reason}
                        onChange={(e) => setReason(e.target.value)}
                        placeholder="Tell us what motivates your support..."
                        rows={4}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-green-600 hover:bg-green-700 text-lg py-6">
                      Donate ${amount || "0"}
                    </Button>
                  </form>
                </CardContent>
              </Card>

              <div className="mt-6 bg-green-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Your Impact</h3>
                <ul className="text-sm text-gray-600 space-y-1">
                  <li>• $25 provides leadership materials for one youth</li>
                  <li>• $50 sponsors a youth for a community service project</li>
                  <li>• $100 funds a leadership workshop for 10 participants</li>
                  <li>• $250 supports a full leadership development program</li>
                </ul>
              </div>
            </div>

            {/* Recent Donations */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Donations</h2>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {donations.map((donation) => (
                  <Card key={donation.id}>
                    <CardContent className="p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-gray-900">{donation.name}</h3>
                        <span className="text-lg font-bold text-green-600">${donation.amount}</span>
                      </div>
                      <p className="text-gray-600 text-sm mb-2">"{donation.reason}"</p>
                      <p className="text-xs text-gray-500">{donation.date}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {donations.length === 0 && (
                <div className="text-center py-8">
                  <Heart className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500">Be the first to make a donation!</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
