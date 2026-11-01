'use server';
import {authOptions} from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import { User } from "@/models/User";
import dbConnect from "@/libs/mongoClient";
import {getServerSession} from "next-auth";
import { cache, cacheKey } from "@/libs/cache";

const ALLOWED_BUTTON_KEYS = new Set([
  'email', 'mobile', 'instagram', 'facebook', 'discord', 'tiktok', 'youtube',
  'whatsapp', 'github', 'telegram', 'twitter', 'linkedin', 'snapchat',
  'pinterest', 'reddit', 'twitch', 'spotify', 'soundcloud', 'medium', 'tumblr'
]);

const ALLOWED_BG_TYPES = new Set(['color', 'image']);
const ALLOWED_LINK_STYLES = new Set(['list', 'grid', 'compact']);

function toSafeString(value, maxLength = 500) {
  return typeof value === 'string' ? value.trim().slice(0, maxLength) : '';
}

function isValidUrl(val) {
  if (!val || typeof val !== 'string') return false;
  try {
    const parsed = new URL(val);
    return parsed.protocol === 'http:' || parsed.protocol === 'https:';
  } catch {
    return false;
  }
}

export async function savePageSettings(formData) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    const dataKeys = [
      'displayName','location',
      'bio', 'bgType', 'bgColor', 'bgImage', 'adaptBackground', 'linkStyle',
    ];

    const dataToUpdate = {};
    for (const key of dataKeys) {
      if (formData.has(key)) {
        // Handle boolean conversion for adaptBackground
        if (key === 'adaptBackground') {
          dataToUpdate[key] = formData.get(key) === 'true';
        } else if (key === 'bgType') {
          const bgType = toSafeString(formData.get(key), 20);
          if (ALLOWED_BG_TYPES.has(bgType)) {
            dataToUpdate[key] = bgType;
          }
        } else if (key === 'bgColor') {
          const bgColor = toSafeString(formData.get(key), 20);
          if (/^#([0-9A-Fa-f]{3}|[0-9A-Fa-f]{6})$/.test(bgColor)) {
            dataToUpdate[key] = bgColor;
          }
        } else if (key === 'linkStyle') {
          const linkStyle = toSafeString(formData.get(key), 20);
          if (ALLOWED_LINK_STYLES.has(linkStyle)) {
            dataToUpdate[key] = linkStyle;
          }
        } else {
          dataToUpdate[key] = toSafeString(formData.get(key));
        }
      }
    }

    await Page.updateOne(
      {owner:session?.user?.email},
      dataToUpdate,
    );
    
    // Invalidate relevant caches
    const userEmail = session?.user?.email;
    cache.delete(cacheKey('sharecard:page', userEmail));
    await invalidatePageCache(userEmail);

    if (formData.has('avatar')) {
      const avatarLink = toSafeString(formData.get('avatar'));
      await User.updateOne(
        {email: session.user?.email},
        {image: avatarLink},
      );
      cache.delete(cacheKey('user', userEmail));
      cache.delete(cacheKey('sharecard:user', userEmail));
    }

    return true;
  }

  return false;
}

async function invalidatePageCache(email) {
  try {
    const pageDoc = await Page.findOne({ owner: email }).select('uri').lean();
    if (pageDoc?.uri) {
      cache.delete(cacheKey('page-data', pageDoc.uri));
      cache.delete(cacheKey('page', pageDoc.uri));
    }
  } catch (err) {
    console.error("❌ Failed to invalidate page cache:", err);
  }
}

export async function savePageButtons(formData) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    const buttonsValues = {};
    formData.forEach((value, key) => {
      if (ALLOWED_BUTTON_KEYS.has(key)) {
        const safeValue = toSafeString(value);
        if (safeValue.length > 0) {
          buttonsValues[key] = safeValue;
        }
      }
    });
    const dataToUpdate = {buttons:buttonsValues};
    await Page.updateOne(
      {owner:session?.user?.email},
      dataToUpdate,
    );
    
    // Invalidate cache after buttons update
    const userEmail = session?.user?.email;
    cache.delete(cacheKey('sharecard:page', userEmail));
    await invalidatePageCache(userEmail);
    return true;
  }
  return false;
}

export async function savePageLinks(links) {
  await dbConnect();
  const session = await getServerSession(authOptions);
  if (session) {
    const validatedLinks = [];
    if (Array.isArray(links)) {
      for (const link of links) {
        if (!link || typeof link !== 'object') continue;
        const url = toSafeString(link.url, 2048);
        if (!isValidUrl(url)) continue; // skip links with invalid urls
        
        const icon = toSafeString(link.icon, 2048);
        
        validatedLinks.push({
          key: toSafeString(link.key, 100) || `link-${Date.now()}-${Math.random().toString(36).slice(2, 9)}`,
          title: toSafeString(link.title, 100),
          subtitle: toSafeString(link.subtitle, 200),
          icon: isValidUrl(icon) ? icon : '',
          url,
        });
      }
    }

    await Page.updateOne(
      {owner:session?.user?.email},
      {links: validatedLinks},
    );
    
    // Invalidate cache after links update
    const userEmail = session?.user?.email;
    cache.delete(cacheKey('sharecard:page', userEmail));
    await invalidatePageCache(userEmail);
    return true;
  } else {
    return false;
  }
}
