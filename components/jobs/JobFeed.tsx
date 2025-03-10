import {
  getAppliedJobApplications,
  getFailedJobApplications,
  getAppliedPendingApplications
} from '@/libs/api/application';
import { JobFeedList } from '@/components/jobs/JobFeedList';
import { JobsList } from '@/libs/definitions';

export default async function JobFeed() {
  const [appliedJobs, failedJobs, pendingJobs] = await Promise.all([
    getAppliedJobApplications(),
    getFailedJobApplications(),
    getAppliedPendingApplications()
  ]);

  return (
    <JobFeedList
      pendingJobs={pendingJobs}
      appliedJobs={appliedJobs}
      failedJobs={failedJobs}
      isLoading={false}
    />
  );
}
