import Link from "next/link"
import Image from "next/image"
import { Facebook, Twitter, Instagram, Linkedin, Mail, MapPin, Youtube } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-indigo-900 text-white">
      <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Organization Info */}
          <div className="space-y-6">
            <div className="flex items-center space-x-3">
              <Image src="/f4f-logo.png" alt="Framework 4 Future Logo" width={128} height={128} className="rounded-xl" />
              <span className="text-2xl font-bold">Framework 4 Future</span>
            </div>
            <p className="text-gray-300 text-base leading-relaxed">
              Empowering youth to become the next generation of leaders through community engagement, mentorship, and
              active service in the Carolinas.
            </p>
            <div className="flex space-x-1">
              <a
                target="_blank"
                href="https://www.facebook.com/p/Framework-for-Future-100068639006501"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 bg-white/10 p-3 rounded-xl backdrop-blur-sm"
                rel="noreferrer"
              >
                <Facebook size={24} />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                target="_blank"
                href="https://x.com/framework4futu1"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 bg-white/10 p-3 rounded-xl backdrop-blur-sm"
                rel="noreferrer"
              >
                <Twitter size={24} />
                <span className="sr-only">Twitter</span>
              </a>
              <a
                target="_blank"
                href="https://www.instagram.com/framework4future"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 bg-white/10 p-3 rounded-xl backdrop-blur-sm"
                rel="noreferrer"
              >
                <Instagram size={24} />
                <span className="sr-only">Instagram</span>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/framework-4future-0aa664178/"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 bg-white/10 p-3 rounded-xl backdrop-blur-sm"
                rel="noreferrer"
              >
                <Linkedin size={24} />
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                target="_blank"
                href="https://www.youtube.com/@framework4futureadmin526"
                className="text-gray-400 hover:text-white transition-all duration-200 hover:scale-110 bg-white/10 p-3 rounded-xl backdrop-blur-sm"
                rel="noreferrer"
              >
                <Youtube size={24} />
                <span className="sr-only">YouTube</span>
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-xl font-bold mb-6">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Home
                </Link>
              </li>
              <li>
                <Link
                  href="/our-story"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Our Story
                </Link>
              </li>
              <li>
                <Link
                  href="/who-we-are"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Who We Are
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Events
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Blogs
                </Link>
              </li>
              {/* <li>
                <Link
                  href="/gallery"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Gallery
                </Link>
              </li> */}
            </ul>
          </div>

          {/* Get Involved */}
          <div>
            <h3 className="text-xl font-bold mb-6">Get Involved</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/donate"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Donate
                </Link>
              </li>
              <li>
                <Link
                  href="/events"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Volunteer
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Partner With Us
                </Link>
              </li>
              <li>
                <Link
                  href="/register"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium hover:translate-x-1 transform duration-200 block"
                >
                  Join Our Community
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="text-xl font-bold mb-6">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-start space-x-4">
                <MapPin size={20} className="text-indigo-400 mt-1 flex-shrink-0" />
                <span className="text-gray-300 text-base">
                  Serving the Carolinas
                  <br />
                  North & South Carolina
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <Mail size={20} className="text-indigo-400 flex-shrink-0" />
                <a
                  href="mailto:executivecommittee@framework4future.org"
                  className="text-gray-300 hover:text-white transition-colors text-base font-medium"
                >
                  executivecommittee@framework4future.org
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-gray-700 mt-12 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
            <div className="text-gray-400 text-base">
              © {new Date().getFullYear()} Framework 4 Future. All rights reserved.
            </div>
            {/* <div className="flex space-x-8">
              <Link href="/privacy" className="text-gray-400 hover:text-white transition-colors text-base font-medium">
                Privacy Policy
              </Link>
              <Link href="/terms" className="text-gray-400 hover:text-white transition-colors text-base font-medium">
                Terms of Service
              </Link>
              <Link
                href="/accessibility"
                className="text-gray-400 hover:text-white transition-colors text-base font-medium"
              >
                Accessibility
              </Link>
            </div> */}
          </div>
        </div>
      </div>
    </footer>
  )
}
