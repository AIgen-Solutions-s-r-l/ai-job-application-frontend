'use client';

import { FC } from 'react';
import { JobSearchProps, MatchingJob } from '@/libs/definitions';
import { useRouter } from 'next/navigation';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import JobSearchProvider from '@/contexts/job-search-context';

type JobSearchViewProps = {
  initialJobs: MatchingJob[];
  searchParams: JobSearchProps; //{ q?: string; l?: string };
};

export const JobSearchView: FC<JobSearchViewProps> = ({
  initialJobs,
  searchParams,
}) => {
  const router = useRouter();

  const onSearch = (searchProps: JobSearchProps) => {
    const params = new URLSearchParams();

    for (const [key, value] of Object.entries(searchProps)) {
      params.set(key, value);
    }

    router.push(`?${params.toString()}`);
  };

  return (
    <JobSearchProvider initialJobs={initialJobs}>
      <div className='w-full flex flex-col items-center'>
        <JobSearchBar onSearch={onSearch} searchParams={searchParams} />
        <JobFeedList />
        <JobSearchBottomSheet />
      </div>
    </JobSearchProvider>
  );
};
