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

export const getRevenueInfo = async (interval: string) => {
  const response = await fetch(
    `https://a.theaibunny.com/api/admin/revenueInfo?period=${interval}`
  );
  const data = await response.json();
  return data;
};

export const getUsersCount = async (interval: string, invite?: boolean) => {
  const response = await fetch(
    `https://a.theaibunny.com/api/admin/getUsersCountByPeriod?period=${interval}&has_invite=${invite}`
  );
  const data = await response.json();
  return data;
};

export const getBetsGraph = async (
  period: string,
  game: string,
  start?: string,
  end?: string
) => {
  let queryString = `https://a.theaibunny.com/api/admin/getBetsTotalsByPeriod?period=${period}&game=${game}`;
  if (start) {
    queryString += `&start=${start}`;
  }
  if (end) {
    queryString += `&end=${end}`;
  }
  const response = await fetch(queryString);
  const data = await response.json();
  return data;
};
