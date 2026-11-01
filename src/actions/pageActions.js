'use server';
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import dbConnect from "@/libs/mongoClient";
import { cache, cacheKey } from "@/libs/cache";
import { THEMES, BUTTON_STYLES, RADII, GRADIENTS, BG_MODES } from "@/libs/themes";
import { FONT_CHOICES } from "@/libs/fontChoices";
import { SOCIAL_MAP } from "@/libs/socials";
import { extractVideoInfo, sanitizeVideoUrl, generateVideoId } from "@/libs/videoExtractor";

const HEX = /^#([0-9a-f]{3}|[0-9a-f]{6})$/i;
const str = (v, max = 500) => (typeof v === 'string' ? v.trim().slice(0, max) : '');

function httpUrl(v) {
  const s = str(v, 2048);
  try {
    const u = new URL(s);
    return u.protocol === 'http:' || u.protocol === 'https:' ? s : '';
  } catch {
    return '';
  }
}

function cleanButtons(input) {
  const out = {};
  for (const [key, raw] of Object.entries(input || {})) {
    if (!SOCIAL_MAP[key]) continue;
    const value = key === 'email' ? (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(str(raw, 254)) ? str(raw, 254) : '')
      : key === 'mobile' ? str(raw, 30).replace(/[^\d+\s()-]/g, '')
      : httpUrl(raw);
    if (value) out[key] = value;
  }
  return out;
}

function cleanLinks(input) {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 100).flatMap((l) => {
    if (!l || typeof l !== 'object') return [];
    const key = str(l.key, 100) || `link-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`;
    const hidden = !!l.hidden;
    if (l.type === 'header') {
      return [{ key, type: 'header', title: str(l.title, 80), hidden }];
    }
    // Half-typed URLs are kept so autosave never drops what the user typed;
    // ProfileView only renders links whose URL is a real http(s) URL.
    return [{
      key,
      type: 'link',
      title: str(l.title, 100),
      subtitle: str(l.subtitle, 200),
      icon: httpUrl(l.icon),
      url: httpUrl(l.url) || str(l.url, 2048),
      featured: !!l.featured,
      hidden,
    }];
  });
}

function cleanVideos(input) {
  if (!Array.isArray(input)) return [];
  return input.slice(0, 10).flatMap((v, i) => {
    const info = v?.url && extractVideoInfo(v.url);
    if (!info) return [];
    return [{
      id: str(v.id, 60) || generateVideoId(),
      title: str(v.title, 120),
      url: sanitizeVideoUrl(v.url),
      platform: info.platform,
      videoId: info.videoId,
      // Vimeo's `info.thumbnail` is a JSON API URL, so only YouTube's is usable as-is.
      thumbnail: (!v.thumbnail?.endsWith('.json') && httpUrl(v.thumbnail)) || (info.platform === 'youtube' ? info.thumbnail : ''),
      order: i,
    }];
  });
}

function cleanOverrides(o = {}) {
  const out = {};
  if (HEX.test(o.accent || '')) out.accent = o.accent;
  if (BUTTON_STYLES[o.button]) out.button = o.button;
  if (o.radius in RADII) out.radius = o.radius;
  if (FONT_CHOICES[o.font]) out.font = o.font;
  if (GRADIENTS[o.gradient]) out.gradient = o.gradient;
  return out;
}

// Each key maps to a sanitiser; keys not listed here are ignored.
const FIELDS = {
  displayName: (v) => str(v, 60),
  location: (v) => str(v, 60),
  bio: (v) => str(v, 300),
  theme: (v) => (THEMES[v] ? v : undefined),
  themeOverrides: cleanOverrides,
  bgMode: (v) => (BG_MODES.includes(v) ? v : undefined),
  bgColor: (v) => (HEX.test(v || '') ? v : undefined),
  bgImage: (v) => httpUrl(v),
  linkStyle: (v) => (['list', 'grid', 'compact'].includes(v) ? v : undefined),
  videoPosition: (v) => (v === 'after' ? 'after' : 'before'),
  buttons: cleanButtons,
  links: cleanLinks,
  videos: cleanVideos,
};

// Saves any subset of the editable profile. Used by the dashboard autosave.
export async function savePage(patch) {
  const session = await getServerSession(authOptions);
  const email = session?.user?.email;
  if (!email || !patch || typeof patch !== 'object') return { ok: false };

  await dbConnect();
  const update = {};
  for (const [key, clean] of Object.entries(FIELDS)) {
    if (!(key in patch)) continue;
    const value = clean(patch[key]);
    if (value !== undefined) update[key] = value;
  }

  const page = await Page.findOneAndUpdate({ owner: email }, { $set: update }, { new: true })
    .select('uri links videos').lean();
  if (!page) return { ok: false };

  if ('avatar' in patch) {
    await User.updateOne({ email }, { image: httpUrl(patch.avatar) });
    cache.delete(cacheKey('sharecard:user', email));
  }

  cache.delete(cacheKey('page-data', page.uri));
  cache.delete(cacheKey('sharecard:page', email));

  // Return server-normalised collections so the editor can adopt video ids/thumbnails.
  return { ok: true, videos: 'videos' in update ? update.videos : undefined };
}
