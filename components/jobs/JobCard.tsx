import { FC } from 'react';
import { JobDetail } from '@/libs/definitions';
import { Info } from 'lucide-react';
import { formatDistanceToNow, parseISO } from 'date-fns';
import { relative } from 'path';

interface Props {
  job: JobDetail;
  status: string;
  timestamp: string;
}

export const JobCard: FC<Props> = ({ job, status, timestamp }) => {
  const date = parseISO(timestamp);
  const relativeTime = formatDistanceToNow(date, { addSuffix: true });

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

  const getTooltipText = (status: string) => {
    const lower = status.toLowerCase();
    if (lower === 'pending') return "It usually takes a few hours for the applications to be completed, please come back later";
    if (lower === 'applied') return "Congratulations! The job has been applied, check your email address for any update";
    if (lower === 'failed') return "Sometimes applications may fail. We refunded the credits spent";
    return "";
  };

  return (
    <article className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl bg-white'>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='text-l gap-1 min-w-[220px] max-w-[220px] flex-shrink-0'>
          <p className='font-bold'>{job.title}</p>
          <p>{job.company_name}</p>
        </div>

        <div className='flex gap-3'>
          <p className='leading-tight md:px-8'>
            {job.short_description}
          </p>
        </div>

        <div className='flex flex-col items-center justify-center text-sm shrink-0 grow-0 md:w-[100px] gap-2'>
          <div
            className={`flex items-center justify-center gap-1 px-3 py-1 rounded-md text-center ${getStatusColor(status)}`}
          >
            {getTooltipText(status) && (
              <span className="tooltip tooltip-left" data-tip={getTooltipText(status)}>
              <Info size={16} className="text-gray-500" />
              </span>
            )}
            <span>{status}</span>
          </div>
            <p className="text-sm text-gray-600 text-center text-[15px]">sent {relativeTime.replace(' in ', ' ')}</p>
        </div>
      </div>
    </article>
  );
};
