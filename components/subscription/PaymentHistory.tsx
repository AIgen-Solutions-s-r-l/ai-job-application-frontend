import { useState } from 'react';
import Image from 'next/image';
import CheckMark from '../svgs/CheckMarkPurple.svg'

function PaymentHistory() {
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    // DUMY DATA
    const paymentData = [
        { id: '0323353838', date: '02/27/2025 13:59', amount: 54.00, status: 'Paid', type: 'Credit' },
        { id: '0323353839', date: '02/26/2025 09:30', amount: 29.99, status: 'Paid', type: 'Debit' },
        { id: '0323353840', date: '02/25/2025 15:45', amount: 149.99, status: 'Paid', type: 'Credit' },
        { id: '0323353841', date: '02/24/2025 11:20', amount: 79.99, status: 'Paid', type: 'Credit' },
        { id: '0323353842', date: '02/23/2025 16:15', amount: 39.99, status: 'Paid', type: 'Debit' },
        { id: '0323353843', date: '02/22/2025 14:10', amount: 89.99, status: 'Paid', type: 'Credit' },
        { id: '0323353844', date: '02/21/2025 10:05', amount: 199.99, status: 'Paid', type: 'Credit' },
        { id: '0323353845', date: '02/20/2025 17:30', amount: 44.99, status: 'Paid', type: 'Debit' },
        { id: '0323353846', date: '02/19/2025 12:45', amount: 69.99, status: 'Paid', type: 'Credit' },
        { id: '0323353847', date: '02/18/2025 08:20', amount: 159.99, status: 'Paid', type: 'Credit' },
    ];

    const sortedPaymentData = [...paymentData].sort((a, b) => {
        const dateA = new Date(a.date).getTime();
        const dateB = new Date(b.date).getTime();
        return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
    });

    return (
        <div className='flex flex-col gap-5 px-7 py-5 bg-white'>
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
                        <th className="text-left py-4">Transaction #</th>
                        <th className="text-left py-4">Date / Time</th>
                        <th className="text-left py-4">Amount</th>
                        <th className="text-left py-4">Status</th>
                        <th className="text-left py-4">Type</th>
                        <th className="text-left py-4">Receipt</th>
                    </tr>
                </thead>
                <tbody>
                    {sortedPaymentData.map((payment) => (
                        <tr key={payment.id} className="border-b font-jura font-semibold text-[14px]">
                            <td>{payment.id}</td>
                            <td>{payment.date}</td>
                            <td>$ {payment.amount.toFixed(2)}</td>
                            <td className="py-4">
                                <div className="flex items-center gap-2">
                                    {payment.status}
                                    <Image src={CheckMark} alt="CheckMark" className="w-5 h-5 text-blue-600" />
                                </div>
                            </td>
                            <td>{payment.type}</td>
                            <td>
                                <button className="w-full text-black border-radius-5 border bg-my-neutrals-cold-1 px-4 py-2 rounded-2xl text-center font-jura font-semibold text-base leading-[19.2px] tracking-[-0.352px]">
                                    View / Download
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    )
}

export default PaymentHistory