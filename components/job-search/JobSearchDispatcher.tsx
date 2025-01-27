import { JobSearchView } from './JobSearchView';
import { fetchMatchingJobs } from '@/libs/api/matching';
import { fetchServerFunction } from '@/libs/fetch';

export const JobSearchDispatcher = async ({
  searchParams,
}: {
  searchParams: { q?: string; l?: string };
}) => {
  const jobs = await fetchServerFunction(fetchMatchingJobs, searchParams);

  return <JobSearchView initialJobs={jobs} searchParams={searchParams} />;
};
