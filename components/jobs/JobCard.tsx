import { FC } from 'react';
import { JobDetail } from '@/libs/definitions';
import { Info } from 'lucide-react';

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
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='text-l gap-4'>
          <p className='font-bold'>{job.title}</p>
          <p>{job.company_name}</p>
        </div>
        <div className='flex gap-3'>
          <p className='leading-tight md:px-8'>
            {job.short_description}
          </p>
        </div>
        <div className='flex flex-col justify-between text-sm shrink-0 grow-0 md:w-[100px]'>
          <div className="flex items-center justify-center gap-2">
            {(() => {
              const lowerStatus = status.toLowerCase();
              let tooltipText = "";

              if (lowerStatus === "pending") {
                tooltipText = "It usually takes a few hours for the applications to be completed, please come back later";
              } else if (lowerStatus === "applied") {
                tooltipText = "Congratulations! The job has been applied, check your email address for any update";
              } else if (lowerStatus === "failed") {
                tooltipText = "Sometimes applications may fail. We refunded the credits spent";
              }

              return tooltipText ? (
                <div className="tooltip tooltip-left" data-tip={tooltipText}>
                  <Info size={20} className="text-gray-500" />
                </div>
              ) : null;
            })()}
            <p className={`px-5 py-1 rounded-md text-center ${getStatusColor(status)}`}>{status}</p>
          </div>
        </div>
        {/* <div className='grow flex flex-wrap justify-end items-start gap-x-3 gap-y-1'>
          {job.skills_required.length &&
            <>
              <div className='pill'>{job.skills_required[0]}</div>
              <div className='pill'>{job.skills_required[1]}</div>
              <div className='pill'>{job.skills_required[2]}</div>
            </>
          }
        </div> */}
      </div>
    </article>
  );
};
