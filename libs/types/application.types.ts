export interface DetailedPendingApplication {
    resume_optimized: ResumeOptimized;
    cover_letter:     CoverLetter;
    job_id:           null;
    title:            string;
    description:      string;
    portal:           string;
    sent:             string;
}

export interface ResumeOptimized {
    resume: Resume;
}

export interface Resume {
    header: ResumeHeader;
    body:   ResumeBody;
}

export interface ResumeBody {
    education_details:  EducationDetails;
    experience_details: ExperienceDetails;
    side_projects:      ProjectDetails[];
    achievements:       Achievements;
    certifications:     Certifications;
    additional_skills:  AdditionalSkills;
}

export interface ProjectDetails {
  name: string;
  description: string;
  link: string; 
}

export interface Achievements {
    achievements: Achievement[];
}

export interface Achievement {
    name:        string;
    description: string;
}

export interface Certifications {
    certifications: Certification[];
}

export interface Certification {
    name:        string;
    description: string;
}

export interface AdditionalSkills {
    additional_skills: string[];
    languages:         Language[];
}

export interface Language {
    language:    string;
    proficiency: string;
}

export interface EducationDetails {
    education_details: EducationDetail[];
}

export interface EducationDetail {
    education_level:        string;
    institution:            string;
    field_of_study:         string;
    final_evaluation_grade: string;
    start_date:             string;
    year_of_completion:     string;
}

export interface ExperienceDetails {
    experience_details: ExperienceDetail[];
}

export interface ExperienceDetail {
    position:             string;
    company:              string;
    employment_period:    string;
    location:             string;
    industry?:             string;
    key_responsibilities: string[];
    skills_acquired:      string[];
}

export interface ResumeHeader {
    personal_information: PersonalInformation;
}

export interface PersonalInformation {
    name:          string;
    surname:       string;
    date_of_birth: string;
    country:       string;
    city:          string;
    address:       string;
    phone_prefix:  string;
    phone:         string;
    email:         string;
    github?:        string;
    linkedin?:      string;
}

export interface CoverLetter {
    cover_letter: CoverLetterCoverLetter;
}

export interface CoverLetterCoverLetter {
    header: CoverLetterHeader;
    body:   CoverLetterBody;
    footer: CoverLetterFooter;
}

export interface CoverLetterBody {
    greeting:          string;
    opening_paragraph: string;
    body_paragraphs:   string;
    closing_paragraph: string;
}

export interface CoverLetterFooter {
    closing:   string;
    signature: string;
    date:      string;
}

export interface CoverLetterHeader {
    applicant_details: CoverLetterApplicantDetails;
    company_details:   CoverLetterCompanyDetails;
}

export interface CoverLetterApplicantDetails {
    name:           string;
    address:        string;
    city_state_zip?: string;
    email:          string;
    phone_number:   string;
}

export interface CoverLetterCompanyDetails {
    name: string;
}