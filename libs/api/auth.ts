"use server";

import apiClient from "@/libs/api/client";

export async function login(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  try {
    const response = await apiClient.post("/auth/login", {
      username,
      password,
    });

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    return response.data;
  } catch (error: any) {
    const status = error.response?.status || 500;
    const errorMessage = error.response?.data?.error || "Failed to login";
    throw new Error(`Error ${status}: ${errorMessage}`);
  }
}