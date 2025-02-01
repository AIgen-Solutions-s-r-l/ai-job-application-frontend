'use client';

import { useJobSearch } from '@/contexts/job-search-context';
import { addJobsToManager } from '@/libs/actions';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useCallback, useState } from 'react';
import GenerateResumeModal from './GenerateResumeModal';
import toast from 'react-hot-toast';
import Arrow from '../svgs/Arrow.svg';

export const JobSearchBottomSheet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [generateTemplate, setGenerateTemplate] = useState<boolean>(true)
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const { selectedJobs } = useJobSearch();
  const router = useRouter()
  const [cvFile, setCVFile] = useState<File | null>(null);

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
      <div className="fixed bottom-0 z-10 w-full h-28 flex items-center bg-primary shadow-[0px_-4px_4px_rgba(0,0,0,0.25)]">
        <div className="w-[1440px] mx-auto flex justify-end items-center gap-5">
          <p className='text-md'>Adding <span className="font-bold">{selectedJobs.length} jobs</span> to your Job Manager</p>
          <div
            onClick={handleOpenModal}
            className="bg-secondary rounded-full text-black px-4 py-3 flex items-center gap-8 justify-between hover:bg-base-100 hover:text-black cursor-pointer"
          >
            <p className="leading-none font-jura font-semibold text-[18px]">Save & Continue</p>
            <Image src={Arrow} alt='Arrow' />
          </div>
        </div>
      </div>
      <GenerateResumeModal
        generateTemplate={generateTemplate}
        setGenerateTemplate={setGenerateTemplate}
        selectedTemplate={selectedTemplate}
        setSelectedTemplate={setSelectedTemplate}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        onConfirm={handleApply}
        cvFile={cvFile}
        setCVFile={setCVFile}
      />
    </>
  );
};