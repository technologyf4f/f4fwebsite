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
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 leading-tight">
                WE ENABLE YOUNG PEOPLE TO LEARN LEADERSHIP SKILLS BY LISTENING, UNDERSTANDING, MENTORING, AND ACTIVELY
                SERVING.
              </h2>
            </div>

            {/* Right Column - Our Story */}
            <div className="space-y-8">
              <div>
                <h3 className="text-2xl font-bold text-gray-900 mb-6">Our Story</h3>
                <p className="text-gray-700 leading-relaxed mb-6">
                  Like many amazing journey's, ours started in 2015 with a group of friends conversing about the need
                  for a platform...a platform where youth can learn and grow. We have made progress and connections and
                  are on our 4th cohort of our youth board. Over the last few years we have evolved and grown. We
                  believe in instilling strong values in our members.
                </p>
              </div>

              {/* Values Section */}
              <div className="space-y-6">
                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    <span className="text-red-600">Put Service over Self</span> - Real leaders find joy in helping
                    others expecting nothing in return.
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    <span className="text-red-600">Leadership is not a title, it's a Responsibility</span> - If your
                    actions inspire others to dream more, do more and become more you are leader.
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    <span className="text-red-600">Ownership</span> - Leaders are owners of their actions, words and
                    their teams. They never say "that's not my job."
                  </h4>
                </div>

                <div>
                  <h4 className="font-bold text-gray-900 mb-2">
                    <span className="text-red-600">Work as one Team</span> - One team starts with leadership and strives
                    on trust.
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
