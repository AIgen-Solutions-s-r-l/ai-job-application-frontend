import { FC } from 'react';
import { JobDetail } from '@/libs/definitions';

const dateOptions: Intl.DateTimeFormatOptions = {
  year: 'numeric',
  month: 'short',
  day: 'numeric',
};

interface Props {
  job: JobDetail;
  status: string;
}

export const JobCard: FC<Props> = ({ job, status }) => {
  const date = new Date(job.posted_date);

  return (
    <article className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl bg-white'>
      <div className='text-xl'>
        <p>{job.company_name}</p>
        <p>{job.title}</p>
      </div>

      {/* todo add pills (see figma) div>{job.workplace_type} Full-time English</div> */}

      <div className='flex gap-3'>
        <div className='flex flex-col justify-between text-sm shrink-0 grow-0 w-[100px]'>
          <p>{status}</p>
          {job.posted_date ? (
            <div>
              <p>Sent on</p>
              <p className='whitespace-nowrap'>
                {date.toLocaleDateString(undefined, dateOptions)}
              </p>
            </div>
          ) : (
            <>&nbsp;</>
          )}
        </div>
        <p className='line-clamp-5 leading-tight border-l border-neutral-content px-8'>
          {job.description}
        </p>
      </div>
    </article>
  );
};
