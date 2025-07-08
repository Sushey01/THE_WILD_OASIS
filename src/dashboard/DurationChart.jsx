import React from 'react';
import {
  PieChart,
  Pie,
  Tooltip,
  ResponsiveContainer,
  Cell,
  Legend,
} from 'recharts';

// Sample data
const data01 = [
  { name: 'Short (1-2 days)', value: 10 },
  { name: 'Medium (3-5 days)', value: 20 },
  { name: 'Long (6+ days)', value: 5 },
];

const data02 = [
  { name: 'With Breakfast', value: 25 },
  { name: 'Without Breakfast', value: 10 },
];

const COLORS = ['#8884d8', '#82ca9d', '#ffc658'];

const DurationChart = () => {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data01}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={60}
          fill="#8884d8"
          label
        >
          {data01.map((_, index) => (
            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
          ))}
        </Pie>

        <Pie
          data={data02}
          dataKey="value"
          nameKey="name"
          cx="50%"
          cy="50%"
          innerRadius={70}
          outerRadius={90}
          fill="#82ca9d"
          label
        >
          {data02.map((_, index) => (
            <Cell key={`cell2-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
          ))}
        </Pie>

        <Tooltip />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
};

export default DurationChart;
