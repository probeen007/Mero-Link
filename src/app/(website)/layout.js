import SessionProviderWrapper from '@/components/SessionProviderWrapper';
import Header from '@/components/Header';
import Footer from '@/components/footer';
import JsonLd from '@/components/JsonLd';
import { organizationLd } from '@/libs/structuredData';

export default function WebsiteLayout({ children }) {
  return (
    <SessionProviderWrapper>
      <JsonLd data={organizationLd} />
      <a href="#main" className="sr-only focus:not-sr-only focus:fixed focus:left-3 focus:top-3 focus:z-50 focus:rounded-full focus:bg-ink focus:px-4 focus:py-2 focus:text-bg">
        Skip to content
      </a>
      <Header />
      <main id="main">{children}</main>
      <Footer />
    </SessionProviderWrapper>
  );
}
