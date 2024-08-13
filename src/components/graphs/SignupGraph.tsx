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
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
      }}
    >
      <ResponsiveContainer width="100%" height={300}>
        <BarChart
          data={dummyData}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 10,
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
            cursor={{ fill: "rgba(255, 255, 255, 0.1)" }}
          />
          <Legend wrapperStyle={{ color: "#fff" }} />
          <Bar dataKey="signups" fill="#ffcccb" radius={[10, 10, 0, 0]} />
          <Bar dataKey="visits" fill="#add8e6" radius={[10, 10, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default SignupGraph;
