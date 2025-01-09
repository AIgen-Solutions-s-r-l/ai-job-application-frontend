import React from 'react';

interface Props {
  title: string;
  children: React.ReactNode;
}

export const ResumeSection: React.FC<Props> = ({ title, children }) => {
  return (
    <div className="flex gap-6">
      <div className="flex-none w-[240px] p-5">
        <h4 className='text-lg font-semibold'>{title}</h4>
      </div>
      <div className="flex-1 p-5 bg-base-300">
        {children}
      </div>
    </div>
  );
};