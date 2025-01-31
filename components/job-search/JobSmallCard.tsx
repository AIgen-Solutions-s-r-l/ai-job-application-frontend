import React from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';
import { Check, Info } from 'lucide-react';
import { useJobSearch } from '@/contexts/job-search-context';
import Image from 'next/image';
import Pin from '../svgs/Pin.svg'

interface Props {
  className?: string;
  job: MatchingJob;
  onClick: () => void;
}

export const JobSmallCard: React.FC<Props> = ({ className, job, onClick }) => {
  const { selectedJobs, handleJobSelect } = useJobSearch();

  return (
    <div
      className={cn("bg-white rounded-xl relative p-5 flex flex-col gap-3 leading-none cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="flex gap-2 items-center mb-2">
        <p className="text-xs">95% Match</p>
        <Info size={18} />
      </div>
      <h3 className="text-2xl font-medium line-clamp-1">{job.company}</h3>
      <h3 className="text-[22px] font-medium line-clamp-2">{job.title}</h3>
      <p className="text-md flex gap-2 items-center"><Image src={Pin} alt='pin' /> {job.location} | {job.workplace_type}</p>
      <div className='flex gap-4'>
        <div className='text-center text-white p-1 flex-grow bg-primary rounded-xl'>Remote</div>
        <div className='text-center text-white p-1 flex-grow bg-primary rounded-xl'>Full-time</div>
        <div className='text-center text-white p-1 flex-grow bg-primary rounded-xl'>English</div>
      </div>
      <p className="text-md font-light line-clamp-4">{job.description}</p>
      <div className="absolute top-3 right-4 h-12 w-12 bg-base-content text-white rounded-xl flex items-center justify-center cursor-pointer" onClick={(e) => handleJobSelect(job, e)}>
        {selectedJobs.some((j) => j.id === job.id) && <Check size={24} />}
      </div>
    </div>
  );
};