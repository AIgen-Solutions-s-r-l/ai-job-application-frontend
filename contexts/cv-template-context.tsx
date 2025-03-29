'use client';

import React, { createContext, useContext, useState } from 'react';
import { TemplateStyle, TemplateType, templateStyles } from '../components/job-application/_components/resumeTemplates';

type CVTemplateProviderProps = {
  children: React.ReactNode;
  style: TemplateType;
};

type CVTemplateContextType = {
  template: TemplateStyle;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
}


export const CVTemplateContext = createContext<CVTemplateContextType | null>(null);

export default function CVTemplateProvider ({ children, style }: CVTemplateProviderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>(style || 'default');

  const template = templateStyles[selectedTemplate] || templateStyles['default'];

  return (
    <CVTemplateContext.Provider
      value={{
        template,
        setSelectedTemplate,
      }}
    >
      {children}
    </CVTemplateContext.Provider>
  );
}

export function useCVTemplateContext() {
  const context = useContext(CVTemplateContext);
  if (!context) {
    throw new Error('useCVTemplateContext must be used within a CVTemplateProvider');
  }
  return context;
}