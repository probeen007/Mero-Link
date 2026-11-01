'use server';
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { Page } from "@/models/Page";
import dbConnect from "@/libs/mongoClient";
import { getServerSession } from "next-auth";

// Anything that is (or may become) a top-level route can't be a username.
const RESERVED_USERNAMES = new Set([
  'api', 'account', 'analytics', 'appearance', 'settings', 'login', 'logout', 'register', 'signup',
  'pricing', 'about', 'contact', 'themes', 'linktree-alternative', 'privacy', 'terms', 'legal',
  'docs', 'blog', 'help', 'support', 'status', 'public', 'static', 'assets', 'images', 'admin',
  'dashboard', 'custom-qr', 'merolink', 'mero-link', 'opengraph-image', 'sitemap', 'robots', 'manifest',
]);

const USERNAME_REGEX = /^[a-zA-Z0-9_-]{3,30}$/;

function validate(username) {
  if (!USERNAME_REGEX.test(username)) return 'Use 3 to 30 letters, numbers, dashes or underscores.';
  if (RESERVED_USERNAMES.has(username.toLowerCase())) return 'That name is reserved. Try another.';
  return null;
}

export async function checkUsername(raw) {
  const username = String(raw || '').trim();
  const problem = validate(username);
  if (problem) return { available: false, message: problem };
  await dbConnect();
  const taken = await Page.exists({ uri: new RegExp(`^${username}$`, 'i') });
  return taken ? { available: false, message: 'Already taken.' } : { available: true };
}

export default async function grabUsername(formData) {
  const username = String(formData.get('username') || '').trim();
  const problem = validate(username);
  if (problem) return { success: false, message: problem };

  const session = await getServerSession(authOptions);
  if (!session?.user?.email) return { success: false, message: 'Please sign in first.' };

  await dbConnect();
  if (await Page.exists({ owner: session.user.email })) return { success: true };
  if (await Page.exists({ uri: new RegExp(`^${username}$`, 'i') })) {
    return { success: false, message: 'Already taken.' };
  }

  try {
    const page = await Page.create({ uri: username, owner: session.user.email, displayName: session.user.name || '' });
    return { success: true, uri: page.uri };
  } catch {
    // Unique index race: someone grabbed it a moment ago.
    return { success: false, message: 'Already taken.' };
  }
}
