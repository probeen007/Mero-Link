import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import InteractiveBackground from "@/components/InteractiveBackground";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <div className="relative min-h-screen z-0">
      {/* Interactive Animated Background */}
      <InteractiveBackground />

      {/* Content */}
      <div className="relative z-10">
        <section className="pt-20 sm:pt-28 md:pt-36 pb-24">
          <div className="max-w-6xl mx-auto px-4 sm:px-6 md:px-8">
            <div className="text-center mb-12">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold leading-tight bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent mb-6 opacity-0 animate-fadeIn">
                Excel your digital presence
              </h1>

              <h3 className="text-gray-600 text-lg sm:text-xl md:text-2xl max-w-2xl mx-auto leading-relaxed opacity-0 animate-fadeInDelay">
                Making connections easy, elegant, and impactful
              </h3>
            </div>
            
            <div className="flex justify-center opacity-0 animate-fadeInDelay2">
              <HeroForm user={session?.user} />
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
