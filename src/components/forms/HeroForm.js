'use client';

import { signIn } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  const inputRef = useRef(null); // Use ref for direct access to the input

  useEffect(() => {
    const desiredUsername = localStorage.getItem('desiredUsername');
    if (desiredUsername) {
      localStorage.removeItem('desiredUsername');
      router.replace(`/account?desiredUsername=${desiredUsername}`);
    }
  }, [router]);

  const handleSubmit = useCallback(async (ev) => {
    ev.preventDefault();
    const username = inputRef.current.value; // Directly access input value

    if (username.length > 0) {
      if (user) {
        router.push(`/account?desiredUsername=${username}`);
      } else {
        localStorage.setItem('desiredUsername', username);
        await signIn('google');
      }
    }
  }, [user, router]);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col md:flex-row items-stretch md:items-center shadow-lg bg-white shadow-gray-500/20 w-[92%] sm:w-[88%] md:w-[82%] lg:w-full max-w-2xl rounded-xl p-2 gap-2"
    >
      <div className="flex items-center justify-center md:justify-start bg-gray-50 rounded-md h-12 px-3 text-gray-600 font-medium text-sm sm:text-base whitespace-nowrap">
        merolink.it.com/
      </div>
      <input
        type="text"
        ref={inputRef}
        className="flex-grow border border-gray-300 rounded-md px-3 h-12 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:border-transparent text-base"
        placeholder="username"
        aria-label="Choose your username"
      />
      <button
        type="submit"
        className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 rounded-md hover:from-blue-700 hover:to-blue-800 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all whitespace-nowrap font-medium text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Join for Free
      </button>
    </form>
  );
}
