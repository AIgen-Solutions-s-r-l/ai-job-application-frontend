import React from 'react';
import { AppliedJob } from '@/libs/definitions';

interface Props {
  job: AppliedJob;
}

export const JobCard: React.FC<Props> = ({ job }) => {
  const date = new Date(job.posted_date);

  return (
    <article className='w-full px-[30px] py-4 flex gap-5 border-2 rounded-2xl'>
      <div className='flex flex-col gap-5'>
        <div className='text-2xl text-xl'>
          <p>Company</p>
          <p>{job.title}</p>
        </div>
        <div className='flex items-center gap-3'>
          <div className='h-full flex flex-col gap-3- justify-between text-sm shrink-0'>
            <p>{job.job_state}</p>
            <div>
              <p>Sent on</p>
              <p className='whitespace-nowrap'>{date.toDateString()}</p>
            </div>
          </div>
          <p className='text-sm line-clamp-5 leading-tight border-l-2 px-8'>
            {job.description}
          </p>
        </div>
      </div>
    </article>
  );
};
