import { JobSearchView } from "@/components/job-search/JobSearchView";
import { getMatchingJobsAction } from "@/libs/data";
import { JobSearchParams } from "@/libs/definitions";

export default async function JobSearchPage({ searchParams }: { searchParams: JobSearchParams }) {
  const matchingJobs = await getMatchingJobsAction(searchParams);

  return <JobSearchView jobs={matchingJobs} />;
}