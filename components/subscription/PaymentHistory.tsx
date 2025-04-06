import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';
import CheckMark from '../svgs/CheckMarkPurple.svg'
import { Transaction } from '@/libs/definitions';

interface PaymentHistoryProps {
  transactions: Transaction[];
}

function PaymentHistory({ transactions }: PaymentHistoryProps) {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    // const paymentData = [
    //     { id: '0323353838', date: '02/27/2025 13:59', amount: 54.00, status: 'Paid', type: 'Credit' },
    //     { id: '0323353839', date: '02/26/2025 09:30', amount: 29.99, status: 'Paid', type: 'Debit' },
    //     { id: '0323353840', date: '02/25/2025 15:45', amount: 149.99, status: 'Paid', type: 'Credit' },
    //     { id: '0323353841', date: '02/24/2025 11:20', amount: 79.99, status: 'Paid', type: 'Credit' },
    //     { id: '0323353842', date: '02/23/2025 16:15', amount: 39.99, status: 'Paid', type: 'Debit' },
    //     { id: '0323353843', date: '02/22/2025 14:10', amount: 89.99, status: 'Paid', type: 'Credit' },
    //     { id: '0323353844', date: '02/21/2025 10:05', amount: 199.99, status: 'Paid', type: 'Credit' },
    //     { id: '0323353845', date: '02/20/2025 17:30', amount: 44.99, status: 'Paid', type: 'Debit' },
    //     { id: '0323353846', date: '02/19/2025 12:45', amount: 69.99, status: 'Paid', type: 'Credit' },
    //     { id: '0323353847', date: '02/18/2025 08:20', amount: 159.99, status: 'Paid', type: 'Credit' },
    // ];

    const sortedTransactions = [...transactions].sort((a, b) => {
        const dateA = new Date(a.created_at).getTime();
        const dateB = new Date(b.created_at).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    })

    const formatDate = (dateString: string) => {
        const date = new Date(dateString);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}`;
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
            <table className="w-full">
                <thead>
                    <tr className="border-b font-jura font-semibold text-[18px]">
                        <th className="text-left py-4">Date / Time</th>
                        <th className="text-left py-4">Amount</th>
                        <th className="text-left py-4">Status</th>
                        <th className="text-left py-4">Type</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedTransactions.map((transaction) => (
                        <tr key={transaction.id} className="border-b font-jura font-semibold text-[14px]">
                            <td>{formatDate(transaction.created_at)}</td>
                            <td>$ {parseFloat(transaction.amount).toFixed(2)}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    Paid
                                    <Image src={CheckMark} alt="CheckMark" className="w-5 h-5 text-blue-600" />
                                </div>
                            </td>
                            <td>{(transaction.description?.split("via")[0] || 'Credit Purchase').trim()}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentHistory