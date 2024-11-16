"use client";

import { FC, useState } from "react";
import Pricing from "./Pricing.client";
import { Plan, PlanType } from "./types";
import { checkoutPlan } from "@/libs/pricing/actions";
import { usePathname } from "next/navigation";

interface PlanPanelPros {
  subscriptions: Plan[];
  currentType: PlanType | null;
}

const PricingPanel: FC<PlanPanelPros> = ({ subscriptions, currentType }) => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  const onUpgrade = async (id: string): Promise<void> => {
    setLoading(true);

    const { data: checkoutUrl, error } = await checkoutPlan(
      id,
      `${window.location.origin}${window.location.pathname}`
    );
    window.location.href = checkoutUrl ?? pathname;
    setLoading(false);
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8">
      {subscriptions
        .sort((a, b) => a.price - b.price)
        .map((sub) => (
          <Pricing
            loading={loading}
            key={sub.id}
            type={sub.type}
            price={sub.price}
            isActive={sub.type === currentType}
            onUpgrade={() => onUpgrade(sub.id)}
          />
        ))}
    </div>
  );
};

export default PricingPanel;
