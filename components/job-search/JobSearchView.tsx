'use client';

import React from 'react';
import { MatchingJob } from '@/libs/definitions';
import { useRouter } from 'next/navigation';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import JobSearchProvider from '@/contexts/job-search-context';

type JobSearchViewProps = {
  initialJobs: MatchingJob[];
  searchParams: { q?: string; l?: string };
};

export const JobSearchView: React.FC<JobSearchViewProps> = ({
  initialJobs,
  searchParams,
}) => {
  const router = useRouter();

  const onSearch = (keywords: string, location: string) => {
    const params = new URLSearchParams();
    params.set('q', keywords);
    params.set('l', location);
    router.push(`?${params.toString()}`);
  };

  return (
    <JobSearchProvider initialJobs={initialJobs}>
      <div className='w-full flex flex-col items-center'>
        <JobSearchBar
          onSearch={onSearch}
          keywords={searchParams.q}
          location={searchParams.l}
        />
        <JobFeedList />
        <JobSearchBottomSheet />
      </div>
    </JobSearchProvider>
  );
};
