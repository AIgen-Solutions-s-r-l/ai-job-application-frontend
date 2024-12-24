'use client'

import React from 'react';
import { MatchingJob } from '@/libs/definitions';
import { useRouter } from 'next/navigation';
import { JobSearchBar } from './JobSearchBar';
import { JobFeedList } from './JobFeedList';
import { JobSearchBottomSheet } from './JobSearchBottomSheet';
import SelectedJobsProvider from '@/contexts/selected-jobs-context';

interface Props {
  jobs: MatchingJob[];
}

export const JobSearchView: React.FC<Props> = ({ jobs }) => {
  const router = useRouter();

  const handleSearch = async (keywords: string, location: string) => {
    const params = new URLSearchParams();
    if (keywords) params.set('q', keywords);
    if (location) params.set('l', location);
    router.push(`?${params.toString()}`);
  };

  return (
    <SelectedJobsProvider>
      <div className="w-full flex flex-col items-center">
        <JobSearchBar jobsLenth={jobs.length} onSearch={handleSearch} />
        <JobFeedList jobs={jobs} />
        <JobSearchBottomSheet />
      </div>
    </SelectedJobsProvider>
  );
};