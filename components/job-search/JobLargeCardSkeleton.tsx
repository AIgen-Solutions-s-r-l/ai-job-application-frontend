import { Skeleton } from "@/components/Skeleton";

export const JobLargeCardSkeleton = () => {
  return (
    <div className='sticky top-5 flex flex-col flex-1 max-h-[calc(100vh-120px)] bg-white rounded-xl py-8 px-10'>
      <div className='flex justify-between flex-0'>
        <div className='flex flex-col gap-3 leading-none'>
          <Skeleton className='w-64 h-6' />
          <Skeleton className='w-64 h-5' />
          <Skeleton className='w-32 h-4' />
          <Skeleton className='w-32 h-4' />
        </div>
        <Skeleton className='w-[144px] h-[60px] rounded' />
      </div>
      <div className='mt-5 flex-1 overflow-y-auto'>
        <Skeleton className='w-full h-full rounded-xl' />
      </div>
    </div>
  );
};
