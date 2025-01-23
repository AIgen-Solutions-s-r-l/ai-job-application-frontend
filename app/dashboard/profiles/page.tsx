import { UserProfile } from "@/components/profiles/UserProfile";
import { getUserProfile } from "@/libs/data";

export default async function JobProfiles() {
  const profileWithDetails = await getUserProfile();

  return <UserProfile profile={profileWithDetails} />;
}