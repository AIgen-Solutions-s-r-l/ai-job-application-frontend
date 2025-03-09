import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-hot-toast";

// Icons and images
import Cart from "../svgs/Cart.svg";
import MasterCard from "../svgs/MasterCard.svg";

// Components
import SliderInput from "./sliderInput";
import TwoWayToggleSwitch from "../common/TwoWayToggleSwitch";

// Auth / API logic
import { getUserInfo, addCredits } from "@/libs/api/auth";

function SubscriptionTab() {
  const [sliderValue, setSliderValue] = useState(2); // Default at index 2 (500 credits)
  const [currentApplications, setCurrentApplications] = useState(300);

  // Payment plan: 'monthly' (20% off) or 'onetime' (no discount)
  const [paymentPlan, setPaymentPlan] = useState<"monthly" | "onetime">("monthly");
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  // Next.js utilities
  const router = useRouter();
  const searchParams = useSearchParams();

  // Price per application
  const pricePerApplication = 0.02;

  // Slider steps
  const values = [
    { value: "100" },
    { value: "300" },
    { value: "500" },
    { value: "700" },
    { value: "1000" },
  ];

  // Añadimos un estado para rastrear las transacciones ya procesadas
  const [processedTransactions, setProcessedTransactions] = useState<Set<string>>(new Set());

  // Check Stripe checkout result
  useEffect(() => {
    const success = searchParams.get("success");
    const credits = searchParams.get("credits");
    const sessionId = searchParams.get("session_id");

    // Evitar procesar si no hay parámetros o si ya se está procesando
    if (!success || !credits || !sessionId || isProcessingPayment) {
      return;
    }
    
    // Verificar si esta transacción ya fue procesada para evitar duplicados
    if (processedTransactions.has(sessionId)) {
      // Ya procesamos esta transacción, solo limpiamos la URL
      cleanUrlParams();
      return;
    }

    setIsProcessingPayment(true);

    if (success === "true") {
      const creditsAmount = parseInt(credits);
      
      // Registrar esta transacción como procesada
      setProcessedTransactions(prev => new Set(prev).add(sessionId));
      
      addCredits(
        creditsAmount,
        sessionId,
        `Added ${creditsAmount} applications via Stripe payment`
      )
        .then(() => {
          setCurrentApplications((prev) => prev + creditsAmount);
          toast.success(
            `Payment successful! ${creditsAmount} applications have been added to your account.`,
            { id: `payment-success-${sessionId}` } // ID único para el toast
          );
        })
        .catch((error) => {
          console.error("Failed to add credits:", error);
          toast.error(
            "Payment was successful, but we couldn't update your balance. Please contact support.",
            { id: `payment-error-${sessionId}` } // ID único para el toast
          );
        })
        .finally(() => {
          cleanUrlParams();
          setTimeout(() => {
            setIsProcessingPayment(false);
          }, 1000);
        });
    } else if (success === "false") {
      toast.error("Payment process was cancelled or could not be completed.", 
        { id: "payment-cancelled" });
      cleanUrlParams();
      setIsProcessingPayment(false);
    }
  }, [searchParams, processedTransactions]);

  // Clean URL params - mejorado para ser más robusto
  const cleanUrlParams = () => {
    if (typeof window !== 'undefined') {
      const url = new URL(window.location.href);
      url.searchParams.delete("success");
      url.searchParams.delete("credits");
      url.searchParams.delete("session_id");
      
      // Usar replace state directamente para evitar problemas con router.replace
      window.history.replaceState({}, document.title, url.pathname);
    }
  };

  // 20% discount for monthly, 0% for one-time
  const getSavingsPercentage = () => (paymentPlan === "monthly" ? 0.2 : 0);

  // Calculate cost based on slider
  const calculateTotal = () => {
    const newApplications = parseInt(values[sliderValue].value);
    const basePrice = newApplications * pricePerApplication;
    const discountedPrice = basePrice * (1 - getSavingsPercentage());

    return {
      newApplications,
      price: discountedPrice.toFixed(2),
      totalApplications: currentApplications + newApplications,
    };
  };

  const totals = calculateTotal();

  // Handle purchase
  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // 1. Fetch Stripe prices
      const res = await fetch("/api/stripe/prices");
      if (!res.ok) {
        throw new Error("Could not retrieve Stripe prices.");
      }
      const data = await res.json();
      const stripePrices = data.data; // array of Price objects

      // 2. Determine the credits and plan type from your UI
      const numberOfApps = values[sliderValue].value; // e.g. "100", "300", "500", etc.
      // We'll match your monthly => "subscription" and onetime => "one_time"
      const planType = paymentPlan === "monthly" ? "subscription" : "one_time";

      // 3. Find the matching price by metadata instead of product name
      const matchedPrice = stripePrices.find((price: any) => {
        if (!price.metadata) return false;
        return (
          price.metadata.credits === numberOfApps &&
          price.metadata.price_type === planType
        );
      });

      if (!matchedPrice) {
        throw new Error(
          `No matching price found for ${numberOfApps} credits with planType='${planType}'.`
        );
      }

      // 4. Get user info
      const userInfo = await getUserInfo();
      // Convert planType => Stripe mode
      // "subscription" => "subscription", "one_time" => "payment"
      const mode = planType === "subscription" ? "subscription" : "payment";

      // 5. Create checkout session
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId: matchedPrice.id,
          mode,
          successUrl:
            window.location.origin +
            `/dashboard/subscription?success=true&credits=${numberOfApps}&session_id={CHECKOUT_SESSION_ID}`,
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

      // 6. Redirect user to Stripe
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
          <div className="bg-green-100 text-green-600 font-jura text-sm px-2 py-1 rounded-full">
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
            1 Credit = $0.02 <br />
            1 Credit = 1 Job Application
          </div>

          {/* Right: Price & Purchase */}
          <div className="flex flex-col items-start md:items-end gap-2">
            <p className="font-montserrat text-2xl font-bold text-black">
              {paymentPlan === "monthly"
                ? `$${totals.price} / mo`
                : `$${totals.price} (one-time)`}
            </p>
            <button
              onClick={handlePurchase}
              disabled={isLoading}
              className="flex items-center gap-2 bg-secondary rounded-xl px-5 py-2 font-jura font-semibold disabled:opacity-70"
            >
              {isLoading ? "Processing..." : "Purchase"}
              <Image src={Cart} alt="cart" />
            </button>
          </div>
        </div>
      </div>

      {/* Billing & Subscription */}
      <div className="border border-my-neutral-3 rounded-lg p-5 flex flex-col gap-4">
        <h3 className="font-montserrat text-xl font-semibold text-black">
          Billing and Subscription
        </h3>
        <div className="flex items-center gap-2">
          <p className="font-jura text-base font-semibold text-black">
            Next Renewal:
          </p>
          <p className="font-jura text-base text-black">
            01 March 2025
          </p>
        </div>

        {/* Card info + Billing details side by side */}
        <div className="flex flex-col md:flex-row gap-6 w-full mt-2">
          {/* Card info box */}
          <div className="border border-my-neutral-3 rounded-lg p-4 flex-1 flex flex-col gap-3">
            <p className="font-jura font-semibold text-base text-black">
              Credit Card Information
            </p>
            <div className="flex items-center gap-2">
              <Image src={MasterCard} alt="mastercard" />
              <p className="text-black font-montserrat font-semibold text-lg">
                **** **** **** 9201
              </p>
            </div>
            <p className="text-black font-jura text-sm">
              *Expires on: 08/28
            </p>
            <button className="text-primary-deep-purple underline text-sm w-fit">
              Change Payment
            </button>
          </div>

          {/* Billing details box */}
          <div className="border border-my-neutral-3 rounded-lg p-4 flex-1 flex flex-col gap-3">
            <p className="font-jura font-semibold text-base text-black">
              Billing Details
            </p>
            <p className="text-black font-jura text-sm">
              Marco Rossi <br />
              Via Giusepe Zorzi, 22, 25138, Verona, IT
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default SubscriptionTab;
