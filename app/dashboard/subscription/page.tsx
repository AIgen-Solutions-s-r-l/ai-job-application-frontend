import Subscription from "@/components/subscription/subscription";
import { fetchTransactionsData } from "@/libs/data";

export default async function SubscriptionPage() {
  const transactionsData = await fetchTransactionsData();

  return (
    <div className="rounded-lg rounded-b-lg overflow-hidden">
      <Subscription initialTransactions={transactionsData} />
    </div>
  );
}
