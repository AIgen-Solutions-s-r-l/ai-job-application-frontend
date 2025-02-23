'use client';

import { FC } from 'react';
import { Check } from 'lucide-react';
import { FaSpinner } from 'react-icons/fa';

type Props = {
  title: string;
  disabled?: boolean;
  isSubmitting?: boolean;
};

export const ButtonSubmit: FC<Props> = ({ title, disabled, isSubmitting }) => (
  <button
    className='my-btn-green gap-[30px] font-semibold text-lg font-jura'
    form='my-form'
    type='submit'
    disabled={disabled}
  >
    {isSubmitting && <FaSpinner className='animate-spin' />}
    <p>{title}</p>
    <Check size={24} />
  </button>
);
