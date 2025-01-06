import React from 'react';

interface Props {
  currentStep: number;
}

const StepBox = ({ step, title, active = false }: { step: number, title: string, active: boolean }) => {
  return (
    <li className={`w-[260px] h-[80px] rounded-lg text-lg flex gap-6 items-center px-5 ${active ? 'bg-secondary' : 'bg-neutral'}`}>
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
      <StepBox step={1} title="Personal Information" active={currentStep === 1} />
      <StepArrow />
      <StepBox step={2} title="Education" active={currentStep === 2} />
      <StepArrow />
      <StepBox step={3} title="Experience" active={currentStep === 3} />
      <StepArrow />
      <StepBox step={4} title="Additional Information" active={currentStep === 4} />
    </ul>
  );
};