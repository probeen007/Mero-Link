'use client';

import { addDays, differenceInDays, formatISO9075, parseISO } from "date-fns";
import { CartesianGrid, Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";


export default function Chart({ data }) {
  const xLabelKey = Object.keys(data[0]).find(key => key !== 'date');

  const dataWithoutGaps = [];
  data.forEach((value, index) => {
    const date = value.date;
    dataWithoutGaps.push({
      date,
      [xLabelKey]: value?.[xLabelKey] || 0,
    });
    const nextDate = data?.[index + 1]?.date;
    if (date && nextDate) {
      const daysBetween = differenceInDays(
        parseISO(nextDate),
        parseISO(date)
      );
      if (daysBetween > 0) {
        for (let i = 1; i < daysBetween; i++) {
          const dateBetween = formatISO9075(
            addDays(parseISO(date), i)
          ).split(' ')[0];
          dataWithoutGaps.push({
            date: dateBetween,
            [xLabelKey]: 0,
          })
        }
      }
    }
  });

  return (
    <div className="h-60 sm:h-72 w-full">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={dataWithoutGaps}
          margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid horizontal={true} vertical={true} strokeWidth="1" stroke="#f1f5f9" />
          <XAxis dataKey="date" axisLine={true} tickLine={true} tickMargin={8} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <YAxis axisLine={true} tickLine={false} tickMargin={8} tick={{ fill: '#94a3b8', fontSize: 11 }} />
          <Tooltip />
          <Line
            type="monotone" dataKey={xLabelKey} stroke="#2563eb" strokeWidth="3" dot={{ r: 3 }} activeDot={{ r: 5 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
