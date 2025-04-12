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

const tooltipText = 'The match % shows how well your profile fits a job, using AI-driven machine learning. It compares your background to the role through similarity models that assess skills, education, and experience.'

export const JobSmallCard: FC<Props> = ({ className, job, onClick }) => {
  const { selectedJobs, handleJobSelect } = useJobSearch();

  return (
    <div
      className={cn("bg-white rounded-xl relative p-5 flex flex-col gap-1 lg:gap-3 leading-none cursor-pointer lg:pb-8", className)}
      onClick={onClick}
    >
      <div className="flex gap-2 items-center md:mb-2">
        <p className="text-xs font-jura font-semibold">{job.score}% Match</p>
        <div className="tooltip tooltip-right" data-tip={tooltipText}>
          <Info size={18} />
        </div>
      </div>
      <div className='flex items-center justify-between'>
        <h3 className="font-montserrat text-base md:text-xl font-medium">{job.title}</h3>
        {job.company_logo && (
          <div className='w-[80px] h-[40px]'>
            <img
              src={job.company_logo}
              alt='Logo'
              className='w-full h-full object-contain'
            />
          </div>
        )}
      </div>
      <h3 className="font-montserrat text-base md:text-xl font-normal">{job.company_name}</h3>
      {job.country === 'Unknown'
        ? (
          <p className="text-sm md:text-base flex gap-2 items-center">{job.workplace_type}</p>
        )
        : (
          <p className="text-sm md:text-base flex gap-2 items-center"><Image src={Pin} alt='pin' /> {`${job.city}, ${job.country}`} | {job.workplace_type}</p>
        )}
      <div className='flex gap-x-2 gap-y-1 my-1 lg:my-2 flex-wrap overflow-hidden'>
        {!!job.skills_required.length && job.skills_required.map(
          (skill, index) => (
            <div key={index} className='pill'>{skill}</div>
          )
        )}
      </div>
      <p
        className="line-clamp-5 text-sm md:text-base text-gray-600"
      >{job.short_description}</p>
      <div className="absolute top-3 right-4 h-10 w-10 job-select-box rounded-md flex items-center justify-center cursor-pointer" onClick={(e) => handleJobSelect(job, e as any)}>
        {selectedJobs.some((j) => j.id === job.id) && <Check size={24} />}
      </div>
    </div>
  );
};