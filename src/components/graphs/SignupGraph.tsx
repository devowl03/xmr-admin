"use client";

import React, { useEffect, useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Box, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getUsersCount } from "@/services/server/utils";

interface SignupData {
  period: string
  startDate: string
  endDate: string
  count: number
}

const SignupGraph: React.FC = () => {
  const [data, setData] = useState<SignupData[]>([]);
  const [interval, setInterval] = useState("daily");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await getUsersCount(interval, false);
        console.log(result.data);
        setData(result?.data)
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchData();
  }, [interval]);

  return (
    <div
      style={{
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
      }}
    >
      <Box
        className="bg-gray-800 "
        sx={{
          borderRadius: "16px",
          padding: "1.5rem",
          boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
        }}
      >
        <ResponsiveContainer width="100%" height={300}>
          <BarChart
            data={data}
            margin={{
              top: 10,
              right: 30,
              left: 20,
              bottom: 10,
            }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#444" />
            <XAxis dataKey="name" stroke="#bbb" padding={{ left: 20, right: 20 }} />
            <YAxis stroke="#bbb" padding={{ top: 20, bottom: 20 }} />
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
      </Box>
      <form
        className="flex flex-col mt-5 w-[200px] md:w-[500px]">
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
              value="day"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Daily
            </MenuItem>
            <MenuItem
              value="week"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Weekly
            </MenuItem>
            <MenuItem
              value="month"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Monthly
            </MenuItem>
            <MenuItem
              value="year"
              sx={{ fontSize: "0.85rem", padding: "6px 12px" }}
            >
              Yearly
            </MenuItem>
          </Select>
        </FormControl>
      </form>
    </div>
  );
};

export default SignupGraph;
