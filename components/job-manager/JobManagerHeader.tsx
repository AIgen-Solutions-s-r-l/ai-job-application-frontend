'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { Check } from 'lucide-react';
import { FC } from 'react';

export const JobManagerHeader: FC = () => {
  const { isAllSelected, handleSelectAll } = useJobManager();

  return (
    <div className="flex flex-col gap-8 w-[1440px] mx-auto pt-4">
      <h1 className='text-[32px] leading-10'>Review Applications</h1>
      <h2 className='font-montserrat font-normal text-[20px]'>Your resumes are updated. Your cover letters are created.
        You can send all your applications now or go into each job’s detail and tweak your materials before sending out. Good luck ;)
      </h2>
      <div className="flex gap-5 mt-8 -mb-10">
        <div className="w-[430px] h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
          <p>Select All Jobs</p>
          <div className="h-10 w-10 border border-base-content rounded-md flex items-center justify-center cursor-pointer bg-black" onClick={handleSelectAll}>
            {isAllSelected() && <Check className='text-white' size={24} />}
          </div>
        </div>
      </div>
    </div>
  );
};