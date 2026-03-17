// src/libs/structuredData.js
// Generate structured data (JSON-LD) for better SEO

export function generatePersonStructuredData(page, user) {
  const displayName = page.displayName || user?.name || page.uri;
  const bio = page.bio || '';
  const avatar = page.avatar || user?.image || '';
  const location = page.location || '';

  // Build social media URLs from links
  const socialUrls = page.links
    ?.filter(link => link.url && isSocialMediaUrl(link.url))
    .map(link => link.url) || [];

  return {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": displayName,
    "description": bio,
    "url": `https://merolink.it.com/${page.uri}`,
    ...(avatar && { "image": avatar }),
    ...(location && { "address": { "@type": "PostalAddress", "addressLocality": location } }),
    ...(socialUrls.length && { "sameAs": socialUrls }),
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": `https://merolink.it.com/${page.uri}`
    },
    "publisher": {
      "@type": "Organization",
      "name": "Mero Link",
      "url": "https://merolink.it.com"
    }
  };
}

export function generateWebPageStructuredData(page, user) {
  const displayName = page.displayName || user?.name || page.uri;
  const bio = page.bio || '';

  return {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${displayName} - Mero Link`,
    "description": bio,
    "url": `https://merolink.it.com/${page.uri}`,
    "mainEntity": generatePersonStructuredData(page, user),
    "isPartOf": {
      "@type": "WebSite",
      "name": "Mero Link",
      "url": "https://merolink.it.com"
    }
  };
}

export function generateOrganizationStructuredData() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Mero Link",
    "description": "Unify your online presence with Mero Link! Create personalized link trees for your social profiles and websites.",
    "url": "https://merolink.it.com",
    "logo": "https://merolink.it.com/logo.png",
    "sameAs": [
      "https://github.com/probeen007/Mero-Link"
    ],
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "customer service",
      "email": "support@merolink.it.com"
    }
  };
}

function isSocialMediaUrl(url) {
  const socialDomains = [
    'facebook.com', 'twitter.com', 'instagram.com', 'linkedin.com',
    'youtube.com', 'tiktok.com', 'snapchat.com', 'pinterest.com',
    'github.com', 'behance.net', 'dribbble.com', 'medium.com'
  ];
  
  try {
    const domain = new URL(url).hostname.replace('www.', '');
    return socialDomains.some(socialDomain => domain.includes(socialDomain));
  } catch {
    return false;
  }
}
