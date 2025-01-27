import { JobFeedListSkeleton } from '@/components/job-search/JobFeedListSkeleton';
import { JobSearchBarSkeleton } from '@/components/job-search/JobSearchBarSkeleton';
import { JobSearchDispatcher } from '@/components/job-search/JobSearchDispatcher';
import { Suspense } from 'react';

export default async function JobSearchPage({
  searchParams,
}: {
  searchParams: { q?: string; l?: string };
}) {
  return (
    <Suspense
      fallback={
        <>
          <JobSearchBarSkeleton
            keywords={searchParams.q}
            location={searchParams.l}
          />
          <JobFeedListSkeleton />
        </>
      }
    >
      <JobSearchDispatcher searchParams={searchParams} />
    </Suspense>
  );
}
