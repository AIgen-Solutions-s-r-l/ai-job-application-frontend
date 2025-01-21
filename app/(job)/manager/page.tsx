import { JobManagerView } from "@/components/job-manager/JobManagerView";
import { getPendingApplicationsData } from "@/libs/data";

export default async function JobManagerPage() {
  const applications = await getPendingApplicationsData();
  
  return <JobManagerView applications={applications} />;
}