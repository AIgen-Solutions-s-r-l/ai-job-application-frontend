'use client';

import React, { useEffect, useState } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { Check } from 'lucide-react';
import { JobSmallCard } from './JobSmallCard';
import { JobLargeCard } from './JobLargeCard';
import { useJobSearch } from '@/contexts/job-search-context';
import { Container } from '../Container';

export const JobFeedList: React.FC = () => {
  const { jobs, isAllSelected, handleSelectAll } = useJobSearch();
  const [focusedJob, setFocusedJob] = useState<MatchingJob | undefined>();

  useEffect(() => {
    if (jobs.length) {
      setFocusedJob(jobs[0])
    }
    console.log(jobs)
  }, [jobs])

  if (jobs.length === 0) {
    return (
      <></>
    );
  }

  return (
    <div className="w-full gap-5 bg-base-100 mb-20 py-3 lg:py-5">
      <Container className="flex gap-8">
        <div className="w-full lg:w-[430px] min-h-[calc(100vh-120px)] flex flex-col gap-5 shrink-0">
          <div className="h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
            <p className='font-jura font-semibold text-[18px]'>Select All</p>
            <div className="h-10 w-10 border border-base-content rounded-md flex items-center justify-center cursor-pointer bg-black" onClick={handleSelectAll}>
              {isAllSelected() && <Check className='text-white' size={24} />}
            </div>
          </div>
          {jobs.map((job) => (
            <JobSmallCard key={job.id} job={job} onClick={() => setFocusedJob(job)} className={focusedJob?.id === job.id ? "outline outline-1 outline-primary" : ""} />
          ))}
        </div>

        <JobLargeCard job={focusedJob} />
      </Container>
    </div>
  );
};