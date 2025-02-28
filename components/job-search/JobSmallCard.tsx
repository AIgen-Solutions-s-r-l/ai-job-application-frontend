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
        <p className="text-xs font-jura font-semibold">95% Match</p>
        <Info size={18} />
      </div>
      <h3 className="font-montserrat font-normal text-base md:text-xl">{job.company}</h3>
      <h3 className="font-montserrat font-normal text-base md:text-xl">{job.title}</h3>
      <p className="text-sm md:text-base flex gap-2 items-center"><Image src={Pin} alt='pin' /> {job.location} | {job.workplace_type}</p>
      <div className='flex gap-2 md:gap-4 my-1 lg:my-4'>
        <div className='text-sm md:text-base leading-none text-center text-white px-4 py-[3px] lg:px-6 lg:py-[4px] bg-primary rounded-full font-jura font-semibold'>Remote</div>
        <div className='text-sm md:text-base leading-none text-center text-white px-4 py-[3px] lg:px-6 lg:py-[4px] bg-primary rounded-full font-jura font-semibold'>Full-time</div>
        <div className='text-sm md:text-base leading-none text-center text-white px-4 py-[3px] lg:px-6 lg:py-[4px] bg-primary rounded-full font-jura font-semibold'>English</div>
      </div>
      <p className="line-clamp-5 font-jura text-[16px] font-semibold leading-[110%] tracking-[-0.352px]">{job.description}</p>
      <div className="absolute top-3 right-4 h-10 w-10 bg-base-content text-white rounded-md flex items-center justify-center cursor-pointer" onClick={(e) => handleJobSelect(job, e)}>
        {selectedJobs.some((j) => j.id === job.id) && <Check size={24} />}
      </div>
    </div>
  );
};