import { JobSearchProps } from '@/libs/definitions';
import retry from 'async-retry'; // Import retry
import { Alert } from '@/components/Alert'; // Import Alert component
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
    const experience = searchParams.experience || searchData.experience || 'Entry-level';

    searchParams = {
      ...searchParams,
      ...(country && { country, location: country }),
      experience,
    };
  }

  // eslint-disable-next-line no-unused-vars
  const { q, location, ...jobSearchParams } = searchParams;

  if (q) {
    jobSearchParams.keywords = q.split(' ');
  }

  try {
    const response = await retry(async () => {
      console.log('Attempting to fetch jobs...'); // Optional: Add logging
      return await getMatchingJobsData(jobSearchParams);
    }, {
      retries: 3, // Retry 3 times
      minTimeout: 500, // Start with 200ms delay
      factor: 2, // Exponential backoff factor
    });

    // If successful after retries, return the JobSearchView
    return <JobSearchView initialJobs={response.jobs} totalCount={response.total_count} searchParams={searchParams} />;

  } catch (err) {
    console.error('Failed to fetch jobs after multiple retries:', err);
    return <JobSearchView initialJobs={[]} totalCount={0} searchParams={searchParams} />;
  }
};
