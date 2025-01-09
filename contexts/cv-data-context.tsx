'use client';

import { JobProfile } from '@/libs/definitions';
import React, { createContext, useContext, useEffect, useState } from 'react';

type CVDataContextProviderProps = {
  children: React.ReactNode;
};

type CVDataContextType = {
  CVData: JobProfile;
  setCVData: React.Dispatch<React.SetStateAction<JobProfile>>;
}

const SESSION_STORAGE_KEY = "onboarding-cv-data";

export const CVDataContext = createContext<CVDataContextType | null>(null);

export default function CVDataContextProvider ({ children }: CVDataContextProviderProps) {
  const [CVData, setCVData] = useState<JobProfile>(() => {
    let stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    return stored ? JSON.parse(stored) : null;
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(CVData));
  }, [CVData]);

  return (
    <CVDataContext.Provider
      value={{
        CVData,
        setCVData,
      }}
    >
      {children}
    </CVDataContext.Provider>
  );
}

export function useCVDataContext() {
  const context = useContext(CVDataContext);
  if (!context) {
    throw new Error('useCVDataContext must be used within a CVDataContextProvider');
  }
  return context;
}