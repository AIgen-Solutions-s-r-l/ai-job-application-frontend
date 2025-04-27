'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { Check } from 'lucide-react';
import { FC, useEffect, useState } from 'react';
import { Container } from '../Container';
import { cn } from '@/lib/utils';

export const JobManagerHeader: FC = () => {
  const { isAllSelected, handleSelectAll, applications } = useJobManager();
  // eslint-disable-next-line no-unused-vars
  const [mounted, setMounted] = useState(false);

  const isReady = Object.keys(applications).length > 0;

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isReady) {
    return (
      <Container className="flex flex-col gap-2 xl:gap-4 pt-2 xl:pt-4">
        <h1 className='text-[21px] md:text-[28px] font-montserrat font-semibold leading-[1.1]'>Review & Submit</h1>
        <h2 className='font-montserrat font-normal text-[18px]'>
          Your applications will appear here after we generate resume and cover letter for them.
          <br />
          <span className='hidden md:block'>Please wait for a while and refresh the page.</span>
        </h2>
      </Container>
    );
  }

  return (
    <Container className="flex flex-col gap-2 xl:gap-4 pt-2 xl:pt-4">
      <h1 className='text-[21px] md:text-[28px] font-montserrat font-semibold leading-[1.1]'>Review & Submit</h1>
      <h2 className='font-montserrat font-normal text-[18px]'>Your resumes have been personalized for each job application,
        and your cover letters are ready. You can submit all your applications now or review each job to make final tweaks before sending. Good luck!
      </h2>
      <div className="flex gap-5 mt-2 xl:mt-4 -mb-10">
        <div className="w-full lg:w-[430px] h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
          <p className='font-jura text-[18px] font-semibold'>Select All Jobs</p>
          <div
            className="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer job-select-box text-black"
            onClick={handleSelectAll}
          >
            <div
              className={cn(
                "transition-transform duration-100 ease-in-out",
                isAllSelected() ? "scale-100" : "scale-0"
              )}
            >
              <Check size={32} strokeWidth={2.5} />
            </div>
          </div>
        </div>
      </div>
    </Container>
  );
};