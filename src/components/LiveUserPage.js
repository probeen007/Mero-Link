"use client";

import { useState, useEffect, useRef } from "react";
import clsx from "clsx";
import dynamic from "next/dynamic";
import Image from "next/image";
import { themes } from "@/libs/themes";
import { faLocationDot, faMagic, faCheckCircle, faEnvelope, faPhone, faLink } from "@fortawesome/free-solid-svg-icons";
import {
  faDiscord, faFacebook, faGithub, faInstagram, faLinkedin, faMedium,
  faPinterest, faReddit, faSnapchat, faSoundcloud, faSpotify, faTelegram,
  faTiktok, faTumblr, faTwitch, faTwitter, faWhatsapp, faYoutube
} from "@fortawesome/free-brands-svg-icons";

// Dynamic FontAwesome to prevent SSR hydration mismatch
const FontAwesomeIcon = dynamic(
  async () => (await import("@fortawesome/react-fontawesome")).FontAwesomeIcon,
  { ssr: false }
);

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

// Shape helpers
const getShapeClasses = (shape, isProfile = false) => {
  const base = isProfile ? "w-28 h-28 sm:w-36 sm:h-36" : "w-12 h-12 sm:w-16 sm:h-16";
  switch (shape) {
    case "circle": return `${base} rounded-full`;
    case "square": return `${base} rounded-lg`;
    case "diamond": return `${base} transform rotate-45`;
    default: return `${base} rounded-full`;
  }
};

const getLinkShapeClasses = (shape) => {
  switch (shape) {
    case "rounded": return "rounded-lg";
    case "terminal": return "rounded-sm border-l-2";
    case "elegant": return "rounded-2xl";
    case "organic": return "rounded-full";
    default: return "rounded-lg";
  }
};

// Theme decorations
const getThemeDecoration = (themeName) => {
  const decorations = {
    feminine: "💖",
    nature: "🍃",
    minecraft: "⛏️",
    adventure: "🧭",
    anime: "🌸",
    cartoon: "🎈",
    gamer: "⚡",
    coder: "⌨️",
    hacker: "💀",
    elegant: "👑",
    funky: "✨",
    cosmic: "🌟",
    retro: "🕹️",
    galaxy: "🚀",
    ocean: "🌊",
    forest: "🌲",
    egyptian: "🏺",
    sakura: "🌸",
    viking: "⚔️",
    cyberpunk: "🤖",
    medieval: "🏰",
    tropical: "🏝️",
    artdeco: "💎",
  };
  return decorations[themeName] || "";
};

export default function LiveUserPage({ initialData, uri }) {
  const [pageData, setPageData] = useState(initialData);
  const [lastUpdated, setLastUpdated] = useState(initialData?.lastUpdated || "");
  const [isClient, setIsClient] = useState(false);
  const intervalRef = useRef(null);

  // Simple hydration fix
  useEffect(() => {
    setIsClient(true);
  }, []);

  // Polling updates
  useEffect(() => {
    const pollForUpdates = async () => {
      try {
  const encoded = encodeURIComponent(uri || '');
  const res = await fetch(`/api/livePageData?uri=${encoded}`, { cache: "no-cache" });
        if (!res.ok) return;
        const data = await res.json();
        if (data.lastUpdated !== lastUpdated) {
          setPageData(data);
          setLastUpdated(data.lastUpdated);
        }
      } catch (err) {
        console.error("Error polling updates:", err);
      }
    };
    intervalRef.current = setInterval(pollForUpdates, 3000);
    return () => clearInterval(intervalRef.current);
  }, [uri, lastUpdated]);

  // Simple loading state
  if (!isClient || !pageData?.page) {
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
  const shouldAdaptBackground = page?.adaptBackground || page?.bgType === "adapt";

  const getBannerStyle = () => {
    if (shouldAdaptBackground) return {};
    if (page?.bgType === "color" || page?.bgType === "adapt") return { backgroundColor: page?.bgColor || "#000" };
    return { backgroundImage: `url(${page?.bgImage || ""})` };
  };

  return (
    <>

      <div
        className={clsx("min-h-screen overflow-hidden relative text-white", theme.bgClass, theme.fontClass)}
        style={{ fontFamily: theme.fontFamily || "inherit" }}
      >
        <div className="relative z-10">
          {/* Banner */}
          <div className={clsx("h-32 sm:h-36 bg-cover bg-center relative", shouldAdaptBackground ? theme.bgClass : "")} style={getBannerStyle()} />

          {/* Avatar */}
          <div className={clsx("aspect-square mx-auto relative -top-12 sm:-top-16 -mb-8 sm:-mb-12 shadow-lg", getShapeClasses(theme?.profileShape, true), theme.imageClass)}>
            <Image
              src={user?.image || "/icon-192x192.png"}
              alt="avatar"
              width={250}
              height={250}
              className="w-full h-full object-cover rounded-full"
            />
            {getThemeDecoration(page?.theme) && (
              <div className="absolute -top-1 -right-1 sm:-top-2 sm:-right-2 text-lg sm:text-2xl bg-white bg-opacity-90 rounded-full p-1 shadow-lg animate-pulse">
                {getThemeDecoration(page?.theme)}
              </div>
            )}
          </div>

          {/* User Info */}
          <div className="mt-1 px-3 flex flex-col items-center">
            {/* Display Name + Verified */}
            <div className="w-full flex items-center justify-center max-w-sm sm:max-w-md">
              <h1
                className="flex-1 text-center text-xl sm:text-2xl md:text-3xl font-semibold leading-tight break-words select-text"
                title={page?.displayName || '@randomuser'}
              >
                {page?.displayName || '@randomuser'}
              </h1>
              {user?.isVerified && (
                <span
                  className="ml-2 inline-flex items-center justify-center shrink-0 w-6 h-6 sm:w-7 sm:h-7 rounded-full bg-gradient-to-br from-blue-500 to-blue-600 text-white ring-2 ring-offset-2 ring-offset-gray-900 ring-blue-400 shadow-md shadow-blue-500/30 animate-in fade-in zoom-in duration-300"
                  title="Verified User"
                  aria-label="Verified user"
                >
                  <FontAwesomeIcon icon={faCheckCircle} className="w-4 h-4 drop-shadow" />
                </span>
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
          </div>

          {/* Social Buttons */}
          <div className="flex gap-2 sm:gap-3 justify-center mt-4 pb-4 px-3 sm:px-4 flex-wrap">
            {page?.buttons && Object.keys(page.buttons).map((key, idx) => (
              <a
                key={key}
                href={page.buttons[key]}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open ${key} profile`}
                className={clsx(getShapeClasses(theme?.socialShape), "p-3 flex items-center justify-center shadow-md transition duration-200 hover:scale-105 focus-ring-dark", theme?.buttonClass || "bg-gray-700 text-white")}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <FontAwesomeIcon icon={buttonsIcons[key] || faLink} className="w-4 h-4 sm:w-5 sm:h-5" />
              </a>
            ))}
          </div>

          {/* Links */}
          <div className="max-w-2xl mx-auto grid gap-2 sm:gap-4 md:gap-6 md:grid-cols-2 p-3 sm:p-4 px-4 sm:px-6 overflow-hidden w-full">
            {page?.links && page.links.map((link, idx) => (
              <a
                key={idx}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open link ${link.title || idx + 1}`}
                className={clsx("flex items-center transition duration-200 p-4 shadow-md min-w-0 md:hover:scale-[1.02] focus-ring-dark", getLinkShapeClasses(theme?.linkShape), theme?.cardClass || "bg-gray-800")}
                style={{ animationDelay: `${idx * 0.1}s` }}
              >
                <div className={clsx("flex items-center justify-center bg-blue-700 mr-3 sm:mr-4", getShapeClasses(theme?.socialShape))}>
                  {link.icon ? (
                    <Image
                      src={link.icon}
                      alt="icon"
                      width={64}
                      height={64}
                      className="w-full h-full object-cover rounded-full"
                    />
                  ) : (
                    <FontAwesomeIcon icon={faLink} className="w-6 h-6 sm:w-8 sm:h-8 text-white/80" />
                  )}
                </div>
                <div className="flex-1 overflow-hidden">
                  <h3 className="text-base sm:text-lg font-medium truncate">{link.title}</h3>
                  <p className="text-white/50 text-xs sm:text-sm truncate">{link.subtitle}</p>
                </div>
              </a>
            ))}
          </div>

          {/* Footer */}
          <div className="relative flex justify-center mt-10 sm:mt-12 px-4">
            <a
              href="https://merolink.it.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-blue-600 hover:bg-blue-700 text-white py-2.5 sm:py-3 px-5 sm:px-6 rounded-full shadow-lg flex items-center space-x-2 transition-transform hover:scale-105 mb-4 text-sm sm:text-base focus-ring-dark"
            >
              <div className="bg-yellow-400 text-blue-700 p-2 rounded-full shadow-md">
                <FontAwesomeIcon icon={faMagic} className="w-4 h-4" />
              </div>
              <span className="text-sm md:text-base font-medium">Make your one</span>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}
