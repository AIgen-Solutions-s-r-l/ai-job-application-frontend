export interface TemplateStyle {
  background?: string;
  body: string;
  personal: PersonalStyle;
  education: EducationStyle;
  experience: ExperienceStyle;
  projects: ProjectsStyle;
  additional: AdditionalStyle;
}
interface PersonalStyle {
  header: string;
  h1: string;
  contactSection: string;
  contactItem: string;
}
interface EducationStyle {
  container: string;
  h2: string;
  entry: string;
  entryHeader: string;
  entryDetails: string;
  coursesDetails?: string;
  compactList?: string;
  listItem?: string;
  entryName?: string;
  entryLocation?: string;
  entryTitle?: string;
  entryYear?: string;
}
interface ExperienceStyle {
  container: string;
  h2: string;
  entry: string;
  entryHeader: string;
  entryDetails: string;
  compactList: string;
  listItem?: string;
  entryName?: string;
  entryLocation?: string;
  entryTitle?: string;
  entryYear?: string;
}
interface ProjectsStyle {
  container: string;
  h2: string;
  entry: string;
  entryHeader: string;
  compactList: string;
  listItem?: string;
  entryName?: string;
}
interface AdditionalStyle {
  container: string;
  h2: string;
  h3: string;
  compactList: string;
  listItem?: string;
  languages?: string;
  languageItem?: string;
}