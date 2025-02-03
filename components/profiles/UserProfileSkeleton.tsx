import { ProfilePersonalInformationSkeleton } from './resume-sections/ProfilePersonalInformationSkeleton';

export const UserProfileSkeleton = () => (
  <div className='w-full'>
    <div className='mb-5'>
      <h1 className='text-3xl font-bold mb-2'>My Profile</h1>
      <p className='text-gray-500'>
        Manage your personal and professional information
      </p>
    </div>

    <ProfilePersonalInformationSkeleton />
  </div>
);
