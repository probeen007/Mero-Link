"use client";

import { forwardRef } from "react";
import { themes } from "@/libs/themes";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { socialIcons } from "@/libs/icons";

// Static inline backgrounds map — replaces CSS class-based theme backgrounds.
// html2canvas cannot capture ::before / ::after pseudo-elements used by animated
// theme classes, so these inline gradients guarantee a clean, correct PNG export.
const CARD_BG = {
  default:   "#0f172a",
  aurora:    "linear-gradient(-45deg, #1e3c72, #2a5298, #0f2027, #203a43)",
  neon:      "radial-gradient(circle at 50% 50%, #0f0c29, #302b63, #24243e)",
  light:     "linear-gradient(135deg, #2563eb 0%, #4f46e5 100%)",
  starfield: "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
  gamer:     "linear-gradient(45deg, #0a0a0a, #1a0033, #330066, #660099)",
  coder:     "linear-gradient(135deg, #001100 0%, #003300 100%)",
  hacker:    "radial-gradient(circle at center, #1a0000, #000000)",
  elegant:   "linear-gradient(135deg, #1a1a2e, #16213e, #0f3460)",
  funky:     "linear-gradient(45deg, #ff6b6b 0%, #feca57 25%, #48dbfb 50%, #ff9ff3 75%, #5f27cd 100%)",
  feminine:  "linear-gradient(135deg, #d63384 0%, #e83e8c 30%, #c2185b 60%, #ad1457 100%)",
  retro:     "linear-gradient(180deg, #2d1b69 0%, #11998e 100%)",
  nature:    "linear-gradient(135deg, #1e3c14 0%, #2d5016 30%, #56ab2f 60%, #1a6b3a 100%)",
  corporate: "linear-gradient(135deg, #1e293b 0%, #334155 50%, #475569 100%)",
  cosmic:    "radial-gradient(ellipse at bottom, #1b2735 0%, #090a0f 100%)",
  nepal:     "linear-gradient(135deg, #1a1a2e 0%, #16213e 30%, #0f3460 60%, #e94560 100%)",
  minecraft: "linear-gradient(135deg, #1a3d10 0%, #2e5f28 50%, #4a7c59 100%)",
  adventure: "linear-gradient(135deg, #1a2f1a 0%, #2c5530 50%, #3d6b3d 100%)",
  anime:     "linear-gradient(135deg, #1e1b4b 0%, #312e81 25%, #4c1d95 50%, #1e40af 75%, #0f172a 100%)",
  cartoon:   "linear-gradient(135deg, #1e40af 0%, #7c3aed 50%, #ec4899 100%)",
  galaxy:    "linear-gradient(135deg, #0f0c29 0%, #302b63 40%, #24243e 100%)",
  ocean:     "linear-gradient(180deg, #0369a1 0%, #0284c7 30%, #0891b2 60%, #0e7490 100%)",
  forest:    "linear-gradient(135deg, #14532d 0%, #166534 30%, #15803d 60%, #16a34a 100%)",
  egyptian:  "linear-gradient(135deg, #78350f 0%, #92400e 30%, #d97706 60%, #f59e0b 100%)",
  sakura:    "linear-gradient(135deg, #1e0a22 0%, #500040 35%, #891155 65%, #be185d 100%)",
  viking:    "linear-gradient(135deg, #1f2937 0%, #374151 30%, #4b5563 60%, #6b7280 100%)",
  cyberpunk: "linear-gradient(135deg, #0c0a09 0%, #1c1917 30%, #292524 60%, #44403c 100%)",
  medieval:  "linear-gradient(135deg, #451a03 0%, #7c2d12 30%, #a16207 60%, #ca8a04 100%)",
  tropical:  "linear-gradient(135deg, #0ea5e9 0%, #06b6d4 30%, #10b981 60%, #22c55e 100%)",
  artdeco:   "linear-gradient(135deg, #000000 0%, #1c1917 30%, #78350f 60%, #fbbf24 100%)",
};

const ShareCardPreview = forwardRef(function ShareCardPreview({ data }, ref) {
  const themeKey = data?.theme || "default";
  const theme = themes[themeKey] || themes.default;
  const cardBg = CARD_BG[themeKey] || CARD_BG.default;
  const socialKeys = Array.isArray(data?.socialKeys) ? data.socialKeys : [];

  return (
    <div
      ref={ref}
      className="w-[360px] h-[400px] rounded-[28px] overflow-hidden relative shadow-2xl border border-white/20 flex flex-col gap-3 p-5"
      style={{ background: cardBg, fontFamily: theme.fontFamily || "system-ui, sans-serif" }}
    >
      <div className="absolute inset-0 bg-black/15 pointer-events-none" />

      <div className="relative z-10 text-center">
        <div className="w-16 h-16 mx-auto rounded-full overflow-hidden border-4 border-white/90 shadow-lg">
          <img
            src={data?.avatar || "/icon-192x192.png"}
            alt="avatar"
            className="w-full h-full object-cover"
            crossOrigin="anonymous"
          />
        </div>

        <h2 className="mt-2 text-[28px] leading-[1.25] font-bold text-white px-2 pb-1">
          {data?.fullName || "Mero Link User"}
        </h2>
        <p className="mt-2 text-[13px] leading-[1.35] text-white/90 min-h-[34px] px-3 max-h-[40px] overflow-hidden">
          {data?.bio || "Create your own profile with Mero Link"}
        </p>
      </div>

      <div className="relative z-10 rounded-2xl bg-white/20 border border-white/30 p-3">
        <p className="text-xs text-white/80 text-center mb-2">Social Profiles</p>
        {socialKeys.length > 0 ? (
          <div className="flex flex-wrap items-center justify-center gap-2">
            {socialKeys.map((key) => {
              const icon = socialIcons[key];
              if (!icon) return null;

              return (
                <span
                  key={key}
                  className="w-8 h-8 rounded-full bg-white/25 border border-white/30 flex items-center justify-center"
                  title={key}
                >
                  <FontAwesomeIcon icon={icon} className="text-white text-sm" />
                </span>
              );
            })}
          </div>
        ) : (
          <p className="text-sm text-white/80 text-center">No social profiles added yet</p>
        )}
      </div>

      <div className="relative z-10 rounded-xl bg-black/20 border border-white/20 p-2.5 flex items-center justify-between gap-3">
        <div className="min-w-0">
          <p className="text-xs leading-tight text-white/80">Scan to visit profile</p>
          <p className="text-[10px] leading-tight text-white/70 mt-1 truncate">merolink.it.com/{data?.uri || "username"}</p>
        </div>

        {data?.qrCodeUrl ? (
          <div className="w-[52px] h-[52px] rounded-lg bg-white p-1 shrink-0">
            <img
              src={data.qrCodeUrl}
              alt="Profile QR"
              className="w-full h-full rounded object-contain"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
});

export default ShareCardPreview;
