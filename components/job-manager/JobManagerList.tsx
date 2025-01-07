'use client';

import { MatchingJob } from '@/libs/definitions';
import React, { useState } from 'react';
import { JobManagerCard } from './JobManagerCard';

interface Props {
  jobs: MatchingJob[];
}

export const JobManagerList: React.FC<Props> = ({ jobs }) => {
  const [focusedJob, setFocusedJob] = useState<MatchingJob | null>(null);  
  
  return (
    <div className='w-full gap-5 bg-base-200 mb-20 pt-16 pb-5'>
      <div className="w-[1440px] mx-auto grid grid-cols-3 gap-5">
        {jobs.map((job) => (
          <JobManagerCard key={job.id} job={job} onClick={() => setFocusedJob(job)} className={focusedJob && focusedJob.id === job.id ? "outline outline-1 outline-primary" : ""} />
        ))}
      </div>
    </div>
  );
};