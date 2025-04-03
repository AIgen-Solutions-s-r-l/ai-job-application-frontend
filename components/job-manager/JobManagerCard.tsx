'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { PendingApplication } from '@/libs/definitions';
import { Check, Info } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Pin from '../svgs/Pin.svg';
import { useJobManager } from '@/contexts/job-manager-context';
import Document from '../svgs//Document.svg';

interface Props {
  id: string;
  className?: string;
  job: PendingApplication;
  onClick: () => void;
}

export const JobManagerCard: FC<Props> = ({ id, className, job, onClick }) => {
  const { selectedApplications, handleApplicationSelect } = useJobManager();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSelected = selectedApplications?.some(j => j === id) || false;

  return (
    <div
      className={cn("flex flex-col justify-between bg-white rounded-xl relative p-5 gap-1 lg:gap-3 leading-none cursor-pointer", className)}
      onClick={onClick}
    >
      <h3 className="font-montserrat text-base md:text-xl font-medium">{job.title}</h3>
      <div className='flex items-center justify-between'>
        <h3 className="font-montserrat text-base md:text-xl font-normal">{job.company_name}</h3>
        {job.company_logo && (
          <div className='w-[80px] h-[40px]'>
            <img
              src={job.company_logo}
              alt='Logo'
              className='w-full h-full object-contain'
            />
          </div>
        )}
      </div>
      {job.location  
      ? (
        <p className="text-sm md:text-base flex gap-2 items-center"><Image src={Pin} alt='pin' /> {job.location} | {job.workplace_type}</p>
      ) 
      : (
        <p className="text-sm md:text-base flex gap-2 items-center">{job.workplace_type}</p>
      )}
      <div className='flex gap-x-2 gap-y-1 my-1 lg:my-2 flex-wrap overflow-hidden'>
        {!!job.skills_required.length && job.skills_required.map(
          (skill, index) => (
            <div key={index} className='pill'>{skill}</div>
          )
        )}
      </div>
      <div className="grow">
        <p className="line-clamp-4 font-jura text-[16px] font-semibold leading-[110%] tracking-[-0.352px] mt-2 lg:mt-0">
          {job.short_description}
        </p>
      </div>
      <div className="absolute top-3 right-4 h-10 w-10 job-select-box text-white rounded-md flex items-center justify-center cursor-pointer" onClick={(e) => handleApplicationSelect(id, e)}>
        {mounted && isSelected && <Check size={24} />}
      </div>
      <Link href={`/manager/${id}`} className='btn mt-4 lg:mt-8 font-jura text-sm md:text-base lg:text-lg border border-1 border-primary rounded-2xl flex justify-between bg-neutral-content hover:bg-primary hover:text-white'>
        Edit Resume & Cover Letter
        <Image src={Document} alt='Document' />
      </Link>
    </div>
  );
};