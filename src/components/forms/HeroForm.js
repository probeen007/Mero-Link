'use client';

import { signIn } from "next-auth/react";
import { redirect, useRouter } from "next/navigation";
import { useEffect, useCallback, useRef } from "react";

export default function HeroForm({ user }) {
  const router = useRouter();
  const inputRef = useRef(null); // Use ref for direct access to the input

  useEffect(() => {
    const desiredUsername = localStorage.getItem('desiredUsername');
    if (desiredUsername) {
      localStorage.removeItem('desiredUsername');
      redirect(`/account?desiredUsername=${desiredUsername}`);
    }
  }, []);

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
      className="flex flex-col sm:flex-row items-stretch sm:items-center shadow-lg bg-white shadow-gray-500/20 w-full max-w-2xl rounded-lg p-2 gap-2"
    >
      <div className="flex items-center justify-center sm:justify-start bg-gray-50 rounded-md h-12 px-3 text-gray-600 font-medium text-sm sm:text-base whitespace-nowrap">
        merolink.me/
      </div>
      <input
        type="text"
        ref={inputRef}
        className="flex-grow border border-gray-300 rounded-md px-2 h-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-base"
        placeholder="username"
      />
      <button
        type="submit"
        className="h-12 bg-gradient-to-r from-blue-600 to-blue-700 text-white px-4 rounded-md hover:from-blue-700 hover:to-blue-800 transition-all whitespace-nowrap font-medium text-base shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Join for Free
      </button>
    </form>
  );
}
