import { Skeleton } from "@/components/Skeleton";

export const JobSmallCardSkeleton = () => (
  <div className='bg-white rounded-xl relative p-5 flex flex-col gap-3 leading-none'>
    <div className='flex gap-2 items-center mb-2'>
      <Skeleton className='w-[64px] h-4' />
      <Skeleton className='w-4 h-4' />
    </div>
    <Skeleton className='w-64 h-6' />
    <Skeleton className='w-64 h-5' />
    <Skeleton className='w-32 h-4' />
    <Skeleton className='w-32 h-4' />
    <Skeleton className='w-full h-8' />
    <Skeleton className='absolute top-3 right-4 h-12 w-12 rounded-xl' />
  </div>
);
