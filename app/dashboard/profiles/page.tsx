import { MyProfile } from "@/components/profiles/MyProfile";
import { getUserProfile } from "@/libs/data";

export default async function JobProfiles() {
  const profileWithDetails = await getUserProfile();

  return <MyProfile profile={profileWithDetails} />;
}