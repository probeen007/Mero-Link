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
      className="flex flex-col md:flex-row items-center shadow-lg bg-white shadow-gray-500/20 w-full max-w-xl rounded p-4"
    >
      <span className="bg-white py-4 pl-4">
        MeroLink.to/
      </span>
      <input
        type="text"
        ref={inputRef} // Attach the ref to the input
        className="flex-grow border border-gray-300 rounded  mt-2 p-2 mb-2 md:mb-0 md:ml-2" // Add margin and padding
        placeholder="username"
      />
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded whitespace-nowrap md:ml-2"
      >
        Join for Free
      </button>
    </form>
  );
}
