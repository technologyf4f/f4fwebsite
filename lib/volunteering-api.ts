import { supabase, isSupabaseConfigured } from "./supabase"
import type { VolunteeringHours, VolunteeringSubmission } from "./types"

export async function submitVolunteeringHours(
  memberId: string,
  submission: VolunteeringSubmission,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log("Supabase not configured, simulating volunteering hours submission")
    return { success: true }
  }

  try {
    const { error } = await supabase.from("volunteering_hours").insert([
      {
        member_id: memberId,
        activity_name: submission.activity_name,
        description: submission.description,
        hours_completed: submission.hours_completed,
        activity_date: submission.activity_date,
        organization_name: submission.organization_name,
        supervisor_name: submission.supervisor_name,
        supervisor_email: submission.supervisor_email,
        supervisor_phone: submission.supervisor_phone,
        status: "pending",
      },
    ])

    if (error) {
      console.error("Error submitting volunteering hours:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting volunteering hours:", error)
    return { success: false, error: "Failed to submit volunteering hours" }
  }
}

export async function getMemberVolunteeringHours(
  memberId: string,
): Promise<{ success: boolean; hours?: VolunteeringHours[]; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    // Demo data
    const demoHours: VolunteeringHours[] = [
      {
        id: "demo-1",
        member_id: memberId,
        activity_name: "Food Bank Volunteer",
        description: "Helped sort and distribute food to families in need",
        hours_completed: 4,
        activity_date: "2024-01-15",
        organization_name: "Local Food Bank",
        supervisor_name: "Jane Smith",
        supervisor_email: "jane@foodbank.org",
        supervisor_phone: "555-0123",
        status: "approved",
        admin_notes: "Great work!",
        reviewed_by: "Admin User",
        reviewed_at: "2024-01-16T10:00:00Z",
        created_at: "2024-01-15T14:00:00Z",
        updated_at: "2024-01-16T10:00:00Z",
      },
      {
        id: "demo-2",
        member_id: memberId,
        activity_name: "Beach Cleanup",
        description: "Participated in community beach cleanup event",
        hours_completed: 3,
        activity_date: "2024-01-20",
        organization_name: "Ocean Conservation Group",
        supervisor_name: "Bob Johnson",
        supervisor_email: "bob@ocean.org",
        status: "pending",
        created_at: "2024-01-20T16:00:00Z",
        updated_at: "2024-01-20T16:00:00Z",
      },
    ]
    return { success: true, hours: demoHours }
  }

  try {
    const { data, error } = await supabase
      .from("volunteering_hours")
      .select("*")
      .eq("member_id", memberId)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching volunteering hours:", error)
      return { success: false, error: error.message }
    }

    return { success: true, hours: data || [] }
  } catch (error) {
    console.error("Error fetching volunteering hours:", error)
    return { success: false, error: "Failed to fetch volunteering hours" }
  }
}

export async function getAllVolunteeringHours(): Promise<{
  success: boolean
  hours?: VolunteeringHours[]
  error?: string
}> {
  if (!isSupabaseConfigured() || !supabase) {
    // Demo data with member info
    const demoHours: VolunteeringHours[] = [
      {
        id: "demo-1",
        member_id: "demo-member",
        activity_name: "Food Bank Volunteer",
        description: "Helped sort and distribute food to families in need",
        hours_completed: 4,
        activity_date: "2024-01-15",
        organization_name: "Local Food Bank",
        supervisor_name: "Jane Smith",
        supervisor_email: "jane@foodbank.org",
        supervisor_phone: "555-0123",
        status: "approved",
        admin_notes: "Great work!",
        reviewed_by: "Admin User",
        reviewed_at: "2024-01-16T10:00:00Z",
        created_at: "2024-01-15T14:00:00Z",
        updated_at: "2024-01-16T10:00:00Z",
        member: {
          first_name: "Test",
          last_name: "Member",
          email: "member@test.com",
        },
      },
      {
        id: "demo-2",
        member_id: "demo-member",
        activity_name: "Beach Cleanup",
        description: "Participated in community beach cleanup event",
        hours_completed: 3,
        activity_date: "2024-01-20",
        organization_name: "Ocean Conservation Group",
        supervisor_name: "Bob Johnson",
        supervisor_email: "bob@ocean.org",
        status: "pending",
        created_at: "2024-01-20T16:00:00Z",
        updated_at: "2024-01-20T16:00:00Z",
        member: {
          first_name: "Test",
          last_name: "Member",
          email: "member@test.com",
        },
      },
    ]
    return { success: true, hours: demoHours }
  }

  try {
    const { data, error } = await supabase
      .from("volunteering_hours")
      .select(`
        *,
        member:members(first_name, last_name, email)
      `)
      .order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching all volunteering hours:", error)
      return { success: false, error: error.message }
    }

    return { success: true, hours: data || [] }
  } catch (error) {
    console.error("Error fetching all volunteering hours:", error)
    return { success: false, error: "Failed to fetch volunteering hours" }
  }
}

export async function updateVolunteeringHoursStatus(
  id: string,
  status: "approved" | "rejected",
  adminNotes?: string,
  reviewedBy?: string,
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log("Supabase not configured, simulating status update")
    return { success: true }
  }

  try {
    const { error } = await supabase
      .from("volunteering_hours")
      .update({
        status,
        admin_notes: adminNotes,
        reviewed_by: reviewedBy,
        reviewed_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      })
      .eq("id", id)

    if (error) {
      console.error("Error updating volunteering hours status:", error)
      return { success: false, error: error.message }
    }

    return { success: true }
  } catch (error) {
    console.error("Error updating volunteering hours status:", error)
    return { success: false, error: "Failed to update status" }
  }
}
