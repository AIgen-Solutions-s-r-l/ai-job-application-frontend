'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { applySelectedApplicationsAction } from '@/libs/actions';
import { ArrowLeft } from 'lucide-react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import React from 'react';
import toast from 'react-hot-toast';
import Arrow from '../svgs/Arrow.svg';

export const JobManagerBottomSheet: React.FC = () => {
  const { selectedApplications } = useJobManager();
  const router = useRouter()

  const handleApply = async () => {
    if (selectedApplications.length > 0) {
      try {
        const response = await applySelectedApplicationsAction(selectedApplications);

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
    <div className="fixed bottom-0 z-10 w-full h-20 flex items-center bg-primary shadow-[0px_-4px_4px_rgba(0,0,0,0.25)]">
      <div className="w-[1440px] mx-auto flex justify-between items-center">
        <div className='flex items-center gap-3'>
          <div
            className="underline decoration-white flex items-center font-jura rounded-full cursor-pointer text-md text-white text-[18px] hover:text-neutral"
            onClick={() => router.back()}
          >
            <p>Back to Search</p>
          </div>
          <div className='w-[1px] h-16 bg-white' />
          <div
            className="underline decoration-white flex items-center font-jura rounded-full cursor-pointer text-md text-white text-[18px] hover:text-neutral"
            onClick={() => router.back()}
          >
            <p>Cancel</p>
          </div>
        </div>
        <div className="flex items-center gap-5">
          <p className='text-[20px] font-normal text-white font-montserrat'>You’re applying to <span className="font-bold">{selectedApplications.length} jobs</span> instantly</p>
          <div
            onClick={handleApply}
            className="bg-secondary rounded-full text-black px-4 py-3 flex items-center gap-8 justify-between hover:bg-base-100 hover:text-black cursor-pointer"
          >
            <p className="leading-none font-jura font-semibold text-[18px]">Submit Applications</p>
            <Image src={Arrow} alt="Arrow" />
          </div>
        </div>
      </div>
    </div>
  );
};