import path from "path";
import config from '@/config';
import { z } from "zod";

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

export const sortArrayByDate = <T, K extends keyof T>(arr: T[], dateFiledName: K, order: 'asc' | 'desc'): T[] => {
  return arr.sort((left, right) => {
    const d1 = new Date(left[dateFiledName] as string);
    const d2 = new Date(right[dateFiledName] as string);

    return order === 'asc'
      ? d1.getTime() - d2.getTime()
      : d2.getTime() - d1.getTime()
  })
}

export function getAppOrigin(): string {
  return process.env.NODE_ENV === 'production'
    ? `https://${config.domainName}`
    : 'http://localhost:3000';
}