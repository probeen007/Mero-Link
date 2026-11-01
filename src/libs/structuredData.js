// JSON-LD builders. Rendered with <JsonLd data={...} /> from components/JsonLd.
import { SITE_URL, SITE_NAME, SITE_DESCRIPTION, CONTACT_EMAIL } from '@/libs/site';

export function profilePageLd(page, user) {
  const url = `${SITE_URL}/${page.uri}`;
  const sameAs = Object.entries(page.buttons || {})
    .filter(([k, v]) => !['email', 'mobile'].includes(k) && /^https?:\/\//.test(v || ''))
    .map(([, v]) => v);

  return {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    url,
    name: `${page.displayName || page.uri} | ${SITE_NAME}`,
    ...(page.createdAt && { dateCreated: new Date(page.createdAt).toISOString() }),
    ...(page.updatedAt && { dateModified: new Date(page.updatedAt).toISOString() }),
    mainEntity: {
      '@type': 'Person',
      name: page.displayName || user?.name || page.uri,
      alternateName: `@${page.uri}`,
      identifier: page.uri,
      ...(page.bio && { description: page.bio }),
      ...(user?.image && { image: user.image }),
      ...(page.location && { homeLocation: { '@type': 'Place', name: page.location } }),
      ...(sameAs.length > 0 && { sameAs }),
    },
  };
}

export const organizationLd = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${SITE_URL}/#org`,
      name: SITE_NAME,
      url: SITE_URL,
      logo: `${SITE_URL}/icon-512x512.png`,
      email: CONTACT_EMAIL,
      sameAs: ['https://www.linkedin.com/company/merolink/'],
    },
    {
      '@type': 'WebSite',
      '@id': `${SITE_URL}/#website`,
      name: SITE_NAME,
      url: SITE_URL,
      publisher: { '@id': `${SITE_URL}/#org` },
    },
  ],
};

export const softwareLd = {
  '@context': 'https://schema.org',
  '@type': 'SoftwareApplication',
  name: SITE_NAME,
  applicationCategory: 'SocialNetworkingApplication',
  operatingSystem: 'Web',
  url: SITE_URL,
  description: SITE_DESCRIPTION,
  offers: { '@type': 'Offer', price: '0', priceCurrency: 'USD' },
};

export function faqLd(items) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map(({ q, a }) => ({
      '@type': 'Question',
      name: q,
      acceptedAnswer: { '@type': 'Answer', text: a },
    })),
  };
}

export function breadcrumbLd(name, path) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: SITE_URL },
      { '@type': 'ListItem', position: 2, name, item: `${SITE_URL}${path}` },
    ],
  };
}
