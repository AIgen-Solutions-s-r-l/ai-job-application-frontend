"use server";

import apiClientJwt from "@/libs/api/client";

export async function fetchUserResume(): Promise<any> {
  try {
    const response = await apiClientJwt.get("/resumes/get", {
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