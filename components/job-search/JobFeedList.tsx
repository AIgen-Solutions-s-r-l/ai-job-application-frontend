'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { Check } from 'lucide-react';
import { JobSmallCard } from './JobSmallCard';
import { useSelectedJobsContext } from '@/contexts/selected-jobs-context';
import { JobLargeCard } from './JobLargeCard';

interface Props {
  className?: string;
  jobs: MatchingJob[];
}

export const JobFeedList: React.FC<Props> = ({ className, jobs }) => {
  const [focusedJob, setFocusedJob] = useState<MatchingJob>(jobs[0]);  
  const { isAllSelected, handleSelectAll } = useSelectedJobsContext();
  
  if (jobs.length === 0) {
    return (
      <div className={'w-full h-full items-center justify-center text-4xl'}>
        No jobs found
      </div>
    );
  }
  

  return (
    <div className={cn('w-full gap-5 bg-base-200 mb-20 py-5', className)}>
      <div className="w-[1440px] mx-auto flex gap-5">
        <div className="w-[430px] flex flex-0 flex-col gap-5">
          <div className="h-16 flex items-center justify-end gap-5 pr-4 bg-base-100 rounded-xl">
            <p>Select All</p>
            <div className="h-12 w-12 border border-base-content rounded-xl flex items-center justify-center cursor-pointer" onClick={() => handleSelectAll(jobs)}>
              {isAllSelected && <Check size={24} />}
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