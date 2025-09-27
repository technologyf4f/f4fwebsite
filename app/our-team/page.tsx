"use client"

import { useEffect, useState } from "react"
import Image from "next/image"
import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { getTeamMembers } from "@/lib/team-api"
import type { TeamMember } from "@/lib/types"

interface TeamMemberCardProps {
  member: TeamMember
}

function TeamMemberCard({ member }: TeamMemberCardProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-300 border-0 shadow-md">
      <CardContent className="p-6 text-center">
        <div className="relative w-32 h-32 mx-auto mb-4">
          <Image
            src={member.headshot_url || "/placeholder-user.jpg"}
            alt={`${member.first_name} ${member.last_name}`}
            fill
            className="rounded-full object-cover border-4 border-white shadow-lg group-hover:scale-105 transition-transform duration-300"
          />
        </div>
        <h3 className="font-semibold text-lg text-gray-900 mb-1">
          {member.first_name} {member.last_name}
        </h3>
        <p className="text-sm font-medium text-gray-600 mb-2">{member.title}</p>
        {member.bio && <p className="text-xs text-gray-500 line-clamp-3">{member.bio}</p>}
      </CardContent>
    </Card>
  )
}

function TeamMemberSkeleton() {
  return (
    <Card className="border-0 shadow-md">
      <CardContent className="p-6 text-center">
        <Skeleton className="w-32 h-32 rounded-full mx-auto mb-4" />
        <Skeleton className="h-5 w-32 mx-auto mb-2" />
        <Skeleton className="h-4 w-40 mx-auto mb-2" />
        <Skeleton className="h-3 w-full mb-1" />
        <Skeleton className="h-3 w-3/4 mx-auto" />
      </CardContent>
    </Card>
  )
}

interface TeamSectionProps {
  title: string
  description: string
  members: TeamMember[]
  isLoading: boolean
  colorClass: string
}

function TeamSection({ title, description, members, isLoading, colorClass }: TeamSectionProps) {
  return (
    <section className="mb-16">
      <div className="text-center mb-12">
        <div className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-medium mb-4 ${colorClass}`}>
          {title}
        </div>
        <h2 className="text-3xl font-bold text-gray-900 mb-4">{title}</h2>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">{description}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {isLoading
          ? Array.from({ length: 4 }).map((_, index) => <TeamMemberSkeleton key={index} />)
          : members.map((member) => <TeamMemberCard key={member.id} member={member} />)}
      </div>
    </section>
  )
}

export default function OurTeamPage() {
  const [teamMembers, setTeamMembers] = useState<TeamMember[]>([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    async function fetchTeamMembers() {
      try {
        const members = await getTeamMembers()
        setTeamMembers(members)
      } catch (error) {
        console.error("Error fetching team members:", error)
      } finally {
        setIsLoading(false)
      }
    }

    fetchTeamMembers()
  }, [])

  const youthLeaders = teamMembers.filter((member) => member.category === "youth_leader")
  const executiveMembers = teamMembers.filter((member) => member.category === "executive_member")
  const boardDirectors = teamMembers.filter((member) => member.category === "board_director")

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Hero Section */}
      <section className="relative py-20 px-4 text-center">
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10" />
        <div className="relative max-w-4xl mx-auto">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6">
            Meet Our{" "}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">Team</span>
          </h1>
          <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
            Dedicated individuals working together to create positive change in our community through youth empowerment
            and leadership development.
          </p>

          {/* Team Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-blue-600 mb-2">{isLoading ? "..." : youthLeaders.length}</div>
              <div className="text-gray-600">Youth Leaders</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-green-600 mb-2">
                {isLoading ? "..." : executiveMembers.length}
              </div>
              <div className="text-gray-600">Executive Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-purple-600 mb-2">{isLoading ? "..." : boardDirectors.length}</div>
              <div className="text-gray-600">Board Directors</div>
            </div>
          </div>
        </div>
      </section>

      {/* Team Sections */}
      <div className="max-w-7xl mx-auto px-4 py-16">
        {/* Youth Leaders */}
        <TeamSection
          title="Youth Leaders"
          description="Our passionate youth leaders are at the forefront of community engagement, organizing events, coordinating programs, and inspiring their peers to make a difference."
          members={youthLeaders}
          isLoading={isLoading}
          colorClass="bg-blue-100 text-blue-800"
        />

        {/* Executive Members */}
        <TeamSection
          title="Executive Members"
          description="Our executive team provides strategic leadership and operational oversight, ensuring our programs run smoothly and effectively serve our community."
          members={executiveMembers}
          isLoading={isLoading}
          colorClass="bg-green-100 text-green-800"
        />

        {/* Board of Directors */}
        <TeamSection
          title="Board of Directors"
          description="Our board of directors provides governance, strategic direction, and oversight to ensure Framework for Future maintains its mission and achieves its goals."
          members={boardDirectors}
          isLoading={isLoading}
          colorClass="bg-purple-100 text-purple-800"
        />
      </div>

      {/* Join Our Team Section */}
    </div>
  )
}
