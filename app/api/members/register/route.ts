import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { supabase, isSupabaseConfigured, type Blog, type BlogCategory } from "@/lib/supabase"

// Use service-role key for server-side operations
export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      firstName: string
      lastName: string
      email: string
      phone: string
      grade: string
      schoolName: string
      password: string
    }

    // Validate required fields
    if (
      !body.firstName ||
      !body.lastName ||
      !body.email ||
      !body.phone ||
      !body.grade ||
      !body.schoolName ||
      !body.password
    ) {
      return NextResponse.json({ success: false, error: "All fields are required" }, { status: 400 })
    }

    // If Supabase is not configured, return mock data
    if (!isSupabaseConfigured) {
      console.log("Supabase not configured, returning mock member data")
      return NextResponse.json({
        success: true,
        member: {
          id: "demo-" + Date.now(),
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone: body.phone,
          grade: body.grade,
          school_name: body.schoolName,
          payment_method: null,
          payment_status: "pending",
          transaction_id: null,
          membership_status: "pending",
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        },
      })
    }

    // Simple demo hash – replace with bcrypt in production
    const password_hash = Buffer.from(body.password + "framework4future_salt").toString("base64")

    const { data, error } = await supabase
      .from("members")
      .insert([
        {
          first_name: body.firstName,
          last_name: body.lastName,
          email: body.email,
          phone: body.phone,
          grade: body.grade,
          school_name: body.schoolName,
          password_hash,
          payment_status: "pending",
          membership_status: "pending",
        },
      ])
      .select()
      .single()

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true, member: data })
  } catch (err) {
    console.error("API /members/register error:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
