'use client';

import { JobProfile } from '@/libs/definitions';
import React, { createContext, useContext, useState } from 'react';

type CVDataContextProviderProps = {
  children: React.ReactNode;
};

type CVDataContextType = {
  CVData: JobProfile;
  setCVData: React.Dispatch<React.SetStateAction<JobProfile>>;
}

export const CVDataContext = createContext<CVDataContextType | null>(null);

export default function CVDataContextProvider ({ children }: CVDataContextProviderProps) {
  const [CVData, setCVData] = useState<JobProfile>(null);

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