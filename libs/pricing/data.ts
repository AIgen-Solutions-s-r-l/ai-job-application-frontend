import { UserPlan } from "@/components/subscription/types";
import { createClient } from "@/libs/supabase/server";

export async function getPlans(
  includeSubscriptions: boolean = false
): Promise<UserPlan> {
  const supabase = createClient();

  try {
    const {
      data: { user },
      error: authError,
    } = await supabase.auth.getUser();

    if (authError) {
      throw new Error(`Authentication error: ${authError.message}`);
    }

    const { data: userDb, error } = await supabase
      .from("profiles")
      .select(`plan_expire_date, plan`)
      .eq("id", user.id)
      .not("plan", "is", null)
      .maybeSingle();

    if (error) {
      throw new Error(`Error fetching user profile: ${error.message}`);
    }

    const { data: subscriptions, error: subsError } = await supabase
      .from("subscription_plans")
      .select();

    if (subsError) {
      throw new Error(`Error fetching subscription plans: ${subsError.message}`);
    }

    let result: UserPlan = {
      expireDate: userDb?.plan_expire_date || null,
      currentPlan: subscriptions.find((sub) => sub.id === userDb?.plan) || null,
    };

    if (includeSubscriptions) {
      result.subscriptions = subscriptions || [];
    }

    return result;
  } catch (error) {
    console.error("Error in getPlans:", error);
    return {
      expireDate: null,
      currentPlan: null,
      subscriptions: includeSubscriptions ? [] : undefined,
    };
  }
}