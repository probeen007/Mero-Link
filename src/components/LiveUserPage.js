"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import Image from "next/image";
import { motion, MotionConfig, AnimatePresence } from "framer-motion";
import VideoCarousel from "@/components/VideoCarousel";
import ThemeDecorations from "@/components/theme/ThemeDecorations";
import SectionDivider from "@/components/theme/SectionDivider";
import { themes } from "@/libs/themes";
import { getShapeStyle } from "@/libs/shapeStyles";
import { getLayoutArchetype } from "@/libs/layoutArchetypes";
import { faLocationDot, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faMedium,
  faPinterest, faReddit, faSnapchat, faSoundcloud, faSpotify, faTelegram,
  faTiktok, faTumblr, faTwitch, faTwitter, faWhatsapp, faYoutube
} from "@fortawesome/free-brands-svg-icons";
import { faEnvelope, faPhone } from "@fortawesome/free-solid-svg-icons";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// Social icons mapping
export const buttonsIcons = {
  email: faEnvelope,
  mobile: faPhone,
  instagram: faInstagram,
  facebook: faFacebook,
  discord: faDiscord,
  tiktok: faTiktok,
  youtube: faYoutube,
  twitter: faTwitter,
  github: faGithub,
  linkedin: faLinkedin,
  whatsapp: faWhatsapp,
  telegram: faTelegram,
  reddit: faReddit,
  snapchat: faSnapchat,
  pinterest: faPinterest,
  tumblr: faTumblr,
  twitch: faTwitch,
  spotify: faSpotify,
  soundcloud: faSoundcloud,
  medium: faMedium,
  website: faLink,
};

// Link section item recipes per `linkStyle` (list/grid/compact) — complete
// literal Tailwind strings so Tailwind's JIT scan always finds them.
const LINK_ITEM_STYLES = {
  list: { itemPad: 'p-3.5', iconSize: 44, gridColsClass: '' },
  grid: { itemPad: 'p-3 flex-col justify-center text-center', iconSize: 40, gridColsClass: 'grid-cols-2 sm:grid-cols-3' },
  compact: { itemPad: 'p-2.5', iconSize: 32, gridColsClass: 'grid-cols-1' },
};

// `list` defers its column count to the active layout archetype (so a
// theme's personality still shows through); `grid`/`compact` are an explicit
// user override and win outright.
function getLinkLayoutConfig(linkStyle, archetype) {
  const style = LINK_ITEM_STYLES[linkStyle] || LINK_ITEM_STYLES.list;
  const gridColsClass = (linkStyle === 'grid' || linkStyle === 'compact')
    ? style.gridColsClass
    : archetype.linksCols;
  return { ...style, gridClass: clsx('grid', gridColsClass, archetype.linksGap) };
}

// Framer-motion variants as module-level constants with a constant `animate`
// target (not toggled by poll-driven state) — a 10s poll refresh (see
// pollForUpdates below) updates existing motion instances in place instead
// of replaying entrance animations mid-scroll. Deliberately never dip
// opacity to 0: a screenshot/crawler/slow-hydration moment caught before
// the transition finishes must never show the page as blank or washed out.
const fadeUpVariants = {
  hidden: { opacity: 1, y: 16 },
  visible: { opacity: 1, y: 0 },
};

const avatarVariants = {
  hidden: { opacity: 1, scale: 0.92 },
  visible: { opacity: 1, scale: 1 },
};

export default function LiveUserPage({ initialData, uri }) {
  const [pageData, setPageData] = useState(initialData);
  const lastUpdatedRef = useRef(initialData?.lastUpdated || "");
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef(null);

  // Simple hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Hide the native scrollbar and stop rubber-band overscroll from revealing
  // the app shell's background past the page edges — scoped to this page via
  // a toggled class (see .mero-live-page in globals.css) so it doesn't leak
  // into the dashboard/marketing routes.
  useEffect(() => {
    document.documentElement.classList.add('mero-live-page');
    return () => {
      document.documentElement.classList.remove('mero-live-page');
    };
  }, []);

  // Polling updates
  useEffect(() => {
    const pollForUpdates = async () => {
      try {
        const encoded = encodeURIComponent(uri || '');
        const res = await fetch(`/api/livePageData?uri=${encoded}`, { cache: "no-cache" });
        if (!res.ok) return;
        const data = await res.json();
        if (data.lastUpdated !== lastUpdatedRef.current) {
          setPageData(data);
          lastUpdatedRef.current = data.lastUpdated;
        }
      } catch (err) {
        console.error("Error polling updates:", err);
      }
    };
    intervalRef.current = setInterval(pollForUpdates, 10000);
    return () => clearInterval(intervalRef.current);
  }, [uri]);

  // Simple loading state
  if (!pageData?.page) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-white text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    );
  }

  const { page, user } = pageData;
  const theme = themes[page?.theme] || themes["default"];
  const archetype = getLayoutArchetype(theme.layout);
  const shouldAdaptBackground = page?.adaptBackground || page?.bgType === "adapt";
  const hasVideos = Array.isArray(page?.videos) && page.videos.length > 0;
  const showVideosBeforeLinks = (page?.videoPosition || 'before') === 'before';
  const isLightTheme = page?.theme === 'light' || String(theme?.fontClass || '').includes('text-gray');
  const videoDividerClass = isLightTheme
    ? 'from-transparent via-gray-500/60 to-transparent'
    : 'from-transparent via-white/45 to-transparent';
  const videoLabelClass = isLightTheme
    ? 'text-gray-700/90 bg-white/40 border-gray-500/30'
    : 'text-white/85 bg-white/10 border-white/20';

  const linkLayout = getLinkLayoutConfig(page?.linkStyle, archetype);
  const avatarShape = getShapeStyle(theme?.profileShape, 'profile');
  const socialShape = getShapeStyle(theme?.socialShape, 'social');
  const thumbnailShape = getShapeStyle(theme?.socialShape, 'thumbnail');
  const displayFontStyle = theme.fontVar
    ? { fontFamily: `var(${theme.fontVar})`, fontWeight: theme.displayFontWeight || undefined }
    : {};

  const videoSection = hasVideos ? (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 mt-6 mb-7 sm:mt-8 sm:mb-9">
      <div className={`h-px w-full bg-gradient-to-r ${videoDividerClass}`} />
      <div className="py-3 sm:py-4">
        <div className={`mx-auto w-fit mb-3 px-2.5 py-1 rounded-full border text-[10px] sm:text-xs tracking-[0.18em] uppercase backdrop-blur-sm ${videoLabelClass}`}>
          Videos
        </div>
        <VideoCarousel videos={page.videos} />
      </div>
      <div className={`h-px w-full bg-gradient-to-r ${videoDividerClass}`} />
    </div>
  ) : null;

  const getBannerStyle = () => {
    if (shouldAdaptBackground) return {};
    if (page?.bgType === "color" || page?.bgType === "adapt") return { backgroundColor: page?.bgColor || "#000" };
    return { backgroundImage: `url(${page?.bgImage || ""})` };
  };

  const getPageBackgroundStyle = () => {
    if (shouldAdaptBackground) return {};
    if (page?.bgType === "color") return { backgroundColor: page?.bgColor || "#000" };
    if (page?.bgType === "image") {
      return {
        backgroundImage: `url(${page?.bgImage || ""})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      };
    }
    return {};
  };

  return (
    <MotionConfig reducedMotion="user">
      <div
        className={clsx("min-h-screen w-full relative text-white pb-12", theme.fontClass)}
      >
        {/* Full-height background layer for rich animations and gradients.
            Absolutely positioned (not fixed) so it spans the whole scrollable
            page — a fixed/viewport-pinned layer only paints within the
            original viewport in a full-page screenshot, leaving everything
            below the fold showing the plain page background. The inner layer
            is keyed by the effective background identity and cross-fades via
            AnimatePresence, so switching themes (from the dashboard, picked
            up here through the 10s live poll) blends smoothly instead of
            snapping — background gradients can't be CSS-transitioned between
            different theme classes, so this is done as an opacity crossfade
            between the outgoing and incoming layers instead. */}
        <div className="absolute inset-0 z-0 overflow-hidden select-none pointer-events-none">
          <AnimatePresence mode="sync">
            <motion.div
              key={shouldAdaptBackground ? `theme-${page?.theme}` : `manual-${page?.bgType}-${page?.bgColor || ''}-${page?.bgImage || ''}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.6, ease: 'easeInOut' }}
              className={clsx("bg-cover bg-center", shouldAdaptBackground ? theme.bgClass : "")}
              style={{ position: 'absolute', inset: 0, ...getPageBackgroundStyle() }}
            >
              {shouldAdaptBackground && <ThemeDecorations themeKey={page?.theme} />}
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="relative z-10">
          {/* Banner — left fully transparent when adapting to the theme so
              the single full-page background layer shows through with no
              seam; it only ever gets its own fill for an explicit color/image. */}
          <div className="h-32 sm:h-36 bg-cover bg-center" style={getBannerStyle()} />

          {/* Avatar */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={avatarVariants}
            transition={{ type: 'spring', stiffness: archetype.entrance.stiffness, damping: archetype.entrance.damping }}
            className={clsx("aspect-square mx-auto relative -top-12 sm:-top-16 -mb-8 sm:-mb-12 shadow-lg", avatarShape.className, archetype.avatarFrameClass, theme.imageClass)}
            style={avatarShape.style}
          >
            <motion.div
              className="w-full h-full"
              animate={archetype.idle ? archetype.idle.keyframes : undefined}
              transition={archetype.idle ? { duration: archetype.idle.duration, repeat: Infinity, ease: 'easeInOut' } : undefined}
            >
              <Image
                src={user?.image || "/icon-192x192.png"}
                alt="avatar"
                width={250}
                height={250}
                className="w-full h-full object-cover"
              />
            </motion.div>
          </motion.div>

          {/* User Info */}
          <motion.div
            initial="hidden"
            animate="visible"
            variants={fadeUpVariants}
            transition={{ duration: 0.5, delay: 0.05 }}
            className="mt-1 px-3 flex flex-col items-center"
          >
            {/* Display Name + Verified */}
            <div className="flex items-center justify-center gap-2 max-w-sm sm:max-w-md w-full">
              <h1
                className="text-center text-xl sm:text-2xl md:text-3xl leading-tight break-words select-text"
                style={displayFontStyle}
                title={page?.displayName || '@randomuser'}
              >
                {page?.displayName || '@randomuser'}
              </h1>
              {user?.isVerified && (
                <svg className="w-5 h-5 sm:w-6 sm:h-6 shrink-0 drop-shadow-[0_2px_8px_rgba(245,158,11,0.2)]" viewBox="0 0 24 24" fill="none" title="Verified User" aria-label="Verified user">
                  <defs>
                    <linearGradient id="verifiedGold" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#fbbf24" />
                      <stop offset="50%" stopColor="#f59e0b" />
                      <stop offset="100%" stopColor="#b45309" />
                    </linearGradient>
                  </defs>
                  <path
                    d="M12 2l2.4 1.8 3-.2.8 2.9 2.9.8-.2 3 1.8 2.4-1.8 2.4.2 3-2.9.8-.8 2.9-3-.2-2.4 1.8-2.4-1.8-3 .2-.8-2.9-2.9-.8.2-3-1.8-2.4 1.8-2.4-.2-3 2.9-.8.8-2.9 3 .2L12 2z"
                    fill="url(#verifiedGold)"
                  />
                  <path
                    d="M9 12l2 2 4-4"
                    stroke="white"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              )}
            </div>

            {/* Location */}
            <div className="mt-1 flex items-center gap-1.5 text-[0.72rem] sm:text-sm text-white/70">
              <FontAwesomeIcon icon={faLocationDot} className="h-3 w-3 opacity-80" />
              <span className="truncate max-w-[220px] sm:max-w-none" title={page?.location || 'Unknown location'}>
                {page?.location || 'Unknown location'}
              </span>
            </div>

            {/* Bio */}
            <p className="mt-2 text-center px-4 sm:px-8 max-w-md mx-auto text-[0.78rem] sm:text-base leading-relaxed text-white/85 break-words">
              {page?.bio || 'Bio...'}
            </p>
          </motion.div>

          <div className={archetype.sectionSpacing}>
            <SectionDivider variant={archetype.dividerVariant} isLight={isLightTheme} />
          </div>

          {/* Social Buttons */}
          <div className="flex gap-2 sm:gap-3 justify-center mt-4 pb-4 px-3 sm:px-4 flex-wrap">
            {page?.buttons && Object.keys(page.buttons).map((key, idx) => (
              <motion.a
                key={key}
                href={page.buttons[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${key} profile`}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                transition={{ duration: 0.4, delay: idx * archetype.entrance.stagger }}
                whileHover={{ scale: 1.12, y: -2 }}
                whileTap={{ scale: 0.94 }}
                className={clsx(
                  "flex items-center justify-center shadow-md focus-ring-dark",
                  socialShape.className,
                  theme?.buttonClass || "bg-gray-700 text-white"
                )}
                style={{ width: 36, height: 36, minWidth: 36, ...socialShape.style }}
              >
                <FontAwesomeIcon
                  icon={buttonsIcons[key] || faLink}
                  style={{ width: 18, height: 18 }}
                />
              </motion.a>
            ))}
          </div>

          {/* Videos Section */}
          {hasVideos && showVideosBeforeLinks && (
            videoSection
          )}

          {/* Links */}
          <div className={clsx("max-w-2xl mx-auto p-3 sm:p-4 px-4 sm:px-6 overflow-hidden w-full", linkLayout.gridClass)}>
            {page?.links && page.links.map((link, idx) => (
              <motion.a
                key={link.key || idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open link ${link.title || idx + 1}`}
                initial="hidden"
                animate="visible"
                variants={fadeUpVariants}
                transition={{ duration: 0.45, delay: idx * archetype.entrance.stagger }}
                whileHover={{ scale: 1.02, y: -3 }}
                whileTap={{ scale: 0.98 }}
                className={clsx("flex items-center shadow-md min-w-0 focus-ring-dark", linkLayout.itemPad, theme?.cardClass || "bg-gray-800")}
              >
                <div
                  className={clsx("bg-blue-700 flex items-center justify-center shrink-0 overflow-hidden", linkLayout.itemPad.includes('flex-col') ? 'mb-2' : 'mr-3 sm:mr-4')}
                  style={{
                    width: linkLayout.iconSize,
                    height: linkLayout.iconSize,
                    minWidth: linkLayout.iconSize,
                    ...thumbnailShape.style,
                  }}
                >
                  {link.icon ? (
                    <Image
                      src={link.icon}
                      alt="icon"
                      width={linkLayout.iconSize}
                      height={linkLayout.iconSize}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <FontAwesomeIcon
                      icon={faLink}
                      style={{ width: 20, height: 20, opacity: 0.85 }}
                    />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-base sm:text-lg font-medium truncate">{link.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm truncate">{link.subtitle}</p>
                </div>
              </motion.a>
            ))}
          </div>

          {/* Videos Section */}
          {hasVideos && !showVideosBeforeLinks && (
            videoSection
          )}

          {/* Footer */}
          <div className="relative flex justify-center mt-12 sm:mt-16 pb-8 px-4">
            <a
              href="https://merolink.me"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-full bg-white/10 hover:bg-white/15 border border-white/10 text-white/60 hover:text-white/80 transition-all duration-200 text-[11px] sm:text-xs font-medium tracking-wide backdrop-blur-sm select-none shadow-sm"
            >
              <span>Powered by</span>
              <span className="font-bold text-white">Mero Link</span>
            </a>
          </div>
        </div>
      </div>
    </MotionConfig>
  );
}
