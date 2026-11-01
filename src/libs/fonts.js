// src/libs/fonts.js
// Self-hosted display fonts for the 33 themes that declare a `fontVar` in
// themes.js (default/light/aurora intentionally have none — they use the
// inherited Lato/system stack). Uses next/font's `variable` output (not
// `className`) so every theme's CSS custom property is available on a shared
// ancestor, but the browser only ever fetches the woff2 for whichever single
// font-family a given page actually renders text with.
import {
  Orbitron,
  Space_Grotesk,
  Rajdhani,
  Fira_Code,
  Source_Code_Pro,
  Playfair_Display,
  Fredoka,
  Dancing_Script,
  Righteous,
  Nunito,
  Inter,
  Comfortaa,
  Mukta,
  Press_Start_2P,
  Merriweather,
  Noto_Sans_JP,
  Pirata_One,
  Cinzel,
  Uncial_Antiqua,
  Great_Vibes,
  Poppins,
} from 'next/font/google';

const orbitron = Orbitron({ subsets: ['latin'], weight: '700', variable: '--font-orbitron', display: 'swap' });
const spaceGrotesk = Space_Grotesk({ subsets: ['latin'], weight: '700', variable: '--font-space-grotesk', display: 'swap' });
const rajdhani = Rajdhani({ subsets: ['latin'], weight: '700', variable: '--font-rajdhani', display: 'swap' });
const firaCode = Fira_Code({ subsets: ['latin'], weight: '700', variable: '--font-fira-code', display: 'swap' });
const sourceCodePro = Source_Code_Pro({ subsets: ['latin'], weight: '700', variable: '--font-source-code-pro', display: 'swap' });
const playfairDisplay = Playfair_Display({ subsets: ['latin'], weight: '700', variable: '--font-playfair-display', display: 'swap' });
const fredoka = Fredoka({ subsets: ['latin'], weight: '600', variable: '--font-fredoka', display: 'swap' });
const dancingScript = Dancing_Script({ subsets: ['latin'], weight: '700', variable: '--font-dancing-script', display: 'swap' });
const righteous = Righteous({ subsets: ['latin'], weight: '400', variable: '--font-righteous', display: 'swap' });
const nunito = Nunito({ subsets: ['latin'], weight: '700', variable: '--font-nunito', display: 'swap' });
const inter = Inter({ subsets: ['latin'], weight: '700', variable: '--font-inter', display: 'swap' });
const comfortaa = Comfortaa({ subsets: ['latin'], weight: '700', variable: '--font-comfortaa', display: 'swap' });
const mukta = Mukta({ subsets: ['latin'], weight: '700', variable: '--font-mukta', display: 'swap' });
const pressStart2P = Press_Start_2P({ subsets: ['latin'], weight: '400', variable: '--font-press-start-2p', display: 'swap' });
const merriweather = Merriweather({ subsets: ['latin'], weight: '700', variable: '--font-merriweather', display: 'swap' });
const notoSansJP = Noto_Sans_JP({ subsets: ['latin'], weight: '700', variable: '--font-noto-sans-jp', display: 'swap' });
const pirataOne = Pirata_One({ subsets: ['latin'], weight: '400', variable: '--font-pirata-one', display: 'swap' });
const cinzel = Cinzel({ subsets: ['latin'], weight: '700', variable: '--font-cinzel', display: 'swap' });
const uncialAntiqua = Uncial_Antiqua({ subsets: ['latin'], weight: '400', variable: '--font-uncial-antiqua', display: 'swap' });
const greatVibes = Great_Vibes({ subsets: ['latin'], weight: '400', variable: '--font-great-vibes', display: 'swap' });
const poppins = Poppins({ subsets: ['latin'], weight: '700', variable: '--font-poppins', display: 'swap' });

const themeFonts = [
  orbitron, spaceGrotesk, rajdhani, firaCode, sourceCodePro, playfairDisplay,
  fredoka, dancingScript, righteous, nunito, inter, comfortaa, mukta,
  pressStart2P, merriweather, notoSansJP, pirataOne, cinzel, uncialAntiqua,
  greatVibes, poppins,
];

// Apply on a shared ancestor (see (page)/[uri]/layout.js and (app)/template.js)
// so every `--font-*` variable referenced by theme.fontVar is in scope.
export const themeFontVariables = themeFonts.map((f) => f.variable).join(' ');
