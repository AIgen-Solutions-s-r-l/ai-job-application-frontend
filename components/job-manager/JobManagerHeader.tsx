'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { Check } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Container } from '../Container';

export const JobManagerHeader: FC = () => {
  const { isAllSelected, handleSelectAll } = useJobManager();
  const [mounted, setMounted] = useState(false);
    
  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <Container className="flex flex-col gap-2 xl:gap-8 pt-2 xl:pt-4">
      <h1 className='text-[21px] md:text-[28px] font-montserrat font-semibold leading-[1.1]'>Review & Apply</h1>
      <h2 className='font-montserrat font-normal text-[18px]'>Your resumes are updated. Your cover letters are created.
        You can send all your applications now or go into each job’s detail and tweak your materials before sending out. Good luck ;)
      </h2>
      <div className="flex gap-5 mt-2 xl:mt-8 -mb-10">
        <div className="w-full lg:w-[430px] h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
          <p className='font-jura text-[18px] font-semibold'>Select All Jobs</p>
          <div className="h-10 w-10 border border-base-content rounded-md flex items-center justify-center cursor-pointer bg-black" onClick={handleSelectAll}>
            {mounted && isAllSelected() && <Check className='text-white' size={24} />}
          </div>
        </div>
      </div>
    </Container>
  );
};