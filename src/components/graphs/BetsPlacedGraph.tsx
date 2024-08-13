"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";

interface BetsPlacedData {
  name: string;
  bets: number;
}

const BetsPlacedGraph: React.FC = () => {
  const dummyData: BetsPlacedData[] = [
    { name: "Jan", bets: 4000 },
    { name: "Feb", bets: 3000 },
  ];

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dummyData}
          margin={{
            top: 10, right: 30, left: 20, bottom: 10,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" stroke="#444" />
          <XAxis dataKey="name" stroke="#bbb" />
          <YAxis stroke="#bbb" />
          <Tooltip
            contentStyle={{
              backgroundColor: "#333",
              borderRadius: "8px",
              border: "none",
              color: "#fff",
            }}
            cursor={{ stroke: "rgba(255, 255, 255, 0.1)", strokeWidth: 2 }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Line
            type="monotone"
            dataKey="bets"
            stroke="#ffcccb"
            strokeWidth={3}
            dot={{ r: 6 }}
            activeDot={{ r: 8 }}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BetsPlacedGraph;
