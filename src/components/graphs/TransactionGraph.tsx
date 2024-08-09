"use client";

import React from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";

interface TransactionData {
    date: string;
    totalAmount: number;
}

const TransactionGraph: React.FC = () => {
    // Dummy data
    const dummyData: TransactionData[] = [
        { date: "2024-08-09", totalAmount: 0 },
        { date: "2024-08-10", totalAmount: 100 },
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
                    <XAxis dataKey="date" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="totalAmount" stroke="#8884d8" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default TransactionGraph;
