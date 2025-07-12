import { NextResponse } from "next/server"
import { submitVolunteeringHours } from "@/lib/volunteering-api"

export async function POST(req: Request) {
  try {
    const body = await req.json()

    const {
      memberId,
      activity_name,
      description,
      hours_completed,
      activity_date,
      organization_name,
      supervisor_name,
      supervisor_email,
      supervisor_phone,
    } = body

    // Validate required fields
    if (!memberId || !activity_name || !hours_completed || !activity_date || !organization_name) {
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 })
    }

    // Validate hours_completed is a positive number
    if (isNaN(hours_completed) || hours_completed <= 0) {
      return NextResponse.json({ success: false, error: "Hours completed must be a positive number" }, { status: 400 })
    }

    const result = await submitVolunteeringHours(memberId, {
      activity_name,
      description,
      hours_completed: Number.parseFloat(hours_completed),
      activity_date,
      organization_name,
      supervisor_name,
      supervisor_email,
      supervisor_phone,
    })

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API /volunteering/submit error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
