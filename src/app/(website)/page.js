import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
  <section className="pt-16 sm:pt-24 md:pt-32 px-4 sm:px-6 md:px-8">
    <div className="max-w-md md:max-w-lg lg:max-w-xl mb-8">
      <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold leading-tight">
        Excel your digital presence
      </h1>

      <h3 className="text-gray-500 text-base sm:text-lg md:text-xl mt-4 sm:mt-5 md:mt-6">
        Making connections easy, elegant, and impactful
      </h3>
    </div>
    <HeroForm user={session?.user} />
  </section>
</main>

  )
}
