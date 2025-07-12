import { NextResponse } from "next/server"
import { getAllVolunteeringHours, updateVolunteeringHoursStatus } from "@/lib/volunteering-api"

export async function GET() {
  try {
    const result = await getAllVolunteeringHours()

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      hours: result.hours || [],
    })
  } catch (error) {
    console.error("API /volunteering/admin GET error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}

export async function PATCH(req: Request) {
  try {
    const body = await req.json()
    const { id, status, adminNotes, reviewedBy } = body

    if (!id || !status) {
      return NextResponse.json({ success: false, error: "ID and status are required" }, { status: 400 })
    }

    if (!["approved", "rejected"].includes(status)) {
      return NextResponse.json({ success: false, error: "Status must be 'approved' or 'rejected'" }, { status: 400 })
    }

    const result = await updateVolunteeringHoursStatus(id, status, adminNotes, reviewedBy)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("API /volunteering/admin PATCH error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
