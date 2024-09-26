"use client"
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faLink } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoutButton from "@/components/buttons/LogoutButton";
import Dashboard from "./buttons/dashboard";


export default function Header({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  // Close the sidebar when the screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) { // Change this value based on your breakpoint
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);
  //console.log('Session in HeaderClient:', session); // Debugging line
  return (

    <header className="bg-white border-b py-4 shadow-md transition-all">
      <div className="max-w-6xl flex justify-between mx-auto px-6 items-center">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-2 text-blue-500">
          <span className="font-bold flex items-center text-2xl">
            Mero{" "}
            <span className="ml-1">
              <FontAwesomeIcon icon={faLink} className="text-blue-700" />
            </span>{" "}
            Link
          </span>
        </Link>

        {/* Hamburger Icon for mobile */}
        <button
          className="block md:hidden text-blue-500"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
        </button>

        {/* Navigation for large screens */}
        <nav className="hidden md:flex items-center gap-5 text-slate-600 text-base">
          <Link href="/about" className="hover:text-blue-600 transition-all">
            About Us
          </Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-all">
            Pricing
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-all">
            Contact
          </Link>
        </nav>

        {/* User Authentication Section for large screens */}
        <nav className="hidden md:flex items-center gap-4 text-sm text-slate-500">
          {session ? (
            <>
              <Link
                href="/account"
                className="flex items-center gap-2 text-blue-500 font-medium hover:text-blue-700 transition-all"
              >
                <span>👤</span> Hello, {session.user.name}
              </Link>
              <Link href="/account">
                <Dashboard />
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="text-blue-500 font-medium hover:text-blue-700 transition-all"
              >
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Sidebar Menu for small and medium screens */}
      <div
        className={`fixed top-0 right-0 h-full bg-white shadow-lg w-64 z-50 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300`}
      >
        <div className="justify-center flex flex-col gap-4 p-6">
          {/* Close Icon */}
          <button className="self-end text-blue-500" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          {session ? (
            <>
              <div className="flex mx-auto gap-2 text-blue-500 font-medium">
                <span>👤</span> Hello, {session.user.name}

              </div>
              <hr />
              <Link href="/account">
                <Dashboard />
              </Link>
              <LogoutButton />
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="mx-auto bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-all"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="mx-auto text-blue-500 font-medium hover:text-blue-700 transition-all"
              >
                Create Account
              </Link>
            </>
          )}
          <hr />
          {/* Vertical navigation links */}
          <Link href="/about" className="mx-auto hover:text-blue-600 transition-all">
            About Us
          </Link>
          <Link href="/pricing" className="mx-auto hover:text-blue-600 transition-all">
            Pricing
          </Link>
          <Link href="/contact" className="mx-auto hover:text-blue-600 transition-all">
            Contact
          </Link>
        </div>
      </div>
    </header>
  );
}
