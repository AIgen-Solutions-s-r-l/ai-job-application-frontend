'use client';

import { FC } from 'react';
import { JobManagerHeader } from './JobManagerHeader';
import { JobManagerList } from './JobManagerList';
import { JobManagerBottomSheet } from './JobManagerBottomSheet';
import { PendingApplicationRecord } from '@/libs/definitions';
import JobManagerProvider from '@/contexts/job-manager-context';

interface Props {
  applications: PendingApplicationRecord;
}

export const JobManagerView: FC<Props> = ({ applications }) => {
  return (
    <JobManagerProvider initialApplications={applications}>
      <div className="w-full h-full flex flex-col items-center">
        <JobManagerHeader />
        <JobManagerList />
        <JobManagerBottomSheet />
      </div>
    </JobManagerProvider>
  );
};