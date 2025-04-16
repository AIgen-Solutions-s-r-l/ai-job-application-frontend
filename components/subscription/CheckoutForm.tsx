/* eslint-disable no-unused-vars */
import convertToSubcurrency from "@/lib/convertToSubcurrency";
import { useStripe, useElements, PaymentElement } from "@stripe/react-stripe-js";
import { useEffect, useState } from "react";

interface CheckoutFormProps {
    onConfirm: () => void;
    onCancel: () => void;
    amount: number;
}

const CheckoutForm = ({ onConfirm, onCancel, amount }: CheckoutFormProps) => {
    const stripe = useStripe();
    const elements = useElements();
    const [error, setError] = useState<string | null>(null);
    const [processing, setProcessing] = useState(false);
    const [clientSecret, setClientSecret] = useState('');

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

    // const handleSubmit = async (event: React.FormEvent) => {
    //     event.preventDefault();

    //     if (!stripe || !elements) {
    //         return;
    //     }
    //     setProcessing(true);
    //     setError(null);

    //     const { error: submitError } = await elements.submit();
    //     if (submitError) {
    //         setError(submitError.message ?? 'An error occurred');
    //         setProcessing(false);
    //         return;
    //     }
    //     onConfirm();
    //     setProcessing(false);
    // };

    return (
        <form className="w-full px-6">
            <PaymentElement
            />
            {error && (
                <div className="text-red-500 mt-2 text-sm">
                    {error}
                </div>
            )}
            <div className="flex w-full justify-end gap-4 mt-6">
                <button
                    type="button"
                    className="btn"
                    onClick={onCancel}
                    disabled={processing}
                >
                    Cancel
                </button>
                <button
                    type="submit"
                    className="btn outline-black bg-primary hover:bg-primary hover:text-white"
                    disabled={!stripe || processing}
                >
                    {processing ? 'Processing...' : 'Subscribe'}
                </button>
            </div>
        </form>
    );
};

export default CheckoutForm; 