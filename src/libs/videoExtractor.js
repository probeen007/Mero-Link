// src/libs/videoExtractor.js
// Handle video URL extraction, validation, and thumbnail generation

/**
 * Extract video information from URL
 * Supports YouTube, Vimeo, and generic video URLs
 */
export function extractVideoInfo(url) {
  if (!url || typeof url !== 'string') {
    return null;
  }

  url = url.trim();

  // YouTube patterns
  const youtubePatterns = [
    /(?:youtube\.com\/watch\?v=|youtu\.be\/|youtube\.com\/embed\/)([a-zA-Z0-9_-]{11})/,
    /youtube\.com\/watch\?.*v=([a-zA-Z0-9_-]{11})/,
  ];

  for (const pattern of youtubePatterns) {
    const match = url.match(pattern);
    if (match) {
      return {
        platform: 'youtube',
        videoId: match[1],
        thumbnail: `https://img.youtube.com/vi/${match[1]}/maxresdefault.jpg`,
        embedUrl: `https://www.youtube.com/embed/${match[1]}`,
        title: `YouTube Video ${match[1].substring(0, 5)}`
      };
    }
  }

  // Vimeo patterns
  const vimeoMatch = url.match(/(?:vimeo\.com\/|player\.vimeo\.com\/video\/)(\d+)/);
  if (vimeoMatch) {
    return {
      platform: 'vimeo',
      videoId: vimeoMatch[1],
      thumbnail: `https://vimeo.com/api/v2/video/${vimeoMatch[1]}.json`,
      embedUrl: `https://player.vimeo.com/video/${vimeoMatch[1]}`,
      title: `Vimeo Video ${vimeoMatch[1]}`
    };
  }

  // Generic video URL (direct MP4, WebM, etc.)
  if (url.includes('.mp4') || url.includes('.webm') || url.includes('.mov') || url.includes('.avi')) {
    return {
      platform: 'other',
      videoId: url.split('/').pop(),
      thumbnail: '', // Will be handled as fallback
      embedUrl: url,
      title: url.split('/').pop()
    };
  }

  return null;
}

/**
 * Validate video URL
 */
export function isValidVideoUrl(url) {
  if (!url || typeof url !== 'string') return false;
  return extractVideoInfo(url) !== null;
}

/**
 * Get thumbnail URL (handles Vimeo async fetch)
 */
export async function getThumbnailUrl(videoInfo) {
  if (!videoInfo) return '';

  if (videoInfo.platform === 'youtube') {
    return videoInfo.thumbnail;
  }

  if (videoInfo.platform === 'vimeo') {
    try {
      const response = await fetch(videoInfo.thumbnail);
      const data = await response.json();
      return data[0]?.thumbnail_large || data[0]?.thumbnail_medium || '';
    } catch (error) {
      console.error('Failed to fetch Vimeo thumbnail:', error);
      return '';
    }
  }

  return '';
}

/**
 * Extract title from URL or metadata
 */
export function extractVideoTitle(url) {
  if (!url) return 'Video';
  
  try {
    // Try to extract from URL parameters or path
    const urlObj = new URL(url);
    const title = urlObj.searchParams.get('title') || url.split('/').pop();
    return title.substring(0, 100); // Max 100 chars
  } catch (e) {
    return url.substring(0, 100);
  }
}

/**
 * Generate unique video ID
 */
export function generateVideoId() {
  return `vid_${Date.now()}_${Math.random().toString(36).substring(2, 9)}`;
}

/**
 * Validate video array
 */
export function validateVideosArray(videos) {
  if (!Array.isArray(videos)) return [];
  
  return videos.filter(video => {
    return (
      video &&
      typeof video === 'object' &&
      video.url &&
      isValidVideoUrl(video.url) &&
      video.platform &&
      ['youtube', 'vimeo', 'other'].includes(video.platform)
    );
  });
}

/**
 * Sanitize video URL (remove tracking params, etc.)
 */
export function sanitizeVideoUrl(url) {
  if (!url) return '';
  
  try {
    const urlObj = new URL(url);
    
    // For YouTube, keep only the video ID
    if (urlObj.hostname.includes('youtube.com') || urlObj.hostname.includes('youtu.be')) {
      const videoInfo = extractVideoInfo(url);
      if (videoInfo) return videoInfo.embedUrl;
    }
    
    // For Vimeo, keep clean URL
    if (urlObj.hostname.includes('vimeo.com')) {
      const videoInfo = extractVideoInfo(url);
      if (videoInfo) return videoInfo.embedUrl;
    }
    
    return url;
  } catch (e) {
    return url;
  }
}
