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
}"use server";

import axios from 'axios';
import { JobProfile } from '../definitions';
export async function createResume(entries: JobProfile, accessToken: string | null): Promise<{ success: boolean; error?: string }> {
  try {
    if (!accessToken) {
      return { success: false, error: 'Access token not found.' }; 
    }

		const trans = {
			"personal_information": entries.personalInfo,
			"education_details": entries.educationDetails,
			"experience_details": entries.experienceDetails,
			...entries.additionalInfo,
		};

    const response =await axios.post('http://localhost:8008/resumes/create_resume', trans, {
      headers: {
        "accept": "application/json",
        "Content-Type": "application/json",
        "Authorization": `Bearer ${accessToken}`,
      },
    });

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
