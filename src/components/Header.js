"use client"
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoutButton from "@/components/buttons/LogoutButton";
import Dashboard from "./buttons/dashboard";
import Image from "next/image";

export default function Header({ session }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    setIsMounted(true);
  }, []);

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

  // Prevent background scroll when mobile menu is open
  useEffect(() => {
    if (isMenuOpen) {
      document.documentElement.style.overflow = 'hidden';
      document.body.style.overflow = 'hidden';
    } else {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    }
    return () => {
      document.documentElement.style.overflow = '';
      document.body.style.overflow = '';
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const handleEsc = (ev) => {
      if (ev.key === 'Escape') {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, []);

  const mobileMenuPortal = isMounted
    ? createPortal(
        <>
          {isMenuOpen && (
            <div
              className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-[5000]"
              onClick={toggleMenu}
            ></div>
          )}

          <div
            className={`md:hidden fixed top-0 right-0 h-full bg-white shadow-2xl w-64 sm:w-72 max-w-[85vw] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out border-l border-gray-300 z-[5100]`}
          >
            <div className="flex flex-col gap-5 sm:gap-6 p-5 sm:p-8 h-full bg-white overflow-y-auto">
              <button
                aria-label="Close navigation menu"
                className="self-end text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all bg-white focus-ring"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>

              {session ? (
                <>
                  <div className="flex items-center justify-center gap-3 text-blue-600 font-medium bg-white p-3 sm:p-4 rounded-xl">
                    <span className="text-xl">👤</span>
                    <span className="truncate max-w-[170px]">Hello, {session.user.name}</span>
                  </div>
                  <hr className="border-gray-200" />
                  <Link href="/account" onClick={toggleMenu} className="transform hover:scale-105 transition-transform">
                    <Dashboard />
                  </Link>
                  <div className="transform hover:scale-105 transition-transform">
                    <LogoutButton />
                  </div>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md text-center font-medium focus-ring"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="text-blue-600 font-medium hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 text-center"
                  >
                    Create Account
                  </Link>
                </>
              )}
              <hr className="border-gray-200" />

              <div className="space-y-4">
                <Link href="/about" onClick={toggleMenu} className="block text-center text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 font-medium">
                  About Us
                </Link>
                <Link href="/pricing" onClick={toggleMenu} className="block text-center text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 font-medium">
                  Pricing
                </Link>
                <Link href="/contact" onClick={toggleMenu} className="block text-center text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 font-medium">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </>,
        document.body
      )
    : null;

  return (
    <>
    <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 py-3 sm:py-4 shadow-sm sticky top-0 z-[1000] transition-all">
        <div className="page-shell flex justify-between items-center gap-3">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-lg">
          {/* Logo Image */}
          <Image
            src="https://i.ibb.co/HNVDd6R/merolinklogo.png"
            alt="Mero Link Logo"
            width={44}
            height={44}
            className="w-11 h-11 rounded-lg shadow-sm"
          />

          {/* Text */}
          <span className="font-bold text-xl sm:text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Mero <span className="text-blue-700">Link</span>
          </span>
        </Link>

        {/* Hamburger Icon for mobile */}
        <button
          aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
          className="block md:hidden text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all focus-ring"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
        </button>

        {/* Navigation for large screens */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 text-base font-medium">
          <Link href="/about" className="hover:text-blue-600 transition-colors relative group focus-ring rounded px-1">
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors relative group focus-ring rounded px-1">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors relative group focus-ring rounded px-1">
            Contact
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        </nav>

        {/* User Authentication Section for large screens */}
        <nav className="hidden md:flex items-center gap-4 text-sm">
          {session ? (
            <>
              <Link
                href="/account"
                className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50 focus-ring"
              >
                <span className="text-lg">👤</span> Hello, {session.user.name}
              </Link>
              <Link href="/account" className="hover:scale-105 transition-transform">
                <Dashboard />
              </Link>
              <div className="hover:scale-105 transition-transform">
                <LogoutButton />
              </div>
            </>
          ) : (
            <>
              <Link
                href="/login"
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5 focus-ring"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 focus-ring"
              >
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>

    </header>
    {mobileMenuPortal}
    </>
  );
}
