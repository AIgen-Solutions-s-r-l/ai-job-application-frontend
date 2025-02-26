'use client';

import React from 'react';
import { JobSearchProps, MatchingJob } from '@/libs/definitions';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import JobSearchProvider from '@/contexts/job-search-context';

type JobSearchViewProps = {
  initialJobs: MatchingJob[];
  searchParams: JobSearchProps; //{ q?: string; l?: string };
};

export const JobSearchView: React.FC<JobSearchViewProps> = ({
  initialJobs,
  searchParams,
}) => {
  return (
    <JobSearchProvider initialJobs={initialJobs}>
      <div className='w-full flex flex-col items-center'>
        <JobSearchBar searchParams={searchParams} />
        <JobFeedList />
        <JobSearchBottomSheet />
      </div>
    </JobSearchProvider>
  );
};
