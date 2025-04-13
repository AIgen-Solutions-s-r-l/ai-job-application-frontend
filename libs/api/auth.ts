"use server";

import { apiClient, apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config"; // Import base URLs
import { setServerCookie, getServerCookie } from "../cookies";
import { jwtDecode } from "jwt-decode";
import { createServerAction, ServerActionError } from "../action-utils";

interface UserInfo {
  id: number;
  email: string;
}

export const decodeToken = async (token: string) => {
  const decoded = await jwtDecode(token) satisfies {
    sub: string,
    id: number,
    is_admin: boolean,
    exp: number
  };

  return {
    ...decoded,
    expirationDate: new Date(decoded.exp * 1000)
  };
}

export const login = createServerAction(async (email: string, password: string) => {
  if (!email || !password) {
    throw new ServerActionError("Email and password are required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/login`, { // Use URL from config
      email,
      password,
    });

    // console.log(response)
    if (!response || !response.data) {
      throw new ServerActionError("No data received from API.");
    }

    const { expirationDate } = await decodeToken(response.data.access_token);

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
        {
          const validationErrors = error.response?.data?.details || [];
          const errorMessages = validationErrors
            .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
            .join(", ");
          throw new ServerActionError(`Validation Error: ${errorMessages}`);
        }

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

    const { expirationDate } = await decodeToken(response.data.access_token)
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

    const { expirationDate } = await decodeToken(response.data.access_token);

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
        {
          const validationErrors = error.response?.data?.details || [];
          const errorMessages = validationErrors
            .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
            .join(", ");
          throw new ServerActionError(`Validation Error: ${errorMessages}`);
        }

      default:
        errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
        throw new ServerActionError(`Error ${status || "unknown"}: ${errorMessage}`);
    }
  }
});

export const verifyEmailChange = createServerAction(async (token: string) => {
  try {
    const response = await apiClient.get(`${API_BASE_URLS.auth}/auth/verify-email-change?token=${token}`);

    if (!response || !response.data || !response.data.is_verified) {
      throw new ServerActionError("No data received from API.");
    }

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
        {
          const validationErrors = error.response?.data?.details || [];
          const errorMessages = validationErrors
            .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
            .join(", ");
          throw new ServerActionError(`Validation Error: ${errorMessages}`);
        }

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
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/password-reset`, {
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

export async function changeEmail(current_password: string, new_email: string,): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClientJwt.put(`${API_BASE_URLS.auth}/auth/users/change-email`, {
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

    const { id, sub: email } = await decodeToken(accessToken);

    if (!id) {
      throw new Error("Unable to extract user ID from token");
    }

    return {
      id,
      email
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

  let accessToken: string | null = null;
  const cookies = require('next/headers').cookies;
  const cookieStore = cookies();
  accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    // Return a default response indicating user is not logged in
    return { success: false, message: "User not logged in", requiresLogin: true };
  }

  const decoded: any = jwtDecode(accessToken);

  if (!amount || amount <= 0) {
    throw new Error("Invalid credit amount");
  }

  if (!referenceId) {
    throw new Error("Reference ID is required");
  }

  try {
    // console.log("Adding credits:", {
    //   amount,
    //   referenceId,
    //   description,
    //   userId: decoded.id
    // });
    const response = await apiClientJwt.post(`${API_BASE_URLS.auth}/credits/add?user_id=${decoded.id}`,
      {
        amount: amount,
        reference_id: referenceId,
        description
      },
      { timeout: 15000 }
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

export async function getBalance(): Promise<any> {
  let accessToken = await getServerCookie('accessToken');

  if (!accessToken) {
    // Return a default balance for non-logged in users
    return { balance: 0, requiresLogin: true };
  }

  const decoded: any = jwtDecode(accessToken);

  try {
    const response = await apiClientJwt.get(
      `${API_BASE_URLS.auth}/credits/balance?user_id=${decoded.id}`,
      { timeout: 15000 }
    );

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error checking credits:", error);
    const status = error.response?.status;
    const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
    throw new Error(`Error ${status || "unknown"}: ${errorMessage}`);
  }
}

export async function spendCredits(amount: number): Promise<any> {
  let accessToken = await getServerCookie('accessToken');

  if (!accessToken) {
    // Return a response indicating user needs to log in to spend credits
    return { success: false, message: "Login required to spend credits", requiresLogin: true };
  }

  const decoded: any = jwtDecode(accessToken);

  try {
    const response = await apiClientJwt.post(
      `${API_BASE_URLS.auth}/credits/use?user_id=${decoded.id}`, {
      amount,
    },
      { timeout: 15000 }
    );

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error using credits:", error);
    const status = error.response?.status;
    const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
    throw new Error(`Error ${status || "unknown"}: ${errorMessage}`);
  }
}

export async function getTransactions(): Promise<any> {
  let accessToken = await getServerCookie('accessToken');

  if (!accessToken) {
    // Return empty transactions for non-logged in users
    return { transactions: [], requiresLogin: true };
  }

  const decoded: any = jwtDecode(accessToken);

  try {
    const response = await apiClientJwt.get(
      `${API_BASE_URLS.auth}/credits/transactions?user_id=${decoded.id}`,
      { timeout: 15000 }
    );

    if (!response || !response.data) {
      throw new Error("No data received from API.");
    }

    return response.data;
  } catch (error: any) {
    console.error("Error fetching transactions:", error);
    const status = error.response?.status;
    const errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
    throw new Error(`Error ${status || "unknown"}: ${errorMessage}`);
  }
}

/**
 * Gets the redirect URL for Google authentication
 * @param redirectUri URI to redirect after successful authentication
 * @returns Authentication URL to start the Google OAuth flow
 */
export const getGoogleOAuthURL = createServerAction(async (redirectUri?: string) => {
  try {
    // Use provided redirectUri or fall back to environment variable
    const redirect_uri = redirectUri || process.env.GOOGLE_REDIRECT_URI;
    const client_id = process.env.GOOGLE_CLIENT_ID;

    // Log for debugging
    console.log('getGoogleOAuthURL called with:');
    console.log('redirect_uri:', redirect_uri);
    console.log('client_id:', client_id);

    if (!client_id) {
      throw new ServerActionError("Google Client ID is not configured");
    }

    if (!redirect_uri) {
      throw new ServerActionError("Google Redirect URI is not configured");
    }

    // Try to build the URL directly if needed
    if (process.env.NODE_ENV === 'development') {
      // Build Google OAuth URL directly
      const params = new URLSearchParams({
        client_id,
        redirect_uri,
        scope: 'openid email profile',
        response_type: 'code',
        access_type: 'offline',
        prompt: 'consent'
      });

      const authUrl = `https://accounts.google.com/o/oauth2/auth?${params.toString()}`;
      return authUrl;
    }

    // Otherwise use the backend service
    const response = await apiClient.post(
      `${API_BASE_URLS.auth}/auth/google-auth`,
      { redirect_uri }
    );

    if (!response || !response.data || !response.data.authorization_url) {
      throw new ServerActionError("No authentication URL received from the API");
    }

    // Return the authorization URL
    return response.data.authorization_url;
  } catch (error: any) {
    console.error("Error getting Google OAuth URL:", error);
    const errorMessage = error.response?.data?.detail || "Error processing Google authentication request.";
    throw new ServerActionError(errorMessage);
  }
});

/**
 * Handles the Google OAuth callback by sending the authorization code to the backend
 * @param code The authorization code received from Google
 * @returns The JWT token and user information
 */
export const handleGoogleCallback = createServerAction(async (code: string) => {
  if (!code) {
    throw new ServerActionError("Authorization code is required");
  }

  try {
    const response = await apiClient.post(`${API_BASE_URLS.auth}/auth/login-with-google`, {
      code
    });

    if (!response || !response.data) {
      throw new ServerActionError("No data received from API.");
    }

    const { expirationDate } = await decodeToken(response.data.access_token);

    setServerCookie("accessToken", response.data.access_token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      expires: expirationDate
    });

    return { success: true };
  } catch (error: any) {
    const status = error.response?.status;
    let errorMessage;

    switch (status) {
      case 400:
        errorMessage = error.response?.data?.detail?.message || "Invalid authorization code";
        throw new ServerActionError(errorMessage);
      case 422:
        {
          const validationErrors = error.response?.data?.details || [];
          const errorMessages = validationErrors
            .map((err: any) => `${err.loc?.join(" -> ") || ""}: ${err.msg}`)
            .join(", ");
          throw new ServerActionError(`Validation Error: ${errorMessages}`);
        }
      default:
        errorMessage = error.response?.data?.detail || "Unexpected error occurred.";
        throw new ServerActionError(`Error ${status || "unknown"}: ${errorMessage}`);
    }
  }
});
