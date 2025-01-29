'use client';

import { JobInfo } from '@/libs/types/application.types';
import { Check, MapPin } from 'lucide-react';
import React from 'react';

interface Props {
  job: JobInfo;
}

export const JobApplicationHeader: React.FC<Props> = ({ job }) => {
  return (
    <div className="w-full bg-base-100">
      <div className="w-[1440px] mx-auto flex justify-between">
        <div className="w-[680px]">
          <h1 className='text-[28px] font-semibold mt-[10px] mb-[30px]'>Edit Resume & Cover Letter</h1>
          <p className="text-[20px] leading-[24px]">
            You can select text on your resume and cover letter to edit the style.You can also change the template of your resume.
          </p>
        </div>

        <div 
          className="w-[493px] h-[235px] -mb-[48px] bg-base-100 shadow-xl rounded-xl relative p-[30px] flex flex-col gap-[20px] leading-none cursor-pointer"
        >
          <div className="flex gap-[8px] items-center">
            <p className='text-[32px] font-medium'>{job.company_name ?? 'Company Name'}</p>
          </div>
          <p className='text-[20px]'>{job.title ?? 'UX Designer Tier II'}</p>
          <div className="flex gap-[8px] items-end">
            <MapPin size={20} />
            <p className='text-[18px] font-semibold'>{job.location ?? 'Santa Clara, USA'}</p>
          </div>
          <div className="flex gap-3 mt-2">
            <div className="flex items-center justify-center w-[85px] h-[27px] rounded-full bg-secondary text-white">
              {job.is_remote ? 'Remote' : 'On-site'}
            </div>
            <div className="flex items-center justify-center w-[85px] h-[27px] rounded-full bg-secondary text-white">
              {job.workplace_type ?? 'Full-time'}
            </div>
            <div className="flex items-center justify-center w-[85px] h-[27px] rounded-full bg-secondary text-white">
              English
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};