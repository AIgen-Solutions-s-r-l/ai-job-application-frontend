'use client';

import React, { useEffect, useState } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { useSearchParams } from 'next/navigation';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import { fetchServerFunction } from '@/libs/fetch';
import { fetchMatchingJobs } from '@/libs/api/matching';
import { JobFeedListSkeleton } from './JobFeedListSkeleton';
import JobSearchProvider from '@/contexts/job-search-context';

export const JobSearchView: React.FC = () => {
  const searchParams = useSearchParams();
  const [jobs, setJobs] = useState<MatchingJob[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    console.log('loading', {
      keywords: searchParams.get('q'),
      location: searchParams.get('l'),
    });

    setIsLoading(true);
    fetchServerFunction(fetchMatchingJobs, searchParams)
      .then((data) => {
        setJobs(data);
      })
      .finally(() => {
        setIsLoading(false);
      });
  }, [searchParams]);

  return (
    <JobSearchProvider initialJobs={jobs}>
      <div className='w-full flex flex-col items-center'>
        <JobSearchBar isLoading={isLoading} />
        {isLoading ? (
          <JobFeedListSkeleton />
        ) : (
          <>
            <JobFeedList />
            <JobSearchBottomSheet />
          </>
        )}
      </div>
    </JobSearchProvider>
  );
};
