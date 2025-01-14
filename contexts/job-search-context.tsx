import { MatchingJob } from "@/libs/definitions";
import React, { createContext, useContext, useState } from "react";

type JobSearchProviderProps = {
  children: React.ReactNode;
  initialJobs: MatchingJob[];
}

type JobSearchContextType = {
  selectedJobs: MatchingJob[];
  handleJobSelect: (job: MatchingJob, e: React.MouseEvent) => void;
  isAllSelected: () => boolean;
  handleSelectAll: () => void;
  jobs: MatchingJob[];
}

const JobSearchContext = createContext<JobSearchContextType | null>(null);

export default function JobSearchProvider({ children, initialJobs }: JobSearchProviderProps) {
  const [selectedJobs, setSelectedJobs] = useState<MatchingJob[]>([]);

  const isAllSelected = () => initialJobs.every(app => selectedJobs.includes(app));

  const handleSelectAll = () => {
    if (isAllSelected()) {
      setSelectedJobs([]);
    } else {
      setSelectedJobs(initialJobs);
    }
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

  const contextValue = {
    selectedJobs,
    handleJobSelect,
    isAllSelected,
    handleSelectAll,
    jobs: initialJobs,
  };

  return (
    <JobSearchContext.Provider value={contextValue}>
      {children}
    </JobSearchContext.Provider>
  );
} 

export function useJobSearch() {
  const context = useContext(JobSearchContext);
  if (!context) {
    throw new Error("useJobSearch must be used within a JobSearchProvider");
  }
  return context;
}