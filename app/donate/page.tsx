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
          <div className="grid lg:grid-cols-1 gap-12">
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
                <h2 className="font-semibold text-gray-900 mb-2">Tax Information: Framework For Future is exempt from federal income taxes under Section 501(C)(3) of the Internal Revenue Code. Therefore, your gift is tax-deductible to the full extent provided by law. Our federal tax identification number is 82-1614145. You should consult your financial planner or tax adviser to determine the exact tax advantages of any gift you are considering.</h2>                
              </div>
            </div>

            {/* Recent Donations */}
            <div>            
              
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
