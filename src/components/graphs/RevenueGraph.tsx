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
        const fetchData = async () => {
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
                    data={data}
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
                        dataKey="revenue"
                        stroke="#ffcccb"
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="userLosses"
                        stroke="#add8e6"
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                    />
                    <Line
                        type="monotone"
                        dataKey="platformHandouts"
                        stroke="#ffdab9"
                        strokeWidth={3}
                        dot={{ r: 6 }}
                        activeDot={{ r: 8 }}
                    />
                </LineChart>
            </ResponsiveContainer>
        </div>
    );
};

export default RevenueGraph;
