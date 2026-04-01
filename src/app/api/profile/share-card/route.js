import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import dbConnect from "@/libs/mongoClient";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Project } from "@/models/Project";
import { notFound, ok, serverError, unauthorized } from "@/libs/apiResponse";
import { cache, cacheKey, getCachedOrFetch } from "@/libs/cache";

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
      return unauthorized();
    }

    await dbConnect();

    const email = session.user.email;
    const [page, user] = await Promise.all([
      getCachedOrFetch(
        cacheKey('sharecard:page', email),
        () => Page.findOne({ owner: email })
          .select('uri displayName bio buttons links videos owner theme')
          .lean(),
        120000 // Cache for 2 minutes
      ),
      getCachedOrFetch(
        cacheKey('sharecard:user', email),
        () => User.findOne({ email })
          .select('_id name image')
          .lean(),
        300000 // Cache for 5 minutes
      ),
    ]);

    if (!page) {
      return notFound("Profile not found");
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

    return ok({
      avatar: user?.image || "/icon-192x192.png",
      fullName: page.displayName || user?.name || "Mero Link User",
      bio: page.bio || "Create your own profile with Mero Link",
      linksCount,
      projectsCount,
      socialKeys,
      profileUrl,
      uri: page.uri,
      theme: page.theme || "default",
    });
  } catch (error) {
    console.error("Share card API error:", error);
    return serverError("Failed to load share card data");
  }
}
