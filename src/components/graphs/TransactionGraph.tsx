"use client";

import React, { useState, useEffect } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Bar,
} from "recharts";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getTransactionGraph } from "@/services/server/utils";

interface TransactionData {
  date: string;
  totalAmount: number;
}

const TransactionGraph: React.FC = () => {
  const [data, setData] = useState<TransactionData[]>([]);
  const [interval, setInterval] = useState("daily");
  const [type, setType] = useState("deposit");

  useEffect(() => {
    const fetchData = async () => {
      const result = await getTransactionGraph(interval, type);
      if (result.status === 200) {
        setData(result?.data);
      }
    };
    fetchData();
  }, [interval, type]);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        color: "#fff",
        padding: "1.5rem",
        borderRadius: "16px",
        boxShadow: "0px 6px 20px rgba(0, 0, 0, 0.6)",
      }}
    >
      <Box
        sx={{
          backgroundColor: "#1a1a1a",
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <LineChart
            data={data}
            margin={{
              top: 20,
              right: 30,
              left: 0,
              bottom: 0,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="date" stroke="#aaa" />
            <YAxis stroke="#aaa" />
            <Tooltip
              contentStyle={{
                backgroundColor: "#222",
                borderRadius: "10px",
                borderColor: "#444",
                color: "#fff",
              }}
              itemStyle={{ color: "#ddd" }}
              cursor={{ stroke: "rgba(255, 255, 255, 0.1)", strokeWidth: 2 }}
            />
            <Legend wrapperStyle={{ color: "#fff" }} />
            <Line
              type="monotone"
              dataKey="totalAmount"
              fill="#add8e6"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
            <Bar dataKey="visits" fill="#add8e6" radius={[10, 10, 0, 0]} />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <form
        style={{ marginBottom: "20px", display: "flex" }}
        className="flex flex-col mt-5"
      >
        <FormControl
          sx={{ marginTop: "1.5rem" }}
          variant="outlined"
          margin="normal"
          fullWidth
        >
          <InputLabel sx={{ color: "#bbb", fontSize: "0.9rem" }}>
            Interval
          </InputLabel>
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
            <MenuItem
              value="daily"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Daily
            </MenuItem>
            <MenuItem
              value="weekly"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Weekly
            </MenuItem>
            <MenuItem
              value="monthly"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Monthly
            </MenuItem>
            <MenuItem
              value="yearly"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Yearly
            </MenuItem>
          </Select>
        </FormControl>

        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel sx={{ color: "#bbb", fontSize: "0.9rem" }}>Type</InputLabel>
          <Select
            value={type}
            onChange={(e) => setType(e.target.value)}
            label="Type"
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
            <MenuItem
              value="deposit"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Deposit
            </MenuItem>
            <MenuItem
              value="withdraw"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Withdraw
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default TransactionGraph;
