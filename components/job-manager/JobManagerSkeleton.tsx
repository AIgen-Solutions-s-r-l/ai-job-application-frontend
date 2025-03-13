import { Container } from "../Container";
import { Skeleton } from "../Skeleton";

export const JobManagerSkeleton = () => {
  return (
    <div className="w-full h-full flex flex-col items-center">
      <HeaderSkeleton />
      <ListSkeleton />
    </div>
  );
};

export const HeaderSkeleton = () => {
  return (
    <Container className="flex flex-col gap-2 xl:gap-4 pt-2 xl:pt-4">
      <h1 className='text-[21px] md:text-[28px] font-montserrat font-semibold leading-[1.1]'>Review & Apply</h1>
      <h2 className='font-montserrat font-normal text-[18px]'>Your resumes are updated. Your cover letters are created.
        You can send all your applications now or go into each job’s detail and tweak your materials before sending out. Good luck ;)
      </h2>
      <div className="flex gap-5 mt-2 xl:mt-4 -mb-10">
        <div className="w-full lg:w-[430px] h-16 drop-shadow-md flex items-center gap-5 bg-white justify-between rounded-xl px-4 border border-1 border-neutral">
          <p className='font-jura text-[18px] font-semibold'>Select All Jobs</p>
          <div className="h-10 w-10 border border-base-content rounded-md flex items-center justify-center cursor-pointer bg-black" />
        </div>
      </div>
    </Container>
  );
};

export const ListSkeleton = () => {
  const skeletonCards = Array.from({ length: 6 }, (_, i) => i);
  
  return (
    <div className='w-full h-full gap-5 pt-16'>
      <Container className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-5 pb-[100px]">
        {skeletonCards.map((index) => (
          <CardSkeleton key={index} />
        ))}
      </Container>
    </div>
  );
};

export const CardSkeleton = () => {
  return (
    <div className="flex flex-col justify-between bg-white rounded-xl relative p-5 gap-1 lg:gap-3 leading-none">
      {/* Match percentage and info icon */}
      <div className="flex gap-2 items-center mb-2">
        <Skeleton className="w-[80px] h-4" />
        <Skeleton className="w-5 h-5 rounded-full" />
      </div>
      
      {/* Company name */}
      <Skeleton className="w-3/4 h-6 mb-1" />
      
      {/* Job title */}
      <Skeleton className="w-5/6 h-6 mb-1" />
      
      {/* Location and workplace type */}
      <div className="flex items-center gap-1">
        <Skeleton className="w-4 h-4 rounded-full" /> {/* Pin icon */}
        <Skeleton className="w-3/5 h-5" />
      </div>
      
      {/* Pills */}
      <div className="flex gap-2 md:gap-4 my-1 lg:my-4">
        <Skeleton className="w-16 h-6 rounded-full" />
        <Skeleton className="w-20 h-6 rounded-full" />
        <Skeleton className="w-16 h-6 rounded-full" />
      </div>
      
      {/* Description */}
      <Skeleton className="w-full h-4 mt-2" />
      <Skeleton className="w-full h-4 mt-1" />
      <Skeleton className="w-4/5 h-4 mt-1" />
      <Skeleton className="w-3/5 h-4 mt-1" />
      
      {/* Checkbox */}
      <Skeleton className="absolute top-3 right-4 h-10 w-10 rounded-md" />
      
      {/* Button */}
      <Skeleton className="w-full h-12 mt-4 lg:mt-8 rounded-2xl" />
    </div>
  );
};