// app/components/HeaderServer.js
"use server";
import Header from "./Header";

export default async function HeaderServer() {
  try {
    // Lazy import to avoid crashing on missing env/config during SSR
    const [{ authOptions }, { getServerSession }] = await Promise.all([
      import("@/app/api/auth/[...nextauth]/route"),
      import("next-auth")
    ]);

    const session = await getServerSession(authOptions);
    return <Header session={session} />;
  } catch (err) {
    console.error("HeaderServer: failed to resolve session, rendering without session.", err);
    return <Header session={null} />;
  }
}
