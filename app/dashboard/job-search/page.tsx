import { JobTable } from "@/components/job-search/table";
import { getMatchingJobsAction } from "@/libs/data";
import { JobSearchParams } from "@/libs/definitions";

export default async function JobSearchPage({ searchParams }: { searchParams: JobSearchParams }) {
  const matchingJobs = await getMatchingJobsAction(searchParams);
  console.log('servidor')

  return <JobTable jobs={matchingJobs} />;
}