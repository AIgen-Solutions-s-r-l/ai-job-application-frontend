'use client';

import { FC, useEffect, useState } from 'react';
import { cn } from '@/lib/utils';
import { PendingApplication } from '@/libs/definitions';
import { Check } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import Pin from '../svgs/Pin.svg';
import { useJobManager } from '@/contexts/job-manager-context';
import Document from '../svgs/Document.svg';

interface Props {
  id: string;
  className?: string;
  job: PendingApplication;
  onClick: () => void;
}

export const JobManagerCard: FC<Props> = ({ id, className, job, onClick }) => {
  const { selectedApplications, handleApplicationSelect } = useJobManager();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const isSelected = selectedApplications?.some(j => j === id) || false;

  // Combined click logic
  const handleCardClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // Prevent toggle if clicking on the button
    const target = e.target as HTMLElement;
    if (target.closest('a')) return;

    onClick();
    handleApplicationSelect(id, e);
  };

  return (
    <div
      className={cn(
        "flex flex-col justify-between bg-white rounded-xl relative p-5 gap-1 lg:gap-3 leading-none cursor-pointer transition-transform duration-300 ease-in-out hover:scale-[1.02] hover:shadow-xl hover:border-gray-200",
        className
      )}
      onClick={handleCardClick}
    >
      <h3 className="font-montserrat text-base md:text-xl font-medium pr-12">{job.title}</h3>
      <div className='flex items-center justify-between'>
        <h3 className="font-montserrat text-base md:text-xl font-normal">{job.company_name}</h3>
        {/* {job.company_logo && (...) } */}
      </div>

      {job.location ? (
        <p className='text-base md:text-[18px] flex gap-3 items-center font-jura font-semibold'>
          {(() => {
            const [city, country] = job.location.split(', ').map(part => part.trim());
            return country === 'Unknown' && city === 'Remote' ? (
              <>
          <Image src={Pin} alt='pin' />
          Remote
              </>
            ) : country === 'Unknown' ? (
              job.workplace_type
            ) : (
              <>
          <Image src={Pin} alt='pin' />
          {`${city}, ${country}`} | {job.workplace_type}
              </>
            );
          })()}
        </p>
      ) : (
        <p className="text-sm md:text-base flex gap-2 items-center">
          {job.workplace_type}
        </p>
      )}

      <div className="flex gap-x-2 gap-y-1 my-1 lg:my-2 flex-wrap overflow-hidden">
        {!!job.skills_required.length &&
          job.skills_required.map((skill, index) => (
            <div key={index} className="pill">
              {skill}
            </div>
          ))}
      </div>

      <div className="grow">
        <p className="line-clamp-4 font-jura text-[16px] font-semibold leading-[110%] tracking-[-0.352px] mt-2 lg:mt-0">
          {job.short_description}
        </p>
      </div>

      <div
        className={cn(
          "absolute top-3 right-4 h-10 w-10 job-select-box text-black rounded-md flex items-center justify-center cursor-pointer",
          isSelected ? "pop-once" : "scale-100"
        )}
      >
        {mounted && (
          <div
            className={cn(
              "transition-transform duration-150 ease-in-out",
              isSelected ? "scale-100" : "scale-0"
            )}
          >
            <Check size={32} strokeWidth={2.5} />
          </div>
        )}
      </div>

      {/* Prevent this link from bubbling up */}
      <Link
        href={`/manager/${id}`}
        onClick={(e) => e.stopPropagation()}
        className="btn mt-4 lg:mt-8 font-jura text-sm md:text-base lg:text-lg border border-1 border-primary rounded-2xl flex justify-between bg-neutral-content hover:bg-primary hover:text-white"
      >
        Edit Resume & Cover Letter
        <Image src={Document} alt="Document" />
      </Link>
    </div>
  );
};
