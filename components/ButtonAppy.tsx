'use client';

import { FC } from 'react';
import { ArrowRightIcon } from '@/components/AppIcons';
import { FaSpinner } from 'react-icons/fa';

type Props = {
  title: string;
  handleApply?: () => void;
  disabled?: boolean;
  loadingText?: string;
  isLoading?: boolean;
};

export const ButtonApply: FC<Props> = ({ title, handleApply, disabled, loadingText, isLoading = false }) => (
  <button
    className={`my-btn-green gap-6 font-semibold text-sm md:text-[18px] font-jura cursor-pointer disabled:bg-my-neutral-2 disabled:cursor-not-allowed ${
      !disabled ? 'pop-once-small' : ''
    }`}
    onClick={handleApply}
    disabled={disabled}
    onAnimationEnd={(e) => {
      if (e.animationName === 'pop') {
        e.currentTarget.classList.remove('pop-once-small');
      }
    }}
  >
    {isLoading 
    ? (
        <>
            <p>{loadingText}</p>
            <FaSpinner className="animate-spin" />
        </>
    ) : (
        <>
            <p>{title}</p>
            <ArrowRightIcon classname='fill-black hidden md:block' />
        </>
    )}
  </button>
);
