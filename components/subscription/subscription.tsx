'use client'

import React, { useState } from 'react';
import SubscriptionNav from './subscriptionNav';
import SubscriptionTab from './subscriptionTab';
import PaymentHistory from './PaymentHistory';

function Subscription() {
    const [tab, setTab] = useState<number | null>(0);

    return (
        <>
            <p className='page-header mb-[50px]'>Manage your Subscription</p>
            <SubscriptionNav
                tab={tab}
                setTab={setTab}
            />
            {tab === 0 && <SubscriptionTab />}
            {tab === 1 && <PaymentHistory />}
        </>
    )
}

export default Subscription