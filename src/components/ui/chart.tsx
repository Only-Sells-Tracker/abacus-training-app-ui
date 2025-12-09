import { useState } from 'react';
import { Select } from '@radix-ui/react-select'; // Example Radix component
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts'; // Recharts components

// ... (Rest of your Radix Select components and logic) ...

const ChartDashboard = () => {
  const [chartType, setChartType] = useState('bar');
  const data = [
    {
      name: 'Page A', // Matches XAxis dataKey="name"
      uv: 4000,       // Matches Bar dataKey="uv"
      pv: 2400,       // Matches Bar dataKey="pv"
      amt: 2400,
    },
    {
      name: 'Page B',
      uv: 3000,
      pv: 1398,
      amt: 2210,
    },
    {
      name: 'Page C',
      uv: 2000,
      pv: 9800,
      amt: 2290,
    },
    {
      name: 'Page D',
      uv: 2780,
      pv: 3908,
      amt: 2000,
    },
    {
      name: 'Page E',
      uv: 1890,
      pv: 4800,
      amt: 2181,
    },
    {
      name: 'Page F',
      uv: 2390,
      pv: 3800,
      amt: 2500,
    },
    {
      name: 'Page G',
      uv: 3490,
      pv: 4300,
      amt: 2100,
    },
  ];

  return (
    <div className="p-4">
      <p style={{color: "white"}}>Test Test Test Test</p>
      {/* A Radix Select component to control the chart type */}
      <Select value={chartType} onValueChange={setChartType}>
        {/* ... Radix Select components ... */}
      </Select>

      {/* The Recharts visualization area */}
      <div className="h-[400px] w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Bar dataKey="value" fill="#8884d8" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};
export default ChartDashboard;