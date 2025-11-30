import { describe, it, expect } from 'vitest';
import {
  personalInfoSchema,
  educationSchema,
  experienceSchema,
  additionalInfoSchema,
} from '@/libs/validations/cv-form-schema';

describe('personalInfoSchema', () => {
  const validPersonalInfo = {
    name: 'John',
    surname: 'Doe',
    date_of_birth: '1990-01-15',
    city: 'New York',
    address: '123 Main Street',
    country: 'United States',
    zip_code: '10001',
    phone_prefix: '+1',
    phone: '555-123-4567',
    email: 'john.doe@example.com',
  };

  it('should validate correct personal info', () => {
    const result = personalInfoSchema.safeParse(validPersonalInfo);
    expect(result.success).toBe(true);
  });

  it('should reject name with numbers', () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      name: 'John123',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('cannot contain numbers');
    }
  });

  it('should reject name that is too short', () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      name: 'J',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('at least 2 characters');
    }
  });

  it('should reject invalid email format', () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      email: 'not-an-email',
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('Invalid email');
    }
  });

  it('should reject future date of birth', () => {
    const futureDate = new Date();
    futureDate.setFullYear(futureDate.getFullYear() + 1);
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      date_of_birth: futureDate.toISOString().split('T')[0],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('cannot be in the future');
    }
  });

  it('should reject invalid phone number format', () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      phone: 'abc-invalid',
    });
    expect(result.success).toBe(false);
  });

  it('should accept valid optional GitHub URL', () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      github: 'https://github.com/johndoe',
    });
    expect(result.success).toBe(true);
  });

  it('should reject invalid GitHub URL', () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      github: 'not-a-url',
    });
    expect(result.success).toBe(false);
  });

  it('should accept names with apostrophes and hyphens', () => {
    const result = personalInfoSchema.safeParse({
      ...validPersonalInfo,
      name: "Mary-Jane",
      surname: "O'Connor",
    });
    expect(result.success).toBe(true);
  });
});

describe('educationSchema', () => {
  const validEducation = {
    education_level: 'Bachelor',
    institution: 'MIT',
    field_of_study: 'Computer Science',
    start_date: '2018',
    year_of_completion: '2022',
    final_evaluation_grade: '3.8',
    location: {
      country: 'United States',
      city: 'Cambridge',
    },
    exam: [],
  };

  it('should validate correct education info', () => {
    const result = educationSchema.safeParse(validEducation);
    expect(result.success).toBe(true);
  });

  it('should reject education level with numbers', () => {
    const result = educationSchema.safeParse({
      ...validEducation,
      education_level: 'Bachelor123',
    });
    expect(result.success).toBe(false);
  });

  it('should reject country with numbers', () => {
    const result = educationSchema.safeParse({
      ...validEducation,
      location: {
        country: 'United States 123',
        city: 'Cambridge',
      },
    });
    expect(result.success).toBe(false);
  });
});

describe('experienceSchema', () => {
  const validExperience = {
    company: 'TechCorp',
    position: 'Software Engineer',
    employment_start_date: '2020-01',
    employment_end_date: '2023-06',
    location: {
      country: 'United States',
      city: 'San Francisco',
    },
    key_responsibilities: ['Developed web applications', 'Led team meetings'],
    skills_acquired: ['React', 'TypeScript'],
  };

  it('should validate correct experience info', () => {
    const result = experienceSchema.safeParse(validExperience);
    expect(result.success).toBe(true);
  });

  it('should reject empty key responsibilities', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      key_responsibilities: [],
    });
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.issues[0].message).toContain('At least one responsibility');
    }
  });

  it('should reject company name that is too short', () => {
    const result = experienceSchema.safeParse({
      ...validExperience,
      company: 'A',
    });
    expect(result.success).toBe(false);
  });
});

describe('additionalInfoSchema', () => {
  const validAdditionalInfo = {
    languages: [
      { language: 'English', proficiency: 'Native' },
    ],
    projects: [],
    certifications: [],
    self_identification: {
      gender: null,
      pronouns: null,
      ethnicity: null,
      veteran: null,
      disability: null,
    },
    legal_authorization: {
      eu_work_authorization: true,
      us_work_authorization: false,
      requires_us_visa: true,
      requires_us_sponsorship: true,
      requires_eu_visa: false,
      legally_allowed_to_work_in_eu: true,
      legally_allowed_to_work_in_us: false,
      requires_eu_sponsorship: false,
      canada_work_authorization: false,
      requires_canada_visa: true,
      legally_allowed_to_work_in_canada: false,
      requires_canada_sponsorship: true,
      uk_work_authorization: false,
      requires_uk_visa: true,
      legally_allowed_to_work_in_uk: false,
      requires_uk_sponsorship: true,
    },
    work_preferences: {
      remote_work: true,
      in_person_work: false,
      open_to_relocation: true,
      willing_to_complete_assessments: true,
      willing_to_undergo_drug_tests: true,
      willing_to_undergo_background_checks: true,
    },
    achievements: [],
    interests: ['coding', 'reading'],
  };

  it('should validate correct additional info', () => {
    const result = additionalInfoSchema.safeParse(validAdditionalInfo);
    expect(result.success).toBe(true);
  });

  it('should reject language with numbers', () => {
    const result = additionalInfoSchema.safeParse({
      ...validAdditionalInfo,
      languages: [
        { language: 'English123', proficiency: 'Native' },
      ],
    });
    expect(result.success).toBe(false);
  });

  it('should accept empty arrays for optional fields', () => {
    const result = additionalInfoSchema.safeParse({
      ...validAdditionalInfo,
      projects: [],
      certifications: [],
      achievements: [],
      interests: [],
    });
    expect(result.success).toBe(true);
  });
});
