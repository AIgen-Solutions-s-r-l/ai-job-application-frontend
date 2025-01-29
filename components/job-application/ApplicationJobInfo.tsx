import React from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { JobInfo } from '@/libs/types/application.types';

interface Props {
  className?: string;
  job: JobInfo;
}

export const ApplicationJobInfo: React.FC<Props> = ({ className, job }) => {
  const router = useRouter();
  
  return (
    <>
      <div className={cn("w-[940px] min-h-[800px] max-h-[1330px] mx-auto overflow-y-auto flex flex-col bg-base-100 py-8 px-10 shadow-xl mb-[80px]", className)}>
        <div className="flex justify-between flex-0">
          <div className="flex flex-col gap-3 leading-none">
            <h3 className="text-[22px] font-medium">{job.title}</h3>
            <p className="text-md">{job.portal}</p>
            <p className="text-md">{job.apply_link}</p>
          </div>
          <div className="w-[144px] h-[60px] bg-neutral-content flex items-center justify-center">Logo</div>
        </div>
        <div className="mt-5 flex-1 overflow-y-auto">
          <p className="text-md font-light">{job.description}</p>
        </div>
      </div>
      <div className="fixed bottom-0 z-10 w-full h-[60px] flex items-center bg-secondary">
        <div className="w-[1440px] mx-auto flex flex-none items-center justify-between">
          <button
            className="w-[220px] h-[40px] rounded-full text-white text-lg"
            type="button"
            onClick={() => router.replace('/manager')}
          >
            Go Back
          </button>
          <div />
        </div>
      </div>
    </>
  );
};