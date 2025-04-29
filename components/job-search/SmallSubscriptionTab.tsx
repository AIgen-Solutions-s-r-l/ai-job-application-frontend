import { useState, useEffect, useMemo } from "react";

// Icons and images
import { CartIcon } from "@/components/AppIcons";

// Components
import TwoWayToggleSwitch from "../common/TwoWayToggleSwitch";

// Importamos la configuración central
import SliderInput from "../subscription/sliderInput";
import { useSubscription } from "@/libs/hooks/useSubscription";
import { fetchTransactionsData } from "@/libs/data";
import { Transaction } from "@/libs/definitions";

import { useRef } from "react";

function SmallSubscriptionTab() {
  const [currentApplications] = useState(300);
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    (async () => {
      const tsx = await fetchTransactionsData();
      setTransactions(tsx);
    })();
  }, []);

  const {
    sliderValue,
    setSliderValue,
    paymentPlan,
    setPaymentPlan,
    isLoading,
    values,
    calculateTotal,
    getPricePerApplication,
    handlePurchase,
  } = useSubscription({ fromSearch: true });

  const totals = calculateTotal(currentApplications);
  const hasSetInitialSlider = useRef(false);
  
  const activeSubscription = useMemo(
    () =>
      transactions.find(
        (tx) =>
          tx.transaction_type === "plan_purchase" && tx.is_subscription_active
      ),
    [transactions]
  );

  const activePlanValue = activeSubscription
    ? Number(activeSubscription.amount)
    : null;

  useEffect(() => {
    if (activePlanValue) {
      const idx = values.findIndex(
        (v) => Number(v.value) === activePlanValue
      );
      if (idx !== -1) {
        setSliderValue(idx);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activePlanValue]);

  useEffect(() => {
      if (
        !hasSetInitialSlider.current &&
        activePlanValue &&
        values.length > 0
      ) {
        const matchedIndex = values.findIndex(
          (v) => parseInt(v.value) === activePlanValue
        );
        if (matchedIndex !== -1) {
          setSliderValue(matchedIndex);
          hasSetInitialSlider.current = true;
        }
      }
    }, [activePlanValue, values, setSliderValue]);

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
      {/* Toggle row */}
      <div className="flex flex-col md:flex-row items-center gap-4">
        <TwoWayToggleSwitch value={paymentPlan} onChange={setPaymentPlan} />
        {paymentPlan === "monthly" && (
          <div className="pill bg-green-100 text-green-700 font-semibold px-3 py-1 border border-green-300 shadow-sm animate-pulse">
            Save 20% Instantly!
          </div>
        )}
      </div>

      {/* Main box: Title, Slider, Price & Purchase */}
      <div className="border border-my-neutral-3 rounded-lg p-5 flex flex-col gap-4">
        {/* Title */}
        <h2 className="font-montserrat text-xl font-semibold text-black">
          Job Application Credits
        </h2>

        {/* Slider */}
        <div className="relative">
          <SliderInput
            values={values}
            sliderValue={sliderValue}
            setSliderValue={setSliderValue}
            activePlanValue={activeSubscription && paymentPlan === "monthly" && values[sliderValue].value === activePlanValue?.toString() ? activePlanValue : null}
          />
        </div>

        {/* Row: left -> credit equivalency, right -> price + purchase */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mt-2">
          {/* Left: 1 Credit = ... */}
          <div className="text-my-neutral-5 text-sm font-jura leading-5">
            1 Credit = €{getPricePerApplication()} <br />
            1 Credit = 1 Job Application
          </div>

          {/* Right: Price & Purchase */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-montserrat text-sm text-my-neutral-5">
              {sliderValue === 0
                ? 50
                : sliderValue === 1
                  ? 100
                  : sliderValue === 2
                    ? 200
                    : sliderValue === 3
                      ? 300
                      : 500} applications
              {paymentPlan === "monthly" && " / month"}
            </p>
            <p className="font-montserrat text-2xl font-bold text-black mr-2">
              {paymentPlan === "monthly"
                ? `€${totals.price} / month`
                : `€${totals.price}`}
            </p>
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="flex items-center gap-2 bg-secondary rounded-xl px-5 py-2 font-jura font-semibold disabled:opacity-70"
            >
              {isLoading ? "Processing..." : "Purchase"}
              <CartIcon />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SmallSubscriptionTab;
