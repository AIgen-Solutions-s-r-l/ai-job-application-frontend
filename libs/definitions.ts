export interface JobRole {
  id?: string;
  profile_id: string;
  job_title: string;
  location: string;
  job_type: Record<string, boolean>;
  work_type: string;
  experience_level: Record<string, boolean>;
  date: Record<string, boolean>;
  apply_once_at_company: boolean;
  company_blacklist: string[];
  title_blacklist: string[];
  min_applicants: number;
  max_applicants: number;
  created_at: string;
  updated_at: string;
}

export interface CVType {
  name: string;
  size: number;
  type: string;
  path: string;
}

export interface PersonalInformation {
  id?: string;
  name: string;
  surname: string;
  date_of_birth: string;
  location: {
    country: string;
    city: string;
  };
  zip_code?: string;
  address: string;
  phone_prefix: string;
  phone: string;
  email: string;
  github?: string;
  linkedin?: string;
}

export interface EducationDetails {
  id?: string;
  education_level: string;
  institution: string;
  field_of_study: string;
  final_evaluation_grade?: string; // Opcional
  year_of_completion: string;
  start_date: string;
  location: {
    country: string;
    city: string;
  };
  exam: Exam[]
}

export interface Exam {
  subject: string
  grade: string
}

export interface ExperienceDetails {
  id?: string;
  position: string;
  company: string;
  // employment_period: string; // Puede ser una fecha o rango de fechas
  employment_start_date: string;
  employment_end_date: string;
  location: {
    country: string;
    city: string;
  };
  industry: string;
  key_responsibilities: string[]; // Lista de responsabilidades
  skills_acquired: string[]; // Lista de habilidades adquiridas
}

export interface AdditionalInfo {
  projects: ProjectDetails[];
  achievements: Achievement[];
  certifications: Certification[];
  languages: Language[];
  interests: string[];
  self_identification: SelfIdentification;
  legal_authorization: LegalAuthorization;
  work_preferences: WorkPreferences;
  availability: Availability;
  salary_expectations: SalaryExpectations;
}

export interface Availability {
  id?: string;
  notice_period: string;
}

export interface SalaryExpectations {
  id?: string;
  salary_range_usd: string;
}

export interface ProjectDetails {
  id?: string;
  name: string;
  description: string;
  link: string; // URL del proyecto, si existe
}

export interface Achievement {
  id?: string;
  name: string;
  description: string;
}

export interface Certification {
  id?: string;
  name: string;
  description: string;
}

export interface Language {
  id?: string;
  language: string;
  proficiency: string;
}

export interface SelfIdentification {
  id?: string;
  gender: string;
  pronouns: string;
  veteran: boolean;
  disability: boolean;
  ethnicity: string;
}

export interface LegalAuthorization {
  id?: string;
  eu_work_authorization: boolean;
  us_work_authorization: boolean;
  requires_us_visa: boolean;
  requires_us_sponsorship: boolean;
  requires_eu_visa: boolean;
  legally_allowed_to_work_in_eu: boolean;
  legally_allowed_to_work_in_us: boolean;
  requires_eu_sponsorship: boolean;
  canada_work_authorization: boolean;
  requires_canada_visa: boolean;
  legally_allowed_to_work_in_canada: boolean;
  requires_canada_sponsorship: boolean;
  uk_work_authorization: boolean;
  requires_uk_visa: boolean;
  legally_allowed_to_work_in_uk: boolean;
  requires_uk_sponsorship: boolean;
}

export interface WorkPreferences {
  id?: string;
  remote_work: boolean;
  in_person_work: boolean;
  open_to_relocation: boolean;
  willing_to_complete_assessments: boolean;
  willing_to_undergo_drug_tests: boolean;
  willing_to_undergo_background_checks: boolean;
}

export interface UploadedFiles {
  [key: string | number]: File
}

export interface UploadFile {
  id?: string;
  user_id?: string;
  path: string;
  full_path: string;
  size: number;
  type: string;
  name: string;
  class: string;
}

export interface MatchingJob {
  id: string
  title: string
  workplace_type: string
  posted_date: string
  // job_state: string
  description: string
  // apply_link: string
  company_name: string
  company_logo?: string
  location: string
  city: string
  country: string
  // portal: string
  short_description: string
  field: string
  experience: string
  score: number
  skills_required: string[]
}

export type PendingApplicationRecord = Record<string, PendingApplication>;

export interface PendingApplication {
  id: string
  portal: string
  title: string
  workplace_type: string
  posted_date: string
  job_state: string
  description: string
  apply_link: string
  company_name: string
  location: string
  short_description: string
  field: string
  company_logo: string
  experience: string
  skills_required: string[]
  style: string
  sent: boolean
  gen_cv: boolean
}

export interface DetailedPendingApplication {
  resume_optimized: string;
  cover_letter: string;
  job_id: number;
  title: string;
  description: string;
  portal: string;
  sent: boolean;
}

export interface JobDetail {
  id: number
  status: string
  portal: string
  title: string
  workplace_type: string
  posted_date: string
  job_state: string
  description: string
  apply_link: string
  company_name: string
  location: string
  short_description: string
  field: string
  company_logo: string
  experience: string
  skills_required: string[]
}

export type JobsList = Record<string, JobDetail>

export interface JobSearchParams {
  country?: string
  city?: string
  latitude?: number
  longitude?: number
  radius_km?: number
  keywords?: string[]
  offset?: number
}

export type JobSearchProps = JobSearchParams & {
  q: string;
  location: string;
}

export interface JobProfile {
  personalInfo: PersonalInformation;
  cv?: File;
  educationDetails: EducationDetails[];
  experienceDetails: ExperienceDetails[];
  additionalInfo: AdditionalInfo;
}

export interface AutoJob {
  id?: number;
  profile_id: string; // UUID que referencia el perfil
  company: string;
  job_title: string;
  link: string; // URL al trabajo
  job_recruiter: string;
  job_location: string; // Ubicación del trabajo
  pdf_path: string; // Ruta al PDF generado
  resume_path: string; // Ruta al currículum
  apply_responses: ApplyResponse[]; // Respuestas a las preguntas
  status: 'Success' | 'Skipped' | 'Failed'; // Estado de la interacción
  created_at: string; // Fecha de la aplicación
  bots?: {
    personal_information: { profile_alias: string };
    job_roles?: { job_title: string };
  }
}

export interface ApplyResponse {
  type: 'dropdown' | 'textbox'; // Tipo de pregunta
  question: string; // Pregunta hecha durante la aplicación
  answer: string; // Respuesta proporcionada
}

export interface Bot {
  id?: string; // UUID del bot
  name: string;
  max_applications: number;
  job_role: JobRole; // Relación con JobRole
  personal_information: PersonalInformation; // Relación con PersonalInformation
  status: 'active' | 'inactive'; // Estado del bot
  total_applications: number; // Total de aplicaciones realizadas por el bot
  ai_cv: boolean;
  created_at: string; // Fecha de creación del bot
  updated_at: string; // Fecha de última actualización del bot
}

export interface Transaction {
  id: number
  amount: string
  reference_id: any
  description: string
  user_id: number
  transaction_type: string
  created_at: string
  new_balance: string
}