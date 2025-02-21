'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { applySelectedApplicationsAction } from '@/libs/actions';
import { useRouter } from 'next/navigation';
import React, { useCallback } from 'react';
import toast from 'react-hot-toast';
import { ButtonApply } from '@/components/ButtonAppy';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonUnderline } from '@/components/ButtonUnderline';

export const JobManagerBottomSheet: React.FC = () => {
  const { selectedApplications } = useJobManager();
  const router = useRouter();

  const handleApply = useCallback(() => {
    applySelectedApplicationsAction(selectedApplications)
      .then((response) => {
        if (response.success) {
          toast.success('Application submitted!');
          router.push('/dashboard');
        } else {
          toast.error('Failed to sumbit application.');
        }
      })
      .catch((error) => {
        console.error('Error submitting profile:', error);
      });
  }, [router, selectedApplications]);

  return (
    <JobButtomSheet className='justify-between items-center'>
      <div className='flex items-center gap-3'>
        <ButtonUnderline
          title='Back to Search'
          handleClick={() => router.back()}
        />
        <div className='w-[1px] h-16 bg-white' />
        <ButtonUnderline title='Cancel' handleClick={() => router.back()} />
      </div>
      <div className='flex items-center gap-10'>
        <p className='text-[20px] font-normal text-white font-montserrat'>
          You’re applying to{' '}
          <span className='font-bold'>{selectedApplications.length} jobs</span>{' '}
          instantly
        </p>
        <ButtonApply
          title='Submit Applications'
          handleApply={handleApply}
          disabled={!selectedApplications.length}
        />
      </div>
    </JobButtomSheet>
  );
};
