"use client";

import React from "react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";

interface SignupData {
  name: string;
  signups: number;
  visits: number;
}

const SignupGraph: React.FC = () => {
  const dummyData: SignupData[] = [
    { name: "Week 1", signups: 4000, visits: 2400 },
    { name: "Week 2", signups: 3000, visits: 1398 },
  ];

  return (
    <Box>
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
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
          <Bar dataKey="signups" fill="#8884d8" />
          <Bar dataKey="visits" fill="#82ca9d" />
        </BarChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default SignupGraph;
