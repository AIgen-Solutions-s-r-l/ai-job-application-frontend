"use server";

import { apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config";

export async function fetchUserResume(): Promise<any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.resumes}/resumes/get`, {
      headers: {
        Accept: "application/json",
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    throw new Error("Unable to fetch user resumes. Please try again later.");
  }
}