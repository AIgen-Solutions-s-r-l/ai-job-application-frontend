'use client';

import { useJobSearch } from '@/contexts/job-search-context';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import GenerateResumeModal from './GenerateResumeModal';
import toast from 'react-hot-toast';
import { ButtonApply } from '@/components/ButtonAppy';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { addJobsToManager } from '@/libs/actions';

export const JobSearchBottomSheet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [generateTemplate, setGenerateTemplate] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const { selectedJobs } = useJobSearch();
  const router = useRouter();
  const [cvFile, setCVFile] = useState<File | null>(null);

  const handleApply = async () => {
    if (selectedJobs.length > 0) {
      router.push('/manager');
      // try {
      //   const response = await addJobsToManager(selectedJobs, generateTemplate ? null : cvFile);
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
    <>
      <JobButtomSheet className='justify-end items-center gap-10'>
        <p className='text-sm md:text-base lg:text-[20px] font-normal text-white font-montserrat'>
          Adding <span className='font-bold'>{selectedJobs.length} jobs</span>{' '}
          to your Job Manager
        </p>
        <ButtonApply
          title='Save & Continue'
          handleApply={() => {
            setIsModalOpen(true);
          }}
          disabled={!selectedJobs.length}
        />
      </JobButtomSheet>

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
