import { fetchProfileData, fetchIntegrationsData } from "@/libs/data";
import Profile from "@/components/settings/profile";
import Integrations from "@/components/settings/integrations";
import Passes from "@/components/settings/passes";
import { getPlans } from "@/libs/pricing/data";
import { UserPlan } from "@/components/subscription/types";

export default async function SettingsPage() {
  const profileData = await fetchProfileData();
  const integrationData = await fetchIntegrationsData();
  const userPlan: UserPlan = await getPlans();

  return (
    <div className="grid grid-cols-1 xl:grid-cols-3 gap-4">
      <Profile profileData={profileData} />
      <Integrations integrationData={integrationData} />
      <Passes userPlan={userPlan} />
    </div>
  );
}
