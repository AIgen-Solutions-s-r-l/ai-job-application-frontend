import { Skeleton } from '@/components/Skeleton';
import { InputWrapper } from '@/components/ui/form-input';
import { FormInputSkeleton } from '@/components/ui/FormInputSkeleton';

export const ProfilePersonalInformationSkeleton = () => (
  <div className='bg-white group rounded-none'>
    <div className='collapse-title text-xl font-medium bg-white'>
      <Skeleton className='w-[200px] h-6' />
    </div>
    <div>
      <div className='flex flex-col gap-5'>
        {/* Name */}
        <InputWrapper>
          <FormInputSkeleton className='grow' />
          <FormInputSkeleton className='grow' />
          <FormInputSkeleton className='w-[298px]' />
        </InputWrapper>

        {/* Address */}
        <InputWrapper>
          <FormInputSkeleton className='w-[194px]' />
          <FormInputSkeleton className='grow' />
          <FormInputSkeleton className='w-[149px]' />
          <FormInputSkeleton className='w-[149px]' />
          <FormInputSkeleton className='w-[268px]' />
        </InputWrapper>

        {/* Contacts */}
        <InputWrapper>
          <FormInputSkeleton className='w-[194px]' />
          <FormInputSkeleton className='w-[186px]' />
          <FormInputSkeleton className='w-[579px]' />
        </InputWrapper>

        {/* Socials */}
        <InputWrapper>
          <FormInputSkeleton className='Gribuna ' />
          <FormInputSkeleton className='w-[579px]' />
        </InputWrapper>
      </div>
    </div>
  </div>
);
