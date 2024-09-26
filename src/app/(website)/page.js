import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import HeroForm from "@/components/forms/HeroForm";
import { getServerSession } from "next-auth";

export default async function Home() {
  const session = await getServerSession(authOptions);
  return (
    <main>
      <section className="pt-32">
        <div className="max-w-md mb-8">
          <h1 className="text-6xl font-bold">
            Excel your digital presence
          </h1>

          <h2 className="text-gray-500 text-xl mt-6">
            Making connections easy, elegant, and impactful
          </h2>
        </div>
        <HeroForm user={session?.user} />
      </section>
    </main>
  )
}
