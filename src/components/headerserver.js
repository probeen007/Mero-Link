// app/components/HeaderServer.js
"use server"
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { getServerSession } from "next-auth";
import Header from "./Header";

export default async function HeaderServer() {
  const session = await getServerSession(authOptions);

  //  console.log('Session in HeaderServer:', session); // Check if session is being retrieved properly

  return <Header session={session} />;
}
