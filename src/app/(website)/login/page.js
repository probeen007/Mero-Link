import Link from 'next/link';
import { redirect } from 'next/navigation';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import LoginWithGoogle from '@/components/buttons/LoginWithGoogle';
import ThemeThumb from '@/components/profile/ThemeThumb';
import { demoFor } from '@/libs/demo';
import { pageMeta } from '@/libs/seo';

export const metadata = pageMeta({
  title: 'Log in or sign up',
  description: 'Sign in to Mero Link with Google to claim your link in bio and edit your page.',
  path: '/login',
});

export default async function LoginPage({ searchParams }) {
  const session = await getServerSession(authOptions);
  if (session) redirect('/account');
  const { error } = await searchParams;

  return (
    <section className="shell grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2">
      <div className="mx-auto w-full max-w-md lg:mx-0">
        <h1 className="font-display text-5xl font-extrabold tracking-tight sm:text-6xl">Hey there.</h1>
        <p className="mt-4 text-lg text-muted">Log in, or create your page in a minute. Same button for both.</p>
        <div className="mt-10">
          <LoginWithGoogle />
        </div>
        {error && (
          <p className="mt-4 rounded-2xl bg-red-500/10 px-4 py-3 text-sm text-red-700 dark:text-red-300" role="alert">
            Sign in didn&apos;t work. Please try again.
          </p>
        )}
        <p className="mt-8 text-sm text-muted">
          By continuing you agree to our <Link href="/terms" className="font-medium text-ink underline">Terms</Link> and{' '}
          <Link href="/privacy" className="font-medium text-ink underline">Privacy Policy</Link>.
        </p>
      </div>

      <div className="relative hidden h-[600px] overflow-hidden rounded-[40px] bg-pink lg:block" aria-hidden>
        <div className="absolute left-[8%] top-16 rotate-[-6deg] overflow-hidden rounded-[26px] border-[6px] border-ink shadow-sticker">
          <ThemeThumb {...demoFor('bubblegum', 2)} scale={0.5} />
        </div>
        <div className="absolute right-[8%] top-40 rotate-[5deg] overflow-hidden rounded-[26px] border-[6px] border-ink shadow-sticker">
          <ThemeThumb {...demoFor('cosmos', 1)} scale={0.5} />
        </div>
      </div>
    </section>
  );
}
