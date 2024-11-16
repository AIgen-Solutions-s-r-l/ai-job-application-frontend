import { UserPlan } from "@/components/subscription/types";
import { createClient } from "@/libs/supabase/server";

export async function getPlans(
  includeSubscriptions: boolean = false
): Promise<UserPlan> {
  const supabase = createClient();
  
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser();

  const { data: userDb, error } = await supabase
    .from("profiles")
    .select(`plan_expire_date, plan`)
    .eq("id", user.id)
    .not("plan", "is", null)
    .maybeSingle();

  const { data: subscriptions } = await supabase
    .from("subscription_plans")
    .select();

  let result: UserPlan = {
    expireDate: userDb?.plan_expire_date,
    currentPlan: subscriptions.find((sub) => sub.id === userDb?.plan),
  };

  if (includeSubscriptions) {
    result.subscriptions = subscriptions;
  }

  return result;
}
