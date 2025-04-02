import React, { useState } from "react";
import { toast } from "react-hot-toast";

// Icons and images
import { CartIcon } from "@/components/AppIcons";

// Components
import TwoWayToggleSwitch from "../common/TwoWayToggleSwitch";

// Auth / API logic
import { getUserInfo } from "@/libs/api/auth";

// Importamos la configuración central
import config from "@/config";
import SliderInput from "../subscription/sliderInput";

function SmallSubscriptionTab() {
  const [sliderValue, setSliderValue] = useState(2); // Default at index 2 (500 credits)
  const [currentApplications] = useState(300);

  // Payment plan: 'monthly' (20% off) or 'onetime' (no discount)
  const [paymentPlan, setPaymentPlan] = useState<"monthly" | "onetime">("monthly");
  const [isLoading, setIsLoading] = useState(false);

  // Slider steps
  const values = [
    { value: "100" },
    { value: "200" },
    { value: "300" },
    { value: "500" },
    { value: "1000" },
  ];

  // Utilizando la configuración de precios desde config.ts
  const pricing = config.stripe.pricing;



  // Calculate cost based on slider
  const calculateTotal = () => {
    const newApplications = parseInt(values[sliderValue].value);
    const priceType = paymentPlan === "monthly" ? "monthly" : "onetime";
    const price = pricing[priceType][newApplications.toString()].amount;

    return {
      newApplications,
      price: price.toFixed(2),
      totalApplications: currentApplications + newApplications,
    };
  };

  const totals = calculateTotal();

  // Calculate price per application
  const getPricePerApplication = () => {
    const newApplications = parseInt(values[sliderValue].value);
    const priceType = paymentPlan === "monthly" ? "monthly" : "onetime";
    const price = pricing[priceType][newApplications.toString()].amount;

    return (price / newApplications).toFixed(2);
  };

  // Handle purchase
  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // Get user info
      const userInfo = await getUserInfo();

      // Determine the credits and plan type from your UI
      const numberOfApps = values[sliderValue].value;
      const planType = paymentPlan;

      // Get price ID based on selection
      const priceId = pricing[planType][numberOfApps].id;

      // Determine checkout mode
      const mode = planType === "monthly" ? "subscription" : "payment";

      // Create checkout session
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl:
            window.location.origin +
            `/dashboard/subscription?success=true&credits=${numberOfApps}&session_id={CHECKOUT_SESSION_ID}&from=search`,
          cancelUrl:
            window.location.origin + "/dashboard/subscription?success=false",
          userId: userInfo.id,
          userEmail: userInfo.email,
        }),
      });

      const checkoutData = await response.json();
      if (!response.ok || !checkoutData.url) {
        throw new Error(checkoutData.error || "Could not create Checkout session.");
      }

      // Redirect user to Stripe
      window.location.assign(checkoutData.url);
    } catch (error: any) {
      console.error("Error:", error);
      toast.error("Could not initiate payment process. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-xl flex flex-col gap-6">
      {/* Toggle row */}
      <div className="flex items-center gap-4">
        <TwoWayToggleSwitch value={paymentPlan} onChange={setPaymentPlan} />
        {paymentPlan === "monthly" && (
          <div className="pill bg-green-100 text-green-600 px-2 py-1">
            20% off
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
          />
          {/* "Current plan" label if 500 is selected */}
          {values[sliderValue].value === "500" && (
            <div className="text-primary-deep-purple text-sm font-semibold flex justify-center mt-2">
              Current plan
            </div>
          )}
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
            <p className="font-montserrat text-2xl font-bold text-black">
              {paymentPlan === "monthly"
                ? `€${totals.price} / mo`
                : `€${totals.price} (one-time)`}
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
