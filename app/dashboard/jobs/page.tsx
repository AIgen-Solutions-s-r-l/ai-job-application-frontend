import { Suspense } from 'react';
import JobFeed from '@/components/jobs/JobFeed';
import { JobFeedSkeleton } from '@/components/jobs/JobFeedSkeleton';

export default function AutoJobsPage() {
  return (
    <Suspense fallback={JobFeedSkeleton}>
      <JobFeed />
    </Suspense>
  );
}
