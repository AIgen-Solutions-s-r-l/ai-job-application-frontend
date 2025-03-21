import { FC } from 'react';
import { cn } from '@/lib/utils';
import { useRouter } from 'next/navigation';
import { JobInfo } from '@/libs/types/application.types';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonUnderline } from '../ButtonUnderline';

interface Props {
  job: JobInfo;
  className?: string;
  goBack?: () => void;
}

export const ApplicationJobInfo: FC<Props> = ({
  className,
  job,
  goBack,
}) => {

  console.log(job);
  return (
    <>
      <div
        className={cn(
          'w-full lg:w-[940px] min-h-[800px] max-h-[1330px] mx-auto overflow-y-auto flex flex-col bg-white py-8 px-10 shadow-xl mb-[80px]',
          className
        )}
      >
        <div className='flex justify-between flex-0'>
          <div className='flex flex-col gap-3 leading-none'>
            <h3 className='text-[22px] font-medium'>{job.title}</h3>
            <p className='text-md'>{job.portal}</p>
          </div>
          {job.company_logo && (
            <div className='w-[160px] h-[80px]'>
              <img
                src={job.company_logo}
                alt='Logo'
                className='w-full h-full object-contain'
              />
            </div>
          )}
        </div>
        <div className='mt-5 flex-1 overflow-y-auto'>
          <p className='text-md font-light'>
            {job.description.split('\n').map((line, index) => (
              line.trim() ? (
                <p key={index} className="mb-2">{line}</p>
              ) : null
            ))}
          </p>
        </div>
      </div>
      <JobButtomSheet className='flex-none items-center justify-between'>
        <ButtonUnderline title='Go Back' handleClick={goBack} />
      </JobButtomSheet>
    </>
  );
};
