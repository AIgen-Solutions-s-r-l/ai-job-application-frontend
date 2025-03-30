import { Skeleton } from '@/components/Skeleton';
import { JobSmallCardSkeleton } from './JobSmallCardSkeleton';
import { JobLargeCardSkeleton } from './JobLargeCardSkeleton';
import { Container } from '../Container';

export const JobFeedListSkeleton = () => (
  <div className='w-full gap-5 bg-base-100 mb-20 py-5'>
    <Container className='flex gap-6'>
      <div className='w-full xl:w-[540px] flex flex-0 flex-col gap-5'>
        <div className='h-16 flex items-center justify-end gap-5 pr-4 bg-white rounded-xl'>
          <Skeleton className='w-32 h-6' />
          <Skeleton className='h-12 w-12 rounded-xl' />
        </div>
        <JobSmallCardSkeleton />
        <JobSmallCardSkeleton />
        <JobSmallCardSkeleton />
      </div>

      <JobLargeCardSkeleton />
    </Container>
  </div>
);
