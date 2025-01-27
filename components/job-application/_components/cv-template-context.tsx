'use client';

import React, { createContext, useContext, useState } from 'react';
import { TemplateStyle, TemplateType, templateStyles } from './resumeTemplates';

type CVTemplateProviderProps = {
  children: React.ReactNode;
};

type CVTemplateContextType = {
  template: TemplateStyle;
  setSelectedTemplate: React.Dispatch<React.SetStateAction<TemplateType>>;
}


export const CVTemplateContext = createContext<CVTemplateContextType | null>(null);

export default function CVTemplateProvider ({ children }: CVTemplateProviderProps) {
  const [selectedTemplate, setSelectedTemplate] = useState<TemplateType>('default');

  const template = templateStyles[selectedTemplate];

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