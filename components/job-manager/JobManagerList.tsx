'use client';

import React, { useEffect, useState } from 'react';
import { JobManagerCard } from './JobManagerCard';
import { useJobManager } from '@/contexts/job-manager-context';
import { Container } from '../Container';

export const JobManagerList: React.FC = () => {
  const { applications, selectedApplications } = useJobManager();

  // Use this to highlight selected cards with a border
  const [focusedJobIds, setFocusedJobIds] = useState<string[]>([]);

  useEffect(() => {
    // Sync focused border with all selected applications on initial load or when selectedApplications changes
    if (selectedApplications) {
      setFocusedJobIds(selectedApplications);
    }
  }, [selectedApplications]);

  const handleJobClick = (key: string) => {
    setFocusedJobIds((prev) =>
      prev.includes(key) ? prev.filter((id) => id !== key) : [...prev, key]
    );
  };

  return (
    <div className='w-full h-full gap-5 pt-16'>
      <Container className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-[80px]">
        {Object.entries(applications).reverse().map(([key, value]) => (
          <JobManagerCard 
            key={key} 
            id={key} 
            job={value} 
            onClick={() => handleJobClick(key)} 
            className={
              focusedJobIds.includes(key)
                ? "outline outline-2 outline-primary"
                : ""
            } 
          />
        ))}
      </Container>
    </div>
  );
};
