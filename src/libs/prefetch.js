// src/libs/prefetch.js
// Intelligent prefetching and resource optimization

import { cache } from './cache';

// Prefetch user page data when hovering over links
export const prefetchPageData = async (uri) => {
  const cacheKey = `page-data:${uri}`;
  
  // Check if already cached
  if (cache.has(cacheKey)) {
    return;
  }

  try {
    const response = await fetch(`/api/livePageData?uri=${uri}`, {
      priority: 'low' // Don't interfere with critical requests
    });
    
    if (response.ok) {
      const data = await response.json();
      cache.set(cacheKey, data, 60000); // Cache for 1 minute
    }
  } catch (error) {
    console.warn('Prefetch failed for:', uri, error);
  }
};

// Preload critical images
export const preloadImage = (src) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = resolve;
    img.onerror = reject;
    img.src = src;
  });
};

// Smart image preloading based on viewport
export const preloadImagesInViewport = () => {
  const images = document.querySelectorAll('img[data-src]');
  
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.removeAttribute('data-src');
          imageObserver.unobserve(img);
        }
      });
    }, {
      rootMargin: '50px 0px' // Start loading 50px before image comes into view
    });

    images.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    images.forEach(img => {
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
    });
  }
};

// Resource hints for better loading
export const addResourceHints = () => {
  // DNS prefetch for external domains
  const dnsHints = [
    'https://fonts.googleapis.com',
    'https://fonts.gstatic.com',
    'https://lh3.googleusercontent.com'
  ];

  dnsHints.forEach(domain => {
    const link = document.createElement('link');
    link.rel = 'dns-prefetch';
    link.href = domain;
    document.head.appendChild(link);
  });

  // Preconnect to critical third-party origins
  const preconnectHints = [
    'https://fonts.googleapis.com',
    'https://accounts.google.com'
  ];

  preconnectHints.forEach(origin => {
    const link = document.createElement('link');
    link.rel = 'preconnect';
    link.href = origin;
    link.crossOrigin = 'anonymous';
    document.head.appendChild(link);
  });
};

// Critical CSS inlining helper
export const inlineCriticalCSS = (css) => {
  const style = document.createElement('style');
  style.type = 'text/css';
  style.innerHTML = css;
  document.head.appendChild(style);
};

// Defer non-critical JavaScript
export const loadScript = (src, async = true, defer = true) => {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script');
    script.src = src;
    script.async = async;
    script.defer = defer;
    script.onload = resolve;
    script.onerror = reject;
    document.head.appendChild(script);
  });
};

// Bundle splitting helper for dynamic imports
export const loadModule = async (modulePath) => {
  try {
    const dynamicModule = await import(modulePath);
    return dynamicModule.default || dynamicModule;
  } catch (error) {
    console.error(`Failed to load module: ${modulePath}`, error);
    throw error;
  }
};

// Initialize performance optimizations
export const initPerformanceOptimizations = () => {
  // Add resource hints
  addResourceHints();
  
  // Preload images in viewport
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', preloadImagesInViewport);
  } else {
    preloadImagesInViewport();
  }

  // Performance observer for monitoring
  if ('PerformanceObserver' in window) {
    // Monitor Largest Contentful Paint
    const lcpObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      const lastEntry = entries[entries.length - 1];
      console.log('LCP:', lastEntry.startTime);
    });
    lcpObserver.observe({ entryTypes: ['largest-contentful-paint'] });

    // Monitor First Input Delay
    const fidObserver = new PerformanceObserver((list) => {
      const entries = list.getEntries();
      entries.forEach(entry => {
        console.log('FID:', entry.processingStart - entry.startTime);
      });
    });
    fidObserver.observe({ entryTypes: ['first-input'] });
  }
};
