"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  Clock,
  Calendar,
  Award,
  TrendingUp,
  Plus,
  CheckCircle,
  XCircle,
  AlertCircle,
  Building,
  User,
  Mail,
  Phone,
} from "lucide-react"
import { VolunteeringHoursDialog } from "./volunteering-hours-dialog"
import type { VolunteeringHours } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface MemberDashboardProps {
  memberId: string
  memberName: string
}

export function MemberDashboard({ memberId, memberName }: MemberDashboardProps) {
  const [volunteeringHours, setVolunteeringHours] = useState<VolunteeringHours[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [showSubmitDialog, setShowSubmitDialog] = useState(false)

  const loadVolunteeringHours = async () => {
    if (!memberId) {
      setIsLoading(false)
      return
    }

    try {
      const response = await fetch(`/api/volunteering/member/${memberId}`)

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`)
      }

      const contentType = response.headers.get("content-type")
      if (!contentType || !contentType.includes("application/json")) {
        throw new Error("Response is not JSON")
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
    loadVolunteeringHours()
  }, [memberId])

  const handleHoursSubmitted = () => {
    loadVolunteeringHours()
    toast({
      title: "Success",
      description: "Volunteering hours submitted successfully!",
    })
  }

  // Calculate statistics
  const totalHours = volunteeringHours.reduce((sum, entry) => {
    return entry.status === "approved" ? sum + entry.hours_worked : sum
  }, 0)

  const pendingHours = volunteeringHours.filter((entry) => entry.status === "pending").length
  const approvedEntries = volunteeringHours.filter((entry) => entry.status === "approved").length
  const rejectedEntries = volunteeringHours.filter((entry) => entry.status === "rejected").length

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

  if (isLoading) {
    return (
      <div className="space-y-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Member Dashboard</h2>
            <p className="text-muted-foreground">Loading your volunteering activities...</p>
          </div>
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {[...Array(4)].map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Loading...</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="h-8 bg-gray-200 rounded animate-pulse"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold tracking-tight">Welcome, {memberName}!</h2>
          <p className="text-muted-foreground">Track your volunteering hours and community impact</p>
        </div>
        <Button onClick={() => setShowSubmitDialog(true)} className="flex items-center mr-10 gap-1">
          <Plus className="h-4 w-4" />
          Submit Hours
        </Button>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Approved Hours</CardTitle>
            <Clock className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{totalHours}</div>
            <p className="text-xs text-muted-foreground">
              {approvedEntries} approved {approvedEntries === 1 ? "activity" : "activities"}
            </p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Pending Review</CardTitle>
            <AlertCircle className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{pendingHours}</div>
            <p className="text-xs text-muted-foreground">Awaiting admin approval</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Activities Completed</CardTitle>
            <Award className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{volunteeringHours.length}</div>
            <p className="text-xs text-muted-foreground">Total submissions</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Success Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {volunteeringHours.length > 0 ? Math.round((approvedEntries / volunteeringHours.length) * 100) : 0}%
            </div>
            <p className="text-xs text-muted-foreground">Approval rate</p>
          </CardContent>
        </Card>
      </div>

      {/* Recent Activities */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Volunteering Activities</CardTitle>
          <CardDescription>Your submitted volunteering hours and their approval status</CardDescription>
        </CardHeader>
        <CardContent>
          {volunteeringHours.length === 0 ? (
            <div className="text-center py-8">
              <Calendar className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <h3 className="text-lg font-semibold mb-2">No activities yet</h3>
              <p className="text-muted-foreground mb-4">Start by submitting your first volunteering hours!</p>
              <Button onClick={() => setShowSubmitDialog(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Submit Your First Activity
              </Button>
            </div>
          ) : (
            <ScrollArea className="h-[400px]">
              <div className="space-y-4">
                {volunteeringHours.map((entry) => (
                  <div key={entry.id} className="border rounded-lg p-4">
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <h4 className="font-semibold">{entry.activity_name}</h4>
                          <Badge className={`${getStatusColor(entry.status)} capitalize`}>
                            {getStatusIcon(entry.status)}
                            <span className="ml-1">{entry.status}</span>
                          </Badge>
                        </div>
                        <p className="text-sm text-muted-foreground mb-2">{entry.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-lg font-bold">{entry.hours_worked}h</div>
                        <div className="text-xs text-muted-foreground">
                          {new Date(entry.activity_date).toLocaleDateString()}
                        </div>
                      </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
                      <div className="flex items-center gap-2">
                        <Building className="h-4 w-4 text-muted-foreground" />
                        <span>{entry.organization_name}</span>
                      </div>
                      {entry.supervisor_name && (
                        <div className="flex items-center gap-2">
                          <User className="h-4 w-4 text-muted-foreground" />
                          <span>{entry.supervisor_name}</span>
                        </div>
                      )}
                      {entry.supervisor_email && (
                        <div className="flex items-center gap-2">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span>{entry.supervisor_email}</span>
                        </div>
                      )}
                      {entry.supervisor_phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span>{entry.supervisor_phone}</span>
                        </div>
                      )}
                    </div>

                    {entry.admin_notes && (
                      <>
                        <Separator className="my-3" />
                        <div className="bg-muted p-3 rounded">
                          <p className="text-sm font-medium mb-1">Admin Notes:</p>
                          <p className="text-sm">{entry.admin_notes}</p>
                          {entry.reviewed_by && entry.reviewed_at && (
                            <p className="text-xs text-muted-foreground mt-2">
                              Reviewed by {entry.reviewed_by} on {new Date(entry.reviewed_at).toLocaleDateString()}
                            </p>
                          )}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </ScrollArea>
          )}
        </CardContent>
      </Card>

      <VolunteeringHoursDialog
        open={showSubmitDialog}
        onOpenChange={setShowSubmitDialog}
        memberId={memberId}
        onSubmitted={handleHoursSubmitted}
      />
    </div>
  )
}
