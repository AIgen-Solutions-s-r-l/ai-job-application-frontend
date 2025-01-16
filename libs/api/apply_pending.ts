"use server";

import { apiClientJwt } from "./client";
import API_BASE_URLS from "./config";

export async function fetchPendingApplications(): Promise<any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.pending}/apply_content`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching pending applications:", error);
    throw new Error("Unable to fetch pending applications. Please try again later.");
  }
}

export async function fetchDetailedApplicationData(id: string): Promise<any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.pending}/apply_content/${id}`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching pending application data:", error);
    throw new Error("Unable to fetch pending application data. Please try again later.");
  }
}

export async function applySelectedApplications(applications: string[]): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClientJwt.post(`${API_BASE_URLS.pending}/apply_selected`, applications, {
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
    console.error("Error creating applications:", error);
    return { success: false, error: error.message };
  }
}