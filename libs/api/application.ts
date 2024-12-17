"use server";

import { MatchingJob } from "../definitions";
import { apiClientJwt } from "./client";
import API_BASE_URLS from "./config";

export async function fetchAppliedJobs(): Promise<any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.application}/applied`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching applied jobs:", error);
    throw new Error("Unable to fetch applied jobs. Please try again later.");
  }
}

export async function createJobApplication(jobs: MatchingJob[]): Promise<{ success: boolean; error?: string }> {
  try {
    const data = {
      "is_batch": jobs.length > 1,
      "jobs": jobs,
    }

    const response = await apiClientJwt.post(`${API_BASE_URLS.application}/applications`, data, {
      headers: {
        Accept: "application/json",
      },
    })

    if (response.status !== 200) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    if (!response.data) {
      return { success: false, error: "Application failed" };
    }

    return { success: true};
  } catch (error) {
    console.error(`Error creating job application: ${jobs}`, error);
    return { success: false, error: error.message };
  }
}