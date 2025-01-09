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
      className={`w-[260px] h-[80px] rounded-lg text-lg flex gap-6 items-center px-5 cursor-pointer ${active ? 'bg-secondary' : 'bg-neutral'}`}
    >
      <span className={`text-[48px] ${active ? 'text-white' : 'text-secondary'}`}>{step}</span>
      <p className='text-[28px] text-base-100 font-light'>{title}</p>
    </li>
  );
}

const StepArrow = () => {
  return (
    <div className="w-[90px] h-1 bg-accent relative">
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