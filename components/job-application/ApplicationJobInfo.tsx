import { FC } from 'react';
import { cn } from '@/lib/utils';
import { JobInfo } from '@/libs/types/application.types';
import { JobButtomSheet } from '@/components/JobButtomSheet';
import { ButtonUnderline } from '../ButtonUnderline';
import { ArrowRight } from 'lucide-react';

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
  return (
    <>
      <div
        className={cn(
          'w-full lg:w-[850px] min-h-[800px] max-h-[1200px] mx-auto flex flex-col bg-white py-8 px-10 shadow-xl mb-[80px]',
          className
        )}
      >
        <div className='flex justify-between flex-0'>
          <h3 className='text-[22px] font-medium'>{job.title}</h3>
        </div>
        <div className='mt-5 flex-1 scrollable'>
          <p className='text-md font-light'>
            {job.description.split('\n').map((line, index) => (
              line.trim() ? (
                <p key={index} className="mb-2">{line}</p>
              ) : null
            ))}
          </p>
        </div>
        <a
        href={job.apply_link}
        target="_blank"
        rel="noopener noreferrer"
        className="btn mt-2 lg:mt-4 font-jura text-sm md:text-base lg:text-lg border border-1 border-primary rounded-2xl flex justify-between bg-neutral-content hover:bg-primary hover:text-white"
        >
        View original job posting
        <ArrowRight size={20} />
      </a>
      </div>
      <JobButtomSheet className='flex-none items-center justify-between'>
        <ButtonUnderline title='Go Back' handleClick={goBack} />
      </JobButtomSheet>
    </>
  );
};
