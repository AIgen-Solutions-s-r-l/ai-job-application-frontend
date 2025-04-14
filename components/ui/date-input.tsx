import { FC, Fragment, useState } from 'react';
import { Transition } from '@headlessui/react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid';
import { useClickAway } from '@/libs/hooks/useClickAway';
import { cn } from '@/lib/utils';

interface DateOrPresentInputProps {
  value: string;
  onChange: (value: string) => void;
  title?: string;
  placeholder?: string;
  error?: boolean;
  errorMessage?: string;
  present?: boolean;
  required?: boolean;
}

export const DateOrPresentInput: FC<DateOrPresentInputProps> = ({
  value,
  onChange,
  title,
  placeholder = "Select date",
  error,
  errorMessage,
  present = false,
  required = true,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [currentDate, setCurrentDate] = useState(new Date());
  const ref = useClickAway(handleCancel);
  
  const months = [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ];

  const handleYearChange = (increment: number) => {
    setCurrentDate(prev => new Date(prev.getFullYear() + increment, prev.getMonth()));
  };

  const handleMonthSelect = (monthIndex: number) => {
    const newDate = new Date(currentDate.getFullYear(), monthIndex);
    const formattedDate = `${String(monthIndex + 1).padStart(2, '0')}/${newDate.getFullYear()}`;
    onChange(formattedDate);
    setIsOpen(false);
  };

  const handlePresentClick = () => {
    onChange('Present');
    setIsOpen(false);
  };

  function handleOpen() {
    setIsOpen(true);
  }

  function handleCancel() {
    setIsOpen(false);
  }

  return (
    <div className="relative w-[200px]" ref={ref}>
      {title && (
        <label className="flex justify-start text-[14px] md:text-base leading-none mb-3 font-jura font-semibold">
          {title} {required && <span className="text-error ml-1">*</span>}
        </label>
      )}
      
      <input
        onClick={handleOpen}
        placeholder={placeholder}
        value={value}
        className={cn(
          "w-full h-10 text-left bg-white outline-none border border-my-neutral-4 focus:border-primary-light-purple placeholder-shown:border-my-neutral-4 placeholder:text-base px-[10px] rounded-md text-[18px] font-jura",
          error && "placeholder-shown:border-error"
        )}
      />

      <Transition
        show={isOpen}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        
        <div className="absolute z-10 w-64 mt-1 bg-white rounded-lg shadow-lg">
          <div className="p-2">
            {/* Year Controls */}
            <div className="flex items-center justify-between mb-4">
              <button
                onClick={() => handleYearChange(-1)}
                type="button"
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronLeftIcon className="w-5 h-5" />
              </button>
              
              <div className="text-lg font-medium">
                {currentDate.getFullYear()}
              </div>

              <button
                onClick={() => handleYearChange(1)}
                type="button"
                className="p-1 hover:bg-gray-100 rounded-full"
              >
                <ChevronRightIcon className="w-5 h-5" />
              </button>
            </div>

            {/* Month Grid */}
            <div className="grid grid-cols-3 gap-2">
              {months.map((month, index) => (
                <button
                  key={month}
                  type="button"
                  onClick={() => handleMonthSelect(index)}
                  className="p-2 text-sm rounded-md hover:bg-primary hover:text-white transition-colors"
                >
                  {month}
                </button>
              ))}
            </div>

            {/* Footer */}
            <div className="flex justify-between mt-4 pt-4 border-t">
              <button
                onClick={handleCancel}
                type="button"
                className="px-4 py-2 text-sm text-gray-600 hover:text-gray-800"
              >
                Cancel
              </button>
              {present && (
                <button
                  onClick={handlePresentClick}
                  type="button"
                  className="px-4 py-2 text-sm bg-primary text-white rounded-md hover:bg-primary-dark"
                >
                  Present
                </button>
              )}
            </div>
          </div>
        </div>
      </Transition>

      {error && errorMessage && (
        <p className="mt-1 text-xs text-error">{errorMessage}</p>
      )}
    </div>
  );
};