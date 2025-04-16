import { JobTable } from "@/components/old-job-search/table";
import { getMatchingJobsData } from "@/libs/data";
import { JobSearchParams } from "@/libs/definitions";

export default async function JobSearchPage({ searchParams }: { searchParams: JobSearchParams }) {
  const {jobs} = await getMatchingJobsData(searchParams);

  return <JobTable jobs={jobs} />;
}