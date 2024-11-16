import { User } from "@supabase/supabase-js";

export type PeriodOfPaid = "monthly" | "annually";
export type PlanType = "day" | "week" | "month";

export interface Plan {
  id?: string;
  plan_name: string;
  price: number;
  max_job_applications: number;
  type: PlanType;
}

export interface UserPlan {
  expireDate: Date;
  currentPlan: Pick<Plan, `plan_name` | `type`> | null;
  subscriptions?: Plan[];
}

export interface Profile extends User {
  plan_expire_date: Date;
}
