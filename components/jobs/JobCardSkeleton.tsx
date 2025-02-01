import { Skeleton } from '../Skeleton';

export const JobCardSkeleton = () => {
  return (
    <article className='w-full px-7 py-4 flex flex-col gap-5 border-2 border-neutral-content rounded-2xl bg-white'>
      <div className='text-xl flex flex-col gap-1'>
        <Skeleton className='w-64 h-5' />
        <Skeleton className='w-64 h-5' />
      </div>
      <div className='flex gap-3'>
        <div className='flex flex-col justify-between'>
          <Skeleton className='w-32 h-3' />
          <div className='flex flex-col gap-1'>
            <Skeleton className='w-32 h-3' />
            <Skeleton className='w-32 h-3' />
          </div>
        </div>
        <Skeleton className='w-full h-[100px] rounded-xl' />
      </div>
    </article>
  );
};
