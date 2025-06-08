import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle, ArrowLeft, Menu } from "lucide-react"

export default function AboutPage() {
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
        <span className="text-gray-700 text-sm">framework4future.org/about</span>
        <div className="flex items-center gap-2">
          <span className="text-blue-500">↻</span>
        </div>
      </div>

      {/* Browser Tabs - ALWAYS visible */}
      <div className="bg-gray-200 p-1 flex overflow-x-auto gap-1 text-xs mx-2">
        <div className="bg-white px-3 py-1 rounded-t whitespace-nowrap border-t-2 border-blue-500">About Us | F4F</div>
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
              <Link href="/about" className="text-blue-600 font-medium px-2 text-sm">
                About Us
              </Link>
              <Link
                href="/programs"
                className="text-gray-700 hover:text-blue-600 font-medium transition-colors px-2 text-sm"
              >
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

      {/* About Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">About Us</h1>
              <p className="text-gray-600 mt-2">Learn more about our mission and impact</p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Mission Statement */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Our Mission</h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              We help develop next generation of youth leaders through intentional and impactful collaboration, civic
              engagement and service projects at the local, regional and national level, while creating pathways for
              leadership development.
            </p>
          </div>

          {/* Video Section */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Watch Our Story</h2>
            <div className="aspect-video w-full rounded-lg overflow-hidden">
              <iframe
                src="https://www.youtube.com/embed/j_o_OkOQBeo"
                title="Framework 4 Future Video"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                allowFullScreen
                className="w-full h-full"
              ></iframe>
            </div>
          </div>

          {/* What We Do */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Youth Leadership Development</h3>
              <p className="text-gray-700 mb-4">
                We provide comprehensive leadership training programs that empower young people to become effective
                leaders in their communities.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Leadership workshops and seminars</li>
                <li>Mentorship programs</li>
                <li>Skill-building activities</li>
                <li>Networking opportunities</li>
              </ul>
            </div>

            <div className="bg-white rounded-lg shadow-lg p-8">
              <h3 className="text-xl font-bold text-gray-900 mb-4">Community Engagement</h3>
              <p className="text-gray-700 mb-4">
                Our programs focus on connecting youth with their communities through meaningful service projects and
                civic participation.
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Community service projects</li>
                <li>Civic engagement initiatives</li>
                <li>Local government participation</li>
                <li>Social impact campaigns</li>
              </ul>
            </div>
          </div>

          {/* Impact Stats */}
          <div className="bg-indigo-700 text-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold mb-6 text-center">Our Impact</h3>
            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-4xl font-bold mb-2">500+</div>
                <div className="text-indigo-200">Youth Leaders Trained</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">50+</div>
                <div className="text-indigo-200">Community Projects</div>
              </div>
              <div>
                <div className="text-4xl font-bold mb-2">25+</div>
                <div className="text-indigo-200">Partner Organizations</div>
              </div>
            </div>
          </div>

          {/* Our Approach */}
          <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Approach</h3>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-white rounded"></div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Intentional Collaboration</h4>
                <p className="text-gray-600 text-sm">
                  Building meaningful partnerships between youth, communities, and organizations.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-white rounded"></div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Impactful Projects</h4>
                <p className="text-gray-600 text-sm">
                  Creating real, measurable change in communities across the Carolinas.
                </p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-blue-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <div className="w-8 h-8 border-2 border-white rounded"></div>
                </div>
                <h4 className="font-bold text-gray-900 mb-2">Leadership Pathways</h4>
                <p className="text-gray-600 text-sm">
                  Providing clear paths for youth to develop and apply their leadership skills.
                </p>
              </div>
            </div>
          </div>

          {/* Call to Action */}
          <div className="bg-white rounded-lg shadow-lg p-8 text-center">
            <h3 className="text-2xl font-bold text-gray-900 mb-4">Get Involved</h3>
            <p className="text-gray-700 mb-6">
              Ready to join our community of young leaders? Explore our programs or get in touch to learn more.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button asChild className="bg-indigo-700 hover:bg-indigo-800">
                <Link href="/programs">View Our Programs</Link>
              </Button>
              <Button asChild variant="outline">
                <Link href="/contact">Contact Us</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
