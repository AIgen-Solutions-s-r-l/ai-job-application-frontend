'use client';

import { useJobManager } from '@/contexts/job-manager-context';
import { Check } from 'lucide-react';
import React from 'react';

export const JobManagerHeader: React.FC = () => {
  const { isAllSelected, handleSelectAll } = useJobManager();

  return (
    <div className="w-full bg-base-100">
      <div className="w-[1440px] mx-auto">
        <h1 className='text-[32px] leading-10 mb-8'>Job Manager</h1>

        <div className="flex gap-5 -mb-8">
          <div className="w-[430px] h-16 flex items-center justify-end gap-5 pr-4 bg-base-100 rounded-xl outline outline-1 outline-neutral-content z-50">
            <p>Select All</p>
            <div className="h-12 w-12 border border-base-content rounded-xl flex items-center justify-center cursor-pointer" onClick={() => handleSelectAll()}>
              {isAllSelected() && <Check size={24} />}
            </div>
          </div>

          <p className="text-lg">Your resume and cover letter will be <span className="font-semibold">automatically adapted</span> to the jobs.</p>
        </div>
      </div>
    </div>
  );
};