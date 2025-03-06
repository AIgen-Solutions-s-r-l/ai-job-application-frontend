'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { applySelectedApplicationsAction } from '@/libs/actions';
import { useRouter } from 'next/navigation';
import { FC, useCallback, useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { ButtonApply } from '@/components/ButtonAppy';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonUnderline } from '@/components/ButtonUnderline';
import LaboroSmiley from '@/public/LaboroSmiley.svg';
import Image from 'next/image';

export const JobManagerBottomSheet: FC = () => {
  const { selectedApplications } = useJobManager();
  const router = useRouter();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

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
    <JobButtomSheet className='justify-between gap-[50px] items-center'>
      <div className='flex items-center gap-2 md:gap-8 lg:gap-10'>
        <ButtonUnderline
          title='Back to Search'
          handleClick={() => router.back()}
        />
        <div className='w-[1px] h-16 bg-white' />
        <ButtonUnderline title='Cancel' handleClick={() => router.back()} />
      </div>
      <div className='flex items-center gap-5'>
        <div className='flex items-center gap-5 bg-primary-deep-purple rounded-full pl-[2px] pr-[25px] py-[3px]'>
          <Image src={LaboroSmiley} alt='LaboroSmiley' width={40} height={40} />
          <p className='text-white text-right font-jura text-xl font-semibold leading-6 tracking-tight'>
            300 Applications
          </p>
        </div>
        {mounted && (
          <p className='text-sm md:text-base xl:text-[18px] font-normal text-white font-montserrat text-right'>
            You’re applying to&nbsp;<span className='font-bold'>{selectedApplications.length} jobs</span>&nbsp;instantly
          </p>
        )}
        <ButtonApply
          title='Submit Applications'
          handleApply={handleApply}
          disabled={!selectedApplications.length}
        />
      </div>
    </JobButtomSheet>
  );
};
