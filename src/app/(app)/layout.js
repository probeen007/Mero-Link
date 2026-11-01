import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { Toaster } from 'react-hot-toast';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/libs/mongoClient';
import { Page } from '@/models/Page';
import { User } from '@/models/User';
import { Event } from '@/models/Event';
import { serializePage, serializeUser } from '@/libs/pageData';
import { EditorProvider } from '@/components/dashboard/EditorProvider';
import Shell from '@/components/dashboard/Shell';
import ClaimUsername from '@/components/dashboard/ClaimUsername';

export const metadata = {
  title: 'Dashboard',
  robots: { index: false, follow: false },
};

export default async function AppLayout({ children }) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email) redirect('/login');

  await dbConnect();
  const [page, user] = await Promise.all([
    Page.findOne({ owner: session.user.email }).lean(),
    User.findOne({ email: session.user.email }).lean(),
  ]);

  if (!page) return <ClaimUsername name={session.user.name} />;

  const clickRows = await Event.aggregate([
    { $match: { page: page.uri, type: 'click' } },
    { $group: { _id: '$uri', count: { $sum: 1 } } },
  ]);
  const clicks = Object.fromEntries(clickRows.map((r) => [r._id, r.count]));

  return (
    <EditorProvider
      page={serializePage(page)}
      user={{ ...serializeUser(user), name: session.user.name || '', email: session.user.email }}
      clicks={clicks}
    >
      <Toaster position="bottom-center" toastOptions={{ className: '!rounded-full !bg-ink !text-bg !text-sm !font-medium' }} />
      <Shell>{children}</Shell>
    </EditorProvider>
  );
}
