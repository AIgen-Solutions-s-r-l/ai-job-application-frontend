'use client';

import { FC } from 'react';
import { JobSearchProps, MatchingJob } from '@/libs/definitions';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import JobSearchProvider from '@/contexts/job-search-context';

type JobSearchViewProps = {
  initialJobs: MatchingJob[];
  totalCount: number;
  searchParams: JobSearchProps; //{ q?: string; l?: string };
};

export const JobSearchView: FC<JobSearchViewProps> = ({
  initialJobs,
  searchParams,
  totalCount,
}) => {
  return (
    <JobSearchProvider initialJobs={initialJobs} totalCount={totalCount}>
      <div className='w-full flex flex-col items-center'>
        <JobSearchBar searchParams={searchParams} />
        <JobFeedList />
        <JobSearchBottomSheet />
      </div>
    </JobSearchProvider>
  );
};
