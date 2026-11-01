// Brand fonts (marketing + dashboard) and profile-theme fonts.
// Every font is exposed as a CSS variable. Theme fonts use `preload: false`, so a
// profile page only downloads the woff2 for the family it actually renders.
import {
  Bricolage_Grotesque,
  Geist,
  Geist_Mono,
  Fredoka,
  Archivo_Black,
  Space_Grotesk,
  JetBrains_Mono,
  Righteous,
  Press_Start_2P,
  Rajdhani,
  DM_Serif_Display,
  Young_Serif,
  Nunito,
  Outfit,
  Zen_Maru_Gothic,
  Mukta,
} from 'next/font/google';

const bricolage = Bricolage_Grotesque({ subsets: ['latin'], variable: '--font-bricolage', display: 'swap' });
const geist = Geist({ subsets: ['latin'], variable: '--font-geist', display: 'swap' });
const geistMono = Geist_Mono({ subsets: ['latin'], variable: '--font-geist-mono', display: 'swap', preload: false });

const fredoka = Fredoka({ subsets: ['latin'], display: 'swap', preload: false, variable: '--font-fredoka' });
const archivoBlack = Archivo_Black({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--font-archivo-black' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], display: 'swap', preload: false, variable: '--font-space-grotesk' });
const jetbrainsMono = JetBrains_Mono({ subsets: ['latin'], display: 'swap', preload: false, variable: '--font-jetbrains-mono' });
const righteous = Righteous({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--font-righteous' });
const pressStart = Press_Start_2P({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--font-press-start' });
const rajdhani = Rajdhani({ subsets: ['latin'], display: 'swap', preload: false, weight: ['500', '700'], variable: '--font-rajdhani' });
const dmSerif = DM_Serif_Display({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--font-dm-serif' });
const youngSerif = Young_Serif({ subsets: ['latin'], display: 'swap', preload: false, weight: '400', variable: '--font-young-serif' });
const nunito = Nunito({ subsets: ['latin'], display: 'swap', preload: false, variable: '--font-nunito' });
const outfit = Outfit({ subsets: ['latin'], display: 'swap', preload: false, variable: '--font-outfit' });
const zenMaru = Zen_Maru_Gothic({ subsets: ['latin'], display: 'swap', preload: false, weight: ['500', '700'], variable: '--font-zen-maru' });
const mukta = Mukta({ subsets: ['latin', 'devanagari'], weight: ['500', '700'], variable: '--font-mukta', display: 'swap', preload: false });

export const brandFontVariables = [bricolage, geist, geistMono].map((f) => f.variable).join(' ');

export const themeFontVariables = [
  fredoka, archivoBlack, spaceGrotesk, jetbrainsMono, righteous, pressStart, rajdhani,
  dmSerif, youngSerif, nunito, outfit, zenMaru, mukta,
].map((f) => f.variable).join(' ');
