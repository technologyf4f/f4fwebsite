import { NextResponse } from "next/server"
import { authenticateMember } from "@/lib/auth-api"

export async function GET() {
  return NextResponse.json({ message: "Please use POST method" }, { status: 405 })
}

export async function POST(req: Request) {
  try {
    const body = await req.json()
    const { email, password } = body

    if (!email || !password) {
      return NextResponse.json({ success: false, error: "Email and password are required" }, { status: 400 })
    }

    const result = await authenticateMember(email, password)

    if (!result.success) {
      return NextResponse.json({ success: false, error: result.error }, { status: 401 })
    }

    return NextResponse.json({
      success: true,
      member: result.member,
    })
  } catch (error) {
    console.error("API /auth/login error:", error)
    return NextResponse.json({ success: false, error: "Internal server error" }, { status: 500 })
  }
}
