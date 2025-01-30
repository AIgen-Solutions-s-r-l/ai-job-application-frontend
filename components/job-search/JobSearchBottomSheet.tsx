'use client';

import { useJobSearch } from '@/contexts/job-search-context';
import { addJobsToManager } from '@/libs/actions';
import { ChevronRight } from 'lucide-react';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import GenerateResumeModal from './GenerateResumeModal';
import toast from 'react-hot-toast';

export const JobSearchBottomSheet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [generateTemplate, setGenerateTemplate] = useState<boolean>(true)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
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

  const handleOpenModal = useCallback(() => {
    if (selectedJobs.length > 0) {
      setIsModalOpen(true);
    }
  }, [selectedJobs])

  return (
    <>
      <div className="fixed bottom-0 z-10 w-full h-20 border-t border-base-content flex items-center bg-base-100">
        <div className="w-[1440px] mx-auto flex justify-end items-center gap-5">
          <p className='text-md'>Adding <span className="font-bold">{selectedJobs.length} jobs</span> to your Job Manager</p>
          <div
            onClick={handleOpenModal}
            className="bg-black border-2 border-black rounded-full text-white py-2 pl-5 pr-2 flex items-center justify-between hover:bg-base-100 hover:text-black cursor-pointer"
          >
            <p className="leading-none text-md">Add to Job Manager</p>
            <ChevronRight size={30} />
          </div>
        </div>
      </div>
      <GenerateResumeModal generateTemplate={generateTemplate}
        setGenerateTemplate={setGenerateTemplate} selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate} isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen} onConfirm={handleApply} />
    </>
  );
};