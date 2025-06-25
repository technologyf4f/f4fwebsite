import { createClient } from "@supabase/supabase-js"

// Check if environment variables are available and valid
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Helper function to validate URL
function isValidUrl(string: string | undefined): boolean {
  if (!string || string.trim() === "") return false
  try {
    new URL(string)
    return true
  } catch (_) {
    return false
  }
}

// Helper function to check if Supabase is properly configured
export const isSupabaseConfigured = (): boolean => {
  return !!(
    supabaseUrl &&
    supabaseAnonKey &&
    isValidUrl(supabaseUrl) &&
    supabaseAnonKey.trim() !== "" &&
    supabaseUrl !== "your_supabase_project_url" &&
    supabaseAnonKey !== "your_supabase_anon_key"
  )
}

// Create client only if environment variables are properly configured
export const supabase = isSupabaseConfigured() ? createClient(supabaseUrl!, supabaseAnonKey!) : null

// Types for our data
export interface Event {
  id: string
  name: string
  description: string
  image: string
  date: string
  created_at?: string
  updated_at?: string
}

export interface Blog {
  id: string
  title: string
  content: string
  author: string
  date: string
  image: string
  created_at?: string
}
