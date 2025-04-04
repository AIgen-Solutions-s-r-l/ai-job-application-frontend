import { JobSearchProps } from '@/libs/definitions';
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
      const country = searchData.country || undefined;
      modifiedSearchParams = {
        ...searchParams,
        ...(country && { country, location: country }),
        experience: searchData.experience ?? 'Mid-level'
      };
    }
  }

  const { q, location, ...jobSearchParams } = modifiedSearchParams;

  if (q) {
    jobSearchParams.keywords = q.split(' ');
  }

  const response = await getMatchingJobsData(jobSearchParams);

  return <JobSearchView initialJobs={response.jobs} totalCount={response.total_count} searchParams={modifiedSearchParams} />;
};
