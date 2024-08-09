"use client";
import Image from "next/image";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { Button } from "@mui/material";
import { BarChart } from "@mui/x-charts/BarChart";
import { DataTableDemo } from "./table";
import GradientLineChart from "./chart";

export default function Home() {
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <DataTableDemo />
    </main>
  );
}
