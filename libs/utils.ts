import path from "path";
import { z } from "zod";
import { JobProfile, SelfIdentification } from "./definitions";

const MAX_RESUME_FILE_SIZE = 5000000;   // 5MB
function checkFileType(file: File) {
  if (file?.name) {
    const fileType = path.extname(file?.name);
    if (fileType === ".pdf") return true;
  }
  return false;
}



export const resumeFileSchema = z.any()
  .refine((file: File) => file?.size !== 0, "File is required")
  .refine(file => file.size < MAX_RESUME_FILE_SIZE, "Max size is 5MB")
  .refine(file => checkFileType(file), "Only .pdf formats are supported.")



export function formDataToObject<T>(formData: FormData): T {
  const result: any = {};

  formData.forEach((value, key) => {
    const keys = key.split('.');
    let current = result;

    for (let i = 0; i < keys.length; i++) {
      const k = keys[i];
      const isLast = i === keys.length - 1;

      // Handle arrays
      const match = k.match(/(.+)\[(\d+)\]$/);
      if (match) {
        const arrayKey = match[1];
        const index = parseInt(match[2], 10);

        if (!current[arrayKey]) {
          current[arrayKey] = [];
        }
        if (!current[arrayKey][index]) {
          current[arrayKey][index] = {};
        }

        if (isLast) {
          current[arrayKey][index] = value;
        } else {
          current = current[arrayKey][index];
        }
      } else {
        if (isLast) {
          current[k] = value;
        } else {
          if (!current[k]) {
            current[k] = {};
          }
          current = current[k];
        }
      }
    }
  });

  return result as T;
}

export function cVDataToJobProfile(data: any): JobProfile {
  const jobProfile: JobProfile = {
    personalInfo: data.personal_information,
    // cv?: File,
    educationDetails: data.education_details,
    experienceDetails: data.experience_details,
    additionalInfo: {
      projects: data.projects,
      achievements: data.achievements,
      certifications: data.certifications,
      languages: data.languages,
      interests: data.interests,
      availability: data.availability?.notice_period,
      salaryExpectations:  data.salary_expectations?.salary_range_usd, //?,
      selfIdentification: {} as SelfIdentification,
      legalAuthorization: data.legal_authorization,
      workPreferences: data.work_preferences
    }
  }

  return jobProfile;
}
