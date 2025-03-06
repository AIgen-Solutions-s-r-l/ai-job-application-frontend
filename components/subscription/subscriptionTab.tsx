import { useCallback, useEffect, useMemo, useState } from 'react';
import { useSidenavContext } from '@/contexts/sidenav-context';
import Credits from '../svgs/Credits.svg';
import Image from 'next/image';
import SliderInput from './sliderInput';
import Arrow from '../svgs/ArrowPurple.svg';
import MasterCard from '../svgs/MasterCard.svg';
import ThreeWayToggleSwitch from '../common/ThreeWayToggleSwitch';
import Cart from '../svgs/Cart.svg';
import { ApplicationsPill } from './ApplicationsPill';

const values = [
    { value: '100' },
    { value: '300' },
    { value: '500' },
    { value: '700' },
    { value: '1000' },
];

function SubscriptionTab() {
    const [sliderValue, setSliderValue] = useState(0);
    const currentApplications = 300;
    const pricePerApplication = 0.02;
    const [paymentPlan, setPaymentPlan] = useState<
    'monthly' | 'yearly' | 'onetime'
    >('monthly');
    const { setSlots } = useSidenavContext();

    const getSavingsPercentage = useCallback(() => {
    switch (paymentPlan) {
        case 'monthly':
        return 0.2;
        case 'yearly':
        return 0.35;
        case 'onetime':
        return 0;
    }
    }, []);

    const totals = useMemo(() => {
        const newApplications = parseInt(values[sliderValue].value);
        const totalApplications = currentApplications + newApplications;
        const basePrice = newApplications * pricePerApplication;
        const priceWithSavings = basePrice * (1 - getSavingsPercentage());

        return {
            totalApplications,
            price: priceWithSavings.toFixed(2),
        };
    }, [sliderValue]);

    useEffect(() => {
        // add ApplicationsPill to Sidenav
        setSlots((slots) => ({
            ...slots,
            JobApplications: <ApplicationsPill count={currentApplications} />,
        }));

        // remove addition menu from Sidenav on remove component
        return () =>
            setSlots((slots) => {
                const { JobApplications, ...oldSlots } = slots;
                return oldSlots;
            });
    }, [setSlots]);

    return (
        <div className='flex flex-col gap-8 px-12 py-8 bg-white'>
            <div className='flex items-center gap-6'>
                <div className='font-montserrat font-semibold text-[20px]'>
                    Job Applications
                </div>
                <ApplicationsPill count={currentApplications} />
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
                <button className='flex items-center gap-10 text-black font-jura font-semibold text-[18px] px-5 py-2 leading-[110%] tracking-[-0.396px] rounded-5px border border-my-neutral-3 bg-my-neutral-2 rounded-2xl'>
                    Purchase
                    <Image src={Cart} alt='arrow' />
                </button>
            </div>
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
