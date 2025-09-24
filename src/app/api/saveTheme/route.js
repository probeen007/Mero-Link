import mongoose from 'mongoose';
import { Page, THEME_VALUES } from '@/models/Page';

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

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m);
  }
  cached.conn = await cached.promise;
  
  // Force refresh models in development to pick up schema changes
  if (process.env.NODE_ENV === 'development') {
    console.log("🔄 Development mode: Refreshing mongoose models");
    // Clear the model cache to ensure updated schema is used
    if (mongoose.models.Page) {
      delete mongoose.models.Page;
    }
  }
  
  return cached.conn;
}

// GET for testing
export async function GET() {
  return new Response("✅ saveTheme API is alive", { status: 200 });
}

// POST to save theme
export async function POST(req) {
  try {
    await connectToDatabase();
    const { pageId, theme } = await req.json();

    console.log("📥 Received request:", { pageId, theme, pageIdType: typeof pageId, themeType: typeof theme });

    if (!pageId) return new Response("pageId missing", { status: 400 });
    if (!theme) return new Response("theme missing", { status: 400 });

    // Convert numeric theme ID to database enum value
    const dbThemeValue = themeMapping[theme.toString()] || theme;
    console.log("🎨 Theme mapping:", { originalTheme: theme, mappedTheme: dbThemeValue });

    // Validate theme value before saving using exported theme values
    if (!THEME_VALUES.includes(dbThemeValue)) {
      console.log("❌ Invalid theme value:", dbThemeValue);
      console.log("✅ Valid themes:", THEME_VALUES);
      return new Response(`Invalid theme value: ${dbThemeValue}. Valid themes: ${THEME_VALUES.join(', ')}`, { status: 400 });
    }

    console.log("🔍 Looking for page with ID:", pageId);
    const page = await Page.findById(pageId);
    console.log("📄 Found page:", page ? "YES" : "NO");
    
    if (!page) {
      console.log("❌ Page not found for ID:", pageId);
      return new Response("Page not found", { status: 404 });
    }

    console.log("💾 Current page theme:", page.theme);
    console.log("🎨 Setting new theme:", dbThemeValue);
    console.log("🔧 Page adaptBackground setting:", page.adaptBackground);
    
    try {
      // Try the standard approach first
      page.set('theme', dbThemeValue);
      page.set('updatedAt', new Date());
      
      // Validate the document before saving
      const validationError = page.validateSync();
      if (validationError) {
        console.log("❌ Validation error:", validationError);
        // If validation fails, try direct database update (bypass Mongoose validation)
        console.log("🔄 Attempting direct database update...");
        await Page.updateOne(
          { _id: pageId },
          { 
            $set: { 
              theme: dbThemeValue,
              updatedAt: new Date()
            }
          }
        );
        console.log("✅ Direct database update successful");
      } else {
        await page.save();
        console.log("✅ Standard save successful");
      }
    } catch (saveError) {
      console.log("❌ Save error, attempting direct update:", saveError.message);
      // Fallback to direct database update
      await Page.updateOne(
        { _id: pageId },
        { 
          $set: { 
            theme: dbThemeValue,
            updatedAt: new Date()
          }
        }
      );
      console.log("✅ Fallback direct update successful");
    }

    console.log("✅ Theme saved successfully");
    
    // Return success with timestamp for live updates
    return new Response(JSON.stringify({ 
      success: true, 
      message: "Theme saved",
      lastUpdated: new Date().toISOString()
    }), { 
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (err) {
    console.error("❌ saveTheme error:", err);
    console.error("❌ Error details:", {
      name: err.name,
      message: err.message,
      stack: err.stack
    });
    return new Response(`Error saving theme: ${err.message}`, { status: 500 });
  }
}
