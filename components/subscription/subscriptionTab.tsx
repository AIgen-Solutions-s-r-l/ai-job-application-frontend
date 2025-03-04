import React, { useState, useEffect } from 'react';
import Credits from '../svgs/Credits.svg';
import Image from 'next/image';
import SliderInput from './sliderInput';
import Arrow from '../svgs/ArrowPurple.svg';
import MasterCard from '../svgs/MasterCard.svg';
import ThreeWayToggleSwitch from '../common/ThreeWayToggleSwitch';
import Cart from '../svgs/Cart.svg';
import { getUserInfo, addCredits } from '@/libs/api/auth';
import { useRouter, useSearchParams } from 'next/navigation';
import { toast } from 'react-hot-toast';

function SubscriptionTab() {
    const [sliderValue, setSliderValue] = useState(0);
    const [currentApplications, setCurrentApplications] = useState(300);
    const pricePerApplication = 0.02;
    const [paymentPlan, setPaymentPlan] = useState<'monthly' | 'yearly' | 'onetime'>('monthly');
    const [isLoading, setIsLoading] = useState(false);
    const [isProcessingPayment, setIsProcessingPayment] = useState(false);
    const searchParams = useSearchParams();
    const router = useRouter();

    const values = [
        { value: '100' },
        { value: '300' },
        { value: '500' },
        { value: '700' },
        { value: '1000' }
    ];

    useEffect(() => {
        // Handle transaction success or failure status
        const success = searchParams.get('success');
        const credits = searchParams.get('credits');
        const sessionId = searchParams.get('session_id');
        
        // Prevent processing the payment more than once
        if (success && !isProcessingPayment) {
            setIsProcessingPayment(true);
            
            if (success === 'true' && sessionId && credits) {
                // Add credits to user account and update local state
                const creditsAmount = parseInt(credits);
                
                // Call the API to add credits
                addCredits(
                    creditsAmount,
                    sessionId,
                    `Added ${creditsAmount} applications via Stripe payment`
                )
                .then(() => {
                    // Update local applications count
                    setCurrentApplications(prev => prev + creditsAmount);
                    
                    // Show success message
                    toast.success(`Payment successful! ${creditsAmount} applications have been added to your account.`);
                })
                .catch(error => {
                    console.error("Failed to add credits:", error);
                    toast.error("Payment was successful, but we couldn't update your balance. Please contact support.");
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
    
    // Function to clean URL parameters
    const cleanUrlParams = () => {
        const url = new URL(window.location.href);
        url.searchParams.delete('success');
        url.searchParams.delete('credits');
        url.searchParams.delete('session_id');
        router.replace(url.pathname);
        setIsProcessingPayment(false);
    };

    const getSavingsPercentage = () => {
        switch (paymentPlan) {
            case 'monthly':
                return 0.20;
            case 'yearly':
                return 0.35;
            case 'onetime':
                return 0;
        }
    };

    const calculateTotal = () => {
        const newApplications = parseInt(values[sliderValue].value);
        const totalApplications = currentApplications + newApplications;
        const basePrice = newApplications * pricePerApplication;
        const priceWithSavings = basePrice * (1 - getSavingsPercentage());

        return {
            totalApplications,
            price: priceWithSavings.toFixed(2)
        };
    };

    
    const handlePurchase = async () => {
        setIsLoading(true);
        try {
            // 1. Get the list of Stripe prices from your API
            const res = await fetch("/api/stripe/prices");
            if (!res.ok) {
                throw new Error("Could not retrieve Stripe prices.");
            }
            const data = await res.json();
            const stripePrices = data.data; // Array of Price objects

            // 2. Determine the combination of applications and plan
            const numberOfApps = values[sliderValue].value; // For example, "100", "300", etc.
            let planLabel = "";
            switch (paymentPlan) {
                case "monthly":
                    planLabel = "monthly";
                    break;
                case "yearly":
                    planLabel = "yearly";
                    break;
                default:
                    planLabel = "one-time payment";
            }

            // 3. Search the price list for a match with the desired combination
            //    Assuming that in Stripe the product name is something like "100 Applications - Monthly"
            const matchedPrice = stripePrices.find((price: any) => {
                if (!price.product || typeof price.product !== "object") return false;
                const productName = price.product.name.toLowerCase();
                return (
                    productName.includes(numberOfApps) && 
                    productName.includes(planLabel)
                );
            });

            if (!matchedPrice) {
                throw new Error(`Could not find a price for ${numberOfApps} applications with ${planLabel} plan`);
            }

            // 4. Get user info (id and email) to pass to Checkout
            const userInfo = await getUserInfo();
            const mode = paymentPlan === "onetime" ? "payment" : "subscription";

            // 5. Create Checkout session with the dynamic price found
            const response = await fetch("/api/stripe/create-checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    priceId: matchedPrice.id, // Here we use the dynamic ID
                    mode,
                    successUrl:
                        window.location.origin +
                        `/dashboard/subscription?success=true&credits=${numberOfApps}&session_id={CHECKOUT_SESSION_ID}`,
                    cancelUrl: window.location.origin + "/dashboard/subscription?success=false",
                    userId: userInfo.id,
                    userEmail: userInfo.email,
                }),
            });

            const checkoutData = await response.json();
            if (!response.ok || !checkoutData.url) {
                throw new Error(checkoutData.error || "Could not create Checkout session.");
            }

            // 6. Redirect the user to Stripe checkout
            window.location.assign(checkoutData.url);
        } catch (error: any) {
            console.error("Error:", error);
            toast.error("Could not initiate payment process. Please try again later.");
        } finally {
            setIsLoading(false);
        }
    };

    const totals = calculateTotal();

    return (
        <div className='flex flex-col gap-8 px-12 py-8 bg-white'>
            {/* We could add a visual alert here based on URL parameters */}
            
            <div className='flex items-center gap-6'>
                <div className='font-montserrat font-semibold text-[20px]'>
                    Job Applications
                </div>
                <div className='flex items-center bg-primary-deep-purple font-jura text-white gap-6 pl-2 pr-5 py-[6px] rounded-full'>
                    <Image src={Credits} alt='credits' />
                    <span className='font-jura font-normal text-[16px]'>
                        {currentApplications} Applications
                    </span>
                </div>
            </div>
            <div className=' flex flex-col gap-4'>
                <p className='font-jura font-semibold text-[16px]'>
                    Add Applications
                </p>
                <SliderInput values={values} sliderValue={sliderValue} setSliderValue={setSliderValue} />
                <p className='font-jura font-normal text-[14px] text-my-neutral-5'>1 Application = 0.020 $</p>
            </div>
            <div className='flex flex-col justify-between'>
                <p className='font-jura font-normal text-[16px] text-black'>
                    Adding
                </p>
                <div className='flex gap-5 font-montserrat font-semibold text-[28px]'>
                    <div className='relative after:content-["Applications\A+_adding_to_your_current\A_300_applications"] after:whitespace-pre after:w-[200px] after:block after:absolute after:text-[14px] after:font-normal after:text-my-neutral-4'>
                        {values[sliderValue].value}
                    </div>
                    <Image src={Arrow} alt='arrow' />
                    <div className='relative after:content-["Applications"] after:whitespace-pre after:w-[200px] after:block after:absolute after:text-[14px] after:font-normal after:text-my-neutral-4'>
                        {totals.totalApplications}
                    </div>
                    <Image src={Arrow} alt='arrow' />
                    <div
                        className='relative after:content-[attr(data-savings)] after:whitespace-pre after:w-[200px] after:block after:absolute after:text-[14px] after:font-normal after:text-my-neutral-4'
                        data-savings={`*Saving ${getSavingsPercentage() * 100}%`}
                    >
                        ${totals.price} / month
                    </div>
                </div>
            </div>
            <div className="mt-[60px] flex items-center gap-[50px]">
                <ThreeWayToggleSwitch
                    value={paymentPlan}
                    onChange={setPaymentPlan}
                />
                <button
                    onClick={handlePurchase}
                    disabled={isLoading}
                    className='flex items-center gap-10 text-black font-jura font-semibold text-[18px] px-5 py-2 leading-[110%] tracking-[-0.396px] rounded-5px border border-my-neutral-3 bg-my-neutral-2 rounded-2xl disabled:opacity-70'
                >
                    {isLoading ? (
                        <>
                            <span className="loading loading-spinner loading-sm"></span>
                            Processing...
                        </>
                    ) : (
                        <>
                            Purchase
                            <Image src={Cart} alt='cart' />
                        </>
                    )}
                </button>
            </div>

            {/* <PaymentModal
                isModalOpen={isPaymentModalOpen}
                setIsModalOpen={setIsPaymentModalOpen}
                onConfirm={() => setIsPaymentModalOpen(false)}
                amount={Number(totals.price)}
            /> */}

            <div className='w-full h-[1px] bg-my-neutral-2' />
            <div className='flex flex-col gap-4'>
                <p className='font-montserrat font-semibold text-[20px] text-black mb-2'>
                    Billing and Subscription
                </p>
                <div>
                    <p className='font-jura font-semibold text-[18px] text-black'>
                        Next Renewal
                    </p>
                    <p className='flex items-center gap-2 font-jura font-semibold text-[16px] text-black'>
                        Your subscription will be renewed on:
                        <span className='font-montserrat font-semibold text-[20px] text-black'>
                            01 March 2025
                        </span>
                    </p>
                </div>
                <div className='flex  justify-between w-[882px] h-[171px] flex-shrink-0 rounded-[12px] border border-my-neutral-3 py-4 px-6'>
                    <div className='flex gap-2 flex-col justify-between h-full'>
                        <p className='font-jura font-semibold text-[18px] text-black leading-[110%] tracking-[-0.396px]'>
                            Credit Card Information
                        </p>
                        <div className='flex gap-3 flex-col'>
                            <div className='flex items-center gap-2'>
                                <Image src={MasterCard} alt='mastercard' />
                                <p className='text-black font-montserrat font-semibold text-[20px] leading-[110%]'>
                                    **** **** **** 9201
                                </p>
                            </div>
                            <p className='text-black font-jura font-semibold text-[14px] leading-[120%] tracking-[-0.308px]'>
                                *Expires on: 08/28
                            </p>
                        </div>
                        <button className='w-[150px] text-black font-jura font-semibold text-[16px] underline decoration-1 decoration-black decoration-4 decoration-from-font'>
                            Change Payment
                        </button>
                    </div>
                    <div className='flex gap-4 flex-col h-full'>
                        <p className='text-black font-jura font-semibold text-[18px] leading-[110%] tracking-[-0.396px]'>
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