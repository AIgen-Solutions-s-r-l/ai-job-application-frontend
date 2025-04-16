import { FC } from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';
import { Check, Info } from 'lucide-react';
import { useJobSearch } from '@/contexts/job-search-context';
import Image from 'next/image';
import Pin from '../svgs/Pin.svg';

interface Props {
  className?: string;
  job: MatchingJob;
  onClick: () => void;
}

const tooltipText =
  'The match % shows how well your profile fits a job, using AI-driven machine learning. It compares your background to the role through similarity models that assess skills, education, and experience.';

export const JobSmallCard: FC<Props> = ({ className, job, onClick }) => {
  const { selectedJobs, handleJobSelect } = useJobSearch();

  /*
  const cosineScore = job.score / 100;
  const adjustedScore = Math.round(
    (1 - Math.acos(cosineScore) / (Math.PI / 1.4)) * 100
  );
  const clampedScore = Math.max(0, adjustedScore);

  const finalScore = job.score < 95 ? clampedScore : job.score;*/

  return (
    <div
      className={cn(
        "bg-white rounded-xl relative p-5 flex flex-col gap-1 lg:gap-3 leading-none cursor-pointer lg:pb-8 border-b border-my-neutral-3",
        className,
        "transition-transform duration-300 ease-in-out transform hover:scale-105"
      )}
      onClick={onClick}
      onDoubleClick={(e) => handleJobSelect(job, e as any)}
    >
      <div className="flex gap-2 items-center md:mb-2">
        <p className="text-xs font-jura font-semibold">{job.score}% Match</p>
        <div className="tooltip tooltip-right" data-tip={tooltipText}>
          <Info size={18} />
        </div>
      </div>
      <div className="flex items-center justify-between">
        <h3 className="font-montserrat text-base md:text-xl font-semibold">
          {job.title}
        </h3>
        {/* {job.company_logo && (
        <div className="w-[80px] h-[40px]">
          <img
            src={job.company_logo}
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>
        )} */}
      </div>
      <h3 className="font-montserrat text-base md:text-xl font-normal">
        {job.company_name}
      </h3>
      <p className='text-base md:text-[18px] flex gap-3 items-center font-jura font-semibold'>
        {job.country === 'Unknown' && job.city === 'Remote' ? (
          <>
            <Image src={Pin} alt='pin' />
            Remote | {job.workplace_type}
          </>
        ) : job.country === 'Unknown' ? (
          job.workplace_type
        ) : job.city === 'Unknown' ? (
          <>
            <Image src={Pin} alt='pin' />
            {job.country} | {job.workplace_type}
          </>
        ) : (
          <>
            <Image src={Pin} alt='pin' />
            {`${job.city}, ${job.country}`} | {job.workplace_type}
          </>
        )}
      </p>
      <div className="flex gap-x-2 gap-y-1 my-1 lg:my-2 flex-wrap overflow-hidden">
        {!!job.skills_required.length &&
          job.skills_required.map((skill, index) => (
            <div key={index} className="pill">
              {skill}
            </div>
          ))}
      </div>
      <p className="line-clamp-5 text-sm md:text-base text-gray-600">
        {job.short_description}
      </p>
      <div
        className={cn(
          "absolute top-3 right-4 h-10 w-10 job-select-box text-black rounded-md flex items-center justify-center cursor-pointer",
          selectedJobs.some((j) => j.id === job.id) ? "pop-once" : "scale-100"
        )}
        onClick={(e) => handleJobSelect(job, e as any)}
      >
        <div
          className={cn(
            "transition-transform duration-100 ease-in-out",
            selectedJobs.some((j) => j.id === job.id) ? "scale-100" : "scale-0"
          )}
        >
          <Check size={32} strokeWidth={2.5} />
        </div>
      </div>
    </div>
  );
};
