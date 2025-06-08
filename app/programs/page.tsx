"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { UserCircle, Plus, ArrowLeft, Menu } from "lucide-react"
import { CreateProgramDialog } from "@/components/create-program-dialog"

interface Program {
  id: string
  name: string
  description: string
  image: string
  date: string
}

export default function ProgramsPage() {
  const [programs, setPrograms] = useState<Program[]>([
    {
      id: "1",
      name: "Youth Leadership Summit",
      description:
        "Annual summit bringing together young leaders from across the Carolinas to share ideas and build networks.",
      image: "/placeholder.svg?height=300&width=400",
      date: "March 15, 2024",
    },
    {
      id: "2",
      name: "Community Service Initiative",
      description: "Monthly community service projects focusing on local environmental and social issues.",
      image: "/placeholder.svg?height=300&width=400",
      date: "Every 2nd Saturday",
    },
    {
      id: "3",
      name: "Civic Engagement Workshop",
      description:
        "Interactive workshops teaching young people about local government and how to make their voices heard.",
      image: "/placeholder.svg?height=300&width=400",
      date: "April 22, 2024",
    },
  ])

  const [isCreateDialogOpen, setIsCreateDialogOpen] = useState(false)

  const handleCreateProgram = (newProgram: Omit<Program, "id">) => {
    const program: Program = {
      ...newProgram,
      id: Date.now().toString(),
    }
    setPrograms((prev) => [program, ...prev])
    setIsCreateDialogOpen(false)
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Status Bar - ALWAYS visible */}
      <div className="bg-gray-800 text-white p-2 flex justify-between items-center text-sm">
        <span>12:51 PM</span>
        <div className="flex items-center gap-2">
          <span>📶</span>
          <span>📶</span>
          <span>🔋 15%</span>
        </div>
      </div>

      {/* Browser Address Bar - ALWAYS visible */}
      <div className="bg-gray-100 p-2 flex justify-between items-center mx-2 my-1 rounded-lg">
        <div className="flex items-center gap-2">
          <Menu className="h-4 w-4 text-gray-500" />
        </div>
        <span className="text-gray-700 text-sm">framework4future.org/programs</span>
        <div className="flex items-center gap-2">
          <span className="text-blue-500">↻</span>
        </div>
      </div>

      {/* Browser Tabs - ALWAYS visible */}
      <div className="bg-gray-200 p-1 flex overflow-x-auto gap-1 text-xs mx-2">
        <div className="bg-white px-3 py-1 rounded-t whitespace-nowrap border-t-2 border-blue-500">Programs | F4F</div>
        <div className="bg-gray-300 px-3 py-1 rounded-t whitespace-nowrap">v0 by Vercel</div>
        <div className="bg-gray-300 px-3 py-1 rounded-t whitespace-nowrap">Commercial</div>
      </div>

      {/* Header */}
      <header className="border-b bg-white sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex justify-between items-center">
            <Link href="/" className="flex items-center">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 bg-red-600 flex items-center justify-center rounded">
                  <div className="w-6 h-6 border-2 border-white"></div>
                </div>
                <div className="text-sm font-bold text-gray-900">
                  <div>FRAMEWORK</div>
                  <div>4 FUTURE</div>
                </div>
              </div>
            </Link>

            <nav className="hidden md:flex items-center ml-4">
              <Link
                href="/about"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 text-sm"
              >
                About Us
              </Link>
              <Link href="/programs" className="text-blue-600 font-medium px-2 text-sm">
                Programs
              </Link>
              <Link
                href="/blogs"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 text-sm"
              >
                Blogs
              </Link>
              <Link
                href="/contact"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 text-sm"
              >
                Contact
              </Link>
              <Link
                href="/feedback"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 text-sm"
              >
                Feedback
              </Link>
            </nav>

            <div className="flex items-center gap-1">
              <Button
                variant="default"
                className="hidden md:inline-flex bg-green-600 hover:bg-green-700 text-xs px-3 py-2"
              >
                Donate
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-5 w-5" />
                <span className="sr-only">User account</span>
              </Button>
              <Button variant="ghost" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Menu</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Programs Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Button variant="ghost" size="icon" asChild>
                <Link href="/">
                  <ArrowLeft className="h-5 w-5" />
                </Link>
              </Button>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Programs</h1>
                <p className="text-gray-600 mt-2">Empowering youth through leadership and community engagement</p>
              </div>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-indigo-700 hover:bg-indigo-800">
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </div>
        </div>
      </section>

      {/* Programs Grid */}
      <section className="container mx-auto px-4 py-8">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((program) => (
            <Card key={program.id} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="aspect-video relative">
                <Image src={program.image || "/placeholder.svg"} alt={program.name} fill className="object-cover" />
              </div>
              <CardHeader>
                <CardTitle className="text-xl">{program.name}</CardTitle>
                <p className="text-sm text-gray-500">{program.date}</p>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-4">{program.description}</p>
                <Button variant="outline" className="w-full">
                  Learn More
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>

        {programs.length === 0 && (
          <div className="text-center py-12">
            <h3 className="text-xl font-semibold text-gray-900 mb-2">No programs yet</h3>
            <p className="text-gray-600 mb-6">Create your first program to get started!</p>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-indigo-700 hover:bg-indigo-800">
              <Plus className="h-4 w-4 mr-2" />
              Create Program
            </Button>
          </div>
        )}
      </section>

      <CreateProgramDialog
        open={isCreateDialogOpen}
        onOpenChange={setIsCreateDialogOpen}
        onCreateProgram={handleCreateProgram}
      />
    </div>
  )
}
