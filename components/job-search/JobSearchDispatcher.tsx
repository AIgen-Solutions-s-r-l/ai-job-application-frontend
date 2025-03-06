import { JobSearchProps, MatchingJob } from '@/libs/definitions';
import { JobSearchView } from './JobSearchView';
import { getMatchingJobsData } from '@/libs/data';

export const JobSearchDispatcher = async ({
  searchParams,
}: {
  searchParams: JobSearchProps; //{ q?: string; l?: string };
}) => {
  // eslint-disable-next-line no-unused-vars
  const { q, location, ...jobSearchParams } = searchParams;

  if (q) {
    jobSearchParams.keywords = q.split(' ');
  }

  const jobs: MatchingJob[] = await getMatchingJobsData(jobSearchParams);

  return <JobSearchView initialJobs={jobs} searchParams={searchParams} />;
};
