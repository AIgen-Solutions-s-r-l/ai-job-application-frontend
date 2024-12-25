import { MatchingJob } from "@/libs/definitions";
import React, { createContext, useContext, useState } from "react";

type SelectedJobsProviderProps = {
  children: React.ReactNode
}

type SelectedJobsContextType = {
  selectedJobs: MatchingJob[];
  setSelectedJobs: React.Dispatch<React.SetStateAction<MatchingJob[]>>;
}

const SelectedJobsContext = createContext<SelectedJobsContextType | null>(null);

export default function SelectedJobsProvider({ children }: SelectedJobsProviderProps) {
  const [selectedJobs, setSelectedJobs] = useState<MatchingJob[]>([]);

  return (
    <SelectedJobsContext.Provider value={{ selectedJobs, setSelectedJobs }}>
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