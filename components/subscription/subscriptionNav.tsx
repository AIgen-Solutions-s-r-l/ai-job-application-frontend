import React from 'react';

export const Tab = ({ active, text, setTab, tab }: { active: boolean | null, setTab: (tab: number) => void, text: string, tab: number }) => {
    return (
        <div onClick={() => setTab(tab)} className={`${tab === 0 ? 'w-[220px] text-center' : 'flex-1'} cursor-pointer px-5 py-3 text-my-neutral-7 font-jura font-semibold text-[18px] ${active ? 'bg-white' : 'bg-my-neutral-2'} rounded-t-[5px] bg-black`}>{text}</div>
    )
}

function SubscriptionNav({ tab, setTab, sortOrder, setSortOrder }: {
    tab: number | null,
    setTab: (tab: number) => void,
    sortOrder?: 'newest' | 'oldest',
    setSortOrder?: (order: 'newest' | 'oldest') => void
}) {
    return (
        <div className='flex items-center gap-3 w-full'>
            <Tab active={tab === 0} tab={0} setTab={setTab} text="Subscription" />
            <div className="flex flex-1 items-center justify-between bg-white">
                <Tab active={tab === 1} tab={1} setTab={setTab} text="Payment History" />
                {tab === 1 && setSortOrder && (
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
                )}
            </div>
        </div>
    )
}

export default SubscriptionNav