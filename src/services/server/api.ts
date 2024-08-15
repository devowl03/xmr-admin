import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { generateHmacSignature } from "./hmac";

const API_PUBLIC_KEY = process.env.NEXT_PUBLIC_API_PUBLIC_KEY!;
const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY!;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const timestamp = Date.now().toString();
  const data = `${config.method?.toUpperCase()}|${
    config.url
  }|${timestamp}|${API_PUBLIC_KEY}`;

  const signature = generateHmacSignature(API_SECRET_KEY, data);

  const headers = new AxiosHeaders(config.headers);
  headers.set("X-API-Key".toLowerCase(), API_PUBLIC_KEY);
  headers.set("X-Timestamp".toLowerCase(), timestamp);
  headers.set("X-Signature".toLowerCase(), signature);
  headers.set("X-DATA".toLowerCase(), config.url);

  config.headers = headers;

  return config;
});

export default api;
