"use client"
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faLink } from '@fortawesome/free-solid-svg-icons';
import Link from 'next/link';
import LogoutButton from "@/components/buttons/LogoutButton";
import Dashboard from "./buttons/dashboard";
import Image from "next/image";

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
  //console.log('Session in HeaderClient:', session); // Debugging line
  return (

  <header className="bg-white/95 backdrop-blur-sm border-b border-gray-200 py-4 shadow-sm sticky top-0 z-[10001] transition-all ">
      <div className="max-w-7xl flex justify-between mx-auto px-6 items-center">
        <Link href="/" className="flex items-center gap-3 hover:opacity-80 transition-opacity">
          {/* Logo Image */}
          <Image
            src="https://i.ibb.co/HNVDd6R/merolinklogo.png"
            alt="Mero Link Logo"
            width={44}
            height={44}
            className="w-11 h-11 rounded-lg shadow-sm"
          />

          {/* Text */}
          <span className="font-bold text-2xl bg-gradient-to-r from-blue-600 to-blue-800 bg-clip-text text-transparent">
            Mero <span className="text-blue-700">Link</span>
          </span>
        </Link>

        {/* Hamburger Icon for mobile */}
        <button
          className="block md:hidden text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all"
          onClick={toggleMenu}
        >
          <FontAwesomeIcon icon={isMenuOpen ? faTimes : faBars} size="lg" />
        </button>

        {/* Navigation for large screens */}
        <nav className="hidden md:flex items-center gap-8 text-gray-700 text-base font-medium">
          <Link href="/about" className="hover:text-blue-600 transition-colors relative group">
            About Us
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/pricing" className="hover:text-blue-600 transition-colors relative group">
            Pricing
            <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
          <Link href="/contact" className="hover:text-blue-600 transition-colors relative group">
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
                className="flex items-center gap-2 text-blue-600 font-medium hover:text-blue-700 transition-colors px-3 py-1.5 rounded-lg hover:bg-blue-50"
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
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-2.5 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md hover:shadow-lg transform hover:-translate-y-0.5"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50"
              >
                Create Account
              </Link>
            </>
          )}
        </nav>
      </div>

      {/* Backdrop overlay */}
      {isMenuOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/80 backdrop-blur-sm transition-opacity duration-300 z-[10000]"
          onClick={toggleMenu}
        ></div>
      )}

      {/* Sidebar Menu for small and medium screens */}
      <div
        className={`md:hidden fixed top-0 right-0 h-full bg-white shadow-2xl w-72 transform ${isMenuOpen ? "translate-x-0" : "translate-x-full"
          } transition-transform duration-300 ease-in-out border-l border-gray-300 z-[10002]`}
      >
        <div className="flex flex-col gap-6 p-8 h-full bg-white">
          {/* Close Icon */}
          <button className="self-end text-blue-600 hover:text-blue-700 p-2 rounded-lg hover:bg-blue-50 transition-all bg-white" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faTimes} size="lg" />
          </button>

          {session ? (
            <>
              <div className="flex items-center justify-center gap-3 text-blue-600 font-medium bg-white p-4 rounded-xl">
                <span className="text-xl">👤</span> 
                <span>Hello, {session.user.name}</span>
              </div>
              <hr className="border-gray-200" />
              <Link href="/account" className="transform hover:scale-105 transition-transform">
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
                className="bg-gradient-to-r from-blue-600 to-blue-700 text-white px-6 py-3 rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all shadow-md text-center font-medium"
              >
                Sign In
              </Link>
              <Link
                href="/login"
                className="text-blue-600 font-medium hover:text-blue-700 transition-colors px-4 py-2 rounded-lg hover:bg-blue-50 text-center"
              >
                Create Account
              </Link>
            </>
          )}
          <hr className="border-gray-200" />
          
          {/* Vertical navigation links */}
          <div className="space-y-4">
            <Link href="/about" className="block text-center text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 font-medium">
              About Us
            </Link>
            <Link href="/pricing" className="block text-center text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 font-medium">
              Pricing
            </Link>
            <Link href="/contact" className="block text-center text-gray-700 hover:text-blue-600 transition-colors py-2 px-4 rounded-lg hover:bg-blue-50 font-medium">
              Contact
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
