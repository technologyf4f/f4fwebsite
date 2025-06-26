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
      
      <section className="bg-white border-b">
        <div className="container mx-auto px-4 py-8">
          <div className="flex items-center gap-4">            
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
                    <Link href="/events">View Events</Link>
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
