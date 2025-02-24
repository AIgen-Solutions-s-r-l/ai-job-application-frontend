'use client';

import React, { useMemo, useState } from 'react';
import * as Tabs from '@radix-ui/react-tabs';
import { JobDetail, JobsList } from '@/libs/definitions';
import { Check } from 'lucide-react';
import { JobCard } from './JobCard';
import { sortArrayByDate } from '@/libs/utils';
import { JobCardSkeleton } from './JobCardSkeleton';
import { typography } from '../typography';

/*
  todo: what need to fill Pending tab?
*/

interface Props {
  appliedJobs: JobsList;
  failedJobs: JobsList;
  isLoading?: boolean;
}

const underlineOrParagraph = (str: string, isUnderline: boolean) =>
  isUnderline ? <u>{str}</u> : <p>{str}</p>;

export const JobFeedList: React.FC<Props> = ({
  appliedJobs,
  failedJobs,
  isLoading,
}) => {
  const [sortBy, setSortBy] = useState<'latest' | 'alphabetically'>('latest');

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

    //todo: is there a need to sort by year?
    // const sortedJobs: Record<string, JobsList[]> = {};
    // //todo: need add filtering by alphabetically
    // jobs.forEach((e) => {
    //   const year = new Date(e.latest).getFullYear();
    //   if (!sortedJobs[year]) {
    //     sortedJobs[year] = [];
    //   }
    //   sortedJobs[year].push(e);
    // });
    // for (const i of Object.keys(sortedJobs)) {
    //   sortedJobs[i] = sortArrayByDate(sortedJobs[i], sortBy, 'desc');
    // }
    // return sortedJobs;

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
    <div className='h-full relative flex flex-col'>
      <div className='absolute top-0 left-[200px] h-[50px] flex items-center gap-1 z-10'>
        Sort by:
        <button onClick={() => setSortBy('latest')}>
          {underlineOrParagraph('Latest', sortBy === 'alphabetically')}
        </button>
        |
        <button onClick={() => setSortBy('alphabetically')}>
          {underlineOrParagraph('Alphabetically', sortBy === 'latest')}
        </button>
      </div>

      <Tabs.Root className='h-full' defaultValue='pending'>
        <Tabs.List
          className={`${typography.tabs.list} h-[50px] w-96`}
          aria-label='Pending jobs list'
        >
          <Tabs.Trigger
            className={`${typography.tabs.trigger} w-[500px]`}
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

        <Tabs.Content className={typography.tabs.content} value='pending'>
          {isLoading ? (
            <>
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </>
          ) : (
            jobs.pending.map((job, key) => (
              <JobCard job={job} status='Pending...' key={key} />
            ))
          )}
        </Tabs.Content>
        <Tabs.Content className={typography.tabs.content} value='applied'>
          {isLoading ? (
            <>
              <JobCardSkeleton />
              <JobCardSkeleton />
              <JobCardSkeleton />
            </>
          ) : (
            jobs.applied.map((job, key) => (
              <JobCard job={job} status='Applied' key={key} />
            ))
          )}
        </Tabs.Content>
      </Tabs.Root>
    </div>
  );
};
