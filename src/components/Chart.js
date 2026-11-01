'use client';
import { Area, AreaChart, CartesianGrid, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

const short = (d) => new Date(`${d}T00:00:00Z`).toLocaleDateString('en', { month: 'short', day: 'numeric', timeZone: 'UTC' });

function Tip({ active, payload, label }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl border border-line bg-surface px-3 py-2 text-sm shadow-lift">
      <p className="font-medium">{short(label)}</p>
      {payload.map((p) => (
        <p key={p.dataKey} className="font-mono text-muted">{p.dataKey}: <span className="text-ink">{p.value}</span></p>
      ))}
    </div>
  );
}

export default function Chart({ data }) {
  return (
    <div className="h-64 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 8, left: -24, bottom: 0 }}>
          <defs>
            <linearGradient id="viewsFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(var(--accent))" stopOpacity={0.3} />
              <stop offset="100%" stopColor="rgb(var(--accent))" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid vertical={false} stroke="rgb(var(--line))" />
          <XAxis dataKey="date" tickFormatter={short} tickLine={false} axisLine={false} minTickGap={24} tick={{ fill: 'rgb(var(--muted))', fontSize: 12 }} />
          <YAxis allowDecimals={false} tickLine={false} axisLine={false} tick={{ fill: 'rgb(var(--muted))', fontSize: 12 }} />
          <Tooltip content={<Tip />} cursor={{ stroke: 'rgb(var(--line))' }} />
          <Area type="monotone" dataKey="views" stroke="rgb(var(--accent))" strokeWidth={2.5} fill="url(#viewsFill)" />
          <Area type="monotone" dataKey="clicks" stroke="rgb(var(--ink))" strokeWidth={2} fill="transparent" />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}
