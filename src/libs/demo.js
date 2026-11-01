// Sample profiles used by the marketing site to show real renders of themes.
const unsplash = (id) => `https://images.unsplash.com/${id}?auto=format&fit=crop&w=240&h=240&q=80`;

export const DEMO_PROFILES = [
  {
    uri: 'aarya',
    theme: 'sticker',
    user: { image: unsplash('photo-1534528741775-53994a69daeb'), isVerified: true },
    page: {
      displayName: 'Aarya Shrestha',
      location: 'Kathmandu',
      bio: 'Illustrator. Drawing tea shops, temples and the people in between.',
      buttons: { instagram: 'https://instagram.com', tiktok: 'https://tiktok.com', behance: 'https://behance.net' },
      links: [
        { key: 'a1', title: 'Print shop', subtitle: 'A3 and A4 risograph prints', url: 'https://example.com/shop', featured: true },
        { key: 'a2', title: 'Commission me', url: 'https://example.com/commissions' },
        { key: 'a3', title: 'Patan sketchbook zine', url: 'https://example.com/zine' },
      ],
    },
  },
  {
    uri: 'rohanbeats',
    theme: 'synthwave',
    user: { image: unsplash('photo-1507003211169-0a1dd7228f2d') },
    page: {
      displayName: 'Rohan Thapa',
      location: 'Pokhara',
      bio: 'Lo-fi and synth producer. New EP every full moon.',
      buttons: { spotify: 'https://spotify.com', youtube: 'https://youtube.com', soundcloud: 'https://soundcloud.com' },
      links: [
        { key: 'r1', title: 'Phewa Nights EP', subtitle: 'Out now on all platforms', url: 'https://example.com/ep', featured: true },
        { key: 'r2', title: 'Sample pack vol. 2', url: 'https://example.com/pack' },
        { key: 'r3', title: 'Book a live set', url: 'https://example.com/book' },
      ],
    },
  },
  {
    uri: 'mira.clay',
    theme: 'botanical',
    user: { image: unsplash('photo-1494790108377-be9c29b29330') },
    page: {
      displayName: 'Mira Gurung',
      location: 'Bhaktapur',
      bio: 'Hand-thrown ceramics from a tiny studio near Durbar Square.',
      buttons: { instagram: 'https://instagram.com', facebook: 'https://facebook.com', whatsapp: 'https://wa.me/1' },
      links: [
        { key: 'm1', title: 'Shop the new mugs', url: 'https://example.com/mugs', featured: true },
        { key: 'm2', title: 'Saturday pottery class', subtitle: '6 seats per class', url: 'https://example.com/class' },
        { key: 'm3', title: 'Wholesale enquiries', url: 'https://example.com/wholesale' },
      ],
    },
  },
  {
    uri: 'kabir',
    theme: 'terminal',
    user: { image: unsplash('photo-1500648767791-00dcc994a43e') },
    page: {
      displayName: 'Kabir Joshi',
      location: 'Lalitpur',
      bio: 'Full-stack dev. I write about shipping small, fast web apps.',
      buttons: { github: 'https://github.com', linkedin: 'https://linkedin.com', twitter: 'https://x.com' },
      links: [
        { key: 'k1', title: 'Blog', url: 'https://example.com/blog' },
        { key: 'k2', title: 'Hire me for a project', url: 'https://example.com/hire', featured: true },
        { key: 'k3', title: 'Open source work', url: 'https://example.com/oss' },
      ],
    },
  },
];

// A profile in the given theme, using one of the sample people.
export function demoFor(themeKey, index = 0) {
  const d = DEMO_PROFILES[index % DEMO_PROFILES.length];
  return { page: { ...d.page, uri: d.uri, theme: themeKey, bgMode: 'theme', linkStyle: 'list' }, user: d.user, uri: d.uri };
}
