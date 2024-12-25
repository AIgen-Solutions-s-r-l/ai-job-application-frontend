import { Suspense } from "react";
import { JobFeedList } from "@/components/jobs/job-feed-list";
import LogoutAndRedirect from "@/components/LogoutAndRedirect";
import { getJobApplications } from "@/libs/api/application";
import { AppliedJob } from "@/libs/definitions";

export default async function AutoJobs() {
  const result = await getJobApplications();

  if (!result.success && result.statuCode === 401) {
    return <LogoutAndRedirect />;
  }

  let autoJobs: AppliedJob[] = result.data ?? [];
  return (
    <div className='font-light flex flex-col gap-5 bg-white- rounded-2xl'>
      <div className='flex flex-col gap-5'>
        <h5 className='text-2xl'>
          <b>Congratulations!</b> &nbsp;
          <span>
            We sent your application to <b>{autoJobs.length} jobs.</b>
          </span>
        </h5>
        <p>
          Refresh this page to get see pending applications turn into finalized.
        </p>
      </div>
      <Suspense fallback={<div>Loading jobs...</div>}>
        <JobFeedList jobs={autoJobs} />
      </Suspense>
    </div>
  );
}
