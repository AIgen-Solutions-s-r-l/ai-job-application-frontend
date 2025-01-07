import { MatchingJob } from "@/libs/definitions";
import React, { createContext, useContext, useState } from "react";

type SelectedJobsProviderProps = {
  children: React.ReactNode
}

type SelectedJobsContextType = {
  selectedJobs: MatchingJob[];
  handleJobSelect: (job: MatchingJob, e: React.MouseEvent) => void;
  isAllSelected: boolean;
  handleSelectAll: (jobs: MatchingJob[]) => void
}

const SelectedJobsContext = createContext<SelectedJobsContextType | null>(null);

export default function SelectedJobsProvider({ children }: SelectedJobsProviderProps) {
  const [selectedJobs, setSelectedJobs] = useState<MatchingJob[]>([]);
  const [isAllSelected, setIsAllSelected] = useState<boolean>(false);

  const handleSelectAll = (jobs: MatchingJob[]) => {
    if (isAllSelected) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(jobs);
    }
    setIsAllSelected(!isAllSelected);
  };

  const handleJobSelect = (job: MatchingJob, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setSelectedJobs((prevSelected) => {
      if (prevSelected.some((j) => j.id === job.id)) {
        // Job is already selected, remove it
        return prevSelected.filter((j) => j.id !== job.id);
      } else {
        // Job is not selected, add it
        return [...prevSelected, job];
      }
    });
  };

  return (
    <SelectedJobsContext.Provider value={{ selectedJobs, handleJobSelect, isAllSelected, handleSelectAll }}>
      {children}
    </SelectedJobsContext.Provider>
  );
} 

export function useSelectedJobsContext() {
  const context = useContext(SelectedJobsContext);
  if (!context) {
    throw new Error("useSelectedJobsContext must be used within a SelectedJobsProvider");
  }
  return context;
}