"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle,
  XCircle,
  AlertCircle,
  Clock,
  Calendar,
  Building,
  User,
  Mail,
  Phone,
  MessageSquare,
} from "lucide-react"
import type { VolunteeringHours } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface VolunteeringManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  currentUser: string
}

export function VolunteeringManagementDialog({ open, onOpenChange, currentUser }: VolunteeringManagementDialogProps) {
  const [volunteeringHours, setVolunteeringHours] = useState<VolunteeringHours[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [selectedEntry, setSelectedEntry] = useState<VolunteeringHours | null>(null)
  const [adminNotes, setAdminNotes] = useState("")
  const [isUpdating, setIsUpdating] = useState(false)

  const loadVolunteeringHours = async () => {
    setIsLoading(true)
    try {
      const response = await fetch("/api/volunteering/admin")

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const data = await response.json()

      if (data.success) {
        setVolunteeringHours(data.hours || [])
      } else {
        console.error("Failed to load volunteering hours:", data.error)
        toast({
          title: "Error",
          description: data.error || "Failed to load volunteering hours",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading volunteering hours:", error)
      toast({
        title: "Error",
        description: "Failed to load volunteering hours. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsLoading(false)
    }
  }

  useEffect(() => {
    if (open) {
      loadVolunteeringHours()
    }
  }, [open])

  const handleStatusUpdate = async (id: string, status: "approved" | "rejected") => {
    setIsUpdating(true)
    try {
      const response = await fetch("/api/volunteering/admin", {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id,
          status,
          adminNotes,
          reviewedBy: currentUser,
        }),
      })

      const data = await response.json()

      if (!data.success) {
        toast({
          title: "Error",
          description: data.error || "Failed to update status",
          variant: "destructive",
        })
        return
      }

      // Refresh the data
      await loadVolunteeringHours()
      setSelectedEntry(null)
      setAdminNotes("")

      toast({
        title: "Success",
        description: `Volunteering hours ${status} successfully!`,
      })
    } catch (error) {
      console.error("Error updating status:", error)
      toast({
        title: "Error",
        description: "An error occurred while updating. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsUpdating(false)
    }
  }

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "approved":
        return <CheckCircle className="h-4 w-4 text-green-600" />
      case "rejected":
        return <XCircle className="h-4 w-4 text-red-600" />
      default:
        return <AlertCircle className="h-4 w-4 text-yellow-600" />
    }
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-100 text-green-800 border-green-200"
      case "rejected":
        return "bg-red-100 text-red-800 border-red-200"
      default:
        return "bg-yellow-100 text-yellow-800 border-yellow-200"
    }
  }

  const pendingCount = volunteeringHours.filter((h) => h.status === "pending").length
  const approvedCount = volunteeringHours.filter((h) => h.status === "approved").length
  const totalHours = volunteeringHours
    .filter((h) => h.status === "approved")
    .reduce((sum, h) => sum + h.hours_worked, 0)

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
            Volunteering Hours Management
          </DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 h-[calc(90vh-120px)]">
          {/* Statistics and List */}
          <div className="lg:col-span-2 space-y-4">
            {/* Statistics */}
            <div className="grid grid-cols-3 gap-4">
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <AlertCircle className="h-4 w-4 text-yellow-600" />
                    <span className="text-sm font-medium">Pending</span>
                  </div>
                  <div className="text-2xl font-bold">{pendingCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <CheckCircle className="h-4 w-4 text-green-600" />
                    <span className="text-sm font-medium">Approved</span>
                  </div>
                  <div className="text-2xl font-bold">{approvedCount}</div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-blue-600" />
                    <span className="text-sm font-medium">Total Approved Hours</span>
                  </div>
                  <div className="text-2xl font-bold">{totalHours}</div>
                </CardContent>
              </Card>
            </div>

            {/* Volunteering Hours List */}
            <Card className="flex-1">
              <CardHeader>
                <CardTitle>Submitted Hours</CardTitle>
                <CardDescription>Review and approve member volunteering activities</CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="border rounded-lg p-4">
                        <div className="h-4 bg-gray-200 rounded animate-pulse mb-2"></div>
                        <div className="h-3 bg-gray-200 rounded animate-pulse w-3/4"></div>
                      </div>
                    ))}
                  </div>
                ) : volunteeringHours.length === 0 ? (
                  <div className="text-center py-8">
                    <Clock className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <h3 className="text-lg font-semibold mb-2">No submissions yet</h3>
                    <p className="text-muted-foreground">
                      Volunteering hours will appear here when members submit them.
                    </p>
                  </div>
                ) : (
                  <ScrollArea className="h-[400px]">
                    <div className="space-y-3">
                      {volunteeringHours.map((entry) => (
                        <div
                          key={entry.id}
                          className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedEntry?.id === entry.id ? "border-blue-500 bg-blue-50" : "hover:bg-gray-50"
                          }`}
                          onClick={() => setSelectedEntry(entry)}
                        >
                          <div className="flex items-start justify-between mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="font-semibold">{entry.activity_name}</h4>
                                <Badge className={`${getStatusColor(entry.status)} capitalize`}>
                                  {getStatusIcon(entry.status)}
                                  <span className="ml-1">{entry.status}</span>
                                </Badge>
                              </div>
                              <p className="text-sm text-muted-foreground">
                                {entry.member?.first_name} {entry.member?.last_name} • {entry.organization_name}
                              </p>
                            </div>
                            <div className="text-right">
                              <div className="text-lg font-bold">{entry.hours_worked}h</div>
                              <div className="text-xs text-muted-foreground">
                                {new Date(entry.activity_date).toLocaleDateString()}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Review Panel */}
          <div className="space-y-4">
            {selectedEntry ? (
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare className="h-5 w-5" />
                    Review Details
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div>
                    <h4 className="font-semibold mb-2">{selectedEntry.activity_name}</h4>
                    <Badge className={`${getStatusColor(selectedEntry.status)} capitalize mb-3`}>
                      {getStatusIcon(selectedEntry.status)}
                      <span className="ml-1">{selectedEntry.status}</span>
                    </Badge>
                  </div>

                  <div className="space-y-3 text-sm">
                    <div className="flex items-center gap-2">
                      <User className="h-4 w-4 text-muted-foreground" />
                      <span>
                        {selectedEntry.member?.first_name} {selectedEntry.member?.last_name}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEntry.member?.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEntry.hours_worked} hours</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span>{new Date(selectedEntry.activity_date).toLocaleDateString()}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Building className="h-4 w-4 text-muted-foreground" />
                      <span>{selectedEntry.organization_name}</span>
                    </div>
                  </div>

                  {selectedEntry.description && (
                    <>
                      <Separator />
                      <div>
                        <h5 className="font-medium mb-2">Description</h5>
                        <p className="text-sm text-muted-foreground">{selectedEntry.description}</p>
                      </div>
                    </>
                  )}

                  {(selectedEntry.supervisor_name ||
                    selectedEntry.supervisor_email ||
                    selectedEntry.supervisor_phone) && (
                    <>
                      <Separator />
                      <div>
                        <h5 className="font-medium mb-2">Supervisor Information</h5>
                        <div className="space-y-2 text-sm">
                          {selectedEntry.supervisor_name && (
                            <div className="flex items-center gap-2">
                              <User className="h-4 w-4 text-muted-foreground" />
                              <span>{selectedEntry.supervisor_name}</span>
                            </div>
                          )}
                          {selectedEntry.supervisor_email && (
                            <div className="flex items-center gap-2">
                              <Mail className="h-4 w-4 text-muted-foreground" />
                              <span>{selectedEntry.supervisor_email}</span>
                            </div>
                          )}
                          {selectedEntry.supervisor_phone && (
                            <div className="flex items-center gap-2">
                              <Phone className="h-4 w-4 text-muted-foreground" />
                              <span>{selectedEntry.supervisor_phone}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </>
                  )}

                  {selectedEntry.status === "pending" && (
                    <>
                      <Separator />
                      <div className="space-y-3">
                        <div>
                          <Label htmlFor="adminNotes">Admin Notes (Optional)</Label>
                          <Textarea
                            id="adminNotes"
                            value={adminNotes}
                            onChange={(e) => setAdminNotes(e.target.value)}
                            placeholder="Add notes for the member..."
                            rows={3}
                            disabled={isUpdating}
                          />
                        </div>
                        <div className="flex gap-2">
                          <Button
                            onClick={() => handleStatusUpdate(selectedEntry.id, "approved")}
                            disabled={isUpdating}
                            className="flex-1 bg-green-600 hover:bg-green-700"
                          >
                            <CheckCircle className="h-4 w-4 mr-2" />
                            {isUpdating ? "Updating..." : "Approve"}
                          </Button>
                          <Button
                            onClick={() => handleStatusUpdate(selectedEntry.id, "rejected")}
                            disabled={isUpdating}
                            variant="destructive"
                            className="flex-1"
                          >
                            <XCircle className="h-4 w-4 mr-2" />
                            {isUpdating ? "Updating..." : "Reject"}
                          </Button>
                        </div>
                      </div>
                    </>
                  )}

                  {selectedEntry.admin_notes && (
                    <>
                      <Separator />
                      <div>
                        <h5 className="font-medium mb-2">Previous Admin Notes</h5>
                        <div className="bg-muted p-3 rounded text-sm">
                          <p>{selectedEntry.admin_notes}</p>
                          {selectedEntry.reviewed_by && selectedEntry.reviewed_at && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Reviewed by {selectedEntry.reviewed_by} on{" "}
                              {new Date(selectedEntry.reviewed_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="p-8 text-center">
                  <MessageSquare className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-lg font-semibold mb-2">Select an Entry</h3>
                  <p className="text-muted-foreground">Click on a volunteering hours entry to review and approve it.</p>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
