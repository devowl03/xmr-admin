"use client";

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box } from "@mui/material";

interface RevenueData {
    name: string;
    revenue: number;
    userLosses: number;
    platformHandouts: number;
}

const RevenueGraph: React.FC = () => {
    const [data, setData] = useState<RevenueData[]>([]);

    useEffect(() => {
        // Simulate fetching data
        const fetchData = async () => {
            // Uncomment and use real API when ready
            // const response = await revenueInfo("monthly");
            // setData(response.data);

            // Using dummy data for now
            const dummyData: RevenueData[] = [
                { name: "Jan", revenue: 4000, userLosses: 2400, platformHandouts: 2400 },
                { name: "Feb", revenue: 3000, userLosses: 1398, platformHandouts: 2210 },
                { name: "Mar", revenue: 2000, userLosses: 9800, platformHandouts: 2290 },
                { name: "Apr", revenue: 2780, userLosses: 3908, platformHandouts: 2000 },
            ];
            setData(dummyData);
        };

        fetchData();
    }, []);

    return (
        <Box>
            <ResponsiveContainer width="100%" height={300}>
                <LineChart
                    data={data}
                    margin={{
                        top: 5, right: 30, left: 20, bottom: 5,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Legend />
                    <Line type="monotone" dataKey="revenue" stroke="#8884d8" />
                    <Line type="monotone" dataKey="userLosses" stroke="#82ca9d" />
                    <Line type="monotone" dataKey="platformHandouts" stroke="#ffc658" />
                </LineChart>
            </ResponsiveContainer>
        </Box>
    );
};

export default RevenueGraph;
