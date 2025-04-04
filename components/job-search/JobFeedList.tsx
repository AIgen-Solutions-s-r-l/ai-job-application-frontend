'use client';

import React, { useEffect, useState } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
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
  const offset = searchParams.get('offset');

  useEffect(() => {
    if (jobs.length) {
      setFocusedJob(jobs[0])
    }
  }, [jobs])

  useEffect(() => {
    if (offset) {
      const page = Math.floor(parseInt(offset) / 25);
      setCurrentPage(page);
    }
  }, [offset]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    const params = new URLSearchParams(searchParams.toString());
    params.set('offset', String(page * 25));
    router.push(`/search?${params.toString()}`);
  };

  const renderPaginationButtons = () => {
    const buttons = [];
    const maxVisiblePages = 4;
    const itemsPerPage = 25;

    // Always show current page 1 button
    buttons.push(
      <button
        key={0}
        onClick={() => handlePageChange(0)}
        className={`px-3 py-1 rounded-md border ${currentPage === 0 ? 'bg-primary text-white' : ''}`}
      >
        1
      </button>
    );

    // Add ellipsis if we're past page 4
    if (currentPage >= maxVisiblePages) {
      buttons.push(<span key="dots" className="px-2">...</span>);
    } else {
      // Show sequential pages up to current if we're in first 4 pages
      for (let i = 1; i < currentPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className="px-3 py-1 rounded-md border"
          >
            {i + 1}
          </button>
        );
      }
    }

    // Show current and surrounding pages
    if (currentPage >= maxVisiblePages) {
      for (let i = currentPage - 2; i <= currentPage; i++) {
        buttons.push(
          <button
            key={i}
            onClick={() => handlePageChange(i)}
            className={`px-3 py-1 rounded-md border ${currentPage === i ? 'bg-primary text-white' : ''}`}
          >
            {i + 1}
          </button>
        );
      }
    } else if (currentPage > 0) {
      // Current page button when on pages 2-4
      buttons.push(
        <button
          key={currentPage}
          onClick={() => handlePageChange(currentPage)}
          className="px-3 py-1 rounded-md border bg-primary text-white"
        >
          {currentPage + 1}
        </button>
      );
    }

    // Add prev button 
    buttons.unshift(
      <button 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)} 
        className="px-2 py-1 rounded-md border disabled:cursor-not-allowed"
        disabled={currentPage === 0}
      >
        <ChevronLeft size={20} />
      </button>
    );

    // Add next button 
    if (jobs.length) {
      buttons.push(
        <button 
          key="next" 
          onClick={() => handlePageChange(currentPage + 1)} 
          className="px-2 py-1 rounded-md border"
        >
          <ChevronRight size={20} />
        </button>
      );
    }

    return buttons;
  };

  if (jobs.length === 0) {
    if (currentPage > 0) {
      return (
        <Container className="flex gap-6 mt-3 lg:mt-5">
          <div className="w-full xl:w-[540px] min-h-[calc(100vh-120px)] flex flex-col gap-5 shrink-0 relative">
            <div className="h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
              <div className="flex justify-center gap-2">
                {renderPaginationButtons()}
              </div>
            </div>
            <p className='font-jura font-semibold text-base xl:text-xl'>No more jobs on this page</p>
          </div>

        </Container>
      );
    }
    
    return (
      <Container className='h-full mt-3 lg:mt-5'>
        <p className='font-jura font-semibold text-base xl:text-xl'>No jobs found</p>
      </Container>
    );
  }

  return (
    <div className="w-full gap-5 bg-base-100 mb-20 py-3 lg:py-5">
      <Container className="flex gap-6">
        <div className="w-full xl:w-[540px] min-h-[calc(100vh-120px)] flex flex-col gap-5 shrink-0 relative">
          <div className="sticky top-5 z-10 h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
            <div className="flex justify-center gap-2">
              {renderPaginationButtons()}
            </div>
            <div className="flex items-center gap-5">
              <p className='hidden md:block font-jura font-semibold text-[18px]'>Select All</p>
              <div className="h-10 w-10 rounded-md flex items-center justify-center cursor-pointer job-select-box" onClick={handleSelectAll}>
                {isAllSelected() && <Check className='text-white' size={24} />}
              </div>
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