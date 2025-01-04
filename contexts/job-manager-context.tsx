import { PendingApplicationRecord } from "@/libs/definitions";
import React, { createContext, useContext, useEffect, useState } from "react";

type JobManagerProviderProps = {
  children: React.ReactNode;
  initialApplications: PendingApplicationRecord;
}

type JobManagerContextType = {
  selectedApplications: string[];
  handleApplicationSelect: (application: string, e: React.MouseEvent) => void;
  isAllSelected: () => boolean;
  handleSelectAll: () => void;
  applications: PendingApplicationRecord;
}

const SESSION_STORAGE_KEY = "jobManager";

const JobManagerContext = createContext<JobManagerContextType | null>(null);

export default function JobManagerProvider({ children, initialApplications }: JobManagerProviderProps) {
  const [selectedApplications, setSelectedApplications] = useState<string[]>(() => {
    let stored = sessionStorage.getItem(SESSION_STORAGE_KEY);
    if (!stored) {
      const initialApplicationKeys = Object.keys(initialApplications);
      sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(initialApplicationKeys));
      stored = JSON.stringify(initialApplicationKeys);
    }
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    sessionStorage.setItem(SESSION_STORAGE_KEY, JSON.stringify(selectedApplications));
  }, [selectedApplications]);


  const applicationKeys = Object.keys(initialApplications);
  const isAllSelected = () => applicationKeys.every(app => selectedApplications.includes(app));

  const handleSelectAll = () => {
    if (isAllSelected()) {
      setSelectedApplications([]);
    } else {
      setSelectedApplications(applicationKeys);
    }
  };

  const handleApplicationSelect = (application: string, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setSelectedApplications((prevSelected) => {
      if (prevSelected.some((j) => j === application)) {
        return prevSelected.filter((j) => j !== application);
      } else {
        return [...prevSelected, application];
      }
    });
  };

  const contextValue = {
    selectedApplications,
    handleApplicationSelect,
    isAllSelected,
    handleSelectAll,
    applications: initialApplications,
  };
  
  return (
    <JobManagerContext.Provider value={contextValue}>
      {children}
    </JobManagerContext.Provider>
  );
} 

export function useJobManager() {
  const context = useContext(JobManagerContext);
  if (!context) {
    throw new Error("useJobManager must be used within a JobManagerProvider");
  }
  return context;
}