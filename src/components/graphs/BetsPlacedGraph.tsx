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
    <Box>
      <ResponsiveContainer width="100%" height={300}>
        <LineChart
          data={dummyData}
          margin={{
            top: 5, right: 30, left: 20, bottom: 5,
          }}
        >
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="name" />
          <YAxis />
          <Tooltip />
          <Legend />
          <Line type="monotone" dataKey="bets" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default BetsPlacedGraph;
