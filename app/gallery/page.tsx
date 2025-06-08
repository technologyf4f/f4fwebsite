import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { UserCircle, ArrowLeft } from "lucide-react"

export default function GalleryPage() {
  return (
    <div className="min-h-screen bg-gray-50">
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

            <nav className="hidden lg:flex items-center ml-16">
              <Link href="/about" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                About Us
              </Link>
              <Link href="/programs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                Programs
              </Link>
              <Link href="/blogs" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                Blogs
              </Link>
              <Link href="/contact" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                Contact
              </Link>
              <Link href="/feedback" className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-6">
                Feedback
              </Link>
            </nav>

            <div className="flex items-center gap-4">
              <Button asChild variant="default" className="hidden lg:inline-flex bg-green-600 hover:bg-green-700">
                <Link href="/donate">Donate</Link>
              </Button>
              <Button variant="ghost" size="icon" className="rounded-full">
                <UserCircle className="h-6 w-6" />
                <span className="sr-only">User account</span>
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Gallery Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Great Memories</h1>
              <p className="text-gray-600 mt-2">Capturing moments of growth, leadership, and community impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-7xl mx-auto">
          {/* Gallery Categories */}
          <div className="flex flex-wrap gap-2 mb-8">
            <Button variant="default" className="bg-indigo-700 hover:bg-indigo-800">
              All Photos
            </Button>
            <Button variant="outline">Leadership Workshops</Button>
            <Button variant="outline">Community Service</Button>
            <Button variant="outline">Youth Conferences</Button>
            <Button variant="outline">Team Building</Button>
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {/* Row 1 */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Leadership workshop"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Community service"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Group celebration"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Team building"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Row 2 */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Youth conference"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Mentorship program"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Volunteer day"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Awards ceremony"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Row 3 */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Leadership training"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Community cleanup"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Public speaking"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Teamwork exercise"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Row 4 */}
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Group photo"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Outdoor activity"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Discussion group"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
            <div className="aspect-square bg-gray-200 rounded-lg overflow-hidden relative">
              <Image
                src="/placeholder.svg?height=400&width=400"
                alt="Celebration event"
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
