"use server";

import { apiClient, apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config"; // Importar las URLs base
import { setServerCookie } from "../cookies";
import { jwtDecode } from "jwt-decode";
import { createServerAction, ServerActionError } from "../action-utils";

export const login = createServerAction(async (username: string, password: string) => {
  if (!username || !password) {
    throw new ServerActionError("Username and password are required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/login`, { // Usar la URL desde config
      username,
      password,
    });

    if (!response || !response.data) {
      throw new ServerActionError("No data received from API.");
    }

    const decoded = jwtDecode(response.data.access_token);
    const expirationDate = new Date(decoded.exp * 1000);

    // TODO: Uncomment - Backend api ends up in an infinite loop when the token expires.
    // expirationDate.setHours(expirationDate.getHours() + 1);

    setServerCookie("accessToken", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expirationDate
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    if (status === 401) {
      throw new ServerActionError("Invalid credentials. Please check your username and password.");
    } else if (status === 422) {
      const validationErrors = error.response?.data?.detail || [];
      const errorMessages = validationErrors
        .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
        .join(", ");
      throw new ServerActionError(`Validation Error: ${errorMessages}`);
    } else {
      const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
      throw new ServerActionError(`Error ${status || "unknown"}: ${errorMessage}`);
    }
  }
});

export async function refreshToken() {
  const cookies = require('next/headers').cookies;
  const cookieStore = cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    throw new Error("No accessToken were found");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/refresh`, {
      token: accessToken
    });

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    const decoded = jwtDecode(response.data.access_token);
    const expirationDate = new Date(decoded.exp * 1000);
    expirationDate.setHours(expirationDate.getHours() + 1);

    setServerCookie("accessToken", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expirationDate
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
    throw new Error(`Error ${status || "unknown"}: ${errorMessage}`);
  }
}

export async function fetchUserData(): Promise<any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.auth}/auth/me`, {
      headers: {
        Accept: "application/json",
      },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw error;
  }
}

export const register = createServerAction(async (username: string, email: string, password: string) => {
  if (!username || !email || !password) {
    throw new ServerActionError("Username, email, and password are required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/register`, {
      username,
      email,
      password,
    });

    if (!response || !response.data) {
      throw new ServerActionError("No data received from API.");
    }

    setServerCookie("accessToken", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;

    switch (status) {
      case 400:
        throw new ServerActionError("Invalid data. Please check your inputs.");
      case 422: {
        const validationErrors = error.response?.data?.details || [];
        const errorMessages = validationErrors
          .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
          .join(", ");
        throw new ServerActionError(`Validation Error: ${errorMessages}`);
      }
      case 409:
        throw new ServerActionError('User with such data already exists');
      default: {
        const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
        throw new ServerActionError(`Error ${status || "unknown"}: ${errorMessage}`);
      }
    }
  }
});

export async function resetPasswordForEmail(email: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/password-reset-request`, {
      email,
    });

    if (response.status !== 200) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error(`Error when sending password reset email: ${email}`, error);
    return { success: false, error: error.message };
  }
}

export async function resetPassword(new_password: string, token: string): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/reset-password`, {
      token,
      new_password,
    });

    if (response.status !== 200) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    const status = error.response?.status;
    switch (status) {
      case 400:
        return {
          success: false,
          error: 'Invalid or expired reset token',
        };
      case 422: {
        return {
          success: false,
          error: 'Validation error (password requirements not met)',
        };
      }
      default: {
        console.error(`Error when updating password`, error);
        return { success: false, error: error.message };
      }
    }
  }
}

export async function changePassword(username: string, current_password: string, new_password: string,): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/${username}/password`, {
      current_password,
      new_password,
    });

    if (response.status !== 200) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    const status = error.response?.status;
    switch (status) {
      // case 400:
      //   return {
      //     success: false,
      //     error: 'Invalid or expired reset token',
      //   };
      // case 422: {
      //   return {
      //     success: false,
      //     error: 'Validation error (password requirements not met)',
      //   };
      // }
      default: {
        console.error(`Error when updating password`, error);
        return { success: false, error: error.message };
      }
    }
  }
}
