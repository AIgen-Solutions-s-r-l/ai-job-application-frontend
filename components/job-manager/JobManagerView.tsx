'use client';

import React from 'react';
import { JobManagerHeader } from './JobManagerHeader';
import { JobManagerList } from './JobManagerList';
import { JobManagerBottomSheet } from './JobManagerBottomSheet';

export const JobManagerView: React.FC = () => {
  const jobs = JSON.parse(sessionStorage.getItem("selectedJobs"));
  
  return (
    <div className="w-full flex flex-col items-center">
      <JobManagerHeader jobs={jobs} />
      <JobManagerList jobs={jobs} />
      <JobManagerBottomSheet />
    </div>
  );
};