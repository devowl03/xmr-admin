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
import { useEffect } from "react";
import { ClientApiRequest } from "@/services/types";
import { getTransactionGraph } from "@/services/server/utils";

export default function Home() {
  useEffect(() => {
    (async () => {
      const response = await getTransactionGraph();
      console.log('kokkoko',response);
    })();
  }, []);

  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      <DataTableDemo />
    </main>
  );
}
