import React from 'react';
import { cn } from '@/lib/utils';
import { MatchingJob } from '@/libs/definitions';
import { Check, Info } from 'lucide-react';
import { useSelectedJobsContext } from '@/contexts/selected-jobs-context';

interface Props {
  className?: string;
  job: MatchingJob;
  onClick: () => void;
}

const mockJob: MatchingJob = {
  "id": 1,
  "title": "Backend Developer",
  "is_remote": false,
  "workplace_type": "On-site",
  "posted_date": "2024-12-03T10:00:00",
  "job_state": "Active",
  "description": "Develop and optimize backend APIs, ensure robust database management.",
  "apply_link": "https://backend.jobs/apply/789",
  "company": "Backend Gurus",
  "location": "Turin, Italy",
  "portal": "Indeed"
};

export const JobManagerCard: React.FC<Props> = ({ className, job, onClick }) => {
  const { selectedJobs, handleJobSelect } = useSelectedJobsContext();
  
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
          <h3 className="text-2xl font-medium line-clamp-1 mb-2">{job.company ?? mockJob.company}</h3>
          <h3 className="text-[22px] font-medium line-clamp-2">{job.title ?? mockJob.title}</h3>
        </div>
        <div>
          <p className="text-md mb-2">{job.location ?? mockJob.location}</p>
          <p className="text-md">{job.workplace_type ?? mockJob.workplace_type}</p>
        </div>
        <p className="text-md font-light line-clamp-6">{job.description ?? mockJob.description}</p>
      </div>
      <div className="flex items-end gap-3 pt-3">
        <div className="flex-1 h-12 border border-base-content rounded-full flex items-center justify-center hover:bg-base-content hover:text-white">Resume & Cover Letter</div>
        <div className="flex flex-col items-center gap-3">
          <p>Apply</p>
          <div className="flex-0 h-12 w-[72px] bg-base-content text-white rounded-full flex items-center justify-center cursor-pointer" onClick={(e) => handleJobSelect(job, e)}>
            {selectedJobs.some((j) => j.id === job.id) && <Check size={24} />}
          </div>
        </div>
      </div>
    </div>
  );
};