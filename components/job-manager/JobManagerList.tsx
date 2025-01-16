'use client';

import React, { useState } from 'react';
import { JobManagerCard } from './JobManagerCard';
import { useJobManager } from '@/contexts/job-manager-context';

export const JobManagerList: React.FC = () => {
  const { applications } = useJobManager();
  const [focusedJobId, setFocusedJobId] = useState<string>('');

  if (!applications) {
    return (
      <div className={'w-[1440px] h-full mx-auto text-4xl pt-16'}>
        No applications found
      </div>
    );
  }
  
  return (
    <div className='w-full h-full gap-5 bg-base-200 mb-20 pt-16 pb-5'>
      <div className="w-[1440px] mx-auto grid grid-cols-3 gap-5">
        {Object.entries(applications).map(([key, value]) => (
          <JobManagerCard key={key} id={key} job={value} onClick={() => setFocusedJobId(key)} className={focusedJobId === key ? "outline outline-1 outline-primary" : ""} />
        ))}
      </div>
    </div>
  );
};