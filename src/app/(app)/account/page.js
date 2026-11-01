import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/libs/mongoClient";
import { Page } from "@/models/Page";
import { User } from "@/models/User";

import UsernameForm from "@/components/forms/UsernameForm";
import AccountPageClient from "./AccountPageClient";

// Server component
export default async function AccountPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (!session) return redirect("/");

  await dbConnect();

  let page, user;
  try {
    [page, user] = await Promise.all([
      Page.findOne({ owner: session.user.email }).lean(),
      User.findOne({ email: session.user.email }).lean()
    ]);
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
