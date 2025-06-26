import Link from "next/link"
import { Button } from "@/components/ui/button"
import { UserCircle, ArrowLeft, Menu } from "lucide-react"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">      

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
