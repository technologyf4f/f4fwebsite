export interface MemberRegistration {
  firstName: string
  lastName: string
  email: string
  phone: string
  grade: string
  schoolName: string
  password: string
}

export interface Member {
  id: string
  first_name: string
  last_name: string
  email: string
  phone: string
  grade: string
  school_name: string
  payment_method?: string
  payment_status: string
  transaction_id?: string
  membership_status: string
  is_admin?: boolean
  created_at: string
  updated_at: string
}

export interface VolunteeringHours {
  id: string
  member_id: string
  activity_name: string
  description?: string
  hours_worked: number
  activity_date: string
  organization_name: string
  supervisor_name?: string
  supervisor_email?: string
  supervisor_phone?: string
  status: "pending" | "approved" | "rejected"
  admin_notes?: string
  reviewed_by?: string
  reviewed_at?: string
  created_at: string
  updated_at: string
  member?: {
    first_name: string
    last_name: string
    email: string
  }
}

export interface VolunteeringSubmission {
  activity_name: string
  description?: string
  hours_worked: number
  activity_date: string
  organization_name: string
  supervisor_name?: string
  supervisor_email?: string
  supervisor_phone?: string
}
