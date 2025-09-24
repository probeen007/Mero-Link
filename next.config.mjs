/** @type {import('next').NextConfig} */
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const awsRegion = process.env.AWS_REGION || 'us-east-1';
const s3Bucket = process.env.S3_BUCKET_NAME || 'mero-link';

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'standalone',
  typedRoutes: true,

  experimental: {
    optimizePackageImports: ['@fortawesome/react-fontawesome', '@fortawesome/free-solid-svg-icons'],
  },

  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',
  },

  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = { poll: 1000, aggregateTimeout: 300 };
    }
    config.resolve.alias = { ...config.resolve.alias, '@': path.resolve(__dirname, 'src') };
    return config;
  },

  images: {
    formats: ['image/webp', 'image/avif'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    remotePatterns: [
      { protocol: 'https', hostname: 'lh3.googleusercontent.com' },
      { protocol: 'https', hostname: 'i.ibb.co' },
      // Explicit S3 endpoints that we generate
      { protocol: 'https', hostname: `${s3Bucket}.s3.${awsRegion}.amazonaws.com` },
      { protocol: 'https', hostname: `${s3Bucket}.s3.amazonaws.com` },
    ],
    minimumCacheTTL: 31536000,
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          { key: 'X-DNS-Prefetch-Control', value: 'on' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'origin-when-cross-origin' },
        ],
      },
      {
        source: '/api/(.*)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=0, s-maxage=60, stale-while-revalidate=300' },
        ],
      },
    ];
  },

  compress: true,
  poweredByHeader: false,
};

export default nextConfig;
