export interface DetailedPendingApplication {
    resume_optimized: ResumeOptimized;
    cover_letter:     CoverLetter;
    job_info:         JobInfo;
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
    projects?:      ProjectDetails[];
    side_projects?:      ProjectDetails[];
    achievements?:       Achievements;
    certifications?:     Certifications;
    additional_skills?:  AdditionalSkills;
}

interface JobInfo {
    id: string
    title: string
    is_remote: string
    workplace_type: string
    posted_date: string
    job_state: string
    description: string
    apply_link: string
    company_name: string
    location: string
    job_id: number
    portal: string
    gen_cv: string
}

interface ProjectDetails {
  name?: string;
  description?: string;
  link?: string; 
}

interface Achievements {
    achievements?: Achievement[]; 
}

interface Achievement {
    name?:        string;
    description?: string;
}

interface Certifications {
    certifications?: Certification[]; 
}

interface Certification {
    name?:        string;
    description?: string;
}

interface AdditionalSkills {
    additional_skills?: string[]; 
    languages?:         Language[]; 
}

interface Language {
    language?:    string;
    proficiency?: string;
}

interface EducationDetails {
    education_details: EducationDetail[]; 
}

export interface EducationDetail {
    education_level:        string; 
    institution:            string;
    field_of_study:         string;
    final_evaluation_grade: string;
    start_date:             number;
    year_of_completion:     number;
    location:               string;
    exam?:                    Exam;
}

interface Exam {
    [key: string]: number;
}

interface ExperienceDetails {
    experience_details?: ExperienceDetail[]; 
}

interface ExperienceDetail {
    position?:             string;
    company?:              string;
    employment_period?:    string;
    location?:             string;
    industry?:             string;
    key_responsibilities?: string[]; 
    skills_acquired?:      string[]; 
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
    phone?:         number;
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

