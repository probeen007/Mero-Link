// Social networks a profile can show as icon buttons. Single source of truth
// for the editor (labels/placeholders), the renderer (icons/hrefs) and the
// server allow-list (keys).
import {
  SiInstagram, SiFacebook, SiDiscord, SiTiktok, SiYoutube, SiX, SiGithub, SiWhatsapp,
  SiTelegram, SiReddit, SiSnapchat, SiPinterest, SiTumblr, SiTwitch, SiSpotify,
  SiSoundcloud, SiMedium, SiThreads, SiBehance, SiDribbble,
} from 'react-icons/si';
import { FaLinkedinIn } from 'react-icons/fa6';
import { PiEnvelopeSimpleBold, PiPhoneBold, PiGlobeSimpleBold } from 'react-icons/pi';

export const SOCIALS = [
  { key: 'instagram', label: 'Instagram', icon: SiInstagram, placeholder: 'https://instagram.com/yourname' },
  { key: 'tiktok', label: 'TikTok', icon: SiTiktok, placeholder: 'https://tiktok.com/@yourname' },
  { key: 'youtube', label: 'YouTube', icon: SiYoutube, placeholder: 'https://youtube.com/@yourchannel' },
  { key: 'twitter', label: 'X (Twitter)', icon: SiX, placeholder: 'https://x.com/yourname' },
  { key: 'facebook', label: 'Facebook', icon: SiFacebook, placeholder: 'https://facebook.com/yourname' },
  { key: 'linkedin', label: 'LinkedIn', icon: FaLinkedinIn, placeholder: 'https://linkedin.com/in/yourname' },
  { key: 'github', label: 'GitHub', icon: SiGithub, placeholder: 'https://github.com/yourname' },
  { key: 'threads', label: 'Threads', icon: SiThreads, placeholder: 'https://threads.net/@yourname' },
  { key: 'whatsapp', label: 'WhatsApp', icon: SiWhatsapp, placeholder: 'https://wa.me/9779800000000' },
  { key: 'telegram', label: 'Telegram', icon: SiTelegram, placeholder: 'https://t.me/yourname' },
  { key: 'discord', label: 'Discord', icon: SiDiscord, placeholder: 'https://discord.gg/invite' },
  { key: 'spotify', label: 'Spotify', icon: SiSpotify, placeholder: 'https://open.spotify.com/artist/...' },
  { key: 'soundcloud', label: 'SoundCloud', icon: SiSoundcloud, placeholder: 'https://soundcloud.com/yourname' },
  { key: 'twitch', label: 'Twitch', icon: SiTwitch, placeholder: 'https://twitch.tv/yourname' },
  { key: 'snapchat', label: 'Snapchat', icon: SiSnapchat, placeholder: 'https://snapchat.com/add/yourname' },
  { key: 'pinterest', label: 'Pinterest', icon: SiPinterest, placeholder: 'https://pinterest.com/yourname' },
  { key: 'reddit', label: 'Reddit', icon: SiReddit, placeholder: 'https://reddit.com/user/yourname' },
  { key: 'tumblr', label: 'Tumblr', icon: SiTumblr, placeholder: 'https://yourname.tumblr.com' },
  { key: 'medium', label: 'Medium', icon: SiMedium, placeholder: 'https://medium.com/@yourname' },
  { key: 'behance', label: 'Behance', icon: SiBehance, placeholder: 'https://behance.net/yourname' },
  { key: 'dribbble', label: 'Dribbble', icon: SiDribbble, placeholder: 'https://dribbble.com/yourname' },
  { key: 'website', label: 'Website', icon: PiGlobeSimpleBold, placeholder: 'https://yoursite.com' },
  { key: 'email', label: 'Email', icon: PiEnvelopeSimpleBold, placeholder: 'you@example.com', type: 'email' },
  { key: 'mobile', label: 'Phone', icon: PiPhoneBold, placeholder: '+977 98XXXXXXXX', type: 'tel' },
];

export const SOCIAL_MAP = Object.fromEntries(SOCIALS.map((s) => [s.key, s]));

export function socialHref(key, value) {
  if (key === 'email') return `mailto:${value}`;
  if (key === 'mobile') return `tel:${value.replace(/[^\d+]/g, '')}`;
  return value;
}
