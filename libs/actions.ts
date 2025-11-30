"use server";

import { revalidatePath } from "next/cache";
import { JobProfile } from "./definitions";
import { createResume, pdfToJson, updateResume } from "./api/resume";
import { fromJobProfile, toJobProfile } from "./utils/job-profile-util";
import { createJobApplication } from "./api/application";
import { applySelectedApplications, updateApplicationLetter, updateApplicationResume } from "./api/apply_pending";
import { Resume } from "./types/application.types";
import { fromResumeType } from "./utils/application.util";
import { CoverLetterCoverLetter } from "./types/response-application.types";
import { spendCredits } from "./api/auth";
import { ServerActionResult } from "./action-utils";

export async function extractResume(formData: FormData): Promise<JobProfile> {
  try {
    const { data } = await pdfToJson(formData);

    const cvData: JobProfile = toJobProfile(data);

    return cvData;
  } catch (error) {
    console.error("Error fetching user profiles from API:", error);
    throw error;
  }
}

export const createJobProfile = async (profileData: JobProfile): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const entries: any = fromJobProfile(profileData);

    const response = await createResume(entries);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    return { success: true };
  } catch (error) {
    console.error("Error saving job profile:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export const updateJobProfile = async (profileData: JobProfile): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const entries: any = fromJobProfile(profileData);

    const response = await updateResume(entries);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath("/dashboard/profiles");

    return { success: true };
  } catch (error) {
    console.error("Error updating job profile:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export const addJobsToManager = async (formData: FormData): Promise<{
  success: boolean
}> => {
  try {
    await createJobApplication(formData);

    revalidatePath(`/manager`);

    return { success: true };
  } catch (error) {
    console.error("Error when adding jobs to jobs manager:", error);
    throw error;
  }
}

export const applySelectedApplicationsAction = async (applications: string[]): Promise<{
  success: boolean;
  error?: string
}> => {
  try {
    const response = await applySelectedApplications(applications);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath(`/manager`);

    return { success: true };
  } catch (error) {
    console.error("Error when applying to selected jobs:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export const updateApplicationResumeAction = async (id: string, resumeData: Resume): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const entries: any = fromResumeType(resumeData);

    // console.log("updateApplicationResumeAction: \n", JSON.stringify(entries));

    const response = await updateApplicationResume(id, entries);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath(`/manager/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating job profile:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export const updateApplicationLetterAction = async (id: string, letterData: CoverLetterCoverLetter): Promise<{
  success: boolean;
  error?: string;
}> => {
  try {
    const coverLetter = {
      cover_letter: letterData
    }

    // console.log("updateApplicationLetterAction: \n", JSON.stringify(coverLetter));

    const response = await updateApplicationLetter(id, coverLetter);

    if (!response.success) {
      return {
        success: false,
        error: `Server returned ${response.error}`,
      };
    }

    revalidatePath(`/manager/${id}`);

    return { success: true };
  } catch (error) {
    console.error("Error updating job profile:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}

export const spendCreditsAction = async (amount: number): Promise<ServerActionResult<number>> => {
  try {
    const response = await spendCredits(amount);
    return { success: true, value: response.new_balance };
  } catch (error) {
    console.error("Error fetching user balance:", error);
    return { success: false, error: error instanceof Error ? error.message : String(error) };
  }
}