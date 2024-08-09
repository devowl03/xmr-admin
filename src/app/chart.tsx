import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  DotProps,
  Line,
} from "recharts";

const data = [
  {
    name: "Page A",
    uv: 4000,
  },
  {
    name: "Page B",
    uv: 3000,
  },
  {
    name: "Page C",
    uv: 2000,
  },
  {
    name: "Page D",
    uv: 2780,
  },
  {
    name: "Page E",
    uv: 1890,
  },
  {
    name: "Page F",
    uv: 2390,
  },
  {
    name: "Page G",
    uv: 3490,
  },
];

const CustomDot: React.FC<DotProps> = ({ cx, cy }) => {
  if (!cx || !cy) return null;
  return (
    <image
      href="/mark.png" // Replace with your custom icon path
      x={cx - 20} // Adjust the x position to center the image
      y={cy - 25} // Adjust the y position to place the image above the point
      height={40} // Adjust height as needed
      width={40} // Adjust width as needed
    />
  );
};

const GradientAreaChart: React.FC = () => (
  <ResponsiveContainer width="100%" height={400}>
    <AreaChart
      data={data}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
    >
      <defs>
        <linearGradient
          id="colorUv"
          stopOpacity={0.1}
          opacity={0.1}
          x1="0"
          y1="0"
          x2="0"
          y2="1"
        >
          <stop offset="0%" stopColor="#FF3235" stopOpacity={"60%"} />
          <stop offset="80%" stopColor="#FF3235" stopOpacity={0} />
        </linearGradient>
      </defs>
      <CartesianGrid
        strokeDasharray="3 0 3"
        vertical={false}
        stopColor="#6D3434"
        stroke="#6D3434"
      />
      <XAxis dataKey="name" />
      <YAxis orientation="right" />
      <Tooltip /> {/* Disables the hover effect */}
      <Area
        type="linear"
        dataKey="uv"
        stroke="#FF7E3E"
        strokeWidth={2}
        fill="url(#colorUv)"
        dot={<CustomDot />}
        activeDot={true} // Disables the hover effect
      />
    </AreaChart>
  </ResponsiveContainer>
);

export default GradientAreaChart;
