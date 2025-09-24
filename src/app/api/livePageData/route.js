import mongoose from 'mongoose';
import { Page } from '@/models/Page';
import { User } from '@/models/User';

let cached = global.mongoose;
if (!cached) cached = global.mongoose = { conn: null, promise: null };

async function connectToDatabase() {
  if (cached.conn) return cached.conn;
  if (!cached.promise) {
    cached.promise = mongoose.connect(process.env.MONGO_URI).then(m => m);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

// GET endpoint to fetch live page data
export async function GET(request) {
  try {
    await connectToDatabase();
    
    const { searchParams } = new URL(request.url);
    const uri = searchParams.get('uri');
    
    if (!uri) {
      return new Response(JSON.stringify({ error: 'URI parameter required' }), { 
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Fetch page and user data
    const page = await Page.findOne({ uri }).lean();
    if (!page) {
      return new Response(JSON.stringify({ error: 'Page not found' }), { 
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const user = await User.findOne({ email: page.owner }).lean();
    
    // Convert ObjectId to string for serialization
    page._id = page._id.toString();
    if (user) user._id = user._id.toString();

    // Add timestamp for cache busting
    const responseData = {
      page,
      user,
      lastUpdated: new Date().toISOString()
    };

    return new Response(JSON.stringify(responseData), { 
      status: 200,
      headers: { 
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate'
      }
    });
  } catch (err) {
    console.error("❌ livePageData error:", err);
    return new Response(JSON.stringify({ error: 'Internal server error' }), { 
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}