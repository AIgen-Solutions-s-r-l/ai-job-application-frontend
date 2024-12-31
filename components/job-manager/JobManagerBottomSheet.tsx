'use client';

import { useSelectedJobsContext } from '@/contexts/selected-jobs-context';
import { addJobsToManager } from '@/libs/actions';
import { ArrowLeft, ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export const JobManagerBottomSheet: React.FC = () => {
  const { selectedJobs } = useSelectedJobsContext();
  const router = useRouter()

  const handleApply = async () => {
    if (selectedJobs.length > 0) {
      try {
        const response = await addJobsToManager(selectedJobs);

        if (response.success) {
          toast.success("Application submitted!");
          router.push('/dashboard')
        } else {
          toast.error("Failed to sumbit application.");
        }
      } catch (error) {
        console.error("Error submitting profile:", error);
      } 
    }
  };

  return (
    <div className="fixed bottom-0 z-10 w-full h-20 border-t border-base-content flex items-center bg-base-100">
      <div className="w-[1440px] mx-auto flex justify-between items-center">
        <div 
          className="flex items-center gap-5 pr-5 pl-3 py-2 border border-base-content text-base-content hover:bg-base-content hover:text-base-100 rounded-full cursor-pointer"
          onClick={() => router.back()}
        >
          <ArrowLeft size={27} />
          <p className='text-md'>Back to Job Search</p>
        </div>
        <div className="flex items-center gap-5">
          <p className='text-md'>You’re applying to <span className="font-bold">{selectedJobs.length} jobs</span> instantly</p>
          <div
            onClick={handleApply}
            className="bg-black border-2 border-black rounded-full text-white py-2 pl-5 pr-2 flex items-center justify-between hover:bg-base-100 hover:text-black cursor-pointer"
          >
            <p className="leading-none text-md">Apply All</p>
            <ChevronRight size={30} />
          </div>
        </div>
      </div>
    </div>
  );
};