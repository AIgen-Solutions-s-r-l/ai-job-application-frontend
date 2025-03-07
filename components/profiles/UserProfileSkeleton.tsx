import { ProfilePersonalInformationSkeleton } from './resume-sections/ProfilePersonalInformationSkeleton';

export const UserProfileSkeleton = () => (
  <div className='w-full'>
    <div className='mb-5'>
      <p className='page-header mb-2'>My Profile</p>
      <p className='text-gray-500'>
        Manage your personal and professional information
      </p>
    </div>

    <ProfilePersonalInformationSkeleton />
  </div>
);
