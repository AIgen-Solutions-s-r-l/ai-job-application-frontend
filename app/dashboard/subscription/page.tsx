import PricingPanel from "@/components/subscription/PricingPanel.client";
import { UserPlan } from "@/components/subscription/types";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { getPlans } from "@/libs/pricing/data";

export default async function Subscription() {
  const plans: UserPlan = await getPlans(true);

  return (
    <div className="rounded-lg shadow bg-white p-6 h-full">
      <Tabs defaultValue="monthly" className="text-center">
        <h1 className="text-4xl font-bold py-4">Choose Your Pass</h1>
        <div className="flex justify-center">
          <p className="my-4 max-w-[500px]">
            Boost your job applications on LinkedIn with our passes, giving you
            access to the LinkedIn bot to apply to more jobs efficiently.
          </p>
        </div>
        <TabsList>
          <TabsTrigger value="monthly">One-time payment</TabsTrigger>
          {/* <TabsTrigger value="annually">Annually</TabsTrigger> */}
        </TabsList>
        <div className="p-8">
          <TabsContent value="monthly">
            <PricingPanel
              subscriptions={plans.subscriptions}
              currentType={plans.currentPlan?.type}
            />
          </TabsContent>
          <TabsContent value="annually">
            <div className="grid grid-cols-3 gap-8">
              {/* <Plan type="free" period="annually" price={50} isActive />
              <Plan type="week" period="annually" price={30} />
              <Plan type="month" period="annually" price={20} /> */}
            </div>
          </TabsContent>
        </div>
      </Tabs>
    </div>
  );
}
