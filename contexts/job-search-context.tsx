'use client';

import { MatchingJob } from "@/libs/definitions";
import { createContext, Dispatch, ReactNode, SetStateAction, useContext, useEffect, useState } from "react";

type JobSearchProviderProps = {
  children: ReactNode;
  initialJobs: MatchingJob[];
}

type JobSearchContextType = {
  selectedJobs: MatchingJob[];
  setSelectedJobs: Dispatch<SetStateAction<MatchingJob[]>>;
  handleJobSelect: (job: MatchingJob, e: MouseEvent) => void;
  isAllSelected: () => boolean;
  handleSelectAll: () => void;
  jobs: MatchingJob[];
  currentPage: number;
  setCurrentPage: (page: number) => void;
}

const JobSearchContext = createContext<JobSearchContextType | null>(null);

export default function JobSearchProvider({ children, initialJobs }: JobSearchProviderProps) {
  const [selectedJobs, setSelectedJobs] = useState<MatchingJob[]>(() => {
    if (typeof window !== 'undefined') {
      const stored = localStorage.getItem('selectedJobs');
      return stored ? JSON.parse(stored) : [];
    }
    return [];
  });
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    localStorage.setItem('selectedJobs', JSON.stringify(selectedJobs));
  }, [selectedJobs]);

  const isAllSelected = () => initialJobs.every(job => selectedJobs.some(selected => selected.id === job.id));

  const handleSelectAll = () => {
    if (isAllSelected()) {
      // Remove only current page jobs from selection
      setSelectedJobs(prev => prev.filter(selected => 
        !initialJobs.some(job => job.id === selected.id)
      ));
    } else {
      // Add all current page jobs that aren't already selected
      setSelectedJobs(prev => {
        const newJobs = initialJobs.filter(job => 
          !prev.some(selected => selected.id === job.id)
        );
        return [...prev, ...newJobs];
      });
    }
  };

  const handleJobSelect = (job: MatchingJob, e: MouseEvent) => {
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
    setSelectedJobs,
    handleJobSelect,
    isAllSelected,
    handleSelectAll,
    jobs: initialJobs,
    currentPage,
    setCurrentPage,
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