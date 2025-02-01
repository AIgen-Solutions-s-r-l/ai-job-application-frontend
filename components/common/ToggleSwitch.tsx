interface ToggleSwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
    label: string;
}

const ToggleSwitch = ({ value, onChange, label }: ToggleSwitchProps) => {
    return (
        <section onClick={() => onChange(!value)}
            className="flex items-center bg-primary relative w-[330px] cursor-pointer border py-[10px] flex items-center justify-between rounded-[8px]">
            <label className={`${value ? 'text-black' : 'text-white'} text-center flex-grow z-[999] font-jura font-semibold`}>
                {label}
            </label>
            <label className={`${!value ? 'text-black' : 'text-white'} text-center flex-grow z-[999] font-jura font-semibold`}>
                Use my resume
            </label>
            <input type="checkbox" hidden checked={value} />
            <div
                className={`bg-secondary z-[99] absolute ${value ? 'left-[2px]' : 'left-[calc(50%-2px)]'} drop-shadow-lg rounded-[5px] w-[50%] h-[40px] transition-all`}
            />
        </section>
    );
};

export default ToggleSwitch;