import dbConnect from '@/libs/mongoClient';
import { Page } from '@/models/Page';
import { SITE_URL } from '@/libs/site';
import { logger } from '@/libs/logger';

export const revalidate = 3600;

const STATIC = [
  ['/', 1, 'weekly'],
  ['/themes', 0.9, 'monthly'],
  ['/linktree-alternative', 0.8, 'monthly'],
  ['/pricing', 0.7, 'monthly'],
  ['/about', 0.5, 'yearly'],
  ['/contact', 0.4, 'yearly'],
  ['/privacy', 0.2, 'yearly'],
  ['/terms', 0.2, 'yearly'],
];

export default async function sitemap() {
  const pages = STATIC.map(([path, priority, changeFrequency]) => ({
    url: `${SITE_URL}${path === '/' ? '' : path}`,
    changeFrequency,
    priority,
  }));

  try {
    await dbConnect();
    // Only profiles with something on them are worth indexing.
    const profiles = await Page.find({ 'links.0': { $exists: true } })
      .select('uri updatedAt').sort({ updatedAt: -1 }).limit(45000).lean();
    for (const p of profiles) {
      pages.push({ url: `${SITE_URL}/${p.uri}`, lastModified: p.updatedAt, changeFrequency: 'weekly', priority: 0.6 });
    }
  } catch (error) {
    logger.error('sitemap: could not load profiles', { error: error.message });
  }

  return pages;
}
