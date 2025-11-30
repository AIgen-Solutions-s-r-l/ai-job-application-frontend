import { UserProfile } from '@/components/profiles/UserProfile';
import { getUserProfile } from '@/libs/data';

export const UserProfilesDispatcher = async () => {
  const profileWithDetails = await getUserProfile();

  if (!profileWithDetails) {
    return <div>No profile found</div>;
  }

  return <UserProfile profile={profileWithDetails} />;
};
