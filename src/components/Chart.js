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
    <div>
      <ResponsiveContainer width="100%" aspect={3}>
        <LineChart width={730} height={250} data={dataWithoutGaps}
          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid horizontal={true} vertical={true} strokeWidth="2" stroke="#f5f5f5" />
          <XAxis dataKey="date" axisLine={true} tickLine={true} tickMargin={10} tick={{ fill: '#aaa' }} />
          <YAxis axisLine={true} tickLine={false} tickMargin={10} tick={{ fill: '#aaa' }} />
          <Tooltip />
          <Line
            type="monotone" dataKey={xLabelKey} stroke="blue" strokeWidth="2" />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}