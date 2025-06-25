import { supabase, isSupabaseConfigured, type Blog } from "./supabase"

/* ------------ LOCAL FALLBACK (when Supabase unavailable) ------------- */
const fallbackBlogs: Blog[] = [
  {
    id: "1",
    title: "Youth Leadership in the Digital Age",
    image: "/placeholder.svg?height=300&width=400&text=Digital+Leadership",
    date: "2024-06-02",
    author: "Maria Rodriguez",
    content: "In today's rapidly evolving digital landscape, young leaders are finding innovative ways ...",
  },
]
let localBlogs: Blog[] = [...fallbackBlogs]

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

/* ------------------------- CRUD METHODS ------------------------------ */
export async function getBlogs(): Promise<Blog[]> {
  if (!isSupabaseConfigured()) return localBlogs

  try {
    const { data, error } = await supabase!
      .from("blogs")
      .select("id, title, content, author, date, image, created_at")
      .order("created_at", { ascending: false })
    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error("Supabase getBlogs error:", err)
    return localBlogs
  }
}

export async function createBlog(blog: Omit<Blog, "id" | "created_at" | "image">, imageFile?: File): Promise<Blog> {
  // ── handle local fallback ──
  if (!isSupabaseConfigured()) {
    const local: Blog = {
      ...blog,
      image: imageFile
        ? URL.createObjectURL(imageFile)
        : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(blog.title)}`,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localBlogs = [local, ...localBlogs]
    return local
  }

  try {
    // 1) upload image (if provided)
    const imageUrl = imageFile
      ? await uploadImageViaApi(imageFile)
      : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(blog.title)}`

    // 2) insert blog
    const { data, error } = await supabase!
      .from("blogs")
      .insert([{ ...blog, image: imageUrl }])
      .select("id, title, content, author, date, image, created_at")
      .single()

    if (error) throw error
    return data
  } catch (err) {
    console.error("Supabase createBlog error:", err)
    // graceful fallback to local storage
    const local: Blog = {
      ...blog,
      image: imageFile
        ? URL.createObjectURL(imageFile)
        : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(blog.title)}`,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
    }
    localBlogs = [local, ...localBlogs]
    return local
  }
}

export async function updateBlog(id: string, partial: Partial<Blog>, imageFile?: File): Promise<Blog> {
  if (!isSupabaseConfigured()) {
    // local mode
    const idx = localBlogs.findIndex((b) => b.id === id)
    if (idx === -1) throw new Error("Blog not found")
    localBlogs[idx] = {
      ...localBlogs[idx],
      ...partial,
      image: imageFile ? URL.createObjectURL(imageFile) : localBlogs[idx].image,
    }
    return localBlogs[idx]
  }

  try {
    // upload replacement image if needed
    const updateData = { ...partial } as Partial<Blog>
    if (imageFile) {
      updateData.image = await uploadImageViaApi(imageFile)
    }
    const { data, error } = await supabase!
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select("id, title, content, author, date, image, created_at")
      .single()
    if (error) throw error
    return data
  } catch (err) {
    console.error("Supabase updateBlog error:", err)
    // fallback local
    const idx = localBlogs.findIndex((b) => b.id === id)
    if (idx === -1) throw err
    localBlogs[idx] = {
      ...localBlogs[idx],
      ...partial,
      image: imageFile ? URL.createObjectURL(imageFile) : localBlogs[idx].image,
    }
    return localBlogs[idx]
  }
}

export async function deleteBlog(id: string): Promise<void> {
  if (!isSupabaseConfigured()) {
    localBlogs = localBlogs.filter((b) => b.id !== id)
    return
  }
  try {
    const { error } = await supabase!.from("blogs").delete().eq("id", id)
    if (error) throw error
  } catch (err) {
    console.error("Supabase deleteBlog error:", err)
    localBlogs = localBlogs.filter((b) => b.id !== id)
  }
}
