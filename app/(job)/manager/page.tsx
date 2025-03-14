import { JobManagerDispatcher } from "@/components/job-manager/JobManagerDispatcher";
import { JobManagerSkeleton } from "@/components/job-manager/JobManagerSkeleton";
import { Suspense } from "react";

export default async function JobManagerPage() {
  return (
      <Suspense
        fallback={
          <JobManagerSkeleton />
        }
      >
        <JobManagerDispatcher />
      </Suspense>
    );
}