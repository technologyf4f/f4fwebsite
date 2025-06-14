"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { CheckCircle, Copy, ExternalLink, Database, Key, Code } from "lucide-react"

interface SetupStep {
  id: string
  title: string
  description: string
  completed: boolean
}

export function SupabaseSetupGuide() {
  const [copiedStep, setCopiedStep] = useState<string | null>(null)

  const steps: SetupStep[] = [
    {
      id: "create-project",
      title: "Create Supabase Project",
      description: "Sign up at supabase.com and create a new project",
      completed: false,
    },
    {
      id: "get-credentials",
      title: "Get Project Credentials",
      description: "Copy your project URL and anon key from the API settings",
      completed: false,
    },
    {
      id: "set-env-vars",
      title: "Set Environment Variables",
      description: "Add your credentials to the .env.local file",
      completed: false,
    },
    {
      id: "run-sql",
      title: "Run Database Scripts",
      description: "Execute the SQL scripts to create tables",
      completed: false,
    },
  ]

  const copyToClipboard = (text: string, stepId: string) => {
    navigator.clipboard.writeText(text)
    setCopiedStep(stepId)
    setTimeout(() => setCopiedStep(null), 2000)
  }

  const envTemplate = `# Add these to your .env.local file
NEXT_PUBLIC_SUPABASE_URL=https://your-project-id.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key-here`

  const sqlScript = `-- Run this in your Supabase SQL editor
-- Create events table
CREATE TABLE IF NOT EXISTS events (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  description TEXT NOT NULL,
  image TEXT,
  date VARCHAR(255) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create blogs table  
CREATE TABLE IF NOT EXISTS blogs (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  content TEXT NOT NULL,
  excerpt TEXT,
  image TEXT,
  date VARCHAR(255) NOT NULL,
  author VARCHAR(255) NOT NULL,
  reading_time VARCHAR(50) NOT NULL,
  categories TEXT[] DEFAULT '{}',
  featured BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS
ALTER TABLE events ENABLE ROW LEVEL SECURITY;
ALTER TABLE blogs ENABLE ROW LEVEL SECURITY;

-- Create policies (allow all operations for now)
CREATE POLICY "Allow all operations on events" ON events FOR ALL USING (true);
CREATE POLICY "Allow all operations on blogs" ON blogs FOR ALL USING (true);`

  return (
    <div className="max-w-4xl mx-auto p-6 space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold mb-4">Setup Supabase Integration</h2>
        <p className="text-gray-600">Follow these steps to enable data persistence with Supabase</p>
      </div>

      <div className="grid gap-6">
        {/* Step 1: Create Project */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                <span className="text-green-600 font-bold">1</span>
              </div>
              <Database className="h-5 w-5" />
              Create Supabase Project
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">Sign up for a free account at Supabase and create a new project.</p>
            <Button asChild variant="outline">
              <a href="https://supabase.com" target="_blank" rel="noopener noreferrer">
                <ExternalLink className="h-4 w-4 mr-2" />
                Go to Supabase
              </a>
            </Button>
          </CardContent>
        </Card>

        {/* Step 2: Get Credentials */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                <span className="text-blue-600 font-bold">2</span>
              </div>
              <Key className="h-5 w-5" />
              Get Project Credentials
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              In your Supabase dashboard, go to Settings → API to find your project URL and anon key.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg">
              <p className="text-sm text-gray-600 mb-2">Look for:</p>
              <ul className="text-sm space-y-1">
                <li>
                  • <strong>Project URL:</strong> https://your-project-id.supabase.co
                </li>
                <li>
                  • <strong>Anon Key:</strong> A long string starting with "eyJ..."
                </li>
              </ul>
            </div>
          </CardContent>
        </Card>

        {/* Step 3: Environment Variables */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
                <span className="text-purple-600 font-bold">3</span>
              </div>
              <Code className="h-5 w-5" />
              Set Environment Variables
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              Add your Supabase credentials to your <code className="bg-gray-100 px-2 py-1 rounded">.env.local</code>{" "}
              file:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative">
              <pre className="text-sm overflow-x-auto">{envTemplate}</pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => copyToClipboard(envTemplate, "env")}
              >
                {copiedStep === "env" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
            <Badge variant="outline" className="text-xs">
              💡 Restart your development server after adding these variables
            </Badge>
          </CardContent>
        </Card>

        {/* Step 4: Database Setup */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-3">
              <div className="w-8 h-8 bg-orange-100 rounded-full flex items-center justify-center">
                <span className="text-orange-600 font-bold">4</span>
              </div>
              <Database className="h-5 w-5" />
              Run Database Scripts
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-gray-600">
              In your Supabase dashboard, go to the SQL Editor and run this script to create the necessary tables:
            </p>
            <div className="bg-gray-900 text-gray-100 p-4 rounded-lg relative max-h-64 overflow-y-auto">
              <pre className="text-sm">{sqlScript}</pre>
              <Button
                size="sm"
                variant="outline"
                className="absolute top-2 right-2 bg-gray-800 border-gray-600 text-gray-300 hover:bg-gray-700"
                onClick={() => copyToClipboard(sqlScript, "sql")}
              >
                {copiedStep === "sql" ? <CheckCircle className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Completion */}
        <Card className="border-green-200 bg-green-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-3 mb-4">
              <CheckCircle className="h-6 w-6 text-green-600" />
              <h3 className="text-lg font-semibold text-green-800">You're All Set!</h3>
            </div>
            <p className="text-green-700">
              Once you've completed these steps, refresh the page and your data will be persisted to Supabase. You'll be
              able to create, edit, and delete events and blog posts with full data persistence.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
