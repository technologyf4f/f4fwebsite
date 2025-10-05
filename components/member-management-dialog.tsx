"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Search, UserCheck, UserX, Mail, Phone, GraduationCap, School } from "lucide-react"
import { getAllMembers, updateMemberStatus } from "@/lib/members-api"
import type { Member } from "@/lib/types"
import { toast } from "@/hooks/use-toast"

interface MemberManagementDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function MemberManagementDialog({ open, onOpenChange }: MemberManagementDialogProps) {
  const [members, setMembers] = useState<Member[]>([])
  const [filteredMembers, setFilteredMembers] = useState<Member[]>([])
  const [searchTerm, setSearchTerm] = useState("")
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    if (open) {
      loadMembers()
    }
  }, [open])

  useEffect(() => {
    if (searchTerm.trim() === "") {
      setFilteredMembers(members)
    } else {
      const filtered = members.filter(
        (member) =>
          member.first_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.last_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
          member.school_name.toLowerCase().includes(searchTerm.toLowerCase()),
      )
      setFilteredMembers(filtered)
    }
  }, [searchTerm, members])

  const loadMembers = async () => {
    setLoading(true)
    try {
      const result = await getAllMembers()
      if (result.success && result.members) {
        setMembers(result.members)
        setFilteredMembers(result.members)
      } else {
        toast({
          title: "Error",
          description: result.error || "Failed to load members",
          variant: "destructive",
        })
      }
    } catch (error) {
      console.error("Error loading members:", error)
      toast({
        title: "Error",
        description: "Failed to load members",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const toggleMemberStatus = async (memberId: string, currentStatus: string) => {
    const newStatus = currentStatus === "active" ? "inactive" : "active"

    try {
      // Call API to update member status
      const result = await updateMemberStatus(memberId, newStatus)
      
      if (!result.success) {
        throw new Error(result.error || 'Failed to update member status')
      }
      
      // Update members list - filteredMembers will update automatically via useEffect
      setMembers(prev => prev.map(member =>
        member.id === memberId ? { ...member, membership_status: newStatus } : member
      ))

      toast({
        title: "Success",
        description: `Member ${newStatus === "active" ? "activated" : "deactivated"} successfully`,
      })
    } catch (error) {
      console.error("Error updating member status:", error)
      toast({
        title: "Error",
        description: "Failed to update member status",
        variant: "destructive",
      })
    }
  }

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "active":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Active
          </Badge>
        )
      case "inactive":
        return (
          <Badge variant="secondary" className="bg-red-100 text-red-800">
            Inactive
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  const getPaymentStatusBadge = (status: string) => {
    switch (status) {
      case "completed":
        return (
          <Badge variant="default" className="bg-green-100 text-green-800">
            Paid
          </Badge>
        )
      case "pending":
        return (
          <Badge variant="outline" className="bg-yellow-100 text-yellow-800">
            Pending
          </Badge>
        )
      case "failed":
        return <Badge variant="destructive">Failed</Badge>
      default:
        return <Badge variant="outline">{status}</Badge>
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-6xl max-h-[90vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <UserCheck className="h-5 w-5" />
            Member Management
          </DialogTitle>
          <DialogDescription>
            Search and manage member accounts. You can activate or deactivate members as needed.
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          {/* Search Bar */}
          <div className="flex items-center space-x-2">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, email, or school..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Button onClick={loadMembers} disabled={loading}>
              {loading ? "Loading..." : "Refresh"}
            </Button>
          </div>

          {/* Members Table */}
          <div className="border rounded-lg overflow-hidden">
            <div className="max-h-[500px] overflow-y-auto">
              <Table>
                <TableHeader className="sticky top-0 bg-white z-10">
                  <TableRow>
                    <TableHead>Name</TableHead>
                    <TableHead>Contact</TableHead>
                    <TableHead>Education</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead>Payment</TableHead>
                    <TableHead>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {loading ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        Loading members...
                      </TableCell>
                    </TableRow>
                  ) : filteredMembers.length === 0 ? (
                    <TableRow>
                      <TableCell colSpan={6} className="text-center py-8">
                        {searchTerm ? "No members found matching your search." : "No members found."}
                      </TableCell>
                    </TableRow>
                  ) : (
                    filteredMembers.map((member) => (
                      <TableRow key={member.id}>
                        <TableCell>
                          <div className="font-medium">
                            {member.first_name} {member.last_name}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <Mail className="h-3 w-3" />
                              {member.email}
                            </div>
                            {member.phone && (
                              <div className="flex items-center gap-1 text-sm text-gray-500">
                                <Phone className="h-3 w-3" />
                                {member.phone}
                              </div>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>
                          <div className="space-y-1">
                            <div className="flex items-center gap-1 text-sm">
                              <GraduationCap className="h-3 w-3" />
                              {member.grade}
                            </div>
                            <div className="flex items-center gap-1 text-sm text-gray-500">
                              <School className="h-3 w-3" />
                              {member.school_name}
                            </div>
                          </div>
                        </TableCell>
                        <TableCell>{getStatusBadge(member.membership_status)}</TableCell>
                        <TableCell>{getPaymentStatusBadge(member.payment_status)}<div className="text-sm text-gray-500">ID: {member.transaction_id}</div></TableCell>
                        <TableCell>
                          <Button
                            variant={member.membership_status === "active" ? "destructive" : "default"}
                            size="sm"
                            onClick={() => toggleMemberStatus(member.id, member.membership_status)}
                            className="flex items-center gap-1"
                          >
                            {member.membership_status === "active" ? (
                              <>
                                <UserX className="h-3 w-3" />
                                Deactivate
                              </>
                            ) : (
                              <>
                                <UserCheck className="h-3 w-3" />
                                Activate
                              </>
                            )}
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>
          </div>

          {/* Summary */}
          {!loading && (
            <div className="flex justify-between items-center text-sm text-gray-500 pt-2 border-t">
              <span>
                Showing {filteredMembers.length} of {members.length} members
              </span>
              <span>
                Active: {members.filter((m) => m.membership_status === "active").length} | Inactive:{" "}
                {members.filter((m) => m.membership_status === "inactive").length} | Pending:{" "}
                {members.filter((m) => m.membership_status === "pending").length}
              </span>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  )
}
