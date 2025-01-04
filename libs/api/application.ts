"use server";

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

export async function createJobApplication(jobs: any[]): Promise<{ success: boolean; error?: string }> {
  try {
    const data = {
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

    return { success: true };
  } catch (error) {
    console.error("Error creating job application:", error);
    return { success: false, error: error.message };
  }
}

export async function getJobApplications(): Promise<{ success: boolean, data?: any, error?: string, statuCode?: number }> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.application}/applied`)

    if (response.status !== 200) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    return { success: true, data: response.data };
  } catch (error) {
    console.error('Error getting job applications', error);
    return { success: false, error: error.message, statuCode: error.response?.status };
  }
}