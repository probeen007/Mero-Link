import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import dbConnect from "@/libs/mongoClient";
import { logger } from "@/libs/logger";
import { cache, cacheKey } from "@/libs/cache";
import { extractVideoInfo, validateVideosArray, sanitizeVideoUrl, generateVideoId, getThumbnailUrl } from "@/libs/videoExtractor";

function correlationId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export async function POST(request) {
  const cid = correlationId();
  const start = performance.now();

  try {
    // Check authentication
    const session = await getServerSession(authOptions);
    if (!session?.user?.email) {
      logger.warn('saveVideos unauthorized access attempt', { cid });
      return new Response(JSON.stringify({ error: 'Unauthorized', cid }), {
        status: 401,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    await dbConnect();
    const { uri, videos, videoPosition } = await request.json();

    // Validate input
    if (!uri || typeof uri !== 'string') {
      logger.warn('saveVideos missing uri', { cid, email: session.user.email });
      return new Response(JSON.stringify({ error: 'URI is required', cid }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (!Array.isArray(videos)) {
      logger.warn('saveVideos invalid videos array', { cid, email: session.user.email });
      return new Response(JSON.stringify({ error: 'Videos must be an array', cid }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    const safeVideoPosition = videoPosition === 'after' ? 'after' : 'before';

    // Maximum 10 videos
    if (videos.length > 10) {
      logger.warn('saveVideos max videos exceeded', { cid, count: videos.length });
      return new Response(JSON.stringify({ error: 'Maximum 10 videos allowed', cid }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Process and validate videos
    const processedVideos = [];
    for (let i = 0; i < videos.length; i++) {
      const videoInput = videos[i];
      
      if (!videoInput.url || typeof videoInput.url !== 'string') {
        continue; // Skip invalid entries
      }

      // Extract video information
      const videoInfo = extractVideoInfo(videoInput.url);
      if (!videoInfo) {
        logger.warn('saveVideos invalid video url', { cid, url: videoInput.url });
        continue; // Skip invalid URLs
      }

      // Sanitize URL
      const sanitizedUrl = sanitizeVideoUrl(videoInput.url);

      const video = {
        id: videoInput.id || generateVideoId(),
        title: videoInput.title || videoInfo.title,
        url: sanitizedUrl,
        platform: videoInfo.platform,
        videoId: videoInfo.videoId,
        thumbnail: videoInfo.thumbnail,
        order: i
      };

      processedVideos.push(video);
    }

    // Find page and verify ownership
    const page = await Page.findOne({ uri });
    if (!page) {
      logger.warn('saveVideos page not found', { cid, uri });
      return new Response(JSON.stringify({ error: 'Page not found', cid }), {
        status: 404,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    if (page.owner !== session.user.email) {
      logger.warn('saveVideos unauthorized owner check', { cid, email: session.user.email });
      return new Response(JSON.stringify({ error: 'Unauthorized', cid }), {
        status: 403,
        headers: { 'Content-Type': 'application/json' }
      });
    }

    // Update page with videos
    page.videos = processedVideos;
    page.videoPosition = safeVideoPosition;
    await page.save();

    logger.info('saveVideos success', {
      cid,
      email: session.user.email,
      uri,
      videoCount: processedVideos.length,
      duration: `${(performance.now() - start).toFixed(2)}ms`
    });

    // Clear relevant caches
    cache.delete(cacheKey('page', uri));
    cache.delete(cacheKey('sharecard:page', session.user.email));

    return new Response(JSON.stringify({
      success: true,
      message: 'Videos saved successfully',
      videoCount: processedVideos.length,
      cid
    }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' }
    });

  } catch (error) {
    logger.error('saveVideos error', {
      cid,
      error: error.message,
      stack: error.stack
    });

    return new Response(JSON.stringify({
      error: 'Failed to save videos',
      cid
    }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
