import { useState } from 'react';
import Image from 'next/image';
import CheckMark from '../svgs/CheckMarkPurple.svg'
import { Transaction } from '@/libs/definitions';
import { LaboroSmileyIcon } from '../AppIcons';
import { ChevronDownIcon, ChevronUpIcon } from '@heroicons/react/24/outline';

interface PaymentHistoryProps {
    transactions: Transaction[];
}

function PaymentHistory({ transactions }: PaymentHistoryProps) {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');
    const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set());

    // Make sure transactions is an array
    const transactionsArray = Array.isArray(transactions) ? transactions : [];

    // Filter transactions to show only relevant purchases (plan_purchase and one_time_purchase)
    const purchaseTransactions = transactionsArray.filter(transaction =>
        transaction.transaction_type === 'plan_purchase' ||
        transaction.transaction_type === 'one_time_purchase'
    );

    const sortedTransactions = [...purchaseTransactions].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    const toggleRow = (transactionId: number) => {
        const newExpandedRows = new Set(expandedRows);
        if (newExpandedRows.has(transactionId)) {
            newExpandedRows.delete(transactionId);
        } else {
            newExpandedRows.add(transactionId);
        }
        setExpandedRows(newExpandedRows);
    };

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
    };

    // Simplify transaction type names
    const getTransactionTypeName = (transaction: Transaction): string => {
        return transaction.transaction_type === 'plan_purchase'
            ? 'Subscription'
            : 'One-time Purchase';
    };

    // Function to determine transaction status and style
    // eslint-disable-next-line no-unused-vars
    const getTransactionStatus = (transaction: Transaction) => {
        return {
            label: 'Paid',
            showCheckmark: true
        };
    };

    // Function to get subscription badge when applicable
    const getSubscriptionBadge = (transaction: Transaction) => {
        if (transaction.transaction_type !== 'plan_purchase') {
            return null;
        }

        const isActive = transaction.is_subscription_active;
        return (
            <span className={`ml-2 px-2 py-0.5 text-xs rounded-full ${isActive
                ? 'bg-green-100 text-green-600'
                : 'bg-red-100 text-red-500'
                }`}>
                {isActive ? 'Active' : 'Inactive'}
            </span>
        );
    };

    // Función para formatear el importe monetario con su moneda
    const formatMonetaryAmount = (transaction: Transaction) => {
        if (!transaction.monetary_amount) return "—";

        const amount = parseFloat(transaction.monetary_amount);

        // Usar el formateador de moneda basado en la divisa
        return new Intl.NumberFormat('en-US', {
            style: 'currency',
            currency: 'EUR',
            minimumFractionDigits: 2
        }).format(amount);
    };

    return (
        <div className='flex flex-col gap-5 px-1 md:px-7 py-5 bg-white'>
            <div className='flex justify-end'>
                <div className="flex items-center gap-2 px-4">
                    <span className="font-jura text-sm">Sort by</span>
                    <button
                        onClick={() => setSortOrder('newest')}
                        className={`font-jura text-sm ${sortOrder === 'newest' ? 'font-bold' : ''}`}
                    >
                        Newest
                    </button>
                    <span>|</span>
                    <button
                        onClick={() => setSortOrder('oldest')}
                        className={`font-jura text-sm ${sortOrder === 'oldest' ? 'font-bold' : ''}`}
                    >
                        Oldest
                    </button>
                </div>
            </div>
            {sortedTransactions.length === 0 ? (
                <div className="text-center py-8 font-jura text-gray-500">
                    No purchase transactions found
                </div>
            ) : (
                <>
                    {/* Mobile View */}
                    <div className="md:hidden">
                        {sortedTransactions.map((transaction) => (
                            <div key={transaction.id} className="border-b">
                                <button
                                    onClick={() => toggleRow(transaction.id)}
                                    className="w-full flex justify-between items-center p-4"
                                >
                                    <div className="flex items-center gap-2">
                                        <span className="font-jura font-semibold">
                                            {getTransactionTypeName(transaction)}
                                        </span>
                                        {getSubscriptionBadge(transaction)}
                                        <span className="text-gray-600">
                                            {formatMonetaryAmount(transaction)}
                                        </span>
                                    </div>
                                    {expandedRows.has(transaction.id) ? (
                                        <ChevronUpIcon className="w-5 h-5" />
                                    ) : (
                                        <ChevronDownIcon className="w-5 h-5" />
                                    )}
                                </button>
                                {expandedRows.has(transaction.id) && (
                                    <div className="p-4 space-y-3 bg-gray-50">
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Status</span>
                                            <div className="flex items-center gap-2">
                                                Paid
                                                <Image src={CheckMark} alt="CheckMark" className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Credits</span>
                                            <div className="flex items-center gap-1">
                                                <LaboroSmileyIcon classname="w-4 h-4" />
                                                <span>{parseFloat(transaction.amount).toFixed(0)}</span>
                                            </div>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Amount</span>
                                            <span>{formatMonetaryAmount(transaction)}</span>
                                        </div>
                                        <div className="flex justify-between">
                                            <span className="text-gray-600">Date / Time</span>
                                            <span>{formatDate(transaction.created_at)}</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>

                    {/* Desktop View */}
                    <div className="hidden md:block overflow-x-auto">
                        <table className="w-full table-fixed">
                            <thead>
                                <tr className="border-b font-jura font-semibold text-[18px]">
                                    <th className="text-left py-4 w-[20%]">Type</th>
                                    <th className="text-left py-4 w-[15%]">Status</th>
                                    <th className="text-left py-4 w-[15%]">Credits</th>
                                    <th className="text-left py-4 w-[20%]">Amount</th>
                                    <th className="text-left py-4 w-[30%]">Date / Time</th>
                                </tr>
                            </thead>
                            <tbody>
                                {sortedTransactions.map((transaction) => (
                                    <tr key={transaction.id} className="border-b font-jura font-semibold text-[14px]">
                                        <td className="py-4">
                                            <div className="flex items-center">
                                                <span className='text-black'>
                                                    {getTransactionTypeName(transaction)}
                                                </span>
                                                {getSubscriptionBadge(transaction)}
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-2">
                                                Paid
                                                <Image src={CheckMark} alt="CheckMark" className="w-5 h-5 text-blue-600" />
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            <div className="flex items-center gap-1">
                                                <LaboroSmileyIcon classname="w-4 h-4" />
                                                <span>{parseFloat(transaction.amount).toFixed(0)}</span>
                                            </div>
                                        </td>
                                        <td className="py-4">
                                            {formatMonetaryAmount(transaction)}
                                        </td>
                                        <td className="py-4">{formatDate(transaction.created_at)}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </>
            )}
        </div>
    )
}

export default PaymentHistory