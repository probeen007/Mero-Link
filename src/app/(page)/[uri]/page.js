import { Page } from "@/models/Page";
import { User } from "@/models/User";
import { Event } from "@/models/Event";
import dbConnect from "@/libs/mongoClient";
import { cache, cacheKey } from "@/libs/cache";
import { logger } from "@/libs/logger";
import { measurePerformance } from "@/libs/performance";
import { generatePersonStructuredData, generateWebPageStructuredData } from "@/libs/structuredData";
import ClientLiveUserPage from "@/components/ClientLiveUserPage";

// Dynamic metadata generation for each user page
export async function generateMetadata({ params }) {
  const { uri } = params;

  try {
    await dbConnect();

    const cacheKeyStr = cacheKey("page-metadata", uri);
    const cached = cache.get(cacheKeyStr);
    if (cached) return cached;

    const page = await Page.findOne({ uri }).lean();
    const user = await User.findOne({ email: page?.owner }).lean();

    if (!page) {
      return {
        title: "Page Not Found - Mero Link",
        description: "This page could not be found.",
      };
    }

    const displayName = page.displayName || user?.name || uri;
    const bio =
      page.bio || `Connect with ${displayName} through their Mero Link page`;
    const avatar = page.avatar || user?.image || "";

    const metadata = {
      title: `${displayName} - Mero Link`,
      description: bio.length > 160 ? bio.substring(0, 157) + "..." : bio,
      keywords: `${displayName}, Mero Link, social media, link tree, ${uri}`,
      openGraph: {
        title: `${displayName} - Mero Link`,
        description: bio,
        images: avatar ? [{ url: avatar, width: 400, height: 400 }] : [],
        url: `https://merolink.me/${uri}`,
        type: "profile",
        siteName: "Mero Link",
      },
      twitter: {
        card: "summary",
        title: `${displayName} - Mero Link`,
        description: bio,
        images: avatar ? [avatar] : [],
      },
      robots: {
        index: true,
        follow: true,
      },
      alternates: {
        canonical: `https://merolink.me/${uri}`,
      },
    };

    cache.set(cacheKeyStr, metadata, 600000); // Cache 10 min
    return metadata;
  } catch (error) {
    logger.error("Failed to generate metadata", { uri, error: error.message });
    return {
      title: "Mero Link",
      description: "Unify your online presence with Mero Link",
    };
  }
}

const fetchPageData = measurePerformance("fetchPageData", async (uri) => {
  await dbConnect();

  const cacheKeyStr = cacheKey("page-data", uri);
  const cached = cache.get(cacheKeyStr);
  if (cached) {
    logger.debug("Page data served from cache", { uri });
    return cached;
  }

  const page = await Page.findOne({ uri }).lean();
  if (!page) return null;

  const user = await User.findOne({ email: page.owner }).lean();

  // Convert ObjectIds to strings for client
  page._id = page._id.toString();
  if (user) user._id = user._id.toString();

  const data = { page, user };
  cache.set(cacheKeyStr, data, 30000); // Cache 30 sec for live updates

  return data;
});

export default async function UserPage({ params }) {
  const { uri } = params;

  try {
    const data = await fetchPageData(uri);

    if (!data) {
      return (
        <div className="min-h-screen flex items-center justify-center bg-gray-900">
          <div className="text-center text-white">
            <h1 className="text-4xl font-bold mb-4">404</h1>
            <p className="text-xl">Page not found!</p>
            <p className="text-gray-400 mt-2">
              The page "{uri}" doesn't exist.
            </p>
          </div>
        </div>
      );
    }

    const { page, user } = data;

    // Log view (fire and forget)
    Event.create({ uri, page: uri, type: "view" }).catch((error) =>
      logger.error("Failed to log view event", { uri, error: error.message })
    );

    // Prepare consistent initialData for hydration
    const initialData = {
      page,
      user,
      lastUpdated:
        page.updatedAt?.toISOString() ||
        page.createdAt?.toISOString() ||
        new Date(0).toISOString(),
    };

    // Generate structured data on server-side for SEO
    const structuredData = generatePersonStructuredData(page, user);
    const webPageData = generateWebPageStructuredData(page, user);

    return (
      <>
        <script 
          type="application/ld+json" 
          dangerouslySetInnerHTML={{
            __html: JSON.stringify([structuredData, webPageData])
          }} 
        />
        <ClientLiveUserPage initialData={initialData} uri={uri} />
      </>
    );
  } catch (error) {
    logger.error("Error rendering user page", { uri, error: error.message });
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <h1 className="text-4xl font-bold mb-4">Oops!</h1>
          <p className="text-xl">Something went wrong.</p>
          <p className="text-gray-400 mt-2">Please try again later.</p>
        </div>
      </div>
    );
  }
}
