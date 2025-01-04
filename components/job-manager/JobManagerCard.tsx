import React from 'react';
import { cn } from '@/lib/utils';
import { PendingApplication } from '@/libs/definitions';
import { Check, Info } from 'lucide-react';
import Link from 'next/link';
import { useJobManager } from '@/contexts/job-manager-context';

interface Props {
  id: string;
  className?: string;
  job: PendingApplication;
  onClick: () => void;
}

export const JobManagerCard: React.FC<Props> = ({ id, className, job, onClick }) => {
  const { selectedApplications, handleApplicationSelect } = useJobManager();

  return (
    <div 
      className={cn("min-h-[408px] bg-base-100 rounded-xl p-5 flex flex-col justify-between divide-y divide-base-content leading-none cursor-pointer shadow-lg", className)}
      onClick={onClick}
    >
      <div className="flex flex-col gap-5">
        <div>
          <div className="flex gap-2 items-center place-self-end">
            <p className="text-xs">95% Match</p>
            <Info size={18} />
          </div>
          <h3 className="text-2xl font-medium line-clamp-1 mb-2">Company</h3>
          <h3 className="text-[22px] font-medium line-clamp-2">{job.title}</h3>
        </div>
        <div>
          <p className="text-md mb-2">Location</p>
          <p className="text-md">Work type</p>
        </div>
        <p className="text-md font-light line-clamp-6">{job.description}</p>
      </div>
      <div className="flex items-end gap-3 pt-3">
        <Link 
          href={`/manager/${id}`}
          className="flex-1 h-12 border border-base-content rounded-full flex items-center justify-center hover:bg-base-content hover:text-white"
        >Resume & Cover Letter</Link>
        <div className="flex flex-col items-center gap-3">
          <p>Apply</p>
          <div className="flex-0 h-12 w-[72px] bg-base-content text-white rounded-full flex items-center justify-center cursor-pointer" onClick={(e) => handleApplicationSelect(id, e)}>
            {selectedApplications.some((j) => j === id) && <Check size={24} />}
          </div>
        </div>
      </div>
    </div>
  );
};