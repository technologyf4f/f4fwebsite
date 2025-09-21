import { supabase, isSupabaseConfigured } from "./supabase"
import type { TeamMember } from "./types"

export async function getTeamMembers(): Promise<TeamMember[]> {
  if (!isSupabaseConfigured() || !supabase) {
    // Return mock data when Supabase is not configured
    return [
      // Youth Leaders
      {
        id: "1",
        first_name: "Sarah",
        last_name: "Johnson",
        title: "Youth Program Coordinator",
        category: "youth_leader",
        headshot_url: "/placeholder-user.jpg",
        bio: "Passionate about empowering young people through education and community engagement.",
        display_order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "2",
        first_name: "Michael",
        last_name: "Chen",
        title: "Student Outreach Lead",
        category: "youth_leader",
        headshot_url: "/placeholder-user.jpg",
        bio: "Dedicated to connecting with students and building meaningful relationships.",
        display_order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "3",
        first_name: "Emma",
        last_name: "Rodriguez",
        title: "Event Planning Coordinator",
        category: "youth_leader",
        headshot_url: "/placeholder-user.jpg",
        bio: "Creative organizer who brings communities together through impactful events.",
        display_order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "4",
        first_name: "David",
        last_name: "Thompson",
        title: "Volunteer Coordinator",
        category: "youth_leader",
        headshot_url: "/placeholder-user.jpg",
        bio: "Committed to mobilizing volunteers for maximum community impact.",
        display_order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      // Executive Members
      {
        id: "5",
        first_name: "Jennifer",
        last_name: "Williams",
        title: "Executive Director",
        category: "executive_member",
        headshot_url: "/placeholder-user.jpg",
        bio: "Visionary leader with 10+ years of experience in nonprofit management.",
        display_order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "6",
        first_name: "Robert",
        last_name: "Davis",
        title: "Program Manager",
        category: "executive_member",
        headshot_url: "/placeholder-user.jpg",
        bio: "Strategic thinker focused on program development and implementation.",
        display_order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "7",
        first_name: "Lisa",
        last_name: "Anderson",
        title: "Operations Manager",
        category: "executive_member",
        headshot_url: "/placeholder-user.jpg",
        bio: "Detail-oriented professional ensuring smooth organizational operations.",
        display_order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "8",
        first_name: "James",
        last_name: "Wilson",
        title: "Community Relations Manager",
        category: "executive_member",
        headshot_url: "/placeholder-user.jpg",
        bio: "Bridge-builder connecting our organization with community partners.",
        display_order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      // Board of Directors
      {
        id: "9",
        first_name: "Dr. Patricia",
        last_name: "Brown",
        title: "Board Chair",
        category: "board_director",
        headshot_url: "/placeholder-user.jpg",
        bio: "Retired educator with 30 years of experience in youth development.",
        display_order: 1,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "10",
        first_name: "Mark",
        last_name: "Taylor",
        title: "Vice Chair",
        category: "board_director",
        headshot_url: "/placeholder-user.jpg",
        bio: "Business executive passionate about social impact and governance.",
        display_order: 2,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "11",
        first_name: "Susan",
        last_name: "Miller",
        title: "Treasurer",
        category: "board_director",
        headshot_url: "/placeholder-user.jpg",
        bio: "CPA with expertise in nonprofit financial management and compliance.",
        display_order: 3,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "12",
        first_name: "Thomas",
        last_name: "Garcia",
        title: "Secretary",
        category: "board_director",
        headshot_url: "/placeholder-user.jpg",
        bio: "Legal professional specializing in nonprofit law and governance.",
        display_order: 4,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
      {
        id: "13",
        first_name: "Dr. Maria",
        last_name: "Martinez",
        title: "Board Member",
        category: "board_director",
        headshot_url: "/placeholder-user.jpg",
        bio: "Healthcare professional committed to community wellness initiatives.",
        display_order: 5,
        is_active: true,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      },
    ]
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .select("*")
      .eq("is_active", true)
      .order("category")
      .order("display_order")

    if (error) {
      console.error("Error fetching team members:", error)
      return []
    }

    return data || []
  } catch (error) {
    console.error("Error fetching team members:", error)
    return []
  }
}

export async function getTeamMembersByCategory(category: string): Promise<TeamMember[]> {
  const allMembers = await getTeamMembers()
  return allMembers.filter((member) => member.category === category)
}

export async function createTeamMember(
  member: Omit<TeamMember, "id" | "created_at" | "updated_at">,
): Promise<TeamMember | null> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log("Supabase not configured - would create team member:", member)
    return null
  }

  try {
    const { data, error } = await supabase.from("team_members").insert([member]).select().single()

    if (error) {
      console.error("Error creating team member:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error creating team member:", error)
    return null
  }
}

export async function updateTeamMember(id: string, updates: Partial<TeamMember>): Promise<TeamMember | null> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log("Supabase not configured - would update team member:", id, updates)
    return null
  }

  try {
    const { data, error } = await supabase
      .from("team_members")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Error updating team member:", error)
      return null
    }

    return data
  } catch (error) {
    console.error("Error updating team member:", error)
    return null
  }
}

export async function deleteTeamMember(id: string): Promise<boolean> {
  if (!isSupabaseConfigured() || !supabase) {
    console.log("Supabase not configured - would delete team member:", id)
    return false
  }

  try {
    const { error } = await supabase.from("team_members").delete().eq("id", id)

    if (error) {
      console.error("Error deleting team member:", error)
      return false
    }

    return true
  } catch (error) {
    console.error("Error deleting team member:", error)
    return false
  }
}
