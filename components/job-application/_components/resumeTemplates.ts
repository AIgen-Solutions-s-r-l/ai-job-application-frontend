const defaultTemplate: TemplateStyle = {
  body: 'font-roboto max-w-[850px] mx-auto p-[20px] text-[10pt]',
  personal: {
    header: 'flex flex-col items-center mb-[10px]',
    h1: 'text-[32px] font-bold my-[10px]',
    contactSection: 'flex flex-wrap items-center gap-[5px]',
    contactItem: 'pr-[5px] text-center [&:not(:last-child)]:border-r [&:not(:last-child)]:border-r-black [&:not(:last-child)]:border-solid',
  },
  education: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between items-center',
    entryDetails: 'flex justify-between items-center',
    compactList: 'list-disc flex flex-col gap-[5px] my-[5px] mx-[30px]'
  },
  experience: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between items-center',
    entryDetails: 'flex justify-between items-center',
    compactList: 'list-disc flex flex-col gap-[5px] my-[5px] mx-[30px]'
  },
  projects: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  achievements: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  certifications: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    entry: 'flex flex-col gap-[5px] p-[10px] -mx-[10px]',
    entryHeader: 'flex items-center',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  additional: {
    container: '',
    h2: 'text-2xl font-bold border-b border-solid border-black',
    skills: 'flex flex-wrap gap-1 pt-[10px] px-[10px] pb-[5px] -mx-[10px]',
    languages: 'flex flex-wrap items-center',
    languageItem: 'flex items-center align-top py-[5px] px-[1px]'
  },
};

const krishnavalliappanTemplate: TemplateStyle = {
  body: 'font-barlow leading-[1.2] text-[#333] max-w-[700px] mx-auto p-[10px] text-[9pt]',
  personal: {
    header: 'text-center mb-[10px]',
    h1: 'text-[24pt] font-bold mb-[5px]',
    contactSection: 'flex justify-center flex-wrap gap-[10px] text-[9pt] font-normal',
    contactItem: 'mr-[3px]',
  },
  education: {
    container: '',
    h2: 'text-[16pt] font-semibold border-b border-solid border-[#333] pb-[2px] mt-[10px] mb-[5px] text-center',
    entry: 'mb-[8px] px-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between font-semibold',
    entryDetails: 'flex justify-between italic mb-[2px] text-[8pt]',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  experience: {
    container: '',
    h2: 'text-[16pt] font-semibold border-b border-solid border-[#333] pb-[2px] mt-[10px] mb-[5px] text-center',
    entry: 'mb-[8px] px-[10px] -mx-[10px]',
    entryHeader: 'flex justify-between font-semibold',
    entryDetails: 'flex justify-between italic mb-[2px] text-[8pt]',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  projects: {
    container: '',
    h2: 'text-[16pt] font-semibold border-b border-solid border-[#333] pb-[2px] mt-[10px] mb-[5px] text-center',
    entry: 'mb-[8px] px-[10px] -mx-[10px]',
    entryHeader: 'flex font-semibold',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  achievements: {
    container: '',
    h2: 'text-[16pt] font-semibold border-b border-solid border-[#333] pb-[2px] mt-[10px] mb-[5px] text-center',
    entry: 'mb-[8px] px-[10px] -mx-[10px]',
    entryHeader: 'flex font-semibold',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  certifications: {
    container: '',
    h2: 'text-[16pt] font-semibold border-b border-solid border-[#333] pb-[2px] mt-[10px] mb-[5px] text-center',
    entry: 'mb-[8px] px-[10px] -mx-[10px]',
    entryHeader: 'flex font-semibold',
    compactList: 'list-disc my-[2px] pl-[15px] flex flex-col gap-[2px]'
  },
  additional: {
    container: '',
    h2: 'text-[16pt] font-semibold border-b border-solid border-[#333] pb-[2px] mt-[10px] mb-[5px] text-center',
    skills: 'flex flex-wrap gap-1 px-[10px] -mx-[10px] mb-[3px]',
    languages: 'flex flex-wrap items-center',
    languageItem: 'flex items-center align-top py-[5px] px-[1px]'
  },
};

const samodumBoldTemplate: TemplateStyle = {
  body: 'font-open-sans text-[#383838] text-[0.875rem] max-w-[49.62rem] flex flex-col mx-auto py-[3.375rem] px-[1.5rem] gap-[1.5rem]',
  personal: {
    header: 'flex flex-col justify-between items-start gap-[1.5rem]',
    h1: 'font-josefin-sans text-[1.5rem] font-normal -mb-[0.125rem] text-blue-700',
    contactSection: 'flex flex-col gap-[0.125rem]',
    contactItem: 'font-open-sans before:mr-1 before:capitalize before:font-josefin-sans before:font-semibold [&:nth-child(1):before]:content-["address:"] [&:nth-child(2):before]:content-["phone:"] [&:nth-child(3):before]:content-["email:"] [&:nth-child(4):before]:content-["linkedin:"] [&:nth-child(5):before]:content-["github:"]',
  },
  education: {
    container: '',
    h2: 'font-josefin-sans text-[1.125rem] font-bold text-blue-700 mb-[0.5rem] pb-[0.25rem] border-b border-solid border-[#b8b8b8]',
    entry: 'pt-[1rem] grid grid-cols-[1fr_4fr] gap-x-[10px]',
    entryHeader: 'col-[1] font-josefin-sans font-semibold flex flex-col gap-1',
    entryDetails: 'col-[2] -mt-1',
    entryTitle: 'font-josefin-sans font-semibold mr-1',
    entryYear: 'italic',
    compactList: 'list-[circle] col-[2] pl-[10px] ml-[5px]'
  },
  experience: {
    container: '',
    h2: 'font-josefin-sans text-[1.125rem] font-bold text-blue-700 mb-[0.5rem] pb-[0.25rem] border-b border-solid border-[#b8b8b8]',
    entry: 'pt-[1rem] grid grid-cols-[1fr_4fr] gap-x-[10px]',
    entryHeader: 'col-[1] font-josefin-sans font-semibold flex flex-col gap-1',
    entryDetails: 'col-[2] -mt-1',
    entryTitle: 'font-josefin-sans font-semibold mr-1',
    entryYear: 'italic',
    compactList: 'list-[circle] col-[2] pl-[10px] ml-[5px]'
  },
  projects: {
    container: '',
    h2: 'font-josefin-sans text-[1.125rem] font-bold text-blue-700 mb-[0.5rem] pb-[0.25rem] border-b border-solid border-[#b8b8b8]',
    entry: 'pt-[1rem] grid grid-cols-[1fr_4fr] gap-x-[10px]',
    entryHeader: 'col-[1] font-josefin-sans font-semibold flex flex-col gap-1',
    compactList: 'list-[circle] col-[2] pl-[10px] ml-[5px]'
  },
  achievements: {
    container: '',
    h2: 'font-josefin-sans text-[1.125rem] font-bold text-blue-700 mb-[0.5rem] pb-[0.25rem] border-b border-solid border-[#b8b8b8]',
    entry: 'pt-[1rem] grid grid-cols-[1fr_4fr] gap-x-[10px]',
    entryHeader: 'col-[1] font-josefin-sans font-semibold flex flex-col gap-1',
    compactList: 'list-[circle] col-[2] pl-[10px] ml-[5px]'
  },
  certifications: {
    container: '',
    h2: 'font-josefin-sans text-[1.125rem] font-bold text-blue-700 mb-[0.5rem] pb-[0.25rem] border-b border-solid border-[#b8b8b8]',
    entry: 'pt-[1rem] grid grid-cols-[1fr_4fr] gap-x-[10px]',
    entryHeader: 'col-[1] font-josefin-sans font-semibold flex flex-col gap-1',
    compactList: 'list-[circle] col-[2] pl-[10px] ml-[5px]'
  },
  additional: {
    container: '',
    h2: 'font-josefin-sans text-[1.125rem] font-bold text-blue-700 mb-[0.5rem] pb-[0.25rem] border-b border-solid border-[#b8b8b8]',
    skills: 'flex flex-wrap gap-1 px-[10px] -mx-[10px] mb-[3px]',
    languages: 'flex flex-wrap items-center',
    languageItem: 'flex items-center align-top py-[5px] px-[1px]'
  },
};

const josyladGreyTemplate: TemplateStyle = {
  background: 'bg-[#f9f9f9]',
  body: 'font-poppins leading-[1.6] text-[#333] max-w-[850px] mx-auto p-[20px] text-[10pt]',
  personal: {
    header: 'text-center mb-[20px] bg-[#4a4a4a] p-[20px] rounded-[8px] [box-shadow:0_4px_6px_rgba(0,_0,_0,_0.1)]',
    h1: 'text-[28pt] font-bold mb-[10px] text-[#fff]',
    contactSection: 'flex justify-center flex-wrap gap-[15px] text-[10pt] font-light text-[#e0e0e0]',
    contactItem: 'mt-[5px]',
  },
  education: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#4a4a4a] pb-[5px] mt-[20px] mb-[15px] text-[#333]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#4a4a4a]',
    entryDetails: 'flex justify-between italic mb-[8px] text-[9pt] text-[#777]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  experience: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#4a4a4a] pb-[5px] mt-[20px] mb-[15px] text-[#333]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#4a4a4a]',
    entryDetails: 'flex justify-between italic mb-[8px] text-[9pt] text-[#777]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  projects: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#4a4a4a] pb-[5px] mt-[20px] mb-[15px] text-[#333]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#4a4a4a]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  achievements: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#4a4a4a] pb-[5px] mt-[20px] mb-[15px] text-[#333]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#4a4a4a]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  certifications: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#4a4a4a] pb-[5px] mt-[20px] mb-[15px] text-[#333]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#4a4a4a]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  additional: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#4a4a4a] pb-[5px] mt-[20px] mb-[15px] text-[#333]',
    skills: 'flex gap-[4px] mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    languages: 'flex flex-wrap items-center mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    languageItem: 'flex items-center align-top py-[5px] px-[1px]'
  },
};

const josyladBlueTemplate: TemplateStyle = {
  background: 'bg-[#f9f9f9]',
  body: 'font-poppins leading-[1.6] text-[#2c3e50] max-w-[850px] mx-auto p-[20px] text-[10pt]',
  personal: {
    header: 'text-center mb-[20px] bg-[#3498db] p-[20px] rounded-[8px] [box-shadow:0_4px_6px_rgba(0,_0,_0,_0.1)]',
    h1: 'text-[28pt] font-bold mb-[10px] text-[#fff]',
    contactSection: 'flex justify-center flex-wrap gap-[15px] text-[10pt] font-light text-[#ecf0f1]',
    contactItem: 'mt-[5px]',
  },
  education: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#3498db] pb-[5px] mt-[20px] mb-[15px] text-[#2c3e50]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#3498db]',
    entryDetails: 'flex justify-between italic mb-[8px] text-[9pt] text-[#7f8c8d]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  experience: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#3498db]  pb-[5px] mt-[20px] mb-[15px] text-[#2c3e50]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#3498db]',
    entryDetails: 'flex justify-between italic mb-[8px] text-[9pt] text-[#7f8c8d]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  projects: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#3498db]  pb-[5px] mt-[20px] mb-[15px] text-[#2c3e50]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#3498db]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  achievements: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#3498db]  pb-[5px] mt-[20px] mb-[15px] text-[#2c3e50]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#3498db]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  certifications: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#3498db]  pb-[5px] mt-[20px] mb-[15px] text-[#2c3e50]',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    entryHeader: 'flex justify-between font-semibold text-[#3498db]',
    compactList: 'list-disc my-[5px] pl-[20px]'
  },
  additional: {
    container: '',
    h2: 'text-[18pt] font-semibold border-b-2 border-solid border-[#3498db]  pb-[5px] mt-[20px] mb-[15px] text-[#2c3e50]',
    skills: 'flex gap-[4px] mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    languages: 'flex flex-wrap items-center mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    languageItem: 'flex items-center align-top py-[5px] px-[1px]'
  },
};

const cloyolaTemplate: TemplateStyle = {
  body: 'font-Roboto leading-[1.4] text-[#333] max-w-[700px] mx-auto p-[10px] text-[9pt]',
  personal: {
    header: 'text-left mb-[20px] p-[20px] bg-[#ccc] rounded-[8px] [box-shadow:0_4px_6px_rgba(0,_0,_0,_0.1)]',
    h1: 'text-[18pt] font-bold mb-[5px]',
    contactSection: 'flex flex-wrap gap-[10px] text-[9pt] font-normal',
    contactItem: 'mr-[3px]',
  },
  education: {
    container: '',
    h2: 'text-[14pt] font-semibold border-b-1 border-dotted border-[#4c4c4c] pb-[2px] mt-[10px] mb-[5px] text-left',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:3px_3px_5px_2px_rgba(0,_0,_0,_0.2)]',
    entryHeader: 'flex justify-between font-semibold text-[10pt]',
    entryDetails: 'flex justify-between italic mb-[2px] text-[9pt]',
    compactList: 'list-disc my-[2px] pl-[15px]'
  },
  experience: {
    container: '',
    h2: 'text-[14pt] font-semibold border-b-1 border-dotted border-[#4c4c4c] pb-[2px] mt-[10px] mb-[5px] text-left',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:3px_3px_5px_2px_rgba(0,_0,_0,_0.2)]',
    entryHeader: 'flex justify-between font-semibold text-[10pt]',
    entryDetails: 'flex justify-between italic mb-[2px] text-[9pt]',
    compactList: 'list-disc my-[2px] pl-[15px]'
  },
  projects: {
    container: '',
    h2: 'text-[14pt] font-semibold border-b-1 border-dotted border-[#4c4c4c] pb-[2px] mt-[10px] mb-[5px] text-left',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:3px_3px_5px_2px_rgba(0,_0,_0,_0.2)]',
    entryHeader: 'flex justify-between font-semibold text-[10pt]',
    compactList: 'list-disc my-[2px] pl-[15px]'
  },
  achievements: {
    container: '',
    h2: 'text-[14pt] font-semibold border-b-1 border-dotted border-[#4c4c4c] pb-[2px] mt-[10px] mb-[5px] text-left',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:3px_3px_5px_2px_rgba(0,_0,_0,_0.2)]',
    entryHeader: 'flex justify-between font-semibold text-[10pt]',
    compactList: 'list-disc my-[2px] pl-[15px]'
  },
  certifications: {
    container: '',
    h2: 'text-[14pt] font-semibold border-b-1 border-dotted border-[#4c4c4c] pb-[2px] mt-[10px] mb-[5px] text-left',
    entry: 'mb-[15px] p-[15px] rounded-[8px] [box-shadow:3px_3px_5px_2px_rgba(0,_0,_0,_0.2)]',
    entryHeader: 'flex justify-between font-semibold text-[10pt]',
    compactList: 'list-disc my-[2px] pl-[15px]'
  },
  additional: {
    container: '',
    h2: 'text-[14pt] font-semibold border-b-1 border-dotted border-[#4c4c4c] pb-[2px] mt-[10px] mb-[5px] text-left',
    skills: 'flex gap-[4px] mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    languages: 'flex flex-wrap items-center mb-[15px] p-[15px] rounded-[8px] [box-shadow:0_2px_4px_rgba(0,_0,_0,_0.1)]',
    languageItem: 'flex items-center align-top py-[5px] px-[1px]'
  },
};

export const templateStyles = {
  'default': defaultTemplate,
  'krishnavalliappan': krishnavalliappanTemplate,
  'samodum_bold': samodumBoldTemplate,
  'josylad_grey': josyladGreyTemplate,
  'josylad_blue': josyladBlueTemplate,
  'cloyola': cloyolaTemplate,
} as const;

export const templateStyleByIndex: Record<number, string> = {
  1: 'samodum_bold',
  2: 'josylad_grey',
  3: 'josylad_blue',
  4: 'cloyola'
};

export type TemplateType = keyof typeof templateStyles;

export interface TemplateStyle {
  background?: string;
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
  entryName?: string;
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
