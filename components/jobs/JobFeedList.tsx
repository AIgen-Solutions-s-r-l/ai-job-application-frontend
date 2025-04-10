'use client';

import { FC, useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import { JobDetail, JobsList } from '@/libs/definitions';
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

export const JobFeedList: FC<Props> = ({
  appliedJobs,
  failedJobs,
  isLoading,
  pendingJobs
}) => {
  const [sortBy, setSortBy] = useState<'latest' | 'alphabetically'>('latest');
  const [showCongarts, setShowCongarts] = useState<boolean>(false);

  useEffect(() => {
    if (isLoading) return;

    const nullDate = new Date();
    // make array and fix null dates
    const applied: JobDetail[] = Object.keys(appliedJobs)
      .map((key) => appliedJobs[key])
      .map(
        (job) =>
          ({ ...job, posted_date: job.posted_date ?? nullDate } as JobDetail)
      );
    const lastApplied = sortArrayByDate(applied, 'posted_date', 'desc').pop();
    const lastAppliedDateSecond = Number(
      lastApplied ? new Date(lastApplied.posted_date) : Date.now()
    );
    const lastCongratsDateSecond: number = Number(
      localStorage.getItem('last_congrats_datestamp') ?? 0
    );

    setShowCongarts(lastCongratsDateSecond < lastAppliedDateSecond);
  }, []);

  const jobs = useMemo(() => {
    const nullDate = new Date();
    // Combine and process all jobs into a single array with status
    const allJobs = [
      ...(pendingJobs ? Object.keys(pendingJobs).map(key => ({
        ...pendingJobs[key],
        posted_date: pendingJobs[key].posted_date || nullDate.toString(),
        status: 'Pending'
      })) : []),
      ...(appliedJobs ? Object.keys(appliedJobs).map(key => ({
        ...appliedJobs[key],
        posted_date: appliedJobs[key].posted_date || nullDate.toString(),
        status: 'Applied'
      })) : []),
      ...(failedJobs ? Object.keys(failedJobs).map(key => ({
        ...failedJobs[key],
        posted_date: failedJobs[key].posted_date || nullDate.toString(),
        status: 'Failed'
      })) : [])
    ];

    // Sort the combined array
    return {
      all: sortBy === 'latest'
        ? sortArrayByDate(allJobs, 'posted_date', 'desc')
        : allJobs.toSorted((a, b) => ('' + a.title).localeCompare(b.title)),
    };
  }, [appliedJobs, failedJobs, pendingJobs, sortBy]);

  return (
    <div className='font-light flex flex-col gap-4 rounded-2xl font-jura'>
      <p className='page-header'>Job Application History</p>

      {!isLoading && showCongarts && appliedJobs.length && (
        <Alert
          onClose={() => {
            localStorage.setItem('last_congrats_datestamp', String(Date.now()));
            setShowCongarts(false);
          }}
        >
          <div className='flex items-top gap-5 font-normal font-montserrat'>
            <Image src={CongratsEmoji} alt='CongratsEmoji' />
            <span className='ext-primary-deep-purple text-xl'>
              Congratulations!
            </span>
            <div>
              <span className='text-white text-lg'>
                Your applications successfully submitted to{' '}
              </span>
              <span className='text-white text-xl'>
                {Object.keys(appliedJobs).length} companies.
              </span>
            </div>
          </div>
        </Alert>
      )}

      <div>
        {/* <div className='px-5 py-2 flex justify-end items-center gap-1 z-10 bg-white rounded-t-lg'>
          Sort by:
          <button onClick={() => setSortBy('latest')}>
            {underlineOrParagraph('Latest', sortBy === 'latest')}
          </button>
          |
          <button onClick={() => setSortBy('alphabetically')}>
            {underlineOrParagraph(
              'Alphabetically',
              sortBy === 'alphabetically'
            )}
          </button>
        </div> */}
        <div className="mb-5 font-montserrat">
          <p className="text-gray-500">You can view all your submitted applications here. <strong>Please note that we retain your applications on file for 90 days.</strong></p>
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
              <div className="w-full px-7 py-4 flex flex-col gap-5 bg-white">
                <p className='font-montserrat font-xl text-base xl:text-xl font-bold'>
                  Your application history is empty.
                </p>
                <p className='font-montserrat font-medium text-base xl:text-lg'>
                  Why not get started by generating a tailored resume for your preferred job and apply instantly with just a click?
                </p>
                <p className='font-montserrat font-medium text-base xl:text-lg'>
                  Let us do the heavy lifting for you!
                </p>
                <p className='font-montserrat font-medium text-base xl:text-lg text-primary-deep-purple font-bold'>
                  <strong><a href='/search'>Start apply here</a></strong>
                </p>
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
};
