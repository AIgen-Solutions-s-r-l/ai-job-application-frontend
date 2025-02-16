import { UserPlan } from "@/components/subscription/types";
import Subscription from "@/components/subscription/subscription";
import { getPlans } from "@/libs/pricing/data";

export default async function SubscriptionPage() {

  const plans: UserPlan = await getPlans(true);

  return (
    <div className="rounded-lg rounded-b-lg overflow-hidden">
      <Subscription />
    </div>
  );
}
