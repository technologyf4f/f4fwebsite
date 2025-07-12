import { NextResponse } from "next/server"
import { getMemberVolunteeringHours } from "@/lib/volunteering-api"

export async function GET(req: Request, { params }: { params: { memberId: string } }) {
  try {
    const { memberId } = params

    if (!memberId) {
      return NextResponse.json({ success: false, error: "Member ID is required" }, { status: 400 })
    }

    const result = await getMemberVolunteeringHours(memberId)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 400 })
    }

    return NextResponse.json({
      success: true,
      hours: result.hours || [],
    })
  } catch (error) {
    console.error("API /volunteering/member/[memberId] error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
