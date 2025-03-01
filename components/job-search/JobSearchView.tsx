'use client';

import { FC } from 'react';
import { JobSearchProps, MatchingJob } from '@/libs/definitions';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import JobSearchProvider from '@/contexts/job-search-context';
import JobSearchMockData from './JobSearchMockData';

type JobSearchViewProps = {
  initialJobs: MatchingJob[];
  searchParams: JobSearchProps; //{ q?: string; l?: string };
};

export const JobSearchView: FC<JobSearchViewProps> = ({
  initialJobs,
  searchParams,
}) => {
  return (
    <JobSearchProvider initialJobs={initialJobs.length ? initialJobs : JobSearchMockData}>
      <div className='w-full flex flex-col items-center'>
        <JobSearchBar searchParams={searchParams} />
        <JobFeedList />
        <JobSearchBottomSheet />
      </div>
    </JobSearchProvider>
  );
};
