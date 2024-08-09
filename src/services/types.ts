import axios, { AxiosRequestConfig, Method } from "axios";
import api from "./server/api";

export interface User {
  _id: string; // Unique identifier for the user
  username: string; // Username of the user
  password: string; // Hashed password of the user
  salt: string; // Salt used for password hashing
  inviteCode: string; // Code used for inviting others
  invitedBy: string; // Identifier of the user who invited this user
  createdAt: string; // Timestamp of when the user was created (ISO string)
  updatedAt: string; // Timestamp of the last update to the user's data (ISO string)
  balance: number; // User's current balance
  outstandingBal: number; // User's current outstanding balance
  outstandingBalHistory: number; // User's historical outstanding balance
  vip_outstanding_balance: number; // VIP outstanding balance if applicable
  vault_balance: number; // User's vault balance
  activeDepositMatch: boolean; // Indicates if an active deposit match is present
  banned: boolean; // Indicates if the user is banned
  betPublic: boolean; // Indicates if the user's bets are public
  commission: number; // Commission rate for the user
  enableAuth: boolean; // Indicates if authentication is enabled
  gamePlayed: number; // Number of games played by the user
  hasWagered: boolean; // Indicates if the user has placed a wager
  inviteCount: number; // Number of invites sent by the user
  isEmailVerified: number; // Indicates if the user's email is verified (0 = false, 1 = true)
  isFirstDeposit: boolean; // Indicates if the user has made their first deposit
  redeemed: boolean; // Indicates if the user has redeemed any offers
  roles: number; // Roles assigned to the user (represented as a bit field or numeric value)
  signUpBenefitByInviteCode: number; // Indicates if the user received a signup benefit by using an invite code
  tipSentToday: number; // Amount of tips sent by the user today
  totalBet: number; // Total amount the user has bet
  totalWon: number; // Total amount the user has won
  wagerLock: number; // Indicates if there is a wager lock in place
  wallet: string; // Placeholder for the user's wallet information
  xpPoint: number; // Experience points for the user
  __v: number; // Version key (typically for MongoDB documents)
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
  method: Method, // HTTP method: 'GET', 'POST', etc.
  endpoint: string, // API endpoint
  options?: AxiosRequestConfig // Request options: headers, params, body data, etc.
): Promise<UtilityResponse<ResponseType>> => {
  try {
    const response = await api.request<UtilityResponse<ResponseType>>({
      method,
      url: endpoint,
      ...options,
    });

    // Assume response data structure aligns with UtilityResponse<ResponseType>
    if (response.status === 200 && response.data.data !== undefined) {
      return {
        data: response.data.data,
        status: 200,
      };
    } else {
      return {
        message: response.data.message || "Unexpected error occurred",
        status: response.status,
      };
    }
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        message: error.response?.data?.message ?? "An error occurred",
        status: error.response?.status ?? 500,
      };
    } else {
      return {
        message: "Error processing request",
        status: 500,
      };
    }
  }
};
