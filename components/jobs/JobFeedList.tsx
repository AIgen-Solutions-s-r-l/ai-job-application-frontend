'use client';

import { FC, useMemo, useState } from 'react';
import Image from 'next/image';
import * as Tabs from '@radix-ui/react-tabs';
import { JobDetail, JobsList } from '@/libs/definitions';
import { Check } from 'lucide-react';
import { JobCard } from './JobCard';
import { sortArrayByDate } from '@/libs/utils';
import { JobCardSkeleton } from './JobCardSkeleton';
import { typography } from '@/components/typography';
import { Alert } from '@/components/Alert';
import CongratsEmoji from '@/components/svgs/CongratsEmoji.svg';

interface Props {
  appliedJobs: JobsList;
  failedJobs: JobsList;
  isLoading?: boolean;
}

const underlineOrParagraph = (str: string, isUnderline: boolean) =>
  isUnderline ? <u>{str}</u> : <p>{str}</p>;

export const JobFeedList: FC<Props> = ({
  appliedJobs,
  failedJobs,
  isLoading,
}) => {
  const [sortBy, setSortBy] = useState<'latest' | 'alphabetically'>('latest');
  const [showCongarts, setShowCongarts] = useState<boolean>(true);

  const jobs = useMemo(() => {
    const nullDate = new Date();

    // make array and fix null dates
    const applied: JobDetail[] = Object.keys(appliedJobs)
      .map((key) => appliedJobs[key])
      .map(
        (job) =>
          ({ ...job, posted_date: job.posted_date ?? nullDate } as JobDetail)
      );

    const failed = Object.keys(failedJobs).map((key) => failedJobs[key]);

    return {
      pending:
        sortBy === 'latest'
          ? sortArrayByDate(failed, 'posted_date', 'desc')
          : failed.toSorted((a, b) => ('' + a.title).localeCompare(b.title)),
      applied:
        sortBy === 'latest'
          ? sortArrayByDate(applied, 'posted_date', 'desc')
          : applied.toSorted((a, b) => ('' + a.title).localeCompare(b.title)),
    } satisfies {
      pending: JobDetail[];
      applied: JobDetail[];
    };
  }, [appliedJobs, failedJobs, sortBy]);

  return (
    <div className='font-light flex flex-col gap-4 rounded-2xl font-jura'>
      <p className='page-header'>Job Application History</p>

      {!isLoading && showCongarts && !!Object.keys(appliedJobs).length && (
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

      <Tabs.Root defaultValue='pending'>
        <Tabs.List
          className={`${typography.tabs.list} h-[50px]`}
          aria-label='Pending jobs list'
        >
          <Tabs.Trigger
            className={`${typography.tabs.trigger} grow`}
            value='pending'
          >
            Pending...
          </Tabs.Trigger>
          <Tabs.Trigger className={typography.tabs.trigger} value='applied'>
            Applied
            <div className='w-[28px] h-[28px] flex justify-center items-center shrink-0'>
              <Check height={24} width={24} />
            </div>
          </Tabs.Trigger>
        </Tabs.List>

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

        <Tabs.Content className={typography.tabs.content} value='pending'>
          {isLoading ? (
            <>
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </>
          ) : jobs.pending.length ? (
            jobs.pending.map((job, key) => (
              <JobCard job={job} status='Pending...' key={key} />
            ))
          ) : (
            <div className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl bg-white'>
              <p className='font-montserrat font-medium text-base xl:text-lg'>
                You don&apos;t have any pending applications
              </p>
            </div>
          )}
        </Tabs.Content>
        <Tabs.Content className={typography.tabs.content} value='applied'>
          {isLoading ? (
            <>
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </>
          ) : jobs.applied.length ? (
            jobs.applied.map((job, key) => (
              <JobCard job={job} status='Applied' key={key} />
            ))
          ) : (
            <div className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl bg-white'>
              <p className='font-montserrat font-medium text-base xl:text-lg'>
                You don&apos;t have any applied applications
              </p>
            </div>
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
