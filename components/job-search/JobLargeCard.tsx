import React from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';

interface Props {
  className?: string;
  job: MatchingJob;
}

export const JobLargeCard: React.FC<Props> = ({ className, job }) => {
  return (
    <div className={cn("sticky top-5 flex flex-col grow max-h-[calc(100vh-120px)] bg-base-100 rounded-xl py-8 px-10", className)}>
      <div className="flex justify-between flex-0">
        <div className="flex flex-col gap-3 leading-none">
          <h3 className="text-2xl font-medium">{job.company}</h3>
          <h3 className="text-[22px] font-medium">{job.title}</h3>
          <p className="text-md">{job.location}</p>
          <p className="text-md">{job.workplace_type}</p>
        </div>
        <div className="w-[144px] h-[60px] bg-neutral-content flex items-center justify-center">Logo</div>
      </div>
      <div className="mt-5 flex-1 overflow-y-auto">
        <p className="text-md font-light">{job.description}</p>
      </div>
    </div>
  );
};