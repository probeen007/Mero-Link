import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/libs/mongoClient";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Project } from "@/models/Project";

const SOCIAL_KEYS = new Set([
  "email",
  "mobile",
  "instagram",
  "facebook",
  "discord",
  "tiktok",
  "youtube",
  "whatsapp",
  "github",
  "telegram",
  "twitter",
  "linkedin",
  "snapchat",
  "pinterest",
  "reddit",
  "twitch",
  "spotify",
  "soundcloud",
  "medium",
  "tumblr",
]);

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    await dbConnect();

    const email = session.user.email;
    const [page, user] = await Promise.all([
      Page.findOne({ owner: email }).lean(),
      User.findOne({ email }).lean(),
    ]);

    if (!page) {
      return Response.json({ error: "Profile not found" }, { status: 404 });
    }

    const linksCount = Array.isArray(page.links) ? page.links.length : 0;
    const socialKeys = Object.entries(page?.buttons || {})
      .filter(([key, value]) => SOCIAL_KEYS.has(key) && typeof value === "string" && value.trim())
      .map(([key]) => key);

    let projectsCount = 0;
    try {
      projectsCount = await Project.countDocuments({ owner: email });
    } catch (error) {
      projectsCount = 0;
    }

    const publicBaseUrl = (
      process.env.NEXT_PUBLIC_APP_URL ||
      process.env.NEXT_PUBLIC_SITE_URL ||
      "https://merolink.it.com"
    ).replace(/\/$/, "");
    const profileUrl = `${publicBaseUrl}/${page.uri}`;

    return Response.json(
      {
        avatar: user?.image || "/icon-192x192.png",
        fullName: page.displayName || user?.name || "Mero Link User",
        bio: page.bio || "Create your own profile with Mero Link",
        linksCount,
        projectsCount,
        socialKeys,
        profileUrl,
        uri: page.uri,
        theme: page.theme || "default",
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Share card API error:", error);
    return Response.json(
      { error: "Failed to load share card data" },
      { status: 500 }
    );
  }
}
