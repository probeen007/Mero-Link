import LegalPage from '@/components/marketing/LegalPage';
import { CONTACT_EMAIL } from '@/libs/site';

export const metadata = {
  title: 'Terms of Service',
  description: 'The rules for using Mero Link.',
  alternates: { canonical: '/terms' },
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Service" updated="November 1, 2026">
      <p>By creating a Mero Link page you agree to these terms. They are written to be readable; if anything is unclear, email <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.</p>

      <h2>Your account</h2>
      <p>You sign in with a Google account and are responsible for what is published on your page. One page per account. Usernames are first come, first served, and we may reclaim names that impersonate others or sit unused for a long time.</p>

      <h2>What you can&apos;t post</h2>
      <ul>
        <li>Anything illegal, or links to malware, phishing or scams.</li>
        <li>Content that harasses, threatens or impersonates someone.</li>
        <li>Sexual content involving minors, or non-consensual intimate content.</li>
        <li>Spam, or links designed to mislead visitors about where they lead.</li>
      </ul>
      <p>We may hide or remove pages that break these rules, and suspend accounts that do it repeatedly.</p>

      <h2>Your content</h2>
      <p>You own what you post. You give us permission to host and display it on your page and in previews of your page (for example the share image) so the service works.</p>

      <h2>The service</h2>
      <p>Mero Link is provided as is. We work hard to keep it fast and online but can&apos;t promise it will never be unavailable. Free features may change; if we remove something significant we will give notice.</p>

      <h2>Ending</h2>
      <p>You can ask us to delete your page at any time. We may end accounts that break these terms.</p>
    </LegalPage>
  );
}
