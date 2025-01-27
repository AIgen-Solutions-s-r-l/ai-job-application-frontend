export interface Resume {
    personalInfo: ResumePersonalInformation;
    educationDetails: ResumeEducationDetails[];
    experienceDetails: ResumeExperienceDetails[];
    additionalInfo: ResumeAdditionalInfo;
}

export interface ResumePersonalInformation {
  name: string;
  surname: string;
  date_of_birth: string;
  country: string;
  city: string;
  zip_code?: string;
  address: string;
  phone_prefix: string;
  phone: string;
  email: string;
  github?: string;
  linkedin?: string;
}

export interface ResumeEducationDetails {
  education_level: string;
  institution: string;
  field_of_study: string;
  final_evaluation_grade: string;
  year_of_completion: string;
  start_date: string;
  location: string;
}

export interface ResumeExperienceDetails {
  position: string;
  company: string;
  employment_period: string; 
  location: string;
  industry: string;
  key_responsibilities: string[]; 
  skills_acquired: string[]; 
}

export interface ResumeAdditionalInfo {
  side_projects:        ResumeProjectDetails[];
  achievements:         ResumeAchievement[];
  certifications:       ResumeCertification[];
  languages:            ResumeLanguage[];
  interests:            string[];
  additional_skills:    string[];
}

export interface ResumeProjectDetails {
  name: string;
  description: string;
  link: string; 
}

export interface ResumeAchievement {
  name: string;
  description: string;
}

export interface ResumeCertification {
  name: string;
  description: string;
}

export interface ResumeLanguage {
  language: string;
  proficiency: string;
}