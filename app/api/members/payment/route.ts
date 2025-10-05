import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"

// Use service-role key for server-side operations
const supabaseAdmin =
  process.env.SUPABASE_URL && process.env.SUPABASE_SERVICE_ROLE_KEY
    ? createClient(process.env.SUPABASE_URL, process.env.SUPABASE_SERVICE_ROLE_KEY)
    : null

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as {
      memberId: string
      paymentMethod: string
      transactionId?: string
    }

    // Validate required fields
    if (!body.memberId || !body.paymentMethod) {
      return NextResponse.json({ success: false, error: "Member ID and payment method are required" }, { status: 400 })
    }

    // If Supabase is not configured, return success
    if (!supabaseAdmin) {
      console.log("Supabase not configured, simulating payment update")
      return NextResponse.json({ success: true })
    }

    const { error } = await supabaseAdmin
      .from("members")
      .update({
        payment_method: body.paymentMethod,
        transaction_id: body.transactionId,
        payment_status: "completed",
        membership_status: "pending",
        updated_at: new Date().toISOString(),
      })
      .eq("id", body.memberId)

    if (error) {
      console.error("Database error:", error)
      return NextResponse.json({ success: false, error: error.message }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (err) {
    console.error("API /members/payment error:", err)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
