"use client";

import Link from "next/link";
import { useQuery } from "@tanstack/react-query";
import { getJobApplications } from "@/libs/api/application";
import { AppliedJob } from "@/libs/definitions";
import { fetchServerFunction } from "@/libs/fetch";
import { JobFeedList } from "@/components/jobs/JobFeedList";

export default function JobFeed() {
  const {
    data: autoJobs,
    isLoading,
    isError,
    error,
  } = useQuery<AppliedJob[]>({
    queryFn: () => fetchServerFunction(getJobApplications, {}),
    queryKey: ["data"],
  });

  if (isError) return <h1>Error: {JSON.stringify(error)}</h1>;

  if (!isLoading && Array.isArray(autoJobs) && autoJobs.length === 0)
    return (
      <div className='font-light flex flex-col gap-5 rounded-2xl'>
        <h3 className='text-2xl'>
          You can search for jobs now. Let’s get rolling. This will only take a
          few minutes.
        </h3>
        <div className='px-8 py-[50px] flex flex-col justify-center items-center rounded-2xl bg-base-300'>
          <div className='flex flex-col items-center gap-6'>
            <h2 className='text-lg font-light'>
              You don’t have any applied jobs yet.
            </h2>
            <Link
              className={
                "font-medium text-xl px-[60px] py-3 border border-input bg-white hover:bg-primary rounded-full"
              }
              href='/search'
            >
              Find a Job
            </Link>
          </div>
        </div>
      </div>
    );

  return (
    <div className='font-light flex flex-col gap-5 rounded-2xl'>
      <div className='flex flex-col gap-5'>
        {Array.isArray(autoJobs) && (
          <div className='text-2xl'>
            <b>Congratulations!</b> &nbsp;
            <span>
              We sent your application to <b>{autoJobs.length} jobs.</b>
            </span>
          </div>
        )}
        <p>
          Refresh this page to get see pending applications turn into finalized.
        </p>
      </div>
      <JobFeedList jobs={autoJobs} isLoading={isLoading} />
    </div>
  );
}
