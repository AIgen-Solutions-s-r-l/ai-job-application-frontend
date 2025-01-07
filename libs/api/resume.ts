"use server";

import { apiClientJwt } from "@/libs/api/client";
import API_BASE_URLS from "@/libs/api/config";
import { JobProfile, SelfIdentification } from '../definitions';

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

    return { success: true};
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

    return { success: true};
  } catch (error) {
    console.error(`Error updating job profile: ${data}`, error);
    return { success: false, error: error.message };
  }
}

export async function pdfToJson(formData: FormData): Promise<{ data: JobProfile; error?: string }> {
  try {
    const { data }: { data: any } = await apiClientJwt.post(`${API_BASE_URLS.resumes}/resumes/pdf_to_json`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })

    const jobProfile: JobProfile = {
      personalInfo: data.personal_information,
      educationDetails: data.education_details,
      experienceDetails: data.experience_details,
      additionalInfo: {
        projects: data.projects,
        achievements: data.achievements,
        certifications: data.certifications,
        languages: data.languages,
        interests: data.interests,
        availability: data.availability?.notice_period,
        salary_expectations: data.salary_expectations?.salary_range_usd, //?,
        self_identification: {} as SelfIdentification,
        legal_authorization: data.legal_authorization,
        work_preferences: data.work_preferences
      }
    }

    return { data: jobProfile };
  } catch (error) {
    console.error('Error parsing PDF', error);
    return { data: null, error: error.message };
  }
}

export async function pdfToJson2(formData: FormData): Promise<{ data: any; error?: string }> {
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