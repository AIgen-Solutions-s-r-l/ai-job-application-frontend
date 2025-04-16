'use client';

import Image from 'next/image';
import { JobInfo } from '@/libs/types/application.types';
import { MapPin } from 'lucide-react';
import { FC } from 'react';
import { Container } from '../Container';

interface Props {
  job: JobInfo;
}

export const JobApplicationHeader: FC<Props> = ({ job }) => {
  return (
    <div className='w-full font-montserrat'>
      <Container className='flex justify-between'>
        <div className='w-full xl:w-[680px]'>
          <h1 className='text-[21px] md:text-[24px] lg:text-[28px] font-semibold leading-[30px] mb-[8px] md:mb-[15px] xl:mb-[30px]'>
            Edit Resume & Cover Letter
          </h1>
          <p className='text-[14px] md:text-[16px] lg:text-[18px] leading-[22px]'>
            You can select text on your resume and cover letter to edit the
            style. You can also change the template of your resume.
          </p>
        </div>

        <div className='hidden xl:flex w-[493px] -mb-[48px] shadow-[0_4px_4px_rgba(0,0,0,0.25)] rounded-xl relative p-[30px] flex-col gap-[20px] leading-none cursor-pointer bg-white'>
          {/* <div className="flex gap-[8px] items-center">
            <p className='text-[24px] leading-[32px] font-medium'>{job.title}</p>
          </div> */}
          <div className='flex justify-between'>
            <div className=''>
              <h3 className='font-montserrat text-base md:text-xl font-medium mb-3'>
                {job.title}
              </h3>
              <p className='font-montserrat text-base md:text-xl font-normal'>
                {job.company_name}
              </p>
            </div>
            {job.company_logo && (
              <div className='w-[160px] h-[80px]'>
                <Image
                  src={job.company_logo}
                  alt='Logo'
                  className='w-full h-full object-contain'
                />
              </div>
            )}
          </div>
          {job.location && (
            <div className='flex gap-[8px] items-end '>
              <MapPin size={20} />
              <p className='text-[18px] font-semibold font-jura leading-none'>
                {job.location}
              </p>
            </div>
          )}
          {/* <div className='flex gap-x-2 gap-y-1 my-1 lg:my-2 flex-wrap overflow-hidden'>
            {!!job.skills_required.length && job.skills_required.map(
              (skill, index) => (
                <div key={index} className='pill'>{skill}</div>
              )
            )}
          </div> */}
        </div>
      </Container>
    </div>
  );
};
