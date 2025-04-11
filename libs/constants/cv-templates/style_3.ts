import { TemplateStyle } from "@/libs/types/cv-template-style.type";

export const style_3: TemplateStyle = {
  body: 'font-arial leading-[1.2] text-[#333] max-w-[700px] mx-auto py-[60px] px-[40px] text-[10pt]',
  personal: {
    header: 'text-center mb-[24px]',
    h1: 'text-[25pt] leading-[1] font-bold mb-[9px]',
    contactSection: 'flex flex justify-center flex-wrap font-normal',
    contactItem: '[&:not(:first-child):before]:content-["|"] [&:not(:first-child):before]:mx-[5px]',
  },
  education: {
    container: '',
    h2: 'text-[12pt] font-bold uppercase border-b-2 border-solid border-[#333] mb-[10px] text-left',
    entry: 'mb-[10px]',
    entryHeader: 'flex justify-between mb-[3px]',
    entryDetails: 'flex justify-between italic mb-[4px]',
    entryTitle: 'font-bold',
    entryName: 'font-bold',
    compactList: 'list-disc pl-[15px]',
    listItem: 'mb-[2px]',
  },
  experience: {
    container: '',
    h2: 'text-[12pt] font-bold uppercase border-b-2 border-solid border-[#333] mb-[10px] text-left',
    entry: 'mb-[10px]',
    entryHeader: 'flex justify-between mb-[3px]',
    entryDetails: 'flex justify-between italic mb-[4px]',
    entryTitle: 'font-bold',
    entryName: 'font-bold',
    compactList: 'list-disc pl-[15px]',
    listItem: 'mb-[2px]',
  },
  projects: {
    container: '',
    h2: 'text-[12pt] font-bold uppercase border-b-2 border-solid border-[#333] mb-[10px] text-left',
    entry: 'mb-[10px]',
    entryHeader: 'flex justify-between mb-[3px]',
    entryName: 'font-bold',
    compactList: 'list-disc pl-[15px]',
    listItem: 'mb-[2px]',
  },
  additional: {
    container: '',
    h2: 'text-[12pt] font-bold uppercase border-b-2 border-solid border-[#333] mb-[10px] text-left',
    h3: 'text-[11pt] font-bold uppercase mt-[10px] mb-[4px] text-left',
    compactList: 'list-disc pl-[15px]',
    listItem: 'mb-[2px]',
  },
};