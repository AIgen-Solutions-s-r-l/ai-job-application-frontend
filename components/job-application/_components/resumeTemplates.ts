const defaultTemplate: TemplateStyle = {
  body: 'w-full h-full py-8 px-10',
  personal: {
    header: 'flex flex-col items-center p-[10px]',
    h1: 'text-[32px] font-bold mb-[10px]',
    contactSection: 'flex flex-wrap items-center gap-[5px]',
    contactItem: 'pr-[5px] text-center [&:not(:last-child)]:border-r [&:not(:last-child)]:border-r-black [&:not(:last-child)]:border-solid',
  },
  education: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between items-center',
    entryDetails: 'flex justify-between items-center',
    compactList: 'flex flex-col gap-[5px] my-[5px] mx-[30px]'
  },
  experience: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between items-center',
    entryDetails: 'flex justify-between items-center',
    compactList: 'flex flex-col gap-[5px] my-[5px] mx-[30px]'
  },
  projects: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'flex items-center'
  },
  achievements: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'flex items-center'
  },
  certifications: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'flex items-center'
  },
  additional: {
    container: 'mt-8',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    skills: 'flex flex-wrap text-xs leading-none mt-2 gap-1',
    languages: 'flex flex-wrap text-xs leading-none mt-2 gap-1',
    languageItem: 'flex items-center align-top'
  },
};

const krishnavalliappanTemplate: TemplateStyle = {
  body: 'w-full h-full py-8 px-10',
  personal: {
    header: 'flex flex-col items-center p-[10px] bg-red-500',
    h1: 'text-[32px] font-bold mb-[10px]',
    contactSection: 'flex flex-wrap items-center gap-[5px]',
    contactItem: 'pr-[5px] text-center [&:not(:last-child)]:border-r [&:not(:last-child)]:border-r-black [&:not(:last-child)]:border-solid',
  },
  education: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between items-center',
    entryDetails: 'flex justify-between items-center',
    compactList: 'flex flex-col gap-[5px] my-[5px] mx-[30px]'
  },
  experience: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between items-center',
    entryDetails: 'flex justify-between items-center',
    compactList: 'flex flex-col gap-[5px] my-[5px] mx-[30px]'
  },
  projects: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'flex items-center'
  },
  achievements: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'flex items-center'
  },
  certifications: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'flex items-center'
  },
  additional: {
    container: 'mt-8',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    skills: 'flex flex-wrap text-xs leading-none mt-2 gap-1',
    languages: 'flex flex-wrap text-xs leading-none mt-2 gap-1',
    languageItem: 'flex items-center align-top'
  },
};

export const templateStyles = {
  default: defaultTemplate,
  krishnavalliappan: krishnavalliappanTemplate,
} as const;

export type TemplateType = keyof typeof templateStyles;

export interface TemplateStyle {
  body: string;
  personal: PersonalStyle;
  education: EducationStyle;
  experience: ExperienceStyle;
  projects: ProjectsStyle;
  achievements: AchievementsStyle;
  certifications: CertificationsStyle;
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
  compactList: string;
}
interface ExperienceStyle {
  container: string;
  h2: string;
  entry: string;
  entryHeader: string;
  entryDetails: string;
  compactList: string;
}
interface ProjectsStyle {
  container: string;
  h2: string;
  entry: string;
  entryHeader: string;
  compactList: string;
}
interface AchievementsStyle {
  container: string;
  h2: string;
  entry: string;
  entryHeader: string;
  compactList: string;
}
interface CertificationsStyle {
  container: string;
  h2: string;
  entry: string;
  entryHeader: string;
  compactList: string;
}
interface AdditionalStyle {
  container: string;
  h2: string;
  skills: string;
  languages: string;
  languageItem: string;
}
