"use server";

import { JobsList } from "../definitions";
import { delay } from "../time";
import { apiClientJwt, apiClientMultipart } from "./client";
import API_BASE_URLS from "./config";
import { failedJobsMockData, jobsMockData } from "@/components/jobs/jobsMockData";

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

export async function createJobApplication(formData: FormData): Promise<{ success: boolean }> {
  try {
    const response = await apiClientMultipart.post(`${API_BASE_URLS.application}/applications`, formData)

    if (response.status !== 200) {
      throw new Error(`Server returned ${response.status}: ${response.data?.error || response.statusText}`);
    }

    if (!response.data) {
      throw new Error("Application failed");
    }

    return { success: true };
  } catch (error) {
    console.error("Error creating job application:", error);
    throw error;
  }
}

export async function getAppliedJobApplications(): Promise<JobsList | any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.application}/applied`)
    console.log('getJobApplications', response.data);

    return response.data as JobsList;
  } catch (error) {
    console.error('Error getting job applications', error);
    return [];
  }
}

export async function getFailedJobApplications(): Promise<JobsList | any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.application}/fail_applied`)
    console.log('getFailedJobApplications', response.data);

    return response.data as JobsList;
  } catch (error) {
    console.error('Error getting failed job applications', error);
    return [];
  }
}

export async function getAppliedPendingApplications(): Promise<JobsList | any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.pending}/pending_content`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data as JobsList;
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    throw new Error("Unable to fetch pending applications. Please try again later.");
  }
}