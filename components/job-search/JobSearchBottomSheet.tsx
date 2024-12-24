'use client';

import { useSelectedJobsContext } from '@/contexts/selected-jobs-context';
import { addJobsToManager } from '@/libs/actions';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React from 'react';
import toast from 'react-hot-toast';

export const JobSearchBottomSheet: React.FC = () => {
  const { selectedJobs, setSelectedJobs } = useSelectedJobsContext();
  const router = useRouter()

  const handleApply = async () => {
    if (selectedJobs.length > 0) {
      try {
        const response = await addJobsToManager(selectedJobs);

        if (response.success) {
          toast.success("Application submitted!");
          setSelectedJobs([]);
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
    <div className="fixed bottom-0 z-10 w-full h-20 border-t-2 border-black flex items-center bg-base-100">
      <div className="w-[1440px] mx-auto flex justify-end items-center gap-5 cursor-pointer">
        <p className='text-md'>Adding <span className="font-bold">{selectedJobs.length} jobs</span> to your Job Manager</p>
        <div 
          onClick={handleApply} 
          className="bg-black border-2 border-black rounded-full text-white py-2 pl-5 pr-2 flex items-center justify-between hover:bg-base-100 hover:text-black"
        >
          <p className="leading-none text-md">Add to Job Manager</p>
          <ChevronRight size={30} />
        </div>
      </div>
    </div>
  );
};