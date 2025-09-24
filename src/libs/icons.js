// src/libs/icons.js
'use client';
// Centralized icon management for better tree shaking and performance

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

// Solid Icons
import {
  faEdit,
  faRightFromBracket,
  faSpinner,
  faBars,
  faTimes,
  faLink,
  faCloudArrowUp,
  faImage,
  faPalette,
  faSave,
  faMagic,
  faGripLines,
  faPlus,
  faTrash,
  faLocationDot,
  faCheckCircle,
  faEnvelope,
  faPhone,
  faArrowLeft,
  faChartLine,
  faQrcode,
  faGlobe,
  faCog,
  faGift,
  faCheckCircle as faCheck,
  faUsers,
  faRocket,
  faShareAlt,
  faShieldAlt,
  faStar
} from '@fortawesome/free-solid-svg-icons';

// Brand Icons
import {
  faGoogle,
  faDiscord,
  faFacebook,
  faGithub,
  faInstagram,
  faLinkedin,
  faMedium,
  faPinterest,
  faReddit,
  faSnapchat,
  faSoundcloud,
  faSpotify,
  faTelegram,
  faTiktok,
  faTumblr,
  faTwitch,
  faTwitter,
  faWhatsapp,
  faYoutube
} from '@fortawesome/free-brands-svg-icons';

// Regular Icons
import { faFileLines } from '@fortawesome/free-regular-svg-icons';

// Icon component with optimized rendering
export const Icon = ({ icon, className = '', ...props }) => (
  <FontAwesomeIcon icon={icon} className={className} {...props} />
);

// Exported icon constants for better tree shaking
export const icons = {
  // Solid icons
  edit: faEdit,
  logout: faRightFromBracket,
  spinner: faSpinner,
  bars: faBars,
  times: faTimes,
  link: faLink,
  upload: faCloudArrowUp,
  image: faImage,
  palette: faPalette,
  save: faSave,
  magic: faMagic,
  grip: faGripLines,
  plus: faPlus,
  trash: faTrash,
  location: faLocationDot,
  checkCircle: faCheckCircle,
  envelope: faEnvelope,
  phone: faPhone,
  arrowLeft: faArrowLeft,
  chart: faChartLine,
  qrcode: faQrcode,
  globe: faGlobe,
  cog: faCog,
  gift: faGift,
  check: faCheck,
  users: faUsers,
  rocket: faRocket,
  share: faShareAlt,
  shield: faShieldAlt,
  star: faStar,

  // Brand icons
  google: faGoogle,
  discord: faDiscord,
  facebook: faFacebook,
  github: faGithub,
  instagram: faInstagram,
  linkedin: faLinkedin,
  medium: faMedium,
  pinterest: faPinterest,
  reddit: faReddit,
  snapchat: faSnapchat,
  soundcloud: faSoundcloud,
  spotify: faSpotify,
  telegram: faTelegram,
  tiktok: faTiktok,
  tumblr: faTumblr,
  twitch: faTwitch,
  twitter: faTwitter,
  whatsapp: faWhatsapp,
  youtube: faYoutube,

  // Regular icons
  fileLines: faFileLines,
};

// Social media icon mapping for buttons
export const socialIcons = {
  email: icons.envelope,
  mobile: icons.phone,
  instagram: icons.instagram,
  facebook: icons.facebook,
  discord: icons.discord,
  tiktok: icons.tiktok,
  youtube: icons.youtube,
  twitter: icons.twitter,
  github: icons.github,
  linkedin: icons.linkedin,
  whatsapp: icons.whatsapp,
  telegram: icons.telegram,
  reddit: icons.reddit,
  snapchat: icons.snapchat,
  pinterest: icons.pinterest,
  tumblr: icons.tumblr,
  twitch: icons.twitch,
  spotify: icons.spotify,
  soundcloud: icons.soundcloud,
  medium: icons.medium,
};