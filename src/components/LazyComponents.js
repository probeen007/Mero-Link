// src/components/LazyComponents.js
// Lazy loaded components for better performance

import dynamic from 'next/dynamic';
import { Suspense } from 'react';

// Loading skeletons
export const FormSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-8 bg-gray-200 rounded mb-4"></div>
    <div className="h-32 bg-gray-200 rounded mb-4"></div>
    <div className="h-10 bg-gray-200 rounded mb-2"></div>
    <div className="h-10 bg-gray-200 rounded mb-2"></div>
  </div>
);

export const ChartSkeleton = () => (
  <div className="animate-pulse">
    <div className="h-6 bg-gray-200 rounded mb-4 w-1/3"></div>
    <div className="h-64 bg-gray-200 rounded"></div>
  </div>
);

// Lazy loaded components with loading states
export const LazyPageLinksForm = dynamic(
  () => import('@/components/forms/PageLinksForm'),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

export const LazyPageButtonsForm = dynamic(
  () => import('@/components/forms/PageButtonsForm'),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

export const LazyPageSettingsForm = dynamic(
  () => import('@/components/forms/PageSettingsForm'),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

export const LazyThemeSelectorForm = dynamic(
  () => import('@/components/forms/ThemeSelectorForm'),
  {
    loading: () => <FormSkeleton />,
    ssr: false
  }
);

export const LazyChart = dynamic(
  () => import('@/components/Chart'),
  {
    loading: () => <ChartSkeleton />,
    ssr: false
  }
);

// Higher order component for lazy loading with suspense
export function withLazyLoading(Component, LoadingComponent = FormSkeleton) {
  return function LazyWrapper(props) {
    return (
      <Suspense fallback={<LoadingComponent />}>
        <Component {...props} />
      </Suspense>
    );
  };
}
