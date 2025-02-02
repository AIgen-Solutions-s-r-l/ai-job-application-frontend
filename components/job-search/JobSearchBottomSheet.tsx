'use client';

import { useJobSearch } from '@/contexts/job-search-context';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React from 'react';
import Arrow from '../svgs/Arrow.svg';

export const JobSearchBottomSheet: React.FC = () => {
  const { selectedJobs } = useJobSearch();
  const router = useRouter()

  const handleApply = async () => {
    if (selectedJobs.length > 0) {
      router.push('/manager')
      // try {
      //   const response = await addJobsToManager(selectedJobs);

      //   if (response.success) {
      //     toast.success("Application submitted!");
      //     router.push('/manager')
      //   } else {
      //     toast.error("Failed to sumbit application.");
      //   }
      // } catch (error) {
      //   console.error("Error submitting profile:", error);
      // } 
    }
  };

  return (
    <div className="fixed bottom-0 z-10 w-full h-[80px] flex items-center bg-primary shadow-[0px_-4px_4px_rgba(0,0,0,0.25)]">
      <div className="w-[1440px] mx-auto flex justify-end items-center gap-5">
        <p className='text-md'>Adding <span className="font-bold">{selectedJobs.length} jobs</span> to your Job Manager</p>
        <div
          onClick={handleApply}
          className="bg-secondary rounded-full text-black px-4 py-3 flex items-center gap-8 justify-between hover:bg-base-100 hover:text-black cursor-pointer"
        >
          <p className="leading-none font-jura font-semibold text-[18px]">Save & Continue</p>
          <Image src={Arrow} alt='Arrow' />
        </div>
      </div>
    </div>
  );
};