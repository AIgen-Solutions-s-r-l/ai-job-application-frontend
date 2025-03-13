import { JobManagerView } from "@/components/job-manager/JobManagerView";
import { getPendingApplicationsData } from "@/libs/data";

export const JobManagerDispatcher = async () => {
  const applications = await getPendingApplicationsData();

  return <JobManagerView applications={applications} />;
};
