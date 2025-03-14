"use server";

import { apiClient, apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config"; // Importar las URLs base
import { setServerCookie, getServerCookie } from "../cookies";
import { jwtDecode } from "jwt-decode";
import { createServerAction, ServerActionError } from "../action-utils";

interface UserInfo {
  id: string;
  email: string;
}

export const login = createServerAction(async (email: string, password: string) => {
  if (!email || !password) {
    throw new ServerActionError("Email and password are required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/login`, { // Usar la URL desde config
      email,
      password,
    });

    console.log(response)
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
    let errorMessage;

    switch (status) {
      case 401:
        throw new ServerActionError("Invalid credentials. Please check your username and password.");
      case 403:
        errorMessage = error.response?.data?.detail?.message || "Unexpected error occurred.";
        throw new ServerActionError(`Error ${status || "unknown"}: ${errorMessage}`);
      case 422:
        const validationErrors = error.response?.data?.details || [];
        const errorMessages = validationErrors
          .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
          .join(", ");
        throw new ServerActionError(`Validation Error: ${errorMessages}`);

      default:
        errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
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

export const register = createServerAction(async (email: string, password: string) => {
  if (!email || !password) {
    throw new ServerActionError("Email and password are required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/register`, {
      email,
      password,
    });

    if (!response || !response.data) {
      throw new ServerActionError("No data received from API.");
    }

    // setServerCookie("accessToken", response.data.access_token, {
    //   httpOnly: true,
    //   secure: process.env.NODE_ENV === 'production',
    //   sameSite: 'lax',
    // });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    console.log({ status, error })

    switch (status) {
      case 400:
        throw new ServerActionError(error.response?.data?.detail?.message);
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

export const verifyEmail = createServerAction(async (token: string) => {
  try {
    const response = await apiClient.get(`${API_BASE_URLS.auth}/auth/verify-email?token=${token}`);

    if (!response || !response.data || !response.data.is_verified) {
      throw new ServerActionError("No data received from API.");
    }

    const decoded = jwtDecode(response.data.access_token);
    const expirationDate = new Date(decoded.exp * 1000);


    setServerCookie("accessToken", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expirationDate
    });

    return response.data;
  } catch (error: any) {
    const status = error.response?.status;
    console.log({ status, error })
    let errorMessage;

    switch (status) {
      case 400:
        errorMessage = error.response?.data?.detail?.message || "Invalid verification token";
        throw new ServerActionError(errorMessage);
      case 422:
        const validationErrors = error.response?.data?.details || [];
        const errorMessages = validationErrors
          .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
          .join(", ");
        throw new ServerActionError(`Validation Error: ${errorMessages}`);

      default:
        errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
        throw new ServerActionError(`Error ${status || "unknown"}: ${errorMessage}`);
    }
  }
});

export const resendVerification = createServerAction(async (email: string) => {
  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/resend-verification`, { email });

    if (!response || !response.data) {
      throw new ServerActionError("No data received from API.");
    }

    return response.data.message;
  } catch (error: any) {
    const status = error.response?.status;
    console.log({ status, error })
    const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
    throw new ServerActionError(`Error ${status || "unknown"}: ${errorMessage}`);
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

export async function changePassword(current_password: string, new_password: string,): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClientJwt.put(`${API_BASE_URLS.auth}/auth/users/password`, {
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
    switch (error.response?.status) {
      case 401:
        return {
          success: false,
          error: 'Invalid current password',
        };
      case 404:
        return {
          success: false,
          error: 'User not found',
        };
      case 422: {
        return {
          success: false,
          error: 'Validation Error',
        };
      }
      default: {
        console.error(`Error when updating password`, error);
        return { success: false, error: error.message };
      }
    }
  }
}

export async function changeEmail(username: string, current_password: string, new_email: string,): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClientJwt.put(`${API_BASE_URLS.auth}/auth/users/${username}/email`, {
      current_password,
      new_email,
    });

    if (response.status !== 200) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    return { success: true };
  } catch (error) {
    switch (error.response?.status) {
      case 400:
        return {
          success: false,
          error: 'Email already registered',
        };
      case 401:
        return {
          success: false,
          error: 'Invalid password or unauthorized',
        };
      case 404:
        return {
          success: false,
          error: 'User not found',
        };
      case 422: {
        return {
          success: false,
          error: 'Validation Error',
        };
      }
      default: {
        console.error(`Error when updating password`, error);
        return { success: false, error: error.message };
      }
    }
  }
}

export async function getUserInfo(): Promise<UserInfo> {
  try {
    const accessToken = await getServerCookie('accessToken');
    if (!accessToken) {
      throw new Error("No access token found in cookies");
    }

    const decoded: any = jwtDecode(accessToken);

    const userId = decoded?.id;
    const userEmail = decoded?.sub;
    if (!userId) {
      throw new Error("Unable to extract user ID from token");
    }

    return {
      id: userId,
      email: userEmail
    };
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("Failed to get user information");
  }
}

/**
 * Adds credits to the user's account
 * @param amount Number of credits to add
 * @param referenceId Reference ID for the transaction (e.g. Stripe session ID)
 * @param description Description of the transaction
 * @returns Response from the API
 */
export async function addCredits(amount: number, referenceId: string, description: string): Promise<any> {
  // Validar los datos de entrada
  if (!amount || amount <= 0) {
    throw new Error("Invalid credit amount");
  }

  if (!referenceId) {
    throw new Error("Reference ID is required");
  }

  try {
    const response = await apiClientJwt.post(`${API_BASE_URLS.auth}/credits/add`,
      {
        amount,
        reference_id: referenceId,
        description
      },
      { timeout: 15000 } // mayor timeout para esta operación
    );

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error adding credits:", error);

    if (error.response?.status === 422 &&
      error.response?.data?.detail?.includes("already processed")) {
      console.log("Transaction was already processed, returning success");
      return { success: true, message: "Transaction already processed" };
    }

    const status = error.response?.status;
    const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
    throw new Error(`Error ${status || "unknown"}: ${errorMessage}`);
  }
}