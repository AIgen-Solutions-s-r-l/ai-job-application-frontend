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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Applied':
        return 'bg-splash-green/20';
      case 'Failed':
        return 'bg-splash-fucshia/20';
      case 'Pending':
        return 'bg-splash-orange/20';
      default:
        return 'bg-my-neutral-2';
    }
  };

  return (
    <article className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl bg-white'>
      <div className='flex justify-between'>
        <div className='w-[200px] text-xl'>
          <p>{job.company_name}</p>
          <p>{job.title}</p>
        </div>
        <div className='grow flex flex-wrap justify-end items-start gap-x-3 gap-y-1'>
          {job.skills_required.length &&
            <>
              <div className='pill'>{job.skills_required[0]}</div>
              <div className='pill'>{job.skills_required[1]}</div>
              <div className='pill'>{job.skills_required[2]}</div>
            </>
          }
        </div>
      </div>

      <div className='flex gap-3'>
        <div className='flex flex-col justify-between text-sm shrink-0 grow-0 w-[100px]'>
          <p className={`px-2 py-1 rounded-md text-center ${getStatusColor(status)}`}>{status}</p>
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
          {job.short_description}
        </p>
      </div>
    </article>
  );
};
