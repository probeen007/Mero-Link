'use client';

import { signIn, useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useCallback, useRef, useState } from "react";

export default function HeroForm() {
  const router = useRouter();
  const inputRef = useRef(null); // Use ref for direct access to the input
  const { data: session } = useSession();
  const user = session?.user;
  
  const [isFocused, setIsFocused] = useState(false);
  const [placeholder, setPlaceholder] = useState('');

  // Auto-fill username if stored
  useEffect(() => {
    const desiredUsername = localStorage.getItem('desiredUsername');
    if (desiredUsername) {
      localStorage.removeItem('desiredUsername');
      router.replace(`/account?desiredUsername=${desiredUsername}`);
    }
  }, [router]);

  // Typing animation for placeholder
  useEffect(() => {
    if (isFocused) {
      setPlaceholder('username');
      return;
    }

    const names = [
      'viratkohli', 
      'cristiano', 
      'leomessi', 
      'lalisa', 
      'shakira', 
      'burnaboy', 
      'badbunny', 
      'khabylame', 
      'anitta', 
      'bts', 
      'taylorswift', 
      'mrbeast', 
      'neymarjr',
      'priyankachopra'
    ];
    let nameIndex = 0;
    let charIndex = 0;
    let isDeleting = false;
    let typingTimeout;

    const type = () => {
      const currentName = names[nameIndex];
      
      if (isDeleting) {
        setPlaceholder(currentName.substring(0, charIndex - 1));
        charIndex--;
      } else {
        setPlaceholder(currentName.substring(0, charIndex + 1));
        charIndex++;
      }

      let typeSpeed = isDeleting ? 60 : 120;

      if (!isDeleting && charIndex === currentName.length) {
        // Pause at the end of typing
        typeSpeed = 1600;
        isDeleting = true;
      } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        // Select next name
        nameIndex = (nameIndex + 1) % names.length;
        typeSpeed = 400;
      }

      typingTimeout = setTimeout(type, typeSpeed);
    };

    // Begin loop
    typingTimeout = setTimeout(type, 300);

    return () => clearTimeout(typingTimeout);
  }, [isFocused]);

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
      className={`flex flex-col sm:flex-row items-stretch sm:items-center bg-white border w-[95%] sm:w-[90%] md:w-[85%] lg:w-full max-w-xl rounded-2xl p-2 gap-2 transition-all duration-300 ${
        isFocused 
          ? 'border-blue-600 ring-4 ring-blue-500/20 shadow-[0_20px_40px_rgba(37,99,235,0.18)]' 
          : 'border-slate-300 shadow-[0_12px_28px_rgba(0,0,0,0.08)] hover:border-slate-400 hover:shadow-[0_16px_36px_rgba(0,0,0,0.12)]'
      }`}
    >
      <div className={`flex-grow flex items-center px-4 h-12 rounded-xl transition-colors duration-300 gap-2 ${
        isFocused ? 'bg-blue-50/50' : 'bg-slate-50'
      }`}>
        <span className={`font-bold text-sm sm:text-base select-none transition-colors duration-300 ${
          isFocused ? 'text-blue-600' : 'text-slate-600'
        }`}>merolink.me/</span>
        <input
          type="text"
          ref={inputRef}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          className="w-full bg-transparent focus:outline-none text-base pl-0.5 text-slate-900 font-bold border-none outline-none focus:ring-0"
          placeholder={placeholder}
          aria-label="Choose your username"
          style={{ border: 'none', outline: 'none', padding: '0', boxShadow: 'none', height: 'auto', marginBottom: '0' }}
        />
      </div>
      <button
        type="submit"
        className="h-12 bg-blue-600 hover:bg-blue-700 text-white px-8 rounded-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 transition-all duration-200 whitespace-nowrap font-bold text-sm shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
      >
        Join for Free
      </button>
    </form>
  );
}
