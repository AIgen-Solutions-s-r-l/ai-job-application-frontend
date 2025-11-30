import { JobApplicationTabs } from "@/components/job-application/JobApplicationTabs";
import { getDetailedApplicationData } from "@/libs/data";

export default async function JobManagerPage({ params: { id } }: { params: { id: string } }) {
  const applicationDetails = await getDetailedApplicationData(id);

  if (!applicationDetails) {
    return <div>Application not found</div>;
  }

  return <JobApplicationTabs applicationDetails={applicationDetails} id={id} />;
}