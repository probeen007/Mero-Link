// Simple, consistent loading components
import { useState, useEffect } from 'react';

// Simple loading spinner
export function LoadingSpinner({ size = 'medium', color = 'blue' }) {
  const sizeClasses = {
    small: 'h-4 w-4',
    medium: 'h-8 w-8', 
    large: 'h-12 w-12'
  };
  
  const colorClasses = {
    blue: 'border-blue-500',
    white: 'border-white',
    gray: 'border-gray-500'
  };

  return (
    <div className={`${sizeClasses[size]} ${colorClasses[color]} border-2 border-t-transparent rounded-full animate-spin`}></div>
  );
}

// Page-level loading screen
export function PageLoader({ message = "Loading..." }) {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LoadingSpinner size="large" />
        <p className="mt-4 text-gray-600">{message}</p>
      </div>
    </div>
  );
}

// Component-level loading
export function ComponentLoader({ message = "Loading..." }) {
  return (
    <div className="flex items-center justify-center p-8">
      <div className="text-center">
        <LoadingSpinner />
        <p className="mt-2 text-gray-600 text-sm">{message}</p>
      </div>
    </div>
  );
}

// Hydration-safe component wrapper
export function HydrationSafe({ children, fallback, delay = 0 }) {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsClient(true), delay);
    return () => clearTimeout(timer);
  }, [delay]);

  if (!isClient) {
    return fallback || <ComponentLoader />;
  }

  return children;
}
