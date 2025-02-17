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
  const par = {
    ...jobSearchParams,
    keywords: q?.split(' '), // type field must be 'strtng[]'
  };
  const jobs: MatchingJob[] = await getMatchingJobsData(par);

  return <JobSearchView initialJobs={jobs} searchParams={searchParams} />;
};
