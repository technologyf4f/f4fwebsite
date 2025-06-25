import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { UserCircle, ArrowLeft, Mail } from "lucide-react"

export default function ContactPage() {
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
              <Link href="/contact" className="text-blue-600 font-medium px-6">
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

      {/* Contact Header */}
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">
            <Button variant="ghost" size="icon" asChild>
              <Link href="/">
                <ArrowLeft className="h-5 w-5" />
              </Link>
            </Button>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Contact</h1>
              <p className="text-gray-600 mt-2">Get in touch with our team</p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Content */}
      <section className="container mx-auto px-4 py-12">
        <div className="max-w-6xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div>
              <h2 className="text-2xl font-bold text-gray-900 mb-8">Get in Touch</h2>

              <div className="space-y-6 mb-8">
                <Card>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-4">
                      <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                        <Mail className="h-6 w-6 text-green-600" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-gray-900">Email</h3>
                        <a href="mailto:framework4future@gmail.com" className="text-green-600 hover:text-green-800">
                          framework4future@gmail.com
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="bg-indigo-50 rounded-lg p-6">
                <h3 className="font-semibold text-gray-900 mb-2">Ready to Get Involved?</h3>
                <p className="text-gray-600 mb-4">
                  Join our community of young leaders making a difference in the Carolinas.
                </p>
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button asChild className="bg-indigo-700 hover:bg-indigo-800">
                    <Link href="/programs">View Programs</Link>
                  </Button>
                  <Button asChild variant="outline">
                    <Link href="/donate">Support Our Mission</Link>
                  </Button>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <Card>
                <CardHeader>
                  <CardTitle>Send us a Message</CardTitle>
                </CardHeader>
                <CardContent>
                  <form className="space-y-6">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="firstName">First Name</Label>
                        <Input id="firstName" placeholder="Your first name" required />
                      </div>
                      <div>
                        <Label htmlFor="lastName">Last Name</Label>
                        <Input id="lastName" placeholder="Your last name" required />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" placeholder="your.email@example.com" required />
                    </div>

                    <div>
                      <Label htmlFor="phone">Phone (Optional)</Label>
                      <Input id="phone" type="tel" placeholder="Your phone number" />
                    </div>

                    <div>
                      <Label htmlFor="subject">Subject</Label>
                      <Input id="subject" placeholder="What is this regarding?" required />
                    </div>

                    <div>
                      <Label htmlFor="message">Message</Label>
                      <Textarea
                        id="message"
                        placeholder="Tell us more about how we can help you..."
                        rows={6}
                        required
                      />
                    </div>

                    <Button type="submit" className="w-full bg-indigo-700 hover:bg-indigo-800">
                      Send Message
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
