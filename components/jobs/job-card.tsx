import React from "react";
import { AppliedJob } from "@/libs/definitions";

interface Props {
  job: AppliedJob;
}

export const JobCard: React.FC<Props> = ({ job }) => {
  const date = new Date(job.posted_date);

  return (
    <article className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl'>
      <div className='text-xl'>
        <p>Company</p>
        <p>{job.title}</p>
      </div>
      <div className='flex gap-3'>
        <div className='flex flex-col justify-between text-sm shrink-0'>
          <p>{job.job_state}</p>
          <div>
            <p>Sent on</p>
            <p className='whitespace-nowrap'>{date.toDateString()}</p>
          </div>
        </div>
        <p className='line-clamp-5 leading-tight border-l border-neutral-content px-8'>
          {job.description}
        </p>
      </div>
    </article>
  );
};
