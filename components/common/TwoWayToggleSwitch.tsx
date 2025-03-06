interface TwoWayToggleSwitchProps {
    value: 'monthly' | 'onetime';
    onChange: (value: 'monthly' | 'onetime') => void;
  }
  
  const TwoWayToggleSwitch = ({ value, onChange }: TwoWayToggleSwitchProps) => {
    const getSliderPosition = () => {
      switch (value) {
        case 'monthly':
          return 'left-[2px]';
        case 'onetime':
          return 'left-[calc(50%-2px)]';
      }
    };
  
    return (
      <section className="relative flex items-center w-[360px] bg-primary-light-purple-gray border rounded-[8px] py-1">
        {/* Monthly */}
        <label
          onClick={() => onChange('monthly')}
          className={`flex items-center justify-center gap-2 text-center flex-grow z-[2] font-jura font-semibold whitespace-nowrap cursor-pointer ${
            value === 'monthly' ? 'text-black' : 'text-white'
          }`}
        >
          Monthly
          <span className="block text-sm">20% off</span>
        </label>
  
        {/* One-time */}
        <label
          onClick={() => onChange('onetime')}
          className={`flex items-center justify-center gap-2 text-center flex-grow z-[2] font-jura font-semibold whitespace-nowrap cursor-pointer ${
            value === 'onetime' ? 'text-black' : 'text-white'
          }`}
        >
          One-time
          <span className="block text-sm">payment</span>
        </label>
  
        {/* Slider */}
        <div
          className={`bg-secondary absolute drop-shadow-lg rounded-[5px] w-[50%] h-[30px] transition-all ${getSliderPosition()}`}
        />
      </section>
    );
  };
  
  export default TwoWayToggleSwitch;