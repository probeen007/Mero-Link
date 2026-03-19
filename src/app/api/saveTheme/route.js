import { Page, THEME_VALUES } from '@/models/Page';
import dbConnect from '@/libs/mongoClient';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { badRequest, notFound, ok, serverError, unauthorized, isValidObjectId } from '@/libs/apiResponse';
import { cache, cacheKey } from '@/libs/cache';

// Theme mapping: numeric keys to database enum values
const themeMapping = {
  "1": "default",
  "2": "aurora", 
  "3": "neon",
  "4": "light",
  "5": "starfield",
  "6": "gamer",
  "7": "coder",
  "8": "hacker",
  "9": "elegant",
  "10": "funky",
  "11": "feminine",
  "12": "retro",
  "13": "nature",
  "14": "corporate",
  "15": "cosmic"
};


// GET for testing
export async function GET() {
  return new Response("✅ saveTheme API is alive", { status: 200 });
}

// POST to save theme
export async function POST(req) {
  try {
    await dbConnect();
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      return unauthorized();
    }

    const { pageId, theme } = await req.json();

    if (!pageId || !isValidObjectId(pageId)) return badRequest('Valid pageId is required');
    if (!theme || typeof theme !== 'string') return badRequest('theme is required');

    // Convert numeric theme ID to database enum value
    const dbThemeValue = themeMapping[theme.toString()] || theme;

    // Validate theme value before saving using exported theme values
    if (!THEME_VALUES.includes(dbThemeValue)) {
      return badRequest('Invalid theme value');
    }

    const updateResult = await Page.updateOne(
      { _id: pageId, owner: session.user.email },
      {
        $set: {
          theme: dbThemeValue,
          updatedAt: new Date()
        }
      },
      { runValidators: true }
    );

    if (!updateResult.matchedCount) {
      return notFound('Page not found or forbidden');
    }
    
    // Clear cache for this page on updates
    const updatedPage = await Page.findById(pageId).select('uri owner').lean();
    if (updatedPage) {
      cache.delete(cacheKey('page', updatedPage.uri));
      cache.delete(cacheKey('sharecard:page', updatedPage.owner));
    }
    
    // Return success with timestamp for live updates
    return ok({ 
      success: true, 
      message: "Theme saved",
      lastUpdated: new Date().toISOString()
    });
  } catch (err) {
    console.error("❌ saveTheme error:", err?.message || err);
    return serverError('Failed to save theme');
  }
}
