import { Suspense } from 'react';
import { UserProfilesDispatcher } from '@/components/profiles/UserProfilesDispatcher';
import { UserProfileSkeleton } from '@/components/profiles/UserProfileSkeleton';

export default function JobProfiles() {
  return (
    <Suspense fallback={<UserProfileSkeleton />}>
      <UserProfilesDispatcher />
    </Suspense>
  );
}
