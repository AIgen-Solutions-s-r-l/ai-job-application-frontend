import { JobFeedList } from '@/components/jobs/JobFeedList';

export const JobFeedSkeleton = (
  <div className='font-light flex flex-col gap-5 rounded-2xl'>
    <div className='flex flex-col gap-5'>
      <p>
        Refresh this page to get see pending applications turn into finalized.
      </p>
    </div>
    <JobFeedList appliedJobs={{}} failedJobs={{}} isLoading={true} />
  </div>
);
