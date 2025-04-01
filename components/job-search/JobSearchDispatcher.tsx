import { JobSearchProps, MatchingJob } from '@/libs/definitions';
import { JobSearchView } from './JobSearchView';
import { getMatchingJobsData } from '@/libs/data';
import { getServerCookie } from '@/libs/cookies';

export const JobSearchDispatcher = async ({
  searchParams,
}: {
  searchParams: JobSearchProps; 
}) => {
  let modifiedSearchParams = searchParams;
  
  if (!searchParams.country) {
    const searchDataStr = await getServerCookie('lastJobSearchData');
    if (searchDataStr) {
      const searchData = JSON.parse(searchDataStr);
      modifiedSearchParams = {
        ...searchParams,
        country: searchData.country,
        location: searchData.country,
        experience: searchData.experience
      };
    }
  }

  const { q, location, ...jobSearchParams } = modifiedSearchParams;

  if (q) {
    jobSearchParams.keywords = q.split(' ');
  }

  const jobs: MatchingJob[] = await getMatchingJobsData(jobSearchParams);

  return <JobSearchView initialJobs={jobs} searchParams={modifiedSearchParams} />;
};
