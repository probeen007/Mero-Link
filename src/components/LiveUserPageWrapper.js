'use client';

import dynamic from 'next/dynamic';

// Dynamic import with ssr: false in a client component
const LiveUserPage = dynamic(
  () => import('@/components/LiveUserPage'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
          <p>Loading...</p>
        </div>
      </div>
    )
  }
);

export default function LiveUserPageWrapper({ initialData, uri }) {
  // Add safety checks
  if (!initialData) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-900">
        <div className="text-center text-white">
          <p>No data available</p>
        </div>
      </div>
    );
  }

  return <LiveUserPage initialData={initialData} uri={uri} />;
}