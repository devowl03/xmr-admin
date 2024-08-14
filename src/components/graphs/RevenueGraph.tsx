"use client";

import React, { useState, useEffect } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getRevenueInfo } from "@/services/server/utils";

interface RevenueData {
    name: string;
    revenue: number;
    userLosses: number;
    platformHandouts: number;
}

const RevenueGraph: React.FC = () => {
    const [data, setData] = useState<RevenueData[]>([]);
    const [interval, setInterval] = useState("daily");

    useEffect(() => {
        const fetchData = async () => {
            try {
                const result = await getRevenueInfo(interval);

                const transformedData = Object.keys(result.data).map((key) => ({
                    name: key,
                    revenue: result.data[key].revenue,
                    userLosses: result.data[key].userLosses,
                    platformHandouts: result.data[key].platformHandouts,
                }));

                setData(transformedData);
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        };

        fetchData();
    }, [interval]);

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
            <FormControl sx={{ marginTop: "1.5rem" }} variant="outlined" margin="normal" fullWidth>
                <InputLabel sx={{ color: "#bbb", fontSize: "0.9rem" }}>Interval</InputLabel>
                <Select
                    value={interval}
                    onChange={(e) => setInterval(e.target.value)}
                    label="Interval"
                    sx={{
                        backgroundColor: "#1f1f1f",
                        color: "#fff",
                        fontSize: "0.85rem",
                        borderRadius: "10px",
                        "& .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#555",
                        },
                        "&:hover .MuiOutlinedInput-notchedOutline": {
                            borderColor: "#888",
                        },
                        "& .MuiSvgIcon-root": {
                            color: "#fff",
                        },
                    }}
                >
                    <MenuItem value="daily" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Daily</MenuItem>
                    <MenuItem value="weekly" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Weekly</MenuItem>
                    <MenuItem value="monthly" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Monthly</MenuItem>
                    <MenuItem value="yearly" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Yearly</MenuItem>
                </Select>
            </FormControl>
        </div>
    );
};

export default RevenueGraph;
