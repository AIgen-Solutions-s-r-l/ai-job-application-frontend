'use client';

import { FC, useEffect, useState } from 'react';
import { MatchingJob } from '@/libs/definitions';
import { Check, ChevronLeft, ChevronRight } from 'lucide-react';
import { JobSmallCard } from './JobSmallCard';
import { JobLargeCard } from './JobLargeCard';
import { useJobSearch } from '@/contexts/job-search-context';
import { Container } from '../Container';
import { useRouter, useSearchParams } from 'next/navigation';

export const JobFeedList: FC = () => {
  const { jobs, totalCount, isAllSelected, handleSelectAll, currentPage, setCurrentPage, } = useJobSearch();
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
    const itemsPerPage = 25;
    const totalPages = Math.ceil(totalCount / itemsPerPage);
    const maxVisiblePages = 5;
    
    // Prev button
    buttons.push(
      <button 
        key="prev" 
        onClick={() => handlePageChange(currentPage - 1)} 
        className="px-2 py-1 rounded-md border disabled:cursor-not-allowed"
        disabled={currentPage === 0}
      >
        <ChevronLeft size={20} />
      </button>
    );

    if (totalPages <= maxVisiblePages) {
      // Show all pages if total pages is 5 or less
      for (let i = 0; i < totalPages; i++) {
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
    } else {
      // Always show first page
      buttons.push(
        <button
          key={0}
          onClick={() => handlePageChange(0)}
          className={`px-3 py-1 rounded-md border ${currentPage === 0 ? 'bg-primary text-white' : ''}`}
        >
          1
        </button>
      );

      // For pages after 5, show dots
      if (currentPage >= maxVisiblePages) {
        buttons.push(<span key="dots" className="px-2">...</span>);
      }

      if (currentPage < maxVisiblePages) {
        // First 5 pages
        for (let i = 1; i < maxVisiblePages; i++) {
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
      } else {
        // Pages after 5
        for (let i = currentPage - 2; i <= Math.min(currentPage, totalPages - 1); i++) {
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
      }
    }

    // Next button (only if not on last page)
    if (currentPage < totalPages - 1) {
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
              <div className="h-10 w-10 rounded-md flex items-center text-black justify-center cursor-pointer job-select-box" onClick={handleSelectAll}>
                {isAllSelected() && <Check size={24} />}
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