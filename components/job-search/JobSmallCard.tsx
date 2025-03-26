import { FC } from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';
import { Check, Info } from 'lucide-react';
import { useJobSearch } from '@/contexts/job-search-context';
import Image from 'next/image';
import Pin from '../svgs/Pin.svg'

interface Props {
  className?: string;
  job: MatchingJob;
  onClick: () => void;
}

export const JobSmallCard: FC<Props> = ({ className, job, onClick }) => {
  const { selectedJobs, handleJobSelect } = useJobSearch();

  return (
    <div
      className={cn("bg-white rounded-xl relative p-5 flex flex-col gap-1 lg:gap-3 leading-none cursor-pointer lg:pb-12", className)}
      onClick={onClick}
    >
      <div className="absolute top-0 right-0 w-full h-full lg:hidden" onClick={() => window.open('https://google.com', 'blank')}></div>
      <div className="flex gap-2 items-center md:mb-2">
        <p className="text-xs font-jura font-semibold">{job.score}% Match</p>
        <Info size={18} />
      </div>
      <h3 className="font-montserrat font-normal text-base md:text-xl font-semibold">{job.title}</h3>
      <h3 className="font-montserrat font-normal text-base md:text-xl">{job.company_name}</h3>
      <p className="text-sm md:text-base flex gap-2 items-center"><Image src={Pin} alt='pin' /> {`${job.city}, ${job.country}`} | {job.workplace_type}</p>
      <div className='flex gap-2 md:gap-4 my-1 lg:my-4 flex-wrap'>
        {job.skills_required.length &&
          <>
            <div className='pill'>{job.skills_required[0]}</div>
            <div className='pill'>{job.skills_required[1]}</div>
            <div className='pill'>{job.skills_required[2]}</div>
          </>
        }
      </div>
      <div
        className="line-clamp-5 text-sm md:text-base text-gray-600"
        dangerouslySetInnerHTML={{
          __html: job.description
            .replace(/\n\n+/g, '</p><p class="mb-2">')
            .replace(/\n/g, '<br />')
            .replace(/^(.+)$/, '<p class="mb-2">$1</p>')
        }}
      />
      <div className="absolute top-3 right-4 h-10 w-10 bg-base-content text-white rounded-md flex items-center justify-center cursor-pointer" onClick={(e) => handleJobSelect(job, e)}>
        {selectedJobs.some((j) => j.id === job.id) && <Check size={24} />}
      </div>
    </div>
  );
};