import { JobSearchProps } from '@/libs/definitions';
import { JobSearchView } from './JobSearchView';
import { getMatchingJobsData } from '@/libs/data';
import { getServerCookie } from '@/libs/cookies';

export const JobSearchDispatcher = async ({
  searchParams,
}: {
  searchParams: JobSearchProps; 
}) => {
  if (!searchParams.country || !searchParams.experience) {
    const searchDataStr = await getServerCookie('lastJobSearchData');
    const searchData = JSON.parse(searchDataStr || '{}');
    const country = searchParams.country || searchData.country || undefined;
    const experience = searchParams.experience || searchData.experience || 'Mid-level';

    searchParams = {
      ...searchParams,
      ...(country && { country, location: country }),
      experience,
    };
  }

  const { q, location, ...jobSearchParams } = searchParams;

  if (q) {
    jobSearchParams.keywords = q.split(' ');
  }

  const response = await getMatchingJobsData(jobSearchParams);

  return <JobSearchView initialJobs={response.jobs} totalCount={response.total_count} searchParams={searchParams} />;
};
