import crypto from "crypto-js";

export function generateHmacSignature(apiSecret: string, data: string): string {
  const hmac = crypto.HmacSHA256(data, apiSecret);
  return hmac.toString();
}
