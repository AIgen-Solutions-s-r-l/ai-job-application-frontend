'use client';

import React, { useState } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { Check } from 'lucide-react';
import { JobSmallCard } from './JobSmallCard';
import { JobLargeCard } from './JobLargeCard';
import { useJobSearch } from '@/contexts/job-search-context';

export const JobFeedList: React.FC = () => {
  const { jobs, isAllSelected, handleSelectAll } = useJobSearch();
  const [focusedJob, setFocusedJob] = useState<MatchingJob>(jobs[0]);  
  
  if (jobs.length === 0) {
    return (
      <div className={'w-[1440px] h-full mx-auto text-4xl'}>
        No jobs found
      </div>
    );
  }
  

  return (
    <div className="w-full gap-5 bg-base-200 mb-20 py-5">
      <div className="w-[1440px] mx-auto flex gap-5">
        <div className="w-[430px] min-h-[calc(100vh-120px)] flex flex-col gap-5">
          <div className="h-16 flex items-center justify-end gap-5 pr-4 bg-base-100 rounded-xl">
            <p>Select All</p>
            <div className="h-12 w-12 border border-base-content rounded-xl flex items-center justify-center cursor-pointer" onClick={handleSelectAll}>
              {isAllSelected() && <Check size={24} />}
            </div>
          </div>
          {jobs.map((job) => (
            <JobSmallCard key={job.id} job={job} onClick={() => setFocusedJob(job)} className={focusedJob.id === job.id ? "outline outline-1 outline-primary" : ""} />
          ))}
        </div>
        
        <JobLargeCard job={focusedJob} />
      </div>
    </div>
  );
};