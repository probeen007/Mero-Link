// public/sw.js
// Service Worker for caching and offline support

// Bump cache versions to invalidate old cached HTML/assets
const CACHE_NAME = 'mero-link-v2';
const STATIC_CACHE = 'mero-link-static-v2';
const DYNAMIC_CACHE = 'mero-link-dynamic-v2';
const IMAGE_CACHE = 'mero-link-images-v2';

// Maximum number of images to keep in cache (LRU eviction)
const MAX_IMAGE_CACHE_SIZE = 50;

// Resources to cache immediately
// Do NOT pre-cache HTML routes to avoid serving stale SSR markup
const STATIC_ASSETS = [
  '/favicon.ico',
  '/icon-192x192.png',
  '/icon-512x512.png',
  '/apple-touch-icon.png'
];

// API routes to cache
const API_CACHE_PATTERNS = [
  '/api/livePageData',
  '/api/health'
];

// Image source patterns to aggressively cache (user avatars, QR codes, etc)
const IMAGE_CACHE_PATTERNS = [
  'lh3.googleusercontent.com', // Google avatars
  'i.ibb.co', // ImgBB
  'imgur.com', // Imgur
  'i.imgur.com', // Imgur direct
  'cdn.discordapp.com', // Discord
  'media.discordapp.net', // Discord
  '/api/qr' // QR code endpoint
];

// Install event - cache static assets
self.addEventListener('install', (event) => {
  console.log('Service Worker installing...');
  
  event.waitUntil(
    caches.open(STATIC_CACHE)
      .then(cache => {
        console.log('Caching static assets');
        return cache.addAll(STATIC_ASSETS);
      })
      .catch(err => console.error('Failed to cache static assets:', err))
  );
  
  self.skipWaiting();
});

// Activate event - clean old caches
self.addEventListener('activate', (event) => {
  console.log('Service Worker activating...');
  
  event.waitUntil(
    caches.keys().then(keys => {
      return Promise.all(
        keys.map(key => {
          if (key !== STATIC_CACHE && key !== DYNAMIC_CACHE) {
            console.log('Deleting old cache:', key);
            return caches.delete(key);
          }
        })
      );
    })
  );
  
  self.clients.claim();
});

// Fetch event - serve from cache with network fallback
self.addEventListener('fetch', (event) => {
  const { request } = event;
  const url = new URL(request.url);

  // Skip cross-origin requests (except image sources)
  if (url.origin !== location.origin && !isImageSource(url.origin)) {
    return;
  }

  // Never intercept Next.js internal assets to prevent MIME/type issues
  if (url.pathname.startsWith('/_next/')) {
    return;
  }

  // Handle different types of requests
  if (request.method === 'GET') {
    if (isImageRequest(request.url)) {
      event.respondWith(cacheFirstImages(request, IMAGE_CACHE));
      return;
    }
    if (isStaticAsset(request.url)) {
      event.respondWith(cacheFirst(request, STATIC_CACHE));
      return;
    }
    if (isAPIRequest(request.url)) {
      event.respondWith(networkFirst(request, DYNAMIC_CACHE));
      return;
    }
    // For HTML/page navigations: do not intercept; let Next serve fresh SSR
  }
});

// Cache strategies
// Images: aggressively cache with size limit
async function cacheFirstImages(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      // Enforce cache size limit
      await enforceImageCacheSize(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Image fetch failed:', error);
    // Return transparent 1x1 fallback for failed images
    const fallback = new Response(
      new Uint8Array([0x47, 0x49, 0x46, 0x38, 0x39, 0x61, 0x01, 0x00, 0x01, 0x00, 0x80, 0x00, 0x00, 0xFF, 0xFF, 0xFF, 0x00, 0x00, 0x00, 0x21, 0xF9, 0x04, 0x01, 0x00, 0x00, 0x00, 0x00, 0x2C, 0x00, 0x00, 0x00, 0x00, 0x01, 0x00, 0x01, 0x00, 0x00, 0x02, 0x02, 0x44, 0x01, 0x00, 0x3B]),
      {
        status: 200,
        headers: { 'Content-Type': 'image/gif', 'X-Fallback': 'true' }
      }
    );
    return fallback;
  }
}

async function enforceImageCacheSize(cacheName) {
  const cache = await caches.open(cacheName);
  const keys = await cache.keys();
  
  if (keys.length > MAX_IMAGE_CACHE_SIZE) {
    // Remove oldest entries (simple FIFO, not true LRU)
    const toRemove = keys.length - MAX_IMAGE_CACHE_SIZE + 5; // Remove 5 extra to reduce frequency
    for (let i = 0; i < toRemove; i++) {
      await cache.delete(keys[i]);
    }
  }
}

async function cacheFirst(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  if (cachedResponse) {
    return cachedResponse;
  }
  
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    console.error('Network request failed:', error);
    // Return a fallback response if available
    return new Response('Offline', { status: 503 });
  }
}

async function networkFirst(request, cacheName) {
  try {
    const networkResponse = await fetch(request);
    if (networkResponse.ok) {
      const cache = await caches.open(cacheName);
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  } catch (error) {
    const cache = await caches.open(cacheName);
    const cachedResponse = await cache.match(request);
    return cachedResponse || new Response('Offline', { status: 503 });
  }
}

async function staleWhileRevalidate(request, cacheName) {
  const cache = await caches.open(cacheName);
  const cachedResponse = await cache.match(request);
  
  const fetchPromise = fetch(request).then(networkResponse => {
    if (networkResponse.ok) {
      cache.put(request, networkResponse.clone());
    }
    return networkResponse;
  }).catch(() => cachedResponse);
  
  return cachedResponse || fetchPromise;
}

// Helper functions
function isImageRequest(url) {
  // Check for image file extensions
  if (/\.(png|jpeg|jpg|gif|webp|avif|svg)(\?|$)/i.test(url)) {
    return true;
  }
  // Check for image source patterns
  return IMAGE_CACHE_PATTERNS.some(pattern => url.includes(pattern));
}

function isImageSource(origin) {
  // Check if origin is a known image source
  return IMAGE_CACHE_PATTERNS.some(pattern => origin.includes(pattern));
}

function isStaticAsset(url) {
  // Exclude Next.js internals entirely; let the browser handle them
  if (url.includes('/_next/')) return false;
  return url.includes('/favicon.ico') ||
         url.includes('.png') ||
         url.includes('.jpg') ||
         url.includes('.jpeg') ||
         url.includes('.svg');
}

function isAPIRequest(url) {
  return url.includes('/api/');
}

// No page request caching: avoid hydration mismatches from stale HTML

// Background sync for offline actions
self.addEventListener('sync', (event) => {
  if (event.tag === 'background-sync') {
    event.waitUntil(doBackgroundSync());
  }
});

async function doBackgroundSync() {
  // Handle offline form submissions, clicks, etc.
  console.log('Background sync triggered');
}

// Push notifications (for future use)
self.addEventListener('push', (event) => {
  if (event.data) {
    const data = event.data.json();
    const options = {
      body: data.body,
      icon: '/icon-192x192.png',
      badge: '/icon-72x72.png',
      vibrate: [100, 50, 100],
      data: data.data
    };
    
    event.waitUntil(
      self.registration.showNotification(data.title, options)
    );
  }
});

// Handle notification clicks
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  
  event.waitUntil(
    clients.openWindow(event.notification.data.url || '/')
  );
});