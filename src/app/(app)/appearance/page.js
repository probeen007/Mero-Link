import AppearanceEditor from '@/components/dashboard/AppearanceEditor';

export const metadata = { title: 'Appearance' };

export default async function AppearancePage({ searchParams }) {
  const { welcome } = await searchParams;
  return <AppearanceEditor welcome={welcome === '1'} />;
}
