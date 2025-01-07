import { JobTable } from "@/components/old-job-search/table";
import { getMatchingJobsAction } from "@/libs/data";
import { JobSearchParams } from "@/libs/definitions";

export default async function JobSearchPage({ searchParams }: { searchParams: JobSearchParams }) {
  const matchingJobs = await getMatchingJobsAction(searchParams);

  return <JobTable jobs={matchingJobs} />;
}