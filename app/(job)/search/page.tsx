import { JobSearchView } from "@/components/job-search/JobSearchView";
import { getMatchingJobsData } from "@/libs/data";
import { JobSearchParams } from "@/libs/definitions";

export default async function JobSearchPage({ searchParams }: { searchParams: JobSearchParams }) {
  const matchingJobs = await getMatchingJobsData(searchParams);

  return <JobSearchView jobs={matchingJobs} />;
}