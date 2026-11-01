import { SITE_NAME } from '@/libs/site';

// Page metadata with matching canonical, Open Graph and Twitter fields.
// A page-level `openGraph` replaces the root one, so siteName/locale are repeated.
export function pageMeta({ title, description, path, absolute = false }) {
  const full = absolute ? title : `${title} | ${SITE_NAME}`;
  return {
    title: absolute ? { absolute: title } : title,
    description,
    alternates: { canonical: path },
    openGraph: { type: 'website', siteName: SITE_NAME, locale: 'en_US', url: path, title: full, description },
    twitter: { card: 'summary_large_image', title: full, description },
  };
}
