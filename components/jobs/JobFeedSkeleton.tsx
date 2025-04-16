import { JobFeedList } from '@/components/jobs/JobFeedList';

export const JobFeedSkeleton = (
  <JobFeedList pendingJobs={{}} appliedJobs={{}} failedJobs={{}} isLoading={true} />
);
