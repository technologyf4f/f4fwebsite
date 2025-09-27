import Image from "next/image"
import Link from "next/link"

export default function OurStoryPage() {
  return (
    <div className="min-h-screen bg-white">            

      {/* Hero Section with Image */}
      <section className="relative h-96 overflow-hidden">
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-fFaNHkjkwEzpjSJscgiEWauZkpmrEP.png"
          alt="Framework 4 Future team members"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-end pr-8">
          <div className="text-white text-right max-w-md">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight">
              WE ARE A GLOBAL COMMUNITY FOCUSED ON CREATING NEXT GEN LEADERS
            </h1>
          </div>
        </div>
      </section>

      {/* Content Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-start">
            {/* Left Column - Mission Statement */}
            <div className="space-y-6">
              <h2 className="text-2xl md:text-xl font-bold text-gray-900 leading-tight">
                    Embark on a journey of impact as you contribute to causes that matter. Your generosity fuels positive change, touching lives and creating a brighter future. With our secure and transparent donation platform, making a difference has never been more accessible. Join us in the collective effort to empower change and leave a lasting legacy of compassion and transformation.
              </h2>
            </div>




















            {/* Right Column - Our Story */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Who We Are</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                Welcome to Framework for Future, a passionate and dedicated team of individuals committed to making a positive impact in our community and beyond. We are a non-profit organization driven by a shared vision of creating a better world for all through youth leadership.
                </p>
              </div>

              {/* Values Section */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    At Framework for Future, our mission is to serve as a platform to get involved in a focused set of activities and create opportunities for youth to attain leadership skills through listening, understanding, practicing, and mentoring. We firmly believe in the power of educating and empowering through engaging youth. Through our unwavering dedication and collaborative efforts, we strive to create better leaders who are committed and will deliver on their commitments.
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                  Our organization was founded on the principles of focus on youth and their growth. Since our establishment, we have grown into a strong network of volunteers, donors, and supporters who believe in our cause and actively contribute to its success.
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                  We are passionate about addressing the challenges faced by our community and working towards sustainable solutions. By fostering partnerships with local organizations, engaging with key stakeholders, and leveraging the strengths of our diverse team, we aim to tackle specific issues or challenges related to your organization's focus.
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                  At the core of our organization is our incredible team of volunteers, staff members, and board of directors. Each individual brings unique skills, expertise, and perspectives to the table, ensuring that we approach our work with comprehensive knowledge and innovative strategies. We are united by our shared dedication to making a meaningful difference and empowering those in need.                    
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                  In all our endeavors, we operate with transparency, accountability, and integrity. We prioritize efficient resource management, ensuring that every donation and contribution is used effectively to maximize our impact. We are committed to maintaining the highest standards of governance and strive to provide our supporters with regular updates and reports on our progress.
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                  We understand that creating lasting change requires collective effort. That's why we actively seek partnerships with like-minded organizations, businesses, and individuals who share our vision. Together, we can amplify our impact, broaden our reach, and create a brighter future for generations to come.                  
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                  Thank you for visiting our website and for your interest in Framework for Future. We invite you to explore our programs, get involved, and join us on this inspiring journey of making a difference. Together, we can transform lives, uplift communities, and build a world where everyone has equal opportunities to thrive.                    
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                  If you have any questions, suggestions, or would like to contribute in any way, please don't hesitate to reach out. We look forward to connecting with you!
                  </h4>
                </div>
              </div>
            </div>
          </div>

          {/* Additional Content Section */}
          <div className="mt-16 bg-gray-50 rounded-lg p-8">
            <div className="text-center mb-8">
              <h3 className="text-2xl font-bold text-gray-900 mb-4">Our Journey Continues</h3>
              <p className="text-gray-600 max-w-3xl mx-auto">
                From a simple conversation among friends to a thriving community of young leaders, Framework 4 Future
                has grown into a platform that empowers youth across the Carolinas. We continue to evolve, learn, and
                create opportunities for the next generation of leaders.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-8 text-center">
              <div>
                <div className="text-3xl font-bold text-indigo-700 mb-2">2015</div>
                <div className="text-gray-600">Founded by a group of friends</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-700 mb-2">4th</div>
                <div className="text-gray-600">Cohort of youth board</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-indigo-700 mb-2">500+</div>
                <div className="text-gray-600">Young leaders impacted</div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}
