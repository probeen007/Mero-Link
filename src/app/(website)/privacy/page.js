import LegalPage from '@/components/marketing/LegalPage';
import { CONTACT_EMAIL } from '@/libs/site';
import { pageMeta } from '@/libs/seo';

export const metadata = pageMeta({
  title: 'Privacy Policy',
  description: 'What Mero Link collects, why, and how to have it deleted.',
  path: '/privacy',
});

export default function PrivacyPage() {
  return (
    <LegalPage title="Privacy Policy" updated="November 1, 2026">
      <p>This policy explains what Mero Link (&quot;we&quot;) collects when you use merolink.me, and what we do with it. The short version: we keep what is needed to run your page and nothing more, and we never sell your data.</p>

      <h2>What we collect</h2>
      <ul>
        <li><strong>Account details from Google.</strong> When you sign in with Google we receive your name, email address and profile photo.</li>
        <li><strong>Your page content.</strong> Your username, display name, bio, location, links, social profiles, videos and design choices. This is public by design.</li>
        <li><strong>Page analytics.</strong> When someone views your page or taps a link we record the event type, the page and the link, with a timestamp. We do not store visitors&apos; IP addresses or build profiles of them.</li>
      </ul>

      <h2>Cookies</h2>
      <p>We use one essential cookie to keep you signed in. We do not use advertising or third-party tracking cookies.</p>

      <h2>Embedded content</h2>
      <p>If a page includes YouTube, Vimeo, Spotify or TikTok media, that provider&apos;s player loads only after a visitor taps play. From then on, that provider&apos;s own privacy policy applies.</p>

      <h2>How we use it</h2>
      <p>To show your page, let you edit it, show you your analytics, and contact you about your account. We do not sell or rent personal data.</p>

      <h2>Deleting your data</h2>
      <p>Email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a> from the address on your account and we will delete your page, analytics and account details.</p>

      <h2>Changes</h2>
      <p>If we change this policy in a meaningful way, we will update the date above and let account holders know.</p>
    </LegalPage>
  );
}
