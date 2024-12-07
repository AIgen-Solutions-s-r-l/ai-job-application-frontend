"use server";

import { apiClient } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config"; // Importar las URLs base
import { setServerCookie } from "../cookies";

export async function login(username: string, password: string) {
  if (!username || !password) {
    throw new Error("Username and password are required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/login`, { // Usar la URL desde config
      username,
      password,
    });

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    setServerCookie("accessToken", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production', 
      sameSite: 'lax', 
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401) {
      throw new Error("Invalid credentials. Please check your username and password.");
    } else if (status === 422) {
      const validationErrors = error.response?.data?.detail || [];
      const errorMessages = validationErrors
        .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
        .join(", ");
      throw new Error(`Validation Error: ${errorMessages}`);
    } else {
      const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
      throw new Error(`Error ${status || "unknown"}: ${errorMessage}`);
    }
  }
}

export async function register(username: string, email: string, password: string) {
  if (!username || !email || !password) {
    throw new Error("Username, email, and password are required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/register`, { 
      username,
      email,
      password,
    });

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 400) {
      throw new Error("Invalid data. Please check your inputs.");
    } else if (status === 422) {
      const validationErrors = error.response?.data?.detail || [];
      const errorMessages = validationErrors
        .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
        .join(", ");
      throw new Error(`Validation Error: ${errorMessages}`);
    } else {
      const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
      throw new Error(`Error ${status || "unknown"}: ${errorMessage}`);
    }
  }
}