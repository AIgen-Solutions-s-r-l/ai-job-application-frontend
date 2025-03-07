import {
  getAppliedJobApplications,
  getFailedJobApplications,
} from '@/libs/api/application';
import { JobFeedList } from '@/components/jobs/JobFeedList';

export default async function JobFeed() {
  const [appliedJobs, failedJobs] = await Promise.all([
    getAppliedJobApplications(),
    getFailedJobApplications(),
  ]);

  return (
    <JobFeedList
      appliedJobs={appliedJobs}
      failedJobs={failedJobs}
      isLoading={false}
    />
  );
}
