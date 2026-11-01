import Link from 'next/link';
import { FaLinkedinIn } from 'react-icons/fa6';
import { PiEnvelopeSimpleBold } from 'react-icons/pi';
import { Logo } from '@/components/ui';
import { CONTACT_EMAIL } from '@/libs/site';

const COLUMNS = [
  { title: 'Product', links: [['Themes', '/themes'], ['Pricing', '/pricing'], ['Linktree alternative', '/linktree-alternative'], ['Log in', '/login']] },
  { title: 'Company', links: [['About', '/about'], ['Contact', '/contact']] },
  { title: 'Legal', links: [['Privacy', '/privacy'], ['Terms', '/terms']] },
];

export default function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className="shell grid gap-10 py-14 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <Logo />
          <p className="mt-4 max-w-xs text-sm text-muted">One link for everything you make. Built in Nepal, used everywhere.</p>
          <div className="mt-5 flex gap-2">
            <a href="https://www.linkedin.com/company/merolink/" target="_blank" rel="noopener noreferrer" aria-label="Mero Link on LinkedIn"
              className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-ink"><FaLinkedinIn aria-hidden /></a>
            <a href={`mailto:${CONTACT_EMAIL}`} aria-label="Email Mero Link"
              className="grid h-10 w-10 place-items-center rounded-full border border-line hover:border-ink"><PiEnvelopeSimpleBold aria-hidden /></a>
          </div>
        </div>
        {COLUMNS.map((col) => (
          <nav key={col.title} aria-label={col.title}>
            <h2 className="text-sm font-semibold">{col.title}</h2>
            <ul className="mt-4 grid gap-2.5">
              {col.links.map(([label, href]) => (
                <li key={href}><Link href={href} className="text-sm text-muted transition-colors hover:text-ink">{label}</Link></li>
              ))}
            </ul>
          </nav>
        ))}
      </div>
      <div className="shell flex flex-wrap justify-between gap-2 border-t border-line py-6 text-sm text-muted">
        <p>© {new Date().getFullYear()} Mero Link</p>
        <p>Made in Kathmandu</p>
      </div>
    </footer>
  );
}
