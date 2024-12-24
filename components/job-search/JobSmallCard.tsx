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

export const JobSmallCard: React.FC<Props> = ({ className, job, onClick }) => {
  const { selectedJobs, setSelectedJobs } = useSelectedJobsContext();

  const handleJobSelect = (job: MatchingJob, e: React.MouseEvent) => {
    e.stopPropagation();
    
    setSelectedJobs((prevSelected) => {
      if (prevSelected.some((j) => j.id === job.id)) {
        // Job is already selected, remove it
        return prevSelected.filter((j) => j.id !== job.id);
      } else {
        // Job is not selected, add it
        return [...prevSelected, job];
      }
    });
  };
  
  return (
    <div 
      className={cn("bg-base-100 rounded-xl relative p-5 flex flex-col gap-3 leading-none cursor-pointer", className)}
      onClick={onClick}
    >
      <div className="flex gap-2 items-center mb-2">
        <p className="text-xs">95% Match</p>
        <Info size={18} />
      </div>
      <h3 className="text-2xl font-medium line-clamp-1">{job.company ?? mockJob.company}</h3>
      <h3 className="text-[22px] font-medium line-clamp-2">{job.title ?? mockJob.title}</h3>
      <p className="text-md">{job.location ?? mockJob.location}</p>
      <p className="text-md">{job.workplace_type ?? mockJob.workplace_type}</p>
      <p className="text-md font-light line-clamp-4">{job.description ?? mockJob.description}</p>
      <div className="absolute top-3 right-4 h-12 w-12 bg-base-content text-white rounded-xl flex items-center justify-center cursor-pointer" onClick={(e) => handleJobSelect(job, e)}>
        {selectedJobs.some((j) => j.id === job.id) && <Check size={24} />}
      </div>
    </div>
  );
};