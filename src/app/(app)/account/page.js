import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import mongoose from "mongoose";
import { Page } from "@/models/Page";
import { User } from "@/models/User";

import UsernameForm from "@/components/forms/UsernameForm";
import AccountPageClient from "./AccountPageClient";


let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then((mongoose) => mongoose);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// Server component
export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  await connectToDatabase();

  let page, user;
  try {
    page = await Page.findOne({ owner: session.user.email }).lean();
    user = await User.findOne({ email: session.user.email }).lean();
  } catch (err) {
    console.error(err);
    return <div>Error loading account page</div>;
  }

  if (!page) {
    return (
      <div className="p-6 max-w-xl mx-auto">
        <UsernameForm desiredUsername={searchParams?.desiredUsername || ""} />
      </div>
    );
  }

  page._id = page._id.toString();
  if (Array.isArray(page.videos)) {
    page.videos = page.videos.map((video) => ({
      id: video?.id || (video?._id ? video._id.toString() : ''),
      title: typeof video?.title === 'string' ? video.title : '',
      url: typeof video?.url === 'string' ? video.url : '',
      thumbnail: typeof video?.thumbnail === 'string' ? video.thumbnail : '',
      platform: typeof video?.platform === 'string' ? video.platform : 'other',
      videoId: typeof video?.videoId === 'string' ? video.videoId : '',
      order: Number.isFinite(video?.order) ? video.order : 0,
    }));
  }

  // Pass data to client component including user verification status
  return <AccountPageClient page={page} user={session.user} isVerified={user?.isVerified || false} />;
}
