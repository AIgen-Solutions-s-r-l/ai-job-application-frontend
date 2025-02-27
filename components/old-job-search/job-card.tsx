import { FC } from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';

interface Props {
  className?: string;
  job: MatchingJob;
}

export const JobCard: FC<Props> = ({ className, job }) => {
  return (
    <div className={cn("w-[900px] border-[1px] border-neutral-content rounded-xl bg-base-100 p-4 text-base-content", className)}>
      <h3 className='text-2xl line-clamp-2 mb-2 leading-tight font-semibold'>{job.title}</h3>
      <p className='text-sm leading-tight'>{job.company}</p>
      <p className='text-sm leading-tight'>location</p>
      <p className='text-sm line-clamp-4 mt-3 leading-tight'>{job.description}</p>
    </div>
  );
};