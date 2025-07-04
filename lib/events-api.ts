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
    signUpUrl: "https://example.com/signup/leadership-summit",
  },
  {
    id: "2",
    name: "Community Service Initiative",
    description: "Monthly community service projects focusing on local environmental and social issues.",
    image: "/placeholder.svg?height=300&width=400&text=Community+Service",
    date: "Every 2nd Saturday",
    signUpUrl: "https://example.com/signup/community-service",
  },
  {
    id: "3",
    name: "Civic Engagement Workshop",
    description:
      "Interactive workshops teaching young people about local government and how to make their voices heard.",
    image: "/placeholder.svg?height=300&width=400&text=Civic+Workshop",
    date: "April 22, 2024",
    signUpUrl: "https://example.com/signup/civic-workshop",
  },
]

// In-memory storage for when Supabase is not configured
let localEvents: Event[] = [...fallbackEvents]

/* ---------------------- IMAGE UPLOAD (helper) ------------------------ */
async function uploadImageViaApi(file: File): Promise<string> {
  const body = new FormData()
  body.append("file", file)

  const res = await fetch("/api/upload-image", { method: "POST", body })
  if (!res.ok) {
    console.error("Upload API failed:", await res.text())
    throw new Error("Failed to upload image")
  }
  const { url } = (await res.json()) as { url: string }
  return url
}

export async function getEvents(): Promise<Event[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    return localEvents
  }

  try {
    const { data, error } = await supabase!.from("events").select("*").order("created_at", { ascending: false })

    if (error) {
      console.error("Supabase error:", error.message)
      throw error
    }
    return data || []
  } catch (err) {
    console.error("Error fetching events:", err)
    console.warn("Falling back to local storage")
    return localEvents
  }
}

export async function createEvent(
  event: Omit<Event, "id" | "created_at" | "updated_at" | "image">,
  imageFile?: File,
): Promise<Event> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    const imageUrl = imageFile
      ? URL.createObjectURL(imageFile)
      : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(event.name)}`

    const newEvent: Event = {
      ...event,
      image: imageUrl,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localEvents = [newEvent, ...localEvents]
    return newEvent
  }

  try {
    // 1) upload image (if provided)
    const imageUrl = imageFile
      ? await uploadImageViaApi(imageFile)
      : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(event.name)}`

    // 2) insert event
    const { data, error } = await supabase!
      .from("events")
      .insert([{ ...event, image: imageUrl }])
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error.message)
      throw error
    }

    return data
  } catch (err) {
    console.error("Error creating event:", err)
    // Fallback to local storage
    const imageUrl = imageFile
      ? URL.createObjectURL(imageFile)
      : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(event.name)}`

    const newEvent: Event = {
      ...event,
      image: imageUrl,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localEvents = [newEvent, ...localEvents]
    return newEvent
  }
}

export async function updateEvent(id: string, event: Partial<Event>, imageFile?: File): Promise<Event> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    const index = localEvents.findIndex((e) => e.id === id)
    if (index !== -1) {
      const updateData = { ...event }
      if (imageFile) {
        updateData.image = URL.createObjectURL(imageFile)
      }
      localEvents[index] = { ...localEvents[index], ...updateData, updated_at: new Date().toISOString() }
      return localEvents[index]
    }
    throw new Error("Event not found")
  }

  try {
    // upload replacement image if needed
    const updateData = { ...event } as Partial<Event>
    if (imageFile) {
      updateData.image = await uploadImageViaApi(imageFile)
    }

    const { data, error } = await supabase!
      .from("events")
      .update({ ...updateData, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select()
      .single()

    if (error) {
      console.error("Supabase error:", error.message)
      throw error
    }

    return data
  } catch (err) {
    console.error("Error updating event:", err)
    // Fallback to local storage
    const index = localEvents.findIndex((e) => e.id === id)
    if (index !== -1) {
      const updateData = { ...event }
      if (imageFile) {
        updateData.image = URL.createObjectURL(imageFile)
      }
      localEvents[index] = { ...localEvents[index], ...updateData, updated_at: new Date().toISOString() }
      return localEvents[index]
    }
    throw err
  }
}

export async function deleteEvent(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    localEvents = localEvents.filter((e) => e.id !== id)
    return
  }

  try {
    // Get the event to find the image URL for cleanup
    const { data: event } = await supabase!.from("events").select("image").eq("id", id).single()

    // Delete the event
    const { error } = await supabase!.from("events").delete().eq("id", id)
    if (error) {
      console.error("Supabase error:", error.message)
      throw error
    }

    // Clean up image from storage if it's a Supabase URL
    if (event?.image && event.image.includes(supabase!.supabaseUrl)) {
      try {
        const fileName = event.image.split("/").pop()
        if (fileName) {
          await supabase!.storage.from("images").remove([fileName])
        }
      } catch (imgError) {
        console.warn("Could not delete image from storage:", imgError)
      }
    }
  } catch (err) {
    console.error("Error deleting event:", err)
    // Fallback to local storage
    localEvents = localEvents.filter((e) => e.id !== id)
    return
  }
}
