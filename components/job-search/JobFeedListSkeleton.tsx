"use client";

import { Skeleton } from "@/components/Skeleton";
import { JobSmallCardSkeleton } from "./JobSmallCardSkeleton";
import { JobLargeCardSkeleton } from "./JobLargeCardSkeleton";

export const JobFeedListSkeleton = () => (
  <div className='w-full gap-5 bg-base-200 mb-20 py-5'>
    <div className='w-[1440px] mx-auto flex gap-5'>
      <div className='w-[430px] flex flex-0 flex-col gap-5'>
        <div className='h-16 flex items-center justify-end gap-5 pr-4 bg-base-100 rounded-xl'>
          <Skeleton className='w-32 h-6' />
          <Skeleton className='h-12 w-12 rounded-xl' />
        </div>
        <JobSmallCardSkeleton />
        <JobSmallCardSkeleton />
        <JobSmallCardSkeleton />
      </div>

      <JobLargeCardSkeleton />
    </div>
  </div>
);
