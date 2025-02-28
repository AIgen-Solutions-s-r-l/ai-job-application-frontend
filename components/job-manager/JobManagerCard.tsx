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
      <div className="flex gap-2 items-center mb-2">
        <p className="text-xs font-jura font-semibold">95% Match</p>
        <Info size={18} />
      </div>
      <h3 className="font-montserrat font-normal text-base md:text-xl">{job.company}</h3>
      <h3 className="font-montserrat font-normal text-base md:text-xl">{job.title}</h3>
      <p className="text-sm md:text-base flex gap-2 items-center"><Image src={Pin} alt='pin' /> {job.location} | {job.workplace_type}</p>
      <div className='flex gap-2 md:gap-4 my-1 lg:my-4'>
        <div className='text-sm md:text-base leading-none text-center text-white px-4 py-[3px] lg:px-6 lg:py-[4px] bg-primary rounded-full font-jura font-semibold'>Remote</div>
        <div className='text-sm md:text-base leading-none text-center text-white px-4 py-[3px] lg:px-6 lg:py-[4px] bg-primary rounded-full font-jura font-semibold'>Full-time</div>
        <div className='text-sm md:text-base leading-none text-center text-white px-4 py-[3px] lg:px-6 lg:py-[4px] bg-primary rounded-full font-jura font-semibold'>English</div>
      </div>
      <p className="line-clamp-4 font-jura text-[16px] font-semibold leading-[110%] tracking-[-0.352px] mt-2 lg:mt-0">{job.description}</p>
      <div className="absolute top-3 right-4 h-10 w-10 bg-base-content text-white rounded-md flex items-center justify-center cursor-pointer" onClick={(e) => handleApplicationSelect(id, e)}>
        {mounted && isSelected && <Check size={24} />}
      </div>
      <Link href={`/manager/${id}`} className='btn mt-4 lg:mt-8 font-jura text-sm md:text-base lg:text-lg border border-1 border-primary rounded-2xl flex justify-between bg-neutral-content hover:bg-primary hover:text-white'>Edit Resume & Cover Letter <Image src={Document} alt='Document' /></Link>
    </div>
  );
};