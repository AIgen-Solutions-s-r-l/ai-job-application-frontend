import { useState } from 'react';
import { toast } from 'react-hot-toast';
import { getUserInfo } from '@/libs/api/auth';
import config from '@/config';

interface UseSubscriptionProps {
  fromSearch?: boolean;
}

export function useSubscription({ fromSearch = false }: UseSubscriptionProps = {}) {
  // Default at index 2 (500 credits)
  const [sliderValue, setSliderValue] = useState(2);
  // Payment plan: 'monthly' (20% off) or 'onetime' (no discount)
  const [paymentPlan, setPaymentPlan] = useState<"monthly" | "onetime">("monthly");
  const [isLoading, setIsLoading] = useState(false);

  // Slider steps
  const values = [
    { value: "50" },
    { value: "100" },
    { value: "200" },
    { value: "300" },
    { value: "500" },
  ];

  // Utilizando la configuración de precios desde config.ts
  const pricing = config.stripe.pricing;

  // Calculate cost based on slider
  const calculateTotal = (currentApplications: number) => {
    const newApplications = parseInt(values[sliderValue].value);
    const priceType = paymentPlan === "monthly" ? "monthly" : "onetime";
    const price = pricing[priceType][newApplications.toString()].amount;

    return {
      newApplications,
      price: price.toFixed(2),
      totalApplications: currentApplications + newApplications,
    };
  };

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

      // Store the current URL if coming from search
      if (fromSearch) {
        localStorage.setItem('creditsPurchaseReturnUrl', window.location.href);
      }

      // Create checkout session
      const response = await fetch("/api/stripe/create-checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priceId,
          mode,
          successUrl:
            window.location.origin +
            `/dashboard/subscription?success=true&credits=${numberOfApps}&session_id={CHECKOUT_SESSION_ID}${fromSearch ? '&from=search' : ''}`,
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

  return {
    sliderValue,
    setSliderValue,
    paymentPlan,
    setPaymentPlan,
    isLoading,
    values,
    calculateTotal,
    getPricePerApplication,
    handlePurchase,
  };
}