"use client";

import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useEffect } from "react";
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";
import React, { useState } from "react";
import { useStripe, useElements } from "@stripe/react-stripe-js";
import { PaymentElement } from "@stripe/react-stripe-js";
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import CheckoutForm from "./CheckoutForm";

interface ModalProps {
    isModalOpen: boolean;
    setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
    amount: number;
    onConfirm: () => void;
    onCancel?: () => void;
}

const PaymentModal = ({
    isModalOpen,
    amount,
    setIsModalOpen,
    onConfirm,
    onCancel,
}: ModalProps) => {
    const [clientSecret, setClientSecret] = useState('');
    const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!);

    useEffect(() => {
        fetch('/api/stripe/create-payment-intent', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ amount: convertToSubcurrency(amount, 100) }),
        }).then(res => res.json()).then(data => {
            setClientSecret(data.clientSecret);
        });
    }, [amount]);

    return (
        <Transition appear show={isModalOpen} as={Fragment}>
            <Dialog
                as="div"
                className="relative z-50"
                onClose={() => setIsModalOpen(false)}
            >
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-neutral-focus bg-opacity-50 bg-gray-600" />
                </Transition.Child>
                <div className="fixed inset-0 overflow-y-auto">
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 scale-95"
                            enterTo="opacity-100 scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 scale-100"
                            leaveTo="opacity-0 scale-95"
                        >
                            <Dialog.Panel className="flex flex-col items-center relative w-[700px] py-6 bg-white rounded-xl shadow-lg gap-[20px]">
                                <Dialog.Title className="text-xl font-semibold">
                                    Subscribe to Premium
                                </Dialog.Title>
                                <Elements stripe={stripePromise} options={{
                                    mode: 'subscription',
                                    amount: convertToSubcurrency(amount, 100),
                                    currency: 'eur',
                                }}>
                                    <CheckoutForm
                                        onConfirm={onConfirm}
                                        onCancel={() => setIsModalOpen(false)}
                                        amount={amount}
                                    />
                                </Elements>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </div>
            </Dialog>
        </Transition>
    );
};

export default PaymentModal;