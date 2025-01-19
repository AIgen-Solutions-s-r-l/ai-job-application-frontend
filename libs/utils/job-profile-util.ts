import {
  JobProfile,
  AdditionalInfo,
  SelfIdentification,
  LegalAuthorization,
  WorkPreferences,
} from '../definitions';


export function toJobProfile(resumeData: any): JobProfile {
  if (!resumeData) {
    return defaultJobProfile;
  }
  
  const { 
    personal_information, 
    education_details, 
    experience_details, 
    projects, 
    achievements, 
    certifications, 
    languages, 
    interests,
    self_identification,
    legal_authorization,
    work_preferences,
    availability,
    salary_expectations,
  } = resumeData;


  const additionalInfo: AdditionalInfo = {
    projects: projects?.length ? projects : defaultJobProfile.additionalInfo.projects,
    achievements: achievements?.length ? achievements : defaultJobProfile.additionalInfo.achievements,
    certifications: certifications?.length ? certifications : defaultJobProfile.additionalInfo.certifications,
    languages: languages?.length ? languages : defaultJobProfile.additionalInfo.languages,
    interests: interests || [],
    self_identification: toSelfIdentification(self_identification),
    legal_authorization: toLegalAuthorization(legal_authorization),
    work_preferences: toWorkPreferences(work_preferences),
    availability: availability,
    salary_expectations: salary_expectations,
  };

  return {
    personalInfo: personal_information,
    educationDetails: education_details || [
    {
      start_date: "",
      institution: "",
      field_of_study: "",
      education_level: "",
      year_of_completion: "",
      final_evaluation_grade: "",
    }
  ],
    experienceDetails: experience_details || [
    {
      company: "",
      industry: "",
      location: "",
      position: "",
      skills_acquired: [],
      employment_period: "",
      key_responsibilities: [],
    }
  ],
    additionalInfo,
  };
}

export function fromJobProfile(jobProfile: JobProfile): any {
  return {
      "personal_information": jobProfile.personalInfo,
      "education_details": jobProfile.educationDetails,
      "experience_details": jobProfile.experienceDetails,
      "projects": jobProfile.additionalInfo.projects,
      "achievements": jobProfile.additionalInfo.achievements,
      "certifications": jobProfile.additionalInfo.certifications,
      "languages": jobProfile.additionalInfo.languages,
      "interests": jobProfile.additionalInfo.interests,
      "self_identification": fromSelfIdentification(jobProfile.additionalInfo.self_identification),
      "legal_authorization": fromLegalAuthorization(jobProfile.additionalInfo.legal_authorization),
      "work_preferences": fromWorkPreferences(jobProfile.additionalInfo.work_preferences),
      "availability": jobProfile.additionalInfo.availability,
      "salary_expectations": jobProfile.additionalInfo.salary_expectations
  };
}

const toSelfIdentification = (data: any): SelfIdentification => ({
  ...data,
  veteran: data.veteran === "true",
  disability: data.disability === "true",
});

const toLegalAuthorization = (data: any): LegalAuthorization => {
  const booleanFields = [
    "eu_work_authorization",
    "us_work_authorization",
    "requires_us_visa",
    "requires_us_sponsorship",
    "requires_eu_visa",
    "legally_allowed_to_work_in_eu",
    "legally_allowed_to_work_in_us",
    "requires_eu_sponsorship",
    "canada_work_authorization",
    "requires_canada_visa",
    "legally_allowed_to_work_in_canada",
    "requires_canada_sponsorship",
    "uk_work_authorization",
    "requires_uk_visa",
    "legally_allowed_to_work_in_uk",
    "requires_uk_sponsorship",
  ];

  const convertedData = { ...data };
  booleanFields.forEach((field) => {
    convertedData[field] = data[field] === "true";
  });

  return convertedData as LegalAuthorization;
};

const toWorkPreferences = (data: any): WorkPreferences => ({
  remote_work: data.remote_work === "true",
  in_person_work: data.in_person_work === "true",
  open_to_relocation: data.open_to_relocation === "true",
  willing_to_complete_assessments: data.willing_to_complete_assessments === "true",
  willing_to_undergo_drug_tests: data.willing_to_undergo_drug_tests === "true",
  willing_to_undergo_background_checks: data.willing_to_undergo_background_checks === "true",
});

const fromSelfIdentification = (data: SelfIdentification): any => ({
    ...data,
    veteran: data.veteran ? "true" : "false",
    disability: data.disability ? "true" : "false",
});

const fromLegalAuthorization = (data: LegalAuthorization): any => ({
    eu_work_authorization: data.eu_work_authorization ? "true" : "false",
    us_work_authorization: data.us_work_authorization ? "true" : "false",
    requires_us_visa: data.requires_us_visa ? "true" : "false",
    requires_us_sponsorship: data.requires_us_sponsorship ? "true" : "false",
    requires_eu_visa: data.requires_eu_visa ? "true" : "false",
    legally_allowed_to_work_in_eu: data.legally_allowed_to_work_in_eu ? "true" : "false",
    legally_allowed_to_work_in_us: data.legally_allowed_to_work_in_us ? "true" : "false",
    requires_eu_sponsorship: data.requires_eu_sponsorship ? "true" : "false",
    canada_work_authorization: data.canada_work_authorization ? "true" : "false",
    requires_canada_visa: data.requires_canada_visa ? "true" : "false",
    legally_allowed_to_work_in_canada: data.legally_allowed_to_work_in_canada ? "true" : "false",
    requires_canada_sponsorship: data.requires_canada_sponsorship ? "true" : "false",
    uk_work_authorization: data.uk_work_authorization ? "true" : "false",
    requires_uk_visa: data.requires_uk_visa ? "true" : "false",
    legally_allowed_to_work_in_uk: data.legally_allowed_to_work_in_uk ? "true" : "false",
    requires_uk_sponsorship: data.requires_uk_sponsorship ? "true" : "false",
});

const fromWorkPreferences = (data: WorkPreferences): any => ({
    remote_work: data.remote_work ? "true" : "false",
    in_person_work: data.in_person_work ? "true" : "false",
    open_to_relocation: data.open_to_relocation ? "true" : "false",
    willing_to_complete_assessments: data.willing_to_complete_assessments ? "true" : "false",
    willing_to_undergo_drug_tests: data.willing_to_undergo_drug_tests ? "true" : "false",
    willing_to_undergo_background_checks: data.willing_to_undergo_background_checks ? "true" : "false",
});

export const defaultJobProfile: JobProfile = {
  personalInfo: {
    name: "",
    surname: "",
    date_of_birth: Date.now().toString(),
    country: "",
    city: "",
    address: "",
    phone_prefix: "",
    phone: "",
    email: "",
  },
  educationDetails: [
    {
      start_date: "",
      institution: "",
      field_of_study: "",
      education_level: "",
      year_of_completion: "",
      final_evaluation_grade: "",
    }
  ],
  experienceDetails: [
    {
      company: "",
      industry: "",
      location: "",
      position: "",
      skills_acquired: [],
      employment_period: "",
      key_responsibilities: [],
    }
  ],
  additionalInfo: {
    projects: [
      {
        link: "",
        name: "",
        description: "",
      }
    ],
    achievements: [
      {
        name: "",
        description: "",
      }
    ],
    certifications: [
      {
        name: "",
        description: "",
      }
    ],
    languages: [
      {
        language: "",
        proficiency: "",
      }
    ],
    interests: [],
    availability: {
      notice_period: "",
    },
    salary_expectations: {
      salary_range_usd: "",
    },
    self_identification: {
      gender: "",
      veteran: false,
      pronouns: "",
      ethnicity: "",
      disability: false,
    },
    legal_authorization: {
      requires_eu_visa: false,
      requires_uk_visa: false,
      requires_us_visa: false,
      requires_canada_visa: false,
      eu_work_authorization: false,
      uk_work_authorization: false,
      us_work_authorization: false,
      requires_eu_sponsorship: false,
      requires_uk_sponsorship: false,
      requires_us_sponsorship: false,
      canada_work_authorization: false,
      requires_canada_sponsorship: false,
      legally_allowed_to_work_in_eu: false,
      legally_allowed_to_work_in_uk: false,
      legally_allowed_to_work_in_us: false,
      legally_allowed_to_work_in_canada: false
    },
    work_preferences: {
      remote_work: false,
      in_person_work: false,
      open_to_relocation: false,
      willing_to_undergo_drug_tests: false,
      willing_to_complete_assessments: false,
      willing_to_undergo_background_checks: false
    }
  }
}