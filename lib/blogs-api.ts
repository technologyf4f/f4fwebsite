import { supabase, isSupabaseConfigured, type Blog } from "./supabase"

// Fallback data when Supabase is not available
const fallbackBlogs: Blog[] = [
  {
    id: "1",
    title: "Youth Leadership in the Digital Age",
    excerpt: "Exploring how young leaders are leveraging technology to create positive change in their communities.",
    image: "/placeholder.svg?height=300&width=400&text=Digital+Leadership",
    date: "June 2, 2024",
    author: "Maria Rodriguez",
    reading_time: "5 min read",
    categories: ["Leadership", "Technology"],
    featured: true,
    content:
      "In today's rapidly evolving digital landscape, young leaders are finding innovative ways to create positive change in their communities. From social media campaigns to digital organizing platforms, technology has become an essential tool for modern youth leadership.",
  },
  {
    id: "2",
    title: "Building Inclusive Communities Through Service",
    excerpt: "How community service projects are bringing diverse groups together to solve local challenges.",
    image: "/placeholder.svg?height=300&width=400&text=Inclusive+Communities",
    date: "May 15, 2024",
    author: "James Washington",
    reading_time: "7 min read",
    categories: ["Community", "Inclusion"],
    featured: false,
    content:
      "Community service has always been at the heart of the Framework 4 Future mission, but we've learned that true impact comes from creating inclusive spaces where all young people can contribute their unique perspectives and talents.",
  },
]

// In-memory storage for when Supabase is not configured
let localBlogs: Blog[] = [...fallbackBlogs]

export async function getBlogs(): Promise<Blog[]> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    return localBlogs
  }

  const { data, error } = await supabase!.from("blogs").select("*").order("created_at", { ascending: false })

  if (error) {
    console.error("Error fetching blogs:", error)
    console.warn("Falling back to local storage")
    return localBlogs
  }

  return data || []
}

export async function createBlog(blog: Omit<Blog, "id" | "created_at" | "updated_at">): Promise<Blog> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localBlogs = [newBlog, ...localBlogs]
    return newBlog
  }

  const { data, error } = await supabase!.from("blogs").insert([blog]).select().single()

  if (error) {
    console.error("Error creating blog:", error)
    // Fallback to local storage
    const newBlog: Blog = {
      ...blog,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localBlogs = [newBlog, ...localBlogs]
    return newBlog
  }

  return data
}

export async function updateBlog(id: string, blog: Partial<Blog>): Promise<Blog> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    const index = localBlogs.findIndex((b) => b.id === id)
    if (index !== -1) {
      localBlogs[index] = { ...localBlogs[index], ...blog, updated_at: new Date().toISOString() }
      return localBlogs[index]
    }
    throw new Error("Blog not found")
  }

  const { data, error } = await supabase!
    .from("blogs")
    .update({ ...blog, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single()

  if (error) {
    console.error("Error updating blog:", error)
    // Fallback to local storage
    const index = localBlogs.findIndex((b) => b.id === id)
    if (index !== -1) {
      localBlogs[index] = { ...localBlogs[index], ...blog, updated_at: new Date().toISOString() }
      return localBlogs[index]
    }
    throw error
  }

  return data
}

export async function deleteBlog(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    console.warn("Supabase not configured, using local storage")
    localBlogs = localBlogs.filter((b) => b.id !== id)
    return
  }

  const { error } = await supabase!.from("blogs").delete().eq("id", id)

  if (error) {
    console.error("Error deleting blog:", error)
    // Fallback to local storage
    localBlogs = localBlogs.filter((b) => b.id !== id)
    return
  }
}
