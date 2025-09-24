'use client';

import dynamic from 'next/dynamic';
import { ComponentLoader } from './LoadingComponents';

// Client-side dynamic import with ssr: false
const LiveUserPage = dynamic(() => import('./LiveUserPage'), {
  ssr: false,
  loading: () => (
    <div className="min-h-screen flex items-center justify-center bg-gray-900">
      <div className="text-white text-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-white mx-auto mb-4"></div>
        <p>Loading...</p>
      </div>
    </div>
  )
});

export default function ClientLiveUserPage({ initialData, uri }) {
  return <LiveUserPage initialData={initialData} uri={uri} />;
}