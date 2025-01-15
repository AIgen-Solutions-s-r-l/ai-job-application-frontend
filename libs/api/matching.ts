"use server";

import { apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config";
import { JobSearchParams } from "../definitions";
import JobSearchMockData from "@/components/job-search/JobSearchMockData";
import { delay } from "../time";

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
    // throw new Error("Unable to fetch job matches. Please try again later.");
    
    //todo: mock
    await delay(3000)
    return JobSearchMockData;
  }
}
