'use client';

import React, { useEffect, useState } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { Check, ChevronRight } from 'lucide-react';
import { JobSmallCard } from './JobSmallCard';
import { JobLargeCard } from './JobLargeCard';
import { useJobSearch } from '@/contexts/job-search-context';
import { Container } from '../Container';
import { useRouter, useSearchParams } from 'next/navigation';

export const JobFeedList: React.FC = () => {
  const { jobs, isAllSelected, handleSelectAll, currentPage, setCurrentPage, } = useJobSearch();
  const [focusedJob, setFocusedJob] = useState<MatchingJob | undefined>();
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    if (jobs.length) {
      setFocusedJob(jobs[0])
    }
  }, [jobs])

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('offset', String(page * 25));
    router.push(`/search?${params.toString()}`);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 5;

    if (currentPage > 0) {
      buttons.push(
        <button 
          key="prev" 
          onClick={() => handlePageChange(currentPage - 1)} 
          className="px-3 py-1 rounded-md border"
        >
          {currentPage}
        </button>
      );
    }

    buttons.push(
      <button
        key={currentPage}
        onClick={() => handlePageChange(currentPage)}
        className="px-3 py-1 rounded-md border bg-primary text-white"
      >
        {currentPage + 1}
      </button>
    );

    buttons.push(
      <button 
        key="next" 
        onClick={() => handlePageChange(currentPage + 1)} 
        className="px-3 py-1 rounded-md border"
      >
        <ChevronRight size={20} />
      </button>
    );

    return buttons;
  };

  if (jobs.length === 0) {
    return (
      <></>
    );
  }

  return (
    <div className="w-full gap-5 bg-base-100 mb-20 py-3 lg:py-5">
      <Container className="flex gap-6">
        <div className="w-full xl:w-[540px] min-h-[calc(100vh-120px)] flex flex-col gap-5 shrink-0">
          <div className="flex justify-center gap-2 mt-4">
            {renderPaginationButtons()}
          </div>
          <div className="h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
            <p className='font-jura font-semibold text-[18px]'>Select All</p>
            <div className="h-10 w-10 border border-base-content rounded-md flex items-center justify-center cursor-pointer bg-my-neutral-7" onClick={handleSelectAll}>
              {isAllSelected() && <Check className='text-white' size={24} />}
            </div>
          </div>
          {jobs.map((job) => (
            <JobSmallCard key={job.id} job={job} onClick={() => setFocusedJob(job)} className={focusedJob?.id === job.id ? "outline outline-1 outline-primary" : ""} />
          ))}
          
        </div>

        <JobLargeCard job={focusedJob} />
      </Container>
    </div>
  );
};