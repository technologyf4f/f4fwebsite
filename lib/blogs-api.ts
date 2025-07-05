import { supabase, isSupabaseConfigured, type Blog, type BlogCategory } from "./supabase"

/* ------------ LOCAL FALLBACK (when Supabase unavailable) ------------- */
const fallbackCategories: BlogCategory[] = [
  { id: "1", name: "Leadership", description: "Youth leadership development" },
  { id: "2", name: "Community", description: "Community engagement and service" },
  { id: "3", name: "Technology", description: "Technology and innovation" },
  { id: "4", name: "Civic Engagement", description: "Democratic participation and civic duties" },
]

const fallbackBlogs: Blog[] = [
  {
    id: "1",
    title: "Youth Leadership in the Digital Age",    
    image: "/placeholder.svg?height=300&width=400&text=Digital+Leadership",
    date: "2024-06-02",
    author: "Maria Rodriguez",
    content:
      "In today's rapidly evolving digital landscape, young leaders are finding innovative ways to connect with their communities and drive meaningful change. From social media campaigns that raise awareness about local issues to mobile apps that facilitate volunteer coordination, technology has become an essential tool in the modern leader's toolkit...",
    category_id: "1",
    category: { id: "1", name: "Leadership" },
    created_at: "2024-06-02T10:00:00Z",
  },
  {
    id: "2",
    title: "Building Inclusive Communities Through Service",    
    image: "/placeholder.svg?height=300&width=400&text=Community+Service",
    date: "2024-05-15",
    author: "James Washington",
    content:
      "Community service has always been a cornerstone of civic engagement, but today's approach to service learning emphasizes inclusivity and collaboration across diverse groups. When young people from different backgrounds come together to address local challenges, the results are often transformative for both the community and the participants themselves...",
    category_id: "2",
    category: { id: "2", name: "Community" },
    created_at: "2024-05-15T14:30:00Z",
  },
  {
    id: "3",
    title: "The Future of Civic Engagement",    
    image: "/placeholder.svg?height=300&width=400&text=Civic+Engagement",
    date: "2024-04-28",
    author: "Sophia Chen",
    content:
      "As traditional forms of civic engagement evolve, young people are pioneering new ways to participate in democratic processes and community decision-making. From digital town halls to youth advisory councils, innovative approaches are making civic participation more accessible and engaging for the next generation of leaders...",
    category_id: "4",
    category: { id: "4", name: "Civic Engagement" },
    created_at: "2024-04-28T09:15:00Z",
  },
]

let localBlogs: Blog[] = [...fallbackBlogs]
const localCategories: BlogCategory[] = [...fallbackCategories]

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

/* ------------------------- BLOG CATEGORIES ---------------------------- */
export async function getBlogCategories(): Promise<BlogCategory[]> {
  if (!isSupabaseConfigured()) return localCategories

  try {
    const { data, error } = await supabase!
      .from("blog_categories")
      .select("*")
      // .order("name", { ascending: true })
    if (error) throw error
    return data ?? []
  } catch (err) {
    console.error("Supabase getBlogCategories error:", err)
    return localCategories
  }
}

/* ------------------------- BLOG CRUD METHODS ------------------------- */
export async function getBlogs(categoryId?: string): Promise<Blog[]> {  
  debugger;
  if (!isSupabaseConfigured()) {
    return categoryId ? localBlogs.filter((blog) => blog.category_id === categoryId) : localBlogs
  }

  try {
    let query = supabase!
      .from("blogs")
      .select(`
        id, 
        title, 
        content,         
        author, 
        date, 
        image, 
        category_id,
        created_at,
        blogCategories:category_id (
          id,
          name,
          description
        )
      `)
      .order("created_at", { ascending: false })

    if (categoryId) {
      query = query.eq("category_id", categoryId)
    }

    const { data, error } = await query
    if (error) throw error

    // Transform the data to match our Blog interface
    const blogs: Blog[] = (data ?? []).map((item) => ({
      ...item,
      category: Array.isArray(item.blogCategories) ? item.blogCategories[0] : item.blogCategories,
    }))

    return blogs
  } catch (err) {
    console.error("Supabase getBlogs error:", err)
    return categoryId ? localBlogs.filter((blog) => blog.category_id === categoryId) : localBlogs
  }
}

export async function createBlog(
  blog: Omit<Blog, "id" | "created_at" | "image" | "category">,
  imageFile?: File,
): Promise<Blog> {
  // Handle local fallback
  if (!isSupabaseConfigured()) {
    const category = localCategories.find((c) => c.id === blog.category_id)
    const local: Blog = {
      ...blog,
      image: imageFile
        ? URL.createObjectURL(imageFile)
        : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(blog.title)}`,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      category,
    }
    localBlogs = [local, ...localBlogs]
    return local
  }

  try {
    // 1) Upload image (if provided)
    const imageUrl = imageFile
      ? await uploadImageViaApi(imageFile)
      : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(blog.title)}`

    // 2) Insert blog
    const { data, error } = await supabase!
      .from("blogs")
      .insert([{ ...blog, image: imageUrl }])
      .select(`
        id, 
        title, 
        content,         
        author, 
        date, 
        image, 
        category_id,
        created_at,
        blogCategories:category_id (
          id,
          name,
          description
        )
      `)
      .single()

    if (error) throw error

    // Transform the data
    const newBlog: Blog = {
      ...data,
      category: Array.isArray(data.blogCategories) ? data.blogCategories[0] : data.blogCategories,
    }

    return newBlog
  } catch (err) {
    console.error("Supabase createBlog error:", err)
    // Graceful fallback to local storage
    const category = localCategories.find((c) => c.id === blog.category_id)
    const local: Blog = {
      ...blog,
      image: imageFile
        ? URL.createObjectURL(imageFile)
        : `/placeholder.svg?height=300&width=400&text=${encodeURIComponent(blog.title)}`,
      id: Date.now().toString(),
      created_at: new Date().toISOString(),
      category,
    }
    localBlogs = [local, ...localBlogs]
    return local
  }
}

export async function updateBlog(id: string, partial: Partial<Blog>, imageFile?: File): Promise<Blog> {
  if (!isSupabaseConfigured()) {
    // Local mode
    const idx = localBlogs.findIndex((b) => b.id === id)
    if (idx === -1) throw new Error("Blog not found")

    const category = partial.category_id
      ? localCategories.find((c) => c.id === partial.category_id)
      : localBlogs[idx].category

    localBlogs[idx] = {
      ...localBlogs[idx],
      ...partial,
      image: imageFile ? URL.createObjectURL(imageFile) : localBlogs[idx].image,
      category,
    }
    return localBlogs[idx]
  }

  try {
    // Upload replacement image if needed
    const updateData = { ...partial } as Partial<Blog>
    if (imageFile) {
      updateData.image = await uploadImageViaApi(imageFile)
    }

    const { data, error } = await supabase!
      .from("blogs")
      .update(updateData)
      .eq("id", id)
      .select(`
        id, 
        title, 
        content,         
        author, 
        date, 
        image, 
        category_id,
        created_at,
        blogCategories:category_id (
          id,
          name,
          description
        )
      `)
      .single()

    if (error) throw error

    // Transform the data
    const updatedBlog: Blog = {
      ...data,
      category: Array.isArray(data.blogCategories) ? data.blogCategories[0] : data.blogCategories,
    }

    return updatedBlog
  } catch (err) {
    console.error("Supabase updateBlog error:", err)
    // Fallback local
    const idx = localBlogs.findIndex((b) => b.id === id)
    if (idx === -1) throw err

    const category = partial.category_id
      ? localCategories.find((c) => c.id === partial.category_id)
      : localBlogs[idx].category

    localBlogs[idx] = {
      ...localBlogs[idx],
      ...partial,
      image: imageFile ? URL.createObjectURL(imageFile) : localBlogs[idx].image,
      category,
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
