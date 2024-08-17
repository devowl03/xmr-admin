import { apiRequest, User } from "../types";

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
      sortBy: props.sortBy || "createdAt",
      order: props.order || "desc",
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

export const getTransactionGraph = async (interval?: string, type?: string) => {
  return await apiRequest<any>("GET", "/getTransactionGraph", {
    params: {
      interval,
      type,
    },
  });
};

export const getRevenueInfo = async (interval: string) => {
  return await apiRequest<any>("GET", "/revenueInfo", {
    params: {
      interval,
    },
  });
};

export const getUsersCount = async (interval: string, invite?: boolean) => {
  return await apiRequest<any>("GET", "/getUsersCountByPeriod", {
    params: {
      period: interval,
      invite,
    },
  });
};

export const getBetsGraph = async (
  period: string,
  game: string,
  start?: string,
  end?: string
) => {
  return await apiRequest<any>("GET", "/getBetsTotalsByPeriod", {
    params: {
      period,
      game,
      start,
      end,
    },
  });
};
