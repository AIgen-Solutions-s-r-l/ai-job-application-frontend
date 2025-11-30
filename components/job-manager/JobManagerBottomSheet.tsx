'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { applySelectedApplicationsAction } from '@/libs/actions';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ButtonApply } from '@/components/ButtonAppy';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonUnderline } from '@/components/ButtonUnderline';
import BrandSmiley from '@/public/brand-smiley.svg';
import Image from 'next/image';

export const JobManagerBottomSheet: FC = () => {
  const { applications, selectedApplications } = useJobManager();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleApply = useCallback(() => {
    setIsLoading(true);
    applySelectedApplicationsAction(selectedApplications)
      .then((response) => {
        if (response.success) {
          toast.success('Application submitted!');
          sessionStorage.removeItem('jobManager');
          router.push('/dashboard');
        } else {
          toast.error('Failed to submit application.');
        }
      })
      .catch((error) => {
        console.error('Error submitting profile:', error);
      });
  }, [router, selectedApplications]);

  return (
    <JobButtomSheet className='justify-between items-center'>
      <ButtonUnderline
        title='Back to Search'
        handleClick={() => router.push('/search')}
      />
      <div className='flex items-center gap-5'>
        <div className='hidden xl:flex items-center gap-5 bg-primary-deep-purple rounded-full pl-[2px] pr-[25px] py-[3px]'>
          <Image src={BrandSmiley} alt='Brand Smiley' width={40} height={40} />
          <p className='text-white text-right font-jura text-xl font-semibold leading-6 tracking-tight'>
            {applications && Object.keys(applications).length} Applications
          </p>
        </div>
        {mounted && (
          <p className='text-sm md:text-base xl:text-[18px] font-normal text-white font-montserrat text-right'>
            You’re applying to&nbsp;<span className='font-bold'>{selectedApplications.length.toLocaleString('en-US')} jobs</span>&nbsp;instantly
          </p>
        )}
        <ButtonApply
          title='Submit Applications'
          handleApply={handleApply}
          disabled={!selectedApplications.length || isLoading}
          loadingText='Submitting'
          isLoading={isLoading}
        />
      </div>
    </JobButtomSheet>
  );
};
