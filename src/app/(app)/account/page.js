import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import PageButtonsForm from "@/components/forms/PageButtonsForm";
import PageLinksForm from "@/components/forms/PageLinksForm";
import PageSettingsForm from "@/components/forms/PageSettingsForm";
import UsernameForm from "@/components/forms/UsernameForm";
import { Page } from "@/models/Page";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

// Cache the connection globally
let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connectToDatabase() {
  // Check if we already have a connection
  if (cached.conn) {
    return cached.conn;
  }

  // If no connection, initiate one
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI)
      .then((mongoose) => mongoose)
      .catch((error) => {
        console.error("MongoDB connection error:", error);
        throw error;
      });
  }

  cached.conn = await cached.promise;
  return cached.conn;
}

export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  const desiredUsername = searchParams?.desiredUsername;

  // Redirect if no session
  if (!session) {
    return redirect('/');
  }

  // Ensure mongoose is connected
  await connectToDatabase();

  // Fetch the page for the logged-in user
  let page;
  try {
    page = await Page.findOne({ owner: session.user.email }).lean();
  } catch (error) {
    console.error("Error fetching page:", error);
    return <div>Error loading account page. Please try again later.</div>;
  }

  // Render forms if the page exists
  if (page) {
    page._id = page._id.toString();

    return (
      <>
        <PageSettingsForm page={page} user={session.user} />
        <PageButtonsForm page={page} user={session.user} />
        <PageLinksForm page={page} user={session.user} />
      </>
    );
  }

  // Render the username form if no page exists
  return (
    <div>
      <UsernameForm desiredUsername={desiredUsername || ''} />
    </div>
  );
}
