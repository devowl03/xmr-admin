"use client";

import { FunctionComponent, HTMLAttributes } from "react";
const queryClient = new QueryClient();

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
interface ProviderProps extends HTMLAttributes<HTMLDivElement> {}

const Provider: FunctionComponent<ProviderProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
};

export default Provider;
