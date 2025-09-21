"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Skeleton } from "@/components/ui/skeleton"
import { getTeamMembers } from "@/lib/team-api"
import type { TeamMember } from "@/lib/types"

export default function WhoWeArePage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const members = await getTeamMembers()
        setTeamMembers(members)
      } catch (error) {
        console.error("Error fetching team members:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const getCategoryTitle = (category: string) => {
    switch (category) {
      case "youth_leader":
        return "Youth Leaders"
      case "executive_member":
        return "Executive Members"
      case "board_director":
        return "Board of Directors"
      default:
        return category
    }
  }

  const getCategoryDescription = (category: string) => {
    switch (category) {
      case "youth_leader":
        return "Our passionate youth leaders who drive community engagement and inspire positive change among their peers."
      case "executive_member":
        return "Experienced professionals who manage our day-to-day operations and strategic initiatives."
      case "board_director":
        return "Distinguished leaders who provide governance, oversight, and strategic direction for our organization."
      default:
        return ""
    }
  }

  const getCategoryColor = (category: string) => {
    switch (category) {
      case "youth_leader":
        return "bg-blue-50 border-blue-200"
      case "executive_member":
        return "bg-green-50 border-green-200"
      case "board_director":
        return "bg-purple-50 border-purple-200"
      default:
        return "bg-gray-50 border-gray-200"
    }
  }

  const groupedMembers = teamMembers.reduce(
    (acc, member) => {
      if (!acc[member.category]) {
        acc[member.category] = []
      }
      acc[member.category].push(member)
      return acc
    },
    {} as Record<string, TeamMember[]>,
  )

  const categoryOrder = ["youth_leader", "executive_member", "board_director"]

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
        {/* Hero Section Skeleton */}
        <section className="relative py-20 px-4 text-center">
          <div className="max-w-4xl mx-auto">
            <Skeleton className="h-12 w-3/4 mx-auto mb-6" />
            <Skeleton className="h-6 w-full mb-4" />
            <Skeleton className="h-6 w-2/3 mx-auto" />
          </div>
        </section>

        {/* Team Sections Skeleton */}
        <section className="py-16 px-4">
          <div className="max-w-7xl mx-auto">
            {[1, 2, 3].map((section) => (
              <div key={section} className="mb-16">
                <Skeleton className="h-8 w-64 mb-4" />
                <Skeleton className="h-4 w-full mb-8" />
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                  {[1, 2, 3, 4].map((card) => (
                    <Card key={card} className="overflow-hidden">
                      <CardContent className="p-6 text-center">
                        <Skeleton className="w-24 h-24 rounded-full mx-auto mb-4" />
                        <Skeleton className="h-6 w-3/4 mx-auto mb-2" />
                        <Skeleton className="h-4 w-full mb-3" />
                        <Skeleton className="h-16 w-full" />
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold text-gray-900 mb-6">Meet Our Team</h1>
          <p className="text-xl text-gray-600 mb-8 leading-relaxed">
            Our dedicated team of leaders, professionals, and visionaries working together to create meaningful change
            in our communities. Each member brings unique expertise and passion to advance our mission.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              {teamMembers.filter((m) => m.category === "youth_leader").length} Youth Leaders
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              {teamMembers.filter((m) => m.category === "executive_member").length} Executive Members
            </Badge>
            <Badge variant="secondary" className="px-4 py-2 text-sm">
              {teamMembers.filter((m) => m.category === "board_director").length} Board Directors
            </Badge>
          </div>
        </div>
      </section>

      {/* Team Sections */}
      <section className="py-16 px-4">
        <div className="max-w-7xl mx-auto">
          {categoryOrder.map((category) => {
            const members = groupedMembers[category] || []
            if (members.length === 0) return null

            return (
              <div key={category} className="mb-16">
                <div className="text-center mb-12">
                  <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{getCategoryTitle(category)}</h2>
                  <p className="text-lg text-gray-600 max-w-3xl mx-auto">{getCategoryDescription(category)}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {members.map((member) => (
                    <Card
                      key={member.id}
                      className={`overflow-hidden hover:shadow-lg transition-shadow duration-300 ${getCategoryColor(category)}`}
                    >
                      <CardContent className="p-6 text-center">
                        <div className="relative w-24 h-24 mx-auto mb-4">
                          <Image
                            src={member.headshot_url || "/placeholder-user.jpg"}
                            alt={`${member.first_name} ${member.last_name}`}
                            fill
                            className="rounded-full object-cover"
                            sizes="96px"
                          />
                        </div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-1">
                          {member.first_name} {member.last_name}
                        </h3>
                        <p className="text-sm font-medium text-gray-600 mb-3">{member.title}</p>
                        {member.bio && <p className="text-xs text-gray-500 leading-relaxed">{member.bio}</p>}
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </div>
            )
          })}
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-16 px-4 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-6">Join Our Team</h2>
          <p className="text-lg text-gray-600 mb-8">
            Are you passionate about making a difference? We're always looking for dedicated individuals to join our
            mission and help create positive change in our communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="px-8 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
              Volunteer Opportunities
            </button>
            <button className="px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors">
              Leadership Positions
            </button>
          </div>
        </div>
      </section>
    </div>
  )
}
