'use client';

import { cn } from '@/lib/utils';
import React, { useState } from 'react';
import { JobCard } from './job-card';
import { MatchingJob } from '@/libs/definitions';
import { createJobApplication } from '@/libs/api/application';
import { CheckCircleIcon, CircleIcon } from 'lucide-react';
import toast from 'react-hot-toast';

interface Props {
  className?: string;
  jobs: MatchingJob[];
}

export const JobFeedList: React.FC<Props> = ({ className, jobs }) => {
  const [selectedJobs, setSelectedJobs] = useState<MatchingJob[]>([]);

  const handleJobSelect = (job: MatchingJob) => {
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

  const handleApply = async () => {
    if (selectedJobs.length > 0) {
      try {      
        const cv = new File([""], "empty.pdf", { type: "application/pdf" }); // Replace with actual CV file
        const response = await createJobApplication(selectedJobs, cv);

        if (response.success) {
          toast.success("Application submitted!");
          setSelectedJobs([]);
        } else {
          toast.error("Failed to sumbit application.");
        }
      } catch (error) {
        console.error("Error submitting profile:", error);
      } 
    }
  };
  
  if (jobs.length === 0) {
    return (
      <div className={'w-full h-full items-center justify-center text-4xl'}>
        No jobs found
      </div>
    );
  }

  return (
    <div className={cn('w-full flex flex-col gap-5 py-5', className)}>
      <div className="w-full flex items-center gap-[60px] pl-[200px]">
        <div className="w-[900px]">
          <h5 className='text-lg'>{jobs.length} jobs found</h5>
        </div>
          <button
            onClick={handleApply}
            disabled={selectedJobs.length === 0}
            data-tooltip-target="tooltip"
            className="bg-primary hover:bg-accent text-white w-[160px] py-3 rounded-xl disabled:opacity-50"
          >
            Apply to Jobs
          </button>
      </div>
      {jobs.map((job) => (
        <div key={job.id} className='flex items-center gap-[120px] pl-[200px]'>
          <JobCard job={job} className={selectedJobs.some((j) => j.id === job.id) && 'border-primary'} />
          <div
            onClick={() => handleJobSelect(job)} // Direct click handling
            className="w-[40px] h-[40px] flex items-center justify-center rounded-full cursor-pointer transition-colors duration-200"
            style={{ backgroundColor: selectedJobs.some(j => j.id === job.id) ? 'lightgray' : 'transparent' }} // Visual feedback
          >
            {selectedJobs.some((j) => j.id === job.id) ? (
              <CheckCircleIcon className="h-8 w-8 text-primary" /> // Checked icon
            ) : (
              <CircleIcon className="h-8 w-8 text-neutral-content" /> // Unchecked icon
            )}
          </div>
        </div>
      ))}
    </div>
  );
};