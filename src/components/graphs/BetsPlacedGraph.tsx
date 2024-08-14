"use client";

import React, { useEffect, useState } from "react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import { Box, TextField, Button, FormControl, InputLabel, MenuItem, Select } from "@mui/material";
import { getBetsGraph } from "@/services/server/utils";

interface BetsPlacedData {
  name: string;
  bets: number;
}

const BetsPlacedGraph: React.FC = () => {
  const [data, setData] = useState<BetsPlacedData[]>([]);
  const [period, setPeriod] = useState<string>("");
  const [game, setGame] = useState<string>("");
  const [start, setStart] = useState<string>("");
  const [end, setEnd] = useState<string>("");


  const fetchData = async () => {
    try {
      const response = await getBetsGraph(period, game, start, end);
      const result = await response.json();

      const mappedData = result.data.map((item: any) => ({
        name: new Date(item._id).toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        bets: item.totalBetAmount,
      }));

      setData(mappedData);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  useEffect(() => {
    if (period && game) {
      fetchData();
    }
  }, [period, game, start, end]);

  return (
    <div
      style={{
        backgroundColor: "#1a1a1a",
        padding: "20px",
        borderRadius: "12px",
        boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)",
      }}
    >

      <Box sx={{ backgroundColor: "#1a1a1a", borderRadius: "16px", padding: "1.5rem", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.5)" }}>
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
              dataKey="bets"
              stroke="#ffcccb"
              strokeWidth={3}
              dot={{ r: 6 }}
              activeDot={{ r: 8 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </Box>
      <form style={{ marginBottom: "20px", display: "flex" }} className="flex flex-col mt-5">
        <FormControl sx={{ marginTop: "1.5rem" }} variant="outlined" margin="normal" fullWidth>
          <InputLabel sx={{ color: "#bbb", fontSize: "0.9rem" }}>Interval</InputLabel>
          <Select
            value={period}
            onChange={(e) => setPeriod(e.target.value)}
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
        <FormControl variant="outlined" margin="normal" fullWidth>
          <InputLabel sx={{ color: "#bbb", fontSize: "0.9rem" }}>Game</InputLabel>
          <Select
            value={game}
            onChange={(e) => setGame(e.target.value)}
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
            <MenuItem value="Crash" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Crash</MenuItem>
            <MenuItem value="Coinflip" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Coinflip</MenuItem>
            <MenuItem value="Mines" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Mines</MenuItem>
            <MenuItem value="Plinko" sx={{ fontSize: "0.85rem", padding: "6px 12px" }}>Plinko</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Start Date"
          type="date"
          variant="outlined"
          value={start}
          onChange={(e) => setStart(e.target.value)}
          fullWidth
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ shrink: true, style: { color: "#bbb" } }}
          className="mt-4"
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
        />
        <TextField
          label="End Date"
          type="date"
          variant="outlined"
          value={end}
          onChange={(e) => setEnd(e.target.value)}
          fullWidth
          InputProps={{ style: { color: "#fff" } }}
          InputLabelProps={{ shrink: true, style: { color: "#bbb" } }}
          className="mt-6"
          sx={{
            backgroundColor: "#1f1f1f",
            color: "#fff",
            fontSize: "0.85rem",
            borderRadius: "20px",
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
        />
      </form>
    </div>
  );
};

export default BetsPlacedGraph;
