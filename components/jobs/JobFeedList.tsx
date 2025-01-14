"use client";

import React, { useMemo, useState } from "react";
import * as Tabs from "@radix-ui/react-tabs";
import { AppliedJob } from "@/libs/definitions";
import { Check } from "lucide-react";
import { JobCard } from "./JobCard";
import { sortArrayByDate } from "@/libs/utils";
import { JobCardSkeleton } from "./JobCardSkeleton";

interface Props {
  jobs: AppliedJob[];
  isLoading?: boolean;
}

const underlineOrParagraph = (str: string, isUnderline: boolean) =>
  isUnderline ? <u>{str}</u> : <p>{str}</p>;

export const JobFeedList: React.FC<Props> = ({ jobs, isLoading }) => {
  const [sortBy, setSortBy] = useState<"posted_date" | "job_state">(
    "posted_date"
  );

  const pendingJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return jobs;

    //todo: need add filtering by job_state
    return sortArrayByDate(jobs, sortBy, "desc");
  }, [jobs, sortBy]);

  const appliedJobs = useMemo(() => {
    if (!Array.isArray(jobs)) return jobs;

    const sortedJobs: Record<string, AppliedJob[]> = {};
    //todo: need add filtering by job_state
    jobs.forEach((e) => {
      const year = new Date(e.posted_date).getFullYear();
      if (!sortedJobs[year]) {
        sortedJobs[year] = [];
      }
      sortedJobs[year].push(e);
    });
    for (const i of Object.keys(sortedJobs)) {
      sortedJobs[i] = sortArrayByDate(sortedJobs[i], sortBy, "desc");
    }
    return sortedJobs;
  }, [jobs, sortBy]);

  return (
    <div className='flex flex-col'>
      <div className='h-[67px] px-8 flex justify-end rounded-lg bg-base-300'>
        <div className='flex gap-10 items-center'>
          <button onClick={() => setSortBy("job_state")}>
            {underlineOrParagraph("Sort by: Phase", sortBy === "posted_date")}
          </button>
          <button onClick={() => setSortBy("posted_date")}>
            {underlineOrParagraph("Sort by: Latest", sortBy === "job_state")}
          </button>
        </div>
      </div>

      <Tabs.Root className='mt-[-25px] h-full' defaultValue='pending'>
        <Tabs.List
          className='h-[50px] w-96 mt-[-25px] flex text-lg'
          aria-label='Pending jobs list'
        >
          <Tabs.Trigger
            className='px-10 py-4 rounded-t-md data-[state=active]:bg-base-100'
            value='pending'
          >
            Pending...
          </Tabs.Trigger>
          <Tabs.Trigger
            className='px-10 py-4 rounded-t-md data-[state=active]:bg-base-100 flex gap-3'
            value='applied'
          >
            Applied
            <div className='w-[28px] h-[28px] rounded-full flex justify-center items-center bg-base-100 shrink-0'>
              <Check height={18} width={18} />
            </div>
          </Tabs.Trigger>
        </Tabs.List>

        <Tabs.Content
          className='pt-5 flex flex-col gap-4 bg-base-100-'
          value='pending'
        >
          {isLoading ? (
            <>
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </>
          ) : (
            pendingJobs.map((job, key) => <JobCard job={job} key={key} />)
          )}
        </Tabs.Content>
        <Tabs.Content
          className='pt-5 flex flex-col gap-4 bg-base-100-'
          value='applied'
        >
          {isLoading ? (
            <>
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </>
          ) : (
            Object.keys(appliedJobs).map((year) => (
              <React.Fragment key={year}>
                {year}
                {appliedJobs[year].map((job, key) => (
                  <JobCard job={job} key={key} />
                ))}
              </React.Fragment>
            ))
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
