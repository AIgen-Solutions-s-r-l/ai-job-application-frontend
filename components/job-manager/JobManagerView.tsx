'use client';

import React from 'react';
import { JobManagerHeader } from './JobManagerHeader';
import { JobManagerList } from './JobManagerList';
import { JobManagerBottomSheet } from './JobManagerBottomSheet';

export const JobManagerView: React.FC = () => {
  const storedJobs = sessionStorage.getItem("selectedJobs");
  const jobs = storedJobs ? JSON.parse(storedJobs) : [];
  
  return (
    <div className="w-full flex flex-col items-center">
      <JobManagerHeader jobs={jobs} />
      <JobManagerList jobs={jobs} />
      <JobManagerBottomSheet />
    </div>
  );
};