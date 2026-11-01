import { notFound } from 'next/navigation';
import { after } from 'next/server';
import ProfileView from '@/components/profile/ProfileView';
import ClickTracker from '@/components/profile/ClickTracker';
import JsonLd from '@/components/JsonLd';
import { getPublicPage } from '@/libs/pageData';
import { profilePageLd } from '@/libs/structuredData';
import { resolveTheme } from '@/libs/themes';
import { Event } from '@/models/Event';
import { logger } from '@/libs/logger';
import { SITE_URL } from '@/libs/site';

export async function generateMetadata({ params }) {
  const { uri } = await params;
  const data = await getPublicPage(uri);
  if (!data) return { title: 'Profile not found', robots: { index: false } };

  const { page, user } = data;
  const name = page.displayName || user?.name || uri;
  const description = (page.bio || `${name}'s links, socials and videos in one place.`).slice(0, 158);
  const url = `${SITE_URL}/${uri}`;

  return {
    title: `${name} (@${uri})`,
    description,
    alternates: { canonical: url },
    openGraph: { type: 'profile', url, title: `${name} on Mero Link`, description, username: uri },
    twitter: { card: 'summary_large_image', title: `${name} on Mero Link`, description },
  };
}

export async function generateViewport({ params }) {
  const { uri } = await params;
  const data = await getPublicPage(uri);
  const { theme } = resolveTheme(data?.page);
  return { themeColor: theme.bg.startsWith('#') ? theme.bg : theme.dark ? '#0C0C10' : '#F7F7F5' };
}

export default async function ProfilePage({ params }) {
  const { uri } = await params;
  const data = await getPublicPage(uri);
  if (!data) notFound();

  after(() =>
    Event.create({ uri, page: uri, type: 'view' }).catch((error) =>
      logger.error('Failed to log view event', { uri, error: error.message }),
    ),
  );

  return (
    <>
      <JsonLd data={profilePageLd(data.page, data.user)} />
      <ProfileView page={data.page} user={data.user} uri={uri} />
      <ClickTracker uri={uri} />
    </>
  );
}
