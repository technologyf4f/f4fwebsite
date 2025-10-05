import { supabase, isSupabaseConfigured } from "./supabase"
import type { Member } from "./types"

// Simple password hashing for demo - use bcrypt in production
function hashPassword(password: string): string {
  return Buffer.from(password + "framework4future_salt").toString("base64")
}

function verifyPassword(password: string, hash: string): boolean {
  const expectedHash = hashPassword(password)
  return expectedHash === hash
}

export async function authenticateMember(
  email: string,
  password: string,
): Promise<{ success: boolean; member?: Member; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    // Demo mode - check for admin credentials
    if (email === "admin@framework4future.org" && password === "admin123") {
      return {
        success: true,
        member: {
          id: "demo-admin",
          first_name: "Admin",
          last_name: "User",
          email: "admin@framework4future.org",
          phone: "",
          grade: "",
          school_name: "",
          payment_status: "completed",
          membership_status: "active",
          is_admin: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }
    }

    // Demo member
    if (email === "member@test.com" && password === "member123") {
      return {
        success: true,
        member: {
          id: "demo-member",
          first_name: "Test",
          last_name: "Member",
          email: "member@test.com",
          phone: "555-0123",
          grade: "12th Grade",
          school_name: "Demo High School",
          payment_status: "completed",
          membership_status: "active",
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }
    }

    return { success: false, error: "Invalid credentials" }
  }

  try {
    const { data, error } = await supabase.from("members").select("*").eq("email", email).single()

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, error: "Invalid email or password" }
      }
      return { success: false, error: error.message }
    }

    // Verify password
    if (!verifyPassword(password, data.password_hash)) {
      return { success: false, error: "Invalid email or password" }
    }

    // Check if member is active
    if (data.membership_status !== "active") {
      return { success: false, error: "Account is not active. Please complete payment and allow a week for verification to complete. If you are still facing issues please reach out to executivecommittee@framework4future.org" }
    }

    return { success: true, member: data }
  } catch (error) {
    console.error("Authentication error:", error)
    return { success: false, error: "Authentication failed" }
  }
}

export async function getMemberById(memberId: string): Promise<{ success: boolean; member?: Member; error?: string }> {
  if (!isSupabaseConfigured() || !supabase) {
    // Demo mode
    if (memberId === "demo-admin") {
      return {
        success: true,
        member: {
          id: "demo-admin",
          first_name: "Admin",
          last_name: "User",
          email: "admin@framework4future.org",
          phone: "",
          grade: "",
          school_name: "",
          payment_status: "completed",
          membership_status: "active",
          is_admin: true,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }
    }

    if (memberId === "demo-member") {
      return {
        success: true,
        member: {
          id: "demo-member",
          first_name: "Test",
          last_name: "Member",
          email: "member@test.com",
          phone: "555-0123",
          grade: "12th Grade",
          school_name: "Demo High School",
          payment_status: "completed",
          membership_status: "active",
          is_admin: false,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      }
    }

    return { success: false, error: "Member not found" }
  }

  try {
    const { data, error } = await supabase.from("members").select("*").eq("id", memberId).single()

    if (error) {
      if (error.code === "PGRST116") {
        return { success: false, error: "Member not found" }
      }
      return { success: false, error: error.message }
    }

    return { success: true, member: data }
  } catch (error) {
    console.error("Error fetching member:", error)
    return { success: false, error: "Failed to fetch member data" }
  }
}
