import React, { useState, useEffect } from 'react';
import Credits from '../svgs/Credits.svg';
import Image from 'next/image';
import SliderInput from './sliderInput';
import Arrow from '../svgs/ArrowPurple.svg';
import MasterCard from '../svgs/MasterCard.svg';
import TwoWayToggleSwitch from '../common/TwoWayToggleSwitch'; // <-- updated import
import Cart from '../svgs/Cart.svg';
import { getUserInfo, addCredits } from '@/libs/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

function SubscriptionTab() {
  const [sliderValue, setSliderValue] = useState(0);
  const [currentApplications, setCurrentApplications] = useState(300);
  const pricePerApplication = 0.02;
  // Only two plans now: 'monthly' or 'onetime'
  const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'onetime'>('monthly');
  const [isLoading, setIsLoading] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);

  const searchParams = useSearchParams();
  const router = useRouter();

  // The 5 slider steps
  const values = [
    { value: '100' },
    { value: '300' },
    { value: '500' },
    { value: '700' },
    { value: '1000' },
  ];

  useEffect(() => {
    // Handle transaction success or failure status from Stripe
    const success = searchParams.get('success');
    const credits = searchParams.get('credits');
    const sessionId = searchParams.get('session_id');

    if (success && !isProcessingPayment) {
      setIsProcessingPayment(true);

      if (success === 'true' && sessionId && credits) {
        // Add credits to user account and update local state
        const creditsAmount = parseInt(credits);

        addCredits(
          creditsAmount,
          sessionId,
          `Added ${creditsAmount} applications via Stripe payment`
        )
          .then(() => {
            // Update local applications count
            setCurrentApplications((prev) => prev + creditsAmount);
            toast.success(
              `Payment successful! ${creditsAmount} applications have been added to your account.`
            );
          })
          .catch((error) => {
            console.error('Failed to add credits:', error);
            toast.error(
              "Payment was successful, but we couldn't update your balance. Please contact support."
            );
          })
          .finally(() => {
            // Clean URL parameters
            cleanUrlParams();
          });
      } else if (success === 'false') {
        toast.error('Payment process was cancelled or could not be completed.');
        cleanUrlParams();
      }
    }
  }, [searchParams, isProcessingPayment]);

  // Remove URL parameters after processing
  const cleanUrlParams = () => {
    const url = new URL(window.location.href);
    url.searchParams.delete('success');
    url.searchParams.delete('credits');
    url.searchParams.delete('session_id');
    router.replace(url.pathname);
    setIsProcessingPayment(false);
  };

  // 20% discount for monthly, 0% discount for one-time
  const getSavingsPercentage = () => {
    return paymentPlan === 'monthly' ? 0.2 : 0;
  };

  // Calculate total cost for new credits
  const calculateTotal = () => {
    const newApplications = parseInt(values[sliderValue].value);
    const totalApplications = currentApplications + newApplications;
    const basePrice = newApplications * pricePerApplication;
    const discountedPrice = basePrice * (1 - getSavingsPercentage());

    return {
      totalApplications,
      price: discountedPrice.toFixed(2),
    };
  };

  const handlePurchase = async () => {
    setIsLoading(true);
    try {
      // 1. Get the list of Stripe prices from your API
      const res = await fetch('/api/stripe/prices');
      if (!res.ok) {
        throw new Error('Could not retrieve Stripe prices.');
      }
      const data = await res.json();
      const stripePrices = data.data; // Array of Price objects

      // 2. Determine the combination of applications and plan
      const numberOfApps = values[sliderValue].value;
      const planLabel = paymentPlan === 'monthly' ? 'monthly' : 'one-time payment';

      // 3. Find the matching price in the list
      const matchedPrice = stripePrices.find((price: any) => {
        if (!price.product || typeof price.product !== 'object') return false;
        const productName = price.product.name.toLowerCase();
        return (
          productName.includes(numberOfApps) &&
          productName.includes(planLabel)
        );
      });

      if (!matchedPrice) {
        throw new Error(
          `Could not find a price for ${numberOfApps} applications with ${planLabel} plan`
        );
      }

      // 4. Get user info (id and email) to pass to Checkout
      const userInfo = await getUserInfo();
      const mode = paymentPlan === 'onetime' ? 'payment' : 'subscription';

      // 5. Create the Checkout session with the matching price
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          priceId: matchedPrice.id,
          mode,
          successUrl:
            window.location.origin +
            `/dashboard/subscription?success=true&credits=${numberOfApps}&session_id={CHECKOUT_SESSION_ID}`,
          cancelUrl:
            window.location.origin + '/dashboard/subscription?success=false',
          userId: userInfo.id,
          userEmail: userInfo.email,
        }),
      });

      const checkoutData = await response.json();
      if (!response.ok || !checkoutData.url) {
        throw new Error(checkoutData.error || 'Could not create Checkout session.');
      }

      // 6. Redirect user to Stripe Checkout
      window.location.assign(checkoutData.url);
    } catch (error: any) {
      console.error('Error:', error);
      toast.error('Could not initiate payment process. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  const totals = calculateTotal();

  return (
    <div className="flex flex-col gap-8 px-12 py-8 bg-white">
      {/* Header */}
      <div className="flex items-center gap-6">
        <div className="font-montserrat font-semibold text-[20px]">
          Job Applications
        </div>
        <div className="flex items-center bg-primary-deep-purple font-jura text-white gap-6 pl-2 pr-5 py-[6px] rounded-full">
          <Image src={Credits} alt="credits" />
          <span className="font-jura font-normal text-[16px]">
            {currentApplications} Applications
          </span>
        </div>
      </div>

      {/* Slider */}
      <div className="flex flex-col gap-4">
        <p className="font-jura font-semibold text-[16px]">Add Applications</p>
        <SliderInput
          values={values}
          sliderValue={sliderValue}
          setSliderValue={setSliderValue}
        />
        <p className="font-jura font-normal text-[14px] text-my-neutral-5">
          1 Application = $0.020
        </p>
      </div>

      {/* Display total */}
      <div className="flex flex-col justify-between">
        <p className="font-jura font-normal text-[16px] text-black">Adding</p>
        <div className="flex gap-5 font-montserrat font-semibold text-[28px]">
          <div className="relative after:content-['Applications'] after:whitespace-pre after:w-[200px] after:block after:absolute after:text-[14px] after:font-normal after:text-my-neutral-4">
            {values[sliderValue].value}
          </div>
          <Image src={Arrow} alt="arrow" />
          <div className="relative after:content-['Applications'] after:whitespace-pre after:w-[200px] after:block after:absolute after:text-[14px] after:font-normal after:text-my-neutral-4">
            {totals.totalApplications}
          </div>
          <Image src={Arrow} alt="arrow" />
          <div className="relative">
            {paymentPlan === 'monthly'
              ? `$${totals.price} / month`
              : `$${totals.price} (one-time)`}
            {paymentPlan === 'monthly' && (
              <span className="block text-[14px] font-normal text-my-neutral-4">
                *Saving {getSavingsPercentage() * 100}%
              </span>
            )}
          </div>
        </div>
      </div>

      {/* Toggle & Purchase button */}
      <div className="mt-[60px] flex items-center gap-[50px]">
        <TwoWayToggleSwitch value={paymentPlan} onChange={setPaymentPlan} />
        <button
          onClick={handlePurchase}
          disabled={isLoading}
          className="flex items-center gap-10 text-black font-jura font-semibold text-[18px] px-5 py-2 leading-[110%] tracking-[-0.396px] border border-my-neutral-3 bg-my-neutral-2 rounded-2xl disabled:opacity-70"
        >
          {isLoading ? (
            <>
              <span className="loading loading-spinner loading-sm"></span>
              Processing...
            </>
          ) : (
            <>
              Purchase
              <Image src={Cart} alt="cart" />
            </>
          )}
        </button>
      </div>

      <div className="w-full h-[1px] bg-my-neutral-2" />

      {/* Billing info */}
      <div className="flex flex-col gap-4">
        <p className="font-montserrat font-semibold text-[20px] text-black mb-2">
          Billing and Subscription
        </p>
        <div>
          <p className="font-jura font-semibold text-[18px] text-black">
            Next Renewal
          </p>
          <p className="flex items-center gap-2 font-jura font-semibold text-[16px] text-black">
            Your subscription will be renewed on:
            <span className="font-montserrat font-semibold text-[20px] text-black">
              01 March 2025
            </span>
          </p>
        </div>
        <div className="flex justify-between w-[882px] h-[171px] flex-shrink-0 rounded-[12px] border border-my-neutral-3 py-4 px-6">
          <div className="flex gap-2 flex-col justify-between h-full">
            <p className="font-jura font-semibold text-[18px] text-black leading-[110%] tracking-[-0.396px]">
              Credit Card Information
            </p>
            <div className="flex gap-3 flex-col">
              <div className="flex items-center gap-2">
                <Image src={MasterCard} alt="mastercard" />
                <p className="text-black font-montserrat font-semibold text-[20px] leading-[110%]">
                  **** **** **** 9201
                </p>
              </div>
              <p className="text-black font-jura font-semibold text-[14px] leading-[120%] tracking-[-0.308px]">
                *Expires on: 08/28
              </p>
            </div>
            <button className="w-[150px] text-black font-jura font-semibold text-[16px] underline decoration-1 decoration-black decoration-4 decoration-from-font">
              Change Payment
            </button>
          </div>
          <div className="flex gap-4 flex-col h-full">
            <p className="text-black font-jura font-semibold text-[18px] leading-[110%] tracking-[-0.396px]">
              Billing Details
            </p>
            <p className="text-black font-jura font-semibold text-base leading-[120%] tracking-[-0.352px]">
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