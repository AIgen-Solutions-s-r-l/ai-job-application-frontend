import { ChangeEvent } from 'react';

function SliderInput({
  values,
  sliderValue,
  setSliderValue,
  activePlanValue,
}: {
  values: { value: string }[];
  sliderValue: number;
  setSliderValue: (value: number) => void;
  activePlanValue?: number | null; // <-- new prop
}) {
  const handleSliderChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSliderValue(Number(e.target.value));
  };

  return (
    <div className='w-full max-w-[600px] space-y-3'>
      <div className='flex justify-between text-xs font-medium text-slate-500 px-5 mb-[-20px] relative'>
        {values.map((val, index) => (
          <div key={index} className='flex flex-col items-center relative'>
            <span>{val.value}</span>
            <div className='w-[1px] h-3 bg-slate-300 mt-1'></div>

            {/* Render "Current Plan" below the correct value */}
            {activePlanValue !== null && activePlanValue !== undefined && val.value === activePlanValue.toString() && (
              <div className='absolute top-12 text-primary-deep-purple text-sm font-semibold whitespace-nowrap'>
                Current Plan
              </div>
            )}
          </div>
        ))}
      </div>

      <div className='relative flex items-center px-5'>
        <div className='absolute left-0 right-0 h-2 bg-slate-200 rounded-full overflow-hidden'>
          <div
            className='absolute h-full bg-primary'
            style={{
              width: '100%',
            }}
          />
        </div>
        <input
          type='range'
          min='0'
          max={values.length - 1}
          step='1'
          value={sliderValue}
          onChange={handleSliderChange}
          className='
            relative w-full appearance-none bg-transparent z-10
            [&::-webkit-slider-thumb]:appearance-none
            [&::-webkit-slider-thumb]:h-5 
            [&::-webkit-slider-thumb]:w-5
            [&::-webkit-slider-thumb]:rounded-full
            [&::-webkit-slider-thumb]:bg-secondary
            [&::-webkit-slider-thumb]:shadow
            [&::-moz-range-thumb]:h-5 
            [&::-moz-range-thumb]:w-5
            [&::-moz-range-thumb]:rounded-full
            [&::-moz-range-thumb]:bg-secondary
            [&::-moz-range-thumb]:shadow
            cursor-pointer
          '
        />
      </div>
    </div>
  );
}

export default SliderInput;
