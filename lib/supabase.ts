import { createClient } from "@supabase/supabase-js"

// Check if Supabase environment variables are configured
export function isSupabaseConfigured(): boolean {
  return !!(process.env.NEXT_PUBLIC_SUPABASE_URL && process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY)
}

// Create Supabase client only if configured
export const supabase = isSupabaseConfigured()
  ? createClient(process.env.NEXT_PUBLIC_SUPABASE_URL!, process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!)
  : null

// Database types
export interface Event {
  id: string
  name: string
  description: string
  image: string
  date: string
  signUpUrl?: string
  created_at?: string
  updated_at?: string
}

export interface Blog {
  id: string
  title: string
  content: string
  excerpt?: string
  image: string
  author: string
  date: string
  category_id?: string
  category?: BlogCategory
  created_at?: string
  updated_at?: string
}

export interface BlogCategory {
  id: string
  name: string
  description?: string
  created_at?: string
}
