"use server";

import { apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config";

export async function fetchMatchingJobs(queryString: string): Promise<any> {
  try {
    const response = await apiClientJwt.get(
      `${API_BASE_URLS.matching}/jobs/match/legacy?${queryString}`,
      {
        headers: {
          Accept: 'application/json',
        },
        timeout: 200000,
      }
    );

    return response.data;
  } catch (error) {
    console.error("Error fetching job matches:", error);
    throw new Error("Unable to fetch job matches. Please try again later.");
  }
}

