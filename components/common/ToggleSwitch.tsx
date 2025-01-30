interface ToggleSwitchProps {
    value: boolean;
    onChange: (value: boolean) => void;
    label: string;
}

const ToggleSwitch = ({ value, onChange, label }: ToggleSwitchProps) => {
    return (
        <section className="w-[320px] border p-[10px] flex items-center justify-between rounded-[20px] px-6">
            <label className="font-jura font-semibold">
                {label}
            </label>
            <input type="checkbox" hidden checked={value} />
            <div
                onClick={() => onChange(!value)}
                className="relative cursor-pointer rounded-xl bg-violet-300 w-[75px] p-[2px] h-[35px]"
            >
                <div
                    className="drop-shadow-lg rounded-xl w-[40px] h-full transition-all"
                    style={{
                        transform: value ? 'translateX(31px)' : 'translateX(0%)',
                        backgroundColor: value ? '#B9FF5E' : 'white'
                    }}
                />
            </div>
        </section>
    );
};

export default ToggleSwitch;