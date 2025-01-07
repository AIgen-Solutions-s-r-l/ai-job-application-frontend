'use client';

import { useSelectedJobsContext } from '@/contexts/selected-jobs-context';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';

export const JobSearchBottomSheet: React.FC = () => {
  const { selectedJobs } = useSelectedJobsContext();
  const router = useRouter()

  const handleApply = async () => {
    if (selectedJobs.length > 0) {
      sessionStorage.setItem("selectedJobs", JSON.stringify(selectedJobs))
      router.push('/manager')
    }
  };
  
  return (
    <div className="fixed bottom-0 z-10 w-full h-20 border-t border-base-content flex items-center bg-base-100">
      <div className="w-[1440px] mx-auto flex justify-end items-center gap-5">
        <p className='text-md'>Adding <span className="font-bold">{selectedJobs.length} jobs</span> to your Job Manager</p>
        <div 
          onClick={handleApply} 
          className="bg-black border-2 border-black rounded-full text-white py-2 pl-5 pr-2 flex items-center justify-between hover:bg-base-100 hover:text-black cursor-pointer"
        >
          <p className="leading-none text-md">Add to Job Manager</p>
          <ChevronRight size={30} />
        </div>
      </div>
    </div>
  );
};