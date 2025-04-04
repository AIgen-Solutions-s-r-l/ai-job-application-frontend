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
    .min(2, 'Date of birth is required')
    .refine((date) => isNotFutureDate(new Date(date)), {
      message: 'Date of birth cannot be in the future',
    })
    .refine((date) => new Date(date).getFullYear() >= 1900, {
      message: 'Date of birth cannot be before 1900',
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
  year_of_completion: z.string().min(4, 'Completion date is required'),
  final_evaluation_grade: z.string().min(1, 'Grade is required'),
  location: z.object({
    country: z.string().min(2, 'Country is required'),
    city: z.string().min(2, 'City is required')
  }),
  exam: z.array(z.object({
    subject: z.string().optional(),
    grade: z.string().optional()
  }))
})
// .refine(
//   (data) => {
//     const startDate = new Date(data.start_date);
//     const completionDate = new Date(data.year_of_completion);
//     return completionDate >= startDate;
//   },
//   {
//     message: 'Completion date must be after start date',
//     path: ['year_of_completion'] // This targets the error at the year_of_completion field
//   }
// )
;

export const experienceSchema = z.object({
  company: z.string().min(2, 'Company name is required'),
  position: z.string().min(2, 'Position is required'),
  employment_start_date: z.string().min(4, 'Start date is required'),
  employment_end_date: z.string().min(4, 'End date is required'),
  location: z.object({
    country: z.string().min(2, 'Country is required'),
    city: z.string().min(2, 'City is required'),
  }),
  industry: z.string().optional(),
  key_responsibilities: z.array(z.string().min(1, 'Responsibility is required')).min(1, 'At least one responsibility is required'),
  skills_acquired: z.array(z.string())
});

export const additionalInfoSchema = z.object({
  languages: z.array(z.object({
    language: z.string().nullable()
    .refine((val) => val !== null && val.length >= 2, {
      message: 'Language is required'
    })
    .transform(val => val || ''),
    proficiency: z.string().nullable()
    .refine((val) => val !== null && val.length >= 2, {
      message: 'Proficiency is required'
    })
    .transform(val => val || ''),
  })),
  projects: z.array(z.object({
    name: z.string().nullish(),
    description: z.string().nullish(),
    link: z.string().nullish(),
  })),
  certifications: z.array(z.object({
    name: z.string().nullish(),
    description: z.string().nullish()
  })),
  availability: z.object({
    notice_period: z.string().nullish()
  }),
  salary_expectations: z.object({
    salary_range_usd: z.string().nullish()
  }),
  self_identification: z.object({
    gender: z.string().nullish(),
    pronouns: z.string().nullish(),
    ethnicity: z.string().nullish(),
    veteran: z.boolean().nullish(),
    disability: z.boolean().nullish()
  }),
  legal_authorization: z.object({
    eu_work_authorization: z.boolean(),
    us_work_authorization: z.boolean(),
    requires_us_visa: z.boolean(),
    requires_us_sponsorship: z.boolean(),
    requires_eu_visa: z.boolean(),
    legally_allowed_to_work_in_eu: z.boolean(),
    legally_allowed_to_work_in_us: z.boolean(),
    requires_eu_sponsorship: z.boolean(),
    canada_work_authorization: z.boolean(),
    requires_canada_visa: z.boolean(),
    legally_allowed_to_work_in_canada: z.boolean(),
    requires_canada_sponsorship: z.boolean(),
    uk_work_authorization: z.boolean(),
    requires_uk_visa: z.boolean(),
    legally_allowed_to_work_in_uk: z.boolean(),
    requires_uk_sponsorship: z.boolean()
  }),
  work_preferences: z.object({
    remote_work: z.boolean(),
    in_person_work: z.boolean(),
    open_to_relocation: z.boolean(),
    willing_to_complete_assessments: z.boolean(),
    willing_to_undergo_drug_tests: z.boolean(),
    willing_to_undergo_background_checks: z.boolean()
  }),
  achievements: z.array(z.object({
    name: z.string().nullish(),
    description: z.string().nullish()
  })),
  interests: z.array(z.string())
});

export const cvFormSchema = z.object({
  personalInfo: personalInfoSchema,
  educationDetails: z.array(educationSchema),
  experienceDetails: z.array(experienceSchema),
  additionalInfo: additionalInfoSchema
});

export type CVFormData = z.infer<typeof cvFormSchema>;