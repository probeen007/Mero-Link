import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { PiChartLineUpBold } from 'react-icons/pi';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import dbConnect from '@/libs/mongoClient';
import { Event } from '@/models/Event';
import { Page } from '@/models/Page';
import { SOCIALS } from '@/libs/socials';
import { Card, EmptyState } from '@/components/ui';
import AnalyticsChart from '@/components/dashboard/AnalyticsChart';

export const metadata = { title: 'Analytics' };

const DAYS = 30;
const fmt = new Intl.NumberFormat('en');

function Stat({ label, value, sub, tone }) {
  return (
    <div className={`rounded-card p-5 ${tone || 'border border-line bg-surface'}`}>
      <p className="text-sm font-medium opacity-75">{label}</p>
      <p className="mt-2 font-mono text-3xl font-semibold tracking-tight">{value}</p>
      {sub && <p className="mt-1 text-xs opacity-70">{sub}</p>}
    </div>
  );
}

export default async function AnalyticsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/login');
  await dbConnect();
  const page = await Page.findOne({ owner: session.user.email }).select('uri links buttons').lean();
  if (!page) redirect('/account');

  const since = new Date(Date.now() - (DAYS - 1) * 86400000);
  since.setUTCHours(0, 0, 0, 0);

  const [daily, totals, perLink] = await Promise.all([
    Event.aggregate([
      { $match: { page: page.uri, createdAt: { $gte: since } } },
      { $group: { _id: { d: { $dateToString: { date: '$createdAt', format: '%Y-%m-%d' } }, t: '$type' }, n: { $sum: 1 } } },
    ]),
    Event.aggregate([
      { $match: { page: page.uri } },
      { $group: { _id: '$type', n: { $sum: 1 } } },
    ]),
    Event.aggregate([
      { $match: { page: page.uri, type: 'click' } },
      { $group: { _id: '$uri', n: { $sum: 1 } } },
    ]),
  ]);

  // Fill every day in the window so the chart has no gaps.
  const series = Array.from({ length: DAYS }, (_, i) => {
    const date = new Date(since.getTime() + i * 86400000).toISOString().slice(0, 10);
    return { date, views: 0, clicks: 0 };
  });
  const byDate = Object.fromEntries(series.map((s) => [s.date, s]));
  for (const row of daily) {
    const day = byDate[row._id.d];
    if (day && row._id.t === 'view') day.views = row.n;
    if (day && row._id.t === 'click') day.clicks = row.n;
  }

  const total = Object.fromEntries(totals.map((t) => [t._id, t.n]));
  const views = total.view || 0;
  const clicks = total.click || 0;
  const views30 = series.reduce((s, d) => s + d.views, 0);
  const clicks30 = series.reduce((s, d) => s + d.clicks, 0);
  const ctr = views30 ? ((clicks30 / views30) * 100).toFixed(1) : '0.0';

  const clickMap = Object.fromEntries(perLink.map((r) => [r._id, r.n]));
  const norm = (u) => { try { return new URL(u).href; } catch { return u; } };
  const linkRows = (page.links || [])
    .filter((l) => l.type !== 'header' && l.url)
    .map((l) => ({ key: l.key, title: l.title || l.url, url: l.url, n: clickMap[norm(l.url)] || 0 }))
    .sort((a, b) => b.n - a.n);
  const max = Math.max(1, ...linkRows.map((r) => r.n));
  const socialRows = SOCIALS
    .filter((s) => page.buttons?.[s.key])
    .map((s) => ({ ...s, n: clickMap[norm(page.buttons[s.key])] || 0 }))
    .filter((s) => s.n > 0)
    .sort((a, b) => b.n - a.n);

  return (
    <div className="grid gap-8">
      <div>
        <h1 className="font-display text-3xl font-extrabold tracking-tight">Analytics</h1>
        <p className="mt-1 text-sm text-muted">Last {DAYS} days, updated live.</p>
      </div>

      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Views" value={fmt.format(views30)} sub={`${fmt.format(views)} all time`} tone="bg-lime text-on-sticker" />
        <Stat label="Clicks" value={fmt.format(clicks30)} sub={`${fmt.format(clicks)} all time`} tone="bg-sky text-on-sticker" />
        <Stat label="Click rate" value={`${ctr}%`} sub="Clicks per view" />
        <Stat label="Today" value={fmt.format(series.at(-1).views)} sub={`${fmt.format(series.at(-1).clicks)} clicks`} />
      </div>

      <Card className="p-4 sm:p-6">
        <div className="mb-4 flex flex-wrap items-center gap-4 text-sm">
          <h2 className="mr-auto font-display text-lg font-bold">Views and clicks</h2>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-accent" /> Views</span>
          <span className="inline-flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-ink" /> Clicks</span>
        </div>
        {views30 + clicks30 > 0 ? (
          <AnalyticsChart data={series} />
        ) : (
          <EmptyState icon={PiChartLineUpBold} title="No visits yet">Share your link and the first views will show up here.</EmptyState>
        )}
      </Card>

      <Card className="p-4 sm:p-6">
        <h2 className="font-display text-lg font-bold">Top links</h2>
        {linkRows.length === 0 ? (
          <p className="mt-3 text-sm text-muted">Add links to see which ones people tap.</p>
        ) : (
          <ol className="mt-4 grid gap-4">
            {linkRows.map((r) => (
              <li key={r.key} className="grid gap-1.5">
                <div className="flex items-baseline justify-between gap-4 text-sm">
                  <span className="truncate font-medium">{r.title}</span>
                  <span className="shrink-0 font-mono">{fmt.format(r.n)} <span className="text-muted">{views ? `${((r.n / views) * 100).toFixed(1)}%` : ''}</span></span>
                </div>
                <div className="h-2 rounded-full bg-accent" style={{ width: `${Math.max(2, (r.n / max) * 100)}%` }} aria-hidden />
              </li>
            ))}
          </ol>
        )}
      </Card>

      {socialRows.length > 0 && (
        <Card className="p-4 sm:p-6">
          <h2 className="font-display text-lg font-bold">Social icons</h2>
          <ul className="mt-4 flex flex-wrap gap-2">
            {socialRows.map(({ key, label, icon: Icon, n }) => (
              <li key={key} className="inline-flex items-center gap-2 rounded-full border border-line px-3 py-1.5 text-sm">
                <Icon aria-hidden /> {label} <span className="font-mono text-muted">{fmt.format(n)}</span>
              </li>
            ))}
          </ul>
        </Card>
      )}
    </div>
  );
}
