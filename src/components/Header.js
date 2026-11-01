"use client"
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faUser } from '@fortawesome/free-solid-svg-icons';
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

  // Close the menu when screen size changes
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 768) {
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
              className="md:hidden fixed inset-0 bg-slate-900/60 backdrop-blur-sm transition-opacity duration-300 z-[5000]"
              onClick={toggleMenu}
            ></div>
          )}

          <div
            className={`md:hidden fixed top-0 right-0 h-full bg-white shadow-2xl w-72 max-w-[85vw] transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
              } transition-transform duration-300 ease-in-out border-l border-slate-100 z-[5100]`}
          >
            <div className="flex flex-col gap-6 p-6 h-full bg-white overflow-y-auto">
              <button
                aria-label="Close navigation menu"
                className="self-end text-slate-500 hover:text-slate-700 p-2.5 rounded-xl hover:bg-slate-50 transition-all bg-white"
                onClick={toggleMenu}
              >
                <FontAwesomeIcon icon={faTimes} size="lg" />
              </button>

              {session ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-3 bg-slate-50 p-3.5 rounded-2xl">
                    <div className="w-10 h-10 rounded-full overflow-hidden border-2 border-slate-200">
                      <Image 
                        src={session.user.image || "https://i.ibb.co/HNVDd6R/merolinklogo.png"} 
                        alt="Profile Pic" 
                        width={40} 
                        height={40} 
                        className="object-cover w-full h-full"
                      />
                    </div>
                    <div className="flex flex-col truncate">
                      <span className="text-xs text-slate-400 font-semibold">Logged In</span>
                      <span className="text-sm font-bold text-slate-800 truncate">{session.user.name}</span>
                    </div>
                  </div>
                  <hr className="border-slate-100" />
                  <Link href="/account" onClick={toggleMenu} className="block w-full">
                    <Dashboard className="w-full inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold py-3 px-4 rounded-xl shadow-sm text-sm" />
                  </Link>
                  <div className="w-full">
                    <LogoutButton 
                      onClick={toggleMenu} 
                      className="w-full inline-flex items-center justify-center gap-2 bg-slate-100 hover:bg-red-550 hover:bg-red-50 hover:text-red-600 text-slate-700 font-bold py-3 px-4 rounded-xl transition-all text-sm border border-slate-250"
                    />
                  </div>
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-xl transition-all shadow-sm text-center font-bold text-sm"
                  >
                    Create Account
                  </Link>
                  <Link
                    href="/login"
                    onClick={toggleMenu}
                    className="text-slate-700 font-bold hover:text-blue-600 transition-colors py-3 rounded-xl hover:bg-slate-50 text-center text-sm border border-slate-200"
                  >
                    Sign In
                  </Link>
                </div>
              )}
              <hr className="border-slate-100" />

              <div className="space-y-2">
                <Link href="/about" onClick={toggleMenu} className="block text-slate-600 hover:text-blue-600 hover:bg-slate-50 py-2.5 px-4 rounded-xl font-bold transition-all text-sm">
                  About Us
                </Link>
                <Link href="/pricing" onClick={toggleMenu} className="block text-slate-600 hover:text-blue-600 hover:bg-slate-50 py-2.5 px-4 rounded-xl font-bold transition-all text-sm">
                  Pricing
                </Link>
                <Link href="/contact" onClick={toggleMenu} className="block text-slate-600 hover:text-blue-600 hover:bg-slate-50 py-2.5 px-4 rounded-xl font-bold transition-all text-sm">
                  Contact
                </Link>
              </div>
            </div>
          </div>
        </>
        ,
        document.body
      )
    : null;

  return (
    <>
      <header className="bg-white/80 backdrop-blur-md border-b border-slate-100 py-3 sm:py-4 shadow-sm sticky top-0 z-[1000] transition-all">
        <div className="page-shell flex justify-between items-center gap-3">
          <Link href="/" className="flex items-center gap-2.5 hover:opacity-90 transition-opacity focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2 rounded-xl">
            <Image
              src="https://i.ibb.co/HNVDd6R/merolinklogo.png"
              alt="Mero Link Logo"
              width={38}
              height={38}
              className="w-9 h-9 rounded-lg shadow-sm"
            />
            <span className="font-extrabold text-lg sm:text-xl bg-gradient-to-r from-slate-900 to-indigo-950 bg-clip-text text-transparent">
              Mero<span className="text-blue-600">Link</span>
            </span>
          </Link>

          {/* Hamburger Icon for mobile */}
          <button
            aria-label={isMenuOpen ? "Close navigation menu" : "Open navigation menu"}
            className="block md:hidden text-slate-600 hover:text-slate-800 p-2 rounded-xl hover:bg-slate-50 transition-all focus-ring"
            onClick={toggleMenu}
          >
            <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
          </button>

          {/* Navigation for large screens */}
          <nav className="hidden md:flex items-center gap-8 text-slate-600 text-sm font-bold">
            <Link href="/about" className="hover:text-blue-600 transition-colors relative group focus-ring rounded-lg px-1">
              About Us
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/pricing" className="hover:text-blue-600 transition-colors relative group focus-ring rounded-lg px-1">
              Pricing
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
            <Link href="/contact" className="hover:text-blue-600 transition-colors relative group focus-ring rounded-lg px-1">
              Contact
              <span className="absolute -bottom-1.5 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
            </Link>
          </nav>

          {/* User Authentication Section for large screens */}
          <nav className="hidden md:flex items-center gap-3.5 text-sm">
            {session ? (
              <>
                <Link
                  href="/account"
                  className="flex items-center gap-2 text-slate-600 hover:text-slate-800 transition-colors px-2.5 py-1.5 rounded-xl hover:bg-slate-50 focus-ring"
                >
                  <div className="w-6.5 h-6.5 rounded-full overflow-hidden border border-slate-200 shrink-0">
                    <Image 
                      src={session.user.image || "https://i.ibb.co/HNVDd6R/merolinklogo.png"} 
                      alt="Avatar" 
                      width={26} 
                      height={26} 
                      className="object-cover w-full h-full"
                    />
                  </div>
                  <span className="font-bold text-slate-700 text-xs sm:text-sm">Hello, {session.user.name.split(' ')[0]}</span>
                </Link>
                <Link href="/account" className="transition-transform duration-200">
                  <Dashboard />
                </Link>
                <div className="transition-transform duration-200">
                  <LogoutButton 
                    className="inline-flex items-center gap-2 bg-slate-100 hover:bg-red-50 hover:text-red-650 text-slate-700 font-bold py-2 px-4 rounded-xl border border-slate-200 transition-all duration-200 text-sm focus-ring"
                  />
                </div>
              </>
            ) : (
              <>
                <Link
                  href="/login"
                  className="text-slate-700 font-bold hover:text-blue-600 transition-colors px-4 py-2 rounded-xl hover:bg-slate-50 focus-ring"
                >
                  Sign In
                </Link>
                <Link
                  href="/login"
                  className="bg-blue-600 hover:bg-blue-700 text-white font-bold px-6 py-2.5 rounded-xl transition-all shadow-sm hover:shadow-md hover:-translate-y-0.5 focus-ring"
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
