import axios, { InternalAxiosRequestConfig, AxiosHeaders } from "axios";
import { generateHmacSignature } from "./hmac";

const API_PUBLIC_KEY = process.env.NEXT_PUBLIC_API_PUBLIC_KEY!;
const API_SECRET_KEY = process.env.NEXT_PUBLIC_API_SECRET_KEY!;

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_BASE_URL,
});

api.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const timestamp = Date.now().toString();
  // Start with the base URL
  let url = config.url;

  // Append each parameter in the correct format
  const queryParams = new URLSearchParams();
  Object.keys(config.params || {}).forEach((key) => {
    queryParams.append(key, config.params![key]);
  });

  // Combine the base URL with the serialized query parameters
  if (queryParams.toString()) {
    url += `?${queryParams.toString()}`;
  }
  const data = `${config.method?.toUpperCase()}|${url}|${timestamp}|${API_PUBLIC_KEY}`;

  const signature = generateHmacSignature(API_SECRET_KEY, data);

  const headers = new AxiosHeaders(config.headers);
  headers.set("X-API-Key".toLowerCase(), API_PUBLIC_KEY);
  headers.set("X-Timestamp".toLowerCase(), timestamp);
  headers.set("X-Signature".toLowerCase(), signature);
  headers.set("X-DATA".toLowerCase(), `${url}`);

  config.headers = headers;

  return config;
});

export default api;
