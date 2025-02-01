import React from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';
import { JobLargeCardSkeleton } from './JobLargeCardSkeleton';
import Nike from '../svgs/Nike.svg';
import Pin from '../svgs/Pin.svg';
import Image from 'next/image';

interface Props {
  className?: string;
  job: MatchingJob;
}

export const JobLargeCard: React.FC<Props> = ({ className, job }) => {
  if (!job) return <JobLargeCardSkeleton />;

  return (
    <div className={cn("sticky top-5 flex flex-col grow max-h-[calc(100vh-120px)] bg-white rounded-xl py-8 px-10", className)}>
      <div className='flex flex-col justify-between gap-3 border-b border-b-1 border-b-primary pb-5'>
        <div className='flex items-center justify-between'>
          <div className='flex items-center gap-4'>
            <h3 className="text-[40px] font-medium font-montserrat font-semibold">{job.company}</h3>
            <Image src={Nike} alt='Logo' />
          </div>
          <button onClick={() => window.open('https://google.com', 'blank')} className='btn bg-white rounded-2xl hover:bg-primary hover:text-white' >View Original Job Post</button>
        </div>
        <h3 className="text-[20px] font-montserrat font-normal">{job.title}</h3>
        <div className="flex items-center justify-between gap-3 leading-none">
          <p className="flex items-center gap-3 text-[18px] font-jura font-semibold"><Image src={Pin} alt='Pin' />{job.location} | {job.workplace_type}</p>
          <div className='flex gap-4'>
            <div className='text-center text-white py-3 px-5 flex-grow bg-primary rounded-[40px] font-jura font-semibold'>Remote</div>
            <div className='text-center text-white py-3 px-5 flex-grow bg-primary rounded-[40px] font-jura font-semibold'>Full-time</div>
            <div className='text-center text-white py-3 px-5 flex-grow bg-primary rounded-[40px] font-jura font-semibold'>English</div>
          </div>
        </div>
      </div>
      <div className="mt-5 flex-1 overflow-y-auto">
        <p className="font-jura text-[18px] font-normal">{job.description}</p>
      </div>
    </div>
  );
};