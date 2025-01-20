import React from 'react';
import { cn } from '@/lib/utils';
import { PendingApplication } from '@/libs/definitions';

interface Props {
  className?: string;
  job: PendingApplication;
}

export const ApplicationJobInfo: React.FC<Props> = ({ className, job }) => {
  return (
    <div className={cn("w-[940px] mx-auto flex flex-col max-h-[calc(100vh-120px)] bg-base-100 py-8 px-10 shadow-xl", className)}>
      <div className="flex justify-between flex-0">
        <div className="flex flex-col gap-3 leading-none">
          <h3 className="text-[22px] font-medium">{job.title}</h3>
          <p className="text-md">{job.portal}</p>
          <p className="text-md">{job.sent}</p>
        </div>
        <div className="w-[144px] h-[60px] bg-neutral-content flex items-center justify-center">Logo</div>
      </div>
      <div className="mt-5 flex-1 overflow-y-auto">
        <p className="text-md font-light">{job.description}</p>
      </div>
    </div>
  );
};