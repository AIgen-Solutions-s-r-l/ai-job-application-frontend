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

interface Resume {
    header?: ResumeHeader;
    body:   ResumeBody;
}

interface ResumeBody {
    education_details:  EducationDetails;
    experience_details?: ExperienceDetails;
    side_projects?:      ProjectDetails[];
    achievements?:       Achievements;
    certifications?:     Certifications;
    additional_skills?:  AdditionalSkills;
}

interface ProjectDetails {
  name?: string;
  description?: string;
  link?: string; 
}

interface Achievements {
    achievements?: Achievement[]; // Array is optional
}

interface Achievement {
    name?:        string;
    description?: string;
}

interface Certifications {
    certifications?: Certification[]; // Array is optional
}

interface Certification {
    name?:        string;
    description?: string;
}

interface AdditionalSkills {
    additional_skills?: string[]; // Array is optional
    languages?:         Language[]; // Array is optional
}

interface Language {
    language?:    string;
    proficiency?: string;
}

interface EducationDetails {
    education_details: EducationDetail[]; // Array is optional
}

interface EducationDetail {
    education_level:        string; // All fields are optional now
    institution:            string;
    field_of_study:         string;
    final_evaluation_grade: string;
    start_date:             string;
    year_of_completion:     string;
}

interface ExperienceDetails {
    experience_details?: ExperienceDetail[]; // Array is optional
}

interface ExperienceDetail {
    position?:             string; // All fields are optional now
    company?:              string;
    employment_period?:    string;
    location?:             string;
    industry?:             string;
    key_responsibilities?: string[]; // Array is optional
    skills_acquired?:      string[]; // Array is optional
}

interface ResumeHeader {
    personal_information?: PersonalInformation;
}

interface PersonalInformation {
    name?:          string;
    surname?:       string;
    date_of_birth?: string;
    country?:       string;
    city?:          string;
    address?:       string;
    phone_prefix?:  string;
    phone?:         string;
    email?:         string;
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

interface CoverLetterBody {
    greeting:          string;
    opening_paragraph: string;
    body_paragraphs:   string;
    closing_paragraph: string;
}

interface CoverLetterFooter {
    closing:   string;
    signature: string;
    date:      string;
}

interface CoverLetterHeader {
    applicant_details: CoverLetterApplicantDetails;
    company_details:   CoverLetterCompanyDetails;
}

interface CoverLetterApplicantDetails {
    name:           string;
    address:        string;
    city_state_zip?: string;
    email:          string;
    phone_number:   string;
}

interface CoverLetterCompanyDetails {
    name: string;
}