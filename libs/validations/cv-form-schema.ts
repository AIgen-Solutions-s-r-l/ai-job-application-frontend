import { z } from 'zod';

// Helper function to check if date is not in future
const isNotFutureDate = (date: Date) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  return date <= today;
};

export const personalInfoSchema = z.object({
  name: z.string()
    .min(2, 'Name must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Name can only contain letters'),
  surname: z.string()
    .min(2, 'Surname must be at least 2 characters')
    .regex(/^[a-zA-Z\s]*$/, 'Surname can only contain letters'),
  date_of_birth: z.string()
    .refine((date) => isNotFutureDate(new Date(date)), {
      message: 'Date of birth cannot be in the future',
    }),
  city: z.string().min(2, 'City is required'),
  address: z.string().min(3, 'Address is required'),
  country: z.string().min(2, 'Country is required'),
  zip_code: z.string().optional(),
  phone_prefix: z.string()
    .regex(/^\+?\d{1,4}$/, 'Invalid phone prefix format'),
  phone: z.string()
    .regex(/^\d{6,15}$/, 'Phone number must be between 6 and 15 digits'),
  email: z.string()
    .email('Invalid email format'),
  github: z.string()
      .url('Invalid URL format')
      .optional(),
  linkedin: z.string()
      .url('Invalid URL format')
      .optional()
});

export const educationSchema = z.object({
  education_level: z.string().min(2, 'Education level is required'),
  institution: z.string().min(2, 'Institution is required'),
  field_of_study: z.string().min(2, 'Field of study is required'),
  start_date: z.string().min(4, 'Start date is required'),
  year_of_completion: z.string()
    .refine((date) => !isNaN(Number(date)) && Number(date) >= 1900, {
      message: 'Invalid completion year',
    }),
  final_evaluation_grade: z.string(),
  location: z.string().min(2, 'Location is required'),
  exam: z.array(z.object({
    subject: z.string(),
    grade: z.string()
  }))
});

export const experienceSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  employment_period: z.string().min(4, 'Employment period is required'),
  location: z.string().min(2, 'Location is required'),
  industry: z.string().optional(),
  key_responsibilities: z.array(z.string().min(1, 'Responsibility is required')),
  skills_acquired: z.array(z.string())
});

export const cvFormSchema = z.object({
  personalInfo: personalInfoSchema,
  educationDetails: z.array(educationSchema),
  experienceDetails: z.array(experienceSchema),
  additionalInfo: z.object({
    languages: z.array(z.object({
      language: z.string().min(2, 'Language is required'),
      proficiency: z.string().min(1, 'Proficiency is required')
    })),
    projects: z.array(z.object({
      name: z.string().optional(),
      description: z.string().optional(),
      link: z.string()
        .url('Invalid URL format')
        .optional()
    })).optional(),
    certifications: z.array(z.object({
      name: z.string().optional(),
      description: z.string().optional()
    })).optional(),
    availability: z.object({
      notice_period: z.string().optional()
    }).optional(),
    salary_expectations: z.object({
      salary_range_usd: z.string()
        .regex(/^\d+\s*-\s*\d+$/, 'Format should be: min - max')
        .optional()
    }).optional(),
    self_identification: z.object({
      gender: z.string().optional(),
      pronouns: z.string().optional(),
      ethnicity: z.string().optional()
    }).optional(),
    achievements: z.array(z.object({
      name: z.string().optional(),
      description: z.string().optional()
    })).optional(),
    interests: z.array(z.string()).optional()
  })
});

export type CVFormData = z.infer<typeof cvFormSchema>;