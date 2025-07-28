"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Calendar, Clock, Building, User, Mail, Phone, AlertCircle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface VolunteeringHoursDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  memberId: string
  onSubmitted: () => void
}

export function VolunteeringHoursDialog({ open, onOpenChange, memberId, onSubmitted }: VolunteeringHoursDialogProps) {
  const [formData, setFormData] = useState({
    activity_name: "",
    description: "",
    hours_worked: "",
    activity_date: "",
    organization_name: "",
    supervisor_name: "",
    supervisor_email: "",
    supervisor_phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setError("")

    // Validate required fields
    if (
      !formData.activity_name ||
      !formData.hours_worked ||
      !formData.activity_date ||
      !formData.organization_name
    ) {
      setError("Please fill in all required fields")
      setIsSubmitting(false)
      return
    }

    // Validate hours
    const hours = Number.parseFloat(formData.hours_worked)
    if (isNaN(hours) || hours <= 0) {
      setError("Hours worked must be a positive number")
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch("/api/volunteering/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          memberId,
          ...formData,
          hours_worked: hours,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        setError(data.error || "Failed to submit volunteering hours")
        setIsSubmitting(false)
        return
      }

      // Reset form and close dialog
      setFormData({
        activity_name: "",
        description: "",
        hours_worked: "",
        activity_date: "",
        organization_name: "",
        supervisor_name: "",
        supervisor_email: "",
        supervisor_phone: "",
      })
      onOpenChange(false)
      onSubmitted()
    } catch (error) {
      console.error("Error submitting volunteering hours:", error)
      setError("An error occurred while submitting. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (error) setError("") // Clear error when user starts typing
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Submit Volunteering Hours
          </DialogTitle>
        </DialogHeader>

        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Activity Details
            </CardTitle>
            <CardDescription>
              Please provide details about your volunteering activity. All fields marked with * are required.
            </CardDescription>
          </CardHeader>
          <CardContent>
            {error && (
              <Alert className="mb-4" variant="destructive">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{error}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activity_name" className="flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Activity Name *
                  </Label>
                  <Input
                    id="activity_name"
                    value={formData.activity_name}
                    onChange={(e) => handleInputChange("activity_name", e.target.value)}
                    placeholder="e.g., Food Bank Volunteer"
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="hours_worked" className="flex items-center gap-2">
                    <Clock className="h-4 w-4" />
                    Hours Worked *
                  </Label>
                  <Input
                    id="hours_worked"
                    type="number"
                    step="0.5"
                    min="0.5"
                    value={formData.hours_worked}
                    onChange={(e) => handleInputChange("hours_worked", e.target.value)}
                    placeholder="e.g., 4.5"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="activity_date">Activity Date *</Label>
                  <Input
                    id="activity_date"
                    type="date"
                    value={formData.activity_date}
                    onChange={(e) => handleInputChange("activity_date", e.target.value)}
                    required
                    disabled={isSubmitting}
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="organization_name" className="flex items-center gap-2">
                    <Building className="h-4 w-4" />
                    Organization Name *
                  </Label>
                  <Input
                    id="organization_name"
                    value={formData.organization_name}
                    onChange={(e) => handleInputChange("organization_name", e.target.value)}
                    placeholder="e.g., Local Food Bank"
                    required
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Activity Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => handleInputChange("description", e.target.value)}
                  placeholder="Describe what you did during this volunteering activity..."
                  rows={3}
                  disabled={isSubmitting}
                />
              </div>

              <div className="space-y-4">
                <h4 className="font-semibold text-gray-900">Supervisor Information (Optional)</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="supervisor_name" className="flex items-center gap-2">
                      <User className="h-4 w-4" />
                      Supervisor Name
                    </Label>
                    <Input
                      id="supervisor_name"
                      value={formData.supervisor_name}
                      onChange={(e) => handleInputChange("supervisor_name", e.target.value)}
                      placeholder="e.g., Jane Smith"
                      disabled={isSubmitting}
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="supervisor_email" className="flex items-center gap-2">
                      <Mail className="h-4 w-4" />
                      Supervisor Email
                    </Label>
                    <Input
                      id="supervisor_email"
                      type="email"
                      value={formData.supervisor_email}
                      onChange={(e) => handleInputChange("supervisor_email", e.target.value)}
                      placeholder="jane@organization.org"
                      disabled={isSubmitting}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="supervisor_phone" className="flex items-center gap-2">
                    <Phone className="h-4 w-4" />
                    Supervisor Phone
                  </Label>
                  <Input
                    id="supervisor_phone"
                    type="tel"
                    value={formData.supervisor_phone}
                    onChange={(e) => handleInputChange("supervisor_phone", e.target.value)}
                    placeholder="(555) 123-4567"
                    disabled={isSubmitting}
                  />
                </div>
              </div>

              <div className="flex gap-3 pt-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => onOpenChange(false)}
                  disabled={isSubmitting}
                  className="flex-1"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                >
                  {isSubmitting ? "Submitting..." : "Submit Hours"}
                </Button>
              </div>
            </form>
          </CardContent>
        </Card>
      </DialogContent>
    </Dialog>
  )
}
