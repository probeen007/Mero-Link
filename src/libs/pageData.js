import { cache as reactCache } from 'react';
import dbConnect from '@/libs/mongoClient';
import { cache, cacheKey } from '@/libs/cache';
import { Page } from '@/models/Page';
import { User } from '@/models/User';

// Plain, serialisable copy of a Page document (safe to pass to client components).
export function serializePage(page) {
  return {
    ...page,
    _id: page._id.toString(),
    links: Array.isArray(page.links) ? page.links : [],
    buttons: page.buttons || {},
    themeOverrides: page.themeOverrides || {},
    videos: (page.videos || []).map((v) => ({
      id: v?.id || (v?._id ? v._id.toString() : ''),
      title: v?.title || '',
      url: v?.url || '',
      thumbnail: v?.thumbnail || '',
      platform: v?.platform || 'other',
      videoId: v?.videoId || '',
    })),
    createdAt: page.createdAt ? new Date(page.createdAt).toISOString() : null,
    updatedAt: page.updatedAt ? new Date(page.updatedAt).toISOString() : null,
  };
}

export function serializeUser(user) {
  if (!user) return null;
  return { name: user.name || '', image: user.image || '', isVerified: !!user.isVerified };
}

// Public profile data: deduped per request (React cache) and across requests
// for 30s (in-process TTL cache, invalidated by savePage).
export const getPublicPage = reactCache(async (uri) => {
  const key = cacheKey('page-data', uri);
  const hit = cache.get(key);
  if (hit) return hit;

  await dbConnect();
  const page = await Page.findOne({ uri }).lean();
  if (!page) return null;
  const user = page.owner ? await User.findOne({ email: page.owner }).lean() : null;

  const data = { page: serializePage(page), user: serializeUser(user) };
  cache.set(key, data, 30000);
  return data;
});
