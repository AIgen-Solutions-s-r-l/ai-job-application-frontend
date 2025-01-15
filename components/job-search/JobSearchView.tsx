'use client';

import React, { useEffect } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { useRouter, useSearchParams } from 'next/navigation';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import { useQuery } from '@tanstack/react-query';
import { fetchServerFunction } from '@/libs/fetch';
import { fetchMatchingJobs } from '@/libs/api/matching';
import { JobFeedListSkeleton } from './JobFeedListSkeleton';

export const JobSearchView: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    console.log({ q: searchParams.get('q') });
  }, [searchParams]);

  const {
    data: jobs,
    isLoading,
    isError,
    error,
  } = useQuery<MatchingJob[]>({
    queryFn: () => fetchServerFunction(fetchMatchingJobs, searchParams),
    queryKey: ['data'],
  });

  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

  const handleSearch = async (keywords: string, location: string) => {
    const params = new URLSearchParams();
    if (keywords) params.set('q', keywords);
    if (location) params.set('l', location);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className='w-full flex flex-col items-center'>
      <JobSearchBar
        jobsLenth={isLoading ? 0 : jobs.length}
        onSearch={handleSearch}
        searchParams={searchParams}
        isLoading={isLoading}
      />
      {isLoading ? (
        <JobFeedListSkeleton />
      ) : (
        <>
          <JobFeedList jobs={jobs} />
          <JobSearchBottomSheet />
        </>
      )}
    </div>
  );
};
