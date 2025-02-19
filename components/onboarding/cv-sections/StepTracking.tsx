import React from 'react';

interface Props {
  currentStep: number;
}

interface StepBoxProps {
  step: number;
  currentStep: number;
  title: string;
}

const StepBox = ({ step, currentStep, title }: StepBoxProps) => {
  const active: boolean = currentStep === step;

  return (
    <li
      className={`w-[260px] h-[80px] rounded-lg text-lg gap-7 items-center px-7 cursor-pointer ${active ? 'bg-primary-light-purple flex' : 'bg-my-neutral-5 hidden lg:flex'}`}
    >
      <span className={`text-[48px] font-kanit font-medium ${active ? 'text-splash-green' : 'text-primary-light-purple-gray'}`}>{step}</span>
      <p className='text-[20px] leading-[22px] text-white font-kanit font-light'>{title}</p>
    </li>
  );
}

const StepArrow = () => {
  return (
    <div className="w-[90px] h-1 bg-accent relative hidden lg:block">
      <div className="absolute top-0 right-0 w-5 h-1 bg-accent rotate-45 origin-right"></div>
      <div className="absolute top-0 right-0 w-5 h-1 bg-accent -rotate-45 origin-right"></div>
    </div>
  );
}

export const StepTracking: React.FC<Props> = ({ currentStep }) => {
  return (
    <ul className="w-full flex items-center justify-between">
      <StepBox step={1} title="Personal Information" currentStep={currentStep} />
      <StepArrow />
      <StepBox step={2} title="Education" currentStep={currentStep} />
      <StepArrow />
      <StepBox step={3} title="Experience" currentStep={currentStep} />
      <StepArrow />
      <StepBox step={4} title="Additional Information" currentStep={currentStep} />
    </ul>
  );
};