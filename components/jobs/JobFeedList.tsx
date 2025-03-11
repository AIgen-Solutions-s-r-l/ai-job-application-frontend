'use client';

import { useMemo, useState } from 'react';
import Image from 'next/image';
import { JobsList } from '@/libs/definitions';
import { JobCard } from './JobCard';
import { sortArrayByDate } from '@/libs/utils';
import { JobCardSkeleton } from './JobCardSkeleton';
import { typography } from '@/components/typography';
import { Alert } from '@/components/Alert';
import CongratsEmoji from '@/components/svgs/CongratsEmoji.svg';

interface Props {
  appliedJobs: JobsList;
  failedJobs: JobsList;
  pendingJobs: JobsList
  isLoading?: boolean;
}

const underlineOrParagraph = (str: string, isUnderline: boolean) =>
  isUnderline ? <u>{str}</u> : <p>{str}</p>;

export const JobFeedList: React.FC<Props> = ({
  appliedJobs,
  failedJobs,
  isLoading,
  pendingJobs
}) => {
  const [sortBy, setSortBy] = useState<'latest' | 'alphabetically'>('latest');
  const [showCongarts, setShowCongarts] = useState<boolean>(true);

  const jobs = useMemo(() => {
    const nullDate = new Date();

    // Combine and process all jobs into a single array with status
    const allJobs = [
      ...(pendingJobs ? Object.keys(pendingJobs).map(key => ({
        ...pendingJobs[key],
        posted_date: (pendingJobs[key].posted_date ?? nullDate).toString(),
        status: 'Pending...' as const
      })) : []),
      ...(appliedJobs ? Object.keys(appliedJobs).map(key => ({
        ...appliedJobs[key],
        posted_date: (appliedJobs[key].posted_date ?? nullDate).toString(),
        status: 'Applied' as const
      })) : []),
      ...(failedJobs ? Object.keys(failedJobs).map(key => ({
        ...failedJobs[key],
        posted_date: (failedJobs[key].posted_date ?? nullDate).toString(),
        status: 'Failed' as const
      })) : [])
    ];

    // Sort the combined array
    return {
      all: sortBy === 'latest'
        ? sortArrayByDate(allJobs.filter(job => job.status === 'Pending...'), 'posted_date', 'desc')
        : allJobs.filter(job => job.status === 'Pending...').toSorted((a, b) => ('' + a.title).localeCompare(b.title)),
    };
  }, [appliedJobs, failedJobs, pendingJobs, sortBy]);

  return (
    <div className='font-light flex flex-col gap-4 rounded-2xl font-jura'>
      <p className='page-header'>Job Application History</p>

      {showCongarts && !isLoading && (
        <Alert
          onClose={() => {
            setShowCongarts(false);
          }}
        >
          <div className='flex items-center gap-5 font-normal font-montserrat'>
            <Image src={CongratsEmoji} alt='CongratsEmoji' />
            <span className='ext-primary-deep-purple text-xl'>
              Congratulations!
            </span>
            <div>
              <span className='text-white text-lg'>
                Your applications are being submitted to{' '}
              </span>
              <span className='text-white text-xl'>
                {Object.keys(appliedJobs).length} companies.
              </span>
            </div>
          </div>
        </Alert>
      )}

      <div className='px-5 pt-5 flex justify-end items-center gap-1 z-10 bg-white'>
        Sort by:
        <button onClick={() => setSortBy('latest')}>
          {underlineOrParagraph('Latest', sortBy === 'alphabetically')}
        </button>
        |
        <button onClick={() => setSortBy('alphabetically')}>
          {underlineOrParagraph('Alphabetically', sortBy === 'latest')}
        </button>
      </div>

      <div className={typography.tabs.content}>
        {isLoading ? (
          <>
            <JobCardSkeleton />
            <JobCardSkeleton />
            <JobCardSkeleton />
          </>
        ) : (
          jobs.all.length ? (
            jobs.all.map((job, key) => (
              <JobCard job={job} status={job.status} key={key} />
            ))
          ) : (
            <div className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl bg-white'>
              <p className='font-montserrat font-medium text-base xl:text-lg'>
                You don&apos;t have any applications
              </p>
            </div>
          )
        )}
      </div>
    </div>
  );
};
