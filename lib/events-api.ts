import { supabase, isSupabaseConfigured, type Event } from "./supabase"

// Fallback data when Supabase is not available
const fallbackEvents: Event[] = [
  {
    id: "1",
    name: "Youth Leadership Summit",
    description:
      "Annual summit bringing together young leaders from across the Carolinas to share ideas and build networks.",
    image: "/placeholder.svg?height=300&width=400&text=Leadership+Summit",
    date: "March 15, 2024",
  },
  {
    id: "2",
    name: "Community Service Initiative",
    description: "Monthly community service projects focusing on local environmental and social issues.",
    image: "/placeholder.svg?height=300&width=400&text=Community+Service",
    date: "Every 2nd Saturday",
  },
  {
    id: "3",
    name: "Civic Engagement Workshop",
    description:
      "Interactive workshops teaching young people about local government and how to make their voices heard.",
    image: "/placeholder.svg?height=300&width=400&text=Civic+Workshop",
    date: "April 22, 2024",
  },
]

// In-memory storage for when Supabase is not configured
let localEvents: Event[] = [...fallbackEvents]

export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    return localEvents
  }

  const { data, error } = await supabase!.from("events").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching events:", error)
    console.warn("Falling back to local storage")
    return localEvents
  }

  return data || []
}

export async function createEvent(event: Omit<Event, "id" | "created_at" | "updated_at">): Promise<Event> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localEvents = [newEvent, ...localEvents]
    return newEvent
  }

  const { data, error } = await supabase!.from("events").insert([event]).select().single()

  if (error) {
    console.error("Error creating event:", error)
    // Fallback to local storage
    const newEvent: Event = {
      ...event,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localEvents = [newEvent, ...localEvents]
    return newEvent
  }

  return data
}

export async function updateEvent(id: string, event: Partial<Event>): Promise<Event> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    const index = localEvents.findIndex((e) => e.id === id)
    if (index !== -1) {
      localEvents[index] = { ...localEvents[index], ...event, updated_at: new Date().toISOString() }
      return localEvents[index]
    }
    throw new Error("Event not found")
  }

  const { data, error } = await supabase!
    .from("events")
    .update({ ...event, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating event:", error)
    // Fallback to local storage
    const index = localEvents.findIndex((e) => e.id === id)
    if (index !== -1) {
      localEvents[index] = { ...localEvents[index], ...event, updated_at: new Date().toISOString() }
      return localEvents[index]
    }
    throw error
  }

  return data
}

export async function deleteEvent(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    localEvents = localEvents.filter((e) => e.id !== id)
    return
  }

  const { error } = await supabase!.from("events").delete().eq("id", id)

  if (error) {
    console.error("Error deleting event:", error)
    // Fallback to local storage
    localEvents = localEvents.filter((e) => e.id !== id)
    return
  }
}
