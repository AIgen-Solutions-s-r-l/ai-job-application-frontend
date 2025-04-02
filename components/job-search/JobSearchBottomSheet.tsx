'use client';

import { useJobSearch } from '@/contexts/job-search-context';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import GenerateResumeModal from './GenerateResumeModal';
import toast from 'react-hot-toast';
import { ButtonApply } from '@/components/ButtonAppy';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { addJobsToManager, spendCreditsAction } from '@/libs/actions';
import { templateStyleByIndex } from '../job-application/_components/resumeTemplates';
import SubscriptionModal from './SubscriptionModal';
import { useUserCreditsContext } from '@/contexts/user-credits-context';
import SelectedJobsModal from './SelectedJobsModal';
import { ShoppingBag } from 'lucide-react';

export const JobSearchBottomSheet: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isSubscriptionModal, setIsSubscriptionModal] = useState<boolean>(false);
  const [generateTemplate, setGenerateTemplate] = useState<boolean>(true);
  const [selectedTemplate, setSelectedTemplate] = useState<number | null>(1);
  const { selectedJobs, setSelectedJobs } = useJobSearch();
  const router = useRouter();
  const [cvFile, setCVFile] = useState<File | null>(null);
  const { credits, updateCredits } = useUserCreditsContext();
  const [isSelectedJobsModal, setIsSelectedJobsModal] = useState<boolean>(false);

  const handleApply = async () => {
    if (selectedJobs.length > 0) {

      const formData = new FormData();
      formData.append('job_ids', JSON.stringify(selectedJobs.map(job => job.id)));

      if (generateTemplate) {
        formData.append('style', templateStyleByIndex[selectedTemplate]);
      } else {
        formData.append('cv', cvFile);
      }

      // for (const pair of formData.entries()) {
      //   console.log("Form Data: ", pair[0], pair[1]);
      // }

      try {
        const [job, credit] = await Promise.all([
          addJobsToManager(formData),
          spendCreditsAction(selectedJobs.length),
        ])

        if (job.success && credit.success) {
          updateCredits();
          setSelectedJobs([]);
          toast.success("Your application will be added to job manager soon", {
            duration: 10000,
          });
          router.push('/manager');
        } else {
          throw new Error("Failed to submit application.");
        }
      } catch (error) {
        console.error("Error submitting profile:", error);
        toast.error("Failed to submit application.");
      }
    }
  };

  const checkSubscription = async (applications: number) => {
    // Store current URL for redirect
    const currentPath = window.location.pathname + window.location.search;
    if (credits < applications) {
      setIsSubscriptionModal(true);
      // Pass the return URL to SubscriptionModal
      localStorage.setItem('creditsPurchaseReturnUrl', currentPath);
    } else {
      setIsModalOpen(true)
    }
  }
 
  return (
    <>
      <JobButtomSheet className='justify-end items-center gap-2 md:gap-8 lg:gap-10'>
        <div 
          className="flex items-center gap-2 group cursor-pointer"
          onClick={() => setIsSelectedJobsModal(true)}
        >
          <ShoppingBag className='stroke-white hidden md:block' />
          <p className='text-sm md:text-base xl:text-[20px] font-normal text-white font-montserrat text-right'>
            Adding&nbsp;<span className='font-bold group-hover:underline'>{selectedJobs.length} jobs</span>&nbsp;to your Job Manager
          </p>
        </div>
        <ButtonApply
          title='Save & Continue'
          handleApply={() => checkSubscription(selectedJobs.length)}
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
      
      <SubscriptionModal
        isModalOpen={isSubscriptionModal}
        setIsModalOpen={setIsSubscriptionModal}
      />

      <SelectedJobsModal
        isModalOpen={isSelectedJobsModal}
        setIsModalOpen={setIsSelectedJobsModal}
      />
    </>
  );
};
