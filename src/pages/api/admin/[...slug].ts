import { apiRequest, isSuccess, UtilityResponse } from "@/services/types";
import type { NextApiRequest, NextApiResponse } from "next";

type ResponseData = {
  message: string;
  data?: any; // Include data to handle success responses
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<ResponseData>
) {
  const { slug } = req.query;
  const response = await apiRequest<any>("GET", "/" + slug);

  if (isSuccess(response)) {
    res.status(response.status).json(response.data);
  } else {
    res.status(response.status).json({ message: response.message! });
  }
}
