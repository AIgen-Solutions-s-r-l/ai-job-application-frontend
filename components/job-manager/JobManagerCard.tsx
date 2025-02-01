import React from 'react';
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

export const JobManagerCard: React.FC<Props> = ({ id, className, job, onClick }) => {
  const { selectedApplications, handleApplicationSelect } = useJobManager();

  return (
    <div
      className={cn("flex flex-col justify-between bg-white rounded-xl relative p-5 flex flex-col gap-3 leading-none cursor-pointer pb-4", className)}
      onClick={onClick}
    >
      <div className="flex gap-2 items-center mb-2">
        <p className="text-xs font-jura font-semibold">95% Match</p>
        <Info size={18} />
      </div>
      <h3 className="font-montserrat font-normal text-xl">{job.company}</h3>
      <h3 className="font-montserrat font-normal text-xl">{job.title}</h3>
      <p className="text-md flex gap-2 items-center"><Image src={Pin} alt='pin' /> {job.location} | {job.workplace_type}</p>
      <div className='flex gap-4 my-4'>
        <div className='text-center text-white p-1 py-[6px] flex-grow bg-primary rounded-xl font-jura font-semibold'>Remote</div>
        <div className='text-center text-white p-1 py-[6px] flex-grow bg-primary rounded-xl font-jura font-semibold'>Full-time</div>
        <div className='text-center text-white p-1 py-[6px] flex-grow bg-primary rounded-xl font-jura font-semibold'>English</div>
      </div>
      <p className="line-clamp-4 font-jura text-[16px] font-semibold leading-[110%] tracking-[-0.352px]">{job.description}</p>
      <div className="absolute top-3 right-4 h-10 w-10 bg-base-content text-white rounded-md flex items-center justify-center cursor-pointer" onClick={(e) => handleApplicationSelect(id, e)}>
        {selectedApplications.some((j) => j === id) && <Check size={24} />}
      </div>
      <button className='btn mt-8 font-jura text-lg border border-1 border-primary rounded-2xl flex justify-between bg-neutral-content hover:bg-primary hover:text-white'>Edit Resume & Cover Letter <Image src={Document} alt='Document' /></button>
    </div>
    // <div className="flex items-end gap-3 pt-3">
    //   <Link
    //     href={`/manager/${id}`}
    //     className="flex-1 h-12 border border-base-content rounded-full flex items-center justify-center hover:bg-base-content hover:text-white"
    //   >Resume & Cover Letter</Link>
    //   <div className="flex flex-col items-center gap-3">
    //     <p>Apply</p>
    //     <div className="flex-0 h-12 w-[72px] bg-base-content text-white rounded-full flex items-center justify-center cursor-pointer" onClick={(e) => handleApplicationSelect(id, e)}>
    //       {selectedApplications.some((j) => j === id) && <Check size={24} />}
    //     </div>
    //   </div>
    // </div>
  );
};