'use client';
import dynamic from 'next/dynamic';
import { Skeleton } from '@/components/ui';

// recharts is ~100KB; only load it on the analytics page, after hydration.
const Chart = dynamic(() => import('@/components/Chart'), {
  ssr: false,
  loading: () => <Skeleton className="h-64 w-full" />,
});

export default function AnalyticsChart({ data }) {
  return <Chart data={data} />;
}
