import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Header from "./Header";

export default async function HeaderServer() {
  try {
    const session = await getServerSession(authOptions);
    return <Header session={session} />;
  } catch (err) {
    console.error("HeaderServer: failed to resolve session, rendering without session.", err);
    return <Header session={null} />;
  }
}
