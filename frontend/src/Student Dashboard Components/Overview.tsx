import React from "react";
import { BarChart, Bar, XAxis, Tooltip, ResponsiveContainer, TooltipProps, Cell } from "recharts";

interface DataPoint {
  date: string;
  videos: number;
}

const data: DataPoint[] = [
  { date: "1 Feb", videos: 2 },
  { date: "2 Feb", videos: 3 },
  { date: "3 Feb", videos: 4 },
  { date: "4 Feb", videos: 2 },
  { date: "5 Feb", videos: 2 },
  { date: "6 Feb", videos: 3 },
  { date: "7 Feb", videos: 4 },
  { date: "8 Feb", videos: 6 }, // Highlighted bar
  { date: "9 Feb", videos: 3 },
  { date: "10 Feb", videos: 4 },
  { date: "11 Feb", videos: 2 },
  { date: "12 Feb", videos: 4 },
];

const CustomTooltip: React.FC<TooltipProps<number, string>> = ({ active, payload }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-black text-white text-xs px-2 py-1 rounded-md shadow-md">
        {`${payload[0].value} Video`}
      </div>
    );
  }
  return null;
};

const Overview: React.FC = () => {
  return (
    <div className="bg-white p-6 rounded-2xl shadow-md w-full font-Poppins">
      <h2 className="text-lg font-semibold">Overview</h2>
      <p className="text-gray-500 text-sm">Video Finished (Day)</p>
      <div className="flex justify-end mb-2">
        <button className="text-gray-600 bg-gray-100 px-3 py-1 text-sm rounded-lg">Category ▼</button>
      </div>
      <ResponsiveContainer width="100%" height={200}>
        <BarChart data={data}>
          <XAxis dataKey="date" tick={{ fontSize: 12, fill: "#9CA3AF" }} />
          <Tooltip content={<CustomTooltip />} cursor={{ fill: "#E5E7EB" }} />
          <Bar dataKey="videos" radius={[6, 6, 0, 0]}>
            {data.map((entry) => (
              <Cell key={entry.date} fill={entry.date === "8 Feb" ? "#1E293B" : "#CBD5E1"} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default Overview;
