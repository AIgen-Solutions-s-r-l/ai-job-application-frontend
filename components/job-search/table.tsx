'use client'

import React from 'react';
import { JobSearchBar } from './job-search-bar';
import { JobFeedList } from './job-feed-list';
import { MatchingJob } from '@/libs/definitions';
import { useRouter } from 'next/navigation';

interface Props {
  jobs: MatchingJob[];
}

export const JobTable: React.FC<Props> = ({ jobs }) => {
  const router = useRouter();

  const handleSearch = async (keywords: string, location: string) => {
    const params = new URLSearchParams();
    if (keywords) params.set('q', keywords);
    if (location) params.set('l', location);
    router.push(`?${params.toString()}`);
  };

  return (
    <div className="w-full min-h-full rounded-lg shadow bg-base-100 px-6">
      <JobSearchBar
        onSearch={handleSearch}
      />
      <JobFeedList jobs={jobs} />
    </div>
  );
};