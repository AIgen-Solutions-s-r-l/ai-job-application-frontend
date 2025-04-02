import { JobFeedListSkeleton } from '@/components/job-search/JobFeedListSkeleton';
import { JobSearchBarSkeleton } from '@/components/job-search/JobSearchBarSkeleton';
import { JobSearchDispatcher } from '@/components/job-search/JobSearchDispatcher';
import { JobSearchProps } from '@/libs/definitions';
import { Suspense } from 'react';

export default async function JobSearchPage({
  searchParams,
}: {
  searchParams: JobSearchProps//{ q?: string; l?: string };
}) {
  const keyParams = { ...searchParams };
  delete keyParams.offset;
  const searchParamsKey = JSON.stringify(keyParams);

  return (
    <Suspense
      key={searchParamsKey}
      fallback={
        <>
          <JobSearchBarSkeleton
            keywords={searchParams.q}
            location={searchParams.location}
            experience={searchParams.experience}
          />
          <JobFeedListSkeleton />
        </>
      }
    >
      <JobSearchDispatcher searchParams={searchParams} />
    </Suspense>
  );
}
