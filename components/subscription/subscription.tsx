'use client'

import React, { useState } from 'react';
import SubscriptionNav from './subscriptionNav';
import SubscriptionTab from './subscriptionTab';
import PaymentHistory from './PaymentHistory';

function Subscription() {
    const [tab, setTab] = useState<number | null>(0);
    const [sortOrder, setSortOrder] = useState<'newest' | 'oldest'>('newest');

    return (
        <>
            <p className='page-header mb-[50px]'>Manage your Subscription</p>
            <SubscriptionNav
                tab={tab}
                setTab={setTab}
                sortOrder={sortOrder}
                setSortOrder={setSortOrder}
            />
            {tab === 0 && <SubscriptionTab />}
            {tab === 1 && <PaymentHistory sortOrder={sortOrder} />}
        </>
    )
}

export default Subscription