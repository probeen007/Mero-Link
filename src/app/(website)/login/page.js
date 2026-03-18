"use client";

import LoginWithGoogle from "@/components/buttons/LoginWithGoogle";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShieldAlt, faRocket, faChartLine, faCheckCircle } from "@fortawesome/free-solid-svg-icons";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function LoginPage() {
  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (session) {
      router.push("/account");
    }
  }, [session, router]);

  const accountBenefits = [
    "Publish a professional profile page in minutes",
    "Manage links, socials, and brand styling in one dashboard",
    "Track clicks and profile performance with built-in analytics",
  ];

  return (
    <div className="min-h-screen bg-white py-8 md:py-12">
      <div className="page-shell">
        <section className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 md:p-10 text-center">
          <div className="inline-flex items-center gap-3">
            <Image
              src="https://i.ibb.co/HNVDd6R/merolinklogo.png"
              alt="Mero Link Logo"
              width={44}
              height={44}
              className="w-11 h-11 rounded-lg shadow-sm"
            />
            <span className="font-bold text-lg sm:text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
              Mero <span className="text-blue-700">Link</span>
            </span>
          </div>
          <h1 className="mt-3 text-2xl sm:text-4xl md:text-5xl font-bold leading-tight bg-gradient-to-r from-gray-800 via-blue-800 to-indigo-800 bg-clip-text text-transparent">
            Access your dashboard
          </h1>
          <p className="mt-2 max-w-3xl text-sm sm:text-base md:text-lg text-gray-600 leading-relaxed mx-auto">
            Sign in securely with Google to manage your profile and monitor engagement.
          </p>
        </section>

        <section className="mt-8 grid gap-6 lg:grid-cols-[1.2fr_1fr]">
          <article className="rounded-2xl border border-gray-200 bg-white p-5 sm:p-6 md:p-8 shadow-sm">
            <h2 className="text-xl sm:text-2xl font-bold text-gray-900">Continue with Google</h2>
            <p className="mt-2 text-gray-600 text-sm sm:text-base">
              Fast and secure sign-in.
            </p>

            <div className="mt-5">
              <LoginWithGoogle />
            </div>

            <div className="mt-6 rounded-xl border border-gray-200 bg-gray-50 p-4">
              <h3 className="text-base font-semibold text-gray-900">Why use Mero Link</h3>
              <ul className="mt-3 space-y-2 text-gray-700 text-xs sm:text-sm">
                {accountBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2">
                    <FontAwesomeIcon icon={faCheckCircle} className="mt-0.5 text-blue-600 shrink-0" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>
          </article>

          <aside className="rounded-2xl border border-gray-200 bg-gray-50 p-5 sm:p-6 md:p-8">
            <h2 className="text-lg sm:text-xl font-bold text-gray-900">After sign in</h2>
            <div className="mt-4 space-y-3">
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <FontAwesomeIcon icon={faRocket} className="text-blue-600" />
                  Quick publishing
                </h3>
                <p className="mt-1 text-gray-600 text-xs sm:text-sm">Update links and publish instantly.</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <FontAwesomeIcon icon={faShieldAlt} className="text-blue-600" />
                  Secure workflow
                </h3>
                <p className="mt-1 text-gray-600 text-xs sm:text-sm">Protected and monitored.</p>
              </div>
              <div className="rounded-lg border border-gray-200 bg-white p-3">
                <h3 className="font-semibold text-gray-900 text-sm flex items-center gap-2">
                  <FontAwesomeIcon icon={faChartLine} className="text-blue-600" />
                  Analytics
                </h3>
                <p className="mt-1 text-gray-600 text-xs sm:text-sm">Optimize with performance data.</p>
              </div>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}
