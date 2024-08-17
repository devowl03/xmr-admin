import axios, { AxiosRequestConfig, Method } from "axios";
import api from "./server/api";

export interface User {
  _id: string;
  username: string;
  password: string;
  salt: string;
  inviteCode: string;
  invitedBy: string;
  createdAt: string;
  updatedAt: string;
  balance: number;
  outstandingBal: number;
  outstandingBalHistory: number;
  vip_outstanding_balance: number;
  vault_balance: number;
  activeDepositMatch: boolean;
  banned: boolean;
  betPublic: boolean;
  commission: number;
  enableAuth: boolean;
  gamePlayed: number;
  hasWagered: boolean;
  inviteCount: number;
  isEmailVerified: number;
  isFirstDeposit: boolean;
  redeemed: boolean;
  roles: number;
  signUpBenefitByInviteCode: number;
  tipSentToday: number;
  totalBet: number;
  totalWon: number;
  wagerLock: number;
  wallet: string;
  xpPoint: number;
  __v: number;
}

export function isSuccess<ResponseType>(
  response: UtilityResponse<ResponseType>
): response is { status: 200; data: ResponseType } {
  return response.status === 200 && response.data !== undefined;
}

export type UtilityResponse<ResponseType> =
  | { status: 200; data: ResponseType; message?: never }
  | { status: number; message: string; data?: never };

// Generic API handler
export const apiRequest = async <ResponseType>(
  method: Method,
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<UtilityResponse<ResponseType>> => {
  try {
    const response = await api.request<UtilityResponse<ResponseType>>({
      method,
      url: endpoint,
      ...options,
    });

    // Check if response status is 200 and return the appropriate response type
    if (
      (response.status === 200 || response.status == 304) &&
      response.data.data !== undefined
    ) {
      return {
        data: response.data.data,
        status: response.status,
      } as UtilityResponse<ResponseType>;
    } else {
      return {
        message: response.data.message || "Unexpected error occurred",
        status: response.status,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status ?? 500,
        message: error.response?.data?.message ?? "An error occurred",
      };
    } else {
      return {
        status: 500,
        message: "Error processing request",
      };
    }
  }
};

export const ClientApiRequest = async <ResponseType>(
  method: Method,
  endpoint: string,
  options?: AxiosRequestConfig
): Promise<UtilityResponse<ResponseType>> => {
  try {
    const response = await axios.request<ResponseType>({
      method,
      url: endpoint,
      ...options,
    });

    // Check if response status is 200 and return the appropriate response type
    if (response.status === 200 && response.data !== undefined) {
      return {
        status: 200,
        data: response.data,
      };
    } else {
      return {
        status: response.status,
        message: "Unexpected error occurred",
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        status: error.response?.status ?? 500,
        message: error.response?.data?.message ?? "An error occurred",
      };
    } else {
      return {
        status: 500,
        message: "Error processing request",
      };
    }
  }
};
