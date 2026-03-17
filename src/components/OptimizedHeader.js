// src/components/OptimizedHeader.js
// Performance-optimized header with lazy loading and memoization

import { memo } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Icon, icons } from '@/libs/icons';
import { prefetchRoute } from '@/libs/prefetch';

const OptimizedHeader = memo(({ 
  user, 
  showNavigation = true, 
  className = "",
  onMenuToggle,
  isMenuOpen = false 
}) => {
  // Prefetch critical routes on hover
  const handleLinkHover = (route) => {
    prefetchRoute(route);
  };

  return (
    <header className={`bg-white shadow-sm border-b border-gray-200 ${className}`}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link 
              href="/"
              className="flex items-center space-x-2 text-blue-600 font-bold text-xl"
              onMouseEnter={() => handleLinkHover('/')}
            >
              <Icon icon={icons.link} className="w-8 h-8" />
              <span>Mero Link</span>
            </Link>
          </div>

          {/* Desktop Navigation */}
          {showNavigation && (
            <nav className="hidden md:flex space-x-8">
              <NavLink 
                href="/pricing" 
                onHover={() => handleLinkHover('/pricing')}
              >
                Pricing
              </NavLink>
              <NavLink 
                href="/about" 
                onHover={() => handleLinkHover('/about')}
              >
                About
              </NavLink>
              <NavLink 
                href="/contact" 
                onHover={() => handleLinkHover('/contact')}
              >
                Contact
              </NavLink>
            </nav>
          )}

          {/* User Actions */}
          <div className="flex items-center space-x-4">
            {user ? (
              <UserMenu user={user} />
            ) : (
              <AuthButtons />
            )}

            {/* Mobile menu button */}
            {showNavigation && (
              <button
                onClick={onMenuToggle}
                className="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100"
                aria-label="Toggle menu"
              >
                <Icon 
                  icon={isMenuOpen ? icons.times : icons.bars} 
                  className="w-6 h-6" 
                />
              </button>
            )}
          </div>
        </div>

        {/* Mobile Navigation */}
        {showNavigation && isMenuOpen && (
          <MobileMenu onClose={onMenuToggle} />
        )}
      </div>
    </header>
  );
});

// Memoized navigation link component
const NavLink = memo(({ href, children, onHover, className = "" }) => (
  <Link
    href={href}
    className={`text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors ${className}`}
    onMouseEnter={onHover}
  >
    {children}
  </Link>
));

// Memoized user menu component
const UserMenu = memo(({ user }) => (
  <div className="flex items-center space-x-3">
    <Link
      href="/account"
      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
      onMouseEnter={() => prefetchRoute('/account')}
    >
      Dashboard
    </Link>
    <div className="flex items-center space-x-2">
      {user.image && (
        <Image
          src={user.image}
          alt={user.name || 'User'}
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
        />
      )}
      <span className="text-sm text-gray-700 hidden sm:block">
        {user.name || user.email}
      </span>
    </div>
  </div>
));

// Memoized auth buttons component
const AuthButtons = memo(() => (
  <div className="flex items-center space-x-3">
    <Link
      href="/login"
      className="text-gray-500 hover:text-gray-900 px-3 py-2 rounded-md text-sm font-medium transition-colors"
      onMouseEnter={() => prefetchRoute('/login')}
    >
      Sign in
    </Link>
    <Link
      href="/login"
      className="bg-blue-600 text-white px-4 py-2 rounded-md text-sm font-medium hover:bg-blue-700 transition-colors"
      onMouseEnter={() => prefetchRoute('/login')}
    >
      Get Started
    </Link>
  </div>
));

// Memoized mobile menu component
const MobileMenu = memo(({ onClose }) => (
  <div className="md:hidden border-t border-gray-200 pt-4 pb-3">
    <div className="space-y-1">
      <MobileNavLink href="/pricing" onClick={onClose}>
        Pricing
      </MobileNavLink>
      <MobileNavLink href="/about" onClick={onClose}>
        About
      </MobileNavLink>
      <MobileNavLink href="/contact" onClick={onClose}>
        Contact
      </MobileNavLink>
    </div>
  </div>
));

// Memoized mobile navigation link
const MobileNavLink = memo(({ href, children, onClick }) => (
  <Link
    href={href}
    className="block px-3 py-2 rounded-md text-base font-medium text-gray-500 hover:text-gray-900 hover:bg-gray-50 transition-colors"
    onClick={onClick}
  >
    {children}
  </Link>
));

// Set display names for debugging
OptimizedHeader.displayName = 'OptimizedHeader';
NavLink.displayName = 'NavLink';
UserMenu.displayName = 'UserMenu';
AuthButtons.displayName = 'AuthButtons';
MobileMenu.displayName = 'MobileMenu';
MobileNavLink.displayName = 'MobileNavLink';

export default OptimizedHeader;
