'use client';

import { JobInfo } from '@/libs/types/application.types';
import { MapPin } from 'lucide-react';
import { FC } from 'react';

interface Props {
  job: JobInfo;
}

export const JobApplicationHeader: FC<Props> = ({ job }) => {
  return (
    <div className="w-full bg-base-100 font-montserrat">
      <div className="w-[1440px] mx-auto flex justify-between">
        <div className="w-[680px]">
          <h1 className='text-[28px] font-semibold leading-[30px] mb-[30px]'>Edit Resume & Cover Letter</h1>
          <p className="text-[18px] leading-[22px]">
            You can select text on your resume and cover letter to edit the style.You can also change the template of your resume.
          </p>
        </div>

        <div
          className="w-[493px] h-[235px] -mb-[48px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-xl relative p-[30px] flex flex-col gap-[20px] leading-none cursor-pointer bg-white"
        >
          <div className="flex gap-[8px] items-center">
            <p className='text-[40px] leading-[44px] font-medium'>{job.company_name ?? 'Company Name'}</p>
          </div>
          <p className='text-[20px] leading-none'>{job.title ?? 'UX Designer Tier II'}</p>
          <div className="flex gap-[8px] items-end ">
            <MapPin size={20} />
            <p className='text-[18px] font-semibold font-jura leading-none'>{job.location ?? 'Santa Clara, USA'}</p>
          </div>
          <div className="flex gap-3 mt-2 font-jura">
            <div className="flex items-center justify-center w-max h-[27px] px-[15px] rounded-full bg-primary text-white text-base">
              {job.is_remote ? 'Remote' : 'On-site'}
            </div>
            <div className="flex items-center justify-center w-max h-[27px] px-[15px] rounded-full bg-primary text-white text-base">
              {job.workplace_type ?? 'Full-time'}
            </div>
            <div className="flex items-center justify-center w-max h-[27px] px-[15px] rounded-full bg-primary text-white text-base">
              English
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};