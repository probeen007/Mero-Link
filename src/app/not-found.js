import { Button, Logo } from '@/components/ui';

export const metadata = { title: 'Page not found', robots: { index: false } };

export default function NotFound() {
  return (
    <main className="grid min-h-[100dvh] place-items-center px-4">
      <div className="flex max-w-md flex-col items-center text-center">
        <Logo />
        <p className="mt-10 font-display text-7xl font-extrabold tracking-tight">404</p>
        <h1 className="mt-3 font-display text-2xl font-bold">Nobody lives here yet</h1>
        <p className="mt-2 text-muted">
          This page doesn&apos;t exist. If it&apos;s a username, it could be yours.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button href="/login" size="lg">Claim your link</Button>
          <Button href="/" variant="secondary" size="lg">Go home</Button>
        </div>
      </div>
    </main>
  );
}
