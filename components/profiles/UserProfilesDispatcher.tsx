import { UserProfile } from '@/components/profiles/UserProfile';
import { getUserProfile } from '@/libs/data';

export const UserProfilesDispatcher = async () => {
  const profileWithDetails = await getUserProfile();

  return <UserProfile profile={profileWithDetails} />;
};
