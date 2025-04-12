import { FC, useEffect, useRef } from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';
import { JobLargeCardSkeleton } from './JobLargeCardSkeleton';
import Pin from '../svgs/Pin.svg';
import Image from 'next/image';

interface Props {
  className?: string;
  job: MatchingJob;
}

export const JobLargeCard: FC<Props> = ({ className, job }) => {
  const descriptionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Reset scroll position whenever job changes
    if (descriptionRef.current) {
      descriptionRef.current.scrollTop = 0;
    }
  }, [job]);  

  if (!job) return <JobLargeCardSkeleton />;

  return (
    <div className={cn("sticky top-5 hidden xl:flex flex-col h-[calc(100vh-100px)] bg-white rounded-xl py-8 px-10", className)}>
      <div className='flex flex-col justify-between gap-3 border-b border-b-1 border-b-primary pb-5'>
        <div className='flex items-center justify-between'>
          <h3 className="text-[24px] xl:text-[32px] leading-[1.2] font-montserrat font-semibold">{job.title}</h3>
          {job.company_logo && (
            <div className='w-[160px] h-[80px]'>
              <img
                src={job.company_logo}
                alt='Logo'
                className='w-full h-full object-contain'
              />
            </div>
          )}
        </div>
        <h3 className="text-[20px] xl:text-[27px] font-montserrat">{job.company_name}</h3>
        
        <div className="flex justify-between items-center">
          <p className="text-base md:text-[18px] flex gap-3 items-center font-jura font-semibold">
            {job.country === 'Unknown'
            ? (
              job.workplace_type
            )
            : (
              <>
                <Image src={Pin} alt='pin' />
                {`${job.city}, ${job.country}`} | {job.workplace_type}
              </>
            )}
          </p>
          <p className="text-base md:text-[18px] font-jura font-semibold">
            {new Date(job.posted_date).toLocaleDateString('en-US', { 
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </p>
        </div>
        <div className='flex gap-x-2 gap-y-1 md:gap-x-3 my-1 lg:my-2 flex-wrap overflow-hidden'>
          {!!job.skills_required.length && job.skills_required.map(
            (skill, index) => (
              <div key={index} className='pill'>{skill}</div>
            )
          )}
        </div>
      </div>
      <div 
        className="mt-5 grow overflow-y-auto scrollable" 
        ref={descriptionRef}
      >
        <div className="font-jura text-[18px] font-normal">
            {job.description.split('\n\n').map((paragraph, pIndex) => (
            <div key={pIndex} className="mb-3.5">
              {paragraph.split('\n').map((line, lIndex) => {
              const boldPhrases = [
                "Required Degrees & Certifications",
                "Key Responsibilities",
                "Required Technical Skills",
                "Required Soft Skills",
                "Preferred/Nice-to-have Skills",
                "Experience Requirements",
                "Position Details",
                "Additional Information",
                "Additional Informations",
                "Required Skills",
                "Desired Skills",
                "Role Overview",
                "Brief Overview",
              ];

              const boldedLine = boldPhrases.reduce((acc, phrase) => {
                if (line.includes(phrase)) {
                return line.replace(phrase, `<strong>${phrase}</strong>`);
                }
                return acc;
              }, line);

              return line.trim() ? (
                <p
                key={lIndex}
                className="leading-[1.4]"
                dangerouslySetInnerHTML={{ __html: boldedLine }}
                />
              ) : null;
              })}
            </div>
            ))}
        </div>
      </div>
      {/* <Link
        href={job.apply_link}
        target='_blank'
        className='font-jura text-sm xl:text-[18px] leading-none px-3 py-2 xl:px-6 xl:py-4 border border-neutral-cold-1 bg-white rounded-[20px] hover:bg-primary hover:text-white transition-colors ease-in duration-200'
      >
        View Original Job Post
      </Link> */}
    </div>
  );
};