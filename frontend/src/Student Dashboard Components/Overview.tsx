import React, { useEffect, useState } from "react";
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
  { date: "8 Feb", videos: 6 }, 
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
  // State to manage responsive display of data
  const [displayData, setDisplayData] = useState<DataPoint[]>(data);
  
  // Adjust the data points shown based on screen width
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        // For small screens show only 6 data points
        setDisplayData(data.slice(data.length - 6));
      } else if (window.innerWidth < 1024) {
        // For medium screens show only 8 data points
        setDisplayData(data.slice(data.length - 8));
      } else {
        // For large screens show all data points
        setDisplayData(data);
      }
    };
    
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="w-full font-Poppins">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-3 gap-2">
        <div>
          <h2 className="text-lg font-semibold">Overview</h2>
          <p className="text-gray-500 text-sm">Video Finished (Day)</p>
        </div>
        <button className="text-gray-600 bg-gray-100 px-3 py-1 text-sm rounded-lg self-start sm:self-auto">
          Category ▼
        </button>
      </div>
      
      <div className="w-full h-40 sm:h-52 lg:h-64">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={displayData} margin={{ top: 10, right: 10, left: -20, bottom: 5 }}>
            <XAxis 
              dataKey="date" 
              tick={{ fontSize: 10, fill: "#9CA3AF" }} 
              tickMargin={5}
              axisLine={false}
              tickLine={false}
            />
            <Tooltip content={<CustomTooltip />} cursor={{ fill: "#E5E7EB" }} />
            <Bar dataKey="videos" radius={[6, 6, 0, 0]}>
              {displayData.map((entry) => (
                <Cell 
                  key={entry.date} 
                  fill={entry.date === "8 Feb" ? "#1E293B" : "#CBD5E1"} 
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Overview;