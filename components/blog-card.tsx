"use client"

import { useState } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Calendar, User, Tag } from "lucide-react"
import type { Blog } from "@/lib/blogs-api"

interface BlogCardProps {
  blog: Blog
  showLearnMore?: boolean
}

export function BlogCard({ blog, showLearnMore = true }: BlogCardProps) {
  const [showDetails, setShowDetails] = useState(false)

  const formatDateForDisplay = (dateString: string) => {
    try {
      const date = new Date(dateString)
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    } catch {
      return dateString
    }
  }

  return (
    <>
      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 group border-0 shadow-lg rounded-3xl hover:scale-105">
        <div className="aspect-video relative overflow-hidden">
          <Image
            src={blog.image || "/placeholder.svg?height=300&width=400"}
            alt={blog.title}
            fill
            className="object-cover group-hover:scale-110 transition-transform duration-300"
          />
        </div>
        <CardHeader className="p-6">
          <div className="flex gap-2 mb-3">
            {blog.category && (
              <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-0 rounded-full px-3 py-1 text-xs font-semibold">
                <Tag className="h-3 w-3 mr-1" />
                {blog.category.name}
              </Badge>
            )}
          </div>
          <CardTitle className="text-xl font-bold text-gray-900">{blog.title}</CardTitle>
          <div className="flex items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span className="font-medium">{formatDateForDisplay(blog.date)}</span>
            </div>
            <div className="flex items-center gap-1">
              <User className="h-4 w-4" />
              <span className="font-medium">{blog.author}</span>
            </div>
          </div>
        </CardHeader>
        <CardContent className="px-6 pb-6">
          <p className="text-gray-600 mb-6 leading-relaxed line-clamp-3">
            {blog.excerpt || blog.content.substring(0, 150)}...
          </p>
        </CardContent>
        {showLearnMore && (
          <CardFooter className="p-6 pt-0">
            <Button
              onClick={() => setShowDetails(true)}
              variant="outline"
              className="w-full rounded-xl border-2 border-gray-200 hover:border-indigo-300 hover:bg-indigo-50 font-semibold bg-transparent"
            >
              Learn More
            </Button>
          </CardFooter>
        )}
      </Card>

      {/* Blog Details Dialog */}
      <Dialog open={showDetails} onOpenChange={setShowDetails}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto rounded-2xl">
          <DialogHeader>
            <DialogTitle className="text-3xl font-bold text-gray-900 mb-4">{blog.title}</DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            {/* Blog Image */}
            <div className="aspect-video relative overflow-hidden rounded-2xl">
              <Image
                src={blog.image || "/placeholder.svg?height=400&width=800"}
                alt={blog.title}
                fill
                className="object-cover"
              />
            </div>

            {/* Blog Meta Information */}
            <div className="flex flex-wrap items-center gap-4 text-gray-600">
              <div className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-indigo-600" />
                <span className="font-semibold">{formatDateForDisplay(blog.date)}</span>
              </div>
              <div className="flex items-center gap-2">
                <User className="h-5 w-5 text-indigo-600" />
                <span className="font-semibold">{blog.author}</span>
              </div>
              {blog.category && (
                <Badge className="bg-gradient-to-r from-indigo-100 to-purple-100 text-indigo-700 border-0 rounded-full px-4 py-2 font-semibold">
                  <Tag className="h-4 w-4 mr-2" />
                  {blog.category.name}
                </Badge>
              )}
            </div>

            {/* Blog Content */}
            <div className="prose max-w-none">
              <div className="text-gray-700 leading-relaxed text-lg whitespace-pre-wrap">{blog.content}</div>
            </div>

            {blog.created_at && (
              <div className="text-sm text-gray-500 pt-6 border-t border-gray-200">
                Published on{" "}
                {new Date(blog.created_at).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                })}
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}
