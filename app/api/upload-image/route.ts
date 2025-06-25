import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

/**
 * POST /api/upload-image
 * Body: multipart/form-data  →  field “file” (File)
 * Returns: { url: string }   →  public URL of stored image
 */
export async function POST(req: Request) {
  const formData = await req.formData()
  const file = formData.get("file") as File | null
  if (!file) {
    return NextResponse.json({ error: "No file provided" }, { status: 400 })
  }

  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    // service-role key bypasses RLS for this server-only route
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
  )

  const ext = file.name.split(".").pop() ?? "png"
  const filename = `${Date.now()}-${Math.random().toString(36).slice(2)}.${ext}`

  const { error } = await supabase.storage.from("images").upload(filename, file, {
    cacheControl: "3600",
    upsert: false,
  })
  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const {
    data: { publicUrl },
  } = supabase.storage.from("images").getPublicUrl(filename)

  return NextResponse.json({ url: publicUrl })
}
