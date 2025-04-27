
// eslint-disable-next-line no-unused-vars
export const Tab = ({ active, text, setTab, tab }: { active: boolean | null, setTab: (tab: number) => void, text: string, tab: number }) => {
    return (
        <div onClick={() => setTab(tab)} className={`${tab === 0 ? 'w-[160px] md:w-[220px] text-center' : 'flex-1'} cursor-pointer px-3 md:px-5 py-3 text-my-neutral-7 font-jura font-semibold whitespace-nowrap text-[14px] md:text-[18px] ${active ? 'bg-white' : 'bg-my-neutral-2'} rounded-t-[5px] bg-black`}>{text}</div>
    )
}

function SubscriptionNav({ tab, setTab }: {
    tab: number | null,
    // eslint-disable-next-line no-unused-vars
    setTab: (tab: number) => void,
}) {
    return (
        <div className='flex items-center gap-3 w-full'>
            <Tab active={tab === 0} tab={0} setTab={setTab} text="Subscription" />
            <div className="flex flex-1 items-center justify-between bg-white">
                <Tab active={tab === 1} tab={1} setTab={setTab} text="Payment History" />
            </div>
        </div>
    )
}

export default SubscriptionNav