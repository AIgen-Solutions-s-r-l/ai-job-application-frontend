import { cn } from '@/lib/utils';
import React from 'react';
import { JobCard } from './job-card';
import { MatchingJob } from '@/libs/definitions';

interface Props {
  className?: string;
  jobs: MatchingJob[];
}

export const JobFeedList: React.FC<Props> = ({ className, jobs }) => {
  if (jobs.length === 0) {
    return (
      <div className={'w-full h-full items-center justify-center text-4xl'}>
        No jobs found
      </div>
    );
  }

  return (
    <div className={cn('w-full flex flex-col gap-5 py-5 items-center', className)}>
      {jobs.map((job) => (
        <JobCard key={job.id} job={job} />
      ))}
    </div>
  );
};