interface ThreeWayToggleSwitchProps {
    value: 'monthly' | 'yearly' | 'onetime';
    onChange: (value: 'monthly' | 'yearly' | 'onetime') => void;
}

const ThreeWayToggleSwitch = ({ value, onChange }: ThreeWayToggleSwitchProps) => {
    const getSliderPosition = () => {
        switch (value) {
            case 'monthly':
                return 'left-[2px]';
            case 'yearly':
                return 'left-[calc(33.33%-2px)]';
            case 'onetime':
                return 'left-[calc(66.66%-2px)]';
        }
    };

    return (
        <section className="flex items-center bg-primary-light-purple-gray relative w-[550px] border rounded-[8px] py-1">
            <label
                onClick={() => onChange('monthly')}
                className={`flex items-center justify-center gap-2 ${value === 'monthly' ? 'text-black' : 'text-white'} cursor-pointer text-center flex-grow z-[999] font-jura font-semibold whitespace-nowrap`}
            >
                Monthly
                <span className="block text-sm">20% off</span>
            </label>
            <label
                onClick={() => onChange('yearly')}
                className={`flex items-center justify-center gap-2 ${value === 'yearly' ? 'text-black' : 'text-white'} cursor-pointer text-center flex-grow z-[999] font-jura font-semibold whitespace-nowrap`}
            >
                Yearly
                <span className="block text-sm">35% off</span>
            </label>
            <label
                onClick={() => onChange('onetime')}
                className={`flex items-center justify-center gap-2 ${value === 'onetime' ? 'text-black' : 'text-white'} cursor-pointer text-center flex-grow z-[999] font-jura font-semibold whitespace-nowrap`}
            >
                One-time
                <span className="block text-sm">payment</span>
            </label>
            <div
                className={`bg-secondary z-[99] absolute ${getSliderPosition()} drop-shadow-lg rounded-[5px] w-[33.33%] h-[30px] transition-all`}
            />
        </section>
    );
};

export default ThreeWayToggleSwitch;
