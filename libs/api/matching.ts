"use server";

import { apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config";
import { JobSearchParams } from "../definitions";

export async function fetchMatchingJobs(params: JobSearchParams = {}): Promise<any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.matching}/jobs/match`, {
      params,
      headers: {
        Accept: "application/json",
      },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching job matches:", error);
    throw new Error("Unable to fetch job matches. Please try again later.");
  }
}
