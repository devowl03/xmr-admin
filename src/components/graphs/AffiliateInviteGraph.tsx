"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";

interface AffiliateInviteData {
  name: string;
  invites: number;
}

const AffiliateInviteGraph: React.FC = () => {
  const dummyData: AffiliateInviteData[] = [
    { name: "Week 1", invites: 30 },
    { name: "Week 2", invites: 45 },
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
          <Line type="monotone" dataKey="invites" stroke="#8884d8" />
        </LineChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default AffiliateInviteGraph;
