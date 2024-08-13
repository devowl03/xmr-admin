import xior from "xior";
import { z } from "zod";
import { apiRequest, User } from "../types";
import axios from "axios";

export type SortBy = "createdAt" | "totalBet" | "totalWon" | "gamePlayed";
export const userList = async (props: {
  username?: string;
  month?: string;
  sortBy?: SortBy;
  order?: "desc" | "asc";
  page?: number;
  limit?: number;
}) => {
  return apiRequest<{
    currentPage: number;
    limit: number;
    totalPages: number;
    totalUsers: number;
    users: Array<User>;
  }>("GET", "/api/admin/userList", {
    params: {
      name: props.username || "",
      month: props.month || "",
      sortBy: props.sortBy || "createdAt",
      order: props.order || "asc",
      page: props.page ? props.page + 1 : 1,
      limit: props.limit || 10,
    },
  });
};

export const currentMonthInfo = async () => {
  return apiRequest<User | string>("GET", "/api/admin/currentMonthInfo");
};

export const deleteUser = async (username: string) => {
  return apiRequest<User | string>("POST", "/api/admin/deleteUser", {
    data: {
      username,
    },
  });
};

type Period = "daily" | "weekly" | "monthly" | "yearly";
export const revenueInfo = async (period: Period = "daily") => {
  return apiRequest<{
    userLosses: number;
    userProfits: number;
    platformHandouts: number;
    revenue: number;
  }>("GET", "/api/admin/revenueInfo");
};
type UserWithNumberBalance = Omit<User, "balance"> & {
  balance: string;
};
export const editUser = async (
  username: string,
  newUser: Partial<UserWithNumberBalance>
) => {
  return apiRequest<User | string>("POST", "/api/admin/editUser", {
    data: {
      username,
      ...newUser,
    },
  });
};

export const getTransactionGraph = async (interval: string, type: string) => {
  const response = await fetch(
    `https://a.theaibunny.com/api/admin/getTransactionGraph?interval=${interval}&type=${type}`
  );
  const data = await response.json();
  return data;
};
