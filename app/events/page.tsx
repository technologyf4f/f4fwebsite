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
      

      {/* Programs Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">              
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Our Events</h1>
                <p className="text-gray-600 mt-2">Empowering youth through leadership and community engagement</p>
              </div>
            </div>
            <Button onClick={() => setIsCreateDialogOpen(true)} className="bg-indigo-700 hover:bg-indigo-800">
              <Plus className="h-4 w-4 mr-2" />
              Create Event
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
