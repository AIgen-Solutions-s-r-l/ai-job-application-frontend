'use client';

import { useJobSearch } from '@/contexts/job-search-context';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import GenerateResumeModal from './GenerateResumeModal';
import toast from 'react-hot-toast';
import { ButtonApply } from '@/components/ButtonAppy';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { addJobsToManager } from '@/libs/actions';
import { templateStyleByIndex } from '../job-application/_components/resumeTemplates';

export const JobSearchBottomSheet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [generateTemplate, setGenerateTemplate] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const { selectedJobs } = useJobSearch();
  const router = useRouter();
  const [cvFile, setCVFile] = useState<File | null>(null);

  const handleApply = async () => {
    if (selectedJobs.length > 0) {
      const jobData = {
        "jobs": selectedJobs,
      }

      const formData = new FormData();
      formData.append('jobs', JSON.stringify(jobData));

      if (generateTemplate) {
        formData.append('style', templateStyleByIndex[selectedTemplate]);
      } else {
        formData.append('cv', cvFile);
      }

      for (const pair of formData.entries()) {
        console.log("Form Data: ", pair[0], pair[1]);
      }

      try {
        const response = await addJobsToManager(formData);
        if (response.success) {
          toast.success("Your application will be added to job manager soon", {
            duration: 10000,
          });
          router.push('/manager')
        }
      } catch (error) {
        console.error("Error submitting profile:", error);
        toast.error("Failed to submit application.");
      }
    }
  };

  return (
    <>
      <JobButtomSheet className='justify-end items-center gap-2 md:gap-8 lg:gap-10'>
        <p className='text-sm md:text-base xl:text-[20px] font-normal text-white font-montserrat text-right'>
          Adding&nbsp;<span className='font-bold'>{selectedJobs.length} jobs</span>&nbsp;to your Job Manager
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
