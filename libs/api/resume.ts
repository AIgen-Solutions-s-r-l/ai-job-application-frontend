"use server";

import { apiClient, apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config";
import { JobProfile } from '../definitions';

export async function fetchUserResume(): Promise<any> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.resumes}/resumes/get`, {
      headers: {
        Accept: "application/json",
      },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching user resumes:", error);
    throw error;
  }
}

export async function isResumeExits(): Promise<{ exists: boolean }> {
  try {
    const response = await apiClientJwt.get(`${API_BASE_URLS.resumes}/resumes/exists`, {
      headers: {
        Accept: "application/json",
      },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Existenss of Resume:", error);
    throw error;
  }
}

export async function isResumeExitsJWT(JWT: string): Promise<{ exists: boolean }> {
  try {
    const response = await apiClient.get(`${API_BASE_URLS.resumes}/resumes/exists`, {
      headers: {
        Accept: "application/json",
        Authorization: `Bearer ${JWT}`,
      },
      timeout: 30000,
    });

    return response.data;
  } catch (error) {
    console.error("Error fetching Existenss of Resume:", error);
    throw error;
  }
}

export async function createResume(entries: JobProfile): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClientJwt.post(`${API_BASE_URLS.resumes}/resumes/create_resume`, entries, {
      headers: {
        Accept: "application/json",
      },
    })

    if (response.status !== 201) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    if (!response.data) {
      return { success: false, error: "Resume creation failed" };
    }

    return { success: true };
  } catch (error) {
    console.error(`Error creating job profile: ${entries}`, error);
    return { success: false, error: error.message };
  }
}

export async function updateResume(data: any): Promise<{ success: boolean; error?: string }> {
  try {
    const response = await apiClientJwt.put(`${API_BASE_URLS.resumes}/resumes/update`, data, {
      headers: {
        Accept: "application/json",
      }
    })

    if (response.status !== 200) {
      return {
        success: false,
        error: `Server returned ${response.status}: ${response.data?.error || response.statusText}`,
      };
    }

    if (!response.data) {
      return { success: false, error: "Resume creation failed" };
    }

    return { success: true };
  } catch (error) {
    console.error(`Error updating job profile: ${data}`, error);
    return { success: false, error: error.message };
  }
}

export async function pdfToJson(formData: FormData): Promise<{ data: any; error?: string }> {
  try {
    const response = await apiClientJwt.post(`${API_BASE_URLS.resumes}/resumes/pdf_to_json`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      timeout: 60000,
    })

    if (response.status !== 200 || !response.data) {
      return { data: null, error: `Server returned ${response.status}: ${response.data?.error || response.statusText}` };
    }

    return { data: response.data };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return { data: null, error: error.message };
  }
}