import type { MemberRegistration, Member } from "./types"
import { supabase, isSupabaseConfigured } from "./supabase"

export async function createMember(
  registration: MemberRegistration,
): Promise<{ success: boolean; member?: Member; error?: string }> {
  // Use server route when running in the browser (or always, safer)
  try {
    const res = await fetch("/api/members/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(registration),
    })

    const json = (await res.json()) as { success: boolean; member?: Member; error?: string }

    if (!json.success) return { success: false, error: json.error }

    return { success: true, member: json.member }
  } catch (err) {
    console.error("createMember fetch error:", err)
    // Fallback mock path if Supabase / route not configured
    if (!isSupabaseConfigured()) {
      return {
        success: true,
        member: {
          id: "demo-" + Date.now(),
          first_name: registration.firstName,
          last_name: registration.lastName,
          email: registration.email,
          phone: registration.phone,
          grade: registration.grade,
          school_name: registration.schoolName,
          payment_method: undefined,
          payment_status: "pending",
          transaction_id: undefined,
          membership_status: "active",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }
    }
    return { success: false, error: "Failed to create member" }
  }
}

export async function updateMemberPayment(
  memberId: string,
  paymentMethod: string,
  transactionId?: string,
): Promise<{ success: boolean; error?: string }> {
  try {
    const res = await fetch("/api/members/payment", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        memberId,
        paymentMethod,
        transactionId,
      }),
    })

    const json = (await res.json()) as { success: boolean; error?: string }
    return json
  } catch (err) {
    console.error("updateMemberPayment fetch error:", err)
    return { success: false, error: "Failed to update payment information" }
  }
}

export async function getMemberByEmail(email: string): Promise<{ success: boolean; member?: Member; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log("Supabase not configured, simulating member lookup")
    return { success: false, error: "Database not configured" }
  }

  try {
    const { data, error } = await supabase.from("members").select("*").eq("email", email).single()

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, error: "Member not found" }
      }
      console.error("Error fetching member:", error)
      return { success: false, error: error.message }
    }

    return { success: true, member: data }
  } catch (error) {
    console.error("Error fetching member:", error)
    return { success: false, error: "Failed to fetch member data" }
  }
}

export async function getAllMembers(): Promise<{ success: boolean; members?: Member[]; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log("Supabase not configured, returning empty members list")
    return { success: true, members: [] }
  }

  try {
    const { data, error } = await supabase.from("members").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Error fetching members:", error)
      return { success: false, error: error.message }
    }

    return { success: true, members: data || [] }
  } catch (error) {
    console.error("Error fetching members:", error)
    return { success: false, error: "Failed to fetch members data" }
  }
}
